export type CoverFormat = 'hardcover8' | 'softcover8' | 'softcover5'

export const COVER_FORMAT_PRICES: Record<CoverFormat, number> = {
  hardcover8: 49.99,
  softcover8: 39.99,
  softcover5: 34.99,
}

export const COVER_FORMAT_LABELS: Record<CoverFormat, string> = {
  hardcover8: 'Hard Cover 8"',
  softcover8: 'Soft Cover 8"',
  softcover5: 'Soft Cover 5"',
}

export const COVER_FORMAT_DESCS: Record<CoverFormat, string> = {
  hardcover8: 'Premium rigid cover, 8×8 inch — beautifully durable.',
  softcover8: 'Flexible cover, 8×8 inch — same quality printing inside.',
  softcover5: 'Flexible cover, 5×5 inch — compact and lightweight.',
}