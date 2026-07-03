import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Background/ref PNGs are fetched at runtime via URL (Vercel CDN), not read
  // from the filesystem, so exclude them from the function bundle entirely.
  // Fonts (.ttf/.otf) and the logo ARE read via fs at runtime — include them.
  outputFileTracingExcludes: {
    '/*': [
      'public/books/**/*.png',
      'public/books/**/*.jpg',
      'public/books/**/*.jpeg',
      'public/books/**/*.webp',
    ],
  },
  outputFileTracingIncludes: {
    '/api/*': [
      'public/books/**/*.ttf',
      'public/books/**/*.otf',
      'public/Final_Logo_White.png',
    ],
  },
}

export default nextConfig