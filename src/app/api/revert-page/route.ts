import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import sharp from 'sharp'

export const dynamic = 'force-dynamic'

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dft0hfbee'

async function uploadToCloudinary(base64: string, folder: string, publicId: string): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!
  const apiKey    = process.env.CLOUDINARY_API_KEY!
  const apiSecret = process.env.CLOUDINARY_API_SECRET!

  const jpeg = await sharp(Buffer.from(base64, 'base64')).jpeg({ quality: 90 }).toBuffer()
  const jpegBase64 = jpeg.toString('base64')

  const timestamp = Math.round(Date.now() / 1000)
  const paramStr  = `folder=${folder}&overwrite=true&public_id=${publicId}&timestamp=${timestamp}`
  const signature = crypto.createHash('sha1').update(paramStr + apiSecret).digest('hex')

  const form = new FormData()
  form.append('file', `data:image/jpeg;base64,${jpegBase64}`)
  form.append('api_key', apiKey)
  form.append('timestamp', String(timestamp))
  form.append('signature', signature)
  form.append('folder', folder)
  form.append('public_id', publicId)
  form.append('overwrite', 'true')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: form,
  })
  const result = await res.json()
  if (!result.secure_url) throw new Error(`Cloudinary upload failed: ${JSON.stringify(result)}`)
  return result.secure_url as string
}

export async function POST(req: NextRequest) {
  try {
    const { orderId, pageIndex } = await req.json()

    if (!orderId || pageIndex === undefined) {
      return NextResponse.json({ error: 'Missing required fields: orderId, pageIndex' }, { status: 400 })
    }

    const idx          = Number(pageIndex)
    const folder       = `party-books/orders/${orderId}`
    const publicId     = `page_${String(idx).padStart(2, '0')}`
    const origPublicId = `${publicId}_orig`

    const origUrl = `https://res.cloudinary.com/${CLOUD}/image/upload/${folder}/${origPublicId}`
    const origRes = await fetch(origUrl)
    if (!origRes.ok) {
      return NextResponse.json(
        { error: 'No original saved for this page — regenerate it first so a backup is created.' },
        { status: 404 },
      )
    }

    const origBuffer = Buffer.from(await origRes.arrayBuffer())
    const origBase64 = origBuffer.toString('base64')

    const pageUrl = await uploadToCloudinary(origBase64, folder, publicId)
    return NextResponse.json({ url: pageUrl })
  } catch (err: any) {
    console.error('Revert page error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}