// src/lib/books/you-were-here-first.ts
//
// Book config for "You Were Here First — A Story for [CHILD_NAME]"
// Canvas: 1774 × 887 px (16in × 8in at 110.875 PPI).
//
// DESIGN NOTES:
// - Page 01 does not exist by design. The book goes page_00 (cover) → page_02
//   (dedication) → page_03 onward. Array indices are sequential 0–11 regardless.
//   pageIndex matches array position so the pipeline's pages[idx] lookup stays correct.
// - Text/character overlap policy: EXACT COORDINATES. Do NOT apply resolveTextCollisions
//   on this book — skipTextCollision: true on every page.
// - Page 02 dedication: text intentionally overlays the character's shoulder/arm.
//   This is confirmed by design, not a collision bug.
// - Coordinates: all px values taken directly from the Design Data spreadsheet
//   (Text Coordinates sheet, px columns). Font sizes converted from pt via
//   pt × (110.875/72) ≈ 1.5399 px/pt, rounded to nearest integer.
// - Stroke: white-text blocks on busy illustrated backgrounds use strokeColor '#0d1b2a'
//   strokeWidth 3 to ensure legibility. Navy-text blocks on clean backgrounds: no stroke.
// - Page 11 character: the parent silhouettes visible in the background art
//   (x ≈ 1250–1650, y ≈ 280–700) are baked into the background PNG, not the
//   composited character. Do not use them for collision detection.
// - FONT LICENSING: BestSwashed_PERSONAL_USE_ONLY.otf is personal-use-only per
//   its filename. Confirm a commercial licence before launching this book publicly.

import type { BookPage } from './before-the-music-plays'

const BG  = 'public/books/you-were-here-first/backgrounds'
const REF = 'public/books/you-were-here-first/ref'

const TITLE_FONT    = 'BestSwashed_PERSONAL_USE_ONLY.otf'  // CSS family: "Best Swashed PERSONAL USE"
const SUBTITLE_FONT = 'Lora-Bold.otf'                      // CSS family: "Lora"
const BODY_FONT     = 'Boykids.otf'                        // CSS family: "Boykids"

// Shared style suffix appended to every characterActionPrompt.
const STYLE = 'Style: soft premium children\'s book illustration, Disney-inspired storybook character, hand-painted digital watercolor and gouache texture, rounded expressive features, big gentle eyes, soft blush, balanced tone dreamy lighting, subtle paper texture, soft painterly outlines, detailed shading, magical heartwarming atmosphere, not flat, not vector, not sticker-like. Reduced yellow tone.'

export const YOU_WERE_HERE_FIRST_CHARACTER_PROMPT = `Soft premium children's book illustration, Disney-inspired storybook character, hand-painted digital watercolor and gouache texture, rounded expressive features, big gentle eyes, soft blush, warm dreamy lighting, subtle paper texture, "soft painterly outlines", detailed shading, magical heartwarming atmosphere, not flat, not vector, not sticker-like.

Skin tone & Hair: exactly match the skin tone and hair to the reference photo. Reduce yellow tone.

Clothing: White polo short sleeves, Khaki Cotton shorts, Brown shoes.

POSE: Full body, head to toe. Relaxed natural standing pose. Arms resting naturally at the sides.

FRAMING — CRITICAL: The complete character must be fully visible with NO cropping of any body part. Both feet must be clearly visible at the bottom. The top of the head must have clear space above it. The character should fill roughly 75–80% of the image height, leaving visible empty margins at both top and bottom. If the reference photo shows only a face or partial body, STILL generate a COMPLETE full-body character from head to toe — do NOT match the cropping of the reference photo.

BACKGROUND: Plain clean white only. No scenery, no props, no text.
FORMAT: 1:1 square ratio. Character horizontally centered with clear empty space on all four sides.
OUTPUT: ONE single child character only.`

