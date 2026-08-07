import { NextRequest } from 'next/server'

const CLIENT_ID     = process.env.SHOPIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get('shop')
  const code = searchParams.get('code')

  if (!shop || !code) {
    return new Response('<h2>Missing shop or code</h2>', { status: 400, headers: { 'Content-Type': 'text/html' } })
  }

  try {
    const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
    })

    const data = await res.json()
    const token: string = data.access_token

    if (!token) {
      return new Response(`<h2>Error: ${JSON.stringify(data)}</h2>`, { status: 400, headers: { 'Content-Type': 'text/html' } })
    }

    const html = `<!doctype html>
<html>
<head><title>Shopify Connected</title>
<style>
  body { font-family: sans-serif; max-width: 640px; margin: 60px auto; padding: 0 24px; color: #2D4A3E; }
  h2 { color: #22C55E; }
  .token-box { background: #F5F5F5; border: 2px solid #E0E0E0; border-radius: 10px; padding: 16px; font-family: monospace; font-size: 14px; word-break: break-all; margin: 16px 0; }
  .step { background: #FFFBF0; border-left: 4px solid #F59E0B; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 12px 0; font-size: 14px; }
  code { background: #E8F0ED; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
</style>
</head>
<body>
  <h2>✅ Shopify App Connected!</h2>
  <p>Your store <strong>${shop}</strong> has been authorised. Copy the token below:</p>
  <div class="token-box">${token}</div>
  <p><strong>Add this token in two places:</strong></p>
  <div class="step">1. In your <code>.env.local</code> file — update <code>SHOPIFY_ADMIN_TOKEN</code> to this value</div>
  <div class="step">2. In Vercel → Settings → Environment Variables — update <code>SHOPIFY_ADMIN_TOKEN</code> to this value, then redeploy</div>
  <p style="color:#888;font-size:13px;margin-top:24px">You can close this page once you've copied the token.</p>
</body>
</html>`

    return new Response(html, { headers: { 'Content-Type': 'text/html' } })

  } catch (err: any) {
    return new Response(`<h2>Error: ${err.message}</h2>`, { status: 500, headers: { 'Content-Type': 'text/html' } })
  }
}