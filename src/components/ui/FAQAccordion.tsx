'use client'
import { useState } from 'react'
import Link from 'next/link'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const CREAM = '#FAFAF5'
const BODY  = '#4A5568'

const FAQ_ITEMS = [
  {
    icon: '🔍',
    q: 'How do I personalize my book?',
    a: "It's simple and takes just a few minutes. Choose your book, upload a clear photo of your child, enter their name and a personal message from you, and select your cover format. We'll generate your book with your child as the character — you can preview it before you pay.",
  },
  {
    icon: '👀',
    q: 'Can I preview my book before I buy it?',
    a: "Yes — we generate a full preview of your book before you commit to anything. You'll see your child's face in the illustrations, their name woven into the story, and a real sense of how the finished book will look. Only pay if you love it.",
  },
  {
    icon: '✨',
    q: 'What makes Miloriabooks different?',
    a: "Every book features your child as the main character — not a generic child, but their actual face illustrated into every page. Combined with their name and a dedication from you, the result is something truly one-of-a-kind that no shop shelf can offer.",
  },
  {
    // TODO: Update delivery timeframe once confirmed with print/fulfilment partner.
    // Placeholder brackets [X–X] are intentional — do not replace until confirmed.
    icon: '📦',
    q: 'How long will it take to receive my book?',
    a: "After you order, your book is reviewed and sent to print within 1–2 business days. Delivery typically takes an additional [X–X] business days depending on your location. We'll send a tracking notification once it ships.",
  },
  {
    icon: '🌍',
    q: 'Do you ship internationally?',
    a: "We currently ship within Canada and to the United States. International shipping to other countries is coming soon — check our Shipping Info page for the latest rates and estimated delivery times.",
  },
  {
    icon: '💝',
    q: "What if I'm not happy with how my child's character turned out?",
    a: "We want you to love every page. If the character likeness doesn't look right, please contact us before your book goes to print and we'll work with you to get it right. Your satisfaction is our priority.",
  },
  {
    icon: '💬',
    q: 'How do I get in touch with you?',
    a: "You can reach us at hello@partyandpresents.com — we typically respond within 1 business day. We're a small team and genuinely love hearing from families.",
  },
]

function AccordionItem({ icon, q, a }: { icon: string; q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #E2EBE7' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '20px 0', cursor: 'pointer', display: 'flex',
          alignItems: 'center', gap: 14,
        }}
      >
        <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
        <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15, color: GREEN, flex: 1, lineHeight: 1.5 }}>{q}</span>
        <span style={{
          color: CORAL, fontSize: 22, fontWeight: 300, flexShrink: 0, lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s',
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: BODY, lineHeight: 1.8, margin: '0 0 20px', paddingLeft: 34, paddingRight: 32 }}>{a}</p>
      )}
    </div>
  )
}

export function FAQAccordion({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ background: CREAM, padding: isMobile ? '48px 20px' : '72px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif', fontWeight: 900,
            fontSize: isMobile ? 26 : 34, color: GREEN,
            margin: '0 0 12px', lineHeight: 1.25,
          }}>
            We thought you might ask <span style={{ color: CORAL }}>✦</span>
          </h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: BODY, margin: 0, lineHeight: 1.7 }}>
            Everything you need to know about personalizing your book.
          </p>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} icon={item.icon} q={item.q} a={item.a} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 36, paddingTop: 32, borderTop: '1px solid #E2EBE7' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: BODY, margin: '0 0 16px', lineHeight: 1.7 }}>
            Still have a question?{' '}
            <a href="mailto:hello@partyandpresents.com" style={{ color: CORAL, fontWeight: 700, textDecoration: 'none' }}>
              hello@partyandpresents.com
            </a>
          </p>
          <Link href="/faq" style={{
            color: GREEN, fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13,
            textDecoration: 'none', border: `1.5px solid ${GREEN}`, padding: '8px 22px',
            borderRadius: 50, display: 'inline-block',
          }}>
            See all FAQs →
          </Link>
        </div>

      </div>
    </section>
  )
}