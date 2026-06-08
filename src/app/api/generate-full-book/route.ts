import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'
import crypto from 'crypto'
import { Resend } from 'resend'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3.1-flash-image'

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function compositeLogoOnCover(coverBase64: string): Promise<string> {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'Final_Logo.png')
    const logoBuffer = fs.readFileSync(logoPath)
    const coverBuffer = Buffer.from(coverBase64, 'base64')

    const { width = 1792, height = 896 } = await sharp(coverBuffer).metadata()

    const logoWidth = Math.round(width * 0.14)
    const resizedLogo = await sharp(logoBuffer)
      .resize(logoWidth, null, { fit: 'inside' })
      .toBuffer()

    const left = Math.round(width * 0.16)
    const top = Math.round(height * 0.43)

    const result = await sharp(coverBuffer)
      .composite([{ input: resizedLogo, left, top }])
      .png()
      .toBuffer()

    return result.toString('base64')
  } catch (err) {
    console.error('Logo composite failed, returning original:', err)
    return coverBase64
  }
}

async function callGemini(promptParts: any[]): Promise<string> {
  const delays = [5000, 10000, 20000]
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 120000)
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: promptParts }],
            generationConfig: { responseModalities: ['IMAGE'] },
          }),
          signal: controller.signal,
        }
      )
      clearTimeout(timeout)
      if (res.status === 429 || res.status === 503) {
        if (attempt < delays.length) { await sleep(delays[attempt]); continue }
        throw new Error('Gemini overloaded')
      }
      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        throw new Error(e?.error?.message || `Gemini error ${res.status}`)
      }
      const data = await res.json()
      const imgPart = data?.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)
      if (!imgPart) throw new Error('No image returned from Gemini')
      return imgPart.inlineData.data as string
    } catch (e: any) {
      if (attempt < delays.length) { await sleep(delays[attempt]); continue }
      throw e
    }
  }
  throw new Error('Max retries exceeded')
}

async function uploadToCloudinary(base64: string, folder: string, publicId: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!
  const apiKey = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!

  const timestamp = Math.round(Date.now() / 1000)
  // Cloudinary signature: SHA1 of sorted params + api_secret
  const paramStr = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
  const signature = crypto.createHash('sha1').update(paramStr + apiSecret).digest('hex')

  const form = new FormData()
  form.append('file', `data:image/png;base64,${base64}`)
  form.append('api_key', apiKey)
  form.append('timestamp', String(timestamp))
  form.append('signature', signature)
  form.append('folder', folder)
  form.append('public_id', publicId)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  })
  const result = await res.json()
  if (!result.secure_url) throw new Error(`Cloudinary upload failed: ${JSON.stringify(result)}`)
  return result.secure_url as string
}

