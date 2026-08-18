import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Currency = 'CAD' | 'USD'

// Approximate display rate — Stripe conversion happens server-side with the same rate
export const CAD_TO_USD = 0.74

interface CurrencyStore {
  currency: Currency
  setCurrency: (c: Currency) => void
  formatPrice: (cadAmount: number) => string
}

export const useCurrency = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: 'CAD' as Currency,
      setCurrency: (currency: Currency) => set({ currency }),
      formatPrice: (cadAmount: number): string => {
        const { currency } = get()
        if (currency === 'USD') return `US$${(cadAmount * CAD_TO_USD).toFixed(2)}`
        return `CA$${cadAmount.toFixed(2)}`
      },
    }),
    { name: 'miloria-currency' }
  )
)
