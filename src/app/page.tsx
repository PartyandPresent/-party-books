'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BookCard from '@/components/ui/BookCard'
import { BOOKS, REVIEWS, OCCASIONS, RECIPIENTS } from '@/lib/books'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function HomePage() {
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab]         = useState<'all' | 'occasion' | 'recipient'>('all')
  const [activeOccasion, setActiveOccasion] = useState('')
  const [activeRecipient, setActiveRecipient] = useState('')

  const filteredBooks = BOOKS.filter(book => {
    if (activeTab === 'occasion' && activeOccasion)  return book.occasion.includes(activeOccasion)
    if (activeTab === 'recipient' && activeRecipient) return book.recipient.includes(activeRecipient)
    return true
  })

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #FFEEF5 0%, #fff 50%, #E6F8FE 100%)',
        display: 'flex', alignItems: 'center',
        paddingTop: isMobile ? 90 : 110, paddingBottom: 60,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,85,156,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(40,190,239,0.06)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 24px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 60, alignItems: 'center', width: '100%' }}>

          {/* Left — Text */}
          <div>
            {/* Tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFEEF5', border: '1px solid #FF559C40', borderRadius: 50, padding: '6px 16px', marginBottom: 20 }}>
              <span style={{ fontSize: 14 }}>✨</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: '#FF559C' }}>Pixar-Quality Personalized Books</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 36 : 'clamp(36px, 5vw, 58px)', color: '#2C2C2C', lineHeight: 1.15, marginBottom: 16 }}>
              Books as unique as{' '}
              <span style={{ color: '#FF559C', display: 'block' }}>the child you love</span>
            </h1>

            <p style={{ fontSize: isMobile ? 16 : 18, color: '#555555', lineHeight: 1.7, marginBottom: 24, maxWidth: 480 }}>
              Upload a photo, add a name, and watch as Gemini AI transforms your child into the hero of their very own storybook — in minutes.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: isMobile ? 20 : 28, marginBottom: 28, flexWrap: 'wrap' }}>
              {[
                { num: '500+', label: 'Happy families' },
                { num: '4.9★', label: 'Average rating' },
                { num: '17', label: 'Pages per book' },
              ].map(s => (
                <div key={s.num}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 22 : 26, color: '#FF559C' }}>{s.num}</div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#888888', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/books" style={{
                background: '#FF559C', color: '#fff',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16,
                padding: '15px 32px', borderRadius: 50, textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(255,85,156,0.35)',
                display: 'block', textAlign: 'center',
              }}>
                ✨ Create Their Book
              </Link>
              <Link href="#how-it-works" style={{
                background: 'transparent', color: '#FF559C',
                fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 16,
                padding: '15px 32px', borderRadius: 50, textDecoration: 'none',
                border: '2px solid #FF559C', display: 'block', textAlign: 'center',
              }}>
                See How It Works
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: isMobile ? 12 : 20, marginTop: 24, flexWrap: 'wrap' }}>
              {['🎨 Pixar-quality art', '📦 Ships in 5–7 days', '💝 100% satisfaction'].map(b => (
                <span key={b} style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#888888', fontWeight: 600 }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Right — Book Showcase */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: isMobile ? 340 : 460 }}>
              {/* Main book */}
              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 32px 80px rgba(255,85,156,0.25)', border: '3px solid #fff' }}>
                <Image
                  src="https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Cover_-_Page_0_gssekg.png"
                  alt="God's Promises For You"
                  width={460} height={260}
                  style={{ objectFit: 'cover', display: 'block', width: '100%' }}
                />
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', top: -12, right: -8,
                background: '#FF559C', color: '#fff',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 11,
                padding: '6px 14px', borderRadius: 50,
                boxShadow: '0 4px 14px rgba(255,85,156,0.4)',
              }}>
                ⭐ Bestseller
              </div>
              {/* Small preview cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                {[
                  'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_3_u2rqpp.png',
                  'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_4_oxlsdp.png',
                ].map((src, i) => (
                  <div key={i} style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '2px solid #fff' }}>
                    <Image src={src} alt={`Page ${i + 2}`} width={220} height={110} style={{ objectFit: 'cover', display: 'block', width: '100%' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, color: '#FF559C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Simple & Fast</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 42px)', color: '#2C2C2C', marginTop: 8, marginBottom: 12 }}>
            Ready in minutes
          </h2>
          <p style={{ color: '#888888', fontSize: 16, marginBottom: 60, maxWidth: 500, margin: '0 auto 60px' }}>
            Three simple steps and their book is ready to print and ship.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {[
              {
                step: '01',
                icon: '📸',
                title: 'Upload a Photo',
                desc: 'Share a clear, well-lit photo of your child. Our AI reads their face, hair, skin tone, and features — perfectly.',
                color: '#FFEEF5',
                accent: '#FF559C',
              },
              {
                step: '02',
                icon: '✏️',
                title: 'Add the Details',
                desc: "Enter their name, a sender name, and an optional dedication message. Pick the book that feels right for them.",
                color: '#E6F8FE',
                accent: '#28BEEF',
              },
              {
                step: '03',
                icon: '✨',
                title: 'AI Creates the Magic',
                desc: 'Gemini AI generates 17 custom pages — each featuring your child as the main character in stunning Pixar-style art.',
                color: '#FFEEF5',
                accent: '#FF559C',
              },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.color, borderRadius: 20, padding: '36px 28px',
                textAlign: 'left', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 64, color: s.accent, opacity: 0.08, lineHeight: 1 }}>{s.step}</div>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 12, color: s.accent, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Step {s.step}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 22, color: '#2C2C2C', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: '#555555', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKS / BROWSE ───────────────────────────────────── */}
      <section style={{ background: '#FAFAFA', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, color: '#FF559C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Collection</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 42px)', color: '#2C2C2C', marginTop: 8, marginBottom: 12 }}>
              Find the perfect book
            </h2>
            <p style={{ color: '#888888', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
              Browse by occasion or recipient — every book is fully personalized with your child's face and name.
            </p>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { id: 'all', label: 'All Books' },
              { id: 'occasion', label: 'By Occasion' },
              { id: 'recipient', label: 'By Recipient' },
            ].map(tab => (
              <button key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setActiveOccasion(''); setActiveRecipient('') }}
                style={{
                  fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
                  padding: '10px 24px', borderRadius: 50, cursor: 'pointer', border: 'none',
                  background: activeTab === tab.id ? '#FF559C' : '#fff',
                  color: activeTab === tab.id ? '#fff' : '#555555',
                  boxShadow: activeTab === tab.id ? '0 4px 14px rgba(255,85,156,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sub-filters */}
          {activeTab === 'occasion' && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
              {OCCASIONS.map(o => (
                <button key={o.value}
                  onClick={() => setActiveOccasion(o.value)}
                  style={{
                    fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 13,
                    padding: '8px 18px', borderRadius: 50, cursor: 'pointer',
                    border: `2px solid ${activeOccasion === o.value ? '#FF559C' : '#FFEEF5'}`,
                    background: activeOccasion === o.value ? '#FFEEF5' : '#fff',
                    color: activeOccasion === o.value ? '#FF559C' : '#888888',
                    transition: 'all 0.2s',
                  }}>
                  {o.label}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'recipient' && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
              {RECIPIENTS.map(r => (
                <button key={r.value}
                  onClick={() => setActiveRecipient(r.value)}
                  style={{
                    fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 13,
                    padding: '8px 18px', borderRadius: 50, cursor: 'pointer',
                    border: `2px solid ${activeRecipient === r.value ? '#28BEEF' : '#E6F8FE'}`,
                    background: activeRecipient === r.value ? '#E6F8FE' : '#fff',
                    color: activeRecipient === r.value ? '#28BEEF' : '#888888',
                    transition: 'all 0.2s',
                  }}>
                  {r.label}
                </button>
              ))}
            </div>
          )}

          {/* Book Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
            {filteredBooks.length > 0 ? filteredBooks.map(book => (
              <BookCard key={book.slug} book={book} />
            )) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#888888' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 16 }}>More books coming soon for this filter!</p>
                <button onClick={() => setActiveTab('all')} style={{ marginTop: 16, fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#FF559C', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>View all books →</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURES / TRUST ─────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 42px)', color: '#2C2C2C', marginBottom: 12 }}>
              Why party & presents?
            </h2>
            <p style={{ color: '#888888', fontSize: 16, maxWidth: 440, margin: '0 auto' }}>
              We obsess over every detail so you get a keepsake that lasts a lifetime.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
            {[
              { icon: '🎨', title: 'Pixar-Quality Art', desc: 'Every page is rendered in stunning 3D animated style — indistinguishable from a real published book.' },
              { icon: '🧒', title: "Their Real Face", desc: 'AI recreates your child\'s exact face, hair, skin tone, and features across all 17 pages.' },
              { icon: '📖', title: '17 Full Pages', desc: 'A complete storybook — not a pamphlet. Each page is a full illustrated scene with your child as the hero.' },
              { icon: '📦', title: 'Ships in 5–7 Days', desc: 'Carefully packed to prevent bending. Standard shipping 3–7 business days after processing.' },
              { icon: '💝', title: '100% Satisfaction', desc: "If you're not happy with the result, we'll regenerate it or refund you. No questions asked." },
              { icon: '🎁', title: 'Gift-Ready Packaging', desc: 'Arrives beautifully packaged — perfect for giving as a gift right out of the box.' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '28px 24px', borderRadius: 16,
                background: i % 2 === 0 ? '#FFEEF5' : '#E6F8FE',
                transition: 'transform 0.2s',
              }}
                onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18, color: '#2C2C2C', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#555555', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #FFEEF5 0%, #E6F8FE 100%)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, color: '#FF559C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Real Families</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 42px)', color: '#2C2C2C', marginTop: 8, marginBottom: 12 }}>
              They love their books
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
              {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 22, color: '#FFD700' }}>★</span>)}
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 16, color: '#2C2C2C', marginLeft: 4 }}>4.9 / 5</span>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: '#888888' }}>from 393 reviews</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 20, padding: '28px 24px',
                boxShadow: '0 4px 20px rgba(255,85,156,0.08)',
                border: '1px solid rgba(255,85,156,0.08)',
              }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 14, color: '#FFD700' }}>★</span>)}
                </div>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: '#555555', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>
                  "{r.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF559C, #28BEEF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16,
                    flexShrink: 0,
                  }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: '#2C2C2C' }}>{r.name}</div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#888888' }}>{r.location} · {r.book}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section style={{ background: '#FF559C', padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎁</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            Ready to create a keepsake they'll treasure forever?
          </h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 36, lineHeight: 1.6 }}>
            Processing takes 1–3 business days. Standard shipping 3–7 business days. Carefully packed, ready to gift.
          </p>
          <Link href="/books" style={{
            background: '#fff', color: '#FF559C',
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 18,
            padding: '18px 48px', borderRadius: 50, textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            transition: 'all 0.2s', display: 'inline-block',
          }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)' }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)' }}>
            ✨ Create Their Book Now
          </Link>
          <div style={{ marginTop: 20, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['💳 Secure checkout', '📦 Ships worldwide', '💝 Satisfaction guaranteed'].map(b => (
              <span key={b} style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}