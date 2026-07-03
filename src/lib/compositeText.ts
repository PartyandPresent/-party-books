// src/lib/compositeText.ts
//
// Renders BookPageTextBlock[] onto a sharp image buffer as real composited text.
//
// Approach: build a single transparent SVG (1774×887, matching the book canvas)
// with @font-face rules embedding the custom fonts as base64. sharp composites
// the SVG over the image using librsvg (bundled with sharp). One SVG composite
// per page, not one per block — reduces back-and-forth copies.
//
// Font loading: fonts live in public/books/{slug}/fonts/{fontFileName}.
// They are embedded as base64 data URIs in the SVG <style> block.
// librsvg needs fonts available at render time and cannot fetch over the network,
// so embedding is the only reliable path on Vercel.
//
// Text wrapping: SVG <text> does not auto-wrap. We use fontkit to load each font
// file once and call font.layout(text) to get real shaped advance widths. This
// matches Canva's wrapping exactly, replacing the old CHAR_WIDTH_RATIO estimates.
// A 1 px sub-pixel tolerance is applied so strings that Canva fits on one line
// (e.g. "Music Plays" = 466.7 px in a 466 px box) are not incorrectly broken.
//
// Baseline anchor: the designer's Y coordinates are Canva-style cap-height tops
// (the visual top of capital letters). We convert to SVG alphabetic-baseline Y by
// adding capHeight/unitsPerEm × fontSize per font — computed once per font from
// the OS/2 sCapHeight value, never re-derived per string. dominant-baseline is
// not set; we rely on SVG's default "alphabetic" anchor.
//
// Stroke rendering: paint-order="stroke fill" ensures the stroke renders behind
// the fill, so stroke width doesn't eat into the visible letterform.
// Requires librsvg ≥ 2.42 (bundled with sharp ≥ 0.28).

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fontkit = require('fontkit') as typeof import('fontkit')
import type { BookPageTextBlock } from './books/before-the-music-plays'

// ─── Font caches ──────────────────────────────────────────────────────────────

// base64 cache — for SVG @font-face embedding
const fontBase64Cache = new Map<string, string>()

// fontkit cache — for advance-width measurement and cap-height metrics
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fontkitCache = new Map<string, any>()

function loadFontBase64(fontFileName: string, bookSlug: string): string {
  const key = `${bookSlug}/${fontFileName}`
  if (fontBase64Cache.has(key)) return fontBase64Cache.get(key)!
  const fontPath = path.join(process.cwd(), 'public', 'books', bookSlug, 'fonts', fontFileName)
  const data = fs.readFileSync(fontPath).toString('base64')
  fontBase64Cache.set(key, data)
  return data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadFontkitFont(fontFileName: string, bookSlug: string): any {
  const key = `${bookSlug}/${fontFileName}`
  if (fontkitCache.has(key)) return fontkitCache.get(key)
  const fontPath = path.join(process.cwd(), 'public', 'books', bookSlug, 'fonts', fontFileName)
  const font = fontkit.openSync(fontPath)
  fontkitCache.set(key, font)
  return font
}

function fontMimeType(fileName: string): string {
  return fileName.endsWith('.otf') ? 'font/opentype' : 'font/truetype'
}

function fontFormat(fileName: string): string {
  return fileName.endsWith('.otf') ? 'opentype' : 'truetype'
}

// Map filename → CSS font-family name.
// The internal family name inside the font file may differ from the filename stem.
const FONT_FAMILY_OVERRIDES: Record<string, string> = {
  'MoreSugar-Regular.otf': 'MoreSugar',
  'MoreSugar-Regular.ttf': 'MoreSugar',
}

function fontFamilyName(fileName: string): string {
  return FONT_FAMILY_OVERRIDES[fileName] ?? fileName.replace(/\.(ttf|otf|woff2?)$/i, '')
}

// librsvg (bundled with sharp) does not reliably load @font-face base64 data URIs
// on all platforms. The most reliable approach is fontconfig: on Vercel (Linux),
// write fonts to /tmp and point fontconfig at that directory. On Windows (dev),
// install the fonts into the system Fonts folder so Pango finds them by name.
let fontconfigInitialised = false

function ensureFontsRegistered(bookSlugs: string[]): void {
  if (fontconfigInitialised) return
  try {
    const tmpDir = path.join('/tmp', 'book-fonts')
    fs.mkdirSync(tmpDir, { recursive: true })
    for (const slug of bookSlugs) {
      const fontsDir = path.join(process.cwd(), 'public', 'books', slug, 'fonts')
      if (!fs.existsSync(fontsDir)) continue
      for (const f of fs.readdirSync(fontsDir)) {
        if (!/\.(ttf|otf)$/i.test(f)) continue
        const dest = path.join(tmpDir, f)
        if (!fs.existsSync(dest)) fs.copyFileSync(path.join(fontsDir, f), dest)
      }
    }
    const confPath = path.join('/tmp', 'book-fonts.conf')
    fs.writeFileSync(confPath, `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${path.join('/tmp', 'book-fonts')}</dir>
  <cachedir>/tmp/fontconfig-cache</cachedir>
</fontconfig>`)
    process.env.FONTCONFIG_FILE = confPath
    fontconfigInitialised = true
  } catch {
    // On Windows dev — fonts must be installed to C:\Windows\Fonts.
    fontconfigInitialised = true
  }
}

// ─── Real glyph metrics ───────────────────────────────────────────────────────

// Returns the advance width of `text` in pixels at `fontSize`, using fontkit's
// shaped glyph run (includes kerning via GPOS). This is what Canva uses.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function measureWidth(text: string, font: any, fontSize: number): number {
  if (!text) return 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const units: number = font.layout(text).glyphs.reduce((s: number, g: any) => s + g.advanceWidth, 0)
  return (units / font.unitsPerEm) * fontSize
}

