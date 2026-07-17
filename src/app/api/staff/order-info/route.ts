import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dft0hfbee'

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId')
  if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 })

  const folder = `party-books/orders/${orderId}`
  const metaUrl = `https://res.cloudinary.com/${CLOUD}/raw/upload/${folder}/meta`

  try {
    const metaRes = await fetch(metaUrl)
    if (!metaRes.ok) return NextResponse.json({ error: 'Order metadata not found' }, { status: 404 })
    const { bookSlug } = await metaRes.json()

    let pageCount = 17
    try {
      const refDir = path.join(process.cwd(), 'public', 'books', bookSlug, 'ref')
      const files = fs.readdirSync(refDir).filter(f => /^page-\d+\.png$/i.test(f))
      if (files.length > 0) pageCount = files.length
    } catch { /* keep fallback */ }

    return NextResponse.json({ bookSlug, pageCount })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
