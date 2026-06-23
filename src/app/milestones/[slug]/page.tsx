import { notFound } from 'next/navigation'
import { MILESTONE_PAGES } from '@/lib/collections'
import CollectionPageLayout from '@/components/CollectionPageLayout'

export default async function MilestonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const config = MILESTONE_PAGES[slug]
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
        { label: 'Milestones', href: '/#milestones' },
      ]}
      giftHeading={config.giftHeading}
      giftPoints={config.giftPoints}
      relatedLinks={config.relatedLinks}
    />
  )
}
