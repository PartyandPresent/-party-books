import { create } from 'zustand'
import { type CoverFormat, COVER_FORMAT_PRICES } from '@/lib/coverFormat'

interface OrderState {
  selectedSlug: string
  selectedTitle: string
  selectedPrice: number
  selectedCover: string
  coverFormat: CoverFormat
  childName: string
  childGender: 'girl' | 'boy' | ''
  senderName: string
  dedication: string
  siblingFullName: string
  siblingBirthDate: string
  giftDate: string
  photoDataUrl: string
  photoMimeType: string
  characterDataUrl: string
  generatedPages: string[]
  shippingDetails: {
    name: string
    email: string
    phone: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  orderId: string
  setBook: (slug: string, title: string, cover: string) => void
  setCoverFormat: (format: CoverFormat) => void
  setPersonalization: (childName: string, childGender: 'girl' | 'boy' | '', senderName: string, dedication: string, siblingFullName?: string, siblingBirthDate?: string, giftDate?: string) => void
  setPhoto: (dataUrl: string, mimeType: string) => void
  setCharacter: (dataUrl: string) => void
  setGeneratedPages: (pages: string[]) => void
  setShippingDetails: (details: OrderState['shippingDetails']) => void
  setOrderId: (id: string) => void
  reset: () => void
}

const defaultState = {
  selectedSlug: '',
  selectedTitle: '',
  selectedPrice: COVER_FORMAT_PRICES.hardcover8,
  selectedCover: '',
  coverFormat: 'hardcover8' as CoverFormat,
  childName: '',
  childGender: '' as 'girl' | 'boy' | '',
  senderName: '',
  dedication: '',
  siblingFullName: '',
  siblingBirthDate: '',
  giftDate: '',
  photoDataUrl: '',
  photoMimeType: '',
  characterDataUrl: '',
  generatedPages: [],
  shippingDetails: {
    name: '', email: '', phone: '',
    street: '', city: '', state: '', zip: '', country: '',
  },
  orderId: '',
}

export const useOrderStore = create<OrderState>((set) => ({
  ...defaultState,
  setBook: (slug, title, cover) =>
    set({ selectedSlug: slug, selectedTitle: title, selectedCover: cover }),
  setCoverFormat: (format) =>
    set({ coverFormat: format, selectedPrice: COVER_FORMAT_PRICES[format] }),
  setPersonalization: (childName, childGender, senderName, dedication, siblingFullName = '', siblingBirthDate = '', giftDate = '') =>
    set({ childName, childGender, senderName, dedication, siblingFullName, siblingBirthDate, giftDate }),
  setPhoto: (dataUrl, mimeType) =>
    set({ photoDataUrl: dataUrl, photoMimeType: mimeType }),
  setCharacter: (dataUrl) => set({ characterDataUrl: dataUrl }),
  setGeneratedPages: (pages) => set({ generatedPages: pages }),
  setShippingDetails: (details) => set({ shippingDetails: details }),
  setOrderId: (id) => set({ orderId: id }),
  reset: () => set(defaultState),
}))