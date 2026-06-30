import Image from 'next/image'
import Link from 'next/link'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const DIM   = 'rgba(255,255,255,0.45)'
const DOODLE = 'rgba(255,255,255,0.07)'

// ── Inline SVG doodles ───────────────────────────────────────────────
const Butterfly = ({ size = 160 }: { size?: number }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Upper wings */}
    <path d="M80 60 C60 30, 20 10, 8 28 C-4 46, 28 68, 80 60Z" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M80 60 C100 30, 140 10, 152 28 C164 46, 132 68, 80 60Z" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    {/* Lower wings */}
    <path d="M80 60 C55 72, 30 85, 34 100 C38 115, 65 108, 80 60Z" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M80 60 C105 72, 130 85, 126 100 C122 115, 95 108, 80 60Z" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* Wing detail curves */}
    <path d="M80 60 C55 45, 30 40, 22 50" stroke="white" strokeWidth="0.7" fill="none" opacity="0.6"/>
    <path d="M80 60 C105 45, 130 40, 138 50" stroke="white" strokeWidth="0.7" fill="none" opacity="0.6"/>
    {/* Body */}
    <ellipse cx="80" cy="62" rx="3" ry="18" stroke="white" strokeWidth="1.2" fill="none"/>
    {/* Antennae */}
    <path d="M78 44 C72 30, 68 22, 64 16" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M82 44 C88 30, 92 22, 96 16" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <circle cx="64" cy="15" r="2.5" stroke="white" strokeWidth="1" fill="none"/>
    <circle cx="96" cy="15" r="2.5" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
)

const Castle = ({ size = 140 }: { size?: number }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 140 168" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main wall battlements */}
    <rect x="4"  y="30" width="16" height="22" rx="1" stroke="white" strokeWidth="1.3" fill="none"/>
    <rect x="26" y="30" width="16" height="22" rx="1" stroke="white" strokeWidth="1.3" fill="none"/>
    <rect x="98" y="30" width="16" height="22" rx="1" stroke="white" strokeWidth="1.3" fill="none"/>
    <rect x="120" y="30" width="16" height="22" rx="1" stroke="white" strokeWidth="1.3" fill="none"/>
    {/* Main walls */}
    <path d="M4 52 L4 120 L136 120 L136 52" stroke="white" strokeWidth="1.3" fill="none"/>
    {/* Center tower battlements */}
    <rect x="46" y="4"  width="16" height="22" rx="1" stroke="white" strokeWidth="1.3" fill="none"/>
    <rect x="70" y="4"  width="16" height="22" rx="1" stroke="white" strokeWidth="1.3" fill="none"/>
    {/* Center tower walls */}
    <rect x="40" y="26" width="60" height="94" rx="1" stroke="white" strokeWidth="1.3" fill="none"/>
    {/* Tower flag */}
    <line x1="70" y1="4" x2="70" y2="-14" stroke="white" strokeWidth="1.1"/>
    <path d="M70 -14 L88 -7 L70 0Z" stroke="white" strokeWidth="1" fill="none"/>
    {/* Arched door */}
    <path d="M58 120 L58 95 Q70 82 82 95 L82 120" stroke="white" strokeWidth="1.3" fill="none"/>
    {/* Tower windows */}
    <path d="M56 55 L56 44 Q63 38 70 44 L70 55Z" stroke="white" strokeWidth="1" fill="none"/>
    <path d="M70 55 L70 44 Q77 38 84 44 L84 55Z" stroke="white" strokeWidth="1" fill="none"/>
    {/* Side windows */}
    <rect x="14"  y="72" width="12" height="16" rx="2" stroke="white" strokeWidth="1" fill="none"/>
    <rect x="114" y="72" width="12" height="16" rx="2" stroke="white" strokeWidth="1" fill="none"/>
    {/* Ground line */}
    <line x1="0" y1="120" x2="140" y2="120" stroke="white" strokeWidth="1.3"/>
    {/* Steps */}
    <path d="M55 120 L55 128 L85 128 L85 120" stroke="white" strokeWidth="1" fill="none"/>
    <path d="M50 128 L50 136 L90 136 L90 128" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
)

