// src/lib/books/spoken-over-you.ts
//
// Book config for "Spoken Over You — God's Promises for [CHILD_NAME]"
//
// CANVAS: 2000 × 1000 px (confirmed from all background + reference PNGs)
// PPI:    125  (2000 px / 16 in)
//
// OVERLAP POLICY: Standard collision detection.
//   resolveTextCollisions auto-shifts text away from the character zone.
//   Character Coordinates sheet values are used as-is; no skipTextCollision.
//
// FONT SIZES: Spreadsheet values are in points (pt). Converted to px via:
//   px = pt × (125 / 72)
//   Quote blocks:  12.6 pt → 21.9 px
//   Ref/body:      17.2 pt → 29.9 px
//   Page_02 body:  15.0 pt → 26.0 px
//   Cover title:   38.9 pt → 67.5 px  (placeholder: Amalfi Coast — The Secret Library pending)
//   Cover subtitle:19.8 pt → 34.4 px
//   P14 tagline:   16.7 pt → 29.0 px
//   P14 keepsake:  11.8 pt → 20.5 px
//
// PAGE_03 BODY: spreadsheet showed fontSize=1.62 in the pt column — confirmed
//   data-entry error (lineHeight value placed in wrong column). Using 17.2 pt
//   → 29.9 px with lineHeight 1.62.
// PAGE_13: character generation skipped; background used as-is per user instruction.
// PAGE_13 FONTSIZE: spreadsheet showed 172 pt — confirmed decimal error; using 17.2 pt.
//
// STROKE: "outline by 15%" = strokeWidth of 15% of fontSize, paint-order stroke→fill.
//   SW_QUOTE = 3.3   (15% of 21.9)
//   SW_BODY  = 4.5   (15% of 29.9)
//   SW_P02   = 3.9   (15% of 26.0)
//
// COVER TITLE SHADOW: spreadsheet specifies "drop shadow of 10%" — deferred.
//   Current render uses white text only; shadow can be added via svgOverlay filter
//   once the Secret Library font is in place.
//
// PERSONALIZATION: CHILD_NAME, CHILD_FULL_NAME, SIGNATURE, DATE
//   (SENDER_NAME always passed as empty string for this book)

import type { BookPage } from './before-the-music-plays'

const BG   = 'public/books/spoken-over-you/backgrounds'
const REF  = 'public/books/spoken-over-you/ref'
const BODY = 'KGMissKindyMarker.ttf'    // internal: "KG Miss Kindy Marker"
const SCPT = 'Amalfi Coast.ttf'         // internal: "Amalfi Coast"

// ─── Reusable stroke constants ────────────────────────────────────────────────
const DARK   = '#722e22'
const WHITE  = '#ffffff'
const YELLOW = '#ffcd64'
const MINT   = '#dff1ef'

// strokeWidth per block type
const SW_QUOTE = 3.3
const SW_BODY  = 4.5
const SW_P02   = 3.9

// ─── Character prompt (exported for bookRenderConfig) ────────────────────────
export const SPOKEN_OVER_YOU_CHARACTER_PROMPT = `Create a full-body 3D Pixar/Disney-style cartoon character of the EXACT child shown in the uploaded photo, translated into a high-quality animated look with rounded child-friendly age 6-8 proportions and expressive eyes.

COPY EXACTLY FROM THE PHOTO:
- FACE: same face shape, same eyes, same nose, same lips — faithful likeness, not a generic child
- SKIN TONE: copy exact skin tone — do not lighten, darken, or alter in any way
- HAIR: copy exact hair colour, length, and hairstyle exactly as shown
- GENDER: match exactly — girl generates a girl character, boy generates a boy character
- FRECKLES or MARKS: include any visible facial features

CLOTHING — use the outfit that matches the child's gender ONLY. Do NOT show both outfits:
- If GIRL: Blue Mini Dress with white ribbon at the waist, white doll shoes (no leggings)
- If BOY: White Polo Shirt with Checkered Necktie, dark pants, small shoes

POSE: Full body, head to toe. Relaxed natural standing pose. Arms resting naturally at the sides.
BACKGROUND: Plain clean white only. No scenery, no props, no text.
OUTPUT: ONE single child character only. Do NOT generate two characters or show both genders.`

