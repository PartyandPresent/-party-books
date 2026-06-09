import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'
import crypto from 'crypto'
import { Resend } from 'resend'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { PDFDocument, rgb } from 'pdf-lib'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3.1-flash-image'

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function compositeLogoOnCover(coverBase64: string): Promise<string> {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'Final_Logo_White.png')
    const logoBuffer = fs.readFileSync(logoPath)
    const coverBuffer = Buffer.from(coverBase64, 'base64')

    const { width = 1792, height = 896 } = await sharp(coverBuffer).metadata()

    const logoWidth = Math.round(width * 0.14)

    const { data, info } = await sharp(logoBuffer)
      .resize(logoWidth, null, { fit: 'inside' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    for (let i = 0; i < info.width * info.height; i++) {
      data[i * 4] = 255
      data[i * 4 + 1] = 255
      data[i * 4 + 2] = 255
    }
    const whiteLogo = await sharp(Buffer.from(data), {
      raw: { width: info.width, height: info.height, channels: 4 },
    }).png().toBuffer()

    // Centre the logo within the left page of the spread
    const leftPageW = Math.round(width / 2)
    const left = Math.round((leftPageW - info.width) / 2)
    const top  = Math.round((height - info.height) / 2)

    const result = await sharp(coverBuffer)
      .composite([{ input: whiteLogo, left, top, blend: 'over' }])
      .png()
      .toBuffer()

    return result.toString('base64')
  } catch (err) {
    console.error('Logo composite failed, returning original:', err)
    return coverBase64
  }
}

