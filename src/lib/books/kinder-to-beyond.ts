// src/lib/books/kinder-to-beyond.ts
//
// Book config for "[CHILD_NAME] Goes to Kindergarten — and Beyond"
//
// CANVAS: 2000 × 1000 px
// DESIGN DATA: Design_Data_Kinder-To-Beyond.xlsx — 120 DPI, pt × 1.667 = px
//
// PAGES (25 active — array indices 0–24):
//   [0]  Cover        Page_00 (Cover)
//   [1]  Dedication   Page_2 bg — customer message or default; no character
//   [2]  Page_2       The Morning Begins
//   [2]  Page_3       A Brave Little Smile
//   [3]  Page_4       Stepping Out the Door
//   [4]  Page_5       The Road to School
//   [5]  Page_6       First Look at the School
//   [6]  Page_7       A Warm Welcome
//   [7]  Page_8       Discovering the Classroom  ← char RIGHT (ref overrides prompt)
//   [8]  Page_9       My Very Own Cubby
//   [9]  Page_10      Circle Time Wonder
//   [10] Page_11      A New Friend
//   [11] Page_12      Letters Everywhere
//   [12] Page_13      Making Art
//   [13] Page_14      Counting Little Wonders
//   [14] Page_15      Music and Movement
//   [15] Page_16      Playground Adventures
//   [16] Page_17      Snack Time Kindness
//   [17] Page_18      When Things Feel Hard
//   [18] Page_19      Brave Again
//   [19] Page_20      Sharing Something Special
//   [20] Page_21      Story Time Magic
//   [21] Page_22      Growing Every Day
//   [22] Page_23      The Last Day Glow
//   [23] And Beyond   Page_25 scene; Backgrounds/Page_24 (Last Page).png bg
//
// OMITTED (no background asset):
//   Page 24 (graduation) — design data has text but no background PNG
//
// FONT: KGMissKindyMarker.ttf → "KG Miss Kindy Marker"
// COLORS: NAVY=#405b89  WHITE=#ffffff  GOLD=#ffd366 (cover name — verify)
// TEXT: all body pages use skipTextCollision=true (design coordinates are final)

import type { BookPage } from './before-the-music-plays'

const BG   = 'public/books/kinder-to-beyond/backgrounds'
const REF  = 'public/books/kinder-to-beyond/references'
const FONT = 'KGMissKindyMarker.ttf'

const NAVY  = '#405b89'
const WHITE = '#ffffff'
const GOLD  = '#ffd366'   // cover child-name — verify against reference
const FS    = 35           // 21pt × 1.667 at 120 DPI
const LH    = 1.4

const STYLE = `

CANVAS: 2:1 landscape spread (2000 × 1000 px). The LEFT and RIGHT halves are distinct zones. Place the character clearly in one half only — never straddling center.

NO TEXT: Do NOT add any text, words, letters, labels, or captions anywhere. Text is composited in post-production.

Style: Premium stylized 3D Pixar/Disney children's storybook illustration. Character sharply focused, environment softly blurred (shallow depth of field, creamy bokeh, atmospheric haze). Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, no harsh yellow tint. High-end cinematic 3D render — global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, dreamy heartwarming atmosphere, 50mm lens, wide aperture.`

export const KINDER_TO_BEYOND_CHARACTER_PROMPT = `Create a full-body 3D Pixar/Disney-style cartoon character of the EXACT child shown in the uploaded photo, translated into a high-quality animated look with rounded child-friendly age 5–6 proportions and expressive eyes.

COPY EXACTLY FROM THE PHOTO:
- FACE: same face shape, same eyes, same nose, same lips — faithful likeness, not a generic child
- SKIN TONE: copy exact skin tone — do not lighten, darken, or alter in any way
- HAIR: copy exact hair colour, length, and hairstyle exactly as shown
- GENDER: match exactly — girl generates a girl character, boy generates a boy character
- FRECKLES or MARKS: include any visible facial features

CLOTHING: Age-appropriate school clothing. For a boy: white polo shirt, dark pants, small shoes. For a girl: a neat dress or blouse with comfortable school shoes.

POSE: Full body, head to toe. Relaxed natural standing pose. Arms resting naturally at the sides.
BACKGROUND: Plain clean white only. No scenery, no props, no text.
OUTPUT: ONE single child character only. Do NOT generate two characters or show both genders.`

