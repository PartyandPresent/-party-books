// src/lib/books/before-the-music-plays.ts
//
// Book config for "Before the Music Plays — A Story for [CHILD_NAME]"
// Canvas: 1774 × 887 px (confirmed production resolution for all background assets).
//
// DESIGN NOTES (read before implementing):
// - [SENDER_NAME] replaces "Ms. Joy" throughout. The sender/bride is
//   INTENTIONALLY faceless/obscured on every page she appears (6, 7, 13).
//   She is NOT a separately generated or composited asset — she stays baked
//   into that page's static backgroundAsset. The cleanup pass for those pages
//   removed ONLY the child character.
// - Page 4 (mirror): generate the character ONCE, then produce the reflection
//   programmatically (horizontal flip ± slight perspective skew) during
//   compositing. characterPlacement covers the full combined width.
// - textBlock templates contain full story sentences with embedded
//   [CHILD_NAME] / [SENDER_NAME] placeholders. The text compositor must
//   support multi-line wrapping on the complete resolved string.
// - x/y = TOP-LEFT corner of the bounding box, in pixels, on the 1774×887 canvas.
// - maxWidth values have been sanity-checked against canvas width and clamped
//   where the raw spreadsheet measurements would overflow (noted inline).
// - characterPlacement height may exceed 887px on some pages — sharp will clip
//   naturally; the bounding box includes any shadow/glow extending below frame.

export interface BookPageTextBlock {
  id: string
  template: string
  x: number
  y: number
  maxWidth: number
  fontFamily: string
  fontSize: number
  color: string
  align: 'left' | 'center' | 'right'
  lineHeight?: number
  fontWeight?: number
  strokeColor?: string
  strokeWidth?: number
  filterUrl?: string
  // If set, this block is skipped entirely when the named replacement token is empty/absent.
  showOnlyIfSet?: string
  // Fallback text used when the template resolves to empty (e.g. [DEDICATION] not provided).
  // Token substitution ([CHILD_NAME] etc.) is applied to this value as well.
  defaultIfEmpty?: string
  // Arch the text baseline along a quadratic bezier. Value is % of maxWidth = rise at center.
  // e.g. 5 → midpoint lifts by 5% of maxWidth. Single-line and multi-line both supported.
  archPercent?: number
  // Per-character fill colors. Array cycles if shorter than the text.
  // Each character gets its own <text> element so colors don't bleed.
  letterColors?: string[]
}

export interface BookPageCharacterPlacement {
  x: number      // top-left x on the background canvas
  y: number      // top-left y
  width: number  // scale character to this width
  height: number // scale character to this height (may exceed canvas — sharp clips)
}

export interface BookPage {
  pageIndex: number
  backgroundAsset: string           // path relative to project root
  poseReference: string             // original unmodified mockup — locks pose for Gemini
  characterActionPrompt: string     // pose/action only; scene = backgroundAsset
  includesSenderCharacter: boolean  // true = sender baked into bg; cleanup removed child only
  characterPlacement?: BookPageCharacterPlacement  // undefined on no-character pages (1, 16)
  skipTextCollision?: boolean       // true = text/character overlap is intentional; skip auto-shift
  isMirrorPage?: boolean            // true = generate character once, flip horizontally for reflection
  // Regions to restore from the original background AFTER Gemini renders the scene.
  // Use for pages where Gemini would overwrite a semi-transparent box or other background
  // element that must appear on top of (or free from) the character illustration.
  protectedBackgroundAreas?: Array<{ x: number; y: number; width: number; height: number }>
  // Raw SVG element string(s) injected into the text overlay SVG before text elements.
  // Rendered below text — use for gradient overlays, decorative shapes, etc.
  svgOverlay?: string | string[]
  textBlocks: BookPageTextBlock[]
}

const BG = 'public/books/before-the-music-plays/backgrounds'
const REF = 'public/books/before-the-music-plays/ref'
const BODY_FONT = 'MoreSugar-Regular.otf'
const TITLE_FONT = 'Chillink.ttf'

