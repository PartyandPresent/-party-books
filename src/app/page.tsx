'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BOOKS, REVIEWS } from '@/lib/books'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN  = '#2D4A3E'
const CORAL  = '#E8836A'
const CREAM  = '#FAFAF5'
const BEIGE  = '#F5F0E8'
const LAVEN  = '#EDEAF5'
const BODY   = '#4A5568'
const MUTED  = '#888888'
const GOLD   = '#E8B84B'

// ─────────────────────────────────────────────────────────────
//  HOMEPAGE IMAGES
//  Drop your photos into the  public/images/  folder using the
//  exact filenames below, then push to Vercel — done.
//  Sizes are the minimum recommended upload dimensions.
// ─────────────────────────────────────────────────────────────
const IMAGES = {
  // FILE: public/images/hero.jpg — 1200 × 700 px (landscape)
  // Ideal: parent/child reading a book together, warm natural light
  hero: '/images/hero.jpg',

  // FILE: public/images/step-1.jpg — 640 × 360 px (16:9)
  // Ideal: someone uploading a child's photo on their phone/laptop
  step1: '/images/step-1.jpg',

  // FILE: public/images/step - 2.jpg — 640 × 360 px (16:9)
  step2: '/images/step - 2.jpg',

  // FILE: public/images/step - 3.jpg — 640 × 360 px (16:9)
  step3: '/images/step - 3.jpg',

  // FILE: public/images/cta-banner.png — 960 × 540 px (16:9)
  ctaBanner: '/images/cta-banner.png',

  // ── PREVIEW YOUR BOOK SECTION ───────────────────────────────
  // FILE: public/images/book-mockup.png — 800 × 600 px PNG with transparent background
  bookMockup: '/images/book-mockup.png',

  // FILE: public/images/page-1.jpg  — 1792 × 896 px (landscape 2:1 — full book spread)
  // FILE: public/images/page-2.jpg  — 1792 × 896 px (landscape 2:1 — full book spread)
  // FILE: public/images/page-3.jpg  — 1792 × 896 px (landscape 2:1 — full book spread)
  // FILE: public/images/page-4.jpg  — 1792 × 896 px (landscape 2:1 — full book spread)
  page1: '/images/page-1.jpg',
  page2: '/images/page-2.jpg',
  page3: '/images/page-3.jpg',
  page4: '/images/page-4.jpg',
}
// ─────────────────────────────────────────────────────────────

const MILESTONES = [
  { icon: '🎂', label: 'Birthday\nBooks',       href: '/milestones/birthday'     },
  { icon: '✝️', label: 'Baptism &\nChristening', href: '/milestones/baptism'      },
  { icon: '🐣', label: 'New\nBaby',              href: '/milestones/new-baby'     },
  { icon: '🎄', label: 'Christmas\nMagic',       href: '/milestones/christmas'    },
  { icon: '🐰', label: 'Easter\nGifts',          href: '/milestones/easter'       },
  { icon: '💝', label: 'Just\nBecause',          href: '/milestones/just-because' },
]

const STEPS = [
  {
    num: '1',
    imgKey: 'step1' as const,
    title: 'Tell us about your child',
    desc: 'Add their name, photo, and the story you want to tell — we take care of the rest.',
  },
  {
    num: '2',
    imgKey: 'step2' as const,
    title: 'Personalise their story',
    desc: 'Choose a book, add a dedication, and watch as AI brings their face into every scene.',
  },
  {
    num: '3',
    imgKey: 'step3' as const,
    title: 'Receive a keepsake they\'ll treasure',
    desc: 'A beautifully printed book, made to be read, loved and kept forever.',
  },
]


