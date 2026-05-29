import Image from 'next/image'
import Link from 'next/link'
import { Book } from '@/lib/books'

export default function BookCard({ book }: { book: Book }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(255,85,156,0.08)',
      border: '1px solid #FFEEF5',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
    }}
      onMouseOver={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-8px)'
        el.style.boxShadow = '0 20px 48px rgba(255,85,156,0.16)'
      }}
      onMouseOut={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 4px 24px rgba(255,85,156,0.08)'
      }}>

      {/* Cover Image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#FFEEF5' }}>
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {/* Badge */}
        {book.badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: book.badgeColor || '#FF559C',
            color: '#fff', fontFamily: 'Nunito, sans-serif',
            fontWeight: 800, fontSize: 11, padding: '4px 12px',
            borderRadius: 50, letterSpacing: '0.04em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}>
            {book.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ fontSize: 13, color: i <= Math.round(book.rating) ? '#FFD700' : '#ddd' }}>★</span>
            ))}
          </div>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: '#888888' }}>
            {book.rating} ({book.reviews} reviews)
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Playfair Display, serif', fontWeight: 700,
          fontSize: 18, color: '#2C2C2C', marginBottom: 8, lineHeight: 1.3,
        }}>
          {book.title}
        </h3>

        {/* Short desc */}
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#888888', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
          {book.shortDesc}
        </p>

        {/* Pages tag */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontFamily: 'Nunito, sans-serif', fontWeight: 700, color: '#FF559C', background: '#FFEEF5', padding: '3px 10px', borderRadius: 50 }}>
            {book.totalPages} pages
          </span>
          {book.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{ fontSize: 11, fontFamily: 'Nunito, sans-serif', fontWeight: 600, color: '#28BEEF', background: '#E6F8FE', padding: '3px 10px', borderRadius: 50, textTransform: 'capitalize' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 22, color: '#1A1A1A' }}>
              ${book.price.toFixed(2)}
            </span>
          </div>
          <Link href={`/books/${book.slug}`} style={{
            background: '#FF559C', color: '#fff',
            fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13,
            padding: '10px 20px', borderRadius: 50, textDecoration: 'none',
            transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(255,85,156,0.3)',
            whiteSpace: 'nowrap',
          }}
            onMouseOver={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
            ✨ Personalize
          </Link>
        </div>
      </div>
    </div>
  )
}