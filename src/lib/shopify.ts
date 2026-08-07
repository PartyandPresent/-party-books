const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
const SHOPIFY_TOKEN  = process.env.SHOPIFY_ADMIN_TOKEN!
const API_VERSION    = '2026-07'

const COUNTRY_CODES: Record<string, string> = {
  'Philippines':    'PH',
  'Australia':      'AU',
  'United States':  'US',
  'United Kingdom': 'GB',
  'Canada':         'CA',
  'Singapore':      'SG',
  'New Zealand':    'NZ',
}

export interface ShopifyOrderInput {
  email:           string
  childName:       string
  bookTitle:       string
  stripeSessionId: string
  bookAmount:      number   // dollars — book price only
  shippingAmount:  number   // dollars
  shippingName:    string
  shippingPhone?:  string
  shippingStreet:  string
  shippingCity:    string
  shippingState?:  string
  shippingZip:     string
  shippingCountry: string
}

export async function shopifyOrderExists(stripeSessionId: string): Promise<boolean> {
  const url = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/orders.json?tag=stripe:${encodeURIComponent(stripeSessionId)}&status=any&limit=1`
  const res = await fetch(url, {
    headers: { 'X-Shopify-Access-Token': SHOPIFY_TOKEN },
  })
  if (!res.ok) return false
  const data = await res.json()
  return (data.orders?.length ?? 0) > 0
}

export async function createShopifyOrder(
  input: ShopifyOrderInput,
): Promise<{ id: number; orderNumber: number } | null> {
  const [firstName, ...rest] = input.shippingName.trim().split(' ')
  const lastName    = rest.join(' ') || '-'
  const countryCode = COUNTRY_CODES[input.shippingCountry] ?? 'PH'

  const payload = {
    order: {
      email:                      input.email,
      financial_status:           'paid',
      fulfillment_status:         null,
      send_receipt:               false,
      send_fulfillment_receipt:   false,
      tags:                       `stripe:${input.stripeSessionId}`,
      note:                       `Stripe session: ${input.stripeSessionId}`,
      note_attributes: [
        { name: 'Child Name',      value: input.childName },
        { name: 'Book Title',      value: input.bookTitle },
        { name: 'Stripe Session',  value: input.stripeSessionId },
      ],
      line_items: [
        {
          title:              `${input.bookTitle} — Personalised for ${input.childName}`,
          quantity:           1,
          price:              input.bookAmount.toFixed(2),
          requires_shipping:  true,
          fulfillment_service: 'manual',
        },
      ],
      shipping_lines: [
        {
          title: 'Standard Shipping',
          price: input.shippingAmount.toFixed(2),
          code:  'STANDARD',
        },
      ],
      shipping_address: {
        first_name: firstName,
        last_name:  lastName,
        address1:   input.shippingStreet,
        city:       input.shippingCity,
        province:   input.shippingState || '',
        zip:        input.shippingZip,
        country_code: countryCode,
        phone:      input.shippingPhone || '',
      },
      customer: {
        email:      input.email,
        first_name: firstName,
        last_name:  lastName,
      },
    },
  }

  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/orders.json`,
    {
      method:  'POST',
      headers: {
        'Content-Type':            'application/json',
        'X-Shopify-Access-Token':  SHOPIFY_TOKEN,
      },
      body: JSON.stringify(payload),
    },
  )

  if (!res.ok) {
    const err = await res.text()
    console.error('[Shopify] Order creation failed:', res.status, err)
    return null
  }

  const data = await res.json()
  return { id: data.order.id, orderNumber: data.order.order_number }
}