// Returns the cap-height offset in pixels for `font` at `fontSize`.
// This is the distance from the top of the em square (SVG y=0 in alphabetic mode)
// down to the visual top of capital letters — i.e. the adjustment needed so that
// the designer's Canva Y (= cap-height top) maps to SVG's alphabetic baseline.
//
// Concretely:  svgBaseline = designerY + capHeightPx(font, fontSize)
//
// Values computed once per (font, fontSize) pair from OS/2 sCapHeight:
//   Chillink:     capHeight=1538, unitsPerEm=2048  → 1538/2048 × fontSize
//   MoreSugar:    capHeight=761,  unitsPerEm=1000  → 0.761 × fontSize
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function capHeightPx(font: any, fontSize: number): number {
  const capH: number = (font.capHeight > 0) ? font.capHeight : font.ascent * 0.72
  return (capH / font.unitsPerEm) * fontSize
}

// ─── Text wrapping ────────────────────────────────────────────────────────────

// Wraps `text` into lines that fit within `maxWidth` pixels at `fontSize`,
// using real per-glyph advance widths from fontkit. Explicit \n in the template
// always forces a line break. Each word is measured once and the total candidate
// width is checked against maxWidth + SUB_PIXEL_TOLERANCE: the 1 px tolerance
// accounts for sub-pixel rounding differences between Canva and fontkit (e.g.
// "Music Plays" measures 466.7 px against a 466 px box — Canva fits it; we do too).
const SUB_PIXEL_TOLERANCE = 1

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  const lines: string[] = []
  const spaceW = measureWidth(' ', font, fontSize)

  for (const para of text.split('\n')) {
    if (para === '') { lines.push(''); continue }
    const words = para.split(' ')
    const wordWidths = words.map(w => measureWidth(w, font, fontSize))
    let current = ''
    let currentW = 0
    for (let i = 0; i < words.length; i++) {
      const candidateW = current ? currentW + spaceW + wordWidths[i] : wordWidths[i]
      if (current && candidateW > maxWidth + SUB_PIXEL_TOLERANCE) {
        lines.push(current)
        current = words[i]
        currentW = wordWidths[i]
      } else {
        current = current ? `${current} ${words[i]}` : words[i]
        currentW = candidateW
      }
    }
    if (current) lines.push(current)
  }
  return lines
}

