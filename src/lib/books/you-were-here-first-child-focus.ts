// src/lib/books/you-were-here-first-child-focus.ts
//
// Book config for "You Were Here First — A Story for [CHILD_NAME]" (Child-Focus Variant)
// Slug: you-were-here-first-child-focus
// Canvas: 2000 × 1000 px (16in × 8in at 125 PPI)
//
// DESIGN NOTES:
// - Separate book from you-were-here-first (different style, prompts, single-character policy).
// - SINGLE CHARACTER ONLY throughout. No parents, adults, or baby visible in any page EXCEPT
//   Page_11 (array index 10) where parent silhouettes appear blurred in background — intentional.
// - Baby/sibling presence suggested via objects only (bassinet, baby shoes, etc.).
// - Exact-coordinates policy on all pages: skipTextCollision: true.
// - Coordinates from Design_Data_You_Were_Here_First.xlsx "Text Coordinates" sheet, px columns.
// - Font sizes for cover/dedication/keepsake: spreadsheet col 7 is in INCHES × 125 = px.
// - Font sizes for body text pages (03–11): col 7 is text-box HEIGHT (not font size).
//   BODY_FS = 55px is a visual estimate from reference images. Confirm after first test render.
// - Keepsake L4 font size: estimated at 28px (spreadsheet value 1.5 contradicts visual scale).
//   Confirm after first test render.
// - Mabook body text renders all-caps by design — do not treat as an error.
// - ⚠ Page_05 text uses [SIBLING_NAME] — likely a typo for [CHILD_NAME]. Awaiting decision.
// - ⚠ Keepsake L4 uses [CHILD_FULL_NAME], [SIBLING_FULL_NAME], [SIBLING_BIRTH_DATE] — new
//   frontend form fields required before this page can be fully personalized.
// - Decorative bow divider "— ⊗ —" implemented as SVG on cover. Keepsake divider baked into page_12_bg.png.
// - Text color calibrated to '#2a4587' from reference images. Confirm after first test render.
//
// ASSET STATUS (2026-07-16 resolved):
// - All backgrounds: 2000×1000 ✓ confirmed (re-exported by designer)
// - page_05_bg.png: supplied ✓
//
// PROMPT FILE INCONSISTENCIES CORRECTED HERE (coordinates are authoritative):
// - page_02 (Dedication): prompt file said "left side" — corrected to RIGHT (char x=1360).
// - page_07 (design, array 6): prompt file said "left side" — corrected to RIGHT (char x=1328).
// - page_08 (design, array 7): prompt file said "right side" — corrected to LEFT (char x=78).
//
// FONT LICENSING:
// - BestSwashed_PERSONAL_USE_ONLY.otf — personal-use-only per filename.
//   Confirm commercial licence before public launch.

import type { BookPage } from './before-the-music-plays'

const BG  = 'public/books/you-were-here-first-child-focus/backgrounds'
const REF = 'public/books/you-were-here-first-child-focus/ref'

const TITLE_FONT    = 'BestSwashed_PERSONAL_USE_ONLY.otf'  // "Best Swashed PERSONAL USE"
const SUBTITLE_FONT = 'Lora-Variable.ttf'                   // "Lora"
const BODY_FONT     = 'Mabook.otf'                          // "Mabook"

const NAVY   = '#2a4587'  // medium-bright navy — calibrated from reference images (was #1e3264, too dark).
const WHITE  = '#FFFFFF'

// Estimated from reference images — NOT from spreadsheet. Confirm after first test render.
const BODY_FS = 55

const STYLE_SUFFIX = `Style: Premium stylized 3D children's storybook illustration. The child is sharply focused while the environment gradually fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, muted background colors, atmospheric haze, and softly faded frame edges. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, reduced saturation, and no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.`

