'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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

export default function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const { childName, senderName, selectedTitle, selectedPrice, reset } = useOrderStore()

  const isMobile = useIsMobile()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }
    verifySession()
  }, [sessionId])

  const verifySession = async () => {
    try {
      const res = await fetch(`/api/verify-payment?session_id=${sessionId}`)
      const data = await res.json()
      if (data.success) {
        setOrderDetails(data)
        setStatus('success')

        // Send confirmation email
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: data.customerName,
            customerEmail: data.email,
            childName: data.childName,
            senderName: senderName,
            bookTitle: data.bookTitle || selectedTitle,
            orderId: data.orderId,
            amountTotal: data.amountTotal,
            shippingAddress: data.shippingAddress || 'See order details',
          }),
        })

        // Fire full 17-page generation in the background — no await
        const pending = sessionStorage.getItem('pendingGeneration')
        if (pending) {
          try {
            const generationData = JSON.parse(pending)
            sessionStorage.removeItem('pendingGeneration')
            fetch('/api/generate-full-book', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...generationData,
                customerEmail: data.email,
                customerName: data.customerName,
                orderId: data.orderId,
              }),
            }).catch(err => console.error('Background generation error:', err))
          } catch (e) {
            console.error('Failed to parse pending generation data:', e)
          }
        }

        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'loading') return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 560, margin: '0 auto', padding: isMobile ? '80px 20px' : '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>⏳</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: GREEN }}>
          Confirming your order...
        </h1>
      </main>
      <Footer />
    </div>
  )

  if (status === 'error') return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 560, margin: '0 auto', padding: isMobile ? '80px 20px' : '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>😔</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: GREEN, marginBottom: 12 }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: 16, color: BODY, marginBottom: 32 }}>
          We couldn't confirm your order. Please contact us if you were charged.
        </p>
        <button
          onClick={() => router.push('/')}
          style={{ backgroundColor: CORAL, color: '#fff', border: 'none', borderRadius: 50, padding: '14px 36px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
        >
          Back to Home
        </button>
      </main>
      <Footer />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: CREAM, fontFamily: 'Nunito, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: isMobile ? '70px 16px 80px' : '70px 24px 80px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: GREEN, marginBottom: 12 }}>
            Your order is confirmed!
          </h1>
          <p style={{ fontSize: 17, color: BODY, lineHeight: 1.6 }}>
            {orderDetails?.customerName ? `Thank you, ${orderDetails.customerName.split(' ')[0]}!` : 'Thank you!'}{' '}
            We're so excited to bring {orderDetails?.childName || childName}'s book to life. 💕
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: GREEN, marginBottom: 24 }}>Order Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Order ID', value: orderDetails?.orderId || sessionId?.slice(-8).toUpperCase() },
              { label: 'Book', value: orderDetails?.bookTitle || selectedTitle },
              { label: 'Personalised for', value: orderDetails?.childName || childName },
              { label: 'Email', value: orderDetails?.email },
              { label: 'Amount Paid', value: `$${((orderDetails?.amountTotal || (selectedPrice + 9.99))).toFixed(2)}` },
              { label: 'Status', value: '✅ Payment confirmed' },
            ].map(({ label, value }) => value ? (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 14, borderBottom: '1px solid #F5F5F5' }}>
                <span style={{ fontSize: 14, color: MUTED, fontWeight: 700 }}>{label}</span>
                <span style={{ fontSize: 14, color: GREEN, fontWeight: 700, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
              </div>
            ) : null)}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 20, padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: GREEN, marginBottom: 24 }}>What happens next?</h2>
          {[
            { icon: '🎨', title: 'We generate your full book', desc: 'Our AI is already illustrating all 17 pages with your child as the star character.', time: 'Within 15 minutes' },
            { icon: '✅', title: 'Quality check', desc: 'Our team reviews every page to make sure it looks perfect.', time: '1–2 business days' },
            { icon: '🖨️', title: 'Print & bind', desc: 'Your book is printed on premium paper and hardcover bound.', time: '2–3 business days' },
            { icon: '📦', title: 'Shipped to you', desc: 'Your book is carefully packaged and shipped to your door.', time: '3–5 business days' },
          ].map(({ icon, title, desc, time }, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 3 ? 24 : 0 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, backgroundColor: BEIGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 4 : 0, marginBottom: 4 }}>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: GREEN }}>{title}</p>
                  <span style={{ fontSize: 12, color: CORAL, fontWeight: 700, backgroundColor: BEIGE, padding: '3px 10px', borderRadius: 50, alignSelf: 'flex-start' }}>{time}</span>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: BODY, lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F0FDF4', borderRadius: 16, padding: '20px 24px', marginBottom: 32, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 24 }}>📧</span>
          <div>
            <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: 15, color: '#166534' }}>Confirmation email sent!</p>
            <p style={{ margin: 0, fontSize: 14, color: '#166534', lineHeight: 1.5 }}>
              We've sent your order confirmation to {orderDetails?.email || 'your email'}.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 14 }}>
          <button
            onClick={() => router.push('/')}
            style={{ flex: 1, padding: '16px 24px', backgroundColor: CORAL, color: '#fff', border: 'none', borderRadius: 50, fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: '0 4px 20px rgba(232,131,106,0.4)' }}
          >
            🎁 Order Another Book
          </button>
          <button
            onClick={() => router.push('/')}
            style={{ flex: 1, padding: '16px 24px', backgroundColor: 'transparent', border: `2px solid ${CORAL}`, color: CORAL, borderRadius: 50, fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
          >
            ← Back to Home
          </button>
        </div>

      </main>
      <Footer />
    </div>
  )
}