'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const CREAM = '#FAFAF5'
const BEIGE = '#F5F0E8'
const BODY  = '#4A5568'

const FAQ_SECTIONS = [
  {
    category: 'About the Books',
    icon: '📚',
    questions: [
      {
        q: 'How personalised is each book?',
        a: "Very. Every book is generated fresh for your child — their actual face appears in every single illustration across all 17 pages, alongside their name and a personal dedication from you. No two books are the same.",
      },
      {
        q: 'What age range are the books for?',
        a: "Our books are designed to be treasured from babyhood through childhood. The stories and illustrations are suitable from birth, and the keepsake quality means they're just as meaningful for a 10-year-old as a newborn.",
      },
      {
        q: 'How many pages does each book have?',
        a: "Every book contains 17 fully illustrated pages, including a cover, a personalised dedication page, and a final page. Each spread features a unique scene with your child as the character.",
      },
      {
        q: 'What themes are the books based on?',
        a: "Currently we offer God's Promises For You — a faith-based book featuring scripture woven through every page. More titles covering themes of love, bravery, and identity are coming soon.",
      },
      {
        q: 'Can I see the book before I pay?',
        a: "Yes — we generate 5 free preview pages before you commit to anything. You'll see your child's face in the illustrations, their name in the story, and get a real feel for the quality. Only pay if you love it.",
      },
    ],
  },
  {
    category: 'Photos & Personalisation',
    icon: '📸',
    questions: [
      {
        q: 'What kind of photo should I upload?',
        a: "A clear, well-lit, front-facing photo works best. Avoid heavy filters, sunglasses, or hats. The better the photo, the more accurately we can match your child's likeness across the illustrations.",
      },
      {
        q: 'My photo isn\'t perfect — will it still work?',
        a: "In most cases yes, though the quality of the likeness depends on the photo. If the preview pages don't look right, you won't be charged — simply contact us and we'll help you get a better result.",
      },
      {
        q: 'Can I add a personal message?',
        a: "Yes — every book includes a personalised dedication page where you can write a message from you to the child. It's one of the most meaningful parts of the whole book.",
      },
      {
        q: 'Can I change the details after ordering?',
        a: "Once an order is placed and generation begins, we're unable to change the child's name or photo. Please double-check all details on the personalisation page before completing your purchase.",
      },
    ],
  },
  {
    category: 'Orders & Payment',
    icon: '💳',
    questions: [
      {
        q: 'How much does a book cost?',
        a: "Books are priced at $23.98 CAD. We also offer interest-free payment options through Afterpay at checkout.",
      },
      {
        q: 'What payment methods do you accept?',
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex) as well as Afterpay for interest-free instalments. All payments are processed securely through Stripe.",
      },
      {
        q: 'Can I order as a gift?',
        a: "Absolutely — most of our books are bought as gifts. You can ship directly to the recipient's address at checkout. Gift packaging is included with every order.",
      },
      {
        q: 'Can I cancel or get a refund?',
        a: "Because each book is custom-generated for a specific child, we're unable to accept returns. However, if you're unhappy with the quality of your book, please contact us and we'll make it right.",
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: '📦',
    questions: [
      {
        q: 'How long does it take to receive my book?',
        a: "After your order is placed, we generate and review your full 17-page book (1–2 business days), then it goes to print and ships. Total delivery time is typically 4–7 business days.",
      },
      {
        q: 'Do you offer free shipping?',
        a: "Yes — free shipping on all orders over $75 CAD. Standard shipping rates apply to orders under $75.",
      },
      {
        q: 'Do you ship internationally?',
        a: "Currently we ship within Canada and to the United States. International shipping to other countries is coming soon. Check our Shipping Info page for current rates and estimated delivery times.",
      },
      {
        q: 'How will I know when my book has shipped?',
        a: "You'll receive an email confirmation once your order is placed, and a shipping notification with tracking details once your book is on its way.",
      },
    ],
  },
  {
    category: 'Quality',
    icon: '⭐',
    questions: [
      {
        q: 'What is the print quality like?',
        a: "We use premium printing on high-quality paper with vibrant colour reproduction. The illustrations are designed to look stunning in print — not just on screen. We wouldn't ship it if we wouldn't be proud to give it ourselves.",
      },
      {
        q: 'Is every book reviewed before shipping?',
        a: "Yes. Every order goes through a human quality review — our team checks each of the 17 pages for illustration quality, character consistency, and text accuracy before it goes to print.",
      },
      {
        q: 'What if a page doesn\'t look right?',
        a: "If our team spots an issue during review, we regenerate that page before printing. Your book won't ship until we're happy with every page.",
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #E2EBE7' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '20px 0', cursor: 'pointer', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}
      >
        <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15, color: GREEN, lineHeight: 1.5 }}>{q}</span>
        <span style={{ color: CORAL, fontSize: 22, fontWeight: 300, flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', lineHeight: 1 }}>+</span>
      </button>
      {open && (
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: BODY, lineHeight: 1.8, margin: '0 0 20px', paddingRight: 32 }}>{a}</p>
      )}
    </div>
  )
}

export default function FAQPage() {
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: GREEN, paddingTop: 70 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '56px 20px 64px' : '80px 24px 88px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 16px' }}>Help Centre</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 36 : 56, color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
            Frequently Asked<br /><span style={{ color: CORAL }}>Questions</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.7)', margin: '0 auto', lineHeight: 1.8, maxWidth: 480 }}>
            Everything you need to know about our personalised books — from photos to delivery.
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '48px 20px 64px' : '72px 24px 80px' }}>
        {FAQ_SECTIONS.map((section, si) => (
          <div key={si} style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 24 }}>{section.icon}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 20 : 24, color: GREEN, margin: 0 }}>
                {section.category}
              </h2>
            </div>
            <div style={{ height: 2, background: '#E2EBE7', marginBottom: 4 }} />
            {section.questions.map((item, qi) => (
              <AccordionItem key={qi} q={item.q} a={item.a} />
            ))}
          </div>
        ))}

        {/* Contact prompt */}
        <div style={{ background: BEIGE, borderRadius: 20, padding: isMobile ? '32px 24px' : '40px 48px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>💬</div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 20 : 24, color: GREEN, margin: '0 0 12px' }}>
            Still have a question?
          </h3>
          <p style={{ fontSize: 15, color: BODY, margin: '0 0 24px', lineHeight: 1.7 }}>
            We're happy to help. Reach us at{' '}
            <a href="mailto:hello@partyandpresents.com" style={{ color: CORAL, fontWeight: 700, textDecoration: 'none' }}>
              hello@partyandpresents.com
            </a>{' '}
            and we'll get back to you within 1 business day.
          </p>
          <Link href="/how-it-works" style={{ color: GREEN, fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, textDecoration: 'none', border: `2px solid ${GREEN}`, padding: '10px 24px', borderRadius: 50, display: 'inline-block' }}>
            See How It Works →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: GREEN, padding: isMobile ? '56px 20px' : '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 30 : 44, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>
          Ready to create<br /><span style={{ color: CORAL }}>their book?</span>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 auto 36px', maxWidth: 420, lineHeight: 1.7 }}>
          Preview 5 pages free before you pay — no commitment, no risk.
        </p>
        <Link href="/books" style={{ background: CORAL, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, padding: '16px 40px', borderRadius: 50, textDecoration: 'none', display: 'inline-block', boxShadow: '0 6px 28px rgba(232,131,106,0.45)' }}>
          Create Their Book →
        </Link>
      </section>

      <Footer />
    </div>
  )
}
