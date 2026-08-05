// â"€â"€â"€ Listing image standard (10-slot template) â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
//
// Every NEW book added to the site must supply a `listingImages` object with
// all 10 of the following named slots, in this fixed order. The product-page
// gallery renders them in slot order (1 â†’ 10).
//
// SLOT  KEY                      PURPOSE
//  1    heroLifestyle            Hero lifestyle photo — the primary "hero" shot
//  2    secondaryLifestyle       Second lifestyle shot (different age/setting)
//  3    calloutPersonalization   Feature callout: custom character + child's name
//  4    occasionFraming          Occasion / use-case framing (e.g. flower girl ask)
//  5    calloutDedication        Feature callout: dedication page
//  6    themeFraming             Theme / emotional framing shot
//  7    interiorSpread           Interior page style showcase (illustration spread)
//  8    formatOptions            Format options (softcover vs. hardcover, etc.)
//  9    sizeRuler                Size options with measurement reference (ruler)
// 10    sizeInHand               Size comparison — in-hand scale reference
//
// FOLDER CONVENTION:
//   public/books/{slug}/listings/
//     01-lifestyle-hero.png
//     02-lifestyle-secondary.png
//     03-callout-personalization.png
//     04-occasion-framing.png
//     05-callout-dedication.png
//     06-theme-framing.png
//     07-interior-spread.png
//     08-format-options.png
//     09-size-ruler.png
//     10-size-in-hand.png
//
// NOTE: "God's Promises For You" predates this standard and uses the legacy
// `previewImages` array instead. Do NOT retrofit it. For every book after
// "Before the Music Plays", use `listingImages` only — not `previewImages`.
//
// REQUIRED 11th FIELD — cardImage (separate from the gallery):
//   Every new book must ALSO supply a `cardImage` path — a clean, flat,
//   book-only cover mockup (no lifestyle context, no child holding it).
//   This is the image used on homepage cards, collection grids, and
//   product listing thumbnails. It is intentionally SEPARATE from gallery
//   slot 1 (heroLifestyle), which is a lifestyle shot used only on the
//   product detail page gallery.
//
//   File convention:  public/books/{slug}/card-cover.png
//   Config field:     cardImage: '/books/{slug}/card-cover.png'

export interface BookListingImages {
  heroLifestyle: string           // slot 1
  secondaryLifestyle: string      // slot 2
  calloutPersonalization: string  // slot 3
  occasionFraming: string         // slot 4
  calloutDedication: string       // slot 5
  themeFraming: string            // slot 6
  interiorSpread: string          // slot 7
  formatOptions: string           // slot 8
  sizeRuler: string               // slot 9
  sizeInHand: string              // slot 10
}

export type Book = {
  slug: string
  title: string
  subtitle: string
  price: number
  originalPrice?: number
  coverImage: string
  cardImage?: string              // clean flat cover mockup for cards/grids; falls back to coverImage
  previewImages: string[]         // legacy — God's Promises only; new books use listingImages
  listingImages?: BookListingImages
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
  highlights?: string[]           // bullet points shown in "About This Book" section
  accordionContent?: {            // per-product copy for info-panel accordions; unset â†’ shows TODO placeholders
    aboutStory: string
    howPersonalized: string
    sizeQuality: string
  }
  pagePrompts?: string[]
  characterPrompt?: string
  characterConsistencyNote?: string
  coverLogoStyle?: 'white' | 'color'
  // Overrides the default preview indices [0, 2, 3, totalPages-1] for books
  // whose dedication or notable pages live at non-standard positions.
  previewPageIndices?: [number, number, number, number]
  // Default text shown on the dedication page when the customer provides no custom message.
  // May contain [CHILD_NAME] — it is pre-resolved before rendering.
  defaultDedication?: string
}

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find(b => b.slug === slug)
}

// â"€â"€â"€ Flower Girl book constants â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

