import { NextRequest, NextResponse } from 'next/server'

const CLIENT_ID    = process.env.SHOPIFY_CLIENT_ID!
const SCOPES       = 'read_customers,write_customers,read_orders,write_orders'
const REDIRECT_URI = 'https://miloriabooks.com/api/shopify/callback'

export async function GET(req: NextRequest) {
  const shop = req.nextUrl.searchParams.get('shop') || 'ud4agu-ff.myshopify.com'

  const authUrl = `https://${shop}/admin/oauth/authorize?` + new URLSearchParams({
    client_id:    CLIENT_ID,
    scope:        SCOPES,
    redirect_uri: REDIRECT_URI,
  }).toString()

  return NextResponse.redirect(authUrl)
}