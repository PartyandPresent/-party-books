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
      reply_to: 'booksproject@partyandpresents.com',
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
<body style="margin:0;padding:0;background-color:#FAFAFA;font-family:'Nunito',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAFA;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#FF559C,#FF3385);border-radius:20px 20px 0 0;padding:40px 40px 32px;text-align:center;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.85);font-size:13px;font-weight:700;letter-spacing:2px;">PARTY & PRESENTS</p>
              <h1 style="margin:0 0 8px;color:#ffffff;font-size:32px;font-weight:800;">🎉 Order Confirmed!</h1>
              <p style="margin:0;color:rgba(255,255,255,0.9);font-size:16px;">
                ${childName}'s magical book is on its way!
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <p style="margin:0 0 24px;font-size:16px;color:#555555;line-height:1.6;">
                Hi ${customerName.split(' ')[0]}! 👋<br><br>
                Thank you so much for your order. We're absolutely thrilled to be creating a one-of-a-kind personalised book starring <strong>${childName}</strong>!
              </p>

              <!-- Order details box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFEEF5;border-radius:16px;padding:24px;margin-bottom:28px;">
                <tr><td>
                  <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#888888;letter-spacing:1px;">ORDER DETAILS</p>
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
                      <td style="font-size:14px;color:#2C2C2C;font-weight:700;text-align:right;">${value}</td>
                    </tr>
                  </table>`).join('')}
                </td></tr>
              </table>

              <!-- What happens next -->
              <p style="margin:0 0 16px;font-size:18px;font-weight:800;color:#2C2C2C;">What happens next?</p>
              ${[
                ['🎨', 'AI Book Generation', `We illustrate all 17 pages with ${childName} as the star!`, 'Within 24 hours'],
                ['✅', 'Quality Check', 'Our team reviews every page carefully.', '1–2 business days'],
                ['🖨️', 'Print & Bind', 'Printed on premium paper, hardcover bound.', '2–3 business days'],
                ['📦', 'Shipped to You', 'Carefully packaged and shipped to your door.', '3–5 business days'],
              ].map(([icon, title, desc, time]) => `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="width:48px;vertical-align:top;">
                    <div style="width:40px;height:40px;background:#FFEEF5;border-radius:50%;text-align:center;line-height:40px;font-size:18px;">${icon}</div>
                  </td>
                  <td style="padding-left:14px;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:14px;font-weight:800;color:#2C2C2C;">${title} <span style="font-size:11px;color:#FF559C;background:#FFEEF5;padding:2px 8px;border-radius:50%;font-weight:700;">${time}</span></p>
                    <p style="margin:0;font-size:13px;color:#555555;">${desc}</p>
                  </td>
                </tr>
              </table>`).join('')}

              <!-- CTA button -->
              <div style="text-align:center;margin-top:32px;">
                <a href="https://partyandpresents.com" style="display:inline-block;background:linear-gradient(135deg,#FF559C,#FF3385);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:50px;font-size:16px;font-weight:800;">
                  🎁 Order Another Book
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1A1A1A;border-radius:0 0 20px 20px;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#ffffff;font-weight:800;font-size:15px;">party & presents</p>
              <p style="margin:0 0 16px;color:#888888;font-size:13px;">Books as unique as the child you love.</p>
              <p style="margin:0;color:#555555;font-size:12px;">
                Questions? Reply to this email or contact us at booksproject@partyandpresents.com
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
<body style="font-family:Arial,sans-serif;padding:24px;background:#f5f5f5;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;">
    <h2 style="color:#FF559C;margin:0 0 20px;">🛒 New Order Received!</h2>
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
      ].map(([label, value]) => `
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#888;font-weight:600;width:35%;">${label}</td>
        <td style="padding:8px 0;font-size:14px;color:#2C2C2C;font-weight:700;">${value}</td>
      </tr>`).join('')}
    </table>
  </div>
</body>
</html>`
}