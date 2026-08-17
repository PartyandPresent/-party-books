'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useOrderStore } from '@/store/order'
import { useIsMobile } from '@/hooks/useIsMobile'

const GREEN = '#2D4A3E'
const CORAL = '#E8836A'
const BEIGE = '#F5F0E8'
const CREAM = '#FAFAF5'
const BODY = '#4A5568'
const MUTED = '#888888'

export default function CheckoutPage() {
  const router = useRouter()
  const {
    selectedTitle, selectedPrice, selectedCover,
    childName, senderName, dedication, siblingFullName, siblingBirthDate,
    photoDataUrl, selectedSlug, characterDataUrl,
    setShippingDetails, setOrderId,
  } = useOrderStore()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', city: '', state: '', zip: '', country: 'Philippines',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [step, setStep] = useState<'details' | 'payment'>('details')
  const isMobile = useIsMobile()

  const shipping = 9.99
  const total = selectedPrice + shipping

  const update = (field: string, value: string) => {
    setForm(p => ({ ...p, [field]: value }))
    setErrors(p => ({ ...p, [field]: '' }))
  }

  const validateDetails = () => {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.street.trim()) e.street = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.zip.trim()) e.zip = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleContinue = () => {
    if (!validateDetails()) return
    setShippingDetails({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      street: form.street,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
    })
    setStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedTitle,
          price: selectedPrice,
          shipping,
          childName,
          email: form.email,
          shippingDetails: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
            street: form.street,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country,
          },
        }),
      })
      const data = await res.json()
      if (data.url) {
        // Save generation data before leaving — Zustand state won't survive the Stripe redirect
        sessionStorage.setItem('pendingGeneration', JSON.stringify({
          bookSlug: selectedSlug,
          childName,
          senderName,
          dedication,
          siblingFullName,
          siblingBirthDate,
          characterBase64: characterDataUrl,
        }))
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (err: any) {
      setErrors({ payment: err.message })
      setIsProcessing(false)
    }
  }

  // ── Shared styles ──────────────────────────────────────────────
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff', borderRadius: 20,
    padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    marginBottom: 20,
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 13, fontWeight: 700,
    color: GREEN, marginBottom: 7, letterSpacing: 0.3,
  }
  const inputStyle = (err?: boolean): React.CSSProperties => ({
    width: '100%', padding: '13px 16px', borderRadius: 12,
    border: `1.5px solid ${err ? '#E53E3E' : '#E0E0E0'}`,
    fontFamily: 'Nunito, sans-serif', fontSize: 15, color: GREEN,
    outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff',
  })
  const errorText: React.CSSProperties = {
    fontSize: 12, color: '#E53E3E', marginTop: 5,
  }
  const sectionTitle: React.CSSProperties = {
    fontFamily: 'Playfair Display, serif', fontSize: 20,
    fontWeight: 700, color: GREEN, marginBottom: 20,
  }
  const row2: React.CSSProperties = {
    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 18,
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '70px 16px 80px' : '70px 24px 80px' }}>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 24 : 30, fontWeight: 700, color: GREEN, marginBottom: 8 }}>
          Checkout
        </h1>
        <p style={{ fontSize: 15, color: BODY, marginBottom: 36 }}>
          You're one step away from {childName}'s magical book!
        </p>

        {/* Progress steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 }}>
          {['Shipping Details', 'Payment'].map((label, i) => {
            const num = i + 1
            const active = (step === 'details' && i === 0) || (step === 'payment' && i === 1)
            const done = step === 'payment' && i === 0
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    backgroundColor: active || done ? CORAL : '#E0E0E0',
                    color: '#fff', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontWeight: 800, fontSize: 14,
                  }}>
                    {done ? '✓' : num}
                  </div>
                  <span style={{ fontSize: isMobile ? 12 : 14, fontWeight: active ? 800 : 600, color: active || done ? CORAL : MUTED }}>
                    {label}
                  </span>
                </div>
                {i === 0 && (
                  <div style={{ width: isMobile ? 24 : 40, height: 2, backgroundColor: done ? CORAL : '#E0E0E0', margin: '0 12px' }} />
                )}
              </div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: 24, alignItems: 'start' }}>

          {/* LEFT — Form */}
          <div>
            {step === 'details' && (
              <div style={cardStyle}>
                <h2 style={sectionTitle}>Shipping Details</h2>

                <div style={row2}>
                  <div>
                    <label style={labelStyle}>First Name <span style={{ color: CORAL }}>*</span></label>
                    <input style={inputStyle(!!errors.firstName)} value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Maria" />
                    {errors.firstName && <p style={errorText}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name <span style={{ color: CORAL }}>*</span></label>
                    <input style={inputStyle(!!errors.lastName)} value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Santos" />
                    {errors.lastName && <p style={errorText}>{errors.lastName}</p>}
                  </div>
                </div>

                <div style={row2}>
                  <div>
                    <label style={labelStyle}>Email Address <span style={{ color: CORAL }}>*</span></label>
                    <input style={inputStyle(!!errors.email)} value={form.email} onChange={e => update('email', e.target.value)} placeholder="maria@email.com" type="email" />
                    {errors.email && <p style={errorText}>{errors.email}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input style={inputStyle()} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+63 912 345 6789" type="tel" />
                  </div>
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>Street Address <span style={{ color: CORAL }}>*</span></label>
                  <input style={inputStyle(!!errors.street)} value={form.street} onChange={e => update('street', e.target.value)} placeholder="123 Rizal Street, Barangay San Antonio" />
                  {errors.street && <p style={errorText}>{errors.street}</p>}
                </div>

                <div style={{ ...row2, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr' }}>
                  <div>
                    <label style={labelStyle}>City <span style={{ color: CORAL }}>*</span></label>
                    <input style={inputStyle(!!errors.city)} value={form.city} onChange={e => update('city', e.target.value)} placeholder="Manila" />
                    {errors.city && <p style={errorText}>{errors.city}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Province / State</label>
                    <input style={inputStyle()} value={form.state} onChange={e => update('state', e.target.value)} placeholder="Metro Manila" />
                  </div>
                  <div>
                    <label style={labelStyle}>ZIP Code <span style={{ color: CORAL }}>*</span></label>
                    <input style={inputStyle(!!errors.zip)} value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="1000" />
                    {errors.zip && <p style={errorText}>{errors.zip}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>Country</label>
                  <select
                    style={{ ...inputStyle(), appearance: 'none' }}
                    value={form.country}
                    onChange={e => update('country', e.target.value)}
                  >
                    <option>Philippines</option>
                    <option>Australia</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Singapore</option>
                    <option>New Zealand</option>
                    <option>Other</option>
                  </select>
                </div>

                <button
                  onClick={handleContinue}
                  style={{
                    width: '100%', padding: '16px 24px', backgroundColor: CORAL,
                    color: '#fff', border: 'none', borderRadius: 50,
                    fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                    fontSize: 17, cursor: 'pointer', letterSpacing: 0.3,
                  }}
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div>
                {/* Shipping summary */}
                <div style={{ ...cardStyle, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 0 }}>
                    <div>
                      <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: MUTED, letterSpacing: 0.5 }}>SHIPPING TO</p>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: GREEN }}>
                        {form.firstName} {form.lastName}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: 14, color: BODY }}>
                        {form.street}, {form.city}, {form.zip}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: 14, color: BODY }}>{form.country}</p>
                    </div>
                    <button
                      onClick={() => setStep('details')}
                      style={{ background: 'none', border: `1.5px solid #E0E0E0`, borderRadius: 50, padding: '8px 18px', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, color: MUTED, cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Payment card */}
                <div style={cardStyle}>
                  <h2 style={sectionTitle}>Payment</h2>

                  <div style={{
                    backgroundColor: '#F8F9FF', borderRadius: 14,
                    padding: '20px 20px', marginBottom: 24,
                    border: '1.5px solid #E8E8FF',
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}>
                    <div style={{ fontSize: 32 }}>🔒</div>
                    <div>
                      <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: 14, color: GREEN }}>
                        Secure payment via Stripe
                      </p>
                      <p style={{ margin: 0, fontSize: 13, color: BODY }}>
                        You'll be redirected to Stripe's secure checkout to complete your payment.
                        We never store your card details.
                      </p>
                    </div>
                  </div>

                  {/* Accepted cards */}
                  <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                    {['💳 Visa', '💳 Mastercard', '💳 GCash', '💳 Maya'].map(card => (
                      <div key={card} style={{
                        backgroundColor: '#F5F5F5', borderRadius: 8,
                        padding: '6px 14px', fontSize: 13, fontWeight: 700, color: BODY,
                      }}>
                        {card}
                      </div>
                    ))}
                  </div>

                  {errors.payment && (
                    <p style={{ color: '#E53E3E', fontSize: 14, marginBottom: 16 }}>
                      {errors.payment}
                    </p>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    style={{
                      width: '100%', padding: '18px 24px',
                      background: isProcessing ? '#ccc' : CORAL,
                      color: '#fff', border: 'none', borderRadius: 50,
                      fontFamily: 'Nunito, sans-serif', fontWeight: 800,
                      fontSize: 18, cursor: isProcessing ? 'not-allowed' : 'pointer',
                      boxShadow: isProcessing ? 'none' : '0 4px 20px rgba(232,131,106,0.4)',
                      letterSpacing: 0.3,
                    }}
                  >
                    {isProcessing ? '⏳ Redirecting to Stripe...' : `💳 Pay $${total.toFixed(2)} Securely`}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: 13, color: MUTED, marginTop: 16 }}>
                    🛡️ 100% secure · 30-day satisfaction guarantee
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div>
            <div style={{ ...cardStyle, position: isMobile ? 'static' : 'sticky', top: 100 }}>
              <h2 style={{ ...sectionTitle, marginBottom: 16 }}>Order Summary</h2>

              {/* Book */}
              <div style={{ display: 'flex', gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: '1.5px solid #F0F0F0' }}>
                {selectedCover && (
                  <Image
                    src={selectedCover}
                    alt={selectedTitle}
                    width={64}
                    height={64}
                    style={{ borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: 15, color: GREEN }}>{selectedTitle}</p>
                  <p style={{ margin: '0 0 4px', fontSize: 13, color: MUTED }}>Personalised for {childName}</p>
                  <p style={{ margin: 0, fontSize: 13, color: MUTED }}>17 pages · Hardcover</p>
                </div>
              </div>

              {/* Child photo preview */}
              {photoDataUrl && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: '1.5px solid #F0F0F0' }}>
                  <img
                    src={photoDataUrl}
                    alt="Child"
                    style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 700, color: MUTED, letterSpacing: 0.5 }}>PERSONALISED FOR</p>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: GREEN }}>{childName}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 13, color: BODY }}>From: {senderName}</p>
                  </div>
                </div>
              )}

              {/* Dedication */}
              {dedication && (
                <div style={{ backgroundColor: '#FFFBF0', borderLeft: '3px solid #FFD700', borderRadius: '0 10px 10px 0', padding: '10px 14px', marginBottom: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, margin: '0 0 4px', letterSpacing: 0.5 }}>DEDICATION</p>
                  <p style={{ fontSize: 13, color: BODY, margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>"{dedication}"</p>
                </div>
              )}

              {/* Price breakdown */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, color: BODY }}>Book</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>${selectedPrice.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, color: BODY }}>Shipping</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>${shipping.toFixed(2)}</span>
                </div>
                <div style={{ height: 1, backgroundColor: '#F0F0F0', margin: '14px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: GREEN }}>Total</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: CORAL }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust signals */}
              <div style={{ backgroundColor: BEIGE, borderRadius: 12, padding: '14px 16px' }}>
                {[
                  { icon: '🛡️', text: '100% satisfaction guarantee' },
                  { icon: '📦', text: 'Ships in 1–3 business days' },
                  { icon: '🎨', text: 'Illustrated just for you' },
                  { icon: '💝', text: 'Perfect keepsake gift' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, fontSize: 13, color: BODY, fontWeight: 600 }}>
                    <span>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}