import { BOOKS } from '@/lib/books'
import CollectionPageLayout from '@/components/CollectionPageLayout'

export default function ByOccasionsPage() {
  return (
    <CollectionPageLayout
      title="Shop by Occasion"
      subtitle="Find the perfect book for every special moment"
      description="Whether it's a baptism, birthday, Christmas or just because — there's a personalised book for every occasion."
      icon="🎁"
      books={BOOKS}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
      ]}
      giftHeading="A personalised book for every occasion"
      giftPoints={[
        "From sacred milestones like baptisms to everyday moments of love — every occasion deserves a keepsake",
        "Each book is fully personalised with the child's face, name and a message from you",
        "A gift that stands out — not found on any shelf, made just for them",
      ]}
      relatedLinks={[
        { href: '/collections/baptism', label: 'Baptism Gifts' },
        { href: '/collections/birthday', label: 'Birthday Gifts' },
        { href: '/collections/christmas', label: 'Christmas Gifts' },
        { href: '/milestones/easter', label: "Father's Day" },
        { href: '/milestones/just-because', label: 'Just Because' },
      ]}
    />
  )
}
