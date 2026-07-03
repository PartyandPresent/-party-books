import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'
import { beforeTheMusicPlays, type BookPage } from '@/lib/books/before-the-music-plays'
import { compositeTextBlocks, type TextReplacements } from '@/lib/compositeText'
import crypto from 'crypto'
import { Resend } from 'resend'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3.1-flash-image'

const CANVAS_W = 1774
const CANVAS_H = 887

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

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

async function fetchPublicFile(assetPath: string): Promise<Buffer> {
  const urlPath = assetPath.replace(/^public\//, '/')
  const res = await fetch(`${getBaseUrl()}${urlPath}`)
  if (!res.ok) throw new Error(`Failed to fetch ${urlPath}: ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function generateCompositedPage(
  page: BookPage,
  characterBase64: string,
  customer: { childName: string; senderName: string; dedication?: string },
): Promise<string> {
  const bgBuffer = await fetchPublicFile(page.backgroundAsset)

  const replacements: TextReplacements = {
    CHILD_NAME:       customer.childName,
    SENDER_NAME:      customer.senderName,
    CHILD_NAME_UPPER: customer.childName.toUpperCase(),
    DEDICATION:       customer.dedication || `A special book made with love just for ${customer.childName}.`,
  }

  // Pages with no character (1, 16) — background + text only
  if (!page.characterPlacement) {
    const withText = await compositeTextBlocks(
      bgBuffer, page.textBlocks, replacements, CANVAS_W, CANVAS_H, 'before-the-music-plays',
    )
    return withText.toString('base64')
  }

  const bgBase64 = bgBuffer.toString('base64')

  // Skip pose reference for cover (page 0) to prevent Gemini copying baked-in text
  const useRef = page.pageIndex !== 0
  const refBase64 = useRef
    ? (await fetchPublicFile(page.poseReference)).toString('base64')
    : null

  const imageRoles = useRef
    ? `IMAGE ROLES:
- IMAGE 1 is the BACKGROUND. Preserve it pixel-for-pixel — do NOT regenerate, recolour, or alter any part of the background. Only fill in the area where the character is placed.
- IMAGE 2 is the CHARACTER REFERENCE. This is the real child. Copy her face, eyes, nose, lips, skin tone, hair colour, hair length, and hairstyle EXACTLY into the output. Do NOT copy pixels from Image 2 — use it as identity reference only.
- IMAGE 3 is the LAYOUT REFERENCE. Use it ONLY to determine the character's position, scale, and pose within the frame — nothing else. Do NOT copy the character's appearance, hair, face, or skin from Image 3 (the child shown there is a placeholder with different features). Do NOT reproduce any text, words, or labels visible in Image 3 — all text is added in post-production.`
    : `IMAGE ROLES:
- IMAGE 1 is the BACKGROUND. Preserve it pixel-for-pixel — do NOT regenerate, recolour, or alter any part of the background. Only fill in the area where the character is placed.
- IMAGE 2 is the CHARACTER REFERENCE. This is the real child. Copy her face, eyes, nose, lips, skin tone, hair colour, hair length, and hairstyle EXACTLY into the output. Do NOT copy pixels from Image 2 — use it as identity reference only.`

  const scenePrompt =
    `${page.characterActionPrompt}

${imageRoles}

RULES:
- CHARACTER IDENTITY: The child's face, hair, and skin tone must match Image 2 exactly. If Image 3 shows a child with different hair (e.g. curly when Image 2 has straight, or a different colour) — ignore Image 3's hair completely and use Image 2's hair.
- HAIR: Do NOT add headdress, hat, crown, tiara, feathers, or any accessories not visible in Image 2.
- COSTUME: Unless the scene description above explicitly specifies a different outfit (e.g. pajamas, nightwear), use a white or ivory flower girl dress with a satin sash and white dress shoes.
- TEXT: Do NOT reproduce any text, words, names, or labels from Image 3. The text area must be left completely blank — text is composited separately after generation.
- GROUNDING: Add a subtle, soft contact shadow beneath the character's feet consistent with the lighting direction already present in Image 1.
- OUTPUT: The complete scene. Same 2:1 landscape ratio as Image 1. No added text, watermarks, or labels of any kind.`

  const geminiParts: any[] = [
    { inlineData: { mimeType: 'image/png', data: bgBase64 } },
    { inlineData: { mimeType: 'image/png', data: characterBase64 } },
  ]
  if (refBase64) geminiParts.push({ inlineData: { mimeType: 'image/png', data: refBase64 } })
  geminiParts.push({ text: scenePrompt })

  const sceneBase64 = await callGemini(geminiParts)

  let composite = await sharp(Buffer.from(sceneBase64, 'base64'))
    .resize(CANVAS_W, CANVAS_H, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer()

  if (page.pageIndex === 0) {
    const withLogo = await compositeLogoOnCover(composite.toString('base64'))
    composite = Buffer.from(withLogo, 'base64')
  }

  const withText = await compositeTextBlocks(
    composite, page.textBlocks, replacements, CANVAS_W, CANVAS_H, 'before-the-music-plays',
  )
  return withText.toString('base64')
}

async function uploadToCloudinary(base64: string, folder: string, publicId: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!
  const apiKey    = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!

  const timestamp = Math.round(Date.now() / 1000)
  const paramStr  = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
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
  const apiKey    = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!
  const publicId  = 'meta'
  const timestamp = Math.round(Date.now() / 1000)
  const paramStr  = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
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

    const cloudinaryReady = !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    )

    const folder   = `party-books/orders/${orderId}`
    const pageUrls: string[] = []
    let bookTitle  = 'Before the Music Plays'

    if (cloudinaryReady) {
      saveOrderMeta(folder, {
        childName,
        senderName: senderName || '',
        dedication: dedication || '',
        bookSlug,
      }).catch(() => {})

      // Save the character reference so regenerate-page can use it without re-generating
      uploadToCloudinary(characterBase64, folder, 'character').catch(() => {})
    }

    if (bookSlug === 'before-the-music-plays') {
      // New 3-image scene generation pipeline
      const pages = beforeTheMusicPlays.pages
      bookTitle   = beforeTheMusicPlays.title

      for (const page of pages) {
        const pageBase64 = await generateCompositedPage(
          page,
          characterBase64,
          { childName, senderName: senderName || '', dedication },
        )

        let pageUrl = ''
        if (cloudinaryReady) {
          try {
            const publicId = `page_${String(page.pageIndex).padStart(2, '0')}`
            pageUrl = await uploadToCloudinary(pageBase64, folder, publicId)
          } catch (err) {
            console.error(`Cloudinary upload failed for page ${page.pageIndex}:`, err)
          }
        }

        pageUrls.push(pageUrl)
        console.log(`✓ Page ${page.pageIndex + 1}/${pages.length} generated${pageUrl ? ' and uploaded' : ''}`)
      }
    } else {
      // Legacy pipeline for other book slugs
      const book = getBookBySlug(bookSlug)
      if (!book?.pagePrompts?.length) {
        return NextResponse.json({ error: 'Book not found or has no prompts' }, { status: 404 })
      }
      bookTitle = book.title

      for (let i = 0; i < book.pagePrompts.length; i++) {
        const pagePrompt = book.pagePrompts[i]
          .replace(/\[CHILD_NAME_UPPER\]/g, childName.toUpperCase())
          .replace(/\[CHILD_NAME\]/g, childName)
          .replace(/\[SENDER_NAME\]/g, senderName || '')
          .replace(/\[DEDICATION\]/g, dedication || `A special book made with love just for ${childName}.`)

        const fullPrompt = `${pagePrompt}

CRITICAL — CHARACTER MUST MATCH THE REFERENCE IMAGE: The first image provided is the character reference. Use the EXACT same child — identical face, identical hair color and style, identical skin tone, identical beige knit cardigan sweater with buttons, identical cream pants. Do not substitute a generic character. Do not alter their appearance in any way.`

        let pageBase64 = await callGemini([
          { inlineData: { mimeType: 'image/png', data: characterBase64 } },
          { text: fullPrompt },
        ])

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
        console.log(`✓ Page ${i + 1}/${book.pagePrompts.length} generated${pageUrl ? ' and uploaded' : ''}`)
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'party & presents <onboarding@resend.dev>',
      to: 'booksproject@partyandpresents.com',
      subject: `📚 All pages ready — ${childName}'s book (Order #${orderId?.slice(-8).toUpperCase()})`,
      html: staffEmailHtml({
        customerName, customerEmail, childName, senderName, dedication,
        bookTitle, bookSlug, orderId, pageUrls, cloudinaryReady,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      }),
    })
    console.log('✓ Staff email sent')

    return NextResponse.json({ success: true, totalPages: pageUrls.length })

  } catch (err: any) {
    console.error('Full generation error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function staffEmailHtml({ customerName, customerEmail, childName, senderName, dedication, bookTitle, bookSlug, orderId, pageUrls, cloudinaryReady, baseUrl }: any) {
  const shortId = orderId?.slice(-8).toUpperCase() || 'N/A'
  const reviewParams = new URLSearchParams({
    childName:  childName  || '',
    senderName: senderName || '',
    dedication: dedication || '',
    bookSlug:   bookSlug   || '',
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
    <h2 style="color:#FF559C;margin:0 0 8px;">📚 All pages generated!</h2>
    <p style="color:#555;margin:0 0 16px;font-size:14px;">A new order is ready for review and PDF creation.</p>
    <a href="${reviewUrl}" style="display:inline-block;background:linear-gradient(135deg,#FF559C,#FF3385);color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-size:14px;font-weight:800;margin-bottom:24px;">
      🔍 Open Quality Review Page →
    </a>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${[
        ['Order ID',  `#${shortId}`],
        ['Customer',  customerName  || 'N/A'],
        ['Email',     customerEmail],
        ['Book',      bookTitle],
        ['Child Name', childName],
        ['From',      senderName    || 'N/A'],
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
      <p style="margin:4px 0 0;font-size:13px;color:#555;">1. Review all pages above<br>2. Regenerate any pages that need fixing<br>3. Download the spread PDF once approved</p>
    </div>
  </div>
</body>
</html>`
}