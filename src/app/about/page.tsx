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

const VALUES = [
  { icon: '💚', title: 'Every child is the hero', body: "We believe every child deserves to see themselves as the main character, in life and on the page. That's why every book we make puts their face, their name, and their story front and centre." },
  { icon: '✨', title: 'Crafted with intention', body: "Each book is reviewed by our team before it goes to print. We don't just generate and ship, we check every page, every illustration, every word to make sure it's something worth keeping forever." },
  { icon: '📖', title: 'Stories that matter', body: "We only create books around themes that are genuinely meaningful: faith, love, belonging, courage. These aren't novelty gifts. They're keepsakes families return to year after year." },
  { icon: '🎁', title: 'Gifts with a heartbeat', body: "We started party & presents because we wanted to give people a gift that actually meant something: something that couldn't be found on a shelf, couldn't be re-gifted, and wouldn't end up in a drawer." },
]

export default function AboutPage() {
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: GREEN, paddingTop: 70 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '56px 20px 64px' : '80px 24px 88px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 16px' }}>Our Story</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 36 : 56, color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
            Books as unique as<br /><span style={{ color: CORAL }}>the child you love.</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.7)', margin: '0 auto', lineHeight: 1.8, maxWidth: 560 }}>
            We create personalised storybooks where every child is the main character, their face, their name, their story beautifully illustrated on every page.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section style={{ background: CREAM, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 16px' }}>How It Started</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 38, color: GREEN, margin: '0 0 28px', lineHeight: 1.2 }}>
            We couldn't find the gift we wanted to give. So we built it.
          </h2>
          <p style={{ fontSize: 16, color: BODY, lineHeight: 1.9, margin: '0 0 20px' }}>
            party & presents started as a celebration company, and we know how much a milestone moment means to a family. Birthdays, baptisms, new arrivals, Christmas mornings. These moments matter, and the gifts given in them matter too.
          </p>
          <p style={{ fontSize: 16, color: BODY, lineHeight: 1.9, margin: '0 0 20px' }}>
            But when we looked for a gift that was truly personal: something that would last, something the child would grow up with. We kept coming up short. Generic books with a name printed in. Toys forgotten by the following week. Cards that went straight to recycling.
          </p>
          <p style={{ fontSize: 16, color: BODY, lineHeight: 1.9, margin: 0 }}>
            So we built something different. A personalised storybook where your child is literally the character, their actual face, their name woven into every page, and illustrations so beautiful you'd frame them. That's party & presents books.
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: BEIGE, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px' }}>What We Believe</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 38, color: GREEN, margin: 0 }}>
              The values behind every book
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 24 }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 2px 16px rgba(45,74,62,0.07)' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 20, color: GREEN, margin: '0 0 12px' }}>{v.title}</h3>
                <p style={{ fontSize: 15, color: BODY, margin: 0, lineHeight: 1.8 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process teaser */}
      <section style={{ background: CREAM, padding: isMobile ? '56px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 12px' }}>How We Make Them</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 38, color: GREEN, margin: '0 0 20px' }}>
            Not just generated. Reviewed.
          </h2>
          <p style={{ fontSize: 16, color: BODY, lineHeight: 1.9, margin: '0 0 16px' }}>
            We use advanced AI to generate Pixar-quality illustrations featuring your child's actual face, matched from the photo you upload. Every scene is illustrated fresh, for your child, with their likeness in every single spread.
          </p>
          <p style={{ fontSize: 16, color: BODY, lineHeight: 1.9, margin: '0 0 32px' }}>
            But we don't just send what the AI produces. Every order goes through a human quality review before it goes to print. Our team checks each page, checking character consistency, the text, the composition, so the book that arrives is one we're proud of.
          </p>
          <Link href="/how-it-works" style={{ background: GREEN, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15, padding: '14px 32px', borderRadius: 50, textDecoration: 'none', display: 'inline-block' }}>
            See How It Works →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: GREEN, padding: isMobile ? '56px 20px' : '80px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 14px' }}>Ready?</p>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 30 : 44, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>
          Create a book they'll<br /><span style={{ color: CORAL }}>treasure forever.</span>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 auto 36px', maxWidth: 440, lineHeight: 1.7 }}>
          Upload their photo, choose a story, and let us do the rest.
        </p>
        <Link href="/books" style={{ background: CORAL, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 50, textDecoration: 'none', display: 'inline-block', boxShadow: '0 6px 28px rgba(232,131,106,0.45)' }}>
          Create Their Book →
        </Link>
      </section>

      <Footer />
    </div>
  )
}
