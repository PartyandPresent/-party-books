import { BOOKS, Book } from './books'

export type CollectionConfig = {
  title: string
  subtitle: string
  description: string
  icon: string
  books: () => Book[]
  giftHeading: string
  giftPoints: string[]
  relatedLinks: { href: string; label: string }[]
}

export const COLLECTION_PAGES: Record<string, CollectionConfig> = {
  baptism: {
    title: 'Baptism Gifts',
    subtitle: 'A keepsake for a sacred milestone',
    description: "Mark this special day with a personalised book that carries their name, face, and God's promises into every page.",
    icon: '✝️',
    books: () => BOOKS.filter(b => b.occasion.includes('baptism')),
    giftHeading: 'Why personalised books make the perfect baptism gift',
    giftPoints: [
      "A lifelong keepsake that commemorates the day they were welcomed into the faith",
      "Scripture and God's promises woven into every beautifully illustrated page",
      "A gift that grows with the child, meaningful at every age",
    ],
    relatedLinks: [
      { href: '/milestones/baptism', label: 'Faith & Baptism' },
      { href: '/collections/baby-newborn', label: 'Baby & Newborn' },
      { href: '/collections/christmas', label: 'Christmas Gifts' },
    ],
  },
  birthday: {
    title: 'Birthday Gifts',
    subtitle: 'Make their birthday truly unforgettable',
    description: "A personalised book where they're the hero: their face, their name, their story. Far more memorable than any toy.",
    icon: '🎂',
    books: () => BOOKS.filter(b => b.occasion.includes('birthday')),
    giftHeading: 'Why personalised books make the best birthday gift',
    giftPoints: [
      "They're the star of every single page, their face in every scene",
      "A gift they'll reread for years, not forget in a week",
      "Far more personal and memorable than a generic toy or voucher",
    ],
    relatedLinks: [
      { href: '/milestones/birthday', label: 'Birthday Books' },
      { href: '/collections/baptism', label: 'Baptism Gifts' },
      { href: '/collections/christmas', label: 'Christmas Gifts' },
    ],
  },
  'baby-newborn': {
    title: 'Baby & Newborn',
    subtitle: 'The sweetest gift for a new arrival',
    description: 'Welcome a new baby with a personalised book that tells their story from day one, beautiful enough to display on the nursery shelf.',
    icon: '🐣',
    books: () => BOOKS.filter(b => b.recipient.includes('baby')),
    giftHeading: 'Why personalised books are the perfect newborn gift',
    giftPoints: [
      "A book that tells their story from the very beginning",
      "Beautiful enough to display on the nursery shelf as a keepsake",
      "A gift parents will treasure just as much as the child",
    ],
    relatedLinks: [
      { href: '/milestones/new-baby', label: 'New Baby' },
      { href: '/collections/baptism', label: 'Baptism Gifts' },
      { href: '/collections/birthday', label: 'Birthday Gifts' },
    ],
  },
  christmas: {
    title: 'Christmas Gifts',
    subtitle: "A gift they'll keep long after the tree comes down",
    description: "Make this Christmas magical with a personalised book that puts them at the heart of the story. Read it every Christmas Eve as a new family tradition.",
    icon: '🎄',
    books: () => BOOKS.filter(b => b.occasion.includes('christmas')),
    giftHeading: 'Why personalised books make magical Christmas gifts',
    giftPoints: [
      "So much more meaningful and lasting than another toy",
      "A keepsake from the magic of this particular Christmas",
      "Read it every Christmas Eve, a tradition that gets more precious each year",
    ],
    relatedLinks: [
      { href: '/milestones/christmas', label: 'Wedding' },
      { href: '/collections/birthday', label: 'Birthday Gifts' },
      { href: '/collections/baptism', label: 'Baptism Gifts' },
    ],
  },
}

