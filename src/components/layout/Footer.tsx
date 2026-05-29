import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', color: '#fff', paddingTop: 60, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Image
                src="/Icon.png"
                alt="party & presents"
                width={60}
                height={60}
                style={{
                  objectFit: 'contain',
                  background: '#fff',
                  borderRadius: 12,
                  padding: 6,
                }}
              />
            </div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 10 }}>
              party & presents
            </div>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 14, color: '#888888', lineHeight: 1.7, maxWidth: 240 }}>
              Books as unique as the child you love. Personalized storybooks crafted with love.
            </p>
          </div>

          {/* Books */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: '#FF559C', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Our Books</h4>
            {[
              { href: '/books/gods-promises-for-you', label: "God's Promises For You" },
              { href: '/books/before-you-were-born', label: 'Before You Were Born' },
              { href: '/books/you-are-brave', label: 'You Are Brave' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                style={{ display: 'block', color: '#888888', fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = '#888888')}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Browse */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: '#FF559C', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Browse By</h4>
            {[
              { href: '/books?filter=baptism', label: 'Baptism Gifts' },
              { href: '/books?filter=birthday', label: 'Birthday Gifts' },
              { href: '/books?filter=baby', label: 'Baby & Newborn' },
              { href: '/books?filter=christmas', label: 'Christmas Gifts' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                style={{ display: 'block', color: '#888888', fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = '#888888')}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: '#FF559C', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Info</h4>
            {[
              { href: 'https://partyandpresents.com', label: 'Main Store ↗', external: true },
              { href: '/how-it-works', label: 'How It Works', external: false },
              { href: '/faq', label: 'FAQ', external: false },
              { href: '/shipping', label: 'Shipping Info', external: false },
            ].map(l => (
              l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', color: '#888888', fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={e => (e.currentTarget.style.color = '#888888')}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href}
                  style={{ display: 'block', color: '#888888', fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={e => (e.currentTarget.style.color = '#888888')}>
                  {l.label}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#2C2C2C', marginBottom: 24 }} />

        {/* Bottom Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#555555' }}>
            © 2026 party & presents. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(item => (
              <a key={item} href="#"
                style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#555555', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#FF559C')}
                onMouseOut={e => (e.currentTarget.style.color = '#555555')}>
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}