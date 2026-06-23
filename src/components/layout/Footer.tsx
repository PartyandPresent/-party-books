import Image from 'next/image'
import Link from 'next/link'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const DIM   = 'rgba(255,255,255,0.45)'

export default function Footer() {
  return (
    <footer style={{ background: GREEN, color: '#fff', paddingTop: 60, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Image
                src="/Icon.png"
                alt="party & presents"
                width={52}
                height={52}
                style={{ objectFit: 'contain', background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 6 }}
              />
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 10 }}>
              party & presents
            </div>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: DIM, lineHeight: 1.7, maxWidth: 220 }}>
              Personalized storybooks that celebrate every milestone — crafted with love, treasured forever.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              {[
                { label: 'IG', href: 'https://instagram.com/partyandpresents' },
                { label: 'FB', href: 'https://facebook.com/partyandpresents' },
                { label: 'TT', href: 'https://tiktok.com/@partyandpresents' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontFamily: 'Nunito, sans-serif', fontSize: 11, fontWeight: 700,
                    textDecoration: 'none', transition: 'background 0.2s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = CORAL)}
                  onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Our Books */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Our Books</h4>
            {[
              { href: '/books/gods-promises-for-you', label: "God's Promises For You" },
              { href: '/books/before-you-were-born', label: 'Before You Were Born' },
              { href: '/books/you-are-brave', label: 'You Are Brave' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                style={{ display: 'block', color: DIM, fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = DIM)}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Browse */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Browse By</h4>
            {[
              { href: '/collections/baptism', label: 'Baptism Gifts' },
              { href: '/collections/birthday', label: 'Birthday Gifts' },
              { href: '/collections/baby-newborn', label: 'Baby & Newborn' },
              { href: '/collections/christmas', label: 'Christmas Gifts' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                style={{ display: 'block', color: DIM, fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = DIM)}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Info + Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Support</h4>
            {[
              { href: 'https://partyandpresents.com', label: 'Main Store ↗', external: true },
              { href: '/how-it-works', label: 'How It Works', external: false },
              { href: '/faq', label: 'FAQ', external: false },
              { href: '/shipping', label: 'Shipping Info', external: false },
            ].map(l => (
              l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', color: DIM, fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}
                  onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={e => (e.currentTarget.style.color = DIM)}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href}
                  style={{ display: 'block', color: DIM, fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', marginBottom: 10 }}
                  onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={e => (e.currentTarget.style.color = DIM)}>
                  {l.label}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 24 }} />

        {/* Bottom Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: DIM, margin: 0 }}>
            © 2026 party & presents. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(item => (
              <a key={item} href="#"
                style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: DIM, textDecoration: 'none' }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = DIM)}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