export default function HomePage() {
  const isMobile = useIsMobile()
  const collectionsRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    collectionsRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', background: CREAM, color: GREEN }}>
      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        paddingTop: 70,
        overflow: 'hidden',
        minHeight: isMobile ? 560 : 640,
      }}>
        {/* Full-bleed background image */}
        <Image
          src={IMAGES.hero}
          alt="Parent and child reading a personalized book together"
          fill
          quality={100}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'right center' }}
          priority
        />

        {/* Left-to-transparent white gradient so text is always readable */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isMobile
            ? 'linear-gradient(to bottom, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 55%, rgba(255,255,255,0.1) 100%)'
            : 'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0.55) 52%, rgba(255,255,255,0) 68%)',
        }} />

        {/* Text overlay */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, margin: '0 auto',
          padding: isMobile ? '52px 24px 64px' : '0 24px',
          display: 'flex', alignItems: 'center',
          minHeight: isMobile ? 'auto' : 640,
        }}>
          <div style={{ maxWidth: isMobile ? '100%' : 480 }}>
            <h1 style={{
              fontFamily: 'Playfair Display, serif', fontWeight: 900,
              fontSize: isMobile ? 38 : 54, lineHeight: 1.1,
              color: GREEN, margin: '0 0 20px',
            }}>
              Their story.<br />
              Their milestones.<br />
              <span style={{ color: CORAL }}>A keepsake<br />for life.</span>
            </h1>
            <p style={{ fontSize: 16, color: BODY, lineHeight: 1.7, marginBottom: 36, maxWidth: 400 }}>
              Personalized books celebrating the moments that shape their childhood and stay in your heart forever.
            </p>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12 }}>
              <Link href="/books" style={{
                background: GREEN, color: '#fff',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15,
                padding: '14px 30px', borderRadius: 50, textDecoration: 'none',
                display: 'inline-block', textAlign: 'center',
              }}>Create Your Book →</Link>
              <Link href="#collections" style={{
                background: 'transparent', color: GREEN,
                fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15,
                padding: '14px 30px', borderRadius: 50, textDecoration: 'none',
                border: `2px solid ${GREEN}`, display: 'inline-block', textAlign: 'center',
              }}>Explore Collections</Link>
            </div>
          </div>
        </div>

        {/* Decorative elements over the photo (right side) */}
        {!isMobile && (
          <>
            <span style={{ position: 'absolute', top: 88, right: '30%', fontSize: 26, color: GOLD, zIndex: 3, pointerEvents: 'none' }}>✦</span>
            <span style={{ position: 'absolute', top: 148, right: '12%', fontSize: 18, color: GOLD, zIndex: 3, pointerEvents: 'none' }}>✦</span>
            <span style={{ position: 'absolute', top: 80, right: '16%', fontSize: 20, color: GOLD, opacity: 0.5, zIndex: 3, pointerEvents: 'none' }}>✦</span>
            <div style={{ position: 'absolute', top: 76, right: 20, fontSize: 52, zIndex: 3, pointerEvents: 'none', lineHeight: 1 }}>🎈</div>
            <div style={{
              position: 'absolute', bottom: 40, right: '26%', zIndex: 3,
              background: '#C4B7E8', color: '#fff', borderRadius: '50%',
              width: 100, height: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center', fontSize: 12, fontWeight: 700, lineHeight: 1.4,
              boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
            }}>Made with<br />love.<br />Treasured<br />forever.</div>
          </>
        )}
      </section>

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <section style={{ background: '#fff', borderTop: '1px solid #F0EDE6', borderBottom: '1px solid #F0EDE6' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '20px 24px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? 16 : 0,
        }}>
          {[
            { icon: '⭐', stat: '4.9/5', sub: 'From 500+ happy families' },
            { icon: '💝', stat: '1,000+', sub: 'Personalized books created' },
            { icon: '🌿', stat: 'Handcrafted', sub: 'With love and care' },
            { icon: '🎁', stat: 'Loved &', sub: 'treasured worldwide' },
          ].map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: isMobile ? '0' : '0 24px',
              borderRight: !isMobile && i < 3 ? '1px solid #F0EDE6' : 'none',
            }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 15, color: GREEN }}>{t.stat}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOP BY MILESTONE ────────────────────────────── */}
      <section style={{ background: BEIGE, padding: isMobile ? '48px 20px' : '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 36, color: GREEN, margin: 0 }}>
              Shop by Milestone ✦
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: 12 }}>
            {MILESTONES.map((m, i) => (
              <Link key={i} href={m.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff', borderRadius: 16, padding: '20px 8px',
                  textAlign: 'center', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(45,74,62,0.06)',
                  border: '1.5px solid #EDE8DF',
                  transition: 'all 0.2s',
                }}
                  onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,74,62,0.12)'; e.currentTarget.style.borderColor = CORAL }}
                  onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(45,74,62,0.06)'; e.currentTarget.style.borderColor = '#EDE8DF' }}>
                  <div style={{ fontSize: isMobile ? 28 : 36, marginBottom: 10 }}>{m.icon}</div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: isMobile ? 11 : 12, color: GREEN, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{m.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section style={{ background: '#fff', padding: isMobile ? '48px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 36, color: GREEN, margin: 0 }}>
              How It Works ✦
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 40 : 32, alignItems: 'start' }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                {/* Step number */}
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: GREEN, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18,
                  marginBottom: 20,
                }}>{s.num}</div>
                {/* Book image */}
                <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 24, boxShadow: '0 12px 32px rgba(45,74,62,0.14)', width: '100%' }}>
                  <Image src={IMAGES[s.imgKey]} alt={s.title} width={640} height={360} style={{ objectFit: 'cover', display: 'block', width: '100%' }} />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18, color: GREEN, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: BODY, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ─────────────────────────── */}
      <section id="collections" style={{ background: CREAM, padding: isMobile ? '48px 0' : '72px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 24 : 32, color: GREEN, margin: 0 }}>
              Featured Collections
            </h2>
            <Link href="/collections" style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: CORAL, fontWeight: 700, textDecoration: 'none' }}>
              View all collections →
            </Link>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          {!isMobile && (
            <>
              <button onClick={() => scroll('left')} style={{
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                zIndex: 2, background: '#fff', border: '1.5px solid #EDE8DF',
                borderRadius: '50%', width: 40, height: 40, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: GREEN, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}>‹</button>
              <button onClick={() => scroll('right')} style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                zIndex: 2, background: '#fff', border: '1.5px solid #EDE8DF',
                borderRadius: '50%', width: 40, height: 40, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: GREEN, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}>›</button>
            </>
          )}
          <div ref={collectionsRef} style={{
            display: 'flex', gap: 20, overflowX: 'auto', padding: '8px 24px 16px',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}>
            {BOOKS.map(book => (
              <Link key={book.slug} href={`/books/${book.slug}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                <div style={{
                  width: 200, background: '#fff', borderRadius: 16, overflow: 'hidden',
                  border: '1.5px solid #EDE8DF', boxShadow: '0 2px 8px rgba(45,74,62,0.06)',
                  transition: 'all 0.2s',
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(45,74,62,0.12)' }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(45,74,62,0.06)' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                    <Image src={book.coverImage} alt={book.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13, color: GREEN, marginBottom: 4, lineHeight: 1.3 }}>{book.title}</div>
                    <div style={{ fontSize: 12, color: CORAL, fontWeight: 700 }}>${book.price.toFixed(2)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIEW YOUR BOOK ────────────────────────────── */}
      <section style={{ background: BEIGE, padding: isMobile ? '48px 20px' : '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 38, color: GREEN, margin: 0 }}>
              Preview Your Book <span style={{ color: CORAL }}>♥</span>
            </h2>
          </div>

          {/* Book mockup + pages grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '5fr 7fr', gap: isMobile ? 40 : 48, alignItems: 'center', marginBottom: 48 }}>

            {/* Left — 3D book mockup image */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                src={IMAGES.bookMockup}
                alt="3D book mockup"
                width={400}
                height={300}
                unoptimized
                style={{ width: isMobile ? '80%' : '100%', height: 'auto', maxWidth: 400 }}
              />
            </div>

            {/* Right — 4 landscape page spreads in 2×2 grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? 10 : 16 }}>
              {[IMAGES.page1, IMAGES.page2, IMAGES.page3, IMAGES.page4].map((src, i) => (
                <div key={i} style={{
                  borderRadius: 14, overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(45,74,62,0.16)',
                  border: '3px solid #fff',
                  aspectRatio: '2/1',
                  position: 'relative',
                }}>
                  <Image
                    src={src}
                    alt={`Book spread ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 35vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 10 : 20, flexWrap: 'wrap' }}>
            {[
              { icon: '💝', label: 'Personalized for them' },
              { icon: '⭐', label: 'Beautiful illustrations' },
              { icon: '💎', label: 'Premium quality' },
              { icon: '🌿', label: 'A keepsake to last' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 50, padding: '10px 20px', boxShadow: '0 2px 12px rgba(45,74,62,0.10)' }}>
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, color: GREEN }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section style={{ background: CORAL, padding: isMobile ? '48px 20px' : '0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center', minHeight: isMobile ? 'auto' : 280 }}>
          <div style={{ padding: isMobile ? '0' : '48px 48px 48px 24px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 36, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
              Some gifts are opened once.<br />
              Stories are remembered forever.
            </h2>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, marginBottom: isMobile ? 0 : 0, alignItems: isMobile ? 'flex-start' : 'center' }}>
              <Link href="/books" style={{
                background: '#fff', color: CORAL,
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15,
                padding: '13px 28px', borderRadius: 50, textDecoration: 'none',
                display: 'inline-block', whiteSpace: 'nowrap',
              }}>Create Their Book →</Link>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, margin: 0 }}>
                Create a book they'll love today and cherish forever.
              </p>
            </div>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', padding: '24px 24px 0', position: 'relative' }}>
              {/* Decorative floral elements */}
              <div style={{ position: 'absolute', right: 0, top: 0, fontSize: 80, opacity: 0.15, lineHeight: 1 }}>🌸</div>
              <div style={{ position: 'absolute', left: 0, bottom: 0, fontSize: 60, opacity: 0.15, lineHeight: 1 }}>🌿</div>
              <div style={{ borderRadius: '20px 20px 0 0', overflow: 'hidden', boxShadow: '0 -8px 32px rgba(0,0,0,0.15)', maxWidth: 320 }}>
                <Image
                  src={IMAGES.ctaBanner}
                  alt="A family reading their personalized book together"
                  width={960} height={540}
                  style={{ objectFit: 'cover', display: 'block', width: '100%' }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: isMobile ? '48px 20px' : '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 36, color: GREEN, margin: '0 0 8px' }}>
              Loved by Families ✦
            </h2>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
              {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 20, color: GOLD }}>★</span>)}
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15, color: GREEN, marginLeft: 8 }}>4.9/5</span>
              <span style={{ fontSize: 13, color: MUTED, marginLeft: 4 }}>from 500+ reviews</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20, marginBottom: 56 }}>
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div key={i} style={{
                background: CREAM, borderRadius: 20, padding: '24px',
                border: '1.5px solid #EDE8DF',
              }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 14, color: GOLD }}>★</span>)}
                </div>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: BODY, lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>
                  "{r.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${GREEN}, ${CORAL})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: 16, flexShrink: 0,
                  }}>{r.avatar}</div>
                  <div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: GREEN }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{r.location} · {r.book}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Press logos */}
          <div style={{ borderTop: '1px solid #EDE8DF', paddingTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 24 : 48, flexWrap: 'wrap' }}>
            {['Today\'s Parent', 'BabyCentre', 'Global', 'CBC', 'Trustpilot'].map(logo => (
              <div key={logo} style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 13 : 16, color: '#B0A898', letterSpacing: 0.5 }}>{logo}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section style={{ background: GREEN, padding: isMobile ? '48px 20px' : '72px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, bottom: -40, fontSize: 200, opacity: 0.04, lineHeight: 1, pointerEvents: 'none' }}>🏰</div>
        <div style={{ position: 'absolute', left: -20, top: -20, fontSize: 120, opacity: 0.04, lineHeight: 1, pointerEvents: 'none' }}>🌸</div>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 16 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 18, color: GOLD }}>★</span>)}
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 40, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            Ready to create their next favourite story?
          </h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.7 }}>
            A beautifully printed, fully personalized book — delivered to your door in 5–7 days.
          </p>
          <Link href="/books" style={{
            background: CORAL, color: '#fff',
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16,
            padding: '16px 40px', borderRadius: 50, textDecoration: 'none',
            display: 'inline-block', boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}>Create Your Book →</Link>
          <div style={{ marginTop: 24, display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['💳 Secure checkout', '📦 Ships worldwide', '💝 Satisfaction guaranteed'].map(b => (
              <span key={b} style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
