import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia' as any,
})

export async function POST(req: NextRequest) {
  try {
    const { title, price, shipping, childName, email, shippingDetails } = await req.json()

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      metadata: {
        childName: childName || '',
        bookTitle: title || '',
        shippingName: shippingDetails?.name || '',
        shippingPhone: shippingDetails?.phone || '',
        shippingStreet: shippingDetails?.street || '',
        shippingCity: shippingDetails?.city || '',
        shippingState: shippingDetails?.state || '',
        shippingZip: shippingDetails?.zip || '',
        shippingCountry: shippingDetails?.country || '',
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: title || 'Personalised Children\'s Book',
              description: `Personalised for ${childName}`,
            },
            unit_amount: Math.round((price || 23.98) * 100),
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Shipping' },
            unit_amount: Math.round((shipping || 9.99) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
    })

    return NextResponse.json({ url: session.url })

  } catch (err: any) {
    console.error('Create checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
