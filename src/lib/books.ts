export type Book = {
  slug: string
  title: string
  subtitle: string
  price: number
  originalPrice?: number
  coverImage: string
  previewImages: string[]
  totalPages: number
  tags: string[]
  recipient: string[]
  occasion: string[]
  description: string
  shortDesc: string
  badge?: string
  badgeColor?: string
  rating: number
  reviews: number
  featured: boolean
}

export const BOOKS: Book[] = [
  {
    slug: 'gods-promises-for-you',
    title: "God's Promises For You",
    subtitle: '17 pages of scripture made beautifully personal',
    price: 23.98,
    coverImage: 'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Cover_-_Page_0_gssekg.png',
    previewImages: [
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427840/Dedication_Page_-_Page_1_bujjhe.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_3_u2rqpp.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_4_oxlsdp.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_5_gy532g.png',
    ],
    totalPages: 17,
    tags: ['faith', 'bestseller'],
    recipient: ['baby', 'toddler', 'child'],
    occasion: ['baptism', 'birthday', 'christmas', 'easter', 'any'],
    description: "A one-of-a-kind personalized storybook where your child is the main character — with their face, name, and God's promises woven into every single page. 17 beautifully illustrated scenes, each featuring a scripture verse and your child's likeness rendered in stunning Pixar-quality art.",
    shortDesc: "Your child's face meets God's promises — 17 stunning pages of faith and love.",
    badge: 'Bestseller',
    badgeColor: '#FF559C',
    rating: 4.9,
    reviews: 248,
    featured: true,
  },
  {
    slug: 'before-you-were-born',
    title: 'Before You Were Born',
    subtitle: "A love letter before your child's first breath",
    price: 23.98,
    coverImage: 'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Cover_-_Page_0_gssekg.png',
    previewImages: [
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_3_u2rqpp.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_4_oxlsdp.png',
    ],
    totalPages: 17,
    tags: ['faith', 'new'],
    recipient: ['baby', 'newborn'],
    occasion: ['baptism', 'baby-shower', 'birthday', 'any'],
    description: "Before you took your first breath, you were already loved beyond measure. This beautiful personalized book tells your child the story of how they were dreamed of, prayed for, and chosen — long before they arrived in this world.",
    shortDesc: 'The story of how your child was loved before they even arrived.',
    badge: 'New',
    badgeColor: '#28BEEF',
    rating: 4.8,
    reviews: 64,
    featured: true,
  },
  {
    slug: 'you-are-brave',
    title: 'You Are Brave',
    subtitle: 'A personalized book of courage for your little hero',
    price: 23.98,
    coverImage: 'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Cover_-_Page_0_gssekg.png',
    previewImages: [
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_4_oxlsdp.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_5_gy532g.png',
    ],
    totalPages: 17,
    tags: ['courage', 'new'],
    recipient: ['toddler', 'child'],
    occasion: ['birthday', 'christmas', 'any'],
    description: "When the world feels too big and fears feel too real, this book reminds your child of exactly who they are — brave, strong, and never alone. Personalized with their name and face, every page is a gentle reminder that courage lives inside them.",
    shortDesc: 'A reminder that your child is braver than they believe.',
    badge: 'New',
    badgeColor: '#28BEEF',
    rating: 4.9,
    reviews: 41,
    featured: true,
  },
]

export const RECIPIENTS = [
  { label: 'Baby / Newborn', value: 'baby' },
  { label: 'Toddler', value: 'toddler' },
  { label: 'Child', value: 'child' },
]

export const OCCASIONS = [
  { label: 'Baptism / Christening', value: 'baptism' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'Christmas', value: 'christmas' },
  { label: 'Baby Shower', value: 'baby-shower' },
  { label: 'Easter', value: 'easter' },
  { label: 'Any Occasion', value: 'any' },
]

export const REVIEWS = [
  {
    name: 'Maria S.',
    location: 'Manila, PH',
    rating: 5,
    text: "We ordered this for our daughter's baptism and everyone cried happy tears. Seeing her face on every page was absolutely magical. Worth every peso!",
    book: "God's Promises For You",
    avatar: 'M',
  },
  {
    name: 'James R.',
    location: 'Cebu, PH',
    rating: 5,
    text: "Jared absolutely loves seeing himself in the book. He asks us to read it every single night. The quality is stunning — looks just like a real published book.",
    book: "God's Promises For You",
    avatar: 'J',
  },
  {
    name: 'Ana D.',
    location: 'Davao, PH',
    rating: 5,
    text: "I gave this as a birthday gift and the mom cried when she opened it. The illustrations are Pixar-level quality. Already ordering another one for Christmas!",
    book: 'Before You Were Born',
    avatar: 'A',
  },
  {
    name: 'Grace T.',
    location: 'Quezon City, PH',
    rating: 5,
    text: "The dedication page made my heart melt. Such a thoughtful, beautiful keepsake. My nephew carries it everywhere and shows everyone 'that's me in the book!'",
    book: 'You Are Brave',
    avatar: 'G',
  },
]