// ─── Pages ───────────────────────────────────────────────────────────────────

export const spokenOverYou: { slug: string; title: string; pages: BookPage[] } = {
  slug:  'spoken-over-you',
  title: 'Spoken Over You',
  pages: [

    // ── Page 00 — Cover ───────────────────────────────────────────────────────
    {
      pageIndex: 0,
      backgroundAsset: `${BG}/page-00-bg.png`,
      poseReference:   `${REF}/page-00.png`,
      characterActionPrompt:
        'Scene: The Child is holding both hands of God — one hand on each side of the Child. God\'s presence is behind the Child, slightly faded by a warm golden light. BOTH of God\'s hands must be clearly visible, one on the left side and one on the right side of the Child. The Child looks happy and loved, guided from behind.\n\nPOSITION — CRITICAL: The canvas is a 2:1 spread. The LEFT half is the back cover — keep it empty. The character must be CENTERED in the RIGHT half of the canvas. The child\'s horizontal center must be at exactly 75% from the left edge of the full canvas (center of the right half). Do NOT push the character to the far right edge.\n\nFRAMING — CRITICAL: This is a HALF-BODY PORTRAIT. The image MUST show the character from the face down to the waist ONLY. Crop tightly at the child\'s midsection — the waistline is the absolute bottom of the frame. Legs, knees, and feet must NOT appear at all. Do not show a full-body shot. Do not show legs. The cut-off point is the waist.\n\nVERTICAL POSITION — CRITICAL: The child\'s head top must begin at approximately 40–42% down from the top of the canvas (≈y=415 on a 1000px canvas). Leave clear empty space above the head for the title text — do NOT place the character near the top.\n\nView: Zoom front facing view\nBackground: dramatic fade to all white color toward the LEFT side\n\nStyle: Premium stylized 3D children\'s storybook illustration. The character is sharply focused, while the environment fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, vibrant background colors, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      skipTextCollision: true,
      characterPlacement: { x: 1166, y: 415, width: 672, height: 862 },
      textBlocks: [
        {
          // Cover title — RIGHT side, centered above character head (character center ~x=1502)
          id: 'title',
          template: 'Spoken Over You',
          x: 1047, y: 20, maxWidth: 910,
          fontFamily: SCPT, fontSize: 80,
          color: WHITE, align: 'center',
        },
        {
          id: 'subtitle',
          template: "God's Promises for [CHILD_NAME]",
          x: 1089, y: 165, maxWidth: 822,
          fontFamily: SCPT, fontSize: 34.4,
          color: '#000000', align: 'center',
        },
      ],
    },

    // ── Page 02 — Still-life (no character) ──────────────────────────────────
    {
      pageIndex: 1,
      backgroundAsset: `${BG}/page-02-bg.png`,
      poseReference:   `${REF}/page-02.png`,
      characterActionPrompt:
        'Scene: A sweet Child sitting peacefully on a cream blanket in a dreamy nursery meadow setting, surrounded by tiny wildflowers, soft clouds, and warm golden morning light. The Child looks calm and cherished, with tiny hands resting gently near the face. A subtle glow from above wraps the Child in warmth, symbolizing that God knew this Child before the world did. Keep the composition gentle, airy, and sacred. No text, no letters, no words in the image.\n\nCharacters shows solid on the right side and not in the center.\n\n(Key details are showing solid/full)\n- tiny wildflowers\n- cream blanket\n- clouds\n\nBackground: Dramatic Fade until looking plain solid color.\n\nStyle: Premium stylized 3D children\'s storybook illustration. The character is sharply focused, while the environment fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, vibrant background colors, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      textBlocks: [
        {
          id: 'body',
          template: 'These words were spoken long before you were born, [CHILD_NAME].\n\nThey have been waiting for you all along.',
          x: 1113, y: 307, maxWidth: 372,
          fontFamily: BODY, fontSize: 26.0,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_P02,
        },
      ],
    },

    // ── Page 03 — Jeremiah 1:5 ────────────────────────────────────────────────
    {
      pageIndex: 2,
      backgroundAsset: `${BG}/page-03-bg.png`,
      poseReference:   `${REF}/page-03.png`,
      characterActionPrompt:
        'Scene: A precious Child sitting safely on a soft quilt beneath a blossoming tree in a peaceful garden. Around the Child are delicate butterflies, flower petals, tiny birds, a woven basket, and simple wooden play items. Warm dappled sunlight touches the Child\'s round cheeks, tiny fingers, and soft outfit, showing how carefully and beautifully the Child was made. The scene should feel lovingly detailed, gentle, and full of wonder.\n\nCharacters shows solid on the left side and not in the center.\n\n(Key details are showing solid/full)\n- blossoming tree (is seen all throughout the frame)\n- delicate butterflies (shows on top of the faded part as well, along with flower petals, tiny birds, a woven basket, and simple wooden play items)\n\nBackground: Dramatic blur\n\nStyle: Premium stylized 3D children\'s storybook illustration. The character is sharply focused, while the environment fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, vibrant background colors, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      // Text Zone: RIGHT — character on LEFT (prompt: "left side")
      characterPlacement: { x: 175, y: 116, width: 564, height: 851 },
      textBlocks: [
        {
          id: 'quote',
          template: '"Before I formed you in the womb, I knew you."',
          x: 1186, y: 314, maxWidth: 636,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'JEREMIAH 1:5',
          x: 1337, y: 360, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'Before the world had your name in it, God did.\n\nYou were not a surprise to Him, [CHILD_NAME].\nYou were a plan.',
          x: 1166, y: 484, maxWidth: 669,
          fontFamily: BODY, fontSize: 29.9,
          color: WHITE, align: 'center', lineHeight: 1.62,
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 04 — Psalm 139:14 ────────────────────────────────────────────────
    {
      pageIndex: 3,
      backgroundAsset: `${BG}/page-04-bg.png`,
      poseReference:   `${REF}/page-04.png`,
      characterActionPrompt:
        'Scene: A heartwarming scene of a young Child resting alone on a soft blanket in a golden field of wildflowers during late afternoon light. The Child smiles softly while lying comfortably on the blanket, holding a peaceful and content expression as flower petals drift gently in the breeze around them. The field stretches into soft rolling hills, creating a feeling of endless love and comfort surrounding the Child. Use warm cream, blush, sage, and muted gold tones. Keep the Child as the only character and the clear emotional focus of the scene. The mood should feel safe, affectionate, deeply comforting, and tender. No text, no letters, no words in the image.\n\nComposition: Place the Child on the left side only, never in the center. Let the heart-shaped light and background fade softly toward the right, leaving open space for text.\n\nStyle: Premium stylized 3D children\'s storybook illustration. The Child is sharply focused while the environment gradually fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, muted background colors, atmospheric haze, and softly faded frame edges. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, reduced saturation, and no strong yellow tint. Use gentle blush, cream, dusty blue, sage, and muted rose accents. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      characterPlacement: { x: 287, y: 261, width: 428, height: 710 },
      textBlocks: [
        {
          id: 'quote',
          template: '"I am fearfully and wonderfully made."',
          x: 1186, y: 322, maxWidth: 636,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'PSALM 139:14',
          x: 1337, y: 363, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'He made you on purpose, and He took His time.\n\nAnd when He was done, He called you very good.',
          x: 1233, y: 475, maxWidth: 543,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 05 — Jeremiah 31:3 ───────────────────────────────────────────────
    {
      pageIndex: 4,
      backgroundAsset: `${BG}/page-05-bg.png`,
      poseReference:   `${REF}/page-05.png`,
      characterActionPrompt:
        'Scene: A hopeful sunrise scene with the Child sitting on a soft blanket on a grassy hill, looking toward a glowing horizon. In the distance, a gentle winding river and soft rolling hills create the feeling of a beautiful story unfolding. Add tiny birds in the sky, blooming flowers in the foreground, and a small open storybook. The mood should feel bright, peaceful, and full of promise. No text, no letters, no words in the image.\n\nCharacters shows solid on the left side and not in the center.\n\n(Key details are showing solid/full)\nBackground: (Key details are showing solid) while Dramatic Fade until looking plain solid color.\n\nStyle: Premium stylized 3D children\'s storybook illustration. The character is sharply focused, while the environment fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, vibrant background colors, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      // Text Zone: RIGHT — character on LEFT (design data x=271)
      characterPlacement: { x: 271, y: 268, width: 789, height: 629 },
      textBlocks: [
        {
          id: 'quote',
          template: '"I have loved you with an everlasting love."',
          x: 1173, y: 198, maxWidth: 636,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'JEREMIAH 31:3',
          x: 1324, y: 235, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'You were loved before you knew the word for it.\n\nNot for what you do — simply because you are [CHILD_NAME].\n\nThat is what everlasting means.',
          x: 1210, y: 349, maxWidth: 561,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 06 — Hebrews 13:5 ────────────────────────────────────────────────
    {
      pageIndex: 5,
      backgroundAsset: `${BG}/page-06-bg.png`,
      poseReference:   `${REF}/page-06.png`,
      characterActionPrompt:
        'Scene: A tender riverside scene featuring the young Child alone beside calm, reflective water. The Child sits peacefully near the riverbank and reaches one hand gently toward the surface, creating soft ripples around their fingertips. The Child\'s reflection glows subtly in the water, symbolizing the love and light surrounding them. Keep the Child as the only character and the clear emotional focus. The mood should feel quiet, safe, heartfelt, and deeply comforting.\n\nComposition: Place the Child on the right side only, never in the center. Let the heart-shaped light and background fade softly toward the right, leaving open space for text.\n\nStyle: Premium stylized 3D children\'s storybook illustration. The Child is sharply focused while the environment gradually fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, muted background colors, atmospheric haze, and softly faded frame edges. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, reduced saturation, and no strong yellow tint. Use gentle blush, cream, dusty blue, sage, and muted rose accents. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      characterPlacement: { x: 1296, y: 113, width: 448, height: 780 },
      textBlocks: [
        {
          id: 'quote',
          template: '"I will never leave you, nor forsake you."',
          x: 170, y: 323, maxWidth: 636,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'HEBREWS 13:5',
          x: 321, y: 360, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'Wherever you go, you will not go alone.\n\nHe will already be there, waiting.',
          x: 135, y: 482, maxWidth: 706,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 07 — Jeremiah 29:11 ──────────────────────────────────────────────
    {
      pageIndex: 6,
      backgroundAsset: `${BG}/page-07-bg.png`,
      poseReference:   `${REF}/page-07.png`,
      characterActionPrompt:
        'Scene: A hopeful sunrise scene with the Child sitting on a soft blanket on a grassy hill, facing a glowing horizon showing only the Child\'s back view. In the distance, a gentle winding river and soft rolling hills create the feeling of a beautiful story unfolding. Add tiny birds in the sky, blooming flowers in the foreground, and a small open storybook or baby blanket beside the Child as a subtle symbol of the future. The mood should feel bright, peaceful, and full of promise.\n\nCharacters shows solid on the right side and not in the center.\n\n(Key details are showing solid/full)\n\nBackground: Dramatic blurry faded until the left side becomes solid color background\n\nStyle: Premium stylized 3D children\'s storybook illustration. The character is sharply focused, while the environment fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, vibrant background colors, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      // Text Zone: LEFT — character on RIGHT (design data x=1009)
      characterPlacement: { x: 1009, y: 56, width: 538, height: 629 },
      textBlocks: [
        {
          id: 'quote',
          template: '"For I know the plans I have for you."',
          x: 184, y: 300, maxWidth: 636,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'JEREMIAH 29:11',
          x: 323, y: 336, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'God has good plans for you, [CHILD_NAME].\n\nYou don\'t have to know the whole story today.\n\nJust trust the One who wrote it.',
          x: 184, y: 456, maxWidth: 613,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 08 — Isaiah 43:1 ─────────────────────────────────────────────────
    {
      pageIndex: 7,
      backgroundAsset: `${BG}/page-08-bg.png`,
      poseReference:   `${REF}/page-08.png`,
      characterActionPrompt:
        'A quiet lakeside rests beneath the fading clouds of a gentle storm. On the right side of the scene, the young Child sits alone on a cozy blanket near the still water, wrapped warmly in a soft blanket and holding their favorite stuffed animal close to their heart. Their peaceful expression shows that the Child feels safe, comforted, and deeply protected.\n\nAbove them, the dark clouds slowly part as soft golden light pours through, gently illuminating the Child and the water around them. The warm light symbolizes God\'s loving presence surrounding the Child through difficult days. Keep the Child as the only character and the clear emotional focus, placed solidly on the right side rather than in the center. The overall mood is tender, reassuring, heartfelt, and filled with quiet hope.\n\nComposition: Place the Child on the left side only, never in the center. Let the heart-shaped light and background fade softly toward the right, leaving open space for text.\n\nStyle: Premium stylized 3D children\'s storybook illustration. The Child is sharply focused while the environment gradually fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, muted background colors, atmospheric haze, and softly faded frame edges. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, reduced saturation, and no strong yellow tint. Use gentle blush, cream, dusty blue, sage, and muted rose accents. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      characterPlacement: { x: 241, y: 166, width: 471, height: 669 },
      textBlocks: [
        {
          id: 'quote',
          template: '"I have called you by name. You are mine."',
          x: 1183, y: 245, maxWidth: 636,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'ISAIAH 43:1',
          x: 1322, y: 281, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'He does not call you "one of many." He calls you [CHILD_NAME].\n\nYou are seen. You are known. You are His.',
          x: 1143, y: 400, maxWidth: 713,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 09 — Exodus 14:14 ────────────────────────────────────────────────
    {
      pageIndex: 8,
      backgroundAsset: `${BG}/page-09-bg.png`,
      poseReference:   `${REF}/page-09.png`,
      characterActionPrompt:
        'Scene: An uplifting hilltop scene with the Child sitting on a soft blanket in an open field of wildflowers. A gentle breeze moves the flowers and the Child\'s soft outfit. Above, a graceful bird soars high in the bright morning sky, symbolic and peaceful, not frightening. The Child looks upward with wonder, surrounded by luminous clouds, distant soft mountains, and golden sunlight.\n\nCharacters shows solid on the right side and not in the center.\n\n(Key details are showing solid/full) on top of the faded and solid part\n- Eagle/bird\n\nBackground: Dramatic fade to solid color\n\nStyle: Premium stylized 3D children\'s storybook illustration. The character is sharply focused, while the environment fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, vibrant background colors, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      characterPlacement: { x: 1157, y: 205, width: 669, height: 744 },
      textBlocks: [
        {
          id: 'quote',
          template: '"The Lord will fight for you; you need only be still."',
          x: 100, y: 343, maxWidth: 741,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'EXODUS 14:14',
          x: 291, y: 380, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'There will be hard days, [CHILD_NAME].\n\nOn those days, you do not fight alone.\nHe will fight for you.',
          x: 115, y: 496, maxWidth: 710,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 10 — Isaiah 40:31 ────────────────────────────────────────────────
    {
      pageIndex: 9,
      backgroundAsset: `${BG}/page-10-bg.png`,
      poseReference:   `${REF}/page-10.png`,
      characterActionPrompt:
        'Scene: A dreamy twilight garden scene with the Child sitting safely on a blanket beside a softly glowing lantern. The Child\'s tiny hands reach toward the warm light while fireflies glow gently around nearby flowers. The lantern light softly illuminates the Child\'s cheeks, outfit, and blanket. The sky is a soft blend of dusky blue, lavender, cream, and gold.\n\nCharacters shows solid on the right side and not in the center.\n\n(Key details are showing solid/full) on top of the faded and solid part\n- lantern / glow\n- fireflies (shown all throughout the image)\n\nBackground: Dramatic 30% fade–60% solid after the lantern image\n\nStyle: Premium stylized 3D children\'s storybook illustration. The character is sharply focused, while the environment fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, vibrant background colors, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      // Text Zone: LEFT — character on RIGHT (design data x=1155)
      characterPlacement: { x: 1155, y: 318, width: 514, height: 639 },
      textBlocks: [
        {
          id: 'quote',
          template: '"They who wait for the Lord shall renew their strength; they shall mount up with wings like eagles."',
          x: 100, y: 283, maxWidth: 741,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'ISAIAH 40:31',
          x: 291, y: 354, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'When you are tired, He will be your strength.\n\nYou were made to soar, [CHILD_NAME].',
          x: 115, y: 470, maxWidth: 710,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 11 — Matthew 5:16 ────────────────────────────────────────────────
    {
      pageIndex: 10,
      backgroundAsset: `${BG}/page-11-bg.png`,
      poseReference:   `${REF}/page-11.png`,
      characterActionPrompt:
        'Scene: A peaceful nighttime meadow beneath a glowing, star-filled sky. The young Child sleeps alone among softly illuminated flowers, wrapped securely in a cozy blanket and surrounded by a gentle golden glow. Their peaceful expression shows that the Child feels safe, protected, and deeply comforted. The wide sky feels magical and serene, while the soft meadow keeps the scene intimate and reassuring. Use silver-blue night tones with warm cream and muted gold highlights. Keep the Child as the only character and the clear emotional focus.\n\nComposition: Place the Child on the left side only, never in the center.\n\nStyle: Premium stylized 3D children\'s storybook illustration. The Child is sharply focused while the environment gradually fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, muted background colors, atmospheric haze, and softly faded frame edges. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, reduced saturation, and no strong yellow tint. Use gentle blush, cream, dusty blue, sage, and muted rose accents. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      // Text Zone: RIGHT — character on LEFT (design data x=168)
      characterPlacement: { x: 168, y: 106, width: 570, height: 836 },
      textBlocks: [
        {
          id: 'quote',
          template: '"Let your light shine before others."',
          x: 1159, y: 379, maxWidth: 741,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'MATTHEW 5:16',
          x: 1350, y: 416, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'There is a light inside you, [CHILD_NAME].\nDo not be afraid to let it shine.',
          x: 1175, y: 545, maxWidth: 710,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 12 — Romans 8:39 ─────────────────────────────────────────────────
    {
      pageIndex: 11,
      backgroundAsset: `${BG}/page-12-bg.png`,
      poseReference:   `${REF}/page-12.png`,
      characterActionPrompt:
        'Scene: A beautiful closing blessing scene showing the Child sitting safely beneath a soft floral archway on a cozy blanket, surrounded by gentle symbols from earlier pages: wildflowers, tiny birds, soft golden light, a little lantern glow, and delicate stars. In the background, show a peaceful landscape of rolling hills, a winding river, and a glowing sky. The Child looks loved, chosen, and blessed. The mood should feel complete, sentimental, and full of grace. No text, no letters, no words in the image.\n\nCharacters shows solid on the right side and not in the center.\n\nBackground: dramatic\n\nStyle: Premium stylized 3D children\'s storybook illustration. The character is sharply focused, while the environment fades into a softly blurred background. Use shallow depth of field, creamy bokeh, reduced background contrast, vibrant background colors, atmospheric haze. Soft diffused daylight, delicate highlights, gentle shadows, subtle rim light, balanced neutral-to-cool tones, no strong yellow tint. High-end cinematic 3D render, animated-feature quality, global illumination, subsurface skin scattering, volumetric lighting, smooth materials, realistic cloth and hair, clean composition, dreamy heartwarming atmosphere, 50mm lens, wide aperture, high resolution.',
      includesSenderCharacter: false,
      // Text Zone: LEFT — character zone spans center-right (design data x=723,y=400)
      characterPlacement: { x: 723, y: 400, width: 1118, height: 573 },
      textBlocks: [
        {
          id: 'quote',
          template: '"Nothing shall be able to separate us from the love of God."',
          x: 100, y: 337, maxWidth: 800,
          fontFamily: BODY, fontSize: 21.9,
          color: MINT, align: 'center',
          strokeColor: DARK, strokeWidth: SW_QUOTE,
        },
        {
          id: 'reference',
          template: 'ROMANS 8:39',
          x: 321, y: 378, maxWidth: 334,
          fontFamily: BODY, fontSize: 29.9,
          color: YELLOW, align: 'center',
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
        {
          id: 'body',
          template: 'Here is the promise that holds all the others:\n\nNothing can take His love away from you.\nNot ever. And it is yours, [CHILD_NAME].',
          x: 102, y: 501, maxWidth: 799,
          fontFamily: BODY, fontSize: 29.9,
          color: WHITE, align: 'center', lineHeight: 1.5,
          strokeColor: DARK, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 13 — Closing (background as-is, no character) ────────────────────
    {
      pageIndex: 12,
      backgroundAsset: `${BG}/page-13-bg.png`,
      poseReference:   `${REF}/page-13.png`,
      // ⚠️ CONFLICT: design data shows character on RIGHT (x=1250) for this page,
      // but characterActionPrompt is currently set to skip character generation.
      // Update the characterActionPrompt below if you want a character on page 13.
      characterActionPrompt: 'No character — use background as-is.',
      includesSenderCharacter: false,
      // Text Zone: LEFT — characterPlacement added per design data for collision detection
      characterPlacement: { x: 1250, y: 253, width: 486, height: 699 },
      textBlocks: [
        {
          id: 'body',
          template: 'So go, [CHILD_NAME].\n\nYou are known. You are chosen. You are loved.\nThese are not just words. They are promises — and every one is yours.',
          x: 101, y: 398, maxWidth: 799,
          fontFamily: BODY, fontSize: 29.9,
          color: DARK, align: 'center', lineHeight: 1.5,
          strokeColor: WHITE, strokeWidth: SW_BODY,
        },
      ],
    },

    // ── Page 14 — Keepsake (no character) ────────────────────────────────────
    {
      pageIndex: 13,
      backgroundAsset: `${BG}/page-14-bg.png`,
      poseReference:   `${REF}/page-14.png`,
      characterActionPrompt: 'No character — watercolor keepsake panel only.',
      includesSenderCharacter: false,
      textBlocks: [
        {
          id: 'tagline',
          template: 'We love you. But He loves you more.',
          x: 1201, y: 466, maxWidth: 598,
          fontFamily: BODY, fontSize: 29.0,
          color: DARK, align: 'center',
        },
        {
          id: 'keepsake',
          template: 'This book belongs to: [CHILD_FULL_NAME]\nGiven with love by: [SENDER_NAME]\nOn this day: [DATE]',
          x: 1258, y: 662, maxWidth: 483,
          fontFamily: SCPT, fontSize: 21.5,
          color: '#000000', align: 'center', lineHeight: 3,
        },
      ],
    },

  ],
}