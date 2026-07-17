'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useOrderStore } from '@/store/order'
import { BOOKS } from '@/lib/books'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const BEIGE = '#F5F0E8'
const CREAM = '#FAFAF5'
const BODY = '#4A5568'
const MUTED = '#888888'

export default function PersonalizePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const book = BOOKS.find(b => b.slug === slug)

  const [step, setStep] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoMime, setPhotoMime] = useState<string>('')
  const [photoError, setPhotoError] = useState('')
  const [childName, setChildName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [dedication, setDedication] = useState('')
  const [siblingFullName, setSiblingFullName] = useState('')
  const [siblingBirthDate, setSiblingBirthDate] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ childName?: string; senderName?: string }>({})

  const isYwfCf = slug === 'you-were-here-first-child-focus'

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setBook, setPhoto, setPersonalization } = useOrderStore()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (book) setBook(book.slug, book.title, book.price, book.coverImage)
  }, [book, setBook])

  const processFile = (file: File) => {
    setPhotoError('')
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
    if (!allowed.includes(file.type)) { setPhotoError('Please upload a JPG, PNG, WebP, or HEIC photo.'); return }
    if (file.size > 10 * 1024 * 1024) { setPhotoError('Photo must be under 10MB.'); return }
    const reader = new FileReader()
    reader.onload = (e) => { setPhotoPreview(e.target?.result as string); setPhotoMime(file.type) }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }, [])

  const goToStep2 = () => {
    if (!photoPreview) { setPhotoError('Please upload a photo of the child first.'); return }
    setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToStep3 = () => {
    const errors: { childName?: string; senderName?: string } = {}
    if (!childName.trim()) errors.childName = "Child's name is required."
    if (!senderName.trim()) errors.senderName = 'Your name is required.'
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return
    setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGenerate = () => {
    setPhoto(photoPreview!, photoMime)
    setPersonalization(childName.trim(), senderName.trim(), dedication.trim(), siblingFullName.trim(), siblingBirthDate)
    router.push('/preview')
  }

  if (!book) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif', color: BODY }}>
      Book not found.
    </div>
  )

  // ── Shared styles ──────────────────────────────────────────────
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff', borderRadius: 20,
    padding: isMobile ? '28px 20px' : '36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  }
  const headingStyle: React.CSSProperties = {
    fontFamily: 'Playfair Display, serif', fontSize: 26,
    fontWeight: 700, color: GREEN, marginBottom: 8,
  }
  const subStyle: React.CSSProperties = {
    fontSize: 15, color: BODY, marginBottom: 28, lineHeight: 1.5,
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 13, fontWeight: 700,
    color: GREEN, marginBottom: 8, letterSpacing: 0.3,
  }
  const inputStyle = (err?: boolean): React.CSSProperties => ({
    width: '100%', padding: '13px 16px', borderRadius: 12,
    border: `1.5px solid ${err ? '#E53E3E' : '#E0E0E0'}`,
    fontFamily: 'Nunito, sans-serif', fontSize: 15, color: GREEN,
    outline: 'none', boxSizing: 'border-box',
  })
  const errorText: React.CSSProperties = { fontSize: 13, color: '#E53E3E', marginTop: 6 }
  const primaryBtn: React.CSSProperties = {
    width: '100%', padding: '16px 24px', backgroundColor: CORAL,
    color: '#fff', border: 'none', borderRadius: 50,
    fontFamily: 'Nunito, sans-serif', fontWeight: 800,
    fontSize: 17, cursor: 'pointer', marginTop: 32, letterSpacing: 0.3,
  }
  const backBtn: React.CSSProperties = {
    background: 'none', border: 'none', color: MUTED,
    fontFamily: 'Nunito, sans-serif', fontWeight: 700,
    fontSize: 14, cursor: 'pointer', marginBottom: 20, padding: 0,
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 680, margin: '0 auto', padding: isMobile ? '90px 16px 80px' : '90px 24px 80px' }}>

        {/* Book strip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          backgroundColor: BEIGE, borderRadius: 14, padding: '14px 18px',
          marginBottom: 32, flexWrap: 'nowrap', overflow: 'hidden',
        }}>
          <Image
            src={book.cardImage ?? book.coverImage}
            alt={book.title}
            width={48}
            height={48}
            style={{ borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 11, color: MUTED, fontWeight: 700, margin: 0, letterSpacing: 0.5 }}>PERSONALIZING</p>
            <p style={{
              fontSize: 15, fontWeight: 800, color: GREEN, margin: '2px 0 0',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {book.title}
            </p>
          </div>
          <p style={{ flexShrink: 0, fontWeight: 800, fontSize: 17, color: CORAL, margin: 0 }}>
            ${book.price.toFixed(2)}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 48 }}>
          {['Upload Photo', 'Your Message', 'Review Order'].map((label, i) => {
            const num = i + 1
            const active = step === num
            const done = step > num
            return (
              <div key={num} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: done ? 'pointer' : 'default' }}
                  onClick={() => done && setStep(num)}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    backgroundColor: active || done ? CORAL : '#E0E0E0',
                    color: active || done ? '#fff' : MUTED,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 15,
                  }}>
                    {done ? '✓' : num}
                  </div>
                  <span style={{
                    fontSize: isMobile ? 10 : 12, fontWeight: active ? 800 : 600,
                    color: active || done ? CORAL : MUTED,
                    whiteSpace: isMobile ? 'normal' : 'nowrap',
                    textAlign: 'center', maxWidth: isMobile ? 52 : 'none',
                  }}>
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div style={{
                    width: isMobile ? 24 : 60, height: 2,
                    backgroundColor: done ? CORAL : '#E0E0E0',
                    margin: isMobile ? '0 4px' : '0 8px', marginBottom: 20, flexShrink: 0,
                  }} />
                )}
              </div>
            )
          })}
        </div>

        {/* ── STEP 1: Photo Upload ── */}
        {step === 1 && (
          <div style={cardStyle}>
            <h2 style={headingStyle}>Upload a photo</h2>
            <p style={subStyle}>
              Our AI will transform this photo into a custom illustrated character — the star of the book!
              Use a clear, well-lit face photo for best results.
            </p>

            {!photoPreview ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2.5px dashed ${isDragging ? CORAL : '#D0D0D0'}`,
                  borderRadius: 16,
                  backgroundColor: isDragging ? BEIGE : CREAM,
                  padding: '48px 24px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
                <p style={{ fontWeight: 800, color: GREEN, fontSize: 16, margin: '0 0 8px' }}>
                  Drag & drop a photo here
                </p>
                <p style={{ color: MUTED, fontSize: 14, margin: '0 0 20px' }}>
                  or click to browse your files
                </p>
                <div style={{
                  backgroundColor: CORAL, color: '#fff', borderRadius: 50,
                  padding: '10px 28px', fontWeight: 800, fontSize: 14,
                }}>
                  Choose Photo
                </div>
                <p style={{ color: MUTED, fontSize: 12, marginTop: 16 }}>
                  JPG, PNG, WebP or HEIC · Max 10MB
                </p>
              </div>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center',
              }}>
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    width: 220, height: 220, objectFit: 'cover',
                    borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    display: 'block',
                  }}
                />
                <p style={{ color: '#22C55E', fontWeight: 800, fontSize: 14, marginTop: 14 }}>
                  ✓ Photo uploaded successfully!
                </p>
                <button
                  onClick={() => { setPhotoPreview(null); setPhotoMime('') }}
                  style={{
                    background: 'none', border: '1.5px solid #E0E0E0', borderRadius: 50,
                    padding: '8px 22px', fontFamily: 'Nunito, sans-serif', fontWeight: 700,
                    fontSize: 13, color: MUTED, cursor: 'pointer', marginTop: 8,
                  }}
                >
                  Use a different photo
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {photoError && (
              <p style={{ fontSize: 13, color: '#E53E3E', marginTop: 16, textAlign: 'center' }}>
                {photoError}
              </p>
            )}

            <div style={{
              marginTop: 24, backgroundColor: '#F0FDF4', borderRadius: 12,
              padding: '12px 16px', display: 'flex', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <p style={{ fontSize: 13, color: '#166534', margin: 0, lineHeight: 1.5 }}>
                <strong>Tip:</strong> A front-facing photo with good lighting gives the best AI results.
                Avoid sunglasses or hats.
              </p>
            </div>

            <button style={primaryBtn} onClick={goToStep2}>
              Continue — Add Your Message →
            </button>
          </div>
        )}

        {/* ── STEP 2: Personalisation Form ── */}
        {step === 2 && (
          <div style={cardStyle}>
            <button style={backBtn} onClick={() => setStep(1)}>← Back</button>
            <h2 style={headingStyle}>Personalise the book</h2>
            <p style={subStyle}>
              These details will be woven into the story — making it truly one of a kind.
            </p>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>
                Child's first name <span style={{ color: CORAL }}>*</span>
              </label>
              <input
                style={inputStyle(!!fieldErrors.childName)}
                type="text"
                placeholder="e.g. Sophia"
                maxLength={14}
                value={childName}
                onChange={(e) => {
                  setChildName(e.target.value)
                  setFieldErrors(p => ({ ...p, childName: undefined }))
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                {fieldErrors.childName
                  ? <p style={errorText}>{fieldErrors.childName}</p>
                  : <span />
                }
                <span style={{ fontSize: 12, color: MUTED }}>{childName.length}/14</span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>
                Your name (from whom) <span style={{ color: CORAL }}>*</span>
              </label>
              <input
                style={inputStyle(!!fieldErrors.senderName)}
                type="text"
                placeholder="e.g. Mum & Dad"
                maxLength={30}
                value={senderName}
                onChange={(e) => {
                  setSenderName(e.target.value)
                  setFieldErrors(p => ({ ...p, senderName: undefined }))
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                {fieldErrors.senderName
                  ? <p style={errorText}>{fieldErrors.senderName}</p>
                  : <span />
                }
                <span style={{ fontSize: 12, color: MUTED }}>{senderName.length}/30</span>
              </div>
            </div>

            {isYwfCf && (
              <>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>
                    New baby's full name{' '}
                    <span style={{ color: MUTED, fontWeight: 600 }}>(optional)</span>
                  </label>
                  <input
                    style={inputStyle()}
                    type="text"
                    placeholder="e.g. Emma Rose"
                    maxLength={40}
                    value={siblingFullName}
                    onChange={(e) => setSiblingFullName(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                    <span style={{ fontSize: 12, color: MUTED }}>{siblingFullName.length}/40</span>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>
                    Baby's date of birth{' '}
                    <span style={{ color: MUTED, fontWeight: 600 }}>(optional)</span>
                  </label>
                  <input
                    style={inputStyle()}
                    type="date"
                    value={siblingBirthDate}
                    onChange={(e) => setSiblingBirthDate(e.target.value)}
                  />
                  <p style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>
                    Leave blank if the baby hasn't arrived yet — you can personalise this page later.
                  </p>
                </div>
              </>
            )}

            <div>
              <label style={labelStyle}>
                Dedication message{' '}
                <span style={{ color: MUTED, fontWeight: 600 }}>(optional)</span>
              </label>
              <textarea
                style={{ ...inputStyle(), height: 110, resize: 'vertical', lineHeight: 1.6 }}
                placeholder="e.g. To our darling Sophia — may you always know how deeply you are loved. ❤️"
                maxLength={200}
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                <span style={{ fontSize: 12, color: MUTED }}>{dedication.length}/200</span>
              </div>
            </div>

            <button style={primaryBtn} onClick={goToStep3}>
              Continue — Review Order →
            </button>
          </div>
        )}

        {/* ── STEP 3: Review Order ── */}
        {step === 3 && (
          <div style={cardStyle}>
            <button style={backBtn} onClick={() => setStep(2)}>← Back</button>
            <h2 style={headingStyle}>Review your order</h2>
            <p style={subStyle}>Everything look right? Then let's bring the magic to life!</p>

            {/* Photo + name + from */}
            <div style={{
              display: 'flex', gap: 20, marginBottom: 28,
              backgroundColor: BEIGE, borderRadius: 16, padding: 20,
              alignItems: 'center',
            }}>
              <img
                src={photoPreview!}
                alt="Child"
                style={{
                  width: 90, height: 90, objectFit: 'cover',
                  borderRadius: 12, flexShrink: 0,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                }}
              />
              <div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.5 }}>
                    CHILD'S NAME
                  </span>
                  <p style={{ margin: '2px 0 0', fontWeight: 800, fontSize: 17, color: GREEN }}>
                    {childName}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.5 }}>
                    FROM
                  </span>
                  <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: 15, color: BODY }}>
                    {senderName}
                  </p>
                </div>
                {isYwfCf && siblingFullName && (
                  <div style={{ marginTop: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.5 }}>
                      NEW BABY'S NAME
                    </span>
                    <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: 15, color: BODY }}>
                      {siblingFullName}
                    </p>
                  </div>
                )}
                {isYwfCf && siblingBirthDate && (
                  <div style={{ marginTop: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: 0.5 }}>
                      DATE OF BIRTH
                    </span>
                    <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: 15, color: BODY }}>
                      {new Date(siblingBirthDate + 'T00:00:00').toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Dedication */}
            {dedication.trim() && (
              <div style={{
                backgroundColor: '#FFFBF0',
                borderLeft: '4px solid #FFD700',
                borderRadius: '0 12px 12px 0',
                padding: '14px 18px', marginBottom: 28,
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, margin: '0 0 6px', letterSpacing: 0.5 }}>
                  DEDICATION
                </p>
                <p style={{ fontSize: 15, color: BODY, margin: 0, fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{dedication}"
                </p>
              </div>
            )}

            {/* Order summary */}
            <div style={{ border: '1.5px solid #E8E8E8', borderRadius: 14, overflow: 'hidden', marginBottom: 28 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 20px', borderBottom: '1.5px solid #E8E8E8',
              }}>
                <Image
                  src={book.cardImage ?? book.coverImage}
                  alt={book.title}
                  width={56}
                  height={56}
                  style={{ borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: GREEN }}>{book.title}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 13, color: MUTED }}>
                    Personalised hardcover · 17 pages
                  </p>
                </div>
                <p style={{ fontWeight: 800, fontSize: 18, color: GREEN, margin: 0, flexShrink: 0 }}>
                  ${book.price.toFixed(2)}
                </p>
              </div>
              <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: MUTED }}>Shipping</span>
                <span style={{ fontSize: 14, color: BODY, fontWeight: 700 }}>Calculated at checkout</span>
              </div>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
              {[
                { icon: '🎨', text: 'AI-generated just for you' },
                { icon: '🛡️', text: '100% satisfaction guarantee' },
                { icon: '📦', text: 'Ships in 3–5 business days' },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 13, color: BODY, fontWeight: 600,
                }}>
                  <span>{icon}</span>{text}
                </div>
              ))}
            </div>

            {/* Generate button */}
            <button
              style={{
                ...primaryBtn,
                fontSize: 18,
                padding: '18px 24px',
                backgroundColor: CORAL,
                boxShadow: '0 4px 20px rgba(232,131,106,0.4)',
              }}
              onClick={handleGenerate}
            >
              ✨ Generate My Book
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: MUTED, marginTop: 16 }}>
              This will take about 60 seconds while our AI works its magic
            </p>
          </div>
        )}

      </main>
      <Footer />
    </div>
  )
}