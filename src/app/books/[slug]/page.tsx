'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BOOKS, REVIEWS } from '@/lib/books'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const BEIGE = '#F5F0E8'
const CREAM = '#FAFAF5'
const BODY  = '#4A5568'
const MUTED = '#888888'
const GOLD  = '#E8B84B'

export default function BookDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const book = BOOKS.find(b => b.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const isMobile = useIsMobile()

  if (!book) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
          <h2 style={{ fontSize: 24, color: GREEN, marginBottom: 12 }}>Book not found</h2>
          <Link href="/" style={{ color: CORAL, fontWeight: 700, textDecoration: 'none' }}>← Back to home</Link>
        </div>
      </div>
    )
  }

  const allImages = [book.coverImage, ...book.previewImages]

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', background: '#fff' }}>
      <Header />

      <div style={{ paddingTop: 80 }}>

        {/* Breadcrumb */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: MUTED }}>
            <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = CORAL)}
              onMouseOut={e => (e.currentTarget.style.color = MUTED)}>Home</Link>
            <span>›</span>
            <Link href="/books" style={{ color: MUTED, textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = CORAL)}
              onMouseOut={e => (e.currentTarget.style.color = MUTED)}>All Books</Link>
            <span>›</span>
            <span style={{ color: GREEN, fontWeight: 600 }}>{book.title}</span>
          </div>
        </div>

        {/* ── HERO: Gallery + Product Info ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 16px 56px' : '0 24px 80px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 32 : 64,
            alignItems: 'start',
          }}>

            {/* LEFT: Image Gallery */}
            <div style={{ display: 'flex', gap: 12 }}>

              {/* Vertical thumbnail strip — desktop only */}
              {!isMobile && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
                  {allImages.map((src, i) => (
                    <div key={i} onClick={() => setActiveImage(i)} style={{
                      width: 64, height: 64, borderRadius: 10, overflow: 'hidden',
                      cursor: 'pointer', position: 'relative', flexShrink: 0,
                      border: `2px solid ${activeImage === i ? CORAL : '#E0DDD5'}`,
                      opacity: activeImage === i ? 1 : 0.6,
                      transition: 'all 0.2s',
                    }}>
                      <Image src={src} alt={`View ${i + 1}`} fill unoptimized style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div style={{ flex: 1 }}>
                <div style={{
                  position: 'relative', aspectRatio: '1/1',
                  borderRadius: 20, overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(45,74,62,0.15)',
                }}>
                  {book.badge && (
                    <div style={{
                      position: 'absolute', top: 16, left: 16, zIndex: 2,
                      background: CORAL, color: '#fff', fontFamily: 'Nunito, sans-serif',
                      fontWeight: 800, fontSize: 11, padding: '5px 14px',
                      borderRadius: 50, letterSpacing: '0.06em',
                    }}>{book.badge}</div>
                  )}
                  <Image
                    src={allImages[activeImage]}
                    alt={book.title}
                    fill
                    unoptimized
                    style={{
                      objectFit: 'cover',
                      objectPosition: activeImage === 0 ? 'right center' : 'center center',
                    }}
                  />
                  {allImages.length > 1 && (
                    <>
                      <button onClick={() => setActiveImage(p => Math.max(p - 1, 0))} disabled={activeImage === 0}
                        style={{
                          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                          background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: '50%',
                          width: 36, height: 36, cursor: 'pointer', fontSize: 18,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          opacity: activeImage === 0 ? 0.25 : 1,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'opacity 0.2s',
                        }}>‹</button>
                      <button onClick={() => setActiveImage(p => Math.min(p + 1, allImages.length - 1))} disabled={activeImage === allImages.length - 1}
                        style={{
                          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                          background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: '50%',
                          width: 36, height: 36, cursor: 'pointer', fontSize: 18,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          opacity: activeImage === allImages.length - 1 ? 0.25 : 1,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'opacity 0.2s',
                        }}>›</button>
                    </>
                  )}
                </div>

                {/* Mobile thumbnail strip */}
                {isMobile && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4 }}>
                    {allImages.map((src, i) => (
                      <div key={i} onClick={() => setActiveImage(i)} style={{
                        width: 54, height: 54, borderRadius: 8, overflow: 'hidden',
                        cursor: 'pointer', position: 'relative', flexShrink: 0,
                        border: `2px solid ${activeImage === i ? CORAL : '#E0DDD5'}`,
                        opacity: activeImage === i ? 1 : 0.6,
                      }}>
                        <Image src={src} alt={`View ${i + 1}`} fill unoptimized style={{ objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div>
              {/* Bestseller badge */}
              {book.badge && (
                <div style={{
                  display: 'inline-block',
                  background: '#FFF3ED', color: CORAL,
                  fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12,
                  padding: '4px 14px', borderRadius: 50, marginBottom: 16, letterSpacing: '0.05em',
                }}>{book.badge}</div>
              )}

              {/* Title */}
              <h1 style={{
                fontFamily: 'Playfair Display, serif', fontWeight: 900,
                fontSize: isMobile ? 30 : 38, color: GREEN,
                lineHeight: 1.15, marginBottom: 10, margin: '0 0 10px',
              }}>{book.title}</h1>

              {/* Subtitle */}
              <p style={{
                fontFamily: 'Nunito, sans-serif', fontSize: 15, color: BODY,
                lineHeight: 1.6, marginBottom: 16,
              }}>{book.subtitle}</p>

              {/* Stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{ fontSize: 18, color: i <= Math.round(book.rating) ? GOLD : '#ddd' }}>★</span>
                  ))}
                </div>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: MUTED, fontWeight: 600 }}>
                  {book.rating} ({book.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 34, color: GREEN }}>
                  ${book.price.toFixed(2)} CAD
                </span>
              </div>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: MUTED, marginBottom: 28 }}>
                or 4 interest-free payments of <strong style={{ color: GREEN }}>${(book.price / 4).toFixed(2)}</strong> with Afterpay
              </p>

              {/* Personalize CTA */}
              <Link href={`/personalize/${book.slug}`}
                style={{
                  display: 'block', textAlign: 'center',
                  background: CORAL, color: '#fff',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 17,
                  padding: '17px 32px', borderRadius: 50,
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(232,131,106,0.35)',
                  marginBottom: 20, transition: 'all 0.2s',
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#d4704f'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseOut={e => { e.currentTarget.style.background = CORAL; e.currentTarget.style.transform = 'translateY(0)' }}>
                Personalize Your Book →
              </Link>

              {/* Trust checkmarks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Made just for them',
                  'Ships in 3–5 business days',
                  'Free shipping on orders over $75',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <span style={{ color: '#fff', fontSize: 10, fontWeight: 900 }}>✓</span>
                    </div>
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: BODY, fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURE ICONS ── */}
        <section style={{ background: CREAM, borderTop: '1px solid #EDEAE0', borderBottom: '1px solid #EDEAE0', padding: '40px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 28 : 40 }}>
              {[
                { icon: '♥', label: 'Personalized for them', desc: 'Every detail is made just for your child.' },
                { icon: '✦', label: 'Beautiful illustrations', desc: 'Hand-illustrated with love and care.' },
                { icon: '◈', label: 'Premium quality', desc: 'Printed with care using high-quality materials.' },
                { icon: '❧', label: 'A keepsake to last', desc: "A story they'll treasure today and forever." },
              ].map(f => (
                <div key={f.label} style={{ textAlign: 'center', padding: '0 8px' }}>
                  <div style={{ fontSize: 28, color: CORAL, marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, color: GREEN, marginBottom: 6 }}>{f.label}</div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT THIS BOOK ── */}
        <section style={{ padding: isMobile ? '56px 20px' : '88px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>

            {/* Text */}
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 26 : 32, color: GREEN, marginBottom: 16 }}>
                About This Book <span style={{ color: CORAL }}>+</span>
              </h2>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: BODY, lineHeight: 1.8, marginBottom: 24 }}>
                {book.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  "Personalized with your child's name and details",
                  'Featuring uplifting Bible promises',
                  'Encourages faith, hope, and a sense of belonging',
                  'Perfect gift for birthdays, baptisms, and special moments',
                ].map(point => (
                  <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <span style={{ color: CORAL, fontSize: 16, marginTop: 1, flexShrink: 0 }}>✦</span>
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: BODY, lineHeight: 1.6 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cover image */}
            <div style={{
              position: 'relative', aspectRatio: '1/1',
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(45,74,62,0.14)',
              flexShrink: 0, width: isMobile ? '100%' : 420,
            }}>
              <Image src={book.coverImage} alt={book.title} fill unoptimized style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section style={{ background: BEIGE, padding: isMobile ? '56px 20px' : '88px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 40 : 64, alignItems: 'start' }}>

              {/* Rating summary */}
              <div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 24, color: GREEN, marginBottom: 16 }}>
                  Loved by Families <span style={{ color: CORAL }}>+</span>
                </h2>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 56, fontWeight: 900, color: GOLD, lineHeight: 1 }}>
                  {book.rating}
                </div>
                <div style={{ display: 'flex', gap: 3, margin: '6px 0 8px' }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 22, color: GOLD }}>★</span>)}
                </div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: MUTED }}>
                  Based on {book.reviews} reviews
                </div>
              </div>

              {/* Review cards */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
                {REVIEWS.slice(0, 3).map((review, i) => (
                  <div key={i} style={{
                    background: '#fff', borderRadius: 16, padding: 20,
                    boxShadow: '0 4px 20px rgba(45,74,62,0.07)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: BEIGE, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: GREEN,
                      }}>{review.avatar}</div>
                      <div>
                        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: GREEN }}>{review.name}</div>
                        <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11, color: MUTED }}>Verified Buyer</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                      {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 14, color: GOLD }}>★</span>)}
                    </div>
                    <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: BODY, lineHeight: 1.7, margin: 0 }}>
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── YOU MAY ALSO LOVE ── */}
        <section style={{ padding: isMobile ? '56px 20px' : '88px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 26 : 32, color: GREEN, textAlign: 'center', marginBottom: 8 }}>
              You May Also Love <span style={{ color: CORAL }}>+</span>
            </h2>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: MUTED, textAlign: 'center', marginBottom: 48 }}>
              Every book is fully personalized with your child's face and name
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 20 }}>
              {BOOKS.filter(b => b.slug !== slug).slice(0, 4).map(b => (
                <Link key={b.slug} href={`/books/${b.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    borderRadius: 16, overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(45,74,62,0.08)',
                    transition: 'all 0.25s',
                  }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(45,74,62,0.16)' }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,74,62,0.08)' }}>
                    <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                      <Image src={b.coverImage} alt={b.title} fill style={{ objectFit: 'cover', objectPosition: 'right center' }} />
                    </div>
                    <div style={{ padding: '12px 16px', background: '#fff' }}>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13, color: GREEN, marginBottom: 4, lineHeight: 1.3 }}>{b.title}</div>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: CORAL, fontWeight: 700 }}>${b.price.toFixed(2)} CAD</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA BANNER ── */}
        <section style={{ background: GREEN, padding: isMobile ? '56px 20px' : '72px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: 32, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 28 : 36, color: '#fff', marginBottom: 12 }}>
                Created with love, cherished forever.
              </h2>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 480 }}>
                Our personalized books are more than just stories — they're memories in the making.
              </p>
            </div>
            <Link href={`/personalize/${book.slug}`}
              style={{
                display: 'inline-block', whiteSpace: 'nowrap',
                background: CORAL, color: '#fff',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16,
                padding: '16px 36px', borderRadius: 50, textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(232,131,106,0.4)', transition: 'all 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#d4704f'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseOut={e => { e.currentTarget.style.background = CORAL; e.currentTarget.style.transform = 'translateY(0)' }}>
              Create Their Book →
            </Link>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