export const youWereHereFirst: { slug: string; title: string; pages: BookPage[] } = {
  slug: 'you-were-here-first',
  title: 'You Were Here First',
  pages: [

    // ── Page 00 — Cover ───────────────────────────────────────────────────────
    // Character and text both in the right half (front cover). Left half is back cover.
    // Left panel logo (navy mark + URL) is baked into the background PNG — pipeline
    // does NOT add a second logo overlay (showLogoOnCover: false in bookRenderConfig).
    {
      pageIndex: 0,
      backgroundAsset: `${BG}/page_00_bg.png`,
      poseReference:   `${REF}/page_00.png`,
      characterActionPrompt:
        `Scene: A warm, intimate scene showing the first child leaning close and gently resting a hand on their pregnant parent's belly (No face/head), both settled into a cozy couch corner. The child's expression is soft, curious, and full of love — this is the very first moment of the story, so it should feel tender and quietly joyful rather than posed. Include soft living-room details in the background: a warm reading lamp or lantern glow, a leafy plant, a stack of well-loved books, and a folded knit blanket draped over the couch. The lighting should feel like a calm evening at home — soft, cool-toned, and a little magical.\n\nPLACEMENT: Characters show on the right side only. The child's head must not appear above 32% from the top of the image (keep below 320px on a 1000px canvas). The upper portion of the right panel must remain completely clear — it contains title text that will be added in post-production.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 975, y: 320, width: 520, height: 660 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'title1',
          template: 'You Were',
          x: 1309, y: 51, maxWidth: 382,
          fontFamily: TITLE_FONT, fontSize: 45,
          color: '#3e5276', align: 'left',
        },
        {
          id: 'title2',
          template: 'Here First',
          x: 1200, y: 148, maxWidth: 607,
          fontFamily: TITLE_FONT, fontSize: 79,
          color: '#3e5276', align: 'left',
        },
        {
          id: 'subtitle',
          template: 'A Story for [CHILD_NAME]',
          x: 1299, y: 292, maxWidth: 377,
          fontFamily: SUBTITLE_FONT, fontSize: 40,
          color: '#ffffff', align: 'left',
        },
      ],
    },

    // ── Page 01 (array) = design page_02 — Dedication ─────────────────────────
    // Character fills the right panel; text overlaps character shoulder by design.
    {
      pageIndex: 1,
      backgroundAsset: `${BG}/page_02_bg.png`,
      poseReference:   `${REF}/page_02.png`,
      characterActionPrompt:
        `Scene: Zoom in on the first child being lovingly hugged by a parent (No face/head) in a cozy nursery or bedroom corner. The moment should feel quiet, special, and personal, showing that the child was the very first and is still so loved. Include soft details like a favorite stuffed animal, folded blanket, family photo frame, gentle curtains, and cool morning window light. Keep the composition simple and sentimental, with an open blank space on the left for dedication text.\n\nCharacters show on the right side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 842, y: -32, width: 697, height: 946 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'name',
          template: 'For [CHILD_NAME]',
          x: 1089, y: 465, maxWidth: 472,
          fontFamily: TITLE_FONT, fontSize: 74,
          color: '#FFFFFF', align: 'left',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
        {
          id: 'tagline',
          template: 'the very first, and always so loved.',
          x: 1089, y: 745, maxWidth: 518,
          fontFamily: TITLE_FONT, fontSize: 46,
          color: '#FFFFFF', align: 'left',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
      ],
    },

    // ── Page 02 (array) = design page_03 — Living room ────────────────────────
    // ⚠ FLAG: page_03_bg.png is 2752×1536 (1.79:1), not 2000×1000 (2:1).
    //   The pipeline will stretch it horizontally with fit:'fill'. Replace the asset.
    {
      pageIndex: 2,
      backgroundAsset: `${BG}/page_03_bg.png`,
      poseReference:   `${REF}/page_03.png`,
      characterActionPrompt:
        `Scene: A heartwarming scene showing a cozy family home filled with traces of the first child everywhere. The child walks happily through the living room while their favorite toys, drawings, books, blanket, and blurry family photos (No faces) appear naturally around the space. Every room should feel touched by the child's personality and love. The atmosphere is warm but not overly yellow, with soft cool-toned daylight, gentle shadows, and a magical homey feeling. Leave soft open space on the right for story text.\n\nCharacters show on the left side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 360, y: 51, width: 306, height: 840 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'Right now, [CHILD_NAME], this house is full of you. Every room has a [CHILD_NAME]-shaped piece of love in it.',
          x: 1063, y: 265, maxWidth: 534,
          fontFamily: BODY_FONT, fontSize: 46,
          color: '#FFFFFF', align: 'center',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
      ],
    },

    // ── Page 03 (array) = design page_04 — Seated beside pregnant parent ──────
    {
      pageIndex: 3,
      backgroundAsset: `${BG}/page_04_bg.png`,
      poseReference:   `${REF}/page_04.png`,
      characterActionPrompt:
        `Scene: A gentle scene showing the first child sitting beside a parent (No face) on a soft bed or cozy couch while the parent lovingly holds a pregnant belly. The child looks curious and slightly thoughtful, as if wondering about the new baby. The parent's expression is calm and reassuring. Add soft nursery details in the background, such as a baby blanket, tiny baby clothes, or a small bassinet, but keep the focus on the emotional connection between parent and child. The scene should feel comforting, safe, and full of love. Leave open space on the left for story text.\n\nCharacters show on the right side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1063, y: 265, width: 534, height: 955 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: "Soon, someone new is going to join this family. You might wonder if there will be enough love left over for you. Here's the truth: there will always be enough.",
          x: 108, y: 154, maxWidth: 675,
          fontFamily: BODY_FONT, fontSize: 46,
          color: '#FFFFFF', align: 'center',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
      ],
    },

    // ── Page 04 (array) = design page_05 — Hugging parents ───────────────────
    // ⚠ Moderate Gemini risk: child sitting between two parents (flanked composition).
    {
      pageIndex: 4,
      backgroundAsset: `${BG}/page_05_bg.png`,
      poseReference:   `${REF}/page_05.png`,
      characterActionPrompt:
        `Scene: A magical symbolic scene showing the first child and parents (No face/head — the mom has a visible pregnant belly) together in a cozy room where soft glowing heart-shaped light gently expands around them. The child is being hugged or sitting between the parents, with a subtle baby blanket or bassinet nearby to hint at the coming sibling. The light should feel gentle and emotional, not too fantasy-heavy. The scene should show love growing wider, filling the room softly and beautifully. Use cool soft tones with gentle blush, cream, dusty blue, sage, and muted rose accents. Leave open space on the right for story text.\n\nCharacters show on the left side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 325, y: 135, width: 302, height: 764 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: "Love doesn't get cut in half when someone new arrives. It grows bigger. It learned how to do that the day you arrived, [CHILD_NAME].",
          x: 993, y: 228, maxWidth: 675,
          fontFamily: BODY_FONT, fontSize: 43,
          color: '#FFFFFF', align: 'center',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
      ],
    },

    // ── Page 05 (array) = design page_06 — Exploring the home ────────────────
    {
      pageIndex: 5,
      backgroundAsset: `${BG}/page_06_bg.png`,
      poseReference:   `${REF}/page_06.png`,
      characterActionPrompt:
        `Scene: A sweet scene of the first child exploring familiar parts of the family home with confidence and joy. Show the child touching the creaky stair step, peeking around a hallway, or laughing in a favorite room. Include small meaningful home details: a worn stair, a favorite toy on the floor, soft rugs, cozy furniture, and gentle window light. The child should look proud and familiar with the home, as if this place is full of memories only they know. Leave open space on the left for story text.\n\nCharacters show on the right side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 993, y: 228, width: 675, height: 941 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: "You are here first. That means something. You already know what this family sounds like when it laughs. You know which step on the stairs makes the funny creak.",
          x: 108, y: 223, maxWidth: 675,
          fontFamily: BODY_FONT, fontSize: 43,
          color: '#FFFFFF', align: 'center',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
      ],
    },

    // ── Page 06 (array) = design page_07 — Beside baby in bassinet ───────────
    // Clean cream background — navy text, no stroke needed.
    {
      pageIndex: 6,
      backgroundAsset: `${BG}/page_07_bg.png`,
      poseReference:   `${REF}/page_07.png`,
      characterActionPrompt:
        `Scene: A tender future-looking scene showing the first child sitting beside a tiny baby (blurry face) in a cozy nursery, gently showing the baby something special from the family home, such as a favorite stuffed animal, a picture book, a soft blanket, or the view from the window. The baby is small and new, lying safely in a bassinet or on a soft blanket, while the older sibling looks caring and proud. The scene should feel gentle, meaningful, and important, showing the child's special role as the first guide. Leave open space on the right for story text.\n\nCharacters show on the left side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 165, y: 19, width: 406, height: 876 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: "The new baby doesn't know any of that yet. One day, you'll get to show them. That's one of the most important jobs there is.",
          x: 1085, y: 118, maxWidth: 514,
          fontFamily: BODY_FONT, fontSize: 43,
          color: '#3e5276', align: 'center',
        },
      ],
    },

    // ── Page 07 (array) = design page_08 — Comforting baby ──────────────────
    // ⚠ Moderate Gemini risk: baby reaching hands toward sibling — specific gesture.
    {
      pageIndex: 7,
      backgroundAsset: `${BG}/page_08_bg.png`,
      poseReference:   `${REF}/page_08.png`,
      characterActionPrompt:
        `Scene: A heartwarming sibling scene showing the first child comforting the baby (blurry face) during a small uncertain moment. The baby may be reaching tiny hands toward the older sibling from a blanket or bassinet, while the older sibling gently offers a toy, holds the baby's hand, or leans close with a caring expression. The room should feel soft and safe, with gentle shadows, cool dreamy light, and tender family details. The mood should show trust, connection, and the special bond only siblings have. Leave open space on the right for story text.\n\nCharacters show on the left side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 164, y: -26, width: 665, height: 942 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: "And one day, your baby brother or sister will look for you first — when something feels scary, or new, or too big to handle alone. There will be no one else quite like you. There never will be.",
          x: 982, y: 89, maxWidth: 703,
          fontFamily: BODY_FONT, fontSize: 40,
          color: '#FFFFFF', align: 'center',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
      ],
    },

    // ── Page 08 (array) = design page_09 — Older sibling with crying baby ────
    // Clean background — navy text, no stroke needed.
    {
      pageIndex: 8,
      backgroundAsset: `${BG}/page_09_bg.png`,
      poseReference:   `${REF}/page_09.png`,
      characterActionPrompt:
        `Scene: A sweet and slightly playful scene showing the new baby (same skin tone) as very tiny and new, wrapped in a soft blanket or lying in a bassinet, making a little crying face while the older sibling watches with curious wide eyes. Nearby, include a soft memory element of the older child as a baby, such as a framed baby photo, tiny old baby shoes, or a small keepsake blanket. The mood should be gentle and reassuring, not stressful. Show that both children are wonderful and loved. Leave open space on the left for story text.\n\nCharacters show on the right side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1085, y: 118, width: 514, height: 723 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: "At the very beginning, the baby will be very small, and very new, and maybe a little bit loud. That's okay. You were new once too — and we thought you were wonderful.",
          x: 83, y: 118, maxWidth: 724,
          fontFamily: BODY_FONT, fontSize: 43,
          color: '#3e5276', align: 'center',
        },
      ],
    },

    // ── Page 09 (array) = design page_10 — Embraced by both parents ──────────
    {
      pageIndex: 9,
      backgroundAsset: `${BG}/page_10_bg.png`,
      poseReference:   `${REF}/page_10.png`,
      characterActionPrompt:
        `Scene: A deeply reassuring scene showing the first child being lovingly embraced by both parents (No head/face) in a cozy bedroom. The child is the clear emotional focus, held close and safe. The new baby may be softly visible nearby in a bassinet, but not taking attention away from the first child. The parents' expressions should feel tender and certain, showing that their love for the first child has not changed. Use soft lighting, gentle shadows, and a calm sentimental atmosphere. Leave open space on the right for story text.\n\nCharacters show on the left side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 232, y: -4, width: 613, height: 941 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'We still do, [CHILD_NAME]. We always will.',
          x: 961, y: 307, maxWidth: 724,
          fontFamily: BODY_FONT, fontSize: 46,
          color: '#FFFFFF', align: 'left',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
      ],
    },

    // ── Page 10 (array) = design page_11 — Closing / doorway scene ───────────
    // Parent silhouettes at crib (x≈1250–1650, y≈280–700) are background art —
    // NOT the composited character. skipTextCollision handles any concern.
    {
      pageIndex: 10,
      backgroundAsset: `${BG}/page_11_bg.png`,
      poseReference:   `${REF}/page_11.png`,
      characterActionPrompt:
        `Scene: A sentimental closing scene showing the first child standing in the doorway of the nursery or family room, looking back at the parents' silhouette (No face) and new baby with a soft, peaceful expression. The scene should feel complete and emotionally secure. Include subtle symbols of the child's place in the family: their favorite toy, a framed family photo, and a soft path of light leading from the child's room to the nursery. The mood should show that the family has grown, but the first child's love story remains special and unchanged. Leave open space on the right for closing text.\n\nCharacters show on the left side only and not in the center.\n\n${STYLE}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 257, y: 212, width: 406, height: 725 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: "You were here first. And you will be loved longest. That's the deal. It was made the day you arrived — and nothing, not even the most wonderful new baby in the world, will ever change it.",
          x: 952, y: 44, maxWidth: 757,
          fontFamily: BODY_FONT, fontSize: 40,
          color: '#FFFFFF', align: 'center',
          strokeColor: '#0d1b2a', strokeWidth: 3,
        },
      ],
    },

    // ── Page 11 (array) = design page_12 — Keepsake / text-only ─────────────
    // No character on this page. poseReference and characterActionPrompt are unused
    // when characterPlacement is absent — the pipeline skips Gemini entirely.
    // New tokens used: [SIBLING_NAME], [LAST_NAME], [BIRTH_DATE], [GIFTER_NAMES].
    // ⚠ These require new input fields in the frontend personalization form.
    {
      pageIndex: 11,
      backgroundAsset:       `${BG}/page_12_bg.png`,
      poseReference:         '',
      characterActionPrompt: '',
      includesSenderCharacter: false,
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'kp-title1',
          template: 'You Were',
          x: 1355, y: 183, maxWidth: 440,
          fontFamily: TITLE_FONT, fontSize: 45,
          color: '#3e5276', align: 'left',
        },
        {
          id: 'kp-title2',
          template: 'Here First',
          x: 1216, y: 290, maxWidth: 716,
          fontFamily: TITLE_FONT, fontSize: 89,
          color: '#3e5276', align: 'left',
        },
        {
          id: 'kp-subtitle',
          template: 'A Story for [CHILD_NAME]',
          x: 1364, y: 509, maxWidth: 430,
          fontFamily: SUBTITLE_FONT, fontSize: 40,
          color: '#3e5276', align: 'left',
        },
        {
          id: 'kp-fill',
          template: 'This book belongs to: [CHILD_NAME] [LAST_NAME]\nMy new baby brother or sister is named: [SIBLING_NAME] [LAST_NAME]\nBorn on: [BIRTH_DATE].\nWith love, [GIFTER_NAMES]',
          x: 1203, y: 674, maxWidth: 573,
          fontFamily: BODY_FONT, fontSize: 37,
          color: '#3e5276', align: 'left',
        },
      ],
    },

  ],
}