const OpenBook = ({ size = 160 }: { size?: number }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 160 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left page */}
    <path d="M80 18 C80 18, 50 12, 14 22 L8 96 C44 86, 80 92, 80 92Z" stroke="white" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
    {/* Right page */}
    <path d="M80 18 C80 18, 110 12, 146 22 L152 96 C116 86, 80 92, 80 92Z" stroke="white" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
    {/* Spine */}
    <path d="M80 18 C78 40, 78 70, 80 92" stroke="white" strokeWidth="1.8" fill="none"/>
    {/* Left page lines */}
    <line x1="24" y1="42" x2="70" y2="38" stroke="white" strokeWidth="0.9" opacity="0.7"/>
    <line x1="22" y1="54" x2="70" y2="50" stroke="white" strokeWidth="0.9" opacity="0.7"/>
    <line x1="20" y1="66" x2="70" y2="62" stroke="white" strokeWidth="0.9" opacity="0.7"/>
    <line x1="18" y1="78" x2="70" y2="74" stroke="white" strokeWidth="0.9" opacity="0.5"/>
    {/* Right page lines */}
    <line x1="90" y1="38" x2="136" y2="42" stroke="white" strokeWidth="0.9" opacity="0.7"/>
    <line x1="90" y1="50" x2="138" y2="54" stroke="white" strokeWidth="0.9" opacity="0.7"/>
    <line x1="90" y1="62" x2="140" y2="66" stroke="white" strokeWidth="0.9" opacity="0.7"/>
    <line x1="90" y1="74" x2="142" y2="78" stroke="white" strokeWidth="0.9" opacity="0.5"/>
    {/* Bookmark ribbon */}
    <path d="M130 20 L130 50 L124 44 L118 50 L118 20Z" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
)

const Sparkle = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2 L22 18 L38 20 L22 22 L20 38 L18 22 L2 20 L18 18 Z" stroke="white" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    <path d="M20 10 L21 19 L30 20 L21 21 L20 30 L19 21 L10 20 L19 19 Z" stroke="white" strokeWidth="0.7" fill="none" strokeLinejoin="round" opacity="0.5"/>
  </svg>
)

const StarCluster = () => (
  <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Large star */}
    <path d="M50 6 L53 28 L74 20 L58 36 L76 46 L54 42 L52 64 L44 42 L22 50 L38 34 L20 24 L44 30 Z" stroke="white" strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
    {/* Small stars */}
    <path d="M18 12 L19 20 L27 18 L21 24 L26 30 L19 26 L18 34 L15 26 L8 30 L13 24 L7 18 L15 20 Z" stroke="white" strokeWidth="0.9" fill="none" strokeLinejoin="round"/>
    <path d="M78 52 L79 58 L85 56 L81 62 L85 66 L79 63 L78 70 L76 63 L70 66 L74 62 L70 56 L76 58 Z" stroke="white" strokeWidth="0.9" fill="none" strokeLinejoin="round"/>
  </svg>
)

const Heart = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 60 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 48 C30 48, 4 32, 4 16 C4 8, 10 2, 18 2 C23 2, 28 5, 30 10 C32 5, 37 2, 42 2 C50 2, 56 8, 56 16 C56 32, 30 48, 30 48Z" stroke="white" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
    <path d="M30 40 C30 40, 12 28, 12 18 C12 13, 16 10, 20 10" stroke="white" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round"/>
  </svg>
)

