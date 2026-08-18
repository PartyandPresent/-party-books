'use client'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useCurrency } from '@/store/currency'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const CREAM = '#FAFAF5'
const BEIGE = '#F5F0E8'
const BODY  = '#4A5568'
const MUTED = '#888888'

const TIMELINE = [
  { day: 'Day 1–2', icon: '🎨', title: 'Generation & Review', body: 'After your order is placed, we illustrate all 17 pages of your personalised book, then our team reviews every page for quality before it goes to print.' },
  { day: 'Day 2–3', icon: '🖨️', title: 'Printing', body: 'Your approved book is sent to print on premium paper with vibrant, full-colour reproduction. We use quality materials that are built to last.' },
  { day: 'Day 3–7', icon: '📦', title: 'Shipping & Delivery', body: 'Your book is carefully packaged and shipped to your door. You\'ll receive a tracking number by email once it\'s on its way.' },
]

const RATES = [
  { region: 'Canada & USA: Standard', time: '4–7 business days', cadPrice: 7.99,  free: null },
  { region: 'Canada & USA: Express',  time: '1–3 business days', cadPrice: 14.99, free: null },
]

const FAQS = [
  { q: 'When will my order arrive?', a: "From the moment you place your order, allow 5–10 business days total with Standard shipping, or 3–6 days with Express. This includes our generation and review process (1–2 days), printing (1–2 days), and your chosen shipping speed." },
  { q: 'Can I track my order?', a: "Yes. Once your book ships, you'll receive an email with a tracking number so you can follow it all the way to your door." },
  { q: 'What if my book arrives damaged?', a: "If your book arrives damaged in transit, contact us within 7 days of delivery with a photo and we'll send a replacement at no charge." },
  { q: 'Do you ship to PO Boxes?', a: "We're unable to deliver to PO Boxes at this time. Please provide a physical street address at checkout." },
  { q: 'Can I change my shipping address after ordering?', a: "If your order hasn't gone to print yet, we can update the address. Contact us as soon as possible at hello@partyandpresents.com and we'll do our best to accommodate." },
]

function FaqRow({ q, a }: { q: string; a: string }) {
  return (
    <div style={{ borderBottom: '1px solid #E2EBE7', padding: '20px 0' }}>
      <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15, color: GREEN, margin: '0 0 8px' }}>{q}</p>
      <p style={{ fontSize: 15, color: BODY, margin: 0, lineHeight: 1.8 }}>{a}</p>
    </div>
  )
}

export default function ShippingPage() {
  const isMobile = useIsMobile()
  const { formatPrice, currency } = useCurrency()

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: GREEN, paddingTop: 70 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '56px 20px 64px' : '80px 24px 88px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 16px' }}>Delivery</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 36 : 56, color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
            Shipping &<br /><span style={{ color: CORAL }}>Delivery Info</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.7)', margin: '0 auto', lineHeight: 1.8, maxWidth: 500 }}>
            Everything you need to know about how your book gets from us to you, and how long it takes.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: CREAM, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px' }}>What Happens After You Order</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 38, color: GREEN, margin: 0 }}>
              Your book's journey to you
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 2px 16px rgba(45,74,62,0.07)', position: 'relative' }}>
                <div style={{ background: GREEN, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 11, letterSpacing: 1, padding: '4px 12px', borderRadius: 50, display: 'inline-block', marginBottom: 16 }}>{t.day}</div>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{t.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18, color: GREEN, margin: '0 0 10px' }}>{t.title}</h3>
                <p style={{ fontSize: 14, color: BODY, margin: 0, lineHeight: 1.8 }}>{t.body}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: BEIGE, borderRadius: 50, padding: '12px 24px' }}>
              <span style={{ fontSize: 20 }}>⏱️</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: GREEN }}>Total estimated time: <span style={{ color: CORAL }}>4–7 business days (Standard) · 1–3 days (Express)</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Rates table */}
      <section style={{ background: BEIGE, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px' }}>Rates</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 38, color: GREEN, margin: 0 }}>
              Shipping rates
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 16px rgba(45,74,62,0.07)' }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr', gap: 0, background: GREEN, padding: '16px 24px' }}>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 12, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>Region</span>
              {!isMobile && <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 12, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>Delivery Time</span>}
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 12, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>Rate</span>
              {!isMobile && <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 12, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>Free Shipping</span>}
            </div>
            {RATES.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr', gap: 0, padding: '18px 24px', borderBottom: i < RATES.length - 1 ? '1px solid #F0EBE3' : 'none', alignItems: 'center' }}>
                <div>
                  <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: GREEN }}>{r.region}</span>
                  {isMobile && <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{r.time}</div>}
                </div>
                {!isMobile && <span style={{ fontSize: 14, color: BODY }}>{r.time}</span>}
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: GREEN }}>{formatPrice(r.cadPrice)}</span>
                {!isMobile && <span style={{ fontSize: 13, color: r.free ? CORAL : MUTED, fontWeight: r.free ? 700 : 400 }}>{r.free || '-'}</span>}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: MUTED, textAlign: 'center', marginTop: 16 }}>All prices in {currency}. Select your preferred shipping speed at checkout.</p>
        </div>
      </section>

      {/* International notice */}
      <section style={{ background: CREAM, padding: isMobile ? '48px 20px' : '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌏</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 24 : 30, color: GREEN, margin: '0 0 16px' }}>International Shipping</h2>
          <p style={{ fontSize: 15, color: BODY, margin: '0 auto', lineHeight: 1.8, maxWidth: 520 }}>
            We currently ship to Canada and the United States. International shipping to the UK, Australia, and other countries is on the way. Sign up to be notified when it's available in your region.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: BEIGE, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 26 : 34, color: GREEN, margin: '0 0 8px', textAlign: 'center' }}>Shipping FAQs</h2>
          <div style={{ height: 2, background: '#E2EBE7', margin: '24px 0 4px' }} />
          {FAQS.map((f, i) => <FaqRow key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: GREEN, padding: isMobile ? '56px 20px' : '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 30 : 44, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>
          Ready to create<br /><span style={{ color: CORAL }}>their book?</span>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 auto 36px', maxWidth: 420, lineHeight: 1.7 }}>
          Preview 5 pages free before you pay. No commitment, no risk.
        </p>
        <Link href="/books" style={{ background: CORAL, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 50, textDecoration: 'none', display: 'inline-block', boxShadow: '0 6px 28px rgba(232,131,106,0.45)' }}>
          Create Their Book →
        </Link>
      </section>

      <Footer />
    </div>
  )
}
