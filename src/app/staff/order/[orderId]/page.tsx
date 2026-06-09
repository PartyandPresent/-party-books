'use client'

import { use, useState, useCallback } from 'react'

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME_ORDERS || 'dft0hfbee'

const PINK  = '#FF559C'
const BLUSH = '#FFEEF5'
const DARK  = '#1A1A1A'
const MUTED = '#888888'

function cloudinaryUrl(orderId: string, index: number, version?: number) {
  const publicId = `page_${String(index).padStart(2, '0')}`
  const versionPart = version ? `v${version}/` : ''
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${versionPart}party-books/orders/${orderId}/${publicId}.png`
}

const PAGE_LABELS = [
  'Cover', 'Dedication', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6',
  'Page 7', 'Page 8', 'Page 9', 'Page 10', 'Page 11', 'Page 12', 'Page 13',
  'Page 14', 'Page 15', 'Page 16', 'Final',
]

export default function StaffOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params)
  return <StaffOrderContent orderId={orderId} />
}

function StaffOrderContent({ orderId }: { orderId: string }) {
  const [downloading, setDownloading]             = useState(false)
  const [errors, setErrors]                       = useState<Record<number, boolean>>({})
  const [regenerating, setRegenerating]           = useState<Record<number, boolean>>({})
  const [regenErrors, setRegenErrors]             = useState<Record<number, string>>({})
  const [imageVersions, setImageVersions]         = useState<Record<number, number>>({})
  const [staffNotes, setStaffNotes]               = useState<Record<number, string>>({})

  const pages = Array.from({ length: 17 }, (_, i) => ({
    index: i,
    label: PAGE_LABELS[i] || `Page ${i}`,
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

      // Use a timestamp version to bust the CDN cache on the displayed image
      setImageVersions(v => ({ ...v, [pageIndex]: Math.round(Date.now() / 1000) }))
    } catch (err: any) {
      setRegenErrors(e => ({ ...e, [pageIndex]: err.message }))
    } finally {
      setRegenerating(r => ({ ...r, [pageIndex]: false }))
    }
  }, [orderId, staffNotes])

  return (
    <div style={{ minHeight: '100vh', background: '#F9F9F9', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: MUTED, fontWeight: 700, letterSpacing: 1 }}>PARTY & PRESENTS — STAFF REVIEW</p>
          <h1 style={{ margin: '2px 0 0', fontSize: 20, fontWeight: 800, color: DARK }}>Order #{orderId}</h1>
        </div>
        <button
          onClick={handleDownloadPdf}
          disabled={downloading}
          style={{
            background: downloading ? '#ccc' : `linear-gradient(135deg, ${PINK}, #FF3385)`,
            color: '#fff',
            border: 'none',
            borderRadius: 50,
            padding: '12px 28px',
            fontSize: 15,
            fontWeight: 800,
            cursor: downloading ? 'not-allowed' : 'pointer',
            boxShadow: downloading ? 'none' : '0 4px 16px rgba(255,85,156,0.35)',
            transition: 'all 0.2s',
          }}
        >
          {downloading ? '⏳ Generating PDF…' : '⬇ Download Spread PDF'}
        </button>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* Instructions */}
        <div style={{ background: BLUSH, borderRadius: 12, padding: '14px 20px', fontSize: 13, color: '#555', margin: '24px 0 0' }}>
          <strong style={{ color: PINK }}>Quality check:</strong> Review all 17 pages below. Click <strong>Regenerate</strong> on any page that needs to be redrawn. Once approved, click <strong>Download Spread PDF</strong>.
        </div>

        {/* Pages */}
        <div style={{ margin: '24px 0 40px' }}>
          {pages.map(({ index, label, url }) => (
            <div key={index} style={{ marginBottom: 32 }}>

              {/* Label + regenerate button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: index === 0 || index === 16 ? PINK : '#E0E0E0', color: index === 0 || index === 16 ? '#fff' : '#555', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 50, letterSpacing: 0.5 }}>
                    {index === 0 ? 'COVER' : index === 16 ? 'FINAL' : `PAGE ${index}`}
                  </span>
                  <span style={{ fontSize: 13, color: MUTED }}>{label}</span>
                  {regenerating[index] && (
                    <span style={{ fontSize: 12, color: PINK, fontWeight: 700 }}>Generating…</span>
                  )}
                  {regenErrors[index] && (
                    <span style={{ fontSize: 12, color: '#e55', fontWeight: 700 }}>⚠ {regenErrors[index]}</span>
                  )}
                </div>
                <button
                  onClick={() => handleRegenerate(index)}
                  disabled={!!regenerating[index]}
                  style={{
                    background: regenerating[index] ? '#eee' : '#fff',
                    color: regenerating[index] ? MUTED : PINK,
                    border: `1.5px solid ${regenerating[index] ? '#ddd' : PINK}`,
                    borderRadius: 50,
                    padding: '7px 18px',
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: regenerating[index] ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {regenerating[index] ? '⏳ Regenerating…' : '↻ Regenerate'}
                </button>
              </div>

              {/* Staff prompt */}
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
                  border: '1.5px solid #E0E0E0',
                  borderRadius: 8,
                  fontSize: 13,
                  color: '#333',
                  fontFamily: 'Arial, sans-serif',
                  resize: 'vertical',
                  outline: 'none',
                  lineHeight: 1.5,
                }}
              />

              {/* Spread image with fold line */}
              <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', background: '#ddd' }}>
                {errors[index] ? (
                  <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', color: MUTED, fontSize: 13 }}>
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
                {/* Fold line overlay */}
                {!errors[index] && (
                  <div style={{
                    position: 'absolute', top: 0, bottom: 0,
                    left: '50%', transform: 'translateX(-50%)',
                    width: 2,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.22), rgba(0,0,0,0.08))',
                    pointerEvents: 'none',
                  }} />
                )}
                {/* Regenerating overlay */}
                {regenerating[index] && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.6)' }}>
                    <div style={{ background: '#fff', borderRadius: 12, padding: '16px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: PINK }}>⏳ Regenerating page…</p>
                      <p style={{ margin: '4px 0 0', fontSize: 12, color: MUTED }}>This takes about 30–60 seconds</p>
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
            background: downloading ? '#ccc' : `linear-gradient(135deg, ${PINK}, #FF3385)`,
            color: '#fff',
            border: 'none',
            borderRadius: 50,
            padding: '16px 40px',
            fontSize: 16,
            fontWeight: 800,
            cursor: downloading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 20px rgba(255,85,156,0.3)',
          }}
        >
          {downloading ? '⏳ Generating PDF…' : '⬇ Download Spread PDF'}
        </button>
      </div>

    </div>
  )
}
