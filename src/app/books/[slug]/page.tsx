'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { BOOKS } from '@/lib/books'

export default function BookDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const book = BOOKS.find(b => b.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'about' | 'pages' | 'shipping'>('about')

  if (!book) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
          <h2 style={{ fontSize: 24, color: '#2C2C2C', marginBottom: 12 }}>Book not found</h2>
          <Link href="/books" style={{ color: '#FF559C', fontWeight: 700, textDecoration: 'none' }}>← Back to all books</Link>
        </div>
      </div>
    )
  }

  const allImages = [book.coverImage, ...book.previewImages]

  return (
    <div style={{ fontFamily: 'Nunito, sans-serif', background: '#fff' }}>
      <Header />

      <div style={{ paddingTop: 90 }}>

        {/* Breadcrumb */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888888' }}>
            <Link href="/" style={{ color: '#888888', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = '#FF559C')}
              onMouseOut={e => (e.currentTarget.style.color = '#888888')}>
              Home
            </Link>
            <span>›</span>
            <Link href="/books" style={{ color: '#888888', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = '#FF559C')}
              onMouseOut={e => (e.currentTarget.style.color = '#888888')}>
              All Books
            </Link>
            <span>›</span>
            <span style={{ color: '#FF559C', fontWeight: 600 }}>{book.title}</span>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>

          {/* LEFT — Image Gallery */}
          <div>
            {/* Main Image */}
            <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 16, position: 'relative', aspectRatio: '16/9', boxShadow: '0 20px 60px rgba(255,85,156,0.15)', border: '1px solid #FFEEF5' }}>
              <Image
                src={allImages[activeImage]}
                alt={book.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              {book.badge && (
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: book.badgeColor || '#FF559C',
                  color: '#fff', fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800, fontSize: 12, padding: '5px 14px',
                  borderRadius: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}>
                  {book.badge}
                </div>
              )}
              {/* Prev/Next arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage(p => Math.max(p - 1, 0))}
                    disabled={activeImage === 0}
                    style={{
                      position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                      width: 36, height: 36, cursor: 'pointer', fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: activeImage === 0 ? 0.3 : 1,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}>‹</button>
                  <button
                    onClick={() => setActiveImage(p => Math.min(p + 1, allImages.length - 1))}
                    disabled={activeImage === allImages.length - 1}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                      width: 36, height: 36, cursor: 'pointer', fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: activeImage === allImages.length - 1 ? 0.3 : 1,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}>›</button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {allImages.map((src, i) => (
                <div key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: 72, height: 44, borderRadius: 10, overflow: 'hidden',
                    cursor: 'pointer', position: 'relative',
                    border: `2px solid ${activeImage === i ? '#FF559C' : '#FFEEF5'}`,
                    transition: 'all 0.2s',
                    opacity: activeImage === i ? 1 : 0.7,
                  }}>
                  <Image src={src} alt={`Page ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Page count indicator */}
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#FFEEF5', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📖</span>
              <div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, color: '#FF559C' }}>
                  {book.totalPages} fully personalized pages
                </div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#888888' }}>
                  Every page features your child's face, name, and story
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Book Info */}
          <div>
            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ fontSize: 16, color: i <= Math.round(book.rating) ? '#FFD700' : '#ddd' }}>★</span>
                ))}
              </div>
              <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#888888', fontWeight: 600 }}>
                {book.rating} ({book.reviews} reviews)
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 40px)', color: '#2C2C2C', marginBottom: 8, lineHeight: 1.2 }}>
              {book.title}
            </h1>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 16, color: '#FF559C', fontWeight: 600, marginBottom: 20 }}>
              {book.subtitle}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
              {book.occasion.slice(0, 4).map(o => (
                <span key={o} style={{ fontSize: 12, fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#28BEEF', background: '#E6F8FE', padding: '4px 12px', borderRadius: 50, textTransform: 'capitalize' }}>
                  {o.replace('-', ' ')}
                </span>
              ))}
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28, padding: '20px 24px', background: '#FAFAFA', borderRadius: 16, border: '1px solid #FFEEF5' }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 42, color: '#1A1A1A' }}>
                ${book.price.toFixed(2)}
              </span>
              <div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#888888' }}>per book</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#28BEEF', fontWeight: 600 }}>+ shipping calculated at checkout</div>
              </div>
            </div>

            {/* MAIN CTA */}
            <Link href={`/personalize/${book.slug}`} style={{
              display: 'block', textAlign: 'center',
              background: 'linear-gradient(135deg, #FF559C, #ff3d8a)',
              color: '#fff', fontFamily: 'Nunito, sans-serif',
              fontWeight: 800, fontSize: 18,
              padding: '18px 32px', borderRadius: 50,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(255,85,156,0.35)',
              transition: 'all 0.2s', marginBottom: 16,
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,85,156,0.45)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,85,156,0.35)' }}>
              ✨ Personalize This Book
            </Link>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
              {[
                { icon: '🎨', text: 'Pixar-quality art' },
                { icon: '📦', text: 'Ships in 5–7 days' },
                { icon: '💝', text: '100% satisfaction' },
                { icon: '🔒', text: 'Secure checkout' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#FAFAFA', borderRadius: 10, border: '1px solid #FFEEF5' }}>
                  <span style={{ fontSize: 16 }}>{b.icon}</span>
                  <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#555555', fontWeight: 600 }}>{b.text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: '2px solid #FFEEF5', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {[
                  { id: 'about', label: 'About' },
                  { id: 'pages', label: "What's Inside" },
                  { id: 'shipping', label: 'Shipping' },
                ].map(tab => (
                  <button key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
                      padding: '10px 20px', background: 'none', border: 'none',
                      cursor: 'pointer', color: activeTab === tab.id ? '#FF559C' : '#888888',
                      borderBottom: `3px solid ${activeTab === tab.id ? '#FF559C' : 'transparent'}`,
                      marginBottom: -2, transition: 'all 0.2s',
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: '#555555', lineHeight: 1.8 }}>
                {book.description}
              </div>
            )}

            {activeTab === 'pages' && (
              <div>
                {[
                  { page: 'Cover', desc: "Full personalized cover with your child's name in beautiful typography" },
                  { page: 'Dedication', desc: 'A heartfelt dedication page with your personal message' },
                  { page: 'Pages 3–16', desc: "17 illustrated scenes featuring your child's AI-generated likeness" },
                  { page: 'Final Page', desc: 'A closing blessing and keepsake message' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FFEEF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 12, fontFamily: 'Nunito, sans-serif', fontWeight: 800, color: '#FF559C' }}>{i + 1}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: '#2C2C2C', marginBottom: 2 }}>{item.page}</div>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#888888', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: '#555555', lineHeight: 1.8 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, color: '#2C2C2C', marginBottom: 4 }}>⏱ Processing Time</div>
                  <p>1–3 business days after we receive your photo and personalization details.</p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, color: '#2C2C2C', marginBottom: 4 }}>🚚 Standard Shipping</div>
                  <p>3–7 business days depending on your location.</p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, color: '#2C2C2C', marginBottom: 4 }}>📦 Packaging</div>
                  <p>Carefully packed to prevent bending or damage — arrives in perfect condition, ready to gift.</p>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#2C2C2C', marginBottom: 4 }}>💝 Satisfaction Guarantee</div>
                  <p>Not happy with the result? We'll regenerate it or refund you — no questions asked.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Books Section */}
        <div style={{ background: '#FAFAFA', padding: '60px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900, fontSize: 32, color: '#2C2C2C', marginBottom: 8, textAlign: 'center' }}>
              You might also love
            </h2>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 15, color: '#888888', textAlign: 'center', marginBottom: 40 }}>
              Every book is fully personalized with your child's face and name
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {BOOKS.filter(b => b.slug !== slug).map(b => (
                <div key={b.slug} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #FFEEF5', boxShadow: '0 4px 16px rgba(255,85,156,0.06)', transition: 'all 0.3s' }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,85,156,0.12)' }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,85,156,0.06)' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                    <Image src={b.coverImage} alt={b.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18, color: '#2C2C2C', marginBottom: 8 }}>{b.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 20, color: '#1A1A1A' }}>${b.price.toFixed(2)}</span>
                      <Link href={`/books/${b.slug}`} style={{
                        background: '#FF559C', color: '#fff',
                        fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13,
                        padding: '8px 18px', borderRadius: 50, textDecoration: 'none',
                      }}>
                        View Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}