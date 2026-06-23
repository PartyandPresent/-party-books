import { BOOKS } from '@/lib/books'
import CollectionPageLayout from '@/components/CollectionPageLayout'

export default function ByRecipientsPage() {
  return (
    <CollectionPageLayout
      title="Shop by Recipient"
      subtitle="Find the perfect book for your little one"
      description="Use the age filter below to find books perfectly suited for babies, toddlers or older children."
      icon="👶"
      books={BOOKS}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
      ]}
      giftHeading="Books for every stage of childhood"
      giftPoints={[
        "Our books are designed to be treasured from babyhood through childhood and beyond",
        "Every book features the child's real face, brought to life in stunning Pixar-quality illustration",
        "The perfect gift whether they're days old or celebrating their 10th birthday",
      ]}
      relatedLinks={[
        { href: '/collections/baby-newborn', label: 'Baby & Newborn' },
        { href: '/collections/birthday', label: 'Birthday Gifts' },
        { href: '/collections/baptism', label: 'Baptism Gifts' },
      ]}
    />
  )
}
