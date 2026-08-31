'use client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN  = '#2D4A3E'
const CORAL  = '#E8836A'
const CREAM  = '#FAFAF5'
const BEIGE  = '#F5F0E8'
const BODY   = '#4A5568'
const MUTED  = '#888888'

const SECTIONS = [
  {
    title: 'Information We Collect',
    items: [
      'Personal details such as your name, email address, shipping address, and any images you upload when placing an order.',
      'Usage data via cookies to understand how visitors use our site and improve your experience.',
    ],
  },
  {
    title: 'How We Use Your Information',
    items: [
      'To process your order and communicate with you about it.',
      'To send updates, promotions, and newsletters — you can opt out at any time.',
      'To improve our services and website performance.',
    ],
  },
  {
    title: 'Sharing Information',
    items: [
      'We do not sell or rent your personal information to anyone.',
      'Your data is shared only with trusted third parties needed to complete your order, such as payment processors and delivery partners.',
    ],
  },
  {
    title: 'Security',
    items: [
      'We use secure technology (SSL encryption) to keep your personal data safe during checkout and all communications with our site.',
    ],
  },
  {
    title: 'Your Rights',
    items: [
      'You have the right to access, correct, or delete your personal data at any time.',
      'To make a request, contact us at miloria@partyandpresents.com and we\'ll respond as quickly as possible.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: GREEN, paddingTop: 70 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '56px 20px 64px' : '80px 24px 88px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 16px' }}>Legal</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 36 : 56, color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
            Privacy<br /><span style={{ color: CORAL }}>Policy</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.7)', margin: '0 auto', lineHeight: 1.8, maxWidth: 500 }}>
            Your privacy is important to us. Here's exactly what we collect, how we use it, and how we keep it safe.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: CREAM, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* Intro */}
          <div style={{ background: BEIGE, borderLeft: `4px solid ${CORAL}`, borderRadius: '0 12px 12px 0', padding: '20px 24px' }}>
            <p style={{ fontSize: 14, color: BODY, margin: 0, lineHeight: 1.8 }}>
              This Privacy Policy explains how <strong>Miloria Books by Party &amp; Presents</strong> collects, uses, and protects your information when you use our website at miloriabooks.com. By placing an order or using our site, you agree to the practices described here.
            </p>
          </div>

          {/* Sections */}
          {SECTIONS.map((section, i) => (
            <div key={i}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 24 : 30, color: GREEN, margin: '0 0 16px' }}>{section.title}</h2>
              <div style={{ height: 2, background: BEIGE, marginBottom: 20 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {section.items.map((text, j) => (
                  <div key={j} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: CORAL, flexShrink: 0, marginTop: 7 }} />
                    <p style={{ fontSize: 15, color: BODY, margin: 0, lineHeight: 1.8 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Cookies note */}
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 24 : 30, color: GREEN, margin: '0 0 16px' }}>Cookies</h2>
            <div style={{ height: 2, background: BEIGE, marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: BODY, margin: 0, lineHeight: 1.8 }}>
              We use cookies to improve site performance and understand how visitors interact with our pages. You can control cookies through your browser settings at any time. Some features of the site may not function correctly if cookies are disabled.
            </p>
          </div>

          {/* Updates */}
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 24 : 30, color: GREEN, margin: '0 0 16px' }}>Changes to This Policy</h2>
            <div style={{ height: 2, background: BEIGE, marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: BODY, margin: 0, lineHeight: 1.8 }}>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review it periodically.
            </p>
          </div>

          {/* Last updated */}
          <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>Last updated: August 2026</p>

          {/* Contact CTA */}
          <div style={{ background: GREEN, borderRadius: 20, padding: isMobile ? '32px 24px' : '40px 48px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 22 : 28, color: '#fff', margin: '0 0 12px' }}>Questions about your data?</p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '0 0 24px', lineHeight: 1.7 }}>
              We're happy to help. Reach out and we'll respond as quickly as we can.
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
