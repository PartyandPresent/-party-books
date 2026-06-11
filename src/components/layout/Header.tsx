'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when switching to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid #FFEEF5' : '1px solid transparent',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 2px 20px rgba(255,85,156,0.08)' : 'none',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px',
        height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Image src="/Icon.png" alt="party & presents" width={36} height={36} style={{ objectFit: 'contain' }} />
          {!isMobile && (
            <Image src="/Logo_Text.png" alt="party & presents" width={110} height={36} style={{ objectFit: 'contain' }} />
          )}
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Link href="/books" style={{ color: '#555555', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = '#FF559C')}
              onMouseOut={e => (e.currentTarget.style.color = '#555555')}>
              All Books
            </Link>
            <Link href="/books?filter=baptism" style={{ color: '#555555', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = '#FF559C')}
              onMouseOut={e => (e.currentTarget.style.color = '#555555')}>
              By Occasion
            </Link>
            <Link href="/books?filter=baby" style={{ color: '#555555', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = '#FF559C')}
              onMouseOut={e => (e.currentTarget.style.color = '#555555')}>
              By Recipient
            </Link>
            <a href="https://partyandpresents.com" target="_blank" rel="noopener noreferrer"
              style={{ color: '#888888', fontFamily: 'Nunito, sans-serif', fontWeight: 500, fontSize: 13, textDecoration: 'none' }}>
              ← Main Store
            </a>
            <Link href="/books" style={{
              background: '#FF559C', color: '#fff',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
              padding: '10px 22px', borderRadius: 50, textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(255,85,156,0.3)',
            }}
              onMouseOver={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
              ✨ Create a Book
            </Link>
          </nav>
        )}

        {/* Mobile: CTA + Hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/books" style={{
              background: '#FF559C', color: '#fff',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13,
              padding: '8px 16px', borderRadius: 50, textDecoration: 'none',
            }}>
              ✨ Create
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5, width: 32 }}>
              <span style={{ height: 2, background: menuOpen ? '#FF559C' : '#1A1A1A', borderRadius: 2, display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ height: 2, background: '#1A1A1A', borderRadius: 2, display: 'block', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
              <span style={{ height: 2, background: menuOpen ? '#FF559C' : '#1A1A1A', borderRadius: 2, display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isMobile && menuOpen && (
        <div style={{
          background: '#fff', borderTop: '1px solid #FFEEF5',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {[
            { href: '/books', label: 'All Books' },
            { href: '/books?filter=baptism', label: 'By Occasion' },
            { href: '/books?filter=baby', label: 'By Recipient' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ color: '#2C2C2C', fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
          <a href="https://partyandpresents.com" target="_blank" rel="noopener noreferrer"
            style={{ color: '#888888', fontFamily: 'Nunito, sans-serif', fontSize: 14, textDecoration: 'none' }}>
            ← Main Store
          </a>
          <Link href="/books" onClick={() => setMenuOpen(false)}
            style={{
              background: '#FF559C', color: '#fff', textAlign: 'center',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 15,
              padding: '12px 24px', borderRadius: 50, textDecoration: 'none',
            }}>
            ✨ Create a Book
          </Link>
        </div>
      )}
    </header>
  )
}
