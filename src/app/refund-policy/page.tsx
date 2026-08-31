'use client'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN  = '#2D4A3E'
const CORAL  = '#E8836A'
const CREAM  = '#FAFAF5'
const BEIGE  = '#F5F0E8'
const BODY   = '#4A5568'
const MUTED  = '#888888'

export default function RefundPolicyPage() {
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: GREEN, paddingTop: 70 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '56px 20px 64px' : '80px 24px 88px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 16px' }}>Our Promise</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 36 : 56, color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
            Refund &<br /><span style={{ color: CORAL }}>Returns Policy</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.7)', margin: '0 auto', lineHeight: 1.8, maxWidth: 500 }}>
            We want you to be completely happy with your purchase. Here's how we can help if something isn't right.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: CREAM, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* Personalised goods notice */}
          <div style={{ background: BEIGE, borderLeft: `4px solid ${CORAL}`, borderRadius: '0 12px 12px 0', padding: '20px 24px' }}>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, color: CORAL, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>Important — Personalised Orders</p>
            <p style={{ fontSize: 14, color: BODY, margin: 0, lineHeight: 1.8 }}>
              Because every Miloria book is made to order and personalised specifically for your child — including their illustrated face, name, and dedication — <strong>personalised items cannot be returned or refunded</strong> unless they arrive damaged, defective, or are incorrect due to our error. We encourage you to carefully review all details before completing your order.
            </p>
          </div>

          {/* Refunds */}
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 24 : 30, color: GREEN, margin: '0 0 16px' }}>Refunds</h2>
            <div style={{ height: 2, background: BEIGE, marginBottom: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Eligible returns will be refunded to your original payment method once received and inspected.',
                'Please allow 3–7 business days for processing after we receive the returned item.',
                'Shipping costs are non-refundable unless the return is due to our error.',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: CORAL, flexShrink: 0, marginTop: 7 }} />
                  <p style={{ fontSize: 15, color: BODY, margin: 0, lineHeight: 1.8 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exchanges */}
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 24 : 30, color: GREEN, margin: '0 0 16px' }}>Exchanges</h2>
            <div style={{ height: 2, background: BEIGE, marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: BODY, margin: 0, lineHeight: 1.8 }}>
              We currently do not offer direct exchanges. Please return your item for a refund and place a new order.
            </p>
          </div>

          {/* Damaged or Incorrect */}
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 24 : 30, color: GREEN, margin: '0 0 16px' }}>Damaged or Incorrect Items</h2>
            <div style={{ height: 2, background: BEIGE, marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: BODY, margin: '0 0 16px', lineHeight: 1.8 }}>
              If your book arrives damaged in transit or is incorrect due to our error, we'll make it right — no questions asked.
            </p>
            <div style={{ background: '#fff', border: `1.5px solid #EDE8DF`, borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, color: GREEN, margin: 0 }}>What to do:</p>
              {[
                'Contact us within 3 days of delivery.',
                'Include clear photos showing the issue.',
                'We\'ll arrange a free reprint or refund as quickly as possible.',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <p style={{ fontSize: 14, color: BODY, margin: 0, lineHeight: 1.7 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{ background: GREEN, borderRadius: 20, padding: isMobile ? '32px 24px' : '40px 48px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 22 : 28, color: '#fff', margin: '0 0 12px' }}>Need help?</p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '0 0 24px', lineHeight: 1.7 }}>
              Reach out and we'll do everything we can to make it right.
            </p>
            <a href="mailto:miloria@partyandpresents.com" style={{ background: CORAL, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 50, textDecoration: 'none', display: 'inline-block' }}>
              miloria@partyandpresents.com
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
