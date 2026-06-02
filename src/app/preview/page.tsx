'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useOrderStore } from '@/store/order'

const PINK = '#FF559C'
const BLUE = '#28BEEF'
const BLUSH = '#FFEEF5'
const HEADING = '#2C2C2C'
const BODY = '#555555'
const MUTED = '#888888'

// Only generate these 5 page indices (0=cover, 1=dedication, 2, 3, 16=last)
const PREVIEW_INDICES = [0, 1, 2, 3, 16]
const PREVIEW_LABELS = ['Cover', 'Dedication', 'Page 2', 'Page 3', 'Final Page']

export default function PreviewPage() {
  const router = useRouter()
  const {
    childName, senderName, dedication,
    photoDataUrl, photoMimeType,
    selectedSlug, selectedTitle, selectedPrice,
    setGeneratedPages, setCharacter,
  } = useOrderStore()

  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading')
  const [pages, setPages] = useState<(string | null)[]>([null, null, null, null, null])
  const [currentPage, setCurrentPage] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  // Per-step progress
  const [stepStatuses, setStepStatuses] = useState<('waiting' | 'loading' | 'done' | 'error')[]>(
    ['waiting', 'waiting', 'waiting', 'waiting', 'waiting', 'waiting'] // character + 5 pages
  )
  const [overallProgress, setOverallProgress] = useState(0)

  const stepLabels = ['Character', ...PREVIEW_LABELS]

  const setStepStatus = (index: number, s: 'waiting' | 'loading' | 'done' | 'error') => {
    setStepStatuses(prev => {
      const next = [...prev]
      next[index] = s
      return next
    })
  }

  useEffect(() => {
    if (!photoDataUrl || !selectedSlug) {
      router.push('/')
      return
    }
    generateBook()
  }, [])

  const generateBook = async () => {
    setStatus('loading')
    setOverallProgress(0)
    setPages([null, null, null, null, null])
    setStepStatuses(['waiting', 'waiting', 'waiting', 'waiting', 'waiting', 'waiting'])

    try {
      // Step 1 — Generate character
      setStepStatus(0, 'loading')

      const response = await fetch('/api/generate-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoBase64: photoDataUrl.split(',')[1],
          mimeType: photoMimeType,
          bookSlug: selectedSlug,
          childName,
          senderName,
          dedication,
          previewIndices: PREVIEW_INDICES,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        setStepStatus(0, 'error')
        throw new Error(err.error || 'Generation failed')
      }

      // Stream-style: read the response as it comes
      const data = await response.json()

      setStepStatus(0, 'done')
      setOverallProgress(16)

      // Animate pages appearing one by one
      const generatedPages: string[] = data.pages
      setCharacter(data.character)
      setGeneratedPages(generatedPages)

      for (let i = 0; i < generatedPages.length; i++) {
        setStepStatus(i + 1, 'loading')
        await new Promise(r => setTimeout(r, 300))
        setPages(prev => {
          const next = [...prev]
          next[i] = generatedPages[i]
          return next
        })
        setStepStatus(i + 1, 'done')
        setOverallProgress(Math.round(16 + ((i + 1) / generatedPages.length) * 84))
        await new Promise(r => setTimeout(r, 200))
      }

      setCurrentPage(0)
      setTimeout(() => setStatus('done'), 600)

    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  // ── Error Screen ───────────────────────────────────────────────
  if (status === 'error') return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 560, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>😔</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: HEADING, marginBottom: 12 }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: 16, color: BODY, marginBottom: 12 }}>{errorMsg}</p>
        <p style={{ fontSize: 14, color: MUTED, marginBottom: 40 }}>
          This sometimes happens when our AI is busy. Please try again!
        </p>
        <button
          onClick={generateBook}
          style={{ backgroundColor: PINK, color: '#fff', border: 'none', borderRadius: 50, padding: '16px 40px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
        >
          Try Again
        </button>
      </main>
      <Footer />
    </div>
  )

  // ── Loading Screen ─────────────────────────────────────────────
  if (status === 'loading') return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>📖</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: HEADING, marginBottom: 10 }}>
          Creating {childName}'s book...
        </h1>
        <p style={{ fontSize: 15, color: BODY, marginBottom: 36, lineHeight: 1.6 }}>
          Our AI is illustrating every page just for {childName}.<br />
          Please don't close this tab!
        </p>

        {/* Overall progress bar */}
        <div style={{ backgroundColor: '#E8E8E8', borderRadius: 50, height: 10, marginBottom: 32, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${overallProgress}%`,
            background: `linear-gradient(90deg, ${PINK}, ${BLUE})`,
            borderRadius: 50,
            transition: 'width 0.6s ease',
          }} />
        </div>

        {/* Per-step progress list */}
        <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '24px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'left' }}>
          {stepLabels.map((label, i) => {
            const s = stepStatuses[i]
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '10px 0',
                borderBottom: i < stepLabels.length - 1 ? '1px solid #F0F0F0' : 'none',
              }}>
                {/* Status icon */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  backgroundColor:
                    s === 'done' ? '#22C55E' :
                    s === 'loading' ? PINK :
                    s === 'error' ? '#EF4444' : '#E8E8E8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, color: '#fff', fontWeight: 800,
                  transition: 'background-color 0.3s',
                }}>
                  {s === 'done' ? '✓' :
                   s === 'loading' ? '…' :
                   s === 'error' ? '✗' : ''}
                </div>

                {/* Label */}
                <span style={{
                  fontSize: 14, fontWeight: s === 'loading' ? 800 : 600,
                  color: s === 'done' ? '#22C55E' : s === 'loading' ? PINK : s === 'error' ? '#EF4444' : MUTED,
                  flex: 1,
                }}>
                  {i === 0 ? `✨ Generating ${childName}'s character` : `🎨 Illustrating ${label}`}
                </span>

                {/* Status text */}
                <span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>
                  {s === 'done' ? 'Done!' :
                   s === 'loading' ? 'Working...' :
                   s === 'error' ? 'Failed' : 'Waiting'}
                </span>
              </div>
            )
          })}
        </div>

        <p style={{ fontSize: 13, color: MUTED, marginTop: 24 }}>
          Generating a preview of 5 pages — this takes about 60–90 seconds
        </p>

        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
      </main>
      <Footer />
    </div>
  )

  // ── Done Screen ────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36, paddingTop: 12 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: HEADING, marginBottom: 8 }}>
            {childName}'s book is ready!
          </h1>
          <p style={{ fontSize: 15, color: BODY }}>
            Here's a preview of 5 pages — order to unlock all 17!
          </p>
        </div>

        {/* Main viewer */}
        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', marginBottom: 24 }}>

          {/* Current page */}
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

            {/* Prev arrow */}
            {currentPage > 0 && (
              <button
                onClick={() => setCurrentPage(p => p - 1)}
                style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                  width: 44, height: 44, fontSize: 22, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >‹</button>
            )}

            {/* Next arrow */}
            {currentPage < pages.filter(Boolean).length - 1 && (
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
                  width: 44, height: 44, fontSize: 22, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >›</button>
            )}
          </div>

          {/* Page label */}
          <p style={{ textAlign: 'center', fontSize: 13, color: MUTED, fontWeight: 700, margin: '0 0 16px' }}>
            {PREVIEW_LABELS[currentPage]} — Page {currentPage + 1} of 5 preview pages
          </p>

          {/* Thumbnail strip — 5 previews + locked overlay */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
            {/* 5 unlocked previews */}
            {pages.map((page, i) => (
              <button
                key={i}
                onClick={() => page && setCurrentPage(i)}
                style={{
                  flexShrink: 0, width: 80, height: 45,
                  borderRadius: 6, overflow: 'hidden',
                  border: currentPage === i ? `3px solid ${PINK}` : '3px solid transparent',
                  cursor: page ? 'pointer' : 'default',
                  padding: 0, backgroundColor: '#E8E8E8', position: 'relative',
                }}
              >
                {page
                  ? <img src={`data:image/png;base64,${page}`} alt={PREVIEW_LABELS[i]} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <div style={{ width: '100%', height: '100%', backgroundColor: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: MUTED }}>...</div>
                }
              </button>
            ))}

            {/* 12 locked page thumbnails */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`locked-${i}`}
                style={{
                  flexShrink: 0, width: 80, height: 45,
                  borderRadius: 6, overflow: 'hidden',
                  border: '3px solid transparent',
                  backgroundColor: '#E8E8E8',
                  position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 2,
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
          backgroundColor: BLUSH, borderRadius: 16, padding: '20px 24px',
          marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16,
          flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: 32 }}>🔒</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: 16, color: HEADING }}>
              12 more pages are waiting for {childName}!
            </p>
            <p style={{ margin: 0, fontSize: 14, color: BODY }}>
              Order now to unlock all 17 fully illustrated pages of {childName}'s personalized book.
            </p>
          </div>
        </div>

        {/* Order CTA */}
        <div style={{
          backgroundColor: '#fff', borderRadius: 20, padding: '28px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: 18, color: HEADING }}>{selectedTitle}</p>
            <p style={{ margin: 0, fontSize: 14, color: MUTED }}>
              Personalised for {childName} · 17 pages · Hardcover
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={generateBook}
              style={{
                backgroundColor: 'transparent', border: `2px solid ${PINK}`,
                color: PINK, borderRadius: 50, padding: '12px 24px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15, cursor: 'pointer',
              }}
            >
              🔄 Regenerate
            </button>
            <button
              onClick={() => router.push('/checkout')}
              style={{
                background: `linear-gradient(135deg, ${PINK}, #FF3385)`,
                color: '#fff', border: 'none', borderRadius: 50, padding: '14px 32px',
                fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 17, cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255,85,156,0.4)',
              }}
            >
              Order This Book — ${selectedPrice.toFixed(2)}
            </button>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}