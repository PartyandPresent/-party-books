import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3-pro-image-preview'

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function callGemini(promptParts: any[], expectImage = true): Promise<string> {
  const delays = [5000, 10000, 20000]

  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      const modalities = expectImage ? ['IMAGE'] : ['TEXT']

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: promptParts }],
            generationConfig: { responseModalities: modalities },
          }),
        }
      )

      if (res.status === 429 || res.status === 503) {
        if (attempt < delays.length) {
          await sleep(delays[attempt])
          continue
        }
        throw new Error('Gemini server is overloaded. Please try again.')
      }

      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        const msg = e?.error?.message || `Gemini error ${res.status}`
        if (msg.toLowerCase().includes('high demand') || msg.toLowerCase().includes('overloaded')) {
          if (attempt < delays.length) {
            await sleep(delays[attempt])
            continue
          }
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
      if (attempt < delays.length && (e.message?.includes('high demand') || e.message?.includes('overload'))) {
        await sleep(delays[attempt])
        continue
      }
      throw e
    }
  }
  throw new Error('Max retries exceeded')
}

// Rate limiting — disabled in development
const rateLimitMap = new Map<string, number>()

export async function POST(req: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development'
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const lastCall = rateLimitMap.get(ip) || 0
  const tenMinutes = 10 * 60 * 1000
  if (!isDev && Date.now() - lastCall < tenMinutes) {
    const waitSeconds = Math.ceil((tenMinutes - (Date.now() - lastCall)) / 1000)
    return NextResponse.json(
      { error: `Please wait ${waitSeconds} seconds before generating again.` },
      { status: 429 }
    )
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

    // Step 1 — Generate character
    const characterPrompt = `Create a full-body 3D Pixar/Disney animated character of the EXACT child shown in the uploaded photo.

COPY THESE EXACTLY FROM THE PHOTO — do not change anything:
- FACE: same face shape, same eyes, same nose, same lips, same cheeks, same expression
- SKIN TONE: copy the exact skin tone from the photo — do not lighten or darken it
- HAIR: copy the exact hair color precisely and copy the same hairstyle exactly
- GENDER: if the photo shows a girl, generate a GIRL. If a boy, generate a BOY. Do not change.
- FRECKLES or MARKS: if the child has freckles or marks, include them

3D ANIMATION STYLE: Pixar/Disney quality, soft rounded toddler body proportions, chubby cheeks, big expressive eyes, smooth shading, warm cinematic lighting, premium storybook quality.
OUTFIT: cream/beige knit sweater, neutral warm tones.
BACKGROUND: plain white only — no scenery, no props, no text.
POSE: full body head to toe, centered, natural standing pose, both feet visible.`

    const characterBase64 = await callGemini([
      { inlineData: { mimeType, data: photoBase64 } },
      { text: characterPrompt },
    ])

    // Step 2 — Generate all 17 pages
    const generatedPages: string[] = []

    const indicesToGenerate: number[] = previewIndices || Array.from({ length: book.pagePrompts.length }, (_, i) => i)
for (let i = 0; i < indicesToGenerate.length; i++) {
  const pageIndex = indicesToGenerate[i]
      const pagePrompt = book.pagePrompts[pageIndex]
        .replace(/\[CHILD_NAME\]/g, childName)
        .replace(/\[SENDER_NAME\]/g, senderName)
        .replace(/\[DEDICATION\]/g, dedication || `A book made with love for ${childName}.`)

      const fullPrompt = `${pagePrompt}

IMPORTANT: Keep the exact same character — same face, hair, skin tone, and beige knit sweater outfit as shown in the reference image. Do not change the character's appearance in any way.`

      const pageBase64 = await callGemini([
        { inlineData: { mimeType: 'image/png', data: characterBase64 } },
        { text: fullPrompt },
      ])

      generatedPages.push(pageBase64)
    }

    return NextResponse.json({
      character: characterBase64,
      pages: generatedPages,
    })

  } catch (err: any) {
    console.error('Generate book error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to generate book' },
      { status: 500 }
    )
  }
}