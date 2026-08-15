'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import SparkleField from '@/components/ui/SparkleField'
import { ReviewPhoto } from '@/components/ui/ReviewPhoto'
import { BOOKS, REVIEWS } from '@/lib/books'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN  = '#2D4A3E'
const CORAL  = '#E8836A'
const CREAM  = '#FAFAF5'
const BEIGE  = '#F5F0E8'
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
  step1: '/images/step-1.png',

  // FILE: public/images/step - 2.png — 640 × 360 px (16:9)
  step2: '/images/step - 2.png',

  // FILE: public/images/step - 3.png — 640 × 360 px (16:9)
  step3: '/images/step - 3.png',

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
  { icon: '🎂', label: 'Birthday',        href: '/milestones/birthday'     },
  { icon: '🕊️', label: 'Faith &\nBaptism', href: '/milestones/baptism'      },
  { icon: '🐣', label: 'New Baby',        href: '/milestones/new-baby'     },
  { icon: '💍', label: 'Wedding',         href: '/milestones/wedding'      },
  { icon: '🎒', label: 'School',          href: '/milestones/school'       },
  { icon: '💝', label: 'Just Because',    href: '/milestones/just-because' },
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


type FeaturedTab = 'Bestsellers' | 'New Arrivals'
const TAB_TAG: Record<FeaturedTab, string> = {
  'Bestsellers':  'bestseller',
  'New Arrivals': 'new',
}

