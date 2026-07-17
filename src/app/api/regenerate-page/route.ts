import { NextRequest, NextResponse } from 'next/server'
import { getBookRenderConfig, type BookRenderConfig } from '@/lib/bookRenderConfig'
import type { BookPage } from '@/lib/books/before-the-music-plays'
import { getBookBySlug } from '@/lib/books'
import { compositeTextBlocks, detectCharacterBounds, resolveTextCollisions, type TextReplacements } from '@/lib/compositeText'
import crypto from 'crypto'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3.1-flash-image'
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dft0hfbee'


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
    console.error('Logo composite failed:', err)
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
        throw new Error('Gemini overloaded — please try again')
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
  customer: { childName: string; senderName: string; dedication?: string; siblingName?: string; lastName?: string; birthDate?: string; gifterNames?: string },
  config: BookRenderConfig,
  staffNote?: string,
): Promise<string> {
  const bgBuffer = await fetchPublicFile(page.backgroundAsset)

  const replacements: TextReplacements = {
    CHILD_NAME:       customer.childName,
    SENDER_NAME:      customer.senderName,
    CHILD_NAME_UPPER: customer.childName.toUpperCase(),
    DEDICATION:       customer.dedication || `A special book made with love just for ${customer.childName}.`,
    SIBLING_NAME:     customer.siblingName  || '',
    LAST_NAME:        customer.lastName     || '',
    BIRTH_DATE:       customer.birthDate    || '',
    GIFTER_NAMES:     customer.gifterNames  || '',
  }

  if (!page.characterPlacement) {
    const withText = await compositeTextBlocks(
      bgBuffer, page.textBlocks, replacements, config.canvasW, config.canvasH, config.bookSlug,
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
- IMAGE 3 is the LAYOUT REFERENCE. Use it ONLY to determine the character's position, scale, and pose within the frame — nothing else. Do NOT copy the character's appearance, hair, face, or skin from Image 3 (the child shown there is a placeholder with different features). Do NOT reproduce any text, words, or labels visible in Image 3 — all text is added in post-production.`
    : `IMAGE ROLES:
- IMAGE 1 is the BACKGROUND. Preserve it pixel-for-pixel — do NOT regenerate, recolour, or alter any part of the background. Only fill in the area where the character is placed.
- IMAGE 2 is the CHARACTER REFERENCE. This is the real child. Copy their face, eyes, nose, lips, skin tone, hair colour, hair length, and hairstyle EXACTLY into the output. Do NOT copy pixels from Image 2 — use it as identity reference only.`

  const staffInstruction = staffNote
    ? `\n\nSTAFF REVISION NOTE — apply this specific change:\n${staffNote}`
    : ''

  const scenePrompt =
    `${page.characterActionPrompt}${staffInstruction}

${imageRoles}

RULES:
- CHARACTER IDENTITY: The child's face, hair, and skin tone must match Image 2 exactly. If Image 3 shows a child with different hair (e.g. curly when Image 2 has straight, or a different colour) — ignore Image 3's hair completely and use Image 2's hair.
- HAIR: Do NOT add headdress, hat, crown, tiara, feathers, or any accessories not visible in Image 2.
- COSTUME: Unless the scene description above explicitly specifies a different outfit, ${config.costumeRule}
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
  const paramStr  = `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}`
  const signature = crypto.createHash('sha1').update(paramStr + apiSecret).digest('hex')

  const form = new FormData()
  form.append('file', `data:image/jpeg;base64,${jpegBase64}`)
  form.append('api_key', apiKey)
  form.append('timestamp', String(timestamp))
  form.append('signature', signature)
  form.append('folder', folder)
  form.append('public_id', publicId)
  form.append('overwrite', 'true')

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
    const { orderId, pageIndex, staffNote } = await req.json()

    if (!orderId || pageIndex === undefined) {
      return NextResponse.json({ error: 'Missing required fields: orderId, pageIndex' }, { status: 400 })
    }

    const idx    = Number(pageIndex)
    const folder = `party-books/orders/${orderId}`
    const publicId = `page_${String(idx).padStart(2, '0')}`

    // Load order metadata saved during full generation
    const metaUrl = `https://res.cloudinary.com/${CLOUD}/raw/upload/${folder}/meta`
    const metaRes = await fetch(metaUrl)
    if (!metaRes.ok) {
      return NextResponse.json({ error: 'Order metadata not found — make sure the full book was generated first.' }, { status: 404 })
    }
    const { childName, senderName, dedication, siblingName, lastName, birthDate, gifterNames, bookSlug } = await metaRes.json()

    const bookConfig = getBookRenderConfig(bookSlug)
    if (bookConfig) {
      const { pages } = bookConfig
      if (idx < 0 || idx >= pages.length) {
        return NextResponse.json({ error: `Invalid pageIndex ${idx}` }, { status: 400 })
      }

      // Load the approved character saved during full-book generation.
      // Never fall back to a scene page — that causes character drift across pages.
      const charUrl = `https://res.cloudinary.com/${CLOUD}/image/upload/${folder}/character.png`
      const charRes = await fetch(charUrl)
      if (!charRes.ok) {
        return NextResponse.json({ error: 'Approved character not found. Re-run full book generation to lock the character in.' }, { status: 404 })
      }
      const characterBase64 = Buffer.from(await charRes.arrayBuffer()).toString('base64')

      const pageBase64 = await generateCompositedPage(
        pages[idx],
        characterBase64,
        { childName, senderName: senderName || '', dedication, siblingName, lastName, birthDate, gifterNames },
        bookConfig,
        staffNote || '',
      )

      const pageUrl = await uploadToCloudinary(pageBase64, folder, publicId)
      return NextResponse.json({ url: pageUrl })
    }

    // Legacy pipeline for other book slugs
    const book = getBookBySlug(bookSlug)
    if (!book?.pagePrompts?.length) {
      return NextResponse.json({ error: 'Book not found or has no prompts' }, { status: 404 })
    }
    if (idx < 0 || idx >= book.pagePrompts.length) {
      return NextResponse.json({ error: `Invalid pageIndex ${idx}` }, { status: 400 })
    }

    // Load the approved character saved during full-book generation.
    const charUrl = `https://res.cloudinary.com/${CLOUD}/image/upload/${folder}/character.png`
    const charRes = await fetch(charUrl)
    if (!charRes.ok) {
      return NextResponse.json({ error: 'Approved character not found. Re-run full book generation to lock the character in.' }, { status: 404 })
    }
    const characterBase64 = Buffer.from(await charRes.arrayBuffer()).toString('base64')

    const pagePrompt = book.pagePrompts[idx]
      .replace(/\[CHILD_NAME\]/g, childName)
      .replace(/\[SENDER_NAME\]/g, senderName || '')
      .replace(/\[DEDICATION\]/g, dedication || `A special book made with love just for ${childName}.`)

    const staffInstruction = staffNote
      ? `\n\nSTAFF REVISION NOTE — apply this change:\n${staffNote}`
      : ''

    const fullPrompt = `${pagePrompt}${staffInstruction}

CRITICAL — CHARACTER MUST MATCH THE REFERENCE IMAGE: Use the EXACT same child — identical face, identical hair color and style, identical skin tone. Do not substitute a generic character.`

    let pageBase64 = await callGemini([
      { inlineData: { mimeType: 'image/png', data: characterBase64 } },
      { text: fullPrompt },
    ])

    if (idx === 0) pageBase64 = await compositeLogoOnCover(pageBase64)

    const pageUrl = await uploadToCloudinary(pageBase64, folder, publicId)
    return NextResponse.json({ url: pageUrl })

  } catch (err: any) {
    console.error('Regenerate page error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}