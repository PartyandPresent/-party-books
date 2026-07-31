// Visualises a proposed characterPlacement on the KTB cover:
// draws a highlight box where the character will land, then side-by-side vs reference.
// Run with: npx tsx test-ktb-char-placement.mts
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { compositeTextBlocks } from './src/lib/compositeText.js'
import { kinderToBeyond } from './src/lib/books/kinder-to-beyond.js'

const outDir = 'test-renders/ktb'
fs.mkdirSync(outDir, { recursive: true })

const CHILD_NAME = 'Ella'
const bookSlug   = 'kinder-to-beyond'

// ── Proposed character placement ──────────────────────────────────────────────
// Reference analysis: head at y≈265, full body showing to y≈960.
// Width ~650px (vs current 900) — character is smaller and proportional.
const CURRENT_PLACEMENT = { x: 1050, y: 230, width: 900,  height: 1200 }
const NEW_PLACEMENT     = { x: 1180, y: 265, width: 650,  height: 735  }

// ── Cover page config ─────────────────────────────────────────────────────────
const cover  = kinderToBeyond.pages[0]
const bgPath = path.join(process.cwd(), cover.backgroundAsset)
const bgResized = await sharp(fs.readFileSync(bgPath))
  .resize(2000, 1000, { fit: 'fill' })
  .png()
  .toBuffer()

// 1. Composite text blocks onto background
const withText = await compositeTextBlocks(
  bgResized,
  cover.textBlocks,
  { CHILD_NAME, CHILD_FULL_NAME: CHILD_NAME, SENDER_NAME: '', DEDICATION: '', CHILD_NAME_UPPER: CHILD_NAME.toUpperCase() },
  2000,
  1000,
  bookSlug,
)

// 2. Draw only the new placement box (yellow)
function boxSvg(p: { x: number; y: number; width: number; height: number }, color: string, label: string) {
  return `<rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}"
    fill="${color}22" stroke="${color}" stroke-width="5" stroke-dasharray="20,10"/>
  <text x="${p.x + p.width / 2}" y="${Math.max(p.y - 12, 20)}"
    font-size="28" fill="${color}" text-anchor="middle" font-family="Arial" font-weight="bold">${label}</text>`
}

const svg = `<svg width="2000" height="1000" xmlns="http://www.w3.org/2000/svg">
  ${boxSvg(NEW_PLACEMENT, '#ffcc00', `x=${NEW_PLACEMENT.x}  y=${NEW_PLACEMENT.y}  w=${NEW_PLACEMENT.width}  h=${NEW_PLACEMENT.height}`)}
</svg>`

const render = await sharp(withText)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .png()
  .toBuffer()

await sharp(render).png().toFile(path.join(outDir, 'cover-char-placement.png'))
console.log('Saved: test-renders/ktb/cover-char-placement.png')

// 3. Side-by-side vs reference (left=proposed boxes, right=reference)
const refPath = path.join(process.cwd(), cover.poseReference!)
const refBuf  = await sharp(fs.readFileSync(refPath))
  .resize(2000, 1000, { fit: 'fill' })
  .png()
  .toBuffer()

await sharp({
  create: { width: 4000, height: 1000, channels: 4, background: { r: 30, g: 30, b: 30, alpha: 1 } },
})
  .composite([
    { input: render, left: 0,    top: 0 },
    { input: refBuf, left: 2000, top: 0 },
  ])
  .png()
  .toFile(path.join(outDir, 'cover-char-compare.png'))

console.log('Saved: test-renders/ktb/cover-char-compare.png  (left=placement boxes, right=reference)')