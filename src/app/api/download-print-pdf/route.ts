import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import sharp from 'sharp'

export const dynamic = 'force-dynamic'

const CLOUD = 'dft0hfbee'
const TOTAL_PAGES = 17

// 16×8 inches at 72pt/inch
const PAGE_W_PT = 16 * 72  // 1152
const PAGE_H_PT = 8 * 72   // 576

function cloudinaryUrl(orderId: string, index: number) {
  const publicId = `page_${String(index).padStart(2, '0')}`
  return `https://res.cloudinary.com/${CLOUD}/image/upload/party-books/orders/${orderId}/${publicId}.png`
}

async function healSpine(imgBuffer: Buffer, spreadW: number, spreadH: number): Promise<Buffer> {
  const { data, info } = await sharp(imgBuffer)
    .resize(spreadW, spreadH, { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const orig = new Uint8Array(data)
  const buf  = new Uint8Array(orig)
  const ch   = info.channels  // 4 (RGBA)

  const cx = Math.round(spreadW / 2)

  // ── Pass 1: 50px zone, sampled row averages ─────────────────────────────
  // Handles continuous-background pages (most pages).
  // Additive-only: only lifts pixels darker than expected — fog cannot form.
  const blendR    = 25
  const sampleW   = 25
  const sampleGap = 8
  const maxLift   = 70

  const leftStart  = cx - blendR - sampleGap - sampleW
  const rightStart = cx + blendR + sampleGap

  for (let y = 0; y < spreadH; y++) {
    const leftColor  = new Float32Array(ch)
    const rightColor = new Float32Array(ch)

    for (let k = 0; k < sampleW; k++) {
      const lx = leftStart + k
      const rx = rightStart + k
      for (let c = 0; c < ch; c++) {
        if (lx >= 0 && lx < spreadW) leftColor[c]  += orig[(y * spreadW + lx) * ch + c]
        if (rx >= 0 && rx < spreadW) rightColor[c] += orig[(y * spreadW + rx) * ch + c]
      }
    }
    for (let c = 0; c < ch; c++) {
      leftColor[c]  /= sampleW
      rightColor[c] /= sampleW
    }

    for (let dx = -blendR; dx < blendR; dx++) {
      const x = cx + dx
      if (x < 0 || x >= spreadW) continue

      const t        = dx / blendR
      const strength = (1 + Math.cos(Math.PI * Math.abs(t))) / 2
      const lw       = (1 - t) / 2
      const rw       = (1 + t) / 2

      for (let c = 0; c < ch - 1; c++) {
        const expected = lw * leftColor[c] + rw * rightColor[c]
        const actual   = orig[(y * spreadW + x) * ch + c]
        const delta    = expected - actual
        if (delta > 5) {
          buf[(y * spreadW + x) * ch + c] = Math.min(255, Math.round(actual + Math.min(delta * strength, maxLift)))
        }
      }
    }
  }

  // ── Pass 2: 16px local-valley correction ────────────────────────────────
  // Works on split-composition pages (rain/sun, cover/endpaper) where the
  // two halves have different environments. A fold shadow creates a local
  // minimum (darker than BOTH immediate neighbors) regardless of what's on
  // each side. We compare to neighbors 5px away so even the transition zone
  // shows the valley clearly.
  const localR       = 8   // ±8px, 16px total
  const localGap     = 5   // pixels away for the neighbor reference
  const localThresh  = 12  // minimum valley depth to correct (avoids false positives)
  const maxLocalLift = 28

  for (let y = 0; y < spreadH; y++) {
    for (let dx = -localR; dx < localR; dx++) {
      const x = cx + dx
      if (x < 0 || x >= spreadW) continue

      const t        = dx / localR
      const strength = (1 + Math.cos(Math.PI * Math.abs(t))) / 2

      for (let c = 0; c < ch - 1; c++) {
        const actual = buf[(y * spreadW + x) * ch + c]  // pass-1 result
        const lx = Math.max(0, x - localGap)
        const rx = Math.min(spreadW - 1, x + localGap)
        const leftN  = buf[(y * spreadW + lx) * ch + c]
        const rightN = buf[(y * spreadW + rx) * ch + c]

        // Valley check: actual must be darker than BOTH neighbors.
        // A fold shadow creates a valley; a natural gradient does not.
        const minNeighbor = Math.min(leftN, rightN)
        const delta = minNeighbor - actual
        if (delta > localThresh) {
          buf[(y * spreadW + x) * ch + c] = Math.min(255, Math.round(actual + Math.min(delta * strength, maxLocalLift)))
        }
      }
    }
  }

  return sharp(Buffer.from(buf), {
    raw: { width: spreadW, height: spreadH, channels: ch }
  })
    .removeAlpha()
    .png({ compressionLevel: 6 })
    .toBuffer()
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId')
  if (!orderId) {
    return NextResponse.json({ error: 'orderId required' }, { status: 400 })
  }

  try {
    const pdfDoc  = await PDFDocument.create()
    const spreadW = 2400
    const spreadH = 1200

    for (let i = 0; i < TOTAL_PAGES; i++) {
      const url = cloudinaryUrl(orderId, i)

      let imgBuffer: Buffer
      try {
        const res = await fetch(url)
        if (!res.ok) { console.warn(`Skipping page ${i} — not found`); continue }
        imgBuffer = Buffer.from(await res.arrayBuffer())
      } catch {
        console.warn(`Failed to fetch page ${i}`)
        continue
      }

      const printed = await healSpine(imgBuffer, spreadW, spreadH)

      const page = pdfDoc.addPage([PAGE_W_PT, PAGE_H_PT])
      const img  = await pdfDoc.embedPng(printed)
      page.drawImage(img, { x: 0, y: 0, width: PAGE_W_PT, height: PAGE_H_PT })
    }

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="order-${orderId}-print.pdf"`,
      },
    })

  } catch (err: any) {
    console.error('Print PDF error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
