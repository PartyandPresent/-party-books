// src/lib/bookRenderConfig.ts
//
// Per-book render settings used by all three generate routes.
// Centralised here so canvas sizes, costume rules, and page arrays
// stay consistent across generate-book, generate-full-book, and regenerate-page.

import { beforeTheMusicPlays } from './books/before-the-music-plays'
import type { BookPage } from './books/before-the-music-plays'
import { youWereHereFirst, YOU_WERE_HERE_FIRST_CHARACTER_PROMPT } from './books/you-were-here-first'
import { youWereHereFirstChildFocus, YOU_WERE_HERE_FIRST_CF_CHARACTER_PROMPT } from './books/you-were-here-first-child-focus'
import { spokenOverYou, SPOKEN_OVER_YOU_CHARACTER_PROMPT } from './books/spoken-over-you'
import { kinderToBeyond, KINDER_TO_BEYOND_CHARACTER_PROMPT } from './books/kinder-to-beyond'
// import { canYouBeMyRingBearer, RING_BEARER_CHARACTER_PROMPT } from './books/can-you-be-my-ring-bearer'  // ARCHIVED

export interface BookRenderConfig {
  canvasW: number
  canvasH: number
  bookSlug: string
  costumeRule: string        // replaces the per-book COSTUME line in the Gemini RULES block
  pages: BookPage[]
  title: string
  characterPrompt?: string   // overrides DEFAULT_CHARACTER_PROMPT for character generation (Step 1)
  showLogoOnCover?: boolean  // set false to skip logo composite on pageIndex 0 (default: true)
  logoStyle?: 'color' | 'white'  // 'color' for white-background covers, 'white' for dark/illustrated covers (default: 'white')
}

const CONFIGS: BookRenderConfig[] = [
  {
    canvasW:         1774,
    canvasH:         887,
    bookSlug:        'before-the-music-plays',
    costumeRule:     'use a white or ivory flower girl dress with a satin sash and white dress shoes.',
    pages:           beforeTheMusicPlays.pages,
    title:           beforeTheMusicPlays.title,
    showLogoOnCover: false,  // logo is baked into the background — left panel is always restored after Gemini
  },
  {
    canvasW:         2000,
    canvasH:         1000,
    bookSlug:        'you-were-here-first',
    costumeRule:     'the character wears a white short-sleeve polo shirt, khaki cotton shorts, and brown shoes.',
    pages:           youWereHereFirst.pages,
    title:           youWereHereFirst.title,
    characterPrompt: YOU_WERE_HERE_FIRST_CHARACTER_PROMPT,
    showLogoOnCover: false,
  },

  {
    canvasW:         2000,
    canvasH:         1000,
    bookSlug:        'you-were-here-first-child-focus',
    costumeRule:     'the character wears casual, age-appropriate everyday clothing suited to each scene setting.',
    pages:           youWereHereFirstChildFocus.pages,
    title:           youWereHereFirstChildFocus.title,
    characterPrompt: YOU_WERE_HERE_FIRST_CF_CHARACTER_PROMPT,
    showLogoOnCover: false,
  },

  {
    canvasW:         2000,
    canvasH:         1000,
    bookSlug:        'spoken-over-you',
    costumeRule:     'Girls wear a blue mini dress with white ribbon at the waist and white doll shoes. Boys wear a white polo shirt with a checkered necktie and pants.',
    pages:           spokenOverYou.pages,
    title:           spokenOverYou.title,
    characterPrompt: SPOKEN_OVER_YOU_CHARACTER_PROMPT,
    showLogoOnCover: false,
  },

  {
    canvasW:         2000,
    canvasH:         1000,
    bookSlug:        'kinder-to-beyond',
    costumeRule:     'the character wears age-appropriate school clothing suited to each scene setting.',
    pages:           kinderToBeyond.pages,
    title:           kinderToBeyond.title,
    characterPrompt: KINDER_TO_BEYOND_CHARACTER_PROMPT,
    showLogoOnCover: false,
  },

  // ARCHIVED — can-you-be-my-ring-bearer (re-enable when ready to relaunch)
  // {
  //   canvasW:          4000,
  //   canvasH:          2000,
  //   bookSlug:         'can-you-be-my-ring-bearer',
  //   costumeRule:      'the character wears a cream beige suit, a powder-blue bow tie, a boutonniere, and brown shoes, holding a white lace ring pillow with blue ribbon and gold rings.',
  //   pages:            canYouBeMyRingBearer.pages,
  //   title:            canYouBeMyRingBearer.title,
  //   characterPrompt:  RING_BEARER_CHARACTER_PROMPT,
  //   showLogoOnCover:  false,
  // },
]

export function getBookRenderConfig(slug: string): BookRenderConfig | null {
  return CONFIGS.find(c => c.bookSlug === slug) ?? null
}

export function isCompositingSlug(slug: string): boolean {
  return CONFIGS.some(c => c.bookSlug === slug)
}