export const YOU_WERE_HERE_FIRST_CF_CHARACTER_PROMPT = `Create a premium stylized 3D children's storybook illustration of the uploaded photo of the child sitting alone (eye/head facing front) on a cozy couch in a softly lit nursery. the child is hugging a light blue knitted blanket close to his/her chest and wearing a gentle, emotional smile with warm, thoughtful eyes. He/she is the only visible character and the clear emotional focus. Add a soft pillow, a favorite stuffed toy beside him/her, a few books, and delicate nursery decor in the background. Keep the mood heartfelt, comforting, and sentimental. Use soft diffused daylight, neutral-to-cool tones, no strong yellow tint, shallow depth of field, creamy bokeh, and a softly blurred background. High-end cinematic 3D render, expressive rounded features, realistic curls, soft fabric textures, dreamy storybook atmosphere, clean composition, high resolution.

Style: Premium stylized 3D children's storybook illustration. Use shallow depth of field, creamy bokeh, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, reduced saturation, and no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.`

export const youWereHereFirstChildFocus: { slug: string; title: string; pages: BookPage[] } = {
  slug:  'you-were-here-first-child-focus',
  title: 'You Were Here First',
  pages: [

    // ── Array 0 = Design Page_00 — Cover ──────────────────────────────────────
    // All text centered at x=1500 (exact center of the right illustration half, x=1000–2000).
    //   tspanX = block.x + block.maxWidth/2, so x = 1500 − maxWidth/2 for each block.
    // Layout order (cap-top Y coords):
    //   y=42   "You Were"         (title1, smaller)
    //   y=104  "Here First"       (title2, larger — swash arc is natural to BestSwashed)
    //   y=282  "— ⊗ —"            (bow divider, white, styled after page_12 keepsake gold divider)
    //   y=305  "A Story for …"    (subtitle, one row, above character head at ~38% = y=380)
    // svgOverlay: white gradient over top 36% of illustration only.
    {
      pageIndex: 0,
      backgroundAsset: `${BG}/page_00_bg.png`,
      poseReference:   `${REF}/page_00.png`,
      characterActionPrompt: `Create a premium stylized 3D children's storybook illustration of a young child sitting alone (eye/head facing front) on a cozy couch in a softly lit nursery. They are hugging a light blue knitted blanket close to their chest and wearing a gentle, emotional smile with warm, thoughtful eyes. They are the only visible character and the clear emotional focus. Add a soft pillow, a favorite stuffed toy beside them, a few books, and delicate nursery decor in the background. Keep the mood heartfelt, comforting, and sentimental. Use soft diffused daylight, neutral-to-cool tones, no strong yellow tint, shallow depth of field, creamy bokeh, and a softly blurred background. High-end cinematic 3D render, expressive rounded features, realistic curls, soft fabric textures, dreamy storybook atmosphere, clean composition, high resolution.

Composition: Place the character on the right side only, never in the center. Keep the upper-right area (top ~38% of canvas) clear for title text overlay. The child's face must appear below 38% from the top.

Style: Premium stylized 3D children's storybook illustration. Use shallow depth of field, creamy bokeh, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, reduced saturation, and no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1203, y: 149, width: 534, height: 1005 },
      skipTextCollision: true,
      svgOverlay: [
        '<defs>',
        // userSpaceOnUse coords — more reliable with librsvg than objectBoundingBox.
        '  <linearGradient id="coverTopFade" x1="1000" y1="0" x2="1000" y2="400" gradientUnits="userSpaceOnUse">',
        '    <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.88"/>',
        '    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>',
        '  </linearGradient>',
        '</defs>',
        '<rect x="1000" y="0" width="1000" height="400" fill="url(#coverTopFade)"/>',
        // "Here First" — per-character placement along a 5% upward dome Bézier arc.
        // SVG <textPath> is broken on Windows/Pango in librsvg 2.61; per-char is the workaround.
        // Arc: P0=(1162,129) P1=(1500,61) P2=(1838,129) — quadratic Bézier, 5.0% dome over 675px text width.
        // Characters measured via fontkit (BestSwashed, 88px, capHeight=1168/1000).
        // Positions are cap-height-top based: baselineY = arcPt.y + capHeightPx(102.8).
        // Shifted +40px total from original (+20 +50 -30 = +40px = 4% of canvas).
        '<text x="1232.66" y="259.10" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(-9.062, 1232.66, 156.32)">H</text>',
        '<text x="1335.28" y="245.88" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(-5.612, 1335.28, 143.09)">e</text>',
        '<text x="1397.21" y="240.94" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(-3.509, 1397.21, 138.15)">r</text>',
        '<text x="1459.28" y="238.28" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(-1.392, 1459.28, 135.49)">e</text>',
        '<text x="1506.75" y="237.80" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(0.231, 1506.75, 135.01)"> </text>',
        '<text x="1588.55" y="240.12" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(3.024, 1588.55, 137.34)">F</text>',
        '<text x="1670.23" y="246.43" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(5.799, 1670.23, 143.64)">i</text>',
        '<text x="1715.47" y="251.63" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(7.325, 1715.47, 148.85)">r</text>',
        '<text x="1773.59" y="260.11" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(9.270, 1773.59, 157.33)">s</text>',
        '<text x="1817.53" y="267.86" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(10.727, 1817.53, 165.07)">t</text>',
        // Bow divider — white, styled after page_12 keepsake gold divider.
        // Two long lines flanking a bowtie/ribbon ornament, centered at x=1500.
        '<line x1="1252" y1="287" x2="1462" y2="287" stroke="#FFFFFF" stroke-width="1.5"/>',
        '<path d="M 1500,287 C 1498,281 1488,277 1481,282 C 1474,287 1480,294 1490,293 C 1494,292 1498,290 1500,287" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>',
        '<path d="M 1500,287 C 1502,281 1512,277 1519,282 C 1526,287 1520,294 1510,293 C 1506,292 1502,290 1500,287" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>',
        '<circle cx="1500" cy="287" r="2" fill="#FFFFFF"/>',
        '<line x1="1538" y1="287" x2="1748" y2="287" stroke="#FFFFFF" stroke-width="1.5"/>',
      ].join('\n'),
      textBlocks: [
        {
          // Center: 1200 + 600/2 = 1500.
          id: 'title1',
          template: 'You Were',
          x: 1200, y: 42, maxWidth: 600,
          fontFamily: TITLE_FONT, fontSize: 47,
          color: NAVY, align: 'center',
        },
        {
          id: 'subtitle',
          template: 'A Story for [CHILD_NAME]',
          x: 1150, y: 315, maxWidth: 700,
          fontFamily: SUBTITLE_FONT, fontSize: 33,
          fontWeight: 700,
          color: WHITE, align: 'center',
        },
      ],
    },

    // ── Array 1 = Design Page_02 — Dedication ─────────────────────────────────
    // Character on RIGHT half (x=1360). Dedication text also on RIGHT half (x=1071).
    // Text intentionally overlays character — skipTextCollision: true.
    // Left half of canvas is clean/blank in this spread.
    // ⚠ Spreadsheet labels this tagline as "L3" (implies decorative ornament at L2 position,
    //   not implemented here).
    {
      pageIndex: 1,
      backgroundAsset: `${BG}/page_02_bg.png`,
      poseReference:   `${REF}/page_02.png`,
      characterActionPrompt: `A quiet, sentimental close-up of the young child sitting alone in a cozy nursery or bedroom reading corner. They are wrapped gently in their favorite soft blanket and lovingly hugging a treasured stuffed animal against their chest. Their expression is peaceful, secure, and deeply loved. Surround them with a few meaningful details from their own story: their favorite picture book, a small framed initial or handprint artwork, a neatly folded blanket, soft curtains, and cool morning window light. Keep the composition simple and intimate, with the child as the unmistakable emotional focus.

Composition: Place the child on the right side only, never in the center. Leave generous softly faded blank space on the left for dedication text. Use a close, child-level camera angle.

Character restriction: Only the child is visible. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or people in photographs.

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1360, y: 165, width: 626, height: 746 },
      skipTextCollision: true,
      svgOverlay: [
        '<defs>',
        '  <filter id="dedShadow" x="-15%" y="-15%" width="130%" height="130%">',
        '    <feDropShadow dx="2" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="1.2"/>',
        '  </filter>',
        '</defs>',
      ].join('\n'),
      textBlocks: [
        {
          id: 'ded-name',
          template: 'For\n[CHILD_NAME]',
          x: 1030, y: 270, maxWidth: 700,
          fontFamily: TITLE_FONT, fontSize: 70,
          color: WHITE, align: 'left',
          filterUrl: 'url(#dedShadow)',
          lineHeight: 1.5,
        },
        {
          id: 'ded-tagline',
          template: '[DEDICATION]',
          x: 1030, y: 555, maxWidth: 950,
          fontFamily: TITLE_FONT, fontSize: 48,
          color: WHITE, align: 'left',
          filterUrl: 'url(#dedShadow)',
          lineHeight: 1.5,
        },
      ],
    },

    // ── Array 2 = Design Page_03 ──────────────────────────────────────────────
    // Character LEFT (x=398). Text RIGHT (x=1151).
    {
      pageIndex: 2,
      backgroundAsset: `${BG}/page_03_bg.png`,
      poseReference:   `${REF}/page_03.png`,
      characterActionPrompt: `A heartwarming wide storybook scene showing the young child happily moving through a cozy family living room that is filled with traces of their personality. Their favorite toys, dinosaur figure, drawings, books, small blanket, building blocks, and handmade artwork appear naturally around the room. The home should feel shaped by their laughter, imagination, and memories. Show them smiling softly as they pause beside something special they created, making it clear that this is their home and their story lives everywhere inside it.

Composition: Place the child on the left side, never in the center. Keep their face and body sharply focused. Let the room gradually fade toward the right, creating open text space.

Character restriction: Only the child is visible. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or recognizable people in photographs.

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 398, y: 91, width: 309, height: 893 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'Right now, [CHILD_NAME], this home is full of you.\n\nYour laughter, your drawings, and your favorite things –\n\nEvery room carries a little piece of your story',
          x: 1151, y: 264, maxWidth: 749,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 3 = Design Page_04 ──────────────────────────────────────────────
    // Character RIGHT (x=1261). Text LEFT (x=100).
    {
      pageIndex: 3,
      backgroundAsset: `${BG}/page_04_bg.png`,
      poseReference:   `${REF}/page_04.png`,
      characterActionPrompt: `A gentle child-focused scene showing the young child sitting alone on the right side of a soft bed or cozy couch. They carefully hold one tiny baby sock or a small ultrasound picture in both hands and study it with a curious, thoughtful expression. Nearby, include subtle signs that a new baby is coming: a folded baby blanket, tiny shoes, a closed baby book, or an empty bassinet softly blurred in the background. The child should look reflective but safe and reassured, as though they are quietly wondering what may change while still feeling secure in their own place.

Composition: Place the child on the right side only, never in the center. Leave softly faded open space on the left for story text. Use a close child-level view and keep all baby-related objects secondary.

Character restriction: Only the child is visible. The bassinet must be empty. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or recognizable people in photographs.

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1261, y: -48, width: 620, height: 1078 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'Soon, a new baby will join our family.\n\nYou may wonder what will change, or where your place will be.\n\nBut your place is already yours. No one else can fill it.',
          x: 100, y: 294, maxWidth: 806,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 4 = Design Page_05 ──────────────────────────────────────────────
    // Character LEFT (x=329). Text RIGHT (x=1094).
    // [SIBLING_NAME] typo in spreadsheet corrected to [CHILD_NAME] — confirmed by user.
    {
      pageIndex: 4,
      backgroundAsset: `${BG}/page_05_bg.png`,
      poseReference:   `${REF}/page_05.png`,
      characterActionPrompt: `A symbolic but gentle scene focused entirely on the young child. They sit comfortably on the floor holding a handmade paper heart close to their chest, surrounded by a soft expanding glow that forms a subtle heart-shaped pool of light around them. A smaller paper heart, a tiny folded baby blanket, or a pair of baby shoes rests quietly nearby to suggest that love is making room for someone new. The child remains at the center of the feeling, looking calm, cherished, and secure. The growing light should feel emotional and natural, not overly magical.

Composition: Place the child on the left side only, never in the center. Let the heart-shaped light and background fade softly toward the right, leaving open space for text.

Character restriction: Only the child is visible. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or recognizable people in photographs.

Style: Premium stylized 3D children's storybook illustration. The child is sharply focused while the environment gradually fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, muted background colors, atmospheric haze, and softly faded frame edges. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, reduced saturation, and no strong yellow tint. Use gentle blush, cream, dusty blue, sage, and muted rose accents. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.`,
      includesSenderCharacter: false,
      characterPlacement: { x: 329, y: 13, width: 446, height: 921 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'Love does not move away to make room.\n\nIt stretches. It grows.\n\nIt grew the day you arrived, [CHILD_NAME], and it will keep growing around you.',
          x: 1094, y: 294, maxWidth: 806,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 5 = Design Page_06 ──────────────────────────────────────────────
    // Character RIGHT (x=1268). Text LEFT (x=100).
    {
      pageIndex: 5,
      backgroundAsset: `${BG}/page_06_bg.png`,
      poseReference:   `${REF}/page_06.png`,
      characterActionPrompt: `A sweet and familiar scene of the young child sitting alone on a stair step while holding their favorite dinosaur toy. They gently touch or look toward the one stair that makes a funny creak, wearing a small knowing smile. Include meaningful home details such as a soft rug, a familiar banister, their shoes near the doorway, a cozy reading nook in the distance, and gentle window light. The scene should communicate that they know the little secrets, sounds, and favorite corners of this home because they were here first.

Composition: Place the child on the right side only, never in the center. Keep the stair, dinosaur toy, and child clearly defined while the left side fades softly into open text space.

Character restriction: Only the child is visible. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or recognizable people in photographs.

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1268, y: 1, width: 574, height: 1021 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'You were here first, and that is something only you can be.\n\nYou know the squeaky stair, the coziest corner, and exactly where the best toys hide.\n\nThis home holds your very first memories.',
          x: 100, y: 234, maxWidth: 806,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 6 = Design Page_07 ──────────────────────────────────────────────
    // Character RIGHT (x=1328) — prompt file said "left", corrected to match coordinates.
    // Text LEFT (x=100).
    {
      pageIndex: 6,
      backgroundAsset: `${BG}/page_07_bg.png`,
      poseReference:   `${REF}/page_07.png`,
      characterActionPrompt: `A tender future-looking scene showing the young child alone in a softly prepared nursery. They carefully place one of their favorite picture books or a treasured stuffed animal beside an empty bassinet, as though saving something special to share later. Their expression is proud, gentle, and thoughtful. Add a small shelf with two books, a folded baby blanket, a star-shaped night-light, and a window view they may someday point out. The moment should show their special role as the first guide without making them seem responsible for the baby.

Composition: Place the child on the right side only, never in the center. Keep them sharply focused. Let the empty nursery fade toward the left, leaving clean open text space on the left.

Character restriction: Only the child is visible. The bassinet must be empty. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or recognizable people in photographs.

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1328, y: -46, width: 465, height: 1113 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'One day, you may choose to share those little things.\n\nA favorite book. A silly game. The view from the window.\n\nYou will get to be the first one to show the way.',
          x: 100, y: 264, maxWidth: 806,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 7 = Design Page_08 ──────────────────────────────────────────────
    // Character LEFT (x=78) — prompt file said "right", corrected to match coordinates.
    // Text RIGHT (x=1094).
    {
      pageIndex: 7,
      backgroundAsset: `${BG}/page_08_bg.png`,
      poseReference:   `${REF}/page_08.png`,
      characterActionPrompt: `A heartfelt child-focused scene showing the young child standing or kneeling beside an empty bassinet in a calm nursery. They hold a softly glowing star-shaped night-light or a tiny comfort toy in both hands, as though imagining how they may someday help make a new or uncertain moment feel safer. Their expression should be kind, steady, and uniquely their own. Include a small name block, a familiar dinosaur toy near their feet, and a folded baby blanket to connect their own identity with the coming sibling. Add a few solid floating twinkles, subtle and elegant, around the night-light.

Composition: Place the child on the left side only, never in the center. Keep the child, comfort object, and nearest nursery details solid and sharply focused. Create a dramatic gradual fade toward a nearly plain muted background on the right for story text.

Character restriction: Only the child is visible. The bassinet must be empty. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or recognizable people in photographs.

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 78, y: -16, width: 544, height: 1031 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'And when something feels new, scary, or too big, your little brother or sister may look for you.\n\nNot because you must know everything –\n\nBut because there is only one you.',
          x: 1094, y: 234, maxWidth: 806,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 8 = Design Page_09 ──────────────────────────────────────────────
    // Character LEFT (x=434). Text RIGHT (x=1094).
    {
      pageIndex: 8,
      backgroundAsset: `${BG}/page_09_bg.png`,
      poseReference:   `${REF}/page_09.png`,
      characterActionPrompt: `A sweet, lightly playful scene showing the young child alone beside an empty bassinet while a baby monitor or small sound-light softly glows nearby, suggesting that a new baby can sometimes be loud without showing the baby. The child makes a curious, slightly amused expression and may gently cover one ear while still smiling. Nearby, include child-centered keepsakes from when they were tiny: their old baby shoes, a small folded keepsake blanket, a framed handprint or footprint, and one favorite toy. The mood must remain reassuring, affectionate, and never stressful.

Composition: Place the child on the left side only, never in the center. Keep the child, floor, and a few flat-laying toys solid and clear. Let the nursery fade dramatically toward a nearly plain muted background on the right for story text.

Character restriction: Only the child is visible. The bassinet must be empty. Do not show a baby on the monitor. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or recognizable people in photographs.

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 434, y: -25, width: 480, height: 1025 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'At first, the baby will be tiny, new, and sometimes very loud.\n\nYou were tiny and new once, too. And from the very beginning, you were wonderful.',
          x: 1094, y: 324, maxWidth: 806,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 9 = Design Page_10 ──────────────────────────────────────────────
    // Character RIGHT (x=1231). Text LEFT (x=100).
    {
      pageIndex: 9,
      backgroundAsset: `${BG}/page_10_bg.png`,
      poseReference:   `${REF}/page_10.png`,
      characterActionPrompt: `A deeply reassuring close scene showing the young child alone in their cozy bedroom. They are curled comfortably in a soft chair or seated on the bed, wrapped in their favorite blanket and holding their treasured stuffed animal or dinosaur toy. A gentle heart-shaped pool of window light surrounds them, while their drawings, name blocks, favorite books, and familiar belongings quietly affirm that their place is secure. Their expression is relaxed, certain, and completely loved. The scene should feel like a visual promise made directly to them.

Composition: Place the child on the right side only, never in the center. Keep the child and their meaningful belongings solid and sharply focused. Fade the background dramatically toward a soft, nearly plain muted color on the left for story text.

Character restriction: Only the child is visible. No parents, adults, baby, sibling, silhouettes, reflections, extra hands, or recognizable people in photographs.

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1231, y: 65, width: 466, height: 834 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'You still are, [CHILD_NAME]. You always will be.\n\nYou do not have to be bigger, braver, or different to keep your place in our hearts.\n\nYou only have to be you.',
          x: 100, y: 264, maxWidth: 806,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 10 = Design Page_11 — Closing scene ─────────────────────────────
    // Character RIGHT (x=1295). Text LEFT (x=100).
    // ⚠ MODERATE GEMINI RISK: parent silhouettes visible in background (intentional per design).
    //   Prompt strictly enforces no face/identification. If Gemini renders identifiable features,
    //   reject and regenerate. This is the only page in this book with additional figures.
    {
      pageIndex: 10,
      backgroundAsset: `${BG}/page_11_bg.png`,
      poseReference:   `${REF}/page_11.png`,
      characterActionPrompt: `A sentimental closing scene showing the first child standing in the doorway of the nursery or family room, looking back at the parents' silhouette (no face) and new baby with a soft, peaceful expression. The scene should feel complete and emotionally secure. Include subtle symbols of the child's place in the family: their favorite toy, a framed family photo, and a soft path of light leading from the child's room to the nursery. The mood should show that the family has grown, but the first child's love story remains special and unchanged.

Child character shows solid on the right side and not in the center.

Background: (Key details are showing solid) while dramatic fade. (Parents and the baby show only silhouette, no identifying features), (no photograph is showing).

${STYLE_SUFFIX}`,
      includesSenderCharacter: false,
      characterPlacement: { x: 1295, y: 51, width: 325, height: 951 },
      skipTextCollision: true,
      textBlocks: [
        {
          id: 'body',
          template: 'You were here first. The love that began with you will always be yours.\n\nYour family may grow, but your story will never grow smaller.\n\nYou will always be our first little wonder –\n\nand always, deeply loved.',
          x: 100, y: 173, maxWidth: 806,
          fontFamily: BODY_FONT, fontSize: BODY_FS,
          color: NAVY, align: 'center', lineHeight: 1.4,
          strokeColor: WHITE, strokeWidth: 3.5,
        },
      ],
    },

    // ── Array 11 = Design Page_12 — Keepsake ──────────────────────────────────
    // No character. Text-only spread on RIGHT half.
    // page_12_bg.png is the only background at the correct 2000×1000 size ✓
    // Gold "— ✦ —" divider (kp-divider) between kp-title2 and kp-subtitle, matching cover style.
    // ⚠ kp-fill font size 28px is an ESTIMATE. Confirm after test render.
    // ⚠ [CHILD_FULL_NAME], [SIBLING_FULL_NAME], [SIBLING_BIRTH_DATE] are new personalization
    //   tokens — frontend form fields required before this page fully personalizes.
    {
      pageIndex: 11,
      backgroundAsset: `${BG}/page_12_bg.png`,
      poseReference:   `${REF}/page_12.png`,
      characterActionPrompt: '',
      includesSenderCharacter: false,
      skipTextCollision: true,
      svgOverlay: [
        // "Here First" arc — identical to cover, all Y values shifted +166px
        // (keepsake "You Were" y=208 vs cover y=42 → delta=+166px).
        '<text x="1232.66" y="425.10" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(-9.062, 1232.66, 322.32)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">H</text>',
        '<text x="1335.28" y="411.88" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(-5.612, 1335.28, 309.09)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">e</text>',
        '<text x="1397.21" y="406.94" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(-3.509, 1397.21, 304.15)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">r</text>',
        '<text x="1459.28" y="404.28" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(-1.392, 1459.28, 301.49)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">e</text>',
        '<text x="1506.75" y="403.80" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(0.231, 1506.75, 301.01)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill"> </text>',
        '<text x="1588.55" y="406.12" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(3.024, 1588.55, 303.34)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">F</text>',
        '<text x="1670.23" y="412.43" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(5.799, 1670.23, 309.64)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">i</text>',
        '<text x="1715.47" y="417.63" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(7.325, 1715.47, 314.85)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">r</text>',
        '<text x="1773.59" y="426.11" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(9.270, 1773.59, 323.33)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">s</text>',
        '<text x="1817.53" y="433.86" font-family="Best Swashed PERSONAL USE" font-size="88" fill="#2a4587" text-anchor="middle" transform="rotate(10.727, 1817.53, 331.07)" stroke="#FFFFFF" stroke-width="5" paint-order="stroke fill">t</text>',
      ].join('\n'),
      textBlocks: [
        {
          // Matches cover "You Were": fontSize=47, center at x=1500. y=208 (keepsake cap-top).
          id: 'kp-title1',
          template: 'You Were',
          x: 1200, y: 208, maxWidth: 600,
          fontFamily: TITLE_FONT, fontSize: 47,
          color: NAVY, align: 'center',
          strokeColor: WHITE, strokeWidth: 3,
        },
        {
          // Subtitle below the divider baked into the background. fontSize=33→36 (+10%).
          // Center: 1150+350=1500 ✓
          id: 'kp-subtitle',
          template: 'A Story for [CHILD_NAME]',
          x: 1150, y: 528, maxWidth: 700,
          fontFamily: SUBTITLE_FONT, fontSize: 36,
          fontWeight: 700,
          color: NAVY, align: 'center',
          strokeColor: WHITE, strokeWidth: 3.5,
        },
        {
          // ⚠ Font size 28px is estimated — confirm after test render.
          // ⚠ Tokens need new frontend form fields.
          id: 'kp-fill',
          template: 'This Book Belongs to: [CHILD_FULL_NAME]\nMy new baby brother or sister is named: [SIBLING_FULL_NAME]\nBorn on: [SIBLING_BIRTH_DATE]\n\nWith love, Mommy & Daddy',
          x: 1103, y: 760, maxWidth: 781,
          fontFamily: BODY_FONT, fontSize: 28,
          color: NAVY, align: 'left', lineHeight: 1.5,
        },
      ],
    },

  ],
}