export const kinderToBeyond: { slug: string; title: string; pages: BookPage[] } = {
  slug: 'kinder-to-beyond',
  title: 'Kinder to Beyond',
  pages: [

    // ── Page 00 — Cover ──────────────────────────────────────────────────────────
    // Design: 5 text blocks on RIGHT panel (all centered at x≈1440).
    // "and" (y=796) + "Beyond" (y=781) share the same visual line — intentional Canva layout.
    // Cover name color #ffd366 = approximate of "#ffd36" in design data — verify against reference.
    {
      pageIndex: 0,
      backgroundAsset: `${BG}/page-00-cover.png`,
      poseReference:   `${REF}/page-00-cover.png`,
      characterActionPrompt:
        `A cover-worthy illustration of a happy kindergarten-age child, full of excitement and joy. CRITICAL FRAMING RULE: Show the child FULL BODY from HEAD to FEET — do not crop or zoom in. The entire character must be visible within the frame, head at the top and feet near the bottom. The child must be HORIZONTALLY CENTERED on the right half of the canvas. Their pose should feel celebratory: standing with a big joyful smile, wearing a school backpack. Surround the child with a playful back-to-school atmosphere: stars, confetti, crayons, books, a school building, clouds, sunshine.\n\nThe LEFT half of the canvas must remain a clean solid white panel — place absolutely nothing there.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 1180, y: 310, width: 650, height: 760 },
      svgOverlay: '<defs><radialGradient id="ktbglow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/><stop offset="60%" stop-color="#ffffff" stop-opacity="0.32"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient></defs><ellipse cx="1540" cy="790" rx="450" ry="200" fill="url(#ktbglow)"/>',
      textBlocks: [
        {
          id: 'child-name',
          template: '[CHILD_NAME]',
          x: 1245, y: 64, maxWidth: 592,
          fontFamily: FONT, fontSize: 135,
          color: GOLD, align: 'center',
          strokeColor: '#405b89', strokeWidth: 10,
          archPercent: 5,
        },
        {
          id: 'goes-to',
          template: 'goes to',
          x: 1454, y: 196, maxWidth: 173,
          fontFamily: FONT, fontSize: 40,
          color: NAVY, align: 'center',
          strokeColor: '#ffffff', strokeWidth: 6,
        },
        {
          id: 'title-main',
          template: 'Kindergarten',
          x: 1167, y: 640, maxWidth: 745,
          fontFamily: FONT, fontSize: 99,
          color: '#1a2744', align: 'center',
          strokeColor: '#ffffff', strokeWidth: 8,
          archPercent: -5,
          letterColors: ['#2b48b5','#e5322d','#f7c200','#2ea833','#7c28be','#e5322d','#2ea833','#f7c200','#2b48b5','#e5322d','#2ea833','#7c28be'],
        },
        {
          id: 'title-beyond',
          template: 'Beyond',
          x: 1299, y: 781, maxWidth: 497,
          fontFamily: FONT, fontSize: 120,
          color: '#1a2744', align: 'center',
          strokeColor: '#ffffff', strokeWidth: 10,
          archPercent: -5,
          letterColors: ['#2b48b5','#2ea833','#7c28be','#e5322d','#f7c200','#2ea833'],
        },
        {
          id: 'title-and',
          template: 'and',
          x: 1506, y: 796, maxWidth: 67,
          fontFamily: FONT, fontSize: 33,
          color: NAVY, align: 'center',
        },
      ],
    },

    // ── Page 01 — Dedication ─────────────────────────────────────────────────────
    // Character on RIGHT half. Dedication text on LEFT white panel (x 100–850).
    // skipTextCollision keeps the text pinned; character placement stays right of x=1050.
    {
      pageIndex: 1,
      backgroundAsset: `${BG}/page-02.png`,
      poseReference:   `${REF}/page-02.png`,
      characterActionPrompt:
        `A warm, joyful illustration of the child standing calmly on the RIGHT half of the canvas, facing slightly inward with a gentle smile — as if they are the star of the dedication page. The pose is relaxed and endearing: hands resting naturally, backpack on, looking hopeful and ready. The bedroom background shows softly behind them.\n\nThe LEFT half of the canvas must remain a completely clean white panel — place absolutely nothing there. The character must be fully contained within the RIGHT half (x > 1000 on a 2000 px canvas).${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 1050, y: 0, width: 950, height: 1000 },
      textBlocks: [
        {
          id: 'dedication',
          template: '[DEDICATION]',
          defaultIfEmpty: 'To [CHILD_NAME],\n\nMay every year bring you new adventures, big discoveries, and the courage to try. We are so proud of who you are — and who you are becoming.\n\nWith all our love,',
          x: 100, y: 250, maxWidth: 750,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: 1.5,
        },
      ],
    },

    // ── Page 02 — The Morning Begins ─────────────────────────────────────────────
    // Design: text RIGHT (overlaid on illustration), white
    {
      pageIndex: 2,
      backgroundAsset: `${BG}/page-02.png`,
      poseReference:   `${REF}/page-02.png`,
      characterActionPrompt:
        `A cozy early morning bedroom scene. The child stands near their bed, holding their backpack straps with a mixture of excitement and wonder. The room is warm and tidy with children's books, a teddy bear, and soft school-themed decor. Gentle daylight pours in from the window. Include a lunchbox, polished shoes, and a name tag nearby. Place the child on the RIGHT half — the LEFT half is a clean white panel, leave it completely empty.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 999, y: 0, width: 1001, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Morning light peeked through your window and whispered,\n\n"Today is the day!"\n\nYou opened your eyes with a fluttery feeling inside. Kindergarten was finally here, [CHILD_NAME].',
          x: 1060, y: 162, maxWidth: 380,
          fontFamily: FONT, fontSize: FS,
          color: WHITE, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 03 — A Brave Little Smile ───────────────────────────────────────────
    // Design: text RIGHT, navy
    {
      pageIndex: 3,
      backgroundAsset: `${BG}/page-03.png`,
      poseReference:   `${REF}/page-03.png`,
      characterActionPrompt:
        `A sweet getting-ready moment in front of a bedroom mirror. The child stands proudly, adjusting their backpack or shirt, practising a brave little smile. The mirror reflects their excitement and nervousness. Around them are neat bedroom details: toy shelf, picture frame, little stool. The mood should feel encouraging. Place the child on the LEFT half, never centered. Leave soft open space on the right for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 1246, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'You put on your favorite school clothes and checked your reflection.\n\nYour smile looked excited. Your tummy felt nervous. But deep inside, a brave little voice said,\n\n"You are ready."',
          x: 1111, y: 296, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 04 — Stepping Out the Door ─────────────────────────────────────────
    // Design: text LEFT, white
    {
      pageIndex: 4,
      backgroundAsset: `${BG}/page-04.png`,
      poseReference:   `${REF}/page-04.png`,
      characterActionPrompt:
        `A heartfelt front-door scene as the child pauses before leaving home for kindergarten. They stand with one hand on their backpack, looking ahead with anticipation. The doorway opens into a bright morning world with flowers and a walkway. Place the child on the RIGHT half, never centered. Leave the left side open for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 969, y: 0, width: 1031, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'With your backpack packed and your shoes tied tight, you stood at the front door.\n\nHome felt warm and familiar behind you. A brand-new adventure waited just outside.',
          x: 196, y: 340, maxWidth: 547,
          fontFamily: FONT, fontSize: FS,
          color: WHITE, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 05 — The Road to School ─────────────────────────────────────────────
    // Design: text RIGHT, navy
    {
      pageIndex: 5,
      backgroundAsset: `${BG}/page-05.png`,
      poseReference:   `${REF}/page-05.png`,
      characterActionPrompt:
        `A charming outdoor scene of the child walking toward school along a gentle path lined with grass, flowers, and trees. The school appears in the distance with a welcoming, cheerful presence. The child walks with small confident steps, looking ahead with excitement. Place the child on the LEFT half, never centered. Leave open space on the right for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 1001, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Step by step, you followed the path toward school.\n\nThe morning breeze danced beside you, and a little golden star seemed to follow along—as if it already knew something wonderful was beginning.',
          x: 1116, y: 96, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 06 — First Look at the School ──────────────────────────────────────
    // Design: text LEFT, navy
    {
      pageIndex: 6,
      backgroundAsset: `${BG}/page-06.png`,
      poseReference:   `${REF}/page-06.png`,
      characterActionPrompt:
        `The child stands at the edge of the schoolyard, seeing the kindergarten building up close for the first time. The school feels bright, friendly, and inviting with banners, windows, a clock, and child-friendly details. The child looks full of awe. Place the child on the RIGHT half, never centered. Leave the left side open for story text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 948, y: 0, width: 1052, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Then you saw it: your kindergarten school! It looked much bigger than you had imagined.\n\nThere were tall windows, cheerful doors, and so many new places waiting to be explored.',
          x: 128, y: 340, maxWidth: 698,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 07 — A Warm Welcome ─────────────────────────────────────────────────
    // Design: text RIGHT, navy, fontSize=25.2pt→42px
    {
      pageIndex: 7,
      backgroundAsset: `${BG}/page-07.png`,
      poseReference:   `${REF}/page-07.png`,
      characterActionPrompt:
        `A tender school entrance scene where the child is greeted warmly by their teacher. The teacher kneels slightly to meet their eye level, smiling kindly. The child looks shy but encouraged. The background includes the classroom doorway, a welcome sign, and soft hints of classroom decor. Place the child on the LEFT half, never centered. The teacher may stand behind or beside them. Leave open space on the right for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 9, width: 1261, height: 970 },
      textBlocks: [
        {
          id: 'body',
          template: 'At the classroom door, your teacher greeted you with a warm smile.\n\n"Welcome, [CHILD_NAME]. We are so happy you are here."\n\nSuddenly, the room did not feel quite so unfamiliar.',
          x: 1115, y: 260, maxWidth: 662,
          fontFamily: FONT, fontSize: 42,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 08 — Discovering the Classroom ─────────────────────────────────────
    // ⚠ char RIGHT (reference overrides prompt). Design: text LEFT, white
    {
      pageIndex: 8,
      backgroundAsset: `${BG}/page-08.png`,
      poseReference:   `${REF}/page-08.png`,
      characterActionPrompt:
        `Inside the kindergarten classroom, the child stands in wonder, taking in shelves of books, bright crayons, building blocks, puzzles, and tiny chairs. Their eyes are wide with curiosity. Keep the child as the only character. Place them on the RIGHT half, never centered. Leave the left side clear for text. The classroom should feel warm and full of colour.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 1188, y: 0, width: 812, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Inside were shelves filled with stories, jars of bright crayons, building blocks, puzzles, and tiny chairs.\n\nYou looked all around and wondered, "What should I discover first?"',
          x: 128, y: 167, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: WHITE, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 09 — My Very Own Cubby ──────────────────────────────────────────────
    // Design: text RIGHT, white
    {
      pageIndex: 9,
      backgroundAsset: `${BG}/page-09.png`,
      poseReference:   `${REF}/page-09.png`,
      characterActionPrompt:
        `A proud moment where the child finds their own cubby with their name on it. They reach toward it with delight while placing their backpack inside. Surround the area with little jackets, lunchboxes, and friendly classroom details. The feeling should be personal and special. Place the child on the LEFT half, never centered. Leave soft open text space on the right.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 914, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Soon, you found a cubby with your very own name.\n\nYou placed your backpack inside and smiled. Among all the hooks, bags, and little coats, there was a special place made just for you.',
          x: 1118, y: 340, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: WHITE, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 10 — Circle Time Wonder ─────────────────────────────────────────────
    // Design: text LEFT, navy
    {
      pageIndex: 10,
      backgroundAsset: `${BG}/page-10.png`,
      poseReference:   `${REF}/page-10.png`,
      characterActionPrompt:
        `A calm classroom moment during circle time. The child sits attentively on a cozy rug, looking up with bright eyes as if listening to a story or morning greeting. They are the clear focus. Add a calendar board, alphabet visuals, and plush classroom textures. Place the child on the RIGHT half, never centered. Leave the left side airy for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 990, y: 0, width: 1010, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'During circle time, you listened to songs, stories, and morning messages.\n\nSome words were familiar. Others were brand new. You raised your hand and began sharing your bright ideas with the class.',
          x: 134, y: 360, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 11 — A New Friend ───────────────────────────────────────────────────
    // Design: text RIGHT, navy, maxWidth=691
    {
      pageIndex: 11,
      backgroundAsset: `${BG}/page-11.png`,
      poseReference:   `${REF}/page-11.png`,
      characterActionPrompt:
        `A sweet scene showing the child meeting a new classmate and sharing a shy but happy smile. The interaction feels innocent and gentle, perhaps near a puzzle table or block area. Keep the emotional focus on the child discovering friendship. The classmate remains secondary. The mood is warm, welcoming, and hopeful. Place the child on the LEFT half, never centered. Leave text space on the right.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 1268, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Nearby, another child gave you a shy little smile.\n\nYou smiled back.\n\nThat was all it took for two strangers to begin becoming friends—one hello, one shared toy, and one happy laugh at a time.',
          x: 1098, y: 300, maxWidth: 691,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 12 — Letters Everywhere ─────────────────────────────────────────────
    // Design: text LEFT, white
    {
      pageIndex: 12,
      backgroundAsset: `${BG}/page-12.png`,
      poseReference:   `${REF}/page-12.png`,
      characterActionPrompt:
        `A playful literacy scene with the child exploring letters and books. They may be holding an alphabet card, looking at a storybook, or reaching toward a shelf of colourful books. Their expression shows curiosity and delight, as though letters are becoming little treasures. Place the child on the RIGHT half, never centered. Leave soft text space on the left.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 787, y: 0, width: 1213, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'You discovered that letters were everywhere.\n\nThey were inside your name, hiding in books, and waiting on every classroom wall. When letters joined together, they could create whole worlds of stories.',
          x: 121, y: 319, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: WHITE, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 13 — Making Art ──────────────────────────────────────────────────────
    // Design: text RIGHT, navy
    {
      pageIndex: 13,
      backgroundAsset: `${BG}/page-13.png`,
      poseReference:   `${REF}/page-13.png`,
      characterActionPrompt:
        `An art-table scene where the child paints or creates a craft project with joyful concentration. Show child-safe paint, paper, brushes, and a masterpiece taking shape. Add soft classroom decor and blurred creative supplies in the background. Their face glows with pride and imagination. Place the child on the LEFT half, never centered. Leave open text space on the right.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 1221, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'At the art table, you dipped your brush into the paint and let your imagination lead the way.\n\nSwirls became skies. Shapes became dreams. When you finished, your masterpiece was wonderfully, proudly yours.',
          x: 1103, y: 286, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 14 — Counting Little Wonders ───────────────────────────────────────
    // Design: text LEFT, white
    {
      pageIndex: 14,
      backgroundAsset: `${BG}/page-14.png`,
      poseReference:   `${REF}/page-14.png`,
      characterActionPrompt:
        `A math-learning scene where the child is engaged with counting bears, blocks, beads, or kindergarten manipulatives. They look focused and pleased as they explore numbers through play. Keep the scene bright, tactile, and child-friendly. Place the child on the RIGHT half, never centered. Leave the left side open for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 1053, y: 0, width: 947, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'You counted blocks, buttons, steps, and stars.\n\nNumbers helped you sort, build, measure, and solve. Every time you found an answer, your confidence grew just a little bit bigger.',
          x: 136, y: 286, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: WHITE, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 15 — Music and Movement ─────────────────────────────────────────────
    // Design: text RIGHT, navy
    {
      pageIndex: 15,
      backgroundAsset: `${BG}/page-15.png`,
      poseReference:   `${REF}/page-15.png`,
      characterActionPrompt:
        `A happy classroom scene where the child enjoys music and movement time. They may be clapping, dancing, holding a simple rhythm instrument, or following along joyfully. The room feels lively yet soft and dreamy. Capture freedom, rhythm, and happiness. Place the child on the LEFT half, never centered. Leave soft negative space on the right for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 926, height: 987 },
      textBlocks: [
        {
          id: 'body',
          template: 'When the music began, your hands clapped and your feet started moving.\n\nYou shook, tapped, twirled, and laughed.\n\nThere was no wrong way to dance when your heart was keeping the beat.',
          x: 1118, y: 319, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 16 — Playground Adventures ─────────────────────────────────────────
    // Design: text LEFT, white
    {
      pageIndex: 16,
      backgroundAsset: `${BG}/page-16.png`,
      poseReference:   `${REF}/page-16.png`,
      characterActionPrompt:
        `A cheerful recess scene where the child plays outside on the school playground. Show them climbing, running, or pausing at the top of a slide with delight. The playground feels safe, colourful, and exciting with soft trees and sky. Their expression shows confidence growing. Place the child on the RIGHT half, never centered. Leave airy text space on the left.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 1097, y: 0, width: 903, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Outside, the playground looked like a world of its own.\n\nYou climbed a little higher, ran a little faster, and tried something new. Each brave choice showed you how much you could do.',
          x: 151, y: 174, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: WHITE, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 17 — Snack Time Kindness ────────────────────────────────────────────
    // Design: text RIGHT, navy
    {
      pageIndex: 17,
      backgroundAsset: `${BG}/page-17.png`,
      poseReference:   `${REF}/page-17.png`,
      characterActionPrompt:
        `A gentle snack-time scene where the child sits at a little table enjoying their snack and sharing a small smile with someone nearby. Show their lunchbox, napkin, and simple classroom table details. The focus is on comfort, routine, and the sweetness of everyday school moments. Place the child on the LEFT half, never centered. Leave soft open space on the right for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 1125, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'At snack time, you noticed that kindness could be small and still mean a lot.\n\nIt could be sharing a seat, helping with a lunchbox, or saying,\n\n"You can sit beside me."',
          x: 1115, y: 340, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 18 — When Things Feel Hard ─────────────────────────────────────────
    // Design: text LEFT, navy
    {
      pageIndex: 18,
      backgroundAsset: `${BG}/page-18.png`,
      poseReference:   `${REF}/page-18.png`,
      characterActionPrompt:
        `A tender emotional scene where the child experiences a small kindergarten challenge — dropping crayons, struggling with a task, or feeling briefly unsure. Their expression is thoughtful or slightly discouraged, but not intensely upset. The mood stays reassuring, showing that small hard moments are part of growing. Place the child on the RIGHT half, never centered. Leave the left side open for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 727, y: 0, width: 1273, height: 999 },
      textBlocks: [
        {
          id: 'body',
          template: 'Sometimes a tower tumbled. Sometimes an answer was wrong.\n\nSometimes you missed home and wished the day would move faster.\n\nAnd that was okay.',
          x: 136, y: 96, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 19 — Brave Again ─────────────────────────────────────────────────────
    // Design: text RIGHT, navy
    {
      pageIndex: 19,
      backgroundAsset: `${BG}/page-19.png`,
      poseReference:   `${REF}/page-19.png`,
      characterActionPrompt:
        `A recovery moment after a small struggle. The child smiles again, perhaps picking up dropped crayons. The scene shows resilience, courage, and quiet pride. Make the emotion heartfelt and uplifting. Place the child on the LEFT half, never centered. Leave soft text space on the right.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 71, width: 1145, height: 923 },
      textBlocks: [
        {
          id: 'body',
          template: 'You took a slow breath and tried again.\n\nMistakes did not mean you could not do it. They meant your brain was learning something new.\n\nEach try made you stronger than before.',
          x: 1105, y: 340, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 20 — Sharing Something Special ─────────────────────────────────────
    // Design: text LEFT, navy
    {
      pageIndex: 20,
      backgroundAsset: `${BG}/page-20.png`,
      poseReference:   `${REF}/page-20.png`,
      characterActionPrompt:
        `A meaningful show-and-tell moment where the child proudly presents something dear to them — a drawing, a favourite toy, or a small family keepsake. The classroom feels attentive and warm while the focus stays on their confidence and joy. Capture the magical feeling of being seen and heard. Place the child on the RIGHT half, never centered. Leave soft open space on the left for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 947, y: 54, width: 1053, height: 946 },
      textBlocks: [
        {
          id: 'body',
          template: 'One day, it was your turn to stand in front of the class.\n\nYour voice began softly, but soon your words grew clear and proud.\n\nEveryone listened because what you had to share mattered.',
          x: 134, y: 173, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 21 — Story Time Magic ───────────────────────────────────────────────
    // Design: text RIGHT, navy
    {
      pageIndex: 21,
      backgroundAsset: `${BG}/page-21.png`,
      poseReference:   `${REF}/page-21.png`,
      characterActionPrompt:
        `A peaceful story-time scene where the child sits with a book, fully absorbed in imagination. They may be on a reading rug, a beanbag, or a cosy classroom nook. Light softly wraps around them, emphasising a dreamy love of books and learning. The scene feels calm, magical, and comforting. Place the child on the LEFT half, never centered. Leave text space on the right.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 1168, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Books carried you far beyond the classroom.\n\nYou sailed across oceans, visited distant planets, met talking animals, and discovered magical lands—all without leaving your cozy reading spot.',
          x: 1114, y: 246, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 22 — Growing Every Day ──────────────────────────────────────────────
    // Design: text LEFT, navy
    {
      pageIndex: 22,
      backgroundAsset: `${BG}/page-22.png`,
      poseReference:   `${REF}/page-22.png`,
      characterActionPrompt:
        `A reflective classroom scene showing how much the child has grown. They stand proudly near a wall of artwork, a class project, or a display of things they have learned. They look more confident now — still sweet, but visibly braver. The mood feels proud, gentle, and full of progress. Place the child on the RIGHT half, never centered. Leave the left side reserved for text.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 931, y: 0, width: 1069, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Day by day, your letters became neater, your numbers became easier, and your friendships became stronger.\n\nYou were still the same wonderful [CHILD_NAME], but now you knew so much more.',
          x: 136, y: 286, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── Page 23 — The Last Day Glow ──────────────────────────────────────────────
    // Design: text RIGHT, navy
    {
      pageIndex: 23,
      backgroundAsset: `${BG}/page-23.png`,
      poseReference:   `${REF}/page-23.png`,
      characterActionPrompt:
        `A sentimental end-of-school-year scene inside the classroom. The room feels softly celebratory with little decorations, neat shelves, and end-of-year warmth. The child looks around with a tender, grateful expression, as if realising this special place has become part of them. The scene feels nostalgic and beautiful. Place the child on the LEFT half, never centered. Leave soft negative space on the right.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 0, y: 0, width: 1111, height: 980 },
      textBlocks: [
        {
          id: 'body',
          template: 'Before long, the classroom that once felt new had become a place filled with memories.\n\nEvery picture, shelf, and little chair reminded you of something you had learned, created, or bravely tried.',
          x: 1110, y: 164, maxWidth: 662,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

    // ── And Beyond — Closing Spread ──────────────────────────────────────────────
    // Background: page-24-last.png (white LEFT panel + dreamlike scene RIGHT)
    // Design: text LEFT at x=480, navy
    // ⚠ Page_24 graduation OMITTED — no background asset (design data has text but no PNG)
    {
      pageIndex: 24,
      backgroundAsset: `${BG}/page-24-last.png`,
      poseReference:   `${REF}/page-25-and-beyond.png`,
      characterActionPrompt:
        `A hopeful final scene symbolising the future beyond kindergarten. The child stands looking ahead on a gentle path toward a bright horizon. Include soft symbolic elements: books, stars, paper aeroplanes, a distant school path opening into a wider world. The mood feels inspiring, emotional, and full of promise. Place the child on the RIGHT half of the canvas — the LEFT half is a clean white panel, leave it completely empty.${STYLE}`,
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 1000, y: 0, width: 1000, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: 'Kindergarten was only the first chapter of your incredible adventure.\n\nThere will be more books to read, questions to ask, friends to meet, and dreams to follow.\n\nKeep learning. Keep wondering. Keep being brave.\n\nThe whole wide world is waiting for you, [CHILD_NAME].',
          x: 480, y: 167, maxWidth: 414,
          fontFamily: FONT, fontSize: FS,
          color: NAVY, align: 'center', lineHeight: LH,
        },
      ],
    },

  ],
}