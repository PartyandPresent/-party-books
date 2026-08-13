import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'
import { getBookRenderConfig } from '@/lib/bookRenderConfig'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3.1-flash-image'

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function callGemini(promptParts: any[]): Promise<string> {
  // Longer delays for rate-limit recovery; abort retries use a short fixed 5s gap
  const rateDelays = [15000, 30000]
  for (let attempt = 0; attempt <= rateDelays.length; attempt++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 90000)
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
        const body = await res.json().catch(() => ({}))
        console.error(`Gemini ${res.status} (attempt ${attempt}):`, JSON.stringify(body))
        if (attempt < rateDelays.length) { await sleep(rateDelays[attempt]); continue }
        throw new Error('Our AI is busy right now. Please try again in a moment.')
      }
      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        const msg = e?.error?.message || `Gemini error ${res.status}`
        if ((msg.toLowerCase().includes('high demand') || msg.toLowerCase().includes('overloaded')) && attempt < rateDelays.length) {
          await sleep(rateDelays[attempt]); continue
        }
        throw new Error(msg)
      }
      const data = await res.json()
      const imgPart = data?.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)
      if (!imgPart) throw new Error('No image returned from Gemini')
      return imgPart.inlineData.data as string
    } catch (e: any) {
      if (attempt < rateDelays.length && (e.message?.includes('high demand') || e.message?.includes('overload') || e.message?.includes('abort'))) {
        // Short 5s retry gap for slow/aborted calls; full rate-delay for API errors
        await sleep(e.message?.includes('abort') ? 5000 : rateDelays[attempt]); continue
      }
      throw e
    }
  }
  throw new Error('Max retries exceeded')
}

const DEFAULT_CHARACTER_PROMPT = `Create a full-body 3D Pixar/Disney animated character of the EXACT child shown in the uploaded photo.

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


function injectGender(prompt: string, gender: 'girl' | 'boy' | ''): string {
  if (!gender) return prompt
  const genderWord = gender === 'girl' ? 'GIRL' : 'BOY'
  const injection = `GENDER — EXPLICIT OVERRIDE: This child is a ${genderWord}. Generate a ${genderWord} character regardless of hairstyle length, hair style, or any other visual cue in the photo. Do NOT infer gender from the photo.`
  const replaced = prompt.replace(/- GENDER:.*(\n|$)/, `- ${injection}\n`)
  // If the pattern wasn't found, prepend the override so it always takes effect.
  return replaced !== prompt ? replaced : `${injection}\n\n${prompt}`
}

export async function POST(req: NextRequest) {
  try {
    const { photoBase64, mimeType, bookSlug, gender } = await req.json()

    if (!photoBase64 || !mimeType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Use book-specific character prompt if available, otherwise use default.
    // BookRenderConfig takes priority (compositing-pipeline books store it there).
    let characterPrompt = DEFAULT_CHARACTER_PROMPT
    if (bookSlug) {
      const bookConfig = getBookRenderConfig(bookSlug)
      const legacyBook = getBookBySlug(bookSlug)
      characterPrompt = bookConfig?.characterPrompt || legacyBook?.characterPrompt || DEFAULT_CHARACTER_PROMPT
    }

    characterPrompt = injectGender(characterPrompt, gender || '')

    const characterBase64 = await callGemini([
      { inlineData: { mimeType, data: photoBase64 } },
      { text: characterPrompt },
    ])

    return NextResponse.json({ character: characterBase64 })

  } catch (err: any) {
    console.error('Generate character error:', err)
    return NextResponse.json({ error: err.message || 'Failed to generate character' }, { status: 500 })
  }
}