const Vine = () => (
  <svg width="60" height="200" viewBox="0 0 60 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 200 C32 170, 22 150, 30 125 C38 100, 48 85, 30 65 C12 45, 26 22, 30 0" stroke="white" strokeWidth="1.3" fill="none" strokeDasharray="5 3" strokeLinecap="round"/>
    <path d="M30 165 C14 158, 8 140, 24 145Z" stroke="white" strokeWidth="1" fill="none"/>
    <path d="M30 130 C46 120, 54 102, 38 108Z" stroke="white" strokeWidth="1" fill="none"/>
    <path d="M30 95 C14 86, 8 68, 24 74Z" stroke="white" strokeWidth="1" fill="none"/>
    <path d="M30 58 C46 48, 54 30, 38 36Z" stroke="white" strokeWidth="1" fill="none"/>
  </svg>
)

export default function Footer() {
  return (
    <footer style={{ background: GREEN, color: '#fff', paddingTop: 60, paddingBottom: 32, position: 'relative', overflow: 'hidden' }}>

      {/* ── Faded background doodles ───────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>

        {/* Large butterfly — top left */}
        <div style={{ position: 'absolute', top: -20, left: -30, opacity: 0.08, transform: 'rotate(-15deg)' }}>
          <Butterfly size={220} />
        </div>

        {/* Castle — bottom right */}
        <div style={{ position: 'absolute', bottom: -20, right: 40, opacity: 0.07, transform: 'rotate(6deg)' }}>
          <Castle size={180} />
        </div>

        {/* Open book — center left */}
        <div style={{ position: 'absolute', top: '38%', left: '8%', opacity: 0.07, transform: 'rotate(-8deg)' }}>
          <OpenBook size={180} />
        </div>

        {/* Star cluster — top right area */}
        <div style={{ position: 'absolute', top: 20, right: '22%', opacity: 0.1, transform: 'rotate(12deg)' }}>
          <StarCluster />
        </div>

        {/* Small sparkle — mid right */}
        <div style={{ position: 'absolute', top: '30%', right: '6%', opacity: 0.1, transform: 'rotate(20deg)' }}>
          <Sparkle size={52} />
        </div>

        {/* Another sparkle — top center */}
        <div style={{ position: 'absolute', top: 30, left: '42%', opacity: 0.08, transform: 'rotate(-10deg)' }}>
          <Sparkle size={36} />
        </div>

        {/* Tiny sparkle — bottom left area */}
        <div style={{ position: 'absolute', bottom: 60, left: '32%', opacity: 0.09, transform: 'rotate(30deg)' }}>
          <Sparkle size={28} />
        </div>

        {/* Heart — right of center */}
        <div style={{ position: 'absolute', top: '55%', right: '28%', opacity: 0.08, transform: 'rotate(-12deg)' }}>
          <Heart size={70} />
        </div>

        {/* Small butterfly — bottom center */}
        <div style={{ position: 'absolute', bottom: 30, left: '48%', opacity: 0.07, transform: 'rotate(10deg)' }}>
          <Butterfly size={110} />
        </div>

        {/* Vine — far left edge */}
        <div style={{ position: 'absolute', top: 0, left: 80, opacity: 0.07 }}>
          <Vine />
        </div>

        {/* Vine — far right edge */}
        <div style={{ position: 'absolute', top: 0, right: 100, opacity: 0.06, transform: 'scaleX(-1)' }}>
          <Vine />
        </div>

        {/* Small castle — top center-left */}
        <div style={{ position: 'absolute', top: 10, left: '35%', opacity: 0.06, transform: 'rotate(-5deg)' }}>
          <Castle size={80} />
        </div>

        {/* Small heart — bottom right area */}
        <div style={{ position: 'absolute', bottom: 40, right: '12%', opacity: 0.08, transform: 'rotate(8deg)' }}>
          <Heart size={44} />
        </div>

      </div>

      {/* ── Main footer content (above doodles) ───────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Image
                src="/images/Miloria Logo - white.png"
                alt="Miloria"
                width={160}
                height={52}
                style={{ objectFit: 'contain' }}
                unoptimized
              />
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

          {/* Support */}
          <div>
            <h4 style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: CORAL, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Support</h4>
            {[
              { href: 'https://partyandpresents.com', label: 'Main Store ↗', external: true },
              { href: '/about', label: 'About Us', external: false },
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