export const beforeTheMusicPlays: { slug: string; title: string; pages: BookPage[] } = {
  slug: 'before-the-music-plays',
  title: 'Before the Music Plays',
  pages: [
    {
      pageIndex: 0,
      backgroundAsset: `${BG}/page-00-bg.png`,
      poseReference:   `${REF}/page-00.png`,
      characterActionPrompt:
        'LAYOUT CONTEXT: The upper-right of this canvas has two lines of title text ("Before the Music Plays") and one line of subtitle text ("A Story for [Name]"). These text elements occupy the top 29% of the canvas height. The character must be placed BELOW this text — her head must NOT overlap the title or subtitle in any way.\n\nPOSITION: Right half only. Left half is the back cover — keep it completely empty.\n\nHORIZONTAL: Her horizontal center at exactly 75% from the left edge (≈x=1330 on a 1774px canvas).\n\nVERTICAL — CRITICAL: Her head top must begin IMMEDIATELY below the subtitle text, with a gap of no more than 10–15 pixels. On this 887px canvas that means her head top is at approximately y=258. Do NOT push her further down — her head should feel like it begins right where the subtitle ends.\n\nCROP — CRITICAL: Show face to waist ONLY. The canvas bottom edge cuts the figure at the hip/waist line. Feet, shins, and knees are outside the frame and NOT visible. Her hands holding the basket are visible at the very bottom edge of the canvas.\n\nSCALE: Large and dominant — her head width occupies approximately 28–32% of the canvas width.\n\nPOSE: 3/4 angle toward the viewer, warm soft smile, both hands holding a wicker flower-girl basket at waist height.',
      includesSenderCharacter: false,
      // Head starts immediately below subtitle (ends ≈y=245), gap ~13px → y=258.
      // Canvas bottom (y=887) cuts at waist. Width ≈30% of canvas centered at x=1330.
      characterPlacement: { x: 1097, y: 258, width: 480, height: 629 },
      skipTextCollision: true,
      textBlocks: [
        {
          // center-x = 1104 + 466/2 = 1337  (measured from page-00.png: title cx=1337)
          id: 'title',
          template: 'Before the Music Plays',
          x: 1104, y: 35, maxWidth: 466,
          fontFamily: TITLE_FONT, fontSize: 97,
          color: '#f57493', align: 'center',
          lineHeight: 0.918,  // measured: 89 px cap-to-cap / 97 px fontSize
        },
        {
          // center-x = 1157 + 362/2 = 1338  (measured: subtitle cx=1338)
          id: 'subtitle',
          template: 'A Story for [CHILD_NAME]',
          x: 1112, y: 213, maxWidth: 450,
          fontFamily: BODY_FONT, fontSize: 31.5,
          color: '#9778e6', align: 'center',
          strokeColor: '#FFFFFF', strokeWidth: 2,
        },
        {
          // center-x = 1169 + 337/2 = 1337  (same horizontal axis as title/subtitle)
          id: 'tagline',
          template: 'On the Day She Was Chosen',
          x: 1169, y: 600, maxWidth: 337,
          fontFamily: BODY_FONT, fontSize: 47,
          color: '#f57493', align: 'center',
          strokeColor: '#FFFFFF', strokeWidth: 4.7,
        },
      ],
    },

    {
      pageIndex: 1,
      backgroundAsset: `${BG}/page-01-bg.png`,
      poseReference:   `${REF}/page-01.png`,
      characterActionPrompt: 'No character on this page — ribbon and flower petals only.',
      includesSenderCharacter: false,
      textBlocks: [
        {
          id: 'dedication',
          template: '[DEDICATION]',
          x: 1171, y: 122, maxWidth: 550,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.4,
        },
      ],
    },

    {
      pageIndex: 2,
      backgroundAsset: `${BG}/page-02-bg.png`,
      poseReference:   `${REF}/page-02.png`,
      characterActionPrompt:
        'Sitting up in bed, just woken up, both hands raised to cheeks in delighted surprise, big open-mouth smile, looking slightly off to the side. COSTUME OVERRIDE: cosy pajamas or soft nightwear — not a dress.',
      includesSenderCharacter: false,
      characterPlacement: { x: 1090, y: 37, width: 688, height: 893 },
      textBlocks: [
        {
          id: 'body',
          template: 'On the morning of the day everyone had been waiting for, [CHILD_NAME] woke up to a house full of flowers and a feeling that something wonderful was about to happen.',
          x: 196, y: 344, maxWidth: 586,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.4,
        },
      ],
    },

    {
      pageIndex: 3,
      backgroundAsset: `${BG}/page-03-bg.png`,
      poseReference:   `${REF}/page-03.png`,
      characterActionPrompt:
        'Two figures in the dressing room: (1) the young child, standing still with arms slightly raised, looking up with a soft content smile while being fitted into her white flower girl dress; (2) an elegant adult woman in a soft pink or mauve dress, kneeling or bending beside the child and gently adjusting the back of the dress — seen from the side or slightly from behind, not facing the camera. Place both figures on the LEFT half of the scene, leaving the right side open.',
      includesSenderCharacter: false,
      characterPlacement: { x: 183, y: 108, width: 456, height: 895 },
      textBlocks: [
        {
          id: 'body',
          template: 'There was a special dress laid out - just for today. She tried it on slowly, like it might be magic.',
          x: 1222, y: 391, maxWidth: 446,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.4,
        },
      ],
    },

    {
      pageIndex: 4,
      backgroundAsset: `${BG}/page-04-bg.png`,
      poseReference:   `${REF}/page-04.png`,
      characterActionPrompt:
        'Standing in profile facing a tall mirror, holding the basket with both hands, looking at her own reflection with a curious smile.',
      includesSenderCharacter: false,
      // Generate character once; composite at left position, then flip for the mirror reflection.
      // characterPlacement spans the combined width of both the figure and its reflection.
      characterPlacement: { x: 397, y: 24, width: 1133, height: 976 },
      textBlocks: [
        {
          id: 'body-left',
          template: "When [CHILD_NAME] looked in the mirror, she almost didn't recognize the person looking back.",
          x: 160, y: 719, maxWidth: 658,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.4,
        },
        {
          id: 'body-right',
          template: 'Today, she looked like someone with a very important job to do.',
          x: 1166, y: 719, maxWidth: 608,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.4,
        },
      ],
    },

    {
      pageIndex: 5,
      backgroundAsset: `${BG}/page-05-bg.png`,
      poseReference:   `${REF}/page-05.png`,
      characterActionPrompt:
        'Walking away from camera, back view, basket held behind her in both hands, mid-stride.',
      includesSenderCharacter: false,
      characterPlacement: { x: 1191, y: 88, width: 519, height: 897 },
      textBlocks: [
        {
          id: 'body',
          template: 'The car wound through town, past fields and ribbons and signs pointing the way.\n\nWhen they arrived, the whole place smelled like flowers and felt like magic already.',
          x: 209, y: 343, maxWidth: 560,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 6,
      backgroundAsset: `${BG}/page-06-bg.png`,
      poseReference:   `${REF}/page-06.png`,
      characterActionPrompt:
        'Standing beside the sender, who is kneeling down to her height; child looks at sender with a soft smile.',
      includesSenderCharacter: true,
      characterPlacement: { x: 273, y: 218, width: 383, height: 775 },
      textBlocks: [
        {
          id: 'body',
          template: '[SENDER_NAME] was already there, glowing in a way [CHILD_NAME] had never seen before.\n\n"[CHILD_NAME]!" she said, kneeling down. "You came. I was hoping you would."',
          x: 1182, y: 367, maxWidth: 528,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 7,
      backgroundAsset: `${BG}/page-07-bg.png`,
      poseReference:   `${REF}/page-07.png`,
      characterActionPrompt:
        "Close-up, holding both of the sender's hands, looking up warmly, basket held in the crook of one arm.",
      includesSenderCharacter: true,
      characterPlacement: { x: 941, y: 68, width: 915, height: 932 },
      textBlocks: [
        {
          id: 'body',
          template: "[SENDER_NAME] could have chosen anyone for this. She thought about it for a long time.\n\nAnd every time, she thought of [CHILD_NAME], your laugh, your brave heart, the way you make a room feel warmer just by walking in.\n\nThat's not something you can practise. You either have it, or you don't.",
          x: 157, y: 229, maxWidth: 602,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 8,
      backgroundAsset: `${BG}/page-08-bg.png`,
      poseReference:   `${REF}/page-08.png`,
      characterActionPrompt:
        'Extreme close-up, chin tucked toward basket overflowing with petals, wide curious eyes looking slightly upward.',
      includesSenderCharacter: false,
      characterPlacement: { x: 1009, y: 0, width: 937, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: "Someone placed a small basket of petals carefully into [CHILD_NAME]'s hands.\n\n\"You know what to do,\" they whispered.\n\n[CHILD_NAME] nodded, even though her tummy had gone all fluttery, like a hundred tiny wings.",
          x: 184, y: 299, maxWidth: 560,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 9,
      backgroundAsset: `${BG}/page-09-bg.png`,
      poseReference:   `${REF}/page-09.png`,
      characterActionPrompt:
        'Standing alone, full body, worried/uncertain expression, basket held with both hands in front of her, facing a large closed door.',
      includesSenderCharacter: false,
      characterPlacement: { x: 237, y: 46, width: 491, height: 947 },
      textBlocks: [
        {
          id: 'body',
          template: 'Then came the waiting.\nBehind the big doors, [CHILD_NAME] could hear the music start, soft and far away, like the whole world was holding its breath.',
          x: 1163, y: 367, maxWidth: 560,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 10,
      backgroundAsset: `${BG}/page-10-bg.png`,
      poseReference:   `${REF}/page-10.png`,
      characterActionPrompt:
        'Extreme close-up on face only, eyes gently closed, calm expression, an adult hand resting reassuringly on her shoulder from off-frame.',
      includesSenderCharacter: false,
      characterPlacement: { x: 3, y: 0, width: 1109, height: 1000 },
      textBlocks: [
        {
          id: 'body',
          template: '"It\'s all right to feel that flutter," someone whispered. "Even the bravest people do."\n\n[CHILD_NAME] took a deep breath. She could do brave things. She had practised.',
          x: 1145, y: 367, maxWidth: 602,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 11,
      backgroundAsset: `${BG}/page-11-bg.png`,
      poseReference:   `${REF}/page-11.png`,
      characterActionPrompt:
        'Back view, standing in an open doorway facing into bright light, basket held behind her with both hands.',
      includesSenderCharacter: false,
      characterPlacement: { x: 1349, y: 326, width: 319, height: 674 },
      textBlocks: [
        {
          id: 'body',
          template: 'Then the doors opened. Light flooded in.\nAnd there was the aisle, stretching out long and golden, with every single face turned to see [CHILD_NAME].',
          x: 209, y: 391, maxWidth: 560,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 12,
      backgroundAsset: `${BG}/page-12-bg.png`,
      poseReference:   `${REF}/page-12.png`,
      characterActionPrompt:
        'Walking forward mid-stride, one arm raised waving joyfully, big open-mouth smile, basket in other hand, petals falling around her.',
      includesSenderCharacter: false,
      characterPlacement: { x: 277, y: 76, width: 515, height: 901 },
      textBlocks: [
        {
          id: 'body',
          template: 'So [CHILD_NAME] walked.\nPetals drifted down with every step, soft and pink against the stone path.\nAnd though her heart went pitter-pat, her feet knew exactly where to go.',
          x: 209, y: 330, maxWidth: 560,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 13,
      backgroundAsset: `${BG}/page-13-bg.png`,
      poseReference:   `${REF}/page-13.png`,
      characterActionPrompt:
        'Standing at the end of the aisle, looking up joyfully toward the sender, basket held with both hands, surrounded by scattered petals.',
      includesSenderCharacter: true,
      characterPlacement: { x: 1057, y: 88, width: 459, height: 879 },
      textBlocks: [
        {
          id: 'body',
          template: 'Everyone smiled as [CHILD_NAME] reached the end of the aisle.\nThe petals were scattered behind her like a little trail of sunshine and roses.\nAnd there, waiting with the softest smile, was [SENDER_NAME].',
          x: 216, y: 322, maxWidth: 546,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
        },
      ],
    },

    {
      pageIndex: 14,
      backgroundAsset: `${BG}/page-14-bg.png`,
      poseReference:   `${REF}/page-14.png`,
      characterActionPrompt:
        'Dancing, mid-twirl, eyes closed, joyful open laugh, dress flaring outward, arms slightly extended.',
      includesSenderCharacter: false,
      characterPlacement: { x: 89, y: 40, width: 871, height: 960 },
      textBlocks: [
        {
          id: 'body',
          template: 'Later, when the music played and everyone began to dance, [CHILD_NAME] felt light as a ribbon in the wind.\nShe had done her special job.\nAnd all around her, the whole day seemed to sparkle.',
          x: 1160, y: 344, maxWidth: 570,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
          strokeColor: '#f9d2b8', strokeWidth: 2,
        },
      ],
    },

    {
      pageIndex: 15,
      backgroundAsset: `${BG}/page-15-bg.png`,
      poseReference:   `${REF}/page-15.png`,
      characterActionPrompt:
        'Lying in bed propped against pillows, looking up toward a window, soft content smile, pajamas, relaxed pose.',
      includesSenderCharacter: false,
      characterPlacement: { x: 1187, y: 146, width: 633, height: 739 },
      textBlocks: [
        {
          id: 'body',
          template: 'That night, after the music had stopped and the cake had been cut and the dancing had worn everyone out, [CHILD_NAME] lay in bed thinking about the whole beautiful day.',
          x: 194, y: 367, maxWidth: 560,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.5,
          strokeColor: '#aec8dd', strokeWidth: 2,
        },
      ],
    },

    {
      pageIndex: 16,
      backgroundAsset: `${BG}/page-16-bg.png`,
      poseReference:   `${REF}/page-16.png`,
      characterActionPrompt: 'No character on this page — basket and petals only.',
      includesSenderCharacter: false,
      textBlocks: [
        {
          id: 'closing',
          template: 'Thank you for saying yes, [CHILD_NAME].\nWith love, [SENDER_NAME]',
          x: 194, y: 68, maxWidth: 560,
          fontFamily: BODY_FONT, fontSize: 33.3,
          color: '#292929', align: 'center', lineHeight: 1.4,
        },
      ],
    },
  ],
}