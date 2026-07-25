import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'
import { getBookRenderConfig, type BookRenderConfig } from '@/lib/bookRenderConfig'
import type { BookPage } from '@/lib/books/before-the-music-plays'
import { compositeTextBlocks, detectCharacterBounds, resolveTextCollisions, type TextReplacements } from '@/lib/compositeText'
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
  customer: { childName: string; senderName: string; dedication?: string; siblingName?: string; siblingFullName?: string; siblingBirthDate?: string; lastName?: string; birthDate?: string; gifterNames?: string },
  config: BookRenderConfig,
): Promise<string> {
  const bgBuffer = await fetchPublicFile(page.backgroundAsset)

  const replacements: TextReplacements = {
    CHILD_NAME:         customer.childName,
    CHILD_FULL_NAME:    customer.childName,
    SENDER_NAME:        customer.senderName,
    CHILD_NAME_UPPER:   customer.childName.toUpperCase(),
    DEDICATION:         customer.dedication || `A special book made with love just for ${customer.childName}.`,
    SIBLING_NAME:       customer.siblingName      || '',
    SIBLING_FULL_NAME:  customer.siblingFullName  || customer.siblingName || '',
    SIBLING_BIRTH_DATE: customer.siblingBirthDate || customer.birthDate   || '',
    LAST_NAME:          customer.lastName         || '',
    BIRTH_DATE:         customer.birthDate        || '',
    GIFTER_NAMES:       customer.gifterNames      || '',
  }

  if (!page.characterPlacement) {
    const withText = await compositeTextBlocks(
      bgBuffer, page.textBlocks, replacements, config.canvasW, config.canvasH, config.bookSlug,
      page.svgOverlay,
    )
    return withText.toString('base64')
  }

  const bgBase64 = bgBuffer.toString('base64')

  const useRef = page.pageIndex !== 0
  const refBase64 = useRef
    ? (await fetchPublicFile(page.poseReference)).toString('base64')
    : null

  const imageRoles = useRef
    ? `IMAGE ROLES:
- IMAGE 1 is the BACKGROUND. Preserve it pixel-for-pixel — do NOT regenerate, recolour, or alter any part of the background. Only fill in the area where the character is placed.
- IMAGE 2 is the CHARACTER REFERENCE. This is the real child. Copy their face, eyes, nose, lips, skin tone, hair colour, hair length, and hairstyle EXACTLY into the output. Do NOT copy pixels from Image 2 — use it as identity reference only.
- IMAGE 3 is the LAYOUT REFERENCE. Use it ONLY to determine the character's position, scale, and pose within the frame — nothing else. Do NOT copy the character's appearance, hair, face, or skin from Image 3 (the child shown there is a placeholder with different features). IMAGE 3 CONTAINS PLACEHOLDER TEXT — treat that text as invisible. Do NOT render, trace, copy, or approximate any letter, word, or symbol you see in Image 3. The text area in your output must be a plain, softly faded, empty background with zero text of any kind.`
    : `IMAGE ROLES:
- IMAGE 1 is the BACKGROUND. Preserve it pixel-for-pixel — do NOT regenerate, recolour, or alter any part of the background. Only fill in the area where the character is placed.
- IMAGE 2 is the CHARACTER REFERENCE. This is the real child. Copy their face, eyes, nose, lips, skin tone, hair colour, hair length, and hairstyle EXACTLY into the output. Do NOT copy pixels from Image 2 — use it as identity reference only.`

  const scenePrompt =
    `${page.characterActionPrompt}

${imageRoles}

RULES:
- CHARACTER IDENTITY: The child's face, hair, and skin tone must match Image 2 exactly. If Image 3 shows a child with different hair (e.g. curly when Image 2 has straight, or a different colour) — ignore Image 3's hair completely and use Image 2's hair.
- SKIN TONE — CRITICAL: The child's skin tone is a fixed identity attribute copied from Image 2. It must NOT change between pages or in response to scene lighting. Warm, golden, or cosy scene lighting must NOT tan or darken the skin. Cool or neutral lighting must NOT lighten or desaturate it. Do NOT apply ambient light colour to the character's skin. The skin tone in the output must be visually identical to Image 2 regardless of how warm, cool, bright, or dim the scene background is.
- HAIR: Do NOT add headdress, hat, crown, tiara, feathers, or any accessories not visible in Image 2.
- COSTUME: Unless the scene description above explicitly specifies a different outfit, ${config.costumeRule}
- TEXT — CRITICAL: Image 3 contains placeholder text baked in for layout reference only. You MUST NOT render, copy, trace, or approximate any letter, word, name, or symbol from Image 3 in your output. The text side of the canvas must be rendered as a clean, softly faded, plain background — completely empty of any text, letters, or words. Text is composited onto the image in a separate post-production step. Any text you generate will overlap with the composited text and ruin the final page.
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
    .resize(config.canvasW, config.canvasH, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer()

  if (page.isMirrorPage && page.characterPlacement) {
    const cp = page.characterPlacement
    const cropH   = Math.min(cp.height, config.canvasH - cp.y)
    const mirrorX = Math.max(0, config.canvasW - cp.x - cp.width)
    const mirrorW = Math.min(cp.width, config.canvasW - mirrorX)

    const { data, info } = await sharp(composite)
      .extract({ left: cp.x, top: cp.y, width: mirrorW, height: cropH })
      .flop()
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    for (let i = 3; i < data.length; i += 4) {
      data[i] = Math.round(data[i] * 0.78)
    }

    const reflectionBuf = await sharp(Buffer.from(data), {
      raw: { width: info.width, height: info.height, channels: 4 },
    }).png().toBuffer()

    composite = await sharp(composite)
      .composite([{ input: reflectionBuf, left: mirrorX, top: cp.y }])
      .png()
      .toBuffer()
  }

  if (page.pageIndex === 0 && config.showLogoOnCover !== false) {
    const withLogo = await compositeLogoOnCover(composite.toString('base64'))
    composite = Buffer.from(withLogo, 'base64')
  }

  // Restore protected areas from the original background on top of the Gemini scene.
  // Fixes z-order: Gemini overwrites any background box/ornament in the character area;
  // pasting the background back on top restores the box so it appears over the character.
  if (page.protectedBackgroundAreas?.length) {
    const bgResized = await sharp(bgBuffer)
      .resize(config.canvasW, config.canvasH, { fit: 'fill' })
      .png()
      .toBuffer()
    const restorations = await Promise.all(
      page.protectedBackgroundAreas.map(async area => ({
        input: await sharp(bgResized)
          .extract({
            left:   area.x,
            top:    area.y,
            width:  Math.min(area.width,  config.canvasW - area.x),
            height: Math.min(area.height, config.canvasH - area.y),
          })
          .png()
          .toBuffer(),
        left: area.x,
        top:  area.y,
      }))
    )
    composite = await sharp(composite).composite(restorations).png().toBuffer()
  }

  let textBlocks = page.textBlocks
  if (!page.skipTextCollision) {
    const charBounds = await detectCharacterBounds(characterBase64, page.characterPlacement!)
    textBlocks = resolveTextCollisions(page.textBlocks, charBounds, config.canvasW, config.canvasH)
  }

  const withText = await compositeTextBlocks(
    composite, textBlocks, replacements, config.canvasW, config.canvasH, config.bookSlug,
    page.svgOverlay,
  )
  return withText.toString('base64')
}

async function uploadToCloudinary(base64: string, folder: string, publicId: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!
  const apiKey    = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!

  // Compress to JPEG to stay under Cloudinary's 10 MB per-file limit
  const jpeg = await sharp(Buffer.from(base64, 'base64')).jpeg({ quality: 90 }).toBuffer()
  const jpegBase64 = jpeg.toString('base64')

  const timestamp = Math.round(Date.now() / 1000)
  const paramStr  = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}`
  const signature = crypto.createHash('sha1').update(paramStr + apiSecret).digest('hex')

  const form = new FormData()
  form.append('file', `data:image/jpeg;base64,${jpegBase64}`)
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
      siblingName,
      siblingFullName,
      siblingBirthDate,
      lastName,
      birthDate,
      gifterNames,
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
      // Await both saves before generating pages so regenerate-page always finds them.
      await saveOrderMeta(folder, {
        childName,
        senderName:       senderName       || '',
        dedication:       dedication       || '',
        siblingName:      siblingName      || '',
        siblingFullName:  siblingFullName  || '',
        siblingBirthDate: siblingBirthDate || '',
        lastName:         lastName         || '',
        birthDate:        birthDate        || '',
        gifterNames:      gifterNames      || '',
        bookSlug,
      })
      await uploadToCloudinary(characterBase64, folder, 'character')
    }

    const bookConfig = getBookRenderConfig(bookSlug)
    if (bookConfig) {
      const { pages } = bookConfig
      bookTitle = bookConfig.title

      for (const page of pages) {
        const pageBase64 = await generateCompositedPage(
          page,
          characterBase64,
          { childName, senderName: senderName || '', dedication, siblingName, siblingFullName, siblingBirthDate, lastName, birthDate, gifterNames },
          bookConfig,
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
<body style="font-family:Arial,sans-serif;padding:24px;background:#FAFAF5;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(45,74,62,0.08);">

    <!-- Header -->
    <div style="background:#2D4A3E;padding:24px 32px;">
      <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:2px;text-transform:uppercase;">Miloriabooks — Staff</p>
      <h2 style="margin:0 0 6px;color:#ffffff;font-size:20px;font-weight:800;">📚 All pages generated</h2>
      <p style="margin:0;color:rgba(255,255,255,0.65);font-size:13px;">A new order is ready for quality review.</p>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px;">

      <a href="${reviewUrl}" style="display:inline-block;background:#E8836A;color:#fff;text-decoration:none;padding:13px 28px;border-radius:50px;font-size:14px;font-weight:800;margin-bottom:28px;">
        🔍 Open Quality Review Page →
      </a>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        ${[
          ['Order ID',   `#${shortId}`],
          ['Customer',   customerName  || 'N/A'],
          ['Email',      customerEmail],
          ['Book',       bookTitle],
          ['Child Name', childName],
          ['From',       senderName    || 'N/A'],
        ].map(([label, value]) => `
        <tr>
          <td style="padding:10px 0;font-size:13px;color:#888;font-weight:600;width:35%;border-bottom:1px solid #F5F0E8;">${label}</td>
          <td style="padding:10px 0;font-size:13px;color:#2D4A3E;font-weight:800;border-bottom:1px solid #F5F0E8;">${value}</td>
        </tr>`).join('')}
      </table>

      <p style="margin:0 0 12px;font-size:14px;font-weight:800;color:#2D4A3E;">Generated Pages</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${urlList}
      </table>

      <div style="margin-top:24px;padding:16px 20px;background:#F5F0E8;border-radius:12px;border-left:4px solid #E8836A;">
        <p style="margin:0 0 6px;font-size:13px;color:#2D4A3E;font-weight:800;">Next steps</p>
        <p style="margin:0;font-size:13px;color:#4A5568;line-height:1.7;">1. Review all pages above<br>2. Regenerate any pages that need fixing<br>3. Download the Print PDF once approved</p>
      </div>

    </div>
  </div>
</body>
</html>`
}