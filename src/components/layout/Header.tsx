'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useCurrency } from '@/store/currency'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'

const NAV = [
  {
    label: 'Collections',
    href: '/collections',
    items: [
      { icon: '📚', label: 'All Books',       href: '/books' },
      { icon: '✝️', label: 'Baptism Gifts',   href: '/collections/baptism' },
      { icon: '🎂', label: 'Birthday Gifts',  href: '/collections/birthday' },
      { icon: '🐣', label: 'Baby & Newborn',  href: '/collections/baby-newborn' },
    ],
  },
  {
    label: 'By Milestones',
    href: '/collections/by-occasions',
    items: [
      { icon: '🎂', label: 'Birthday Books',  href: '/milestones/birthday' },
      { icon: '🕊️', label: 'Faith & Baptism', href: '/milestones/baptism' },
      { icon: '🐣', label: 'New Baby',         href: '/milestones/new-baby' },
      { icon: '💍', label: 'Wedding',      href: '/milestones/wedding' },
      { icon: '🎒', label: 'School',        href: '/milestones/school' },
      { icon: '💝', label: 'Just Because',  href: '/milestones/just-because' },
    ],
  },
  {
    label: 'By Recipient',
    href: '/collections/by-recipients',
    items: [
      { icon: '👶', label: 'For Babies',    href: '/collections/by-recipients#babies' },
      { icon: '🧒', label: 'For Toddlers',  href: '/collections/by-recipients#toddlers' },
      { icon: '👦', label: 'For Children',  href: '/collections/by-recipients#children' },
    ],
  },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const { currency, setCurrency } = useCurrency()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  return (
    <header style={{
      position: 'fixed', top: 36, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid #EDE8DF' : '1px solid transparent',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 2px 20px rgba(45,74,62,0.08)' : 'none',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px', height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/images/Miloria Logo.png" alt="Miloria" width={140} height={44} style={{ objectFit: 'contain' }} unoptimized />
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>

            {NAV.map(item => (
              <div key={item.href} className="nav-group" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {/* Nav label */}
                <Link
                  href={item.href}
                  className="nav-ul"
                  style={{
                    color: '#555555',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '8px 0',
                  }}
                  onMouseOver={e => (e.currentTarget.style.color = GREEN)}
                  onMouseOut={e => (e.currentTarget.style.color = '#555555')}
                >
                  {item.label}
                  <span style={{ fontSize: 9, opacity: 0.5, marginTop: 1 }}>▾</span>
                </Link>

                {/* Dropdown panel */}
                <div className="nav-dropdown">
                  {/* Visual card — sits inside the padded dropdown container */}
                  <div style={{
                    background: '#fff',
                    borderRadius: 14,
                    boxShadow: '0 8px 40px rgba(45,74,62,0.13)',
                    border: '1px solid #EDE8DF',
                    borderTop: `2px solid ${CORAL}`,
                    padding: '8px',
                    position: 'relative',
                  }}>
                    {/* Triangle pointer */}
                    <div style={{
                      position: 'absolute',
                      top: -7, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0, height: 0,
                      borderLeft: '7px solid transparent',
                      borderRight: '7px solid transparent',
                      borderBottom: `7px solid ${CORAL}`,
                    }} />

                    {item.items.map(sub => (
                      <Link key={sub.label} href={sub.href} className="nav-dropdown-link">
                        <span className="dd-icon">{sub.icon}</span>
                        <span style={{ flex: 1 }}>{sub.label}</span>
                        <span className="dd-arrow">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <a href="https://partyandpresents.com" target="_blank" rel="noopener noreferrer"
              style={{ color: '#888888', fontFamily: 'Nunito, sans-serif', fontWeight: 500, fontSize: 13, textDecoration: 'none' }}>
              ← Main Store
            </a>

            {/* Currency toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: '#F0F5F3', borderRadius: 50, padding: '3px 4px' }}>
              {(['CAD', 'USD'] as const).map(c => (
                <button key={c} onClick={() => setCurrency(c)} style={{
                  border: 'none', cursor: 'pointer', borderRadius: 50,
                  padding: '4px 10px',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 11,
                  background: currency === c ? GREEN : 'transparent',
                  color: currency === c ? '#fff' : '#888',
                  transition: 'all 0.15s',
                }}>
                  {c}
                </button>
              ))}
            </div>

            <Link href="/books" className="btn-shine" style={{
              background: CORAL, color: '#fff',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
              padding: '10px 22px', borderRadius: 50, textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(232,131,106,0.3)',
              transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,131,106,0.4)' }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(232,131,106,0.3)' }}>
              Choose a Book
              <span style={{ fontSize: 13 }}>✦</span>
            </Link>
          </nav>
        )}

        {/* Mobile: CTA + Hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/books" className="btn-shine" style={{
              background: CORAL, color: '#fff',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12,
              padding: '7px 13px', borderRadius: 50, textDecoration: 'none',
              lineHeight: 1.3, whiteSpace: 'nowrap',
            }}>
              Create ✦
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5, width: 32 }}>
              <span style={{ height: 2, background: menuOpen ? CORAL : GREEN, borderRadius: 2, display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ height: 2, background: GREEN, borderRadius: 2, display: 'block', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
              <span style={{ height: 2, background: menuOpen ? CORAL : GREEN, borderRadius: 2, display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isMobile && menuOpen && (
        <div style={{
          background: '#fff', borderTop: '1px solid #EDE8DF',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4,
          maxHeight: 'calc(100dvh - 72px)', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
        }}>
          {NAV.map(item => (
            <div key={item.href}>
              <Link href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ color: GREEN, fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'block', padding: '10px 0', borderBottom: '1px solid #f0ece4' }}>
                {item.label}
              </Link>
              <div style={{ paddingLeft: 16, paddingBottom: 8 }}>
                {item.items.map(sub => (
                  <Link key={sub.label} href={sub.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 14, textDecoration: 'none', padding: '7px 0' }}>
                    <span>{sub.icon}</span>
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <a href="https://partyandpresents.com" target="_blank" rel="noopener noreferrer"
            style={{ color: '#888888', fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none', padding: '10px 0' }}>
            ← Main Store
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0' }}>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#888', fontWeight: 600 }}>Currency:</span>
            <div style={{ display: 'flex', gap: 2, background: '#F0F5F3', borderRadius: 50, padding: '3px 4px' }}>
              {(['CAD', 'USD'] as const).map(c => (
                <button key={c} onClick={() => setCurrency(c)} style={{
                  border: 'none', cursor: 'pointer', borderRadius: 50,
                  padding: '4px 12px',
                  fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12,
                  background: currency === c ? GREEN : 'transparent',
                  color: currency === c ? '#fff' : '#888',
                  transition: 'all 0.15s',
                }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <Link href="/books" onClick={() => setMenuOpen(false)}
            style={{
              background: CORAL, color: '#fff', textAlign: 'center',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15,
              padding: '12px 24px', borderRadius: 50, textDecoration: 'none', marginTop: 8,
            }}>
            Choose a Book ✦
          </Link>
        </div>
      )}
    </header>
  )
}
