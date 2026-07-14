'use client'

import { use, useState, useCallback, useEffect } from 'react'

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME_ORDERS || 'dft0hfbee'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const BEIGE = '#F5F0E8'
const CREAM = '#FAFAF5'
const MUTED = '#888888'
const BODY  = '#4A5568'

function cloudinaryUrl(orderId: string, index: number, version?: number) {
  const publicId = `page_${String(index).padStart(2, '0')}`
  const versionPart = version ? `v${version}/` : ''
  // f_auto first (transformation), then optional version, then public ID path
  return `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto/${versionPart}party-books/orders/${orderId}/${publicId}`
}

function pageLabel(index: number, pageCount: number): string {
  if (index === 0) return 'Cover'
  if (index === pageCount - 1) return 'Final'
  return `Page ${index}`
}

function pageChipLabel(index: number, pageCount: number): string {
  if (index === 0) return 'COVER'
  if (index === pageCount - 1) return 'FINAL'
  return `PAGE ${index}`
}

export default function StaffOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params)
  return <StaffOrderContent orderId={orderId} />
}

function StaffOrderContent({ orderId }: { orderId: string }) {
  const [downloading, setDownloading]     = useState(false)
  const [errors, setErrors]               = useState<Record<number, boolean>>({})
  const [regenerating, setRegenerating]   = useState<Record<number, boolean>>({})
  const [regenErrors, setRegenErrors]     = useState<Record<number, string>>({})
  const [imageVersions, setImageVersions] = useState<Record<number, number>>({})
  const [staffNotes, setStaffNotes]       = useState<Record<number, string>>({})
  const [pageCount, setPageCount]         = useState(17)
  const [metaLoaded, setMetaLoaded]       = useState(false)

  useEffect(() => {
    fetch(`/api/staff/order-info?orderId=${orderId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.pageCount) setPageCount(data.pageCount) })
      .catch(() => {})
      .finally(() => setMetaLoaded(true))
  }, [orderId])

  const pages = Array.from({ length: pageCount }, (_, i) => ({
    index: i,
    label: pageLabel(i, pageCount),
    url: cloudinaryUrl(orderId, i, imageVersions[i]),
  }))

  async function handleDownloadPdf() {
    setDownloading(true)
    try {
      const res = await fetch(`/api/download-pdf?orderId=${orderId}`)
      if (!res.ok) throw new Error('PDF generation failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `order-${orderId}-preview.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('PDF generation failed. Make sure all pages are uploaded.')
    } finally {
      setDownloading(false)
    }
  }

  const handleRegenerate = useCallback(async (pageIndex: number) => {
    setRegenerating(r => ({ ...r, [pageIndex]: true }))
    setRegenErrors(e => ({ ...e, [pageIndex]: '' }))
    setErrors(e => ({ ...e, [pageIndex]: false }))

    try {
      const res = await fetch('/api/regenerate-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, pageIndex, staffNote: staffNotes[pageIndex] || '' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Regeneration failed')
      setImageVersions(v => ({ ...v, [pageIndex]: Math.round(Date.now() / 1000) }))
    } catch (err: any) {
      setRegenErrors(e => ({ ...e, [pageIndex]: err.message }))
    } finally {
      setRegenerating(r => ({ ...r, [pageIndex]: false }))
    }
  }, [orderId, staffNotes])

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Nunito, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: GREEN,
        padding: '16px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 10,
        boxShadow: '0 2px 12px rgba(45,74,62,0.18)',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
            party & presents — Staff Review
          </p>
          <h1 style={{ margin: '2px 0 0', fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Playfair Display, serif' }}>
            Order #{orderId}
          </h1>
        </div>
        <button
          onClick={handleDownloadPdf}
          disabled={downloading}
          style={{
            background: downloading ? 'rgba(255,255,255,0.2)' : CORAL,
            color: '#fff',
            border: 'none',
            borderRadius: 50,
            padding: '12px 28px',
            fontSize: 14,
            fontWeight: 800,
            cursor: downloading ? 'not-allowed' : 'pointer',
            fontFamily: 'Nunito, sans-serif',
            boxShadow: downloading ? 'none' : '0 4px 14px rgba(232,131,106,0.4)',
            transition: 'all 0.2s',
          }}
        >
          {downloading ? '⏳ Generating PDF…' : '⬇ Download Spread PDF'}
        </button>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* Instructions banner */}
        <div style={{
          background: BEIGE, borderRadius: 12, padding: '14px 20px',
          fontSize: 13, color: BODY, margin: '24px 0 0',
          borderLeft: `4px solid ${CORAL}`,
        }}>
          <strong style={{ color: GREEN }}>Quality check:</strong>{' '}
          Review all {metaLoaded ? pageCount : '…'} pages below. Click <strong>Regenerate</strong> on any page that needs to be redrawn. Once approved, click <strong>Download Spread PDF</strong>.
        </div>

        {/* Pages */}
        <div style={{ margin: '24px 0 40px' }}>
          {pages.map(({ index, label, url }) => (
            <div key={index} style={{ marginBottom: 32 }}>

              {/* Label row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    background: index === 0 || index === pageCount - 1 ? CORAL : '#E2EBE7',
                    color: index === 0 || index === pageCount - 1 ? '#fff' : GREEN,
                    fontSize: 11, fontWeight: 800,
                    padding: '3px 12px', borderRadius: 50, letterSpacing: 0.5,
                  }}>
                    {pageChipLabel(index, pageCount)}
                  </span>
                  <span style={{ fontSize: 13, color: MUTED, fontWeight: 600 }}>{label}</span>
                  {regenerating[index] && (
                    <span style={{ fontSize: 12, color: CORAL, fontWeight: 700 }}>Generating…</span>
                  )}
                  {regenErrors[index] && (
                    <span style={{ fontSize: 12, color: '#e55', fontWeight: 700 }}>⚠ {regenErrors[index]}</span>
                  )}
                </div>
                <button
                  onClick={() => handleRegenerate(index)}
                  disabled={!!regenerating[index]}
                  style={{
                    background: '#fff',
                    color: regenerating[index] ? MUTED : GREEN,
                    border: `1.5px solid ${regenerating[index] ? '#ddd' : GREEN}`,
                    borderRadius: 50,
                    padding: '7px 20px',
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: regenerating[index] ? 'not-allowed' : 'pointer',
                    fontFamily: 'Nunito, sans-serif',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {regenerating[index] ? '⏳ Regenerating…' : '↻ Regenerate'}
                </button>
              </div>

              {/* Staff note textarea */}
              <textarea
                value={staffNotes[index] || ''}
                onChange={e => setStaffNotes(n => ({ ...n, [index]: e.target.value }))}
                placeholder="Describe what to change on this page (optional)…"
                rows={2}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  marginBottom: 8,
                  padding: '9px 14px',
                  border: `1.5px solid #D4E0DC`,
                  borderRadius: 8,
                  fontSize: 13,
                  color: '#333',
                  fontFamily: 'Nunito, sans-serif',
                  resize: 'vertical',
                  outline: 'none',
                  lineHeight: 1.5,
                  background: '#fff',
                }}
                onFocus={e => e.currentTarget.style.borderColor = CORAL}
                onBlur={e => e.currentTarget.style.borderColor = '#D4E0DC'}
              />

              {/* Spread image */}
              <div style={{
                position: 'relative', borderRadius: 10, overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(45,74,62,0.12)', background: '#ddd',
              }}>
                {errors[index] ? (
                  <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', background: BEIGE, color: MUTED, fontSize: 13 }}>
                    ⚠ Image not yet uploaded for this page
                  </div>
                ) : (
                  <img
                    key={url}
                    src={url}
                    alt={label}
                    style={{ width: '100%', display: 'block', opacity: regenerating[index] ? 0.4 : 1, transition: 'opacity 0.3s' }}
                    onError={() => setErrors(e => ({ ...e, [index]: true }))}
                  />
                )}
                {/* Fold line */}
                {!errors[index] && (
                  <div style={{
                    position: 'absolute', top: 0, bottom: 0,
                    left: '50%', transform: 'translateX(-50%)',
                    width: 2,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0.18), rgba(0,0,0,0.06))',
                    pointerEvents: 'none',
                  }} />
                )}
                {/* Regenerating overlay */}
                {regenerating[index] && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.65)' }}>
                    <div style={{ background: '#fff', borderRadius: 12, padding: '16px 28px', boxShadow: '0 4px 20px rgba(45,74,62,0.15)', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: GREEN, fontFamily: 'Nunito, sans-serif' }}>⏳ Regenerating page…</p>
                      <p style={{ margin: '4px 0 0', fontSize: 12, color: MUTED, fontFamily: 'Nunito, sans-serif' }}>This takes about 30–60 seconds</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Bottom download */}
      <div style={{ textAlign: 'center', padding: '0 0 60px' }}>
        <button
          onClick={handleDownloadPdf}
          disabled={downloading}
          style={{
            background: downloading ? '#ccc' : CORAL,
            color: '#fff',
            border: 'none',
            borderRadius: 50,
            padding: '16px 40px',
            fontSize: 16,
            fontWeight: 800,
            cursor: downloading ? 'not-allowed' : 'pointer',
            fontFamily: 'Nunito, sans-serif',
            boxShadow: downloading ? 'none' : '0 4px 20px rgba(232,131,106,0.35)',
          }}
        >
          {downloading ? '⏳ Generating PDF…' : '⬇ Download Spread PDF'}
        </button>
      </div>

    </div>
  )
}
