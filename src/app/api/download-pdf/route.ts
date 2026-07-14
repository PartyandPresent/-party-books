import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import sharp from 'sharp'

export const dynamic = 'force-dynamic'

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dft0hfbee'
const MAX_PAGES = 30

function cloudinaryUrl(orderId: string, index: number) {
  const publicId = `page_${String(index).padStart(2, '0')}`
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto/party-books/orders/${orderId}/${publicId}`
}

// Fold-shadow SVG: dark gradient lines at center spine
function foldSvg(w: number, h: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="L" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="black" stop-opacity="0"/>
        <stop offset="70%"  stop-color="black" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="black" stop-opacity="0.20"/>
      </linearGradient>
      <linearGradient id="R" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="black" stop-opacity="0.20"/>
        <stop offset="30%"  stop-color="black" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="black" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- left page shadow near spine -->
    <rect x="${w * 0.38}" y="0" width="${w * 0.12}" height="${h}" fill="url(#L)"/>
    <!-- right page shadow near spine -->
    <rect x="${w * 0.50}" y="0" width="${w * 0.12}" height="${h}" fill="url(#R)"/>
    <!-- spine line -->
    <line x1="${w * 0.5}" y1="0" x2="${w * 0.5}" y2="${h}"
          stroke="rgba(0,0,0,0.30)" stroke-width="1.5"/>
  </svg>`
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId')
  if (!orderId) {
    return NextResponse.json({ error: 'orderId required' }, { status: 400 })
  }

  try {
    const pdfDoc = await PDFDocument.create()

    for (let i = 0; i < MAX_PAGES; i++) {
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

      // Normalise to consistent spread size
      const spreadW = 1600
      const spreadH = 800

      const resized = await sharp(imgBuffer)
        .resize(spreadW, spreadH, { fit: 'fill' })
        .toBuffer()

      // Composite fold shadow
      const withFold = await sharp(resized)
        .composite([{ input: Buffer.from(foldSvg(spreadW, spreadH)), top: 0, left: 0 }])
        .jpeg({ quality: 90 })
        .toBuffer()

      // PDF page: points at 96dpi (1pt ≈ 1.33px), use half-size for reasonable file size
      const ptW = spreadW / 2
      const ptH = spreadH / 2
      const page = pdfDoc.addPage([ptW, ptH])
      const img = await pdfDoc.embedJpg(withFold)
      page.drawImage(img, { x: 0, y: 0, width: ptW, height: ptH })
    }

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="order-${orderId}-preview.pdf"`,
      },
    })

  } catch (err: any) {
    console.error('PDF download error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
