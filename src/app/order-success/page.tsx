import { Suspense } from 'react'
import OrderSuccessContent from './OrderSuccessContent'

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif' }}>
        <p>Loading...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}