function FindYourStory({ isMobile }: { isMobile: boolean }) {
  const [activeTab, setActiveTab] = useState<FeaturedTab>('Bestsellers')
  const filtered = BOOKS.filter(b => b.tags.includes(TAB_TAG[activeTab]))

  return (
    <section id="collections" style={{ background: CREAM, padding: isMobile ? '48px 20px' : '72px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Heading */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 24 : 32, color: GREEN, margin: 0 }}>
            Find Your Story
          </h2>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, borderBottom: `2px solid #EDE8DF` }}>
          {(['Bestsellers', 'New Arrivals'] as FeaturedTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                fontSize: isMobile ? 14 : 16, color: activeTab === tab ? GREEN : MUTED,
                padding: '10px 24px',
                borderBottom: activeTab === tab ? `3px solid ${CORAL}` : '3px solid transparent',
                marginBottom: -2,
                transition: 'all 0.18s',
              }}
            >{tab}</button>
          ))}
        </div>

        {/* Grid or empty state */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📚</div>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 16, color: MUTED, fontWeight: 600 }}>
              More stories coming soon
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? 16 : 24,
            }}>
              {filtered.map(book => (
                <Link key={book.slug} href={`/books/${book.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{ cursor: 'pointer' }}
                    onMouseOver={e => {
                      const img = e.currentTarget.firstElementChild as HTMLElement
                      if (img) { img.style.transform = 'scale(1.04)'; img.style.boxShadow = '0 10px 28px rgba(45,74,62,0.20)' }
                    }}
                    onMouseOut={e => {
                      const img = e.currentTarget.firstElementChild as HTMLElement
                      if (img) { img.style.transform = 'scale(1)'; img.style.boxShadow = 'none' }
                    }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 16, overflow: 'hidden', background: '#F0EDE6', transition: 'transform 0.22s, box-shadow 0.22s' }}>
                      <Image src={book.cardImage ?? book.coverImage} alt={book.title} fill unoptimized style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '12px 0 14px' }}>
                      <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 13 : 15, color: GREEN, lineHeight: 1.3, marginBottom: 4 }}>
                        {book.title}
                      </div>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: isMobile ? 13 : 14, color: CORAL }}>
                        ${book.price.toFixed(2)} CAD
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {filtered.length < 4 && (
              <p style={{ textAlign: 'center', fontFamily: 'Nunito, sans-serif', fontSize: 14, color: MUTED, fontWeight: 600, marginTop: 32 }}>
                More stories coming soon
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function ReviewsSection({ isMobile }: { isMobile: boolean }) {
  const [idx, setIdx] = useState(0)
  const CARD = 300
  const GAP = 20
  const VISIBLE = 3
  const max = Math.max(0, REVIEWS.length - VISIBLE)

  const cardInner = (r: typeof REVIEWS[0]) => (
    <>
      <ReviewPhoto photo={r.photo} avatar={r.avatar} name={r.name} />
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
          {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 12, color: GOLD }}>★</span>)}
        </div>
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, color: GREEN, marginBottom: 6 }}>{r.name}</div>
        <p style={{
          fontFamily: 'Nunito, sans-serif', fontSize: 13, color: BODY, lineHeight: 1.65,
          margin: 0, fontStyle: 'italic',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }}>"{r.text}"</p>
      </div>
    </>
  )

  return (
    <section style={{ background: '#fff', padding: isMobile ? '48px 0' : '72px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header — arrows shown on desktop only */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: 40, gap: 16, flexWrap: 'wrap',
          padding: isMobile ? '0 20px' : '0',
        }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 36, color: GREEN, margin: '0 0 8px' }}>
              Loved by Families ✦
            </h2>
            <div style={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
              {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 18, color: GOLD }}>★</span>)}
              <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15, color: GREEN, marginLeft: 8 }}>4.9/5</span>
              <span style={{ fontSize: 13, color: MUTED, marginLeft: 4 }}>from 500+ reviews</span>
            </div>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', gap: 10, alignSelf: 'center' }}>
              {([
                { key: 'prev', label: '←', onClick: () => setIdx(i => Math.max(0, i - 1)), disabled: idx === 0 },
                { key: 'next', label: '→', onClick: () => setIdx(i => Math.min(max, i + 1)), disabled: idx >= max },
              ] as const).map(btn => (
                <button key={btn.key} onClick={btn.onClick} disabled={btn.disabled} style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: `1.5px solid ${btn.disabled ? '#DDD' : GREEN}`,
                  background: btn.disabled ? '#F5F5F5' : '#fff',
                  color: btn.disabled ? MUTED : GREEN,
                  cursor: btn.disabled ? 'default' : 'pointer',
                  fontSize: 18, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s', flexShrink: 0,
                }}>{btn.label}</button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile: native horizontal scroll */}
        {isMobile ? (
          <div style={{
            display: 'flex', gap: GAP,
            overflowX: 'auto', scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch' as any,
            paddingLeft: 20, paddingRight: 20, paddingBottom: 12,
            marginBottom: 48,
          }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{
                flex: '0 0 260px', scrollSnapAlign: 'start',
                borderRadius: 20, overflow: 'hidden',
                background: CREAM, border: '1.5px solid #EDE8DF',
                boxShadow: '0 2px 12px rgba(45,74,62,0.07)',
              }}>
                {cardInner(r)}
              </div>
            ))}
            <div style={{ flex: '0 0 4px' }} />
          </div>
        ) : (
          /* Desktop: translateX carousel */
          <div style={{ overflow: 'hidden', marginBottom: 48 }}>
            <div style={{
              display: 'flex', gap: GAP,
              transform: `translateX(${-idx * (CARD + GAP)}px)`,
              transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}>
              {REVIEWS.map((r, i) => (
                <div key={i} style={{
                  flex: `0 0 ${CARD}px`,
                  borderRadius: 20, overflow: 'hidden',
                  background: CREAM, border: '1.5px solid #EDE8DF',
                  boxShadow: '0 2px 12px rgba(45,74,62,0.07)',
                }}>
                  {cardInner(r)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tagline */}
        <div style={{ textAlign: 'center', paddingTop: 40, borderTop: '1px solid #EDE8DF', padding: isMobile ? '40px 20px 0' : '40px 0 0' }}>
          <p style={{
            fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
            fontWeight: 700, fontSize: isMobile ? 18 : 22,
            color: GREEN, margin: 0, lineHeight: 1.4,
          }}>
            Where Your Child Becomes Part of the{' '}
            <span style={{ color: CORAL }}>Story</span>
          </p>
        </div>

      </div>
    </section>
  )
}

export default function HomePage() {
  const isMobile = useIsMobile()


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
          padding: isMobile ? '52px 20px 64px' : '0 24px',
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
              <Link href="/books" className="btn-shine" style={{
                background: GREEN, color: '#fff',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15,
                padding: '14px 30px', borderRadius: 50, textDecoration: 'none',
                display: 'inline-block', textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(45,74,62,0.25)' }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                Create Your Book ✦
              </Link>
              <Link href="#collections" style={{
                background: 'transparent', color: GREEN,
                fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15,
                padding: '14px 30px', borderRadius: 50, textDecoration: 'none',
                border: `2px solid ${GREEN}`, display: 'inline-block', textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
                onMouseOver={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = '#fff' }}
                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREEN }}>
                Explore Collections
              </Link>
            </div>
          </div>
        </div>

        {/* Ambient sparkle stars over the right/photo side */}
        {!isMobile && (
          <SparkleField
            count={16}
            color="rgba(232,184,75,0.75)"
            size={15}
            style={{ left: '45%', right: 0, top: 70, bottom: 0 }}
          />
        )}

        {/* Decorative elements over the photo (right side) */}
        {!isMobile && (
          <>
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
            { icon: '📚', stat: '1,000+', sub: 'Personalized books created' },
            { icon: '✅', stat: 'Human-checked', sub: 'Every book reviewed before it prints' },
            { icon: '📦', stat: 'Ships in 1–3', sub: 'Business days · Worldwide delivery' },
            { icon: '💝', stat: 'Love it or', sub: 'we redo it. Free reprint, no questions' },
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
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 36, color: GREEN, margin: '0 0 12px' }}>
              What are you celebrating? ✦
            </h2>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: isMobile ? 14 : 16, color: MUTED, margin: '0 0 12px' }}>
              Every book is built around one moment. Find theirs.
            </p>
            <div className="line-draw" style={{ height: 2, background: CORAL, borderRadius: 2, maxWidth: 80, margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: 12 }}>
            {MILESTONES.map((m, i) => (
              <Link key={i} href={m.href} className={`reveal delay-${i + 1}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div className="milestone-card" style={{
                  background: '#fff', borderRadius: 16, padding: '20px 8px',
                  textAlign: 'center', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(45,74,62,0.06)',
                  border: '1.5px solid #EDE8DF',
                  height: '100%', boxSizing: 'border-box',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
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
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 36, color: GREEN, margin: '0 0 12px' }}>
              How It Works ✦
            </h2>
            <div className="line-draw" style={{ height: 2, background: CORAL, borderRadius: 2, maxWidth: 80, margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 40 : 32, alignItems: 'start' }}>
            {STEPS.map((s, i) => (
              <div key={i} className={`reveal delay-${i + 1}`} style={{ textAlign: 'center' }}>
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

      {/* ── FIND YOUR STORY ──────────────────────────────── */}
      <FindYourStory isMobile={isMobile} />

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
      <ReviewsSection isMobile={isMobile} />

      {/* ── FAQ ──────────────────────────────────────────── */}
      <FAQAccordion isMobile={isMobile} />

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section style={{ background: GREEN, padding: isMobile ? '48px 20px' : '72px 24px', position: 'relative', overflow: 'hidden' }}>
        {/* ── Doodle: Open Book — bottom-right ── */}
        <svg style={{ position:'absolute', right:-10, bottom:-10, opacity:0.07, pointerEvents:'none' }} width="240" height="170" viewBox="0 0 240 170" fill="none">
          <path d="M120 150 C85 128 18 116 6 104 L6 22 C18 34 85 48 120 68" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M120 150 C155 128 222 116 234 104 L234 22 C222 34 155 48 120 68" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="120" y1="68" x2="120" y2="150" stroke="white" strokeWidth="2.5"/>
          <line x1="28" y1="55" x2="110" y2="72" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="28" y1="72" x2="110" y2="87" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="28" y1="89" x2="110" y2="102" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="130" y1="72" x2="212" y2="55" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="130" y1="87" x2="212" y2="72" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="130" y1="102" x2="212" y2="89" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>

        {/* ── Doodle: Butterfly — top-left ── */}
        <svg style={{ position:'absolute', left:32, top:18, opacity:0.08, pointerEvents:'none', transform:'rotate(-12deg)' }} width="100" height="80" viewBox="0 0 100 80" fill="none">
          <path d="M50 40 C50 22 22 4 10 16 C-2 28 16 56 50 40Z" stroke="white" strokeWidth="2" fill="none"/>
          <path d="M50 40 C50 22 78 4 90 16 C102 28 84 56 50 40Z" stroke="white" strokeWidth="2" fill="none"/>
          <path d="M50 40 C50 58 22 76 10 64 C-2 52 16 28 50 40Z" stroke="white" strokeWidth="2" fill="none"/>
          <path d="M50 40 C50 58 78 76 90 64 C102 52 84 28 50 40Z" stroke="white" strokeWidth="2" fill="none"/>
          <line x1="50" y1="32" x2="50" y2="48" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M50 32 C46 25 40 20 36 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M50 32 C54 25 60 20 64 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* ── Doodle: Castle — top-right ── */}
        <svg style={{ position:'absolute', right:60, top:-8, opacity:0.06, pointerEvents:'none' }} width="110" height="110" viewBox="0 0 110 110" fill="none">
          <rect x="15" y="55" width="80" height="50" stroke="white" strokeWidth="2" fill="none"/>
          <rect x="15" y="40" width="18" height="22" stroke="white" strokeWidth="2" fill="none"/>
          <rect x="46" y="40" width="18" height="22" stroke="white" strokeWidth="2" fill="none"/>
          <rect x="77" y="40" width="18" height="22" stroke="white" strokeWidth="2" fill="none"/>
          <line x1="15" y1="30" x2="15" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="20" y1="30" x2="20" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="25" y1="30" x2="25" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="33" y1="30" x2="33" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="46" y1="28" x2="46" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="51" y1="28" x2="51" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="56" y1="28" x2="56" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="64" y1="28" x2="64" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="77" y1="30" x2="77" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="82" y1="30" x2="82" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="87" y1="30" x2="87" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="95" y1="30" x2="95" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <rect x="42" y="75" width="26" height="30" stroke="white" strokeWidth="2" fill="none"/>
        </svg>

        {/* ── Doodle: Heart — left-center ── */}
        <svg style={{ position:'absolute', left:'8%', bottom:'25%', opacity:0.09, pointerEvents:'none', transform:'rotate(-8deg)' }} width="52" height="48" viewBox="0 0 52 48" fill="none">
          <path d="M26 44 C26 44 4 28 4 14 C4 7 9 3 16 3 C20 3 23 5 26 9 C29 5 32 3 36 3 C43 3 48 7 48 14 C48 28 26 44 26 44Z" stroke="white" strokeWidth="2" fill="none"/>
        </svg>

        {/* ── Doodle: Vine — left edge ── */}
        <svg style={{ position:'absolute', left:-8, top:'20%', opacity:0.06, pointerEvents:'none' }} width="70" height="130" viewBox="0 0 70 130" fill="none">
          <path d="M35 8 C14 22 56 45 35 65 C14 85 56 105 35 122" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M35 28 C24 23 12 26 6 19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M35 65 C50 58 63 63 68 55" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M35 100 C22 96 10 102 4 94" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>

        {/* ── Doodle: Star cluster — right-center ── */}
        <svg style={{ position:'absolute', right:'12%', top:'30%', opacity:0.08, pointerEvents:'none' }} width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 5 L33 22 L50 22 L37 33 L42 50 L30 40 L18 50 L23 33 L10 22 L27 22 Z" stroke="white" strokeWidth="1.8" fill="none"/>
          <circle cx="8" cy="12" r="3" stroke="white" strokeWidth="1.4" fill="none"/>
          <circle cx="52" cy="8" r="2" stroke="white" strokeWidth="1.4" fill="none"/>
          <circle cx="55" cy="52" r="2.5" stroke="white" strokeWidth="1.4" fill="none"/>
        </svg>

        {/* ── Doodle: Scattered sparkle characters ── */}
        <span style={{ position:'absolute', left:'25%', top:'12%', color:'white', opacity:0.12, fontSize:22, pointerEvents:'none', userSelect:'none' }}>✦</span>
        <span style={{ position:'absolute', left:'60%', top:'8%', color:'white', opacity:0.10, fontSize:15, pointerEvents:'none', userSelect:'none' }}>✧</span>
        <span style={{ position:'absolute', left:'42%', bottom:'18%', color:'white', opacity:0.10, fontSize:18, pointerEvents:'none', userSelect:'none' }}>⋆</span>
        <span style={{ position:'absolute', right:'30%', bottom:'12%', color:'white', opacity:0.09, fontSize:13, pointerEvents:'none', userSelect:'none' }}>✦</span>
        <span style={{ position:'absolute', left:'18%', top:'50%', color:'white', opacity:0.08, fontSize:16, pointerEvents:'none', userSelect:'none' }}>✧</span>
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
