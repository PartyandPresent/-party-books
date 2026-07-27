'use client'

import Image from 'next/image'
import {
  type CoverFormat,
  COVER_FORMAT_PRICES,
  COVER_FORMAT_LABELS,
  COVER_FORMAT_DESCS,
} from '@/lib/coverFormat'

interface Props {
  selected: CoverFormat
  onSelect: (format: CoverFormat) => void
  onContinue: () => void
  onBack: () => void
  bookCoverImage: string
  bookTitle: string
  isMobile?: boolean
}

const GREEN        = '#2D4A3E'
const CORAL        = '#E8836A'
const MUTED        = '#888888'
const SELECTED_CLR = '#4A3080'   // dark purple per design reference

const FORMATS: CoverFormat[] = ['hardcover8', 'softcover8', 'softcover5']

export default function CoverFormatStep({
  selected, onSelect, onContinue, onBack, bookCoverImage, bookTitle, isMobile,
}: Props) {
  return (
    <>
      {/* back link */}
      <button
        onClick={onBack}
        style={{
          background: 'none', border: 'none', color: MUTED, padding: 0,
          fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14,
          cursor: 'pointer', marginBottom: 20,
        }}
      >
        ← Previous Step
      </button>

      {/* heading + divider */}
      <h2 style={{
        fontFamily: 'Playfair Display, serif', fontSize: 26,
        fontWeight: 700, color: GREEN, margin: '0 0 12px',
      }}>
        Customize your book,
      </h2>
      <div style={{ height: 2, backgroundColor: '#E8E8E8', marginBottom: 20 }} />

      {/* sub-label */}
      <p style={{
        fontSize: 12, fontWeight: 800, color: GREEN,
        letterSpacing: 1, margin: '0 0 18px', textTransform: 'uppercase',
      }}>
        Cover Format
      </p>

      {/* format cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: isMobile ? 12 : 16,
        marginBottom: 28,
      }}>
        {FORMATS.map((fmt) => {
          const isSelected = selected === fmt
          const price      = COVER_FORMAT_PRICES[fmt]
          const label      = COVER_FORMAT_LABELS[fmt]
          const desc       = COVER_FORMAT_DESCS[fmt]

          return (
            <button
              key={fmt}
              type="button"
              onClick={() => onSelect(fmt)}
              style={{
                border: `2.5px solid ${isSelected ? SELECTED_CLR : '#E0E0E0'}`,
                borderRadius: 16,
                padding: 0,
                background: 'none',
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: isSelected
                  ? `0 0 0 3px rgba(74,48,128,0.10), 0 4px 20px rgba(74,48,128,0.12)`
                  : '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.18s ease',
                textAlign: 'left',
              }}
            >
              {/* image area with price badge */}
              <div style={{ position: 'relative', paddingTop: '125%', backgroundColor: '#F5F0E8' }}>
                <Image
                  src={bookCoverImage}
                  alt={`${label} edition of ${bookTitle}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 680px) 45vw, 300px"
                />

                {/* price badge overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  backgroundColor: isSelected ? SELECTED_CLR : 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  padding: '9px 12px',
                  textAlign: 'center',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: isMobile ? 14 : 16,
                  transition: 'background-color 0.18s ease',
                }}>
                  ${price.toFixed(2)} CAD
                </div>
              </div>

              {/* label row */}
              <div style={{
                padding: isMobile ? '12px 12px' : '14px 16px',
                backgroundColor: isSelected ? 'rgba(74,48,128,0.04)' : '#fff',
                transition: 'background-color 0.18s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  {/* radio indicator */}
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isSelected ? SELECTED_CLR : '#D0D0D0'}`,
                    backgroundColor: isSelected ? SELECTED_CLR : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}>
                    {isSelected && (
                      <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#fff' }} />
                    )}
                  </div>
                  <span style={{
                    fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                    fontSize: isMobile ? 13 : 15,
                    color: isSelected ? SELECTED_CLR : GREEN,
                    transition: 'color 0.15s ease',
                  }}>
                    {label}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'Nunito, sans-serif', fontSize: isMobile ? 11 : 12,
                  color: MUTED, margin: 0, lineHeight: 1.5,
                }}>
                  {desc}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* continue */}
      <button
        onClick={onContinue}
        style={{
          width: '100%', padding: '16px 24px',
          backgroundColor: CORAL, color: '#fff',
          border: 'none', borderRadius: 50,
          fontFamily: 'Nunito, sans-serif', fontWeight: 800,
          fontSize: 17, cursor: 'pointer', letterSpacing: 0.3,
          display: 'block',
        }}
      >
        Save &amp; Continue →
      </button>
    </>
  )
}