import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'
import crypto from 'crypto'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3.1-flash-image'
const CLOUD = 'dft0hfbee'

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

async function uploadToCloudinary(base64: string, folder: string, publicId: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!
  const apiKey = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!

  const timestamp = Math.round(Date.now() / 1000)
  // overwrite=true must be in the alphabetically-sorted signature string
  const paramStr = `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}`
  const signature = crypto.createHash('sha1').update(paramStr + apiSecret).digest('hex')

  const form = new FormData()
  form.append('file', `data:image/png;base64,${base64}`)
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
  // Return versioned URL so CDN cache is busted
  return result.secure_url as string
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, pageIndex, staffNote } = await req.json()

    if (!orderId || pageIndex === undefined) {
      return NextResponse.json({ error: 'Missing required fields: orderId, pageIndex' }, { status: 400 })
    }

    const idx = Number(pageIndex)
    const folder = `party-books/orders/${orderId}`
    const publicId = `page_${String(idx).padStart(2, '0')}`

    // Load order details saved during full generation
    const metaUrl = `https://res.cloudinary.com/${CLOUD}/raw/upload/${folder}/meta`
    const metaRes = await fetch(metaUrl)
    if (!metaRes.ok) {
      return NextResponse.json({ error: 'Order metadata not found. This order may have been generated before this feature was added — open the staff page from the original staff email link to use regeneration.' }, { status: 404 })
    }
    const { childName, senderName, dedication, bookSlug } = await metaRes.json()

    const book = getBookBySlug(bookSlug)
    if (!book?.pagePrompts?.length) {
      return NextResponse.json({ error: 'Book not found or has no prompts' }, { status: 404 })
    }
    if (idx < 0 || idx >= book.pagePrompts.length) {
      return NextResponse.json({ error: `Invalid pageIndex ${idx}` }, { status: 400 })
    }

    // Use an existing page from the order as character reference — no separate character file needed.
    // Try pages 1, 2, 3, 4, 0 in order, skipping the page being regenerated.
    const refCandidates = [1, 2, 3, 4, 0].filter(i => i !== idx)
    let characterBase64 = ''
    for (const refIdx of refCandidates) {
      const refId = `page_${String(refIdx).padStart(2, '0')}`
      const refUrl = `https://res.cloudinary.com/${CLOUD}/image/upload/${folder}/${refId}.png`
      try {
        const refRes = await fetch(refUrl)
        if (refRes.ok) {
          characterBase64 = Buffer.from(await refRes.arrayBuffer()).toString('base64')
          break
        }
      } catch { continue }
    }
    if (!characterBase64) {
      return NextResponse.json({ error: 'No generated pages found for this order in Cloudinary. Make sure the full book was generated first.' }, { status: 404 })
    }

    const pagePrompt = book.pagePrompts[idx]
      .replace(/\[CHILD_NAME\]/g, childName)
      .replace(/\[SENDER_NAME\]/g, senderName || '')
      .replace(/\[DEDICATION\]/g, dedication || `A special book made with love just for ${childName}.`)

    const staffInstruction = staffNote
      ? `\n\nSTAFF REVISION NOTE — apply this change to the image:\n${staffNote}`
      : ''

    // Cover: Gemini must never draw a logo — we composite the real one afterwards
    const noLogoInstruction = idx === 0
      ? `\n\nCRITICAL — NO LOGO: Do NOT draw, write, or paint any logo, brand name, watermark, icon, or text on the LEFT SIDE of the image. Leave the entire left-center area completely bare — no objects, no text, no decorative marks of any kind. A logo will be added programmatically after generation.`
      : ''

    const fullPrompt = `${pagePrompt}${staffInstruction}${noLogoInstruction}

CRITICAL — CHARACTER CONSISTENCY: The reference image provided is a spread page from the same book. The child character appears in the RIGHT HALF of that image. Extract and match that exact child — identical face, identical hair color and style, identical skin tone, identical beige knit cardigan sweater with buttons, identical cream pants. Do not substitute a generic character. Do not alter their appearance in any way.`

    let pageBase64 = await callGemini([
      { inlineData: { mimeType: 'image/png', data: characterBase64 } },
      { text: fullPrompt },
    ])

    if (idx === 0) {
      pageBase64 = await compositeLogoOnCover(pageBase64)
    }

    const pageUrl = await uploadToCloudinary(pageBase64, folder, publicId)
    return NextResponse.json({ url: pageUrl })
  } catch (err: any) {
    console.error('Regenerate page error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
