import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3.1-flash-image'
const LOGO_URL = 'https://res.cloudinary.com/dft0hfbee/image/upload/f_auto,q_auto/Final_Logo_zvkrqg'

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function fetchImageAsBase64(url: string): Promise<{ data: string; mimeType: string }> {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  const contentType = res.headers.get('content-type') || 'image/png'
  return { data: base64, mimeType: contentType }
}

async function callGemini(promptParts: any[], expectImage = true): Promise<string> {
  const delays = [5000, 10000, 20000]
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      const modalities = expectImage ? ['IMAGE'] : ['TEXT']
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 120000)
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: promptParts }],
            generationConfig: { responseModalities: modalities },
          }),
          signal: controller.signal,
        }
      )
      clearTimeout(timeout)
      if (res.status === 429 || res.status === 503) {
        if (attempt < delays.length) { await sleep(delays[attempt]); continue }
        throw new Error('Gemini server is overloaded. Please try again.')
      }
      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        const msg = e?.error?.message || `Gemini error ${res.status}`
        if ((msg.toLowerCase().includes('high demand') || msg.toLowerCase().includes('overloaded')) && attempt < delays.length) {
          await sleep(delays[attempt]); continue
        }
        throw new Error(msg)
      }
      const data = await res.json()
      if (expectImage) {
        const imgPart = data?.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)
        if (!imgPart) throw new Error('No image returned from Gemini')
        return imgPart.inlineData.data as string
      }
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    } catch (e: any) {
      if (attempt < delays.length && (e.message?.includes('high demand') || e.message?.includes('overload') || e.message?.includes('abort'))) {
        await sleep(delays[attempt]); continue
      }
      throw e
    }
  }
  throw new Error('Max retries exceeded')
}

const rateLimitMap = new Map<string, number>()

export async function POST(req: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development'
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const lastCall = rateLimitMap.get(ip) || 0
  const tenMinutes = 10 * 60 * 1000
  if (!isDev && Date.now() - lastCall < tenMinutes) {
    const waitSeconds = Math.ceil((tenMinutes - (Date.now() - lastCall)) / 1000)
    return NextResponse.json({ error: `Please wait ${waitSeconds} seconds before generating again.` }, { status: 429 })
  }

  try {
    const { photoBase64, mimeType, bookSlug, childName, senderName, dedication, previewIndices } = await req.json()

    if (!photoBase64 || !mimeType || !bookSlug || !childName || !senderName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const book = getBookBySlug(bookSlug)
    if (!book || !book.pagePrompts || book.pagePrompts.length === 0) {
      return NextResponse.json({ error: 'Book not found or prompts missing' }, { status: 404 })
    }

    rateLimitMap.set(ip, Date.now())

    // Fetch logo for cover page
    let logoBase64 = ''
    let logoMime = 'image/png'
    try {
      const logo = await fetchImageAsBase64(LOGO_URL)
      logoBase64 = logo.data
      logoMime = logo.mimeType
    } catch (err) {
      console.error('Failed to fetch logo:', err)
    }

    // Step 1 — Generate character
    const characterPrompt = `Create a full-body 3D Pixar/Disney animated character of the EXACT child shown in the uploaded photo.

COPY EXACTLY FROM THE PHOTO:
- FACE: same face shape, same eyes, same nose, same lips, same cheeks — faithful likeness, not a generic child
- SKIN TONE: copy exact skin tone — do not lighten, darken, or alter in any way
- HAIR: copy exact hair color, length, and hairstyle exactly as shown
- GENDER: match exactly — girl generates a girl character, boy generates a boy character
- FRECKLES or MARKS: include any visible facial features

3D ANIMATION STYLE: Pixar/Disney feature film quality. Soft rounded body proportions. Big expressive eyes. Smooth warm shading. Cinematic lighting — soft warm key light from slightly above and to one side.

OUTFIT: Beige/cream knit cardigan sweater with visible buttons down the front. Cream or white pants. Small neat shoes.

POSE: Full body head to toe. Relaxed natural standing pose. Slight 3/4 angle turned gently toward the viewer rather than straight-on. Warm gentle smile. Arms relaxed naturally at the sides.

BACKGROUND: Plain clean white only. No scenery. No props. No text of any kind. No cast shadow on the background.

FORMAT: 1:1 square ratio. Character centered with clear space on all sides.`

    const characterBase64 = await callGemini([
      { inlineData: { mimeType, data: photoBase64 } },
      { text: characterPrompt },
    ])

    // Step 2 — Generate pages
    const indicesToGenerate: number[] = previewIndices ||
      Array.from({ length: book.pagePrompts.length }, (_, i) => i)

    const generatedPages: string[] = []

    for (let i = 0; i < indicesToGenerate.length; i++) {
      const pageIndex = indicesToGenerate[i]
      const pagePrompt = book.pagePrompts[pageIndex]
        .replace(/\[CHILD_NAME\]/g, childName)
        .replace(/\[SENDER_NAME\]/g, senderName)
        .replace(/\[DEDICATION\]/g, dedication || `A special book made with love just for ${childName}.`)

      const fullPrompt = `${pagePrompt}

CRITICAL — CHARACTER MUST MATCH THE REFERENCE IMAGE: The first image provided is the character reference. Use the EXACT same child — identical face, identical hair color and style, identical skin tone, identical beige knit cardigan sweater with buttons, identical cream pants. Do not substitute a generic character. Do not alter their appearance in any way.`

      let parts: any[]
      if (pageIndex === 0 && logoBase64) {
        parts = [
          { inlineData: { mimeType: 'image/png', data: characterBase64 } },
          { inlineData: { mimeType: logoMime, data: logoBase64 } },
          { text: `${fullPrompt}\n\nLOGO: The second image is the party & presents logo. Place this EXACT logo in white on the left-center side of the cover — clearly visible, faithfully rendered with the PP icon mark and "party & presents" wordmark. Sized to be readable but not dominant.` },
        ]
      } else {
        parts = [
          { inlineData: { mimeType: 'image/png', data: characterBase64 } },
          { text: fullPrompt },
        ]
      }

      const pageBase64 = await callGemini(parts)
      generatedPages.push(pageBase64)
    }

    return NextResponse.json({ character: characterBase64, pages: generatedPages })

  } catch (err: any) {
    console.error('Generate book error:', err)
    return NextResponse.json({ error: err.message || 'Failed to generate book' }, { status: 500 })
  }
}