export const MILESTONE_PAGES: Record<string, CollectionConfig> = {
  birthday: {
    title: 'Birthday Books',
    subtitle: 'A birthday gift as unique as they are',
    description: "Make their big day unforgettable with a book where they're the star of every page.",
    icon: '🎂',
    books: () => BOOKS.filter(b => b.occasion.includes('birthday')),
    giftHeading: 'Make their birthday truly special',
    giftPoints: [
      "Their face, their name, the hero of every single page",
      "A gift they'll love to reread on every future birthday",
      "So much more personal than a card and gift voucher",
    ],
    relatedLinks: [
      { href: '/collections/birthday', label: 'Birthday Gifts' },
      { href: '/milestones/baptism', label: 'Faith & Baptism' },
      { href: '/milestones/just-because', label: 'Just Because Gifts' },
    ],
  },
  baptism: {
    title: 'Faith & Baptism',
    subtitle: 'A keepsake for a sacred and joyful day',
    description: "Celebrate their baptism or christening with a personalised book filled with scripture, promises, and their beautiful face.",
    icon: '🕊️',
    books: () => BOOKS.filter(b => b.occasion.includes('baptism')),
    giftHeading: 'The perfect faith & baptism keepsake',
    giftPoints: [
      "A gift that marks the moment they were welcomed into the faith",
      "God's promises made personal, woven through every illustrated page",
      "A keepsake godparents and grandparents will love to give",
    ],
    relatedLinks: [
      { href: '/collections/baptism', label: 'Baptism Gifts' },
      { href: '/milestones/new-baby', label: 'New Baby' },
      { href: '/milestones/birthday', label: 'Birthday Books' },
    ],
  },
  'new-baby': {
    title: 'New Baby',
    subtitle: 'Welcome the newest member of the family',
    description: "A personalised book is the most thoughtful new baby gift. Something parents and child will return to again and again.",
    icon: '🐣',
    books: () => BOOKS.filter(b => b.recipient.includes('baby')),
    giftHeading: 'Why a personalised book is the perfect new baby gift',
    giftPoints: [
      "A story that begins with their very first day",
      "Beautiful custom illustrations featuring their real face",
      "A gift the parents will treasure on the nursery shelf for years",
    ],
    relatedLinks: [
      { href: '/collections/baby-newborn', label: 'Baby & Newborn' },
      { href: '/milestones/baptism', label: 'Faith & Baptism' },
      { href: '/milestones/birthday', label: 'Birthday Books' },
    ],
  },
  wedding: {
    title: 'Wedding Books',
    subtitle: 'Celebrate love with a personalised keepsake',
    description: "Mark their special wedding day with a beautiful personalised book, a gift as unique as the love story it celebrates.",
    icon: '💍',
    books: () => BOOKS.filter(b => b.occasion.includes('wedding')),
    giftHeading: 'A wedding gift that lasts a lifetime',
    giftPoints: [
      "A personalised keepsake that celebrates every detail of their big day",
      "Beautiful custom illustrations featuring the people they love",
      "A gift the couple will treasure and return to for years to come",
    ],
    relatedLinks: [
      { href: '/milestones/baptism', label: 'Faith & Baptism' },
      { href: '/milestones/birthday', label: 'Birthday Books' },
      { href: '/milestones/just-because', label: 'Just Because Gifts' },
    ],
  },
  easter: {
    title: "Father's Day",
    subtitle: "A gift that tells him exactly how you feel",
    description: "Show Dad how much he means with a personalised book that puts him at the heart of the story, a gift he'll never forget.",
    icon: '👔',
    books: () => BOOKS.filter(b => b.occasion.includes('any')),
    giftHeading: "Why a personalised book is the perfect gift for Dad",
    giftPoints: [
      "A heartfelt gift that goes far beyond a card or a tie",
      "Fully personalised with his child's face, name, and a message from you",
      "A keepsake he'll proudly display and return to again and again",
    ],
    relatedLinks: [
      { href: '/milestones/christmas', label: 'Wedding' },
      { href: '/milestones/baptism', label: 'Faith & Baptism' },
      { href: '/milestones/just-because', label: 'Just Because Gifts' },
    ],
  },
  school: {
    title: 'School Books',
    subtitle: 'Celebrate the milestone that changes everything',
    description: "Starting school is one of the biggest moments of their little life. Mark it with a personalised book that puts them right at the heart of the story.",
    icon: '🎒',
    books: () => BOOKS.filter(b => b.occasion.includes('school')),
    giftHeading: 'Why a personalised book is the perfect school gift',
    giftPoints: [
      "Their face, their name, the hero of every single page",
      "A keepsake from this once-in-a-lifetime milestone they can keep forever",
      "A gift that eases first-day nerves and makes them feel ready for anything",
    ],
    relatedLinks: [
      { href: '/milestones/birthday', label: 'Birthday Books' },
      { href: '/milestones/just-because', label: 'Just Because Gifts' },
      { href: '/collections/birthday', label: 'Birthday Gifts' },
    ],
  },
  'just-because': {
    title: 'Just Because Gifts',
    subtitle: 'No occasion needed, just love',
    description: "Surprise them with a book that's entirely about them, on any ordinary day that deserves to feel extraordinary.",
    icon: '💝',
    books: () => BOOKS.filter(b => b.occasion.includes('any')),
    giftHeading: 'Because they deserve to feel special today',
    giftPoints: [
      "No occasion needed, just a reason to show them they're loved",
      "A surprise that feels completely personal, not off-the-shelf",
      "The gift that shows you really know them and how special they are",
    ],
    relatedLinks: [
      { href: '/milestones/birthday', label: 'Birthday Books' },
      { href: '/milestones/easter', label: "Father's Day" },
      { href: '/collections/birthday', label: 'Birthday Gifts' },
    ],
  },
}
