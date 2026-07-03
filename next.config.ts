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
  // Prevent Next.js file tracing from bundling static book assets (backgrounds,
  // listing images, reference PNGs) into serverless functions. These are served
  // by Vercel's CDN — only .ttf/.otf fonts need to be in the function bundle
  // since compositeText.ts reads them at runtime via fs.readFileSync.
  outputFileTracingExcludes: {
    '/*': [
      'public/books/**/*.png',
      'public/books/**/*.jpg',
      'public/books/**/*.jpeg',
      'public/books/**/*.webp',
    ],
  },
}

export default nextConfig