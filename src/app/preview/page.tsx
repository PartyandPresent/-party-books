'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useOrderStore } from '@/store/order'
import { useIsMobile } from '@/hooks/useIsMobile'
import { type CoverFormat, COVER_FORMAT_PRICES, COVER_FORMAT_LABELS } from '@/lib/coverFormat'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const BEIGE = '#F5F0E8'
const CREAM = '#FAFAF5'
const BODY = '#4A5568'
const MUTED = '#888888'

const PREVIEW_INDICES = [0, 1, 2, 3, 16]
const PREVIEW_LABELS = ['Cover', 'Dedication', 'Page 2', 'Page 3', 'Final Page']

type Status = 'loading-character' | 'character-ready' | 'loading-pages' | 'done' | 'error'
type ErrorPhase = 'character' | 'pages'

export default function PreviewPage() {
  const router = useRouter()
  const {
    childName, childGender, senderName, dedication, siblingFullName, siblingBirthDate, giftDate,
    photoDataUrl, photoMimeType,
    selectedSlug, selectedTitle,
    setGeneratedPages, setCharacter, setCoverFormat,
  } = useOrderStore()

  const isMobile = useIsMobile()
  const [status, setStatus] = useState<Status>('loading-character')
  const [errorPhase, setErrorPhase] = useState<ErrorPhase>('character')
  const [errorMsg, setErrorMsg] = useState('')

  const [characterBase64, setCharacterBase64] = useState<string | null>(null)
  const [pages, setPages] = useState<(string | null)[]>([null, null, null, null, null])
  const [currentPage, setCurrentPage] = useState(0)

  const [pageStatuses, setPageStatuses] = useState<('waiting' | 'loading' | 'done' | 'error')[]>(
    ['waiting', 'waiting', 'waiting', 'waiting', 'waiting']
  )
  const [overallProgress, setOverallProgress] = useState(0)
  const [coverFormat, setCoverFormatLocal] = useState<CoverFormat>('hardcover8')

  useEffect(() => {
    if (!photoDataUrl || !selectedSlug) {
      router.push('/')
      return
    }
    generateCharacter()
  }, [])

  // ── Phase 1: Generate character ────────────────────────────────
  const generateCharacter = async () => {
    setStatus('loading-character')
    setCharacterBase64(null)

    try {
      const res = await fetch('/api/generate-character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoBase64: photoDataUrl.split(',')[1],
          mimeType: photoMimeType,
          bookSlug: selectedSlug,
          gender: childGender,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Character generation failed')
      }

      const data = await res.json()
      setCharacterBase64(data.character)
      setCharacter(data.character)
      setStatus('character-ready')

    } catch (err: any) {
      setErrorPhase('character')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  // ── Phase 2: Generate pages ────────────────────────────────────
  const generatePages = async () => {
    setStatus('loading-pages')
    setPages([null, null, null, null, null])
    setPageStatuses(['waiting', 'waiting', 'waiting', 'waiting', 'waiting'])
    setOverallProgress(0)

    try {
      const res = await fetch('/api/generate-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookSlug: selectedSlug,
          childName,
          childGender,
          senderName,
          dedication,
          siblingFullName,
          siblingBirthDate,
          giftDate,
          characterBase64,
          previewIndices: PREVIEW_INDICES,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Page generation failed')
      }

      const data = await res.json()
      const generatedPages: string[] = data.pages
      setGeneratedPages(generatedPages)

      for (let i = 0; i < generatedPages.length; i++) {
        setPageStatuses(prev => {
          const next = [...prev]
          next[i] = 'loading'
          return next
        })
        await new Promise(r => setTimeout(r, 300))
        setPages(prev => {
          const next = [...prev]
          next[i] = generatedPages[i]
          return next
        })
        setPageStatuses(prev => {
          const next = [...prev]
          next[i] = 'done'
          return next
        })
        setOverallProgress(Math.round(((i + 1) / generatedPages.length) * 100))
        await new Promise(r => setTimeout(r, 200))
      }

      setCurrentPage(0)
      setTimeout(() => setStatus('done'), 600)

    } catch (err: any) {
      setErrorPhase('pages')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  // ── Error screen ───────────────────────────────────────────────
  if (status === 'error') return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 560, margin: '0 auto', padding: isMobile ? '100px 20px 80px' : '100px 24px 80px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>😔</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: GREEN, marginBottom: 12 }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: 16, color: BODY, marginBottom: 12 }}>{errorMsg}</p>
        <p style={{ fontSize: 14, color: MUTED, marginBottom: 40 }}>
          This sometimes happens when our AI is busy. Please try again!
        </p>
        <button
          onClick={errorPhase === 'character' ? generateCharacter : generatePages}
          style={{ backgroundColor: CORAL, color: '#fff', border: 'none', borderRadius: 50, padding: '16px 40px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
        >
          Try Again
        </button>
      </main>
      <Footer />
    </div>
  )

  // ── Phase 1 loading: Generating character ──────────────────────
  if (status === 'loading-character') return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 560, margin: '0 auto', padding: isMobile ? '100px 20px 80px' : '100px 24px 80px', textAlign: 'center' }}>

        {/* Animated portrait placeholder */}
        <div style={{
          width: 200, height: 200, borderRadius: '50%',
          margin: '0 auto 32px',
          background: `linear-gradient(135deg, ${BEIGE}, #E8E0D5)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 72,
          boxShadow: '0 8px 40px rgba(45,74,62,0.12)',
          animation: 'pulse 1.8s ease-in-out infinite',
        }}>
          🧒
        </div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: GREEN, marginBottom: 12 }}>
          Creating {childName}'s character...
        </h1>
        <p style={{ fontSize: 15, color: BODY, lineHeight: 1.7, marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
          Our AI is studying {childName}'s photo to build a personalised Pixar-style character.
          This takes about 20–30 seconds.
        </p>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%', backgroundColor: CORAL,
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>

        <p style={{ fontSize: 13, color: MUTED }}>
          Please don't close this tab
        </p>

        <style>{`
          @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.04);opacity:0.85} }
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        `}</style>
      </main>
      <Footer />
    </div>
  )

  // ── Phase 2: Character approval ────────────────────────────────
  if (status === 'character-ready') return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: isMobile ? '100px 20px 80px' : '100px 24px 80px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700, color: GREEN, marginBottom: 12 }}>
            Meet {childName}!
          </h1>
          <p style={{ fontSize: 16, color: BODY, lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            This is how {childName} will look in every illustration — on every single page of the book.
          </p>
        </div>

        {/* Character portrait */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 24,
          padding: 24,
          boxShadow: '0 8px 40px rgba(45,74,62,0.10)',
          marginBottom: 28,
          textAlign: 'center',
        }}>
          {characterBase64 && (
            <img
              src={`data:image/png;base64,${characterBase64}`}
              alt={`${childName}'s character`}
              style={{
                width: '100%', maxWidth: 360,
                aspectRatio: '1/1',
                objectFit: 'cover',
                borderRadius: 16,
                display: 'block',
                margin: '0 auto',
              }}
            />
          )}

          {/* Labels below portrait */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            {['Pixar-style illustration', 'Matches your photo', 'Appears on every page'].map(tag => (
              <span key={tag} style={{
                fontSize: 12, fontWeight: 700, color: GREEN,
                backgroundColor: BEIGE, padding: '5px 14px', borderRadius: 50,
              }}>
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div style={{
          backgroundColor: '#F0FDF4', borderRadius: 14, padding: '14px 18px',
          marginBottom: 28, display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 20 }}>💡</span>
          <p style={{ margin: 0, fontSize: 14, color: '#166534', lineHeight: 1.6 }}>
            <strong>Not quite right?</strong> The likeness depends on the photo quality.
            A well-lit, front-facing photo with no sunglasses or hats gives the best result.
            You can regenerate for a fresh attempt, or go back to upload a better photo.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button
            onClick={generatePages}
            style={{
              width: '100%', padding: '18px 24px',
              backgroundColor: CORAL, color: '#fff',
              border: 'none', borderRadius: 50,
              fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 18,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(232,131,106,0.4)',
            }}
          >
            ✓ Looks perfect — Generate my book →
          </button>

          <button
            onClick={() => router.back()}
            style={{
              background: 'none', border: 'none', color: MUTED,
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', padding: '8px 0',
            }}
          >
            ← Go back and change photo
          </button>
        </div>

      </main>
      <Footer />
    </div>
  )

  // ── Phase 3 loading: Generating pages ─────────────────────────
  if (status === 'loading-pages') return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 600, margin: '0 auto', padding: isMobile ? '100px 20px 80px' : '100px 24px 80px', textAlign: 'center' }}>

        {/* Approved character thumbnail */}
        {characterBase64 && (
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            margin: '0 auto 20px',
            overflow: 'hidden',
            border: `3px solid ${CORAL}`,
            boxShadow: '0 4px 16px rgba(232,131,106,0.3)',
          }}>
            <img
              src={`data:image/png;base64,${characterBase64}`}
              alt={childName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: GREEN, marginBottom: 10 }}>
          Illustrating {childName}'s book...
        </h1>
        <p style={{ fontSize: 15, color: BODY, marginBottom: 36, lineHeight: 1.6 }}>
          Using {childName}'s approved character to paint every page.<br />
          Please don't close this tab!
        </p>

        {/* Overall progress bar */}
        <div style={{ backgroundColor: '#E8E8E8', borderRadius: 50, height: 10, marginBottom: 32, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${overallProgress}%`,
            background: `linear-gradient(90deg, ${CORAL}, ${GREEN})`,
            borderRadius: 50,
            transition: 'width 0.6s ease',
          }} />
        </div>

        {/* Per-page status */}
        <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'left' }}>
          {PREVIEW_LABELS.map((label, i) => {
            const s = pageStatuses[i]
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '10px 0',
                borderBottom: i < PREVIEW_LABELS.length - 1 ? '1px solid #F0F0F0' : 'none',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  backgroundColor:
                    s === 'done' ? '#22C55E' :
                    s === 'loading' ? CORAL :
                    s === 'error' ? '#EF4444' : '#E8E8E8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, color: '#fff', fontWeight: 800,
                  transition: 'background-color 0.3s',
                }}>
                  {s === 'done' ? '✓' : s === 'loading' ? '…' : s === 'error' ? '✗' : ''}
                </div>
                <span style={{
                  fontSize: 14, fontWeight: s === 'loading' ? 800 : 600,
                  color: s === 'done' ? '#22C55E' : s === 'loading' ? CORAL : s === 'error' ? '#EF4444' : MUTED,
                  flex: 1,
                }}>
                  🎨 Illustrating {label}
                </span>
                <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>
                  {s === 'done' ? 'Done!' : s === 'loading' ? 'Working...' : s === 'error' ? 'Failed' : 'Waiting'}
                </span>
              </div>
            )
          })}
        </div>

        <p style={{ fontSize: 13, color: MUTED, marginTop: 24 }}>
          Generating 5 preview pages — this takes about 60–90 seconds
        </p>
      </main>
      <Footer />
    </div>
  )

  // ── Phase 4: Done — show preview pages ────────────────────────
  return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '100px 20px 80px' : '100px 24px 80px' }}>

        <div style={{ textAlign: 'center', marginBottom: 36, paddingTop: 12 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: GREEN, marginBottom: 8 }}>
            {childName}'s book is ready!
          </h1>
          <p style={{ fontSize: 15, color: BODY }}>
            Here's a preview of 5 pages — order to unlock all 17!
          </p>
        </div>

        {/* Main viewer */}
        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', marginBottom: 24 }}>

          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 16, backgroundColor: '#F0F0F0', aspectRatio: '2/1' }}>
            {pages[currentPage] ? (
              <img
                src={`data:image/png;base64,${pages[currentPage]}`}
                alt={`Page ${currentPage + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED, fontSize: 14 }}>
                Loading...
              </div>
            )}

            {currentPage > 0 && (
              <button onClick={() => setCurrentPage(p => p - 1)} style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                width: 44, height: 44, fontSize: 22, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}>‹</button>
            )}

            {currentPage < pages.filter(Boolean).length - 1 && (
              <button onClick={() => setCurrentPage(p => p + 1)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                width: 44, height: 44, fontSize: 22, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}>›</button>
            )}
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: MUTED, fontWeight: 700, margin: '0 0 16px' }}>
            {PREVIEW_LABELS[currentPage]} — Page {currentPage + 1} of 5 preview pages
          </p>

          {/* Thumbnail strip */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
            {pages.map((page, i) => (
              <button key={i} onClick={() => page && setCurrentPage(i)} style={{
                flexShrink: 0, width: 80, height: 45, borderRadius: 6, overflow: 'hidden',
                border: currentPage === i ? `3px solid ${CORAL}` : '3px solid transparent',
                cursor: page ? 'pointer' : 'default',
                padding: 0, backgroundColor: '#E8E8E8',
              }}>
                {page
                  ? <img src={`data:image/png;base64,${page}`} alt={PREVIEW_LABELS[i]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <div style={{ width: '100%', height: '100%', backgroundColor: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: MUTED }}>...</div>
                }
              </button>
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`locked-${i}`} style={{
                flexShrink: 0, width: 80, height: 45, borderRadius: 6,
                border: '3px solid transparent', backgroundColor: '#E8E8E8',
                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                }}>
                  <span style={{ fontSize: 14 }}>🔒</span>
                  <span style={{ fontSize: 8, color: '#fff', fontWeight: 700 }}>LOCKED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked pages banner */}
        <div style={{
          backgroundColor: BEIGE, borderRadius: 16, padding: '20px 24px',
          marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: 32 }}>🔒</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: 16, color: GREEN }}>
              12 more pages are waiting for {childName}!
            </p>
            <p style={{ margin: 0, fontSize: 14, color: BODY }}>
              Order now to unlock all 17 fully illustrated pages of {childName}'s personalized book.
            </p>
          </div>
        </div>

        {/* Order CTA */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: isMobile ? '24px 20px' : '28px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}>
          {/* Book info */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: 18, color: GREEN }}>{selectedTitle}</p>
            <p style={{ margin: 0, fontSize: 14, color: MUTED }}>
              Personalised for {childName} · 17 pages
            </p>
          </div>

          {/* Cover format selector */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, color: MUTED, letterSpacing: 1, textTransform: 'uppercase' }}>
              Choose your cover
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {(['hardcover8', 'softcover8', 'softcover5'] as const).map((fmt) => {
                const isSelected = coverFormat === fmt
                const icon = fmt === 'hardcover8' ? '📚' : fmt === 'softcover8' ? '📖' : '📕'
                return (
                  <button
                    key={fmt}
                    onClick={() => setCoverFormatLocal(fmt)}
                    style={{
                      flex: 1, padding: isMobile ? '12px 6px' : '16px 12px', borderRadius: 14,
                      border: `2px solid ${isSelected ? GREEN : '#E0E0E0'}`,
                      backgroundColor: isSelected ? '#EEF5F2' : '#fff',
                      cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                    }}
                  >
                    <span style={{ fontSize: isMobile ? 20 : 26 }}>{icon}</span>
                    <span style={{ fontWeight: 800, fontSize: isMobile ? 11 : 13, color: GREEN, textAlign: 'center' }}>
                      {COVER_FORMAT_LABELS[fmt]}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: isMobile ? 13 : 16, color: CORAL }}>
                      ${COVER_FORMAT_PRICES[fmt].toFixed(2)}
                    </span>
                    {fmt === 'hardcover8' && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, color: '#fff',
                        backgroundColor: CORAL, padding: '2px 7px', borderRadius: 50,
                      }}>
                        POPULAR
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={generatePages}
              style={{
                backgroundColor: 'transparent', border: `2px solid ${CORAL}`,
                color: CORAL, borderRadius: 50, padding: '12px 24px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15, cursor: 'pointer',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              🔄 Regenerate pages
            </button>
            <button
              onClick={() => { setCoverFormat(coverFormat); router.push('/checkout') }}
              style={{
                backgroundColor: CORAL, color: '#fff', border: 'none', borderRadius: 50,
                padding: '14px 28px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 17, cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(232,131,106,0.4)',
                flex: 1, width: isMobile ? '100%' : 'auto',
              }}
            >
              Order This Book — ${COVER_FORMAT_PRICES[coverFormat].toFixed(2)}
            </button>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}
