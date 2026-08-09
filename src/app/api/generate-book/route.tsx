import { NextRequest, NextResponse } from 'next/server'
import { getBookBySlug } from '@/lib/books'
import { getBookRenderConfig, type BookRenderConfig } from '@/lib/bookRenderConfig'
import { type BookPage } from '@/lib/books/before-the-music-plays'
import { compositeTextBlocks, detectCharacterBounds, resolveTextCollisions, type TextReplacements } from '@/lib/compositeText'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-3.1-flash-image'

// ─── Existing helpers (unchanged) ────────────────────────────────────────────

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function compositeLogoOnCover(coverBase64: string, logoStyle: 'white' | 'color' = 'white'): Promise<string> {
  try {
    // 'white' → Final_Logo_White.png forced pure white (for dark/illustrated covers)
    // 'color' → Final_Logo.png in its natural brand colors (pink/coral)
    const logoFile = logoStyle === 'color' ? 'Final_Logo.png' : 'Final_Logo_White.png'
    const logoPath = path.join(process.cwd(), 'public', logoFile)
    const logoBuffer = fs.readFileSync(logoPath)
    const coverBuffer = Buffer.from(coverBase64, 'base64')

    const { width = 1792, height = 896 } = await sharp(coverBuffer).metadata()

    const logoWidth = Math.round(width * 0.14)

    if (logoStyle === 'color') {
      // Use the logo as-is — preserve its natural colors
      const { info } = await sharp(logoBuffer)
        .resize(logoWidth, null, { fit: 'inside' })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })

      const resizedLogo = await sharp(logoBuffer)
        .resize(logoWidth, null, { fit: 'inside' })
        .png()
        .toBuffer()

      const leftPageW = Math.round(width / 2)
      const left = Math.round((leftPageW - info.width) / 2)
      const top  = Math.round((height - info.height) / 2)

      const result = await sharp(coverBuffer)
        .composite([{ input: resizedLogo, left, top, blend: 'over' }])
        .png()
        .toBuffer()

      return result.toString('base64')
    }

    // Force all RGB to white so even cream tones become pure white on the cover.
    const { data, info } = await sharp(logoBuffer)
      .resize(logoWidth, null, { fit: 'inside' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    for (let i = 0; i < info.width * info.height; i++) {
      data[i * 4] = 255
      data[i * 4 + 1] = 255
      data[i * 4 + 2] = 255
      // alpha at data[i * 4 + 3] unchanged
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
        if ((msg.toLowerCase().includes('high demand') || msg.toLowerCase().includes('overloaded') || msg.toLowerCase().includes('internal error')) && attempt < delays.length) {
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

// Extracted from the POST handler so both pipelines share the same Step 1 prompt.
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


// Scene generation pipeline for one page (3-image approach):
//   Image 1: Background (locked — preserve pixel-for-pixel, only fill where char is placed)
//   Image 2: Character reference (locked face/hair/skin from Step 1)
//   Image 3: Pose reference mockup (use ONLY for character scale/position/pose — do NOT copy pixels)
//
//   Gemini integrates the character from Image 2 into the scene from Image 1, using Image 3
//   only as a layout guide. This matches the reference designs (e.g. page 2: child sitting
//   IN the bed at the right scale) without the cutout-compositing floating/size issues.
//   Shadow/grounding is handled naturally by Gemini matching the scene's lighting.
//
//   Resize output to canvas dimensions (1774×887), composite logo on cover, composite text.
async function fetchPublicFile(assetPath: string): Promise<Buffer> {
  const relativePath = assetPath.replace(/^\//, '').replace(/^public\//, '')
  const fullPath = path.join(process.cwd(), 'public', relativePath)
  return fs.readFileSync(fullPath)
}

async function generateCompositedPage(
  page: BookPage,
  characterBase64: string,
  customer: { childName: string; senderName: string; dedication?: string; siblingFullName?: string; siblingBirthDate?: string; giftDate?: string },
  config: BookRenderConfig,
): Promise<string> {
  const bgBuffer = await fetchPublicFile(page.backgroundAsset)

  // Customer text resolved here. NEVER sent to Gemini.
  const replacements: TextReplacements = {
    CHILD_NAME:         customer.childName,
    CHILD_FULL_NAME:    customer.childName,
    SENDER_NAME:        customer.senderName,
    CHILD_NAME_UPPER:   customer.childName.toUpperCase(),
    DEDICATION:         customer.dedication ||
      getBookBySlug(config.bookSlug)?.defaultDedication?.replace(/\[CHILD_NAME\]/g, customer.childName) ||
      '',
    SIBLING_FULL_NAME:  customer.siblingFullName  || '',
    SIBLING_BIRTH_DATE: customer.siblingBirthDate || '',
    DATE:               customer.giftDate || '',
  }

  // Pages without a character — background + text only
  if (!page.characterPlacement) {
    const withText = await compositeTextBlocks(
      bgBuffer, page.textBlocks, replacements, config.canvasW, config.canvasH, config.bookSlug,
      page.svgOverlay,
    )
    return withText.toString('base64')
  }

  const bgBase64 = bgBuffer.toString('base64')

  // poseReference images are NOT sent to Gemini — they show a placeholder child and
  // Gemini copies that child's appearance even with "don't copy" instructions.
  // Scene composition is described entirely via characterActionPrompt text.
  const scenePrompt =
    `${page.characterActionPrompt}

IMAGE ROLES:
- IMAGE 1 is the BACKGROUND. Preserve it pixel-for-pixel — do NOT regenerate, recolour, or alter any part of the background. Only fill in the area where the character is placed.
- IMAGE 2 is the CHARACTER REFERENCE — the real child this book is for. Reproduce their face, eyes, nose, lips, skin tone, hair colour, hair length, and hairstyle EXACTLY. IMAGE 2 is the ONLY valid source for the child's identity and appearance.

RULES:
- CHARACTER IDENTITY: The child's face, hair, and skin tone must match Image 2 exactly. Do NOT alter or blend the child's appearance based on scene lighting or environment.
- SKIN TONE — CRITICAL: The child's skin tone is a fixed identity attribute from Image 2. It must NOT change in response to scene lighting. Warm or cosy lighting must NOT tan or darken it; cool lighting must NOT lighten or desaturate it. The skin tone in the output must be visually identical to Image 2 regardless of scene brightness or colour temperature.
- HAIR: Do NOT add headdress, hat, crown, tiara, feathers, or any accessories not visible in Image 2.
- COSTUME: Unless the scene description above explicitly specifies a different outfit, ${config.costumeRule}
- TEXT: Leave all text areas of the canvas completely blank and clean — text is composited in post-production. Do NOT generate any letters, words, or labels.
- GROUNDING: Add a subtle, soft contact shadow beneath the character's feet consistent with the lighting direction already present in Image 1.
- OUTPUT: The complete scene. Same 2:1 landscape ratio as Image 1. No added text, watermarks, or labels of any kind.`

  const geminiParts: any[] = [
    { inlineData: { mimeType: 'image/png', data: bgBase64 } },
    { inlineData: { mimeType: 'image/png', data: characterBase64 } },
  ]
  geminiParts.push({ text: scenePrompt })

  const sceneBase64 = await callGemini(geminiParts)

  // Resize to exact canvas dimensions — Gemini may return a different resolution
  let composite = await sharp(Buffer.from(sceneBase64, 'base64'))
    .resize(config.canvasW, config.canvasH, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer()

  // Mirror page: extract primary character region, flip horizontally, composite as reflection.
  // The primary character is already placed by Gemini; this adds the mirror-glass copy.
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
      data[i] = Math.round(data[i] * 0.78)  // 78% opacity — subtle mirror-glass fade
    }

    const reflectionBuf = await sharp(Buffer.from(data), {
      raw: { width: info.width, height: info.height, channels: 4 },
    }).png().toBuffer()

    composite = await sharp(composite)
      .composite([{ input: reflectionBuf, left: mirrorX, top: cp.y }])
      .png()
      .toBuffer()
  }

  // For covers where the logo is baked into the original background (showLogoOnCover: false),
  // Gemini sometimes overwrites the left-side logo when generating the scene. Fix: restore
  // the left half of the original background pixel-for-pixel on top of Gemini's output.
  if (page.pageIndex === 0 && config.showLogoOnCover === false) {
    const leftW = Math.round(config.canvasW / 2)
    const leftHalf = await sharp(bgBuffer)
      .resize(config.canvasW, config.canvasH, { fit: 'cover', position: 'center' })
      .extract({ left: 0, top: 0, width: leftW, height: config.canvasH })
      .png()
      .toBuffer()
    composite = await sharp(composite)
      .composite([{ input: leftHalf, left: 0, top: 0, blend: 'over' }])
      .png()
      .toBuffer()
  }

  // Real logo on cover (page 0) — skipped when showLogoOnCover is explicitly false
  if (page.pageIndex === 0 && config.showLogoOnCover !== false) {
    const withLogo = await compositeLogoOnCover(composite.toString('base64'), config.logoStyle ?? 'white')
    composite = Buffer.from(withLogo, 'base64')
  }

  // Collision detection: shift text blocks that overlap the character's actual silhouette.
  let textBlocks = page.textBlocks
  if (!page.skipTextCollision) {
    const charBounds = await detectCharacterBounds(characterBase64, page.characterPlacement!)
    textBlocks = resolveTextCollisions(page.textBlocks, charBounds, config.canvasW, config.canvasH)
  }

  // Real text — resolved in Node, never in a Gemini prompt
  const withText = await compositeTextBlocks(
    composite, textBlocks, replacements, config.canvasW, config.canvasH, config.bookSlug,
    page.svgOverlay,
  )
  return withText.toString('base64')
}

// ─── Gender helpers ───────────────────────────────────────────────────────────

function resolveGenderedCostumeRule(rule: string, gender: 'girl' | 'boy'): string {
  if (gender === 'girl') {
    const m = rule.match(/Girls? (?:wear|wears?) ([^.]+)\./i)
    return m ? `The character is a GIRL and wears: ${m[1]}.` : rule
  }
  const m = rule.match(/Boys? (?:wear|wears?) ([^.]+)\./i)
  return m ? `The character is a BOY and wears: ${m[1]}.` : rule
}

// ─── Rate limit ───────────────────────────────────────────────────────────────

const rateLimitMap = new Map<string, number>()

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development'
  const ip = req.headers.get('x-forwarded-for') || 'unknown'

  try {
    const {
      photoBase64, mimeType, bookSlug, childName, childGender, senderName, dedication,
      siblingFullName, siblingBirthDate, giftDate,
      previewIndices, characterBase64: preGeneratedCharacter,
    } = await req.json()

    const gender: 'girl' | 'boy' | '' = childGender || ''

    if (!bookSlug || !childName || !senderName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!preGeneratedCharacter && (!photoBase64 || !mimeType)) {
      return NextResponse.json({ error: 'Missing photo or pre-generated character' }, { status: 400 })
    }

    // Rate limit only applies to page generation (the expensive multi-call step),
    // and only when not using a pre-approved character from the new flow
    if (!preGeneratedCharacter) {
      const lastCall = rateLimitMap.get(ip) || 0
      const tenMinutes = 10 * 60 * 1000
      if (!isDev && Date.now() - lastCall < tenMinutes) {
        const waitSeconds = Math.ceil((tenMinutes - (Date.now() - lastCall)) / 1000)
        return NextResponse.json({ error: `Please wait ${waitSeconds} seconds before generating again.` }, { status: 429 })
      }
      rateLimitMap.set(ip, Date.now())
    }

    // Resolve book config. Compositing-pipeline books are identified by getBookRenderConfig;
    // legacy books (pagePrompts-based) are looked up in books.ts instead.
    const bookConfig = getBookRenderConfig(bookSlug)
    let legacyBook: ReturnType<typeof getBookBySlug> | null = null
    if (!bookConfig) {
      legacyBook = getBookBySlug(bookSlug)
      if (!legacyBook || !legacyBook.pagePrompts || legacyBook.pagePrompts.length === 0) {
        return NextResponse.json({ error: 'Book not found or prompts missing' }, { status: 404 })
      }
    }

    // ─── Step 1 — Generate character (unchanged; same for all books) ──────────
    let characterBase64 = preGeneratedCharacter

    if (!characterBase64) {
      const characterPrompt = bookConfig?.characterPrompt || legacyBook?.characterPrompt || DEFAULT_CHARACTER_PROMPT
      characterBase64 = await callGemini([
        { inlineData: { mimeType, data: photoBase64 } },
        { text: characterPrompt },
      ])
    }

    // ─── Step 2 — Generate pages ──────────────────────────────────────────────

    // New compositing pipeline
    if (bookConfig) {
      const { pages } = bookConfig

      // Resolve gender-specific costumeRule so Gemini never guesses from hairstyle
      const resolvedConfig = gender
        ? { ...bookConfig, costumeRule: resolveGenderedCostumeRule(bookConfig.costumeRule, gender) }
        : bookConfig

      const indicesToGenerate: number[] = (previewIndices
        || Array.from({ length: pages.length }, (_, i) => i))
        .map((i: number) => Math.min(i, pages.length - 1))
      const generatedPages: string[] = []

      for (const pageIndex of indicesToGenerate) {
        const pageBase64 = await generateCompositedPage(
          pages[pageIndex],
          characterBase64,
          { childName, senderName, dedication, siblingFullName, siblingBirthDate, giftDate },
          resolvedConfig,
        )
        generatedPages.push(pageBase64)
      }

      return NextResponse.json({ character: characterBase64, pages: generatedPages })
    }

    // Legacy pipeline — unchanged for all other books
    // legacyBook and pagePrompts are guaranteed non-null here (early return above).
    const book = legacyBook!
    const prompts = book.pagePrompts!
    const indicesToGenerate: number[] = previewIndices ||
      Array.from({ length: prompts.length }, (_, i) => i)
    const generatedPages: string[] = []

    for (let i = 0; i < indicesToGenerate.length; i++) {
      const pageIndex = indicesToGenerate[i]
      const pagePrompt = prompts[pageIndex]
        .replace(/\[CHILD_NAME_UPPER\]/g, childName.toUpperCase())
        .replace(/\[CHILD_NAME\]/g, childName)
        .replace(/\[SENDER_NAME\]/g, senderName)
        .replace(/\[DEDICATION\]/g, dedication ||
          book.defaultDedication?.replace(/\[CHILD_NAME\]/g, childName) ||
          '')

      const consistencyNote = book.characterConsistencyNote ||
        `CRITICAL — CHARACTER MUST MATCH THE REFERENCE IMAGE: The first image provided is the character reference. Use the EXACT same child — identical face, identical hair color and style, identical skin tone, identical beige knit cardigan sweater with buttons, identical cream pants. Do not substitute a generic character. Do not alter their appearance in any way.`

      const fullPrompt = `${pagePrompt}\n\n${consistencyNote}`
      const parts = [
        { inlineData: { mimeType: 'image/png', data: characterBase64 } },
        { text: fullPrompt },
      ]

      let pageBase64 = await callGemini(parts)

      // Composite the real logo onto the cover after Gemini generates it
      if (pageIndex === 0) {
        pageBase64 = await compositeLogoOnCover(pageBase64, book.coverLogoStyle ?? 'white')
      }

      generatedPages.push(pageBase64)
    }

    return NextResponse.json({ character: characterBase64, pages: generatedPages })

  } catch (err: any) {
    console.error('Generate book error:', err)
    return NextResponse.json({ error: err.message || 'Failed to generate book' }, { status: 500 })
  }
}