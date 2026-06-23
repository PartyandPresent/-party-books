import { notFound } from 'next/navigation'
import { COLLECTION_PAGES } from '@/lib/collections'
import CollectionPageLayout from '@/components/CollectionPageLayout'

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = COLLECTION_PAGES[slug]
  if (!config) notFound()

  return (
    <CollectionPageLayout
      title={config.title}
      subtitle={config.subtitle}
      description={config.description}
      icon={config.icon}
      books={config.books()}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
      ]}
      giftHeading={config.giftHeading}
      giftPoints={config.giftPoints}
      relatedLinks={config.relatedLinks}
    />
  )
}
