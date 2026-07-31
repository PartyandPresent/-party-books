// Quick cover text-only composite for layout verification
// Run from project root: node test-cover-render.mjs
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import * as fontkit from 'fontkit'

const CWD      = process.cwd()
const NAME     = process.argv[2] ?? 'Miya'
const SLUG     = 'kinder-to-beyond'
const FONT_FILE = 'KGMissKindyMarker.ttf'
const FONT_PATH = path.join(CWD, 'public/books', SLUG, 'fonts', FONT_FILE)
const BG_PATH   = path.join(CWD, 'public/books', SLUG, 'backgrounds/page-00-cover.png')
const OUT       = path.join(CWD, `test-renders/cover-${NAME}.png`)

fs.mkdirSync(path.join(CWD, 'test-renders'), { recursive: true })

const b64  = fs.readFileSync(FONT_PATH).toString('base64')
const font = fontkit.openSync(FONT_PATH)
const capH = (font.capHeight / font.unitsPerEm)

function svgY(y, fs) { return y + capH * fs }

function wrapText(text, maxW, fs) {
  const lines = []
  const spaceW = measureW(' ', fs)
  for (const para of text.split('\n')) {
    if (!para) { lines.push(''); continue }
    const words = para.split(' ')
    let cur = '', curW = 0
    for (const w of words) {
      const wW = measureW(w, fs)
      const cand = cur ? curW + spaceW + wW : wW
      if (cur && cand > maxW + 1) { lines.push(cur); cur = w; curW = wW }
      else { cur = cur ? `${cur} ${w}` : w; curW = cand }
    }
    if (cur) lines.push(cur)
  }
  return lines
}

function measureW(text, fs) {
  if (!text) return 0
  const units = font.layout(text).glyphs.reduce((s, g) => s + g.advanceWidth, 0)
  return (units / font.unitsPerEm) * fs
}

function xmlEsc(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}

const blocks = [
  { id:'child-name',  text: NAME,            x:1245, y:64,  maxW:592, fs:135, color:'#ffd366', stroke:'#405b89', strokeW:10, arch:5 },
  { id:'goes-to',     text:'goes to',        x:1454, y:196, maxW:173, fs:40,  color:'#405b89', stroke:'#ffffff', strokeW:6 },
  { id:'title-main',  text:'Kindergarten',   x:1167, y:640, maxW:745, fs:99,  color:'#1a2744', stroke:'#ffffff', strokeW:8,  arch:-5, letterColors:['#2b48b5','#e5322d','#f7c200','#2ea833','#7c28be','#e5322d','#2ea833','#f7c200','#2b48b5','#e5322d','#2ea833','#7c28be'] },
  { id:'title-beyond',text:'Beyond',         x:1299, y:781, maxW:497, fs:120, color:'#1a2744', stroke:'#ffffff', strokeW:10, arch:-5, letterColors:['#2b48b5','#2ea833','#7c28be','#e5322d','#f7c200','#2ea833'] },
  { id:'title-and',   text:'and',            x:1506, y:796, maxW:67,  fs:33,  color:'#405b89' },
]

const faceRule = `@font-face{font-family:'KG Miss Kindy Marker';src:url('data:font/truetype;base64,${b64}') format('truetype');}`

const textEls = blocks.map(b => {
  const lines    = wrapText(b.text, b.maxW, b.fs)
  const lineStep = b.fs * 1.4
  const baseY    = svgY(b.y, b.fs)
  const cx       = b.x + b.maxW / 2
  const strokeAttrs = b.stroke ? ` stroke="${b.stroke}" stroke-width="${b.strokeW}" stroke-linejoin="round" stroke-linecap="round" paint-order="stroke fill"` : ''

  if (b.arch || b.letterColors) {
    let gIdx = 0
    const items = []
    for (const [lineIdx, l] of lines.entries()) {
      const lineY = baseY + lineIdx * lineStep
      const chars = Array.from(l)
      const lineW = measureW(l, b.fs)
      const archH = b.arch ? (b.arch / 100) * lineW : 0
      const halfW = lineW / 2
      let curX = cx - lineW / 2
      for (const ch of chars) {
        const chW = measureW(ch, b.fs)
        const chCX = curX + chW / 2
        const xRel = chCX - cx
        const dy = (b.arch && halfW > 0) ? -archH * (1 - Math.min(1, (Math.abs(xRel) / halfW) ** 2)) : 0
        const color = b.letterColors ? b.letterColors[gIdx % b.letterColors.length] : b.color
        items.push({ x: chCX.toFixed(1), y: (lineY + dy).toFixed(1), color, ch })
        gIdx++
        curX += chW
      }
    }
    const base = `text-anchor="middle" font-family="KG Miss Kindy Marker" font-size="${b.fs}"`
    const sPass = b.stroke
      ? items.map(d => `<text x="${d.x}" y="${d.y}" ${base} fill="none" stroke="${b.stroke}" stroke-width="${b.strokeW}" stroke-linejoin="round" stroke-linecap="round">${xmlEsc(d.ch)}</text>`).join('')
      : ''
    const fPass = items.map(d => `<text x="${d.x}" y="${d.y}" ${base} fill="${d.color}">${xmlEsc(d.ch)}</text>`).join('')
    return sPass + fPass
  }

  const tspans = lines.map((l,i) =>
    `<tspan x="${cx}" dy="${i===0?0:lineStep}">${xmlEsc(l)}</tspan>`
  ).join('')
  return `<text x="${cx}" y="${baseY.toFixed(1)}" text-anchor="middle" font-family="KG Miss Kindy Marker" font-size="${b.fs}" fill="${b.color}"${strokeAttrs}>${tspans}</text>`
}).join('')

const glow = '<defs><radialGradient id="ktbglow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/><stop offset="60%" stop-color="#ffffff" stop-opacity="0.32"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient></defs><ellipse cx="1540" cy="790" rx="450" ry="200" fill="url(#ktbglow)"/>'
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1000"><defs><style>${faceRule}</style></defs>${glow}${textEls}</svg>`

const bg = await sharp(BG_PATH).resize(2000, 1000, { fit: 'fill' }).toBuffer()
await sharp(bg)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .png()
  .toFile(OUT)

console.log('Cover render saved to', OUT)