'use client'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BOOKS } from '@/lib/books'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const CREAM = '#FAFAF5'
const BEIGE = '#F5F0E8'
const BODY  = '#4A5568'
const GOLD  = '#E8B84B'
const MUTED = '#888888'

const COLLECTIONS = [
  { href: '/collections/by-occasions', icon: '🎁', label: 'By Occasion', desc: 'Browse by birthday, baptism, Christmas and more' },
  { href: '/collections/by-recipients', icon: '👶', label: 'By Recipient', desc: 'Shop for babies, toddlers and children' },
  { href: '/collections/baptism', icon: '✝️', label: 'Baptism Gifts', desc: 'Sacred keepsakes for a meaningful day' },
  { href: '/collections/birthday', icon: '🎂', label: 'Birthday Gifts', desc: 'Make their big day unforgettable' },
  { href: '/collections/baby-newborn', icon: '🐣', label: 'Baby & Newborn', desc: 'The sweetest welcome for a new arrival' },
  { href: '/collections/christmas', icon: '🎄', label: 'Christmas Gifts', desc: 'A gift they\'ll keep long after the tree comes down' },
  { href: '/milestones/easter', icon: '🐰', label: 'Easter Gifts', desc: 'More meaningful than a chocolate egg' },
]

const MILESTONES = [
  { href: '/milestones/birthday', icon: '🎂', label: 'Birthday Books' },
  { href: '/milestones/baptism', icon: '✝️', label: 'Baptism & Christening' },
  { href: '/milestones/new-baby', icon: '🐣', label: 'New Baby' },
  { href: '/milestones/christmas', icon: '🎄', label: 'Christmas Magic' },
  { href: '/milestones/easter', icon: '🐰', label: 'Easter Gifts' },
  { href: '/milestones/just-because', icon: '💝', label: 'Just Because' },
]

export default function CollectionsPage() {
  const isMobile = useIsMobile()

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: GREEN, paddingTop: 70 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '48px 20px 56px' : '64px 24px 72px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 3, textTransform: 'uppercase', margin: '0 0 14px' }}>Our Books</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 34 : 56, color: '#fff', margin: '0 0 16px', lineHeight: 1.1 }}>
            All Collections
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.65)', margin: '0 auto', maxWidth: 520, lineHeight: 1.7 }}>
            Personalised storybooks for every milestone — crafted with love, treasured forever.
          </p>
        </div>
      </section>

      {/* Collection category cards */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '48px 20px' : '72px 24px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 24 : 32, color: GREEN, margin: '0 0 32px' }}>
          Browse Collections
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 14 : 20 }}>
          {COLLECTIONS.map((c, i) => (
            <Link key={i} href={c.href} style={{ textDecoration: 'none' }}>
              <div
                style={{ background: '#fff', borderRadius: 18, padding: '24px 20px', boxShadow: '0 2px 12px rgba(45,74,62,0.07)', transition: 'all 0.2s', height: '100%' }}
                onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 36px rgba(45,74,62,0.13)' }}
                onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 12px rgba(45,74,62,0.07)' }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: GREEN, margin: '0 0 8px' }}>{c.label}</h3>
                <p style={{ fontSize: 13, color: BODY, margin: '0 0 16px', lineHeight: 1.6 }}>{c.desc}</p>
                <span style={{ color: CORAL, fontWeight: 800, fontSize: 13 }}>Shop now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Milestone shortcuts */}
      <section style={{ background: BEIGE, padding: isMobile ? '48px 20px' : '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 24 : 32, color: GREEN, margin: '0 0 28px' }}>
            Shop by Milestone ✦
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: 12 }}>
            {MILESTONES.map((m, i) => (
              <Link key={i} href={m.href} style={{ textDecoration: 'none' }}>
                <div
                  style={{ background: '#fff', borderRadius: 16, padding: '20px 12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(45,74,62,0.06)', transition: 'all 0.2s' }}
                  onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = GREEN; el.style.transform = 'translateY(-3px)' }}
                  onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = '#fff'; el.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: GREEN, margin: 0, lineHeight: 1.4 }}>{m.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured books */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '48px 20px 64px' : '72px 24px 80px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: isMobile ? 24 : 32, color: GREEN, margin: '0 0 32px' }}>
          Featured Books
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 28 }}>
          {BOOKS.filter(b => b.featured).map(book => (
            <Link key={book.slug} href={`/books/${book.slug}`} style={{ textDecoration: 'none' }}>
              <div
                style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 16px rgba(45,74,62,0.08)', transition: 'all 0.25s' }}
                onMouseOver={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 16px 48px rgba(45,74,62,0.16)' }}
                onMouseOut={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 2px 16px rgba(45,74,62,0.08)' }}
              >
                <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                  <Image src={book.coverImage} alt={book.title} fill sizes="(max-width: 768px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  {book.badge && (
                    <div style={{ position: 'absolute', top: 12, left: 12, background: CORAL, color: '#fff', fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 50 }}>
                      {book.badge}
                    </div>
                  )}
                </div>
                <div style={{ padding: isMobile ? '14px 14px 18px' : '18px 20px 22px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: isMobile ? 14 : 17, color: GREEN, margin: '0 0 6px' }}>{book.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                    <span style={{ color: GOLD, fontSize: 13 }}>{'★'.repeat(Math.round(book.rating))}</span>
                    <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>{book.rating} ({book.reviews})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 18, color: GREEN }}>${book.price.toFixed(2)}</span>
                    <span style={{ background: CORAL, color: '#fff', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: isMobile ? 11 : 13, padding: isMobile ? '6px 12px' : '8px 16px', borderRadius: 50 }}>Personalise →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
