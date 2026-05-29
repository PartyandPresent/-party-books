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
      <body>{children}</body>
    </html>
  )
}