export async function POST(req: NextRequest) {
  try {
    const {
      characterBase64,
      bookSlug,
      childName,
      senderName,
      dedication,
      customerEmail,
      customerName,
      orderId,
    } = await req.json()

    if (!characterBase64 || !bookSlug || !childName || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const book = getBookBySlug(bookSlug)
    if (!book?.pagePrompts?.length) {
      return NextResponse.json({ error: 'Book not found or has no prompts' }, { status: 404 })
    }

    const cloudinaryReady = !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    )

    const folder = `party-books/orders/${orderId}`
    const pageUrls: string[] = []

    for (let i = 0; i < book.pagePrompts.length; i++) {
      const pagePrompt = book.pagePrompts[i]
        .replace(/\[CHILD_NAME\]/g, childName)
        .replace(/\[SENDER_NAME\]/g, senderName || '')
        .replace(/\[DEDICATION\]/g, dedication || `A special book made with love just for ${childName}.`)

      const fullPrompt = `${pagePrompt}

CRITICAL — CHARACTER MUST MATCH THE REFERENCE IMAGE: The first image provided is the character reference. Use the EXACT same child — identical face, identical hair color and style, identical skin tone, identical beige knit cardigan sweater with buttons, identical cream pants. Do not substitute a generic character. Do not alter their appearance in any way.`

      const parts = [
        { inlineData: { mimeType: 'image/png', data: characterBase64 } },
        { text: fullPrompt },
      ]

      let pageBase64 = await callGemini(parts)

      // Composite the real logo onto the cover after generation
      if (i === 0) {
        pageBase64 = await compositeLogoOnCover(pageBase64)
      }

      let pageUrl = ''
      if (cloudinaryReady) {
        try {
          const publicId = `page_${String(i).padStart(2, '0')}`
          pageUrl = await uploadToCloudinary(pageBase64, folder, publicId)
        } catch (err) {
          console.error(`Cloudinary upload failed for page ${i}:`, err)
        }
      }

      pageUrls.push(pageUrl)
      console.log(`✓ Page ${i + 1}/17 generated${pageUrl ? ' and uploaded' : ''}`)
    }

    // Notify staff
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'party & presents <onboarding@resend.dev>',
      to: 'booksproject@partyandpresents.com',
      subject: `📚 All 17 pages ready — ${childName}'s book (Order #${orderId?.slice(-8).toUpperCase()})`,
      html: staffEmailHtml({ customerName, customerEmail, childName, senderName, bookTitle: book.title, orderId, pageUrls, cloudinaryReady }),
    })

    return NextResponse.json({ success: true, totalPages: pageUrls.length })

  } catch (err: any) {
    console.error('Full generation error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function staffEmailHtml({ customerName, customerEmail, childName, senderName, bookTitle, orderId, pageUrls, cloudinaryReady }: any) {
  const shortId = orderId?.slice(-8).toUpperCase() || 'N/A'
  const urlList = cloudinaryReady
    ? pageUrls.map((url: string, i: number) =>
        `<tr>
          <td style="padding:6px 0;font-size:13px;color:#888;width:80px;font-weight:600;">Page ${i + 1}</td>
          <td style="padding:6px 0;font-size:13px;">
            ${url
              ? `<a href="${url}" style="color:#FF559C;font-weight:700;">View Page ${i + 1}</a>`
              : '<span style="color:#888;">Upload failed — regenerate manually</span>'
            }
          </td>
        </tr>`
      ).join('')
    : '<tr><td colspan="2" style="padding:12px 0;font-size:13px;color:#888;">Cloudinary not configured — use production tool to generate pages.</td></tr>'

  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;padding:24px;background:#f5f5f5;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;">
    <h2 style="color:#FF559C;margin:0 0 8px;">📚 All 17 pages generated!</h2>
    <p style="color:#555;margin:0 0 24px;font-size:14px;">A new order is ready for review and PDF creation.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${[
        ['Order ID', `#${shortId}`],
        ['Customer', customerName || 'N/A'],
        ['Email', customerEmail],
        ['Book', bookTitle],
        ['Child Name', childName],
        ['From', senderName || 'N/A'],
      ].map(([label, value]) => `
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#888;font-weight:600;width:35%;border-bottom:1px solid #f0f0f0;">${label}</td>
        <td style="padding:8px 0;font-size:13px;color:#1A1A1A;font-weight:700;border-bottom:1px solid #f0f0f0;">${value}</td>
      </tr>`).join('')}
    </table>

    <h3 style="color:#2C2C2C;font-size:15px;margin:0 0 12px;">Generated Pages</h3>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${urlList}
    </table>

    <div style="margin-top:24px;padding:16px;background:#FFEEF5;border-radius:12px;">
      <p style="margin:0;font-size:13px;color:#FF559C;font-weight:700;">Next steps:</p>
      <p style="margin:4px 0 0;font-size:13px;color:#555;">1. Review all pages above<br>2. Create the preview PDF and print PDF<br>3. Email PDF to customer at ${customerEmail}</p>
    </div>
  </div>
</body>
</html>`
}
