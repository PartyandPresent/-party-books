'use client'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const CREAM = '#FAFAF5'
const BEIGE = '#F5F0E8'
const BODY  = '#4A5568'

const STEPS = [
  {
    num: '01',
    icon: '📚',
    title: 'Choose your book',
    body: "Browse our collection and choose a story that fits the moment: a baptism gift, a birthday keepsake, a Christmas surprise. Each book has a unique theme built around faith, love, and belonging.",
  },
  {
    num: '02',
    icon: '📸',
    title: 'Upload their photo',
    body: "Upload a clear photo of the child. We use it to bring their likeness into every illustration. A well-lit front-facing photo works best. The better the photo, the better the result.",
  },
  {
    num: '03',
    icon: '✏️',
    title: 'Personalise the details',
    body: "Add their name, a personal dedication from you, and any other details your chosen book requires. This is what gets woven into the story across all pages.",
  },
  {
    num: '04',
    icon: '👀',
    title: 'Preview 4 pages free',
    body: "Before you pay, we generate 4 pages so you can see exactly what the book will look like: your child's face, their name, the style and quality. Only pay if you love it.",
  },
  {
    num: '05',
    icon: '💳',
    title: 'Complete your order',
    body: "Happy with the preview? Complete your purchase securely through Stripe. We then generate all 17 pages of your book in full quality and send it to our review team.",
  },
  {
    num: '06',
    icon: '🔍',
    title: 'Human quality review',
    body: "Every order is reviewed by a real person before it goes to print. We check character consistency, text accuracy, and illustration quality across every page. If anything's off, we regenerate it.",
  },
  {
    num: '07',
    icon: '📦',
    title: 'Printed & shipped to you',
    body: "Once approved, your book goes to print. We use premium quality materials, the kind of book you keep on the shelf, not the bedside table. Delivered to your door in 3–5 business days.",
  },
]

const INCLUDED = [
  { icon: '🎨', title: '17 illustrated pages', body: 'Every page features a unique scene with your child as the character.' },
  { icon: '🧒', title: 'Your child\'s face', body: "Illustrated from your photo. Their likeness in every illustration." },
  { icon: '✍️', title: 'Personalised name & dedication', body: 'Their name woven through the story, plus a dedication page from you.' },
  { icon: '📖', title: 'Premium print quality', body: 'Hardcover or softcover options, printed on high-quality paper.' },
  { icon: '🎁', title: 'Gift-ready packaging', body: 'Arrives beautifully packaged, ready to give. No wrapping needed.' },
  { icon: '💝', title: 'A keepsake for life', body: 'Not a novelty. A book families return to for years.' },
]

export default function HowItWorksPage() {
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: GREEN, paddingTop: 70 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '56px 20px 64px' : '80px 24px 88px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 16px' }}>The Process</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 36 : 56, color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
            From photo to<br /><span style={{ color: CORAL }}>keepsake in days.</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.7)', margin: '0 auto', lineHeight: 1.8, maxWidth: 520 }}>
            Upload a photo, personalise the story, preview it free. Then we do the rest. Here's exactly how it works.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ background: CREAM, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: isMobile ? 20 : 32, paddingBottom: 48, position: 'relative' }}>
                {/* Line connector */}
                {i < STEPS.length - 1 && (
                  <div style={{ position: 'absolute', left: isMobile ? 19 : 23, top: 56, bottom: 0, width: 2, background: '#E2EBE7' }} />
                )}
                {/* Number circle */}
                <div style={{ flexShrink: 0, width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 14 : 16, color: '#fff', zIndex: 1 }}>
                  {step.num}
                </div>
                {/* Content */}
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{step.icon}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 18 : 22, color: GREEN, margin: '0 0 10px' }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: BODY, margin: 0, lineHeight: 1.8 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section style={{ background: BEIGE, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px' }}>Every Order Includes</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 38, color: GREEN, margin: 0 }}>
              What's in every book
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {INCLUDED.map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '28px 24px', boxShadow: '0 2px 12px rgba(45,74,62,0.07)' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 17, color: GREEN, margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: BODY, margin: 0, lineHeight: 1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section style={{ background: CREAM, padding: isMobile ? '48px 20px' : '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 24 : 32, color: GREEN, margin: '0 0 12px' }}>Still have questions?</h2>
          <p style={{ fontSize: 15, color: BODY, margin: '0 0 28px', lineHeight: 1.7 }}>We've answered the most common ones in our FAQ, from photo requirements to shipping times.</p>
          <Link href="/faq" style={{ background: 'transparent', color: GREEN, fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15, padding: '13px 30px', borderRadius: 50, textDecoration: 'none', display: 'inline-block', border: `2px solid ${GREEN}` }}>
            Read the FAQ →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: GREEN, padding: isMobile ? '56px 20px' : '80px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 14px' }}>Let's Get Started</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 30 : 44, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>
          Ready to create<br /><span style={{ color: CORAL }}>their book?</span>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 auto 36px', maxWidth: 420, lineHeight: 1.7 }}>
          Preview 4 pages free before you pay. No commitment, no risk.
        </p>
        <Link href="/books" style={{ background: CORAL, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 50, textDecoration: 'none', display: 'inline-block', boxShadow: '0 6px 28px rgba(232,131,106,0.45)' }}>
          Create Their Book →
        </Link>
      </section>

      <Footer />
    </div>
  )
}
