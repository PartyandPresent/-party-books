const SHOPIFY_DOMAIN  = process.env.SHOPIFY_STORE_DOMAIN       // e.g. your-store.myshopify.com
const SHOPIFY_TOKEN   = process.env.SHOPIFY_ADMIN_API_TOKEN    // Admin API access token
const SHOPIFY_VERSION = '2025-01'

interface ShopifyOrderInput {
  customerName:    string
  customerEmail:   string
  childName:       string
  senderName:      string
  bookTitle:       string
  stripeOrderId:   string  // short ID e.g. 'ABC12345'
  amountTotal:     number  // dollars
  shippingAddress: string  // formatted: "Street, City, ZIP, Country"
}

// Creates a paid, unfulfilled order in Shopify for every completed Stripe payment.
// The order appears in Shopify admin for fulfillment tracking and reporting.
// Credentials are optional — if not set, this is a no-op (logged, not thrown).
export async function createShopifyOrder(input: ShopifyOrderInput): Promise<void> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    console.warn('Shopify credentials not configured (SHOPIFY_STORE_DOMAIN / SHOPIFY_ADMIN_API_TOKEN) — skipping order sync')
    return
  }

  const nameParts = input.customerName.trim().split(' ')
  const firstName = nameParts[0] || ''
  const lastName  = nameParts.slice(1).join(' ') || ''

  // Best-effort parse of "Street, City, ZIP, Country"
  const [address1 = '', city = '', zip = '', country = 'CA'] =
    input.shippingAddress.split(',').map(s => s.trim())

  const payload = {
    order: {
      email:                      input.customerEmail,
      financial_status:           'paid',
      send_receipt:               false,
      send_fulfillment_receipt:   false,
      tags:                       'miloriabooks, stripe-paid',
      note:                       `Stripe #${input.stripeOrderId} | For: ${input.childName} | From: ${input.senderName || '—'}`,
      note_attributes: [
        { name: 'Stripe Order ID', value: `#${input.stripeOrderId}` },
        { name: 'Child Name',      value: input.childName },
        { name: 'Sender Name',     value: input.senderName || '' },
      ],
      line_items: [
        {
          title:              input.bookTitle,
          price:              input.amountTotal.toFixed(2),
          quantity:           1,
          requires_shipping:  true,
        },
      ],
      customer: {
        first_name: firstName,
        last_name:  lastName,
        email:      input.customerEmail,
      },
      shipping_address: {
        first_name: firstName,
        last_name:  lastName,
        address1,
        city,
        zip,
        country,
      },
    },
  }

  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_VERSION}/orders.json`,
    {
      method:  'POST',
      headers: {
        'Content-Type':             'application/json',
        'X-Shopify-Access-Token':   SHOPIFY_TOKEN,
      },
      body: JSON.stringify(payload),
    }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Shopify order sync failed (${res.status}): ${JSON.stringify(err)}`)
  }

  const result = await res.json()
  console.log(`✓ Shopify order created: #${result.order?.order_number} (id ${result.order?.id})`)
}