export const FLOWER_GIRL_CHARACTER_PROMPT = `Use the uploaded child's photo as the main character reference.

Transform the child from the photo into a full-body premium soft 3D animated flower girl character. Keep the child fully recognizable — preserve their exact face shape, skin tone, hair color, hair texture, hairstyle, eye shape, age, and overall likeness from the photo.

COPY EXACTLY FROM THE PHOTO:
- FACE: same face shape, same eyes, same nose, same lips, same cheeks — faithful likeness, not a generic child
- SKIN TONE: copy exact skin tone — do not lighten, darken, or alter in any way
- HAIR: copy exact hair color, length, texture, and hairstyle — curly, straight, coils, braids, whatever the child has
- GENDER: match exactly
- FRECKLES or MARKS: include any visible facial features

POSE: Full body standing in a gentle 3/4 pose. Sweet innocent smile. Big beautiful 3D eyes with soft iris detail and gentle natural catchlights. Soft rounded rosy cheeks. Warm childlike expression.

OUTFIT: Ivory or cream flower girl dress with soft tulle skirt, delicate floral details, short flutter sleeves, blush pink ribbon sash or bow at the waist. Simple white mary jane wedding shoes. Child holds a small woven wicker petal basket filled with blush pink flower petals in one hand.

ART STYLE — CRITICAL: Premium high-end soft 3D children's book illustration — the same quality as the best Pixar/Disney animated characters, but rendered with a SOFT, WARM, MATTE, PAINTERLY feel:
- SOFT DIFFUSE WARM LIGHTING: gentle all-around warmth that wraps the character softly — NOT dramatic theatrical lighting, NOT hard shadows from one side
- SMOOTH MATTE SKIN: natural warm skin tones with subtle rosy warmth on cheeks, nose tip, and chin — NO harsh bright specular highlights, NO shiny overexposed skin patches
- SOFT warm glow gently outlining the hair edges and shoulders for gentle dimensional depth
- Highly detailed 3D hair with natural texture, volume, and soft individual strand quality
- Big rounded 3D eyes with beautiful soft iris detail, gentle natural catchlights, and long soft lashes
- Overall quality: smooth, warm, matte, soft, premium — like a beautifully crafted collectible figurine, rendered softly and warmly in 3D

This must NOT look like a flat 2D illustration or sticker. It must be fully 3D with soft warm depth. Not harsh, not over-lit, not too shiny.

BACKGROUND: Plain clean warm cream. No scenery, no props except the basket. No text. No decorative elements.

FORMAT: Full body head to toe. Character centered. Clear space all sides.`

const FLOWER_GIRL_CONSISTENCY_NOTE = `CRITICAL — CHARACTER MUST MATCH THE REFERENCE IMAGE: The first image provided is the flower girl character reference. Use the EXACT same child — identical face, identical hair color and style, identical skin tone. Unless this page prompt explicitly says the character is in pajamas or sleeping clothes, always show her in the identical ivory cream flower girl dress with blush pink sash and small wedding shoes. If the page specifies pajamas or sleeping clothes, change the outfit accordingly while keeping her face, hair, and skin tone perfectly identical to the reference. Do not substitute a generic character. Do not alter their appearance in any way.`

// â"€â"€â"€ God's Promises global style â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const GLOBAL_STYLE = `
GLOBAL RULES — apply to every page:

ART STYLE: Pixar/Disney 3D animated feature film quality. Warm cinematic lighting. Soft volumetric light rays. Full bleed 2:1 landscape canvas (wider than tall — like an open book spread). No borders. No watermarks.

CHARACTER: The exact child from the reference image — match their face, hair, and skin tone precisely. They wear a beige knit cardigan sweater with buttons and cream pants. Show full body head to toe unless the scene has them sleeping or kneeling.

SPINE ZONE — CRITICAL: The center 12% of the image is the book spine/binding area. Place NO character body, face, text, or important elements here. Character must stand clearly in the LEFT half or clearly in the RIGHT half — never straddling center. Background scenery only may pass through naturally.

NO CENTER FOLD — CRITICAL: Do NOT render any center spine line, fold crease, gutter shadow, depth gradient, or visual divide at the horizontal midpoint. The canvas is a completely flat seamless 2:1 spread — background, sky, scenery, and lighting must flow continuously from the left edge to the right edge with no interruption, darkening, or separation at center.

TEXT RENDERING: Render only the exact text content shown in each prompt. No font names. No labels. No extra words. Render every word EXACTLY as written — same case, same spelling, no alterations. If text is ALL-CAPS in the prompt, render it ALL-CAPS. If text is mixed case, render it mixed case. Never change the case of any word.
`

export const BOOKS: Book[] = [

  // ARCHIVED — God's Promises For You (legacy full-prompt pipeline; replaced by Spoken Over You)
  // Re-enable by uncommenting the block below.
  // {
  //   slug: 'gods-promises-for-you',
  //   title: "God's Promises For You",

  // â"€â"€â"€ Before the Music Plays — Version 1 and Version 2 removed from site â"€â"€â"€â"€â"€
  // Slug: before-the-music-plays-1 and before-the-music-plays-2
  // Entries deleted 2026-07-04. Keep only 'before-the-music-plays' below.

  // â"€â"€â"€ Before the Music Plays — compositing pipeline â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
  // No pagePrompts — route.tsx detects this slug and uses the new compositing
  // pipeline (src/lib/books/before-the-music-plays.ts + src/lib/compositeText.ts)
  // instead of sending full-page prompts to Gemini.
  {
    slug: 'before-the-music-plays',
    title: 'Before the Music Plays',
    subtitle: 'A flower girl story — personalized with her face',
    price: 23.98,
    // Dedication is at pageIndex 1 (page-01-bg); preview must include it explicitly.
    previewPageIndices: [0, 1, 2, 16],
    coverImage: '/books/before-the-music-plays/card-cover.png',
    cardImage:  '/books/before-the-music-plays/card-cover.png',
    previewImages: [],
    listingImages: {
      heroLifestyle:           '/books/before-the-music-plays/listings/01-lifestyle-toddler-holding.png',
      secondaryLifestyle:      '/books/before-the-music-plays/listings/02-lifestyle-older-child-gemma.png',
      calloutPersonalization:  '/books/before-the-music-plays/listings/03-callout-custom-character-name.png',
      occasionFraming:         '/books/before-the-music-plays/listings/04-ask-her-sweetest-way.png',
      calloutDedication:       '/books/before-the-music-plays/listings/05-dedication-page-closeup.png',
      themeFraming:            '/books/before-the-music-plays/listings/06-story-about-being-chosen.png',
      interiorSpread:          '/books/before-the-music-plays/listings/07-soft-3d-illustrations-spread.png',
      formatOptions:           '/books/before-the-music-plays/listings/08-book-format-softcover-hardcover.png',
      sizeRuler:               '/books/before-the-music-plays/listings/09-book-sizes-ruler.png',
      sizeInHand:              '/books/before-the-music-plays/listings/10-book-sizes-in-hand-comparison.png',
    },
    totalPages: 17,
    tags: ['wedding', 'new'],
    recipient: ['toddler', 'child'],
    occasion: ['wedding', 'any'],
    description: "A beautiful personalized storybook for your little flower girl — the story of her special day, told with her face on every page. 17 stunning spreads capturing every magical moment from getting dressed to walking down the aisle.",
    shortDesc: 'The story of her flower girl day — personalized with her face.',
    badge: 'New',
    badgeColor: '#E8836A',
    rating: 5.0,
    reviews: 0,
    featured: true,
    highlights: [
      "Personalized with your flower girl's name and her face on every page",
      'Her full journey — from getting ready to walking down the aisle',
      'A keepsake she will treasure from her special wedding day',
      'The perfect gift for your flower girl, before or after the big day',
    ],
    coverLogoStyle: 'white',
    defaultDedication: 'For [CHILD_NAME], who said yes.\nAnd for the day that needed exactly the right person to make it complete.',
    characterPrompt: FLOWER_GIRL_CHARACTER_PROMPT,
    characterConsistencyNote: FLOWER_GIRL_CONSISTENCY_NOTE,
    accordionContent: {
      aboutStory: "Before the Music Plays follows a little flower girl on the journey to her most important question yet: will you be part of our wedding day? Told through warm, painterly illustrations, this story turns a real proposal into a keepsake she'll treasure long after the walk down the aisle.",
      howPersonalized: "Every copy is personalized with your flower girl's name throughout the story, from the cover to the final page. You can also add an optional dedication message on the first page, printed exactly as you write it.",
      sizeQuality: 'Available as a softcover in 5.5" Ã— 5.5", 8" Ã— 8", or 8" Ã— 11", and as a hardcover in 8" Ã— 8", 11" Ã— 11", or 8" Ã— 11". Printed on premium paper for vivid, long-lasting color.',
    },
  },


  // ARCHIVED — Can You Be My Ring Bearer? (re-enable when ready to relaunch)

  // ARCHIVED — You Were Here First (re-enable when ready to relaunch)
  // Pipeline config (bookRenderConfig.ts + you-were-here-first.ts) remains active
  // so that any existing orders can still be generated via the staff pipeline.

  // {
  //   slug: 'you-were-here-first',
  //   title: 'You Were Here First',
  //   subtitle: 'A big-sibling story — personalized with their face',
  //   price: 23.98,
  //   coverImage: '/books/you-were-here-first/card-cover.png',
  //   cardImage:  '/books/you-were-here-first/card-cover.png',
  //   previewImages: [],
  //   listingImages: {
  //     heroLifestyle:           '/books/you-were-here-first/listings/01.png',
  //     secondaryLifestyle:      '/books/you-were-here-first/listings/02.png',
  //     calloutPersonalization:  '/books/you-were-here-first/listings/03.png',
  //     occasionFraming:         '/books/you-were-here-first/listings/04.png',
  //     calloutDedication:       '/books/you-were-here-first/listings/05.png',
  //     themeFraming:            '/books/you-were-here-first/listings/06.png',
  //     interiorSpread:          '/books/you-were-here-first/listings/07.png',
  //     formatOptions:           '/books/you-were-here-first/listings/08.png',
  //     sizeRuler:               '/books/you-were-here-first/listings/09.png',
  //     sizeInHand:              '/books/you-were-here-first/listings/10.png',
  //   },
  //   totalPages: 12,
  //   tags: ['new'],
  //   recipient: ['toddler', 'child'],
  //   occasion: ['baby-shower', 'any'],
  //   description: "A gentle, personalized picture book for a soon-to-be big sibling, reassuring the child that they were loved first and will always be loved just as much once the new baby arrives.",
  //   shortDesc: 'For the big sibling — personalized with their face, their name, and their baby\'s arrival.',
  //   badge: 'New',
  //   badgeColor: '#E8836A',
  //   rating: 5.0,
  //   reviews: 0,
  //   featured: true,
  //   highlights: [
  //     "Personalized with your child's name and their face on every page",
  //     'Gently reassures the big sibling that they were loved first — and always will be',
  //     'Closes with a keepsake page: sibling name, baby name, and birth date',
  //     'The perfect gift before or after the new baby arrives',
  //   ],
  //   coverLogoStyle: 'white',
  // },

  {
    slug: 'you-were-here-first-child-focus',
    title: 'You Were Here First',
    subtitle: 'A big-sibling story — personalized with their face',
    price: 23.98,
    // Dedication is at pageIndex 1; preview must include it explicitly.
    previewPageIndices: [0, 1, 2, 11],
    defaultDedication: 'the very first,\nand always so loved.',
    coverImage: '/books/you-were-here-first-child-focus/card-cover.png',
    cardImage:  '/books/you-were-here-first-child-focus/card-cover.png',
    previewImages: [],
    listingImages: {
      heroLifestyle:           '/books/you-were-here-first-child-focus/listings/01-lifestyle-hero.png',
      secondaryLifestyle:      '/books/you-were-here-first-child-focus/listings/02-lifestyle-secondary.png',
      calloutPersonalization:  '/books/you-were-here-first-child-focus/listings/03-callout-personalization.png',
      occasionFraming:         '/books/you-were-here-first-child-focus/listings/04-occasion-framing.png',
      calloutDedication:       '/books/you-were-here-first-child-focus/listings/05-callout-dedication.png',
      themeFraming:            '/books/you-were-here-first-child-focus/listings/06-theme-framing.png',
      interiorSpread:          '/books/you-were-here-first-child-focus/listings/07-interior-spread.png',
      formatOptions:           '/books/you-were-here-first-child-focus/listings/08-format-options.png',
      sizeRuler:               '/books/you-were-here-first-child-focus/listings/09-size-ruler.png',
      sizeInHand:              '/books/you-were-here-first-child-focus/listings/10-size-in-hand.png',
    },
    totalPages: 12,
    tags: ['new'],
    recipient: ['toddler', 'child'],
    occasion: ['baby-shower', 'any'],
    description: "A gentle, personalized picture book for a soon-to-be big sibling, reassuring the child that they were loved first and will always be loved just as much once the new baby arrives.",
    shortDesc: "For the big sibling — personalized with their face, their name, and their baby's arrival.",
    badge: 'New',
    badgeColor: '#E8836A',
    rating: 5.0,
    reviews: 0,
    featured: true,
    highlights: [
      "Personalized with your child's name and their face on every page",
      'Gently reassures the big sibling that they were loved first — and always will be',
      'Closes with a keepsake page: sibling name, baby name, and birth date',
      'The perfect gift before or after the new baby arrives',
    ],
    coverLogoStyle: 'white',
  },


  {
    slug: 'kinder-to-beyond',
    title: 'Kinder to Beyond',
    subtitle: 'A kindergarten story — personalized with their face',
    price: 23.98,
    defaultDedication: 'For [CHILD_NAME],\nwho showed us what brave looks like\non the very first day.',
    // Dedication at array[1] (page-02.png), page_3 spread at array[3] (page-03.png).
    previewPageIndices: [0, 1, 3, 24],
    coverImage: '/books/kinder-to-beyond/card-cover.png',
    cardImage:  '/books/kinder-to-beyond/card-cover.png',
    previewImages: [],
    listingImages: {
      heroLifestyle:           '/books/kinder-to-beyond/listings/01-lifestyle-hero.png',
      secondaryLifestyle:      '/books/kinder-to-beyond/listings/02-lifestyle-secondary.png',
      calloutPersonalization:  '/books/kinder-to-beyond/listings/03-callout-personalization.png',
      occasionFraming:         '/books/kinder-to-beyond/listings/04-occasion-framing.png',
      calloutDedication:       '/books/kinder-to-beyond/listings/05-callout-dedication.png',
      themeFraming:            '/books/kinder-to-beyond/listings/06-theme-framing.png',
      interiorSpread:          '/books/kinder-to-beyond/listings/07-interior-spread.png',
      formatOptions:           '/books/kinder-to-beyond/listings/08-format-options.png',
      sizeRuler:               '/books/kinder-to-beyond/listings/09-size-ruler.png',
      sizeInHand:              '/books/kinder-to-beyond/listings/10-size-in-hand.png',
    },
    totalPages: 25,
    tags: ['new'],
    recipient: ['child'],
    occasion: ['birthday', 'any'],
    description: "A personalized storybook following your child through every magical moment of their kindergarten year — from the first nervous morning to the joyful graduation day, with their face on every page.",
    shortDesc: 'Their kindergarten journey — personalized with their face.',
    badge: 'New',
    badgeColor: '#E8836A',
    rating: 5.0,
    reviews: 0,
    featured: true,
    highlights: [
      "Personalized with your child's name and their face on every page",
      '25 pages following every moment of the kindergarten year',
      'From the first nervous morning all the way to graduation day',
      'The perfect gift for the start or end of kindergarten',
    ],
    coverLogoStyle: 'white',
    accordionContent: {
      aboutStory: "Kinder to Beyond follows a child through every chapter of their kindergarten year — the first brave steps into the classroom, new friendships, art tables and circle time, the hard days and the triumphant ones, all the way to graduation. Every spread is personalized with your child's face and name.",
      howPersonalized: "Every copy is personalized with your child's name and a Pixar-style character generated from their photo. You can also add an optional dedication message on the first page.",
      sizeQuality: 'Available as a softcover in 5.5" × 5.5", 8" × 8", or 8" × 11", and as a hardcover in 8" × 8", 11" × 11", or 8" × 11". Printed on premium paper for vivid, long-lasting color.',
    },
  },

  {
    slug: 'spoken-over-you',
    title: 'Spoken Over You',
    subtitle: "God's Promises for [Child's Name]",
    price: 23.98,
    defaultDedication: 'These words were spoken long before you were born, [CHILD_NAME].\n\nThey have been waiting for you all along.',
    coverImage: '/books/spoken-over-you/card-cover.png',
    cardImage:  '/books/spoken-over-you/card-cover.png',
    previewImages: [],
    listingImages: {
      heroLifestyle:           '/books/spoken-over-you/listings/01-lifestyle-hero.png',
      secondaryLifestyle:      '/books/spoken-over-you/listings/02-lifestyle-secondary.png',
      calloutPersonalization:  '/books/spoken-over-you/listings/03-callout-personalization.png',
      occasionFraming:         '/books/spoken-over-you/listings/04-occasion-framing.png',
      calloutDedication:       '/books/spoken-over-you/listings/05-callout-dedication.png',
      themeFraming:            '/books/spoken-over-you/listings/06-theme-framing.png',
      interiorSpread:          '/books/spoken-over-you/listings/07-interior-spread.png',
      formatOptions:           '/books/spoken-over-you/listings/08-format-options.png',
      sizeRuler:               '/books/spoken-over-you/listings/09-size-ruler.png',
      sizeInHand:              '/books/spoken-over-you/listings/10-size-in-hand.png',
    },
    totalPages: 14,
    // SOY dedication is at pageIndex 1 (page-02-bg), not the default 2.
    previewPageIndices: [0, 1, 2, 13],
    tags: ['faith', 'new'],
    recipient: ['baby', 'toddler', 'child'],
    occasion: ['baptism', 'birthday', 'christmas', 'easter', 'any'],
    description: "A one-of-a-kind personalized storybook where your child is the main character — woven through 14 stunning pages of God's promises, brought to life with their face and name.",
    shortDesc: "God's promises made personal — 14 stunning pages for your child.",
    badge: 'Bestseller',
    badgeColor: '#E8B84B',
    rating: 5.0,
    reviews: 0,
    featured: true,
    highlights: [
      "Personalized with your child's face and name on every page",
      "14 pages of God's promises — beautifully illustrated in 3D Pixar style",
      "Perfect for baptism, birthday, Christmas, Easter, or any faith occasion",
      "Closes with a personal keepsake page — name, signature, and date",
    ],
    coverLogoStyle: 'white',
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
  { label: 'Wedding', value: 'wedding' },
  { label: 'Any Occasion', value: 'any' },
]

export type Review = {
  name: string
  location?: string
  rating: number
  text: string
  book: string
  avatar: string
  photo?: string  // path to listing image used as decorative pairing; swap for a real customer photo when available
}

export const REVIEWS: Review[] = [
  {
    name: 'Darice',
    rating: 5,
    text: 'Love this book! I bought 2 already and looking forward to buy again.',
    book: 'You Were Here First',
    avatar: 'D',
    photo: '/books/you-were-here-first-child-focus/listings/lifestyle-boy-reading.png',
  },
  {
    name: 'Nichola',
    rating: 5,
    text: 'This is such a great book. My grandson loved me reading it to him and the fact that he features in it makes it even more special.',
    book: 'You Were Here First',
    avatar: 'N',
    photo: '/images/reviews/nichola.png',
  },
  {
    name: 'Melinda',
    rating: 5,
    text: "These folks were very helpful and great to work with! The book is adorable and they personalized it exactly the way I wanted it. The hardbound book is sturdy and well made. The family I gave it too couldn't have loved it any more! It was 10/10. Thank you so much!",
    book: 'Before the Music Plays',
    avatar: 'M',
    photo: '/images/reviews/melinda.png',
  },
  {
    name: 'Gina',
    rating: 5,
    text: 'The seller went over and above to accommodate my request. Very happy with the purchase!',
    book: 'You Were Here First',
    avatar: 'G',
    photo: '/books/you-were-here-first-child-focus/listings/01-lifestyle-hero.png',
  },
]
