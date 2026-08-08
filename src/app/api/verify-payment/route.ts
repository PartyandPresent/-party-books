import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createShopifyOrder, shopifyOrderExists } from '@/lib/shopify'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia' as any,
})

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ success: false, error: 'No session ID' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ success: false, error: 'Payment not completed' })
    }

    const details = session.customer_details
    const address = details?.address
    const meta    = session.metadata ?? {}

    const orderId  = session.id.slice(-8).toUpperCase()
    const response = {
      success:         true,
      orderId,
      customerName:    details?.name || '',
      email:           details?.email || '',
      amountTotal:     (session.amount_total || 0) / 100,
      childName:       meta.childName || '',
      bookTitle:       meta.bookTitle || '',
      shippingAddress: address
        ? `${address.line1}, ${address.city}, ${address.postal_code}, ${address.country}`
        : '',
    }

    // Create Shopify order once per Stripe session (idempotent) — non-fatal
    try {
      if (response.email && !(await shopifyOrderExists(sessionId))) {
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })
        const bookItem  = lineItems.data.find(li => li.description !== 'Shipping')
        const shipItem  = lineItems.data.find(li => li.description === 'Shipping')

        const bookAmount = bookItem  ? (bookItem.amount_total  / 100) : response.amountTotal
        const shipAmount = shipItem  ? (shipItem.amount_total  / 100) : 0

        const shopifyResult = await createShopifyOrder({
          email:           response.email,
          childName:       meta.childName       || '',
          bookTitle:       meta.bookTitle        || 'Personalised Book',
          stripeSessionId: sessionId,
          bookAmount,
          shippingAmount:  shipAmount,
          shippingName:    meta.shippingName    || details?.name || '',
          shippingPhone:   meta.shippingPhone   || details?.phone || '',
          shippingStreet:  meta.shippingStreet  || address?.line1 || '',
          shippingCity:    meta.shippingCity    || address?.city  || '',
          shippingState:   meta.shippingState   || address?.state || '',
          shippingZip:     meta.shippingZip     || address?.postal_code || '',
          shippingCountry: meta.shippingCountry || address?.country || 'Philippines',
        })

        if (shopifyResult) {
          console.log(`[Shopify] Order #${shopifyResult.orderNumber} created (id ${shopifyResult.id}) for session ${sessionId}`)
        }
      }
    } catch (shopifyErr: any) {
      console.error('[Shopify] Non-fatal error in verify-payment:', shopifyErr?.message)
    }

    return NextResponse.json(response)

  } catch (err: any) {
    console.error('Verify payment error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}