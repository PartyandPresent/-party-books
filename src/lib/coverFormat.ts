export type CoverFormat = 'hardcover' | 'softcover'

// Single source of truth for cover format prices — every book in the personalization
// flow reads from here. To change pricing, update these two values only.
//
// TODO (pricing reconciliation): PDP product pages currently show $23.98 CAD (book.price).
// Once this Cover Format step is live, PDP prices should be updated to read
// "From $39.99 CAD" (or similar) to match the softcover floor price.
// Do NOT change this automatically — reconcile with the team before updating PDPs.
export const COVER_FORMAT_PRICES: Record<CoverFormat, number> = {
  hardcover: 39.99,
  softcover:  29.99,
}

export const COVER_FORMAT_LABELS: Record<CoverFormat, string> = {
  hardcover: 'Hardbound',
  softcover: 'Softbound',
}

export const COVER_FORMAT_DESCS: Record<CoverFormat, string> = {
  hardcover: 'Premium rigid cover with lay-flat pages — beautifully durable.',
  softcover: 'Lightweight flexible cover with the same quality printing inside.',
}