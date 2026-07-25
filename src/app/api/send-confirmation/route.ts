import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const {
      customerName, customerEmail, childName, senderName,
      bookTitle, orderId, amountTotal, shippingAddress,
    } = await req.json()

    // ── Customer confirmation email ──────────────────────────────
    await resend.emails.send({
      from: 'party & presents <onboarding@resend.dev>',
      to: customerEmail,
      replyTo: 'booksproject@partyandpresents.com',
      subject: `🎉 Your order is confirmed — ${childName}'s book is on its way!`,
      html: customerEmailHtml({
        customerName, childName, senderName,
        bookTitle, orderId, amountTotal, shippingAddress,
      }),
    })

    // ── Internal notification email ──────────────────────────────
    await resend.emails.send({
      from: 'party & presents <onboarding@resend.dev>',
      to: 'booksproject@partyandpresents.com',
      subject: `🛒 New Order! ${childName}'s book — $${amountTotal}`,
      html: internalEmailHtml({
        customerName, customerEmail, childName, senderName,
        bookTitle, orderId, amountTotal, shippingAddress,
      }),
    })

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('Email error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ── Customer email template ────────────────────────────────────
function customerEmailHtml({ customerName, childName, senderName, bookTitle, orderId, amountTotal, shippingAddress }: any) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#FAFAF5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#2D4A3E;border-radius:20px 20px 0 0;padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 10px;color:rgba(255,255,255,0.55);font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Miloriabooks</p>
              <h1 style="margin:0 0 10px;color:#ffffff;font-size:30px;font-weight:800;line-height:1.2;">🎉 Order Confirmed!</h1>
              <p style="margin:0;color:rgba(255,255,255,0.80);font-size:15px;">
                ${childName}'s personalised book is on its way.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <p style="margin:0 0 24px;font-size:15px;color:#4A5568;line-height:1.7;">
                Hi ${customerName.split(' ')[0]},<br><br>
                Thank you for your order. We're creating a one-of-a-kind personalised book starring <strong style="color:#2D4A3E;">${childName}</strong> — every single page illustrated just for them.
              </p>

              <!-- Order details box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;border-radius:16px;padding:24px;margin-bottom:28px;">
                <tr><td>
                  <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#888888;letter-spacing:1.5px;text-transform:uppercase;">Order Details</p>
                  ${[
                    ['Order ID', `#${orderId}`],
                    ['Book', bookTitle],
                    ['Personalised for', childName],
                    ['From', senderName],
                    ['Amount Paid', `$${amountTotal}`],
                    ['Shipping to', shippingAddress],
                  ].map(([label, value]) => `
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                    <tr>
                      <td style="font-size:13px;color:#888888;font-weight:600;width:40%;">${label}</td>
                      <td style="font-size:13px;color:#2D4A3E;font-weight:800;text-align:right;">${value}</td>
                    </tr>
                  </table>`).join('')}
                </td></tr>
              </table>

              <!-- What happens next -->
              <p style="margin:0 0 20px;font-size:17px;font-weight:800;color:#2D4A3E;">What happens next?</p>
              ${[
                ['🎨', 'Book Generation', `We illustrate all pages with ${childName} as the star.`, 'Within 24 hours'],
                ['✅', 'Quality Review', 'Our team checks every page before printing.', '1–2 business days'],
                ['🖨️', 'Print & Bind', 'Printed on premium paper with a beautiful cover.', '2–3 business days'],
                ['📦', 'Shipped to You', 'Carefully packaged and sent to your door.', '3–5 business days'],
              ].map(([icon, title, desc, time]) => `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="width:48px;vertical-align:top;">
                    <div style="width:40px;height:40px;background:#F5F0E8;border-radius:50%;text-align:center;line-height:40px;font-size:18px;">${icon}</div>
                  </td>
                  <td style="padding-left:14px;vertical-align:top;">
                    <p style="margin:0 0 3px;font-size:14px;font-weight:800;color:#2D4A3E;">${title}&nbsp;<span style="font-size:11px;color:#ffffff;background:#E8836A;padding:3px 10px;border-radius:50px;font-weight:700;">${time}</span></p>
                    <p style="margin:0;font-size:13px;color:#4A5568;line-height:1.5;">${desc}</p>
                  </td>
                </tr>
              </table>`).join('')}

              <!-- CTA button -->
              <div style="text-align:center;margin-top:36px;">
                <a href="https://miloriabooks.com" style="display:inline-block;background:#E8836A;color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:15px;font-weight:800;">
                  Create Another Book →
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#2D4A3E;border-radius:0 0 20px 20px;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 6px;color:#ffffff;font-weight:800;font-size:15px;">Miloriabooks</p>
              <p style="margin:0 0 16px;color:rgba(255,255,255,0.55);font-size:13px;">Personalised books that tell their story.</p>
              <p style="margin:0;color:rgba(255,255,255,0.40);font-size:12px;">
                Questions? Reply to this email or reach us at booksproject@partyandpresents.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ── Internal notification email ────────────────────────────────
function internalEmailHtml({ customerName, customerEmail, childName, senderName, bookTitle, orderId, amountTotal, shippingAddress }: any) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;padding:24px;background:#FAFAF5;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(45,74,62,0.08);">
    <div style="background:#2D4A3E;padding:20px 28px;">
      <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:2px;text-transform:uppercase;">Miloriabooks — Internal</p>
      <h2 style="margin:0;color:#ffffff;font-size:18px;font-weight:800;">🛒 New Order Received</h2>
    </div>
    <div style="padding:28px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${[
          ['Order ID', `#${orderId}`],
          ['Customer', customerName],
          ['Email', customerEmail],
          ['Book', bookTitle],
          ['Child Name', childName],
          ['From', senderName],
          ['Amount', `$${amountTotal}`],
          ['Ship to', shippingAddress],
        ].map(([label, value], i) => `
        <tr>
          <td style="padding:10px 0;font-size:13px;color:#888;font-weight:600;width:35%;border-bottom:1px solid #F5F0E8;">${label}</td>
          <td style="padding:10px 0;font-size:13px;color:#2D4A3E;font-weight:800;border-bottom:1px solid #F5F0E8;">${value}</td>
        </tr>`).join('')}
      </table>
    </div>
  </div>
</body>
</html>`
}