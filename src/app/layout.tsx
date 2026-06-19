import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Personalized Books | party & presents',
  description: 'Books as unique as the child you love. Personalized storybooks made just for your little one.',
  openGraph: {
    title: 'Personalized Books | party & presents',
    description: 'Books as unique as the child you love.',
    url: 'https://books.partyandpresents.com',
    siteName: 'party & presents',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
