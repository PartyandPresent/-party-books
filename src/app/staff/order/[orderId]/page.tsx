'use client'

import { use, useState } from 'react'
import Image from 'next/image'

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME_ORDERS || 'dft0hfbee'

const PINK  = '#FF559C'
const BLUSH = '#FFEEF5'
const DARK  = '#1A1A1A'
const MUTED = '#888888'

function cloudinaryUrl(orderId: string, index: number) {
  const publicId = `page_${String(index).padStart(2, '0')}`
  return `https://res.cloudinary.com/${CLOUD}/image/upload/party-books/orders/${orderId}/${publicId}.png`
}

const PAGE_LABELS = [
  'Cover', 'Dedication', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6',
  'Page 7', 'Page 8', 'Page 9', 'Page 10', 'Page 11', 'Page 12', 'Page 13',
  'Page 14', 'Page 15', 'Page 16', 'Final',
]

export default function StaffOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params)
  const [downloading, setDownloading] = useState(false)
  const [errors, setErrors] = useState<Record<number, boolean>>({})

  const pages = Array.from({ length: 17 }, (_, i) => ({
    index: i,
    label: PAGE_LABELS[i] || `Page ${i}`,
    url: cloudinaryUrl(orderId, i),
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
    } catch (err) {
      alert('PDF generation failed. Make sure all pages are uploaded.')
    } finally {
      setDownloading(false)
    }
  }

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

      {/* Instructions */}
      <div style={{ maxWidth: 960, margin: '24px auto 0', padding: '0 24px' }}>
        <div style={{ background: BLUSH, borderRadius: 12, padding: '14px 20px', fontSize: 13, color: '#555' }}>
          <strong style={{ color: PINK }}>Quality check:</strong> Review all 17 pages below. Once approved, click <strong>Download Spread PDF</strong> — it generates the fold-effect PDF ready to send to the customer.
        </div>
      </div>

      {/* Pages */}
      <div style={{ maxWidth: 960, margin: '24px auto 40px', padding: '0 24px' }}>
        {pages.map(({ index, label, url }) => (
          <div key={index} style={{ marginBottom: 32 }}>

            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ background: index === 0 || index === 16 ? PINK : '#E0E0E0', color: index === 0 || index === 16 ? '#fff' : '#555', fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 50, letterSpacing: 0.5 }}>
                {index === 0 ? 'COVER' : index === 16 ? 'FINAL' : `PAGE ${index}`}
              </span>
              <span style={{ fontSize: 13, color: MUTED }}>{label}</span>
            </div>

            {/* Spread image with fold line */}
            <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', background: '#ddd' }}>
              {errors[index] ? (
                <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', color: MUTED, fontSize: 13 }}>
                  ⚠ Image not yet uploaded for this page
                </div>
              ) : (
                <img
                  src={url}
                  alt={label}
                  style={{ width: '100%', display: 'block' }}
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
            </div>

          </div>
        ))}
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