async function buildPreviewPdf(pageUrls: string[], childName: string, bookTitle: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create()

  for (let i = 0; i < pageUrls.length; i++) {
    const url = pageUrls[i]
    if (!url) continue

    // Fetch and normalise to JPEG for PDF embedding
    const res = await fetch(url)
    const imgBuffer = Buffer.from(await res.arrayBuffer())

    // Resize to a consistent spread width (1792×896) and add fold shadow
    const spreadWidth = 1792
    const spreadHeight = 896

    const resized = await sharp(imgBuffer)
      .resize(spreadWidth, spreadHeight, { fit: 'fill' })
      .toBuffer()

    // SVG fold-shadow overlay — gradient stripe at center simulates spine crease
    const foldSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${spreadWidth}" height="${spreadHeight}">
      <defs>
        <linearGradient id="fold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="black" stop-opacity="0"/>
          <stop offset="46%"  stop-color="black" stop-opacity="0.12"/>
          <stop offset="49%"  stop-color="black" stop-opacity="0.22"/>
          <stop offset="50%"  stop-color="white" stop-opacity="0.18"/>
          <stop offset="51%"  stop-color="black" stop-opacity="0.22"/>
          <stop offset="54%"  stop-color="black" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="black" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="${spreadWidth * 0.44}" y="0" width="${spreadWidth * 0.12}" height="${spreadHeight}" fill="url(#fold)"/>
    </svg>`

    const withFold = await sharp(resized)
      .composite([{ input: Buffer.from(foldSvg), top: 0, left: 0 }])
      .jpeg({ quality: 88 })
      .toBuffer()

    // PDF page sized to match the spread (points = pixels at 96dpi approx)
    const pdfPage = pdfDoc.addPage([spreadWidth * 0.5, spreadHeight * 0.5])
    const jpegImage = await pdfDoc.embedJpg(withFold)
    pdfPage.drawImage(jpegImage, {
      x: 0, y: 0,
      width: pdfPage.getWidth(),
      height: pdfPage.getHeight(),
    })
  }

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
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

async function saveOrderMeta(folder: string, meta: object) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!
  const apiKey = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!
  const publicId = 'meta'
  const timestamp = Math.round(Date.now() / 1000)
  const paramStr = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
  const signature = crypto.createHash('sha1').update(paramStr + apiSecret).digest('hex')

  const form = new FormData()
  form.append('file', `data:application/json;base64,${Buffer.from(JSON.stringify(meta)).toString('base64')}`)
  form.append('api_key', apiKey)
  form.append('timestamp', String(timestamp))
  form.append('signature', signature)
  form.append('folder', folder)
  form.append('public_id', publicId)

  await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, { method: 'POST', body: form })
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

    // Save order details so staff can regenerate any page without re-entering info
    if (cloudinaryReady) {
      saveOrderMeta(folder, { childName, senderName: senderName || '', dedication: dedication || '', bookSlug }).catch(() => {})
    }

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

    const resend = new Resend(process.env.RESEND_API_KEY)
    const uploadedUrls = pageUrls.filter(Boolean)

    // Generate preview PDF and email to customer
    if (uploadedUrls.length > 0) {
      try {
        const pdfBuffer = await buildPreviewPdf(pageUrls, childName, book.title)
        await resend.emails.send({
          from: 'party & presents <onboarding@resend.dev>',
          to: customerEmail,
          subject: `🎉 Your preview is ready — ${childName}'s book!`,
          html: customerPdfEmailHtml({ customerName, childName, bookTitle: book.title, orderId }),
          attachments: [{
            filename: `${childName.replace(/\s+/g, '-')}-book-preview.pdf`,
            content: pdfBuffer,
          }],
        })
        console.log(`✓ Preview PDF emailed to ${customerEmail}`)
      } catch (err) {
        console.error('PDF generation or email failed:', err)
      }
    }

    // Notify staff
    await resend.emails.send({
      from: 'party & presents <onboarding@resend.dev>',
      to: 'booksproject@partyandpresents.com',
      subject: `📚 All 17 pages ready — ${childName}'s book (Order #${orderId?.slice(-8).toUpperCase()})`,
      html: staffEmailHtml({ customerName, customerEmail, childName, senderName, dedication, bookTitle: book.title, bookSlug, orderId, pageUrls, cloudinaryReady, baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' }),
    })

    return NextResponse.json({ success: true, totalPages: pageUrls.length })

  } catch (err: any) {
    console.error('Full generation error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function staffEmailHtml({ customerName, customerEmail, childName, senderName, dedication, bookTitle, bookSlug, orderId, pageUrls, cloudinaryReady, baseUrl }: any) {
  const shortId = orderId?.slice(-8).toUpperCase() || 'N/A'
  const reviewParams = new URLSearchParams({
    childName: childName || '',
    senderName: senderName || '',
    dedication: dedication || '',
    bookSlug: bookSlug || '',
  }).toString()
  const reviewUrl = `${baseUrl}/staff/order/${shortId}?${reviewParams}`
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
    <p style="color:#555;margin:0 0 16px;font-size:14px;">A new order is ready for review and PDF creation.</p>
    <a href="${reviewUrl}" style="display:inline-block;background:linear-gradient(135deg,#FF559C,#FF3385);color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-size:14px;font-weight:800;margin-bottom:24px;">
      🔍 Open Quality Review Page →
    </a>

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
      <p style="margin:4px 0 0;font-size:13px;color:#555;">1. Review all pages above<br>2. Preview PDF has already been emailed to ${customerEmail}<br>3. Create the print-ready PDF and send to POD partner</p>
    </div>
  </div>
</body>
</html>`
}

function customerPdfEmailHtml({ customerName, childName, bookTitle, orderId }: any) {
  const shortId = orderId?.slice(-8).toUpperCase() || 'N/A'
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#FF559C,#FF3385);border-radius:20px 20px 0 0;padding:40px;text-align:center;">
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.85);font-size:13px;font-weight:700;letter-spacing:2px;">PARTY & PRESENTS</p>
            <h1 style="margin:0 0 8px;color:#fff;font-size:28px;font-weight:800;">🎉 ${childName}'s book is ready!</h1>
            <p style="margin:0;color:rgba(255,255,255,0.9);font-size:15px;">Your personalised preview is attached below.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#fff;padding:40px;border-radius:0 0 20px 20px;">
            <p style="margin:0 0 20px;font-size:15px;color:#555;line-height:1.7;">
              Hi ${customerName?.split(' ')[0] || 'there'}! 👋<br><br>
              Amazing news — we've finished illustrating all 17 pages of <strong>${childName}'s</strong> personalised book!
              Open the attached PDF to see your preview with the beautiful fold effect.
            </p>
            <div style="background:#FFEEF5;border-radius:12px;padding:20px;margin-bottom:24px;">
              <p style="margin:0 0 6px;font-size:13px;color:#888;font-weight:700;">ORDER #${shortId}</p>
              <p style="margin:0;font-size:14px;color:#2C2C2C;font-weight:700;">${bookTitle} — Personalised for ${childName}</p>
            </div>
            <p style="margin:0 0 8px;font-size:14px;color:#555;">
              📎 <strong>Your preview PDF is attached to this email.</strong><br>
              Open it to flip through all 17 pages of ${childName}'s book!
            </p>
            <p style="margin:20px 0 0;font-size:13px;color:#888;">
              We'll be in touch once your book is printed and on its way. Questions? Reply to this email.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