// ─── SVG builder ─────────────────────────────────────────────────────────────

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSVG(
  textBlocks: BookPageTextBlock[],
  resolvedTemplates: Map<string, string>,
  canvasWidth: number,
  canvasHeight: number,
  bookSlug: string,
): string {
  ensureFontsRegistered([bookSlug])

  const fontFiles = new Set(textBlocks.map(b => b.fontFamily))

  const fontFaceRules = Array.from(fontFiles).map(fileName => {
    const b64  = loadFontBase64(fileName, bookSlug)
    const mime = fontMimeType(fileName)
    const fmt  = fontFormat(fileName)
    const name = fontFamilyName(fileName)
    return `@font-face{font-family:'${name}';src:url('data:${mime};base64,${b64}') format('${fmt}');}`
  }).join(' ')

  const textElements = textBlocks.map(block => {
    const resolved   = resolvedTemplates.get(block.id) ?? block.template
    const font       = loadFontkitFont(block.fontFamily, bookSlug)

    // Real glyph-based wrapping — no per-font ratio constants.
    const lines      = wrapText(resolved, block.maxWidth, font, block.fontSize)
    const lineStep   = block.fontSize * (block.lineHeight ?? 1.4)
    const family     = fontFamilyName(block.fontFamily)

    // Convert designer's cap-height Y to SVG alphabetic baseline Y.
    // Designer tools (Canva) anchor text at the visual top of capital letters.
    // SVG "alphabetic" baseline sits at the baseline (below cap top by capHeight px).
    const svgY = block.y + capHeightPx(font, block.fontSize)

    const anchor = block.align === 'center' ? 'middle'
                 : block.align === 'right'  ? 'end'
                 : 'start'
    const tspanX = block.align === 'center' ? block.x + block.maxWidth / 2
                 : block.align === 'right'  ? block.x + block.maxWidth
                 : block.x

    // dy=0 on the first tspan keeps it at svgY (baseline of line 1).
    // Subsequent tspans advance by lineStep (baseline-to-baseline distance).
    const tspans = lines.map((line, i) =>
      `<tspan x="${tspanX}" dy="${i === 0 ? 0 : lineStep}">${xmlEscape(line)}</tspan>`
    ).join('')

    const strokeAttrs = (block.strokeColor && block.strokeWidth)
      ? ` stroke="${block.strokeColor}" stroke-width="${block.strokeWidth}" paint-order="stroke fill"`
      : ''

    // No dominant-baseline attr — SVG default is "alphabetic", which is what we want.
    return (
      `<text x="${tspanX}" y="${svgY.toFixed(2)}"` +
      ` text-anchor="${anchor}" font-family="${family}" font-size="${block.fontSize}"` +
      ` fill="${block.color}"${strokeAttrs}>${tspans}</text>`
    )
  }).join('')

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">` +
    `<defs><style>${fontFaceRules}</style></defs>` +
    textElements +
    `</svg>`
  )
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface TextReplacements {
  CHILD_NAME: string
  SENDER_NAME: string
  DEDICATION?: string
  [key: string]: string | undefined
}

/**
 * Composites resolved text blocks onto an image buffer using SVG + librsvg.
 *
 * @param imageBuffer   PNG buffer of the background (+ character already composited)
 * @param textBlocks    Array from BookPage.textBlocks — positions/styles come from here
 * @param replacements  Token values: { CHILD_NAME, SENDER_NAME, DEDICATION }
 * @param canvasWidth   Must match the background asset width (1774 for this book)
 * @param canvasHeight  Must match the background asset height (887 for this book)
 * @param bookSlug      Used to locate fonts: public/books/{bookSlug}/fonts/
 * @returns             PNG buffer with text rendered on top
 */
export async function compositeTextBlocks(
  imageBuffer: Buffer,
  textBlocks: BookPageTextBlock[],
  replacements: TextReplacements,
  canvasWidth: number,
  canvasHeight: number,
  bookSlug: string,
): Promise<Buffer> {
  if (textBlocks.length === 0) return imageBuffer

  // Resolve [PLACEHOLDER] tokens. Customer text is substituted here in Node.js;
  // it is never sent to Gemini.
  const resolvedTemplates = new Map<string, string>()
  for (const block of textBlocks) {
    let resolved = block.template
    for (const [key, value] of Object.entries(replacements)) {
      if (value !== undefined) {
        resolved = resolved.replace(new RegExp(`\\[${key}\\]`, 'g'), value)
      }
    }
    resolvedTemplates.set(block.id, resolved)
  }

  const svg       = buildSVG(textBlocks, resolvedTemplates, canvasWidth, canvasHeight, bookSlug)
  const svgBuffer = Buffer.from(svg, 'utf-8')

  return sharp(imageBuffer)
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .png()
    .toBuffer()
}