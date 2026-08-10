import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createShopifyOrder } from '@/lib/shopify'

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
      console.log(`[Shopify] Starting for session ${sessionId}, email="${response.email}"`)
      if (!response.email) {
        console.log('[Shopify] Skipping — no email on session')
      } else {
        // Dedup via Stripe payment intent metadata — no Shopify tags needed
        const paymentIntentId = session.payment_intent as string | null
        const pi = paymentIntentId ? await stripe.paymentIntents.retrieve(paymentIntentId) : null
        const alreadyCreated = pi?.metadata?.shopify_order_id

        console.log(`[Shopify] alreadyCreated=${alreadyCreated || 'no'}`)
        if (!alreadyCreated) {
          const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 10 })
          const bookItem  = lineItems.data.find(li => li.description !== 'Shipping')
          const shipItem  = lineItems.data.find(li => li.description === 'Shipping')

          const bookAmount = bookItem  ? (bookItem.amount_total  / 100) : response.amountTotal
          const shipAmount = shipItem  ? (shipItem.amount_total  / 100) : 0

          console.log(`[Shopify] Creating order: book=$${bookAmount}, ship=$${shipAmount}, country="${meta.shippingCountry || address?.country}"`)

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
            console.log(`[Shopify] Order #${shopifyResult.orderNumber} created (id ${shopifyResult.id})`)
            if (paymentIntentId) {
              await stripe.paymentIntents.update(paymentIntentId, {
                metadata: { shopify_order_id: String(shopifyResult.id) },
              })
            }
          } else {
            console.log('[Shopify] createShopifyOrder returned null — see error above')
          }
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