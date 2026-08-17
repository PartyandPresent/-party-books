'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Book } from '@/lib/books'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const CREAM = '#FAFAF5'
const BEIGE = '#F5F0E8'
const BODY  = '#4A5568'
const MUTED = '#888888'
const GOLD  = '#E8B84B'

type AgeFilter = 'all' | 'baby' | 'toddler' | 'child'
type SortOrder = 'popular' | 'price-asc' | 'price-desc'

type Props = {
  title: string
  subtitle: string
  description: string
  icon: string
  books: Book[]
  breadcrumbs: { label: string; href: string }[]
  giftHeading: string
  giftPoints: string[]
  relatedLinks: { href: string; label: string }[]
}

const AGE_LABELS: Record<AgeFilter, string> = {
  all: 'All Ages',
  baby: 'Baby 0–2',
  toddler: 'Toddler 2–5',
  child: 'Child 5+',
}

const GIFT_ICONS = ['💚', '✨', '📖']

export default function CollectionPageLayout({
  title, subtitle, description, icon, books,
  breadcrumbs, giftHeading, giftPoints, relatedLinks,
}: Props) {
  const isMobile = useIsMobile()
  const [sort, setSort]           = useState<SortOrder>('popular')
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('all')

  const filtered = useMemo(() => {
    let result = [...books]
    if (ageFilter !== 'all') result = result.filter(b => b.recipient.includes(ageFilter))
    if (sort === 'popular')    result.sort((a, b) => b.reviews - a.reviews)
    if (sort === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    return result
  }, [books, sort, ageFilter])

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* ── Hero ── */}
      <section style={{ background: GREEN, paddingTop: 70 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px 48px' : '56px 24px 64px' }}>

          {/* Breadcrumbs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i > 0 && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>›</span>}
                <Link href={crumb.href} style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Nunito, sans-serif', fontSize: 13, textDecoration: 'none' }}>
                  {crumb.label}
                </Link>
              </span>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600 }}>{title}</span>
          </nav>

          <div style={{ fontSize: isMobile ? 44 : 60, marginBottom: 16, lineHeight: 1 }}>{icon}</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 32 : 52, color: '#fff', margin: '0 0 12px', lineHeight: 1.1 }}>
            {title}
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 19, color: 'rgba(255,255,255,0.8)', margin: '0 0 10px', fontWeight: 700 }}>
            {subtitle}
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0, maxWidth: 560, lineHeight: 1.7 }}>
            {description}
          </p>
        </div>
      </section>

      {/* ── Sort + Filter bar ── */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #EDE8DF',
        position: 'sticky', top: 70, zIndex: 20,
        boxShadow: '0 2px 8px rgba(45,74,62,0.06)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: isMobile ? '12px 20px' : '14px 24px',
          display: 'flex', flexWrap: 'wrap', gap: 12,
          alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Age filter chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: MUTED, fontWeight: 700, marginRight: 4 }}>Age:</span>
            {(['all', 'baby', 'toddler', 'child'] as AgeFilter[]).map(age => (
              <button key={age} onClick={() => setAgeFilter(age)} style={{
                background: ageFilter === age ? GREEN : 'transparent',
                color: ageFilter === age ? '#fff' : BODY,
                border: `1.5px solid ${ageFilter === age ? GREEN : '#D4E0DC'}`,
                borderRadius: 50, padding: '5px 14px', fontSize: 13,
                fontWeight: 700, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                transition: 'all 0.15s',
              }}>
                {AGE_LABELS[age]}
              </button>
            ))}
          </div>

          {/* Sort + result count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: MUTED, whiteSpace: 'nowrap' }}>
              {filtered.length} book{filtered.length !== 1 ? 's' : ''}
            </span>
            <select value={sort} onChange={e => setSort(e.target.value as SortOrder)} style={{
              border: '1.5px solid #D4E0DC', borderRadius: 50, padding: '6px 16px',
              fontSize: 13, fontWeight: 700, color: BODY, fontFamily: 'Nunito, sans-serif',
              background: '#fff', cursor: 'pointer', outline: 'none',
            }}>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Book Grid ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px 56px' : '56px 24px 72px' }}>
        {books.length === 0 ? (
          /* Collection is genuinely empty — Coming Soon state */
          <div style={{ textAlign: 'center', padding: isMobile ? '64px 0' : '96px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>✨</div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif', fontWeight: 900,
              fontSize: isMobile ? 26 : 34, color: GREEN, margin: '0 0 12px',
            }}>
              New books coming soon
            </h2>
            <p style={{ fontSize: 15, color: BODY, margin: '0 auto 32px', maxWidth: 440, lineHeight: 1.7 }}>
              We're working on something beautiful for this collection. Check back soon, or browse all our books in the meantime.
            </p>
            <Link href="/collections" style={{
              background: CORAL, color: '#fff',
              fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15,
              padding: '13px 32px', borderRadius: 50, textDecoration: 'none',
              display: 'inline-block',
            }}>
              Browse All Collections →
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          /* Books exist but none match the current age filter */
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18, fontWeight: 800, color: GREEN, margin: '0 0 8px', fontFamily: 'Playfair Display, serif' }}>
              No books match this filter
            </p>
            <p style={{ fontSize: 14, color: MUTED, margin: '0 0 24px' }}>
              Try a different age group to see all available books.
            </p>
            <button onClick={() => setAgeFilter('all')} style={{
              background: CORAL, color: '#fff', border: 'none',
              borderRadius: 50, padding: '12px 28px', fontSize: 14,
              fontWeight: 800, cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
            }}>
              Show All Ages
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? 16 : 28,
          }}>
            {filtered.map(book => (
              <Link key={book.slug} href={`/books/${book.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: '#fff', borderRadius: 18, overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(45,74,62,0.08)', transition: 'all 0.25s',
                  }}
                  onMouseOver={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(-6px)'
                    el.style.boxShadow = '0 16px 48px rgba(45,74,62,0.16)'
                  }}
                  onMouseOut={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = '0 2px 16px rgba(45,74,62,0.08)'
                  }}
                >
                  {/* Square cover image */}
                  <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                    <Image
                      src={book.cardImage ?? book.coverImage}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    {book.badge && (
                      <div style={{
                        position: 'absolute', top: 12, left: 12,
                        background: CORAL, color: '#fff',
                        fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800,
                        padding: '4px 12px', borderRadius: 50,
                      }}>
                        {book.badge}
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div style={{ padding: isMobile ? '14px 14px 18px' : '18px 20px 22px' }}>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif', fontWeight: 700,
                      fontSize: isMobile ? 14 : 17, color: GREEN,
                      margin: '0 0 6px', lineHeight: 1.3,
                    }}>
                      {book.title}
                    </h3>
                    <p style={{ fontSize: 12, color: BODY, margin: '0 0 12px', lineHeight: 1.55 }}>
                      {book.shortDesc}
                    </p>

                    {/* Stars */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                      <span style={{ color: GOLD, fontSize: 13, letterSpacing: 1 }}>
                        {'★'.repeat(Math.round(book.rating))}
                      </span>
                      <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>
                        {book.rating} ({book.reviews})
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 18, color: GREEN }}>
                        ${book.price.toFixed(2)}
                      </span>
                      <span style={{
                        background: CORAL, color: '#fff',
                        fontFamily: 'Nunito, sans-serif', fontWeight: 700,
                        fontSize: isMobile ? 11 : 13, padding: isMobile ? '6px 12px' : '8px 16px',
                        borderRadius: 50,
                      }}>
                        Personalise →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Gift Guide ── */}
      <section style={{ background: BEIGE, padding: isMobile ? '48px 20px' : '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif', fontWeight: 900,
            fontSize: isMobile ? 24 : 34, color: GREEN, margin: '0 0 40px',
          }}>
            {giftHeading}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
            {giftPoints.map((point, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 18, padding: '28px 24px',
                boxShadow: '0 2px 12px rgba(45,74,62,0.07)', textAlign: 'left',
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{GIFT_ICONS[i]}</div>
                <p style={{ fontSize: 14, color: BODY, margin: 0, lineHeight: 1.75 }}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Collections ── */}
      {relatedLinks.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '40px 20px' : '56px 24px' }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif', fontWeight: 700,
            fontSize: isMobile ? 20 : 26, color: GREEN, margin: '0 0 20px',
          }}>
            You might also love
          </h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {relatedLinks.map((l, i) => (
              <Link key={i} href={l.href}
                style={{
                  color: GREEN, border: `1.5px solid #C8D8D2`,
                  borderRadius: 50, padding: '9px 22px',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 700,
                  fontSize: 14, textDecoration: 'none', transition: 'all 0.15s',
                  display: 'inline-block',
                }}
                onMouseOver={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = '#fff' }}
                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREEN }}
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section style={{ background: GREEN, padding: isMobile ? '56px 20px' : '80px 24px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 11,
          color: 'rgba(255,255,255,0.45)', letterSpacing: 3,
          textTransform: 'uppercase', margin: '0 0 14px',
        }}>
          Ready to Create?
        </p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif', fontWeight: 900,
          fontSize: isMobile ? 30 : 42, color: '#fff', margin: '0 0 16px', lineHeight: 1.15,
        }}>
          A book that's<br /><span style={{ color: CORAL }}>truly theirs.</span>
        </h2>
        <p style={{
          fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 auto 36px',
          maxWidth: 460, lineHeight: 1.7,
        }}>
          Upload their photo, add their name, and let us create something they'll treasure forever.
        </p>
        <Link href="/books" style={{
          background: CORAL, color: '#fff',
          fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16,
          padding: '16px 40px', borderRadius: 50, textDecoration: 'none',
          display: 'inline-block', boxShadow: '0 6px 28px rgba(232,131,106,0.45)',
        }}>
          Create Their Book →
        </Link>
      </section>

      <Footer />
    </div>
  )
}
