import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

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

    return NextResponse.json({
      success: true,
      orderId: session.id.slice(-8).toUpperCase(),
      customerName: details?.name || '',
      email: details?.email || '',
      amountTotal: (session.amount_total || 0) / 100,
      childName: session.metadata?.childName || '',
      bookTitle: session.metadata?.bookTitle || '',
      shippingAddress: address
        ? `${address.line1}, ${address.city}, ${address.postal_code}, ${address.country}`
        : '',
    })

  } catch (err: any) {
    console.error('Verify payment error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}