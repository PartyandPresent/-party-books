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
  pagePrompts?: string[]
  characterPrompt?: string
  characterConsistencyNote?: string
  coverLogoStyle?: 'white' | 'color'
}

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find(b => b.slug === slug)
}

// ─── Flower Girl book constants ───────────────────────────────────────────────

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

const GLOBAL_STYLE_FLOWER_GIRL_V1 = `
GLOBAL RULES — apply to every page:

ART STYLE: Premium high-end soft 3D children's book illustration. Fully 3D rendered characters with rounded childlike features, smooth warm MATTE shading, rosy cheeks, big expressive 3D eyes, and detailed soft hair. Backgrounds use a dominant pastel base color with scene elements rendered in soft warm bokeh blur — visible outlines of furniture, windows, or architecture, but extremely soft and out of focus like a shallow-depth-of-field photograph. Overall: warm, soft, magical, premium.

DECORATIVE FLOATING ELEMENTS — REQUIRED on every single page — MUST BE SOFT 3D, NOT FLAT:
Every page must include small floating SOFT 3D RENDERED flower shapes — each one is a fully dimensional tiny 3D daisy bloom or small flower form with rounded petals that have real depth, a soft drop shadow, and natural warm color. These are NOT flat clip-art, NOT 2D stickers, NOT icons. They are tiny 3D physical flower objects floating in the air. Also include soft 3D curved rose petals with natural shadow depth. Add soft 3D sparkle star shapes with light catch. Scatter these 3D elements naturally throughout every spread. On celebration/dance pages also add tiny 3D heart shapes.

CANVAS: Full bleed 2:1 landscape (wider than tall). No borders. No watermarks.

CHARACTER: The exact child from the character reference image. Match their face, hair, skin tone, eye shape, age, and likeness precisely. Unless this page specifies pajamas or sleeping clothes, always show her in an ivory cream flower girl dress with soft tulle, flutter sleeves, blush pink ribbon sash, white wedding shoes, and small woven petal basket.

SPINE ZONE — CRITICAL: Center 12% = book spine. NO character body, face, text, or key elements here. Character must stand in LEFT half OR RIGHT half only.

NO CENTER FOLD — CRITICAL: No spine line, crease, or gutter shadow at midpoint. Canvas is flat and seamless.

TEXT RENDERING — CRITICAL: Render ALL text in a BOLD, ROUNDED, friendly sans-serif font (rounded display style). Story body text = VERY DARK NAVY (almost black), bold, large, centered in the designated text half, comfortable line spacing. Render EVERY SINGLE WORD exactly as written — do NOT drop words, do NOT shorten, do NOT change any word. Render the full complete text.
`

const GLOBAL_STYLE_FLOWER_GIRL_V2 = `
GLOBAL RULES — apply to every page:

ART STYLE: Pixar/Disney 3D animated feature film quality. Warm cinematic lighting. Soft volumetric light rays. Rich fully rendered detailed backgrounds. Full bleed 2:1 landscape canvas (wider than tall — like an open book spread). No borders. No watermarks. No text unless specified in the prompt.

CHARACTER: The exact child from the character reference image. Match their face, hair color, eye shape, skin tone, age, and overall likeness precisely. Unless this page prompt specifies the child is in pajamas or sleeping clothes, always dress her in an ivory or cream flower girl dress with soft tulle, delicate floral details, short flutter sleeves, and a blush pink ribbon sash, with small wedding shoes.

SPINE ZONE — CRITICAL: The center 12% of the image is the book spine. Place NO character body, face, text, or important elements here. Character must stand clearly in the LEFT half or RIGHT half only — never straddling center. Background scenery may pass through naturally.

NO CENTER FOLD — CRITICAL: Do NOT render any center spine line, fold crease, gutter shadow, depth gradient, or visual divide at the horizontal midpoint. The canvas is completely flat and seamless from left edge to right edge.

TEXT RENDERING: Render only the exact text content shown in each prompt. No extra words. Render every word EXACTLY as written — same case, same spelling, no alterations.
`

// ─── God's Promises global style ──────────────────────────────────────────────

const GLOBAL_STYLE = `
GLOBAL RULES — apply to every page:

ART STYLE: Pixar/Disney 3D animated feature film quality. Warm cinematic lighting. Soft volumetric light rays. Full bleed 2:1 landscape canvas (wider than tall — like an open book spread). No borders. No watermarks.

CHARACTER: The exact child from the reference image — match their face, hair, and skin tone precisely. They wear a beige knit cardigan sweater with buttons and cream pants. Show full body head to toe unless the scene has them sleeping or kneeling.

SPINE ZONE — CRITICAL: The center 12% of the image is the book spine/binding area. Place NO character body, face, text, or important elements here. Character must stand clearly in the LEFT half or clearly in the RIGHT half — never straddling center. Background scenery only may pass through naturally.

NO CENTER FOLD — CRITICAL: Do NOT render any center spine line, fold crease, gutter shadow, depth gradient, or visual divide at the horizontal midpoint. The canvas is a completely flat seamless 2:1 spread — background, sky, scenery, and lighting must flow continuously from the left edge to the right edge with no interruption, darkening, or separation at center.

TEXT RENDERING: Render only the exact text content shown in each prompt. No font names. No labels. No extra words. Render every word EXACTLY as written — same case, same spelling, no alterations. If text is ALL-CAPS in the prompt, render it ALL-CAPS. If text is mixed case, render it mixed case. Never change the case of any word.
`

export const BOOKS: Book[] = [
  {
    slug: 'gods-promises-for-you',
    title: "God's Promises For You",
    subtitle: '17 pages of scripture made beautifully personal',
    price: 23.98,
    coverImage: '/images/Books/god-promises-for-you/gods-promises-cover.jpg.png',
    previewImages: [
      '/images/Books/god-promises-for-you/gods-promises-page-1.jpg.png',
      '/images/Books/god-promises-for-you/gods-promises-page-2.jpg.png',
      '/images/Books/god-promises-for-you/gods-promises-page-3.jpg.png',
      '/images/Books/god-promises-for-you/gods-promises-page-4.jpg.png',
    ],
    totalPages: 17,
    tags: ['faith', 'bestseller'],
    recipient: ['baby', 'toddler', 'child'],
    occasion: ['baptism', 'birthday', 'christmas', 'easter', 'any'],
    description: "A one-of-a-kind personalized storybook where your child is the main character — with their face, name, and God's promises woven into every single page. 17 beautifully illustrated scenes, each featuring a scripture verse and your child's likeness rendered in stunning Pixar-quality art.",
    shortDesc: "Your child's face meets God's promises — 17 stunning pages of faith and love.",
    badge: 'Bestseller',
    badgeColor: '#E8836A',
    rating: 4.9,
    reviews: 248,
    featured: true,
    pagePrompts: [

      // PAGE 0 — COVER
      `${GLOBAL_STYLE}
SCENE: Wide 2:1 landscape. Lush spring meadow at golden-pink sunset. Pink cherry blossom trees scattered across the midground. Dense colorful wildflowers — heart-shaped pink tulips, white daisies, purple lavender — carpet the foreground. Soft rolling green hills in the background. White doves and monarch butterflies drift through warm glowing air. A soft pastel rainbow arcs across the upper-right sky. Warm golden cinematic light, soft lens warmth.

CHARACTER: Full body, head to toe. Standing in the RIGHT HALF of the image — right of center, clear of the spine zone. Looking upward with a wide joyful open-mouth smile. Feet resting naturally in the flower field. Does not cross center.

TEXT — render exactly:
UPPER-RIGHT area, curving gently to follow the rainbow arc:
  "GOD'S PROMISES FOR"
  Small-to-medium bold ALL-CAPS rounded text. Bright orange-yellow color with white outline. Compact — sits neatly along the rainbow curve without taking up much space. The illustration should still be the hero.

DIRECTLY BELOW that first line, same right side:
  "[CHILD_NAME_UPPER]"
  Medium-large bold ALL-CAPS rounded text — slightly bigger than the line above but still modest in scale. Vivid red-orange color with white outline. Does not overpower the scene.

LEFT SIDE: Keep the left-center area (left half of the image, around mid-height) open and relatively clear — a natural gap in the flowers and foliage where a small logo can be placed. No characters, no large objects in that zone.

BOTTOM-RIGHT corner, very small:
  "by : party&presents"
  Small italic white text.

STYLE: Pixar/Disney 3D animated feature film. 2:1 landscape. Full bleed.`,

      // PAGE 1 — DEDICATION
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Strict left-right split.
RIGHT HALF: Warm cozy animated nursery interior. Cream upper walls, sage-green lower wainscoting. Small wooden bookshelf with colorful board books. Plush white lamb stuffed toy on the carpet. Neatly folded light-blue fleece blanket. Small wooden stool with a glowing yellow star nightlight. Tiny framed watercolor rainbow on the wall. A hanging dove and star mobile. Tiny gold sparkle particles floating. Soft warm morning window light.
LEFT HALF: Very soft warm cream or ivory tone — like clean writing paper. Extremely subtle, barely visible paper texture. No scenery, no objects, no furniture at all — a pure clean writing surface for text.

CHARACTER: Seated on the nursery carpet in the RIGHT HALF only — right of center, clear of the spine zone. Legs loosely in front. Looking toward the left side with a wide happy smile. Full body visible. Stays entirely within the right half.

TEXT — render on the LEFT HALF only:
UPPER PORTION of the left half:
  "This book belongs to [CHILD_NAME]."
  Medium-large rounded text. Mixed case, not all caps. Warm dark navy color. Friendly handwritten style. No outline, soft shadow only.

BELOW that, with clear breathing room:
  "[DEDICATION]"
  Slightly smaller rounded text. Same handwritten style. Dark navy. Multiple lines, comfortable line spacing.

All text stays strictly within the left half. Character stays strictly in the right half.
STYLE: Pixar/Disney 3D animated. 2:1 landscape. Full bleed.`,

      // PAGE 2 — GOD WILL ALWAYS BE WITH YOU
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Magical enchanted forest at golden hour. A winding dirt path curves from the foreground center toward the background right. Ancient towering trees with massive gnarled trunks flank both sides. Thick leafy canopy above with amber-green light. Warm golden-orange god-rays pierce through the canopy and illuminate the path. Colorful wildflowers line the path edges — white daisies, blue bell flowers, purple lupines, golden blooms. Butterflies flutter in the light shafts. A small bluebird perches on a high branch at upper-left. Two fluffy brown rabbits sit at the sides of the path. Glowing firefly-like particles near the ground.

CHARACTER: Full body, head to toe. Walking forward along the path in the RIGHT HALF of the image — right of center, clear of the spine zone. Mid-stride natural walking pose — left foot forward. Curious, brave expression looking ahead. Does not cross center.

TEXT — render exactly:
UPPER-RIGHT area, well above and to the right of the character:
  "GOD WILL ALWAYS BE WITH YOU, [CHILD_NAME_UPPER]."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Does not overlap the character.

LOWER-LEFT area, over the darker forest floor:
  "Haven't I commanded you? Be strong and courageous. Don't be afraid. Don't be dismayed, for Yahweh your God is with you wherever you go."
  New line: "Joshua 1:9"
  Medium cursive/handwritten style text. White color with soft dark shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Magical golden-hour forest. 2:1 landscape. Full bleed.`,

      // PAGE 3 — GOD MADE YOU SPECIAL
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Bright cheerful open meadow at midday. Pastel blue-pink sky with fluffy cotton-candy clouds. A soft pastel rainbow arcs across the upper-right sky. Rolling soft green hills in the far background. Lush colorful wildflowers — vibrant red poppies, white daisies, purple bell flowers, orange blooms. A leafy tree branch dips from the upper-right corner with two small adorable bluebirds. Colorful butterflies throughout. Small woodland animals gather near the character — two or three fluffy brown rabbits and a baby fawn, all looking up adoringly.

CHARACTER: Full body, head to toe. Standing upright in the LEFT HALF of the image — left of center, clear of the spine zone. Huge delighted open-mouth smile, sparkling happy eyes, arms relaxed naturally at sides. Animals gathered naturally around their feet. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area, above and to the left of the character:
  "GOD MADE YOU SPECIAL, BEAUTIFUL, AND WONDERFULLY YOU, [CHILD_NAME_UPPER]."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Three lines. Left-aligned. Does not overlap the character.

RIGHT SIDE, middle height, in the open meadow area:
  "I will give thanks to you, for I am fearfully and wonderfully made. Your works are wonderful. My soul knows that very well."
  New line: "Psalm 139:14"
  Medium cursive/handwritten style text. Dark navy color with soft shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Bright sunny meadow. 2:1 landscape. Full bleed.`,

      // PAGE 4 — GOD'S LOVE FOR YOU WILL NEVER END
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. A magical glowing ancient enormous tree at warm golden dusk. The massive ancient tree with a wide gnarled trunk dominates the center-background — its canopy glows with warm golden-amber light from within. Light particles and fireflies float throughout. Pink blossom-like flowers on the branches. Open glowing books float magically in the upper branches. Pink and yellow flowers carpet the ground around the tree base. Small birds perch on lower branches. Warm magical loving atmosphere.

CHARACTER: Full body. Sitting at the right side of the tree base — in the RIGHT HALF of the image, clear of the spine zone. Back leaning contentedly against the right side of the trunk. Legs loosely out in front. Looking upward with joyful wonder and a big smile.

TEXT — render exactly:
UPPER-RIGHT area, above the character:
  "GOD'S LOVE FOR YOU, [CHILD_NAME_UPPER], WILL NEVER END."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Right-aligned. Does not overlap the character.

LEFT SIDE, middle height, in the open space beside the tree:
  "Yes, I have loved you with an everlasting love. Therefore I have drawn you with loving kindness."
  New line: "Jeremiah 31:3"
  Medium cursive/handwritten style text. White color with soft dark shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Magical glowing ancient tree. Warm golden light. 2:1 landscape. Full bleed.`,

      // PAGE 5 — GOD FILLS YOUR HEART WITH PEACE
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Peaceful serene meadow beside a gentle stream at soft morning light. The stream winds gently through the lower-right area, sparkling softly. Lush green grass with wildflowers — white daisies, small purple flowers, yellow blooms. Tall cattail reeds and soft grasses at the water's edge. Colorful butterflies and a white dove in flight. The sky is soft and airy — pale blue-white gradient, very light and peaceful. Purple mountains in the far background. Soft morning mist over the water. The scene feels deeply peaceful and still.

CHARACTER: Full body. Sitting peacefully on the grassy bank in the LEFT HALF of the image — left of center, clear of the spine zone. Legs loosely out in front, hands resting on knees. Peaceful gentle smile, eyes soft and content, looking slightly upward. Barefoot, completely relaxed. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area, above and to the left of the character:
  "GOD FILLS YOUR HEART WITH PEACE, [CHILD_NAME_UPPER], WHEN YOU NEED IT MOST."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Left-aligned. Does not overlap the character.

RIGHT SIDE, middle height, in the open meadow area above the stream:
  "Peace I leave with you. My peace I give to you; not as the world gives, I give to you. Don't let your heart be troubled, neither let it be fearful."
  New line: "John 14:27"
  Medium cursive/handwritten style text. Dark navy color with soft shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Peaceful serene meadow stream. Soft morning light. 2:1 landscape. Full bleed.`,

      // PAGE 6 — WHENEVER YOU TALK TO GOD HE LISTENS
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Warm cozy child's bedroom at peaceful night. A wooden bed in the right portion of the scene with a patchwork quilt in soft blues, grays, and creams. A wooden bedside table with a warm lamp glowing softly. An open storybook on the floor. Small slippers near the bed. A plush bunny stuffed toy on the bed. A large window on the right showing a beautiful night sky — deep blue with a glowing crescent moon, twinkling stars, soft clouds. Magical soft sparkle light rays through the window. A glowing white dove visible outside. The scene feels warm, safe, deeply loved.

CHARACTER: Full body. Kneeling beside the bed in the RIGHT HALF of the image — right of center, clear of the spine zone. Both knees on the soft rug. Hands pressed together in prayer in front of the chest. Head bowed slightly, eyes closed. Expression completely peaceful, serene, trusting. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area:
  "WHENEVER YOU TALK TO GOD, [CHILD_NAME_UPPER], HE LISTENS."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Left-aligned.

LEFT SIDE, middle height:
  "You shall call on me, and you shall go and pray to me, and I will listen to you."
  New line: "Jeremiah 29:12"
  Medium cursive/handwritten style text. White color with soft dark shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Warm cozy bedroom at night. 2:1 landscape. Full bleed.`,

      // PAGE 7 — GOD WATCHES OVER YOU DAY AND NIGHT
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. A child's cozy bedroom at deep peaceful night. Soft blue-gray moonlit atmosphere. A wooden bed in the right portion of the scene with the child sleeping under a soft cream/gray quilted duvet. Multiple small stuffed animals on and around the bed — a teddy bear, a plush bunny, a plush dog. A bedside lamp glowing softly. A large window on the LEFT showing a beautiful moonlit night sky — a large glowing full moon, soft clouds, glowing stars. Moonlight streams through the window casting soft silver-blue light across the room. A softly glowing white dove hovers near the ceiling. The scene feels profoundly peaceful, safe, and protected.

CHARACTER: Lying in bed sleeping in the RIGHT HALF of the image — tucked snugly under the covers, head on pillow, eyes closed. Peaceful sleeping expression. Surrounded by stuffed animals. Upper body and head visible above the covers. Bed and character stay in the right half, clear of the spine zone.

TEXT — render exactly:
UPPER-RIGHT area, above the sleeping child:
  "GOD WATCHES OVER YOU, [CHILD_NAME_UPPER], DAY AND NIGHT."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Right-aligned. Does not overlap the character.

LEFT SIDE, middle height, in the open moonlit area near the window:
  "Yahweh will keep you from all evil. He will keep your soul. Yahweh will keep your going out and your coming in, from this time forward, and forever more."
  New line: "Psalm 121:7-8"
  Medium cursive/handwritten style text. White color with soft dark shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Peaceful moonlit bedroom. 2:1 landscape. Full bleed.`,

      // PAGE 8 — WHEN YOU FEEL WEAK GOD WILL MAKE YOU STRONG
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Beautiful hilltop meadow at golden sunrise. A gentle grassy hill with scattered rocks in the foreground. Lush wildflowers — yellow daisies, orange blooms, purple lavender, white flowers. Rolling green hills in the background right. The sky is breathtaking — brilliant golden-white sunrise light floods from the upper right, dramatic golden rays fanning outward. Puffy golden-lit clouds. Small birds soar as silhouettes. Wind blowing softly — petals and leaves drift through the air. The scene feels energetic, triumphant, full of power.

CHARACTER: Full body, head to toe. Standing in the LEFT HALF of the image — left of center, clear of the spine zone. Triumphant wind-blown pose — one foot forward on a rock, one arm raised upward toward the sky, other arm slightly back. Expression: joyful, brave, triumphant, exhilarated. Hair and clothes gently blown by the breeze. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area, above the character:
  "WHEN YOU FEEL WEAK, [CHILD_NAME_UPPER], GOD WILL MAKE YOU STRONG."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Left-aligned. Does not overlap the character.

RIGHT SIDE, middle height, in the open sky and hill area:
  "He gives power to the weak. He increases the strength of him who has no might."
  New line: "Isaiah 40:29"
  Medium cursive/handwritten style text. Dark navy color with soft shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Triumphant hilltop sunrise. 2:1 landscape. Full bleed.`,

      // PAGE 9 — YOU NEVER HAVE TO BE AFRAID
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Rainy day path — dramatic but hopeful atmosphere. A wet cobblestone path glistening in gentle rain. Soft light rain falling. Puddles reflecting soft light. Green grass and plants on both sides. A beautiful vibrant full rainbow arcs from the left side across to the right — bright vivid colors. The right side of the sky is brighter, with golden light breaking through dark clouds. Trees in the background. A small orange fox sits on the left side of the path. A small fluffy rabbit sits on the right side of the path.

CHARACTER: Full body, head to toe. Walking on the path in the LEFT HALF of the image — left of center, clear of the spine zone. Walking forward with a determined expression. Holding a transparent clear umbrella with pink polka dots. Expression: wide-eyed but brave, determined, not afraid. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area, above the character:
  "YOU NEVER HAVE TO BE AFRAID, [CHILD_NAME_UPPER], BECAUSE GOD IS WITH YOU."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Left-aligned. Does not overlap the character.

RIGHT SIDE, middle height, in the brighter open sky area:
  "Don't you be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness."
  New line: "Isaiah 41:10"
  Medium cursive/handwritten style text. White color with soft dark shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Rainy day path with rainbow. 2:1 landscape. Full bleed.`,

      // PAGE 10 — GOD HAS BEAUTIFUL PLANS FOR YOUR LIFE
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Beautiful open golden meadow at brilliant sunrise. A wide open sky fills the upper half — soft blue transitioning to brilliant warm golden-white at the horizon. Lush green meadow with colorful wildflowers everywhere. Rolling gentle hills in the background. A winding path leads toward a distant glowing fairytale castle on a hill in the background right. Glowing golden stars trail upward in the sky. A colorful kite flies in the upper-right sky. A hot air balloon floats in the far upper right. A small sailboat silhouette on the horizon. The scene feels full of possibility, beautiful dreams, and hope.

CHARACTER: Full body, head to toe. Standing in the LEFT HALF of the image — left of center, clear of the spine zone. Looking upward at the sky with wide-eyed wonder and hope. Both arms slightly out at sides, relaxed open pose. Mouth slightly open in awe and delight. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area, above the character:
  "GOD HAS BEAUTIFUL PLANS FOR YOUR LIFE, [CHILD_NAME_UPPER]."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Left-aligned. Does not overlap the character.

RIGHT SIDE, middle height, in the open meadow and sky area:
  "For I know the thoughts that I think toward you, says Yahweh, thoughts of peace, and not of evil, to give you hope and a future."
  New line: "Jeremiah 29:11"
  Medium cursive/handwritten style text. Dark navy color with soft shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Open golden meadow sunrise. 2:1 landscape. Full bleed.`,

      // PAGE 11 — GOD WILL HELP LEAD YOU EVERY STEP
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Magical glowing stepping-stone path through an enchanted garden at golden hour. Beautiful stone stepping-stones wind from the foreground center toward a glowing warm horizon. Small gentle waterfalls cascade on both sides of the path. Lush green bushes, cherry blossom trees with pink petals, and colorful flowers line both sides. Japanese paper lanterns hang from tree branches on the left. Cherry blossom petals drift through warm air. Fireflies and golden light particles throughout. The scene feels magical, gently guiding, and warm.

CHARACTER: Full body, head to toe. Standing on the stepping stones in the LEFT HALF of the image — left of center, clear of the spine zone. Looking forward and slightly upward with wonder, openness, and trust. Hands naturally at sides. Does not cross center.

TEXT — render exactly:
UPPER-RIGHT area, in the open garden above the path on the right side:
  "GOD WILL HELP LEAD YOU, [CHILD_NAME_UPPER], EVERY STEP OF THE WAY."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Right-aligned.

RIGHT SIDE, middle height, below the title — still in the open garden area:
  "I will instruct you and teach you in the way which you shall go. I will counsel you with my eye on you."
  New line: "Psalm 32:8"
  Medium cursive/handwritten style text. Dark navy color with soft shadow. Centered in that area. Clear gap below the title text above.

STYLE: Pixar/Disney 3D animated. Magical stepping stone path. Golden warm light. 2:1 landscape. Full bleed.`,

      // PAGE 12 — GOD BRINGS JOY TO YOUR HEART EACH NEW DAY
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Joyful vibrant colorful meadow on a bright sunny morning. Rich green meadow bursting with colorful wildflowers — red poppies, orange blooms, blue bell flowers, yellow daisies, purple lavender. Bright blue sky with soft white fluffy clouds. Dozens of transparent soap bubbles float and drift everywhere, catching beautiful light. Colorful butterflies in flight. Bluebirds and yellow birds fly in the upper area. Golden sparkle light particles drifting. Rolling green hills in the background. The scene radiates pure happiness and morning joy.

CHARACTER: Full body, head to toe. Running or skipping joyfully through the meadow in the RIGHT HALF of the image — right of center, clear of the spine zone. Mid-stride, one foot off the ground. Arms slightly out for balance. Expression: the biggest most joyful open-mouth laughing smile, eyes sparkling with delight. Soap bubbles floating around them. Does not cross center.

TEXT — render exactly:
UPPER-RIGHT area, above the character:
  "GOD BRINGS JOY TO YOUR HEART, [CHILD_NAME_UPPER], EACH NEW DAY."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Right-aligned. Does not overlap the character.

LEFT SIDE, middle height, in the open meadow area:
  "You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more."
  New line: "Psalm 16:11"
  Medium cursive/handwritten style text. White color with soft dark shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Joyful bubble meadow. Bright sunny morning. 2:1 landscape. Full bleed.`,

      // PAGE 13 — GOD HELPS YOUR HEART GROW KIND
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Beautiful warm enchanted garden at golden afternoon. A stone pathway winds through the scene. Well-manicured green bushes and hedges. Climbing roses on trellises — pink, yellow, red. Colorful flowers everywhere — roses, lavender, foxgloves, peonies in full bloom. Fruit trees with berries in the background. Warm golden afternoon sunlight streaming from the upper right. Golden light particles drifting softly. Orange and purple butterflies throughout. The garden feels warm, lush, full of life and gentleness.

CHARACTER: Full body. Kneeling on both knees on the garden path in the LEFT HALF of the image — left of center, clear of the spine zone. Both hands cupped gently together in front, holding a small bright blue bluebird sitting trustingly in their palms. Expression: gentle, tender, kind, wonder-filled soft smile — looking down at the bird with complete love and care. A small brown rabbit on the left side looking up adoringly. A small orange squirrel on the right side looking up adoringly. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area, above the character:
  "GOD HELPS YOUR HEART GROW KIND, LOVING, AND GENTLE, [CHILD_NAME_UPPER]."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Left-aligned. Does not overlap the character.

RIGHT SIDE, middle height, in the open garden area:
  "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control. Against such things there is no law."
  New line: "Galatians 5:22-23"
  Medium cursive/handwritten style text. White color with soft dark shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Warm enchanted garden. Golden afternoon light. 2:1 landscape. Full bleed.`,

      // PAGE 14 — GOD IS LOVING FORGIVING AND FULL OF MERCY
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Soft warm ethereal garden path at gentle morning. A stone cobblestone path runs through the center of the scene. Lush colorful garden on both sides — the LEFT side has deeper tones: deep pink, purple blooms, dark green foliage. The RIGHT side has lighter warmer tones: yellow flowers, orange blooms, pink flowers, bright greens in warm backlight. Scattered golden light rays from the upper right. Gold light particles float gently. A small brown sparrow on the left of the path. A small blue-gray bird on the right of the path. An orange monarch butterfly in the upper center. A woven wicker basket tipped on its side with red apples spilling across the cobblestones.

CHARACTER: Full body. Sitting on the cobblestone path in the RIGHT HALF of the image — right of center, clear of the spine zone. Sitting on the ground, legs loosely in front. One hand resting on the cobblestones, leaning slightly. Looking upward and to the left with a remorseful but hopeful expression. Does not cross center.

TEXT — render exactly:
UPPER-RIGHT area, above the character:
  "GOD IS LOVING, FORGIVING, AND FULL OF MERCY FOR YOU, [CHILD_NAME_UPPER]."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Right-aligned. Does not overlap the character.

LEFT SIDE, middle height, in the darker garden area:
  "If we confess our sins, he is faithful and righteous to forgive us the sins and to cleanse us from all unrighteousness."
  New line: "1 John 1:9"
  Medium cursive/handwritten style text. White color with soft dark shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Soft warm garden path. Warm forgiving tones. 2:1 landscape. Full bleed.`,

      // PAGE 15 — GOD FILLS YOUR LIFE WITH HOPE PEACE AND LIGHT
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Magnificent hilltop vista at stunning sunset and dusk. Rolling misty green hills and valleys stretch to the horizon. A glowing winding river of light — shimmering silver-white sparkles — traces through the valley below like a path made of stars. Tall wildflowers and grass at the hilltop edges — purple, pink, yellow, white blooms. The sky is the hero: deep blue upper sky transitions through purple to rose-pink to warm amber-orange at the horizon. Fluffy pink-orange lit clouds in layers. Several small birds soar as silhouettes in the mid-sky. The entire scene feels expansive, hopeful, and awe-inspiring.

CHARACTER: Full body, head to toe. Standing on the hilltop in the LEFT HALF of the image — left of center, clear of the spine zone. Standing upright, tall, confident, still. Hands clasped gently together in front at waist level. Looking forward toward the glowing horizon with a serene, peaceful, grateful expression. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area, above and to the left of the character:
  "GOD FILLS YOUR LIFE WITH HOPE, PEACE, AND LIGHT, [CHILD_NAME_UPPER]."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Two lines. Left-aligned. Does not overlap the character.

RIGHT SIDE, middle height, in the open sky and valley area:
  "Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope in the power of the Holy Spirit."
  New line: "Romans 15:13"
  Medium cursive/handwritten style text. Dark navy color with soft shadow. Centered in that area.

STYLE: Pixar/Disney 3D animated. Hilltop sunset vista. Dramatic pink-purple-gold sky. 2:1 landscape. Full bleed.`,

      // PAGE 16 — GOD'S BLESSINGS WILL GO WITH YOU
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Strict left-right split layout.
LEFT HALF: Warm golden meadow at brilliant sunrise. Rolling green hills in the background. Lush wildflowers in the foreground — orange poppies, pink flowers, white daisies, purple blooms. A warm golden-white sunburst radiates from the upper center of this half. Dozens of monarch butterflies fill the air along with small birds in flight. Pink flower petals drift through warm air. Soft golden clouds.
RIGHT HALF: Very soft blush tone — pale pink-white like parchment or fine watercolor paper. An extremely delicate, barely-there floral watercolor border frames only the outer edges of this half. The center of the right half is completely clean and open for text. No scenery elements, no character, nothing crosses into the right half from the left.

CHARACTER: Full body, head to toe. Standing entirely within the LEFT HALF only — left of center, clear of the spine zone. Both arms spread wide open like wings, palms facing forward and upward in pure joyful celebration. Head tilted back slightly, looking upward with the biggest most joyful open-mouth laughing expression. Does not cross center.

TEXT — render exactly:
UPPER-LEFT area of the left half, above the character:
  "GOD'S BLESSINGS WILL GO WITH YOU, [CHILD_NAME_UPPER], TODAY AND ALWAYS."
  Large bold ALL-CAPS rounded text. Red-orange color with white outline. Three lines. Left-aligned. Does not overlap the character.

LOWER-LEFT area of the left half, below the character:
  "Yahweh bless you, and keep you. Yahweh make his face to shine on you, and be gracious to you."
  New line: "Numbers 6:24-25"
  Small cursive/handwritten style text. Dark navy color with soft shadow. Centered in that area.

CENTER of the right blush panel — the clean open area:
  "With all our love,"
  New line: "[SENDER_NAME]"
  Medium cursive/handwritten style text. Dark navy color. Centered in the right panel.

STYLE: Pixar/Disney 3D animated. Glorious sunrise left half. Soft blush right half. 2:1 landscape. Full bleed.`,
    ],
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

  // ─── Before the Music Plays — Version 1 (Soft Storybook Style) ────────────
  {
    slug: 'before-the-music-plays-1',
    title: 'Before the Music Plays 1',
    subtitle: 'A flower girl story — soft storybook style',
    price: 23.98,
    coverImage: 'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Cover_-_Page_0_gssekg.png',
    previewImages: [
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_3_u2rqpp.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_4_oxlsdp.png',
    ],
    totalPages: 17,
    tags: ['wedding', 'new'],
    recipient: ['toddler', 'child'],
    occasion: ['wedding', 'any'],
    description: "A beautiful personalized storybook for your little flower girl — the story of her special day, told with her face on every page. Soft pastel 3D storybook illustration style. 17 stunning spreads capturing every magical moment from getting dressed to walking down the aisle.",
    shortDesc: 'The story of her flower girl day — personalized with her face.',
    badge: 'New',
    badgeColor: '#E8836A',
    rating: 5.0,
    reviews: 0,
    featured: true,
    coverLogoStyle: 'color',
    characterPrompt: FLOWER_GIRL_CHARACTER_PROMPT,
    characterConsistencyNote: FLOWER_GIRL_CONSISTENCY_NOTE,
    pagePrompts: [

      // PAGE 0 — COVER
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
A dreamy children's storybook cover with a magical wedding atmosphere. The character from the reference image stands on the RIGHT side of the canvas, full body, holding a flower basket, smiling with innocent excitement and gentle anticipation, looking slightly downward as if imagining the wonderful day ahead. Floating flower petals, tiny sparkles, pastel flowers and soft doodle hearts surround the character. The LEFT half remains mostly empty with a warm creamy gradient for visual balance.

Background: soft warm ivory with cream-to-beige gradient, gentle glowing vignette, subtle paper texture, floating flower petals, tiny pastel sparkles, small floral doodles, soft magical lighting.

TEXT — render exactly in the top-right quadrant:

MAIN TITLE — large playful brush script, rounded handwritten style, bubble-like curves, PINK:
  Before the
  Music Plays

SUBTITLE — rounded handwritten font, LAVENDER, medium weight:
  A Story for [CHILD_NAME]

BOOK SUBTITLE — thick rounded bubble font, WHITE fill with PINK OUTLINE:
  On the Day She Was Chosen

AUTHOR — small rounded playful font, PURPLE:
  by : party&presents

PUBLISHER LOGO — left-center of canvas, small, pink: party&presents logo`,

      // PAGE 1 — DEDICATION
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
Minimal dedication page with elegant ribbon curling across the bottom-right. Small pastel flowers and scattered petals decorate the page. Calm, peaceful, sentimental atmosphere. No character present.

Mood: warm, heartfelt, quiet, elegant.

Background: mostly white page with cream glow on right side, soft vignette, ribbon with realistic folds and natural sheen, small floating flower petals, tiny pastel flowers scattered softly.

TEXT to render in the upper-right area, centered:
For [CHILD_NAME], who said yes. And for the day that needed exactly the right person to make it complete.`,

      // PAGE 2 — MORNING EXCITEMENT
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
The character from the reference image has just awakened in bed, smiling with wide-eyed excitement, amazement and joyful anticipation. Hands tucked near the face in delighted surprise as soft flower petals float through the room. Morning sunlight pours through a large window. Character wears soft children's pajamas — NOT the flower girl dress.

Emotion: delighted, amazed, excited, hopeful, innocent wonder.

Background: cozy bedroom, warm sunrise, soft glowing window, cream bedding, floating blossoms, airy pastel atmosphere.

Character on the RIGHT side. LEFT side clear for text.

TEXT to render on the LEFT side, centered vertically:
On the morning of the day everyone had been waiting for, [CHILD_NAME] woke up to a house full of flowers and a feeling that something wonderful was about to happen.`,

      // PAGE 3 — GETTING READY
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
A caring adult gently helps the character from the reference image get dressed. The child stands calmly, looking upward with admiration, trust, curiosity and growing excitement. Flower basket rests nearby on the floor.

Emotion: trusting, calm, curious, quietly excited, feeling special.

Background: soft blush room, minimal furniture, dress form mannequin, vintage chair, plush rug, gentle pastel lighting.

Character and adult are on the LEFT side. RIGHT side clear for text.

TEXT to render on the RIGHT side, centered:
There was a special dress laid out — just for today. She tried it on slowly, like it might be magic.`,

      // PAGE 4 — MIRROR
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
The character from the reference image stands before a large decorative mirror, smiling softly while admiring the reflection. The reflection appears magical, surrounded by sparkling lights. Quiet realization begins to appear.

Emotion: wonder, admiration, confidence beginning to bloom, surprise, quiet pride.

Background: elegant bedroom, ornate mirror, floating sparkles, petals, soft dreamy glow.

Character on LEFT side, ornate mirror on RIGHT side. Reflection of character visible inside mirror.

TEXT — two captions at the bottom of the spread:
BOTTOM-LEFT beneath the character: When [CHILD_NAME] looked in the mirror, she almost didn't recognize the person looking back.
BOTTOM-RIGHT beneath the mirror reflection: Today, she looked like someone with a very important job to do.`,

      // PAGE 5 — JOURNEY
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
The character from the reference image walks toward the wedding venue holding the basket while looking back over the shoulder with quiet excitement and curiosity. Flower petals trail through the air. Character seen from behind or three-quarter-back view.

Emotion: eager, curious, hopeful, adventurous.

Background: soft green garden, wedding arch in distance, floral decorations, gentle bokeh, airy pastel landscape.

Character on the RIGHT side looking back. LEFT side clear for text.

TEXT to render on the LEFT side, centered vertically — two paragraphs with a gap between them:
The car wound through town, past fields and ribbons and signs pointing the way.

When they arrived, the whole place smelled like flowers and felt like magic already.`,

      // PAGE 6 — GREETING THE BRIDE
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
The character from the reference image lovingly hugs the bride. The bride kneels slightly to welcome the child warmly. Emotional reunion filled with affection. The bride's face is intentionally FEATURELESS — smooth and blank with no facial features, for universal gifting design.

Emotion — Child: comfort, happiness, loved, safe. Bride: warmth, gratitude, tenderness.

Background: wedding arch, cream floral arrangements, floating roses, golden sunlight, soft dreamy blur.

Characters together on the LEFT side. RIGHT side clear for text.

TEXT to render on the RIGHT side, centered:
[SENDER_NAME] was already there, glowing in a way [CHILD_NAME] had never seen before.

"[CHILD_NAME]!" she said, kneeling down. "You came. I was hoping you would."`,

      // PAGE 7 — THE CHOSEN ONE
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
Close emotional moment where the bride gently holds the character's hands while speaking sincerely. The character from the reference image gazes upward with admiration and emotional connection. The bride's face is intentionally FEATURELESS — smooth and blank with no facial features, for universal gifting design.

Emotion — Child: honored, emotional, attentive, proud, deeply touched. Bride: gentle, affectionate, sincere.

Background: golden sunlight, dreamlike bokeh, floating petals, warm glowing atmosphere.

Character close-up on the RIGHT side, bride's hands and partial figure on the LEFT. LEFT side clear for text.

TEXT to render on the LEFT side, centered vertically — three paragraphs:
[SENDER_NAME] could have chosen anyone for this. She thought about it for a long time.

And every time, she thought of [CHILD_NAME]—your laugh, your brave heart, the way you make a room feel warmer just by walking in.

That's not something you can practise. You either have it, or you don't.`,

      // PAGE 8 — BASKET
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
Close-up composition. The character from the reference image hugs a basket overflowing with flower petals, eyes wide with excitement and slight nervousness. Basket dominates the foreground.

Emotion: excited, nervous, determined, amazed.

Background: peach gradient, soft floating petals, minimal distractions, gentle magical glow.

Basket large in the foreground/center, character's face and hands visible behind and above the basket on the RIGHT. LEFT side clear for text.

TEXT to render on the LEFT side, centered — three stacked lines:
Someone placed a small basket of petals carefully into [CHILD_NAME]'s hands.

"You know what to do," they whispered.

[CHILD_NAME] nodded, even though her tummy had gone all fluttery, like a hundred tiny wings.`,

      // PAGE 9 — WAITING
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
The character from the reference image waits outside large ceremonial doors holding the basket carefully. Looking worried while listening to distant music.

Emotion: nervous, anxious, uncertain, patient, quietly brave.

Background: large elegant doors, warm golden light beneath the doors, floating petals, tiny magical sparkles.

Character on the LEFT side, full body, holding basket. RIGHT side clear for text.

TEXT to render on the RIGHT side, centered vertically:
Then came the waiting. Behind the big doors, [CHILD_NAME] could hear the music start, soft and far away, like the whole world was holding its breath.`,

      // PAGE 10 — DEEP BREATH
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
Close-up portrait. The character from the reference image has eyes closed while taking a calming breath. A comforting adult hand rests gently on the shoulder.

Emotion: calming down, courage, reassurance, peaceful focus, determination.

Background: soft cream backdrop, tiny sparkles, minimal decorative flowers, bright gentle lighting.

Character close-up filling the LEFT side, eyes closed. RIGHT side clear for text.

TEXT to render on the RIGHT side, centered:
"It's all right to feel that flutter," someone whispered. "Even the bravest people do."

[CHILD_NAME] took a deep breath. She could do brave things. She had practised.`,

      // PAGE 11 — DOORS OPEN
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
Large wooden doors swing open revealing a bright ceremony aisle. The character from the reference image is seen from behind, pausing before entering. Warm light floods inward.

Emotion: awe, anticipation, courage, determination, nervous excitement.

Background: bright glowing aisle stretching into the distance, wedding guests softly blurred on both sides, floral arch, golden lighting, falling petals.

Character from behind, small in scale, centered in the open doorway on the RIGHT side. LEFT side clear for text.

TEXT to render on the LEFT side, centered vertically:
Then the doors opened. Light flooded in. And there was the aisle, stretching out long and golden, with every single face turned to see [CHILD_NAME].`,

      // PAGE 12 — WALKING THE AISLE
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
The character from the reference image happily walks down the aisle waving while flower petals fall around. Guests smile in the softly blurred background.

Emotion: joyful, confident, brave, excited, proud.

Background: ceremony aisle, blurred smiling guests on both sides, white flowers, soft warm light, falling petals.

Character on the LEFT side, mid-stride, one arm raised in a joyful wave, basket in other hand. RIGHT side clear for text.

TEXT to render on the RIGHT side, centered:
So [CHILD_NAME] walked. Petals drifted down with every step, soft and pink against the stone path. And though her heart went pitter-pat, her feet knew exactly where to go.`,

      // PAGE 13 — ARRIVAL
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
The character from the reference image reaches the bride smiling proudly after completing the walk. Flower petals scattered across the floor.

Emotion: relief, pride, accomplishment, happiness, admiration.

Background: bright ceremony, warm sunlight, soft floral décor, petals covering the aisle floor, dreamlike glow.

Character on the LEFT/CENTER area, full body, looking up proudly. Bride's white dress visible at far right edge only (no face). LEFT side clear for text.

TEXT to render on the LEFT side, centered vertically:
Everyone smiled as [CHILD_NAME] reached the end of the aisle. The petals were scattered behind her like a little trail of sunshine and roses.

And there, waiting with the softest smile, was [SENDER_NAME].`,

      // PAGE 14 — CELEBRATION
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
The character from the reference image joyfully twirls while dancing during the reception. Dress flows naturally and flares from the spin. Hearts, sparkles and petals float throughout the scene.

Emotion: pure happiness, carefree, playful, triumphant, free.

Background: reception hall, warm fairy lights overhead, blurred tables and guests in background, soft pink lighting, floating hearts, sparkles.

Character twirling on the LEFT side, dress skirt flaring outward. RIGHT side clear for text.

TEXT to render on the RIGHT side, centered:
Later, when the music played and everyone began to dance, [CHILD_NAME] felt light as a ribbon in the wind. She had done her special job. And all around her, the whole day seemed to sparkle.`,

      // PAGE 15 — BEDTIME REFLECTION
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
Nighttime bedroom. The character from the reference image lies in bed smiling softly while remembering the magical day. Tiny glowing stars drift through moonlight. Character wears soft children's pajamas — NOT the flower girl dress.

Emotion: peaceful, grateful, dreamy, content, reflective.

Background: moonlit bedroom, blue-gray night palette, flower girl dress hanging nearby on a hook or hanger, basket on bedside table, glowing stars, gentle moon rays through window.

Character on the RIGHT side lying in bed. LEFT side clear for text.

TEXT to render on the LEFT side, centered vertically — use light text color (#E8ECF5) for legibility against the dark background:
That night, after the music had stopped and the cake had been cut and the dancing had worn everyone out, [CHILD_NAME] lay in bed thinking about the whole beautiful day.`,

      // PAGE 16 — FINAL PAGE
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
Minimal closing page featuring only the flower basket filled with petals. Soft petals scattered around the basket. Calm ending with generous empty space for breathing room. No character present.

Mood: peaceful, thankful, complete, sentimental.

Background: warm ivory with soft vignette, tiny floating petals, minimal floral decorations. Plenty of white space on the RIGHT side.

Basket centered on the LEFT half. RIGHT half is pure white, empty.

TEXT to render top-center above the basket — two lines:
Thank you for saying yes, [CHILD_NAME].
With love, [SENDER_NAME].`,
    ],
  },

  // ─── Before the Music Plays — Version 2 (Cinematic Pixar Style) ───────────
  {
    slug: 'before-the-music-plays-2',
    title: 'Before the Music Plays 2',
    subtitle: 'A flower girl story — cinematic Pixar style',
    price: 23.98,
    coverImage: 'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Cover_-_Page_0_gssekg.png',
    previewImages: [
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_3_u2rqpp.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_4_oxlsdp.png',
    ],
    totalPages: 17,
    tags: ['wedding', 'new'],
    recipient: ['toddler', 'child'],
    occasion: ['wedding', 'any'],
    description: "A beautiful personalized storybook for your little flower girl — the story of her special day, told with her face on every page. Cinematic Pixar/Disney 3D animation style with rich detailed backgrounds. 17 stunning spreads capturing every magical moment.",
    shortDesc: 'The story of her flower girl day — cinematic Pixar-quality art.',
    badge: 'New',
    badgeColor: '#E8836A',
    rating: 5.0,
    reviews: 0,
    featured: true,
    coverLogoStyle: 'color',
    characterPrompt: FLOWER_GIRL_CHARACTER_PROMPT,
    characterConsistencyNote: FLOWER_GIRL_CONSISTENCY_NOTE,
    pagePrompts: [

      // PAGE 0 — COVER
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. Lush soft garden with cream and blush roses, green foliage, and gentle morning light creating a romantic floral atmosphere. Small blush petals drift through the air.

LEFT HALF: Lighter area of the garden with softer tones and less dense foliage. KEEP LEFT CENTER CLEAR — a logo will be composited here. No character, no large elements blocking left center.

RIGHT HALF: Rich floral framing of roses and greenery around the character.

CHARACTER: Full body, head to toe. Standing in the RIGHT HALF — right of center, clear of spine zone. 3/4 pose facing the viewer. Sweet smile. Holding basket. Flower girl dress. Does not cross center.

TEXT — render exactly:
UPPER-RIGHT:
  "Before the"
  "Music Plays"
  Large bold rounded cursive. Vivid coral-pink with white outline.

BELOW title:
  "A Story for [CHILD_NAME]"
  Medium rounded. Soft lavender-purple with thin white outline.

LOWER-RIGHT:
  "On the Day She Was Chosen"
  Medium rounded. Coral-pink.

BOTTOM-RIGHT corner, small:
  "by : party&presents"
  Small italic. Soft white.`,

      // PAGE 1 — DEDICATION
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape.

LEFT HALF: Very soft warm cream — like fine writing paper. Barely visible paper texture. No objects, no scenery. Clean surface for text only.

RIGHT HALF: Romantically rendered scene with rich detail. A lustrous ivory satin ribbon curls gracefully with natural sheen and soft shadows. Small 3D pastel flowers — blue, yellow, pink blooms — with detailed petal texture rest naturally. Soft pink rose petals scattered on a cream surface. Warm bokeh light from above.

NO CHARACTER anywhere on this spread. No people, no flower girl.

TEXT — render on LEFT HALF only:
UPPER-CENTER of left half:
  "For [CHILD_NAME], who said yes."
  Medium-large rounded. Dark navy. Handwritten storybook style.

BELOW with breathing room:
  "And for the day that needed exactly the right person to make it complete."
  Slightly smaller. Dark navy. Centered in left half.`,

      // PAGE 2 — WAKING UP (Pages 2–3)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] wakes up on the morning of the wedding day.

RIGHT HALF — CHARACTER: [CHILD_NAME] sitting up in bed. OUTFIT: SOFT CHILDREN'S PAJAMAS — NOT the flower girl dress. She just woke up. Expression: excited, wonder, happy. Background: Fully rendered warm cozy bedroom — detailed floral duvet, soft pillows, warm morning sunlight streaming through gauze curtains, fresh flowers in a small vase on the windowsill. Cinematic warm golden-morning lighting and soft bokeh.

LEFT HALF: Soft blurred continuation of the bedroom at lower contrast. Text area.

CHARACTER: Sitting up in bed RIGHT HALF, in pajamas. Clear of spine zone. Does not cross center.

TEXT — render on LEFT HALF:
CENTER of left half:
  "On the morning of the day everyone had been waiting for, [CHILD_NAME] woke up to a house full of flowers and a feeling that something wonderful was about to happen."
  Medium rounded storybook text. Dark navy. Centered.`,

      // PAGE 3 — GETTING DRESSED (Pages 4–5)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] is helped into her flower girl dress.

LEFT HALF — CHARACTER: Fully rendered elegant dressing room. Warm cream walls, soft natural light. [CHILD_NAME] stands as a helper adjusts her blush sash. Detailed ivory dress fabric, soft tulle, ribbon details clearly visible. A mannequin/dress form in the soft background. Cream roses on a side table. Mirror edge visible. Cinematic warm light with rim lighting.

RIGHT HALF: Soft continuation of the room at lower contrast. Text area.

CHARACTER: [CHILD_NAME] full body LEFT HALF. Helper's hands adjusting blush sash. Shy happy expression. Clear of spine zone. Does not cross center.

TEXT — render on RIGHT HALF:
CENTER of right half:
  "There was a special dress laid out — just for today."

  "She tried it on slowly, like it might be magic."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 4 — MIRROR (Pages 6–7)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] looks at herself in an ornate mirror — fully cinematic.

FULL RENDERED SPREAD: Elegant bedroom with rich detail. Large ornate white ornamental mirror dominates the center-right. [CHILD_NAME] stands LEFT of the mirror, her exact reflection visible IN the mirror on the right. Rich carpet, bedroom furniture softly out of focus. Soft window light from the left. Sparkle particles in the light. Mirror rim lighting creates cinematic depth.

CHARACTER: [CHILD_NAME] LEFT HALF (clear of spine zone). Reflection RIGHT HALF (clear of spine zone). Both in flower girl dress. Wide eyes, sweet smile.

TEXT — bottom of spread:
BOTTOM-LEFT area:
  "When [CHILD_NAME] looked in the mirror, she almost didn't recognize the person looking back."
  Medium rounded. Dark navy.

BOTTOM-RIGHT area:
  "Today, she looked like someone with a very important job to do."
  Medium rounded. Dark navy.`,

      // PAGE 5 — VENUE ARRIVAL (Pages 8–9)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] arrives at the beautiful garden wedding venue.

RIGHT HALF — CHARACTER: [CHILD_NAME] full body, wide dreamy eyes, holding basket. Background: Fully rendered outdoor garden venue — grand floral arch richly decorated with cream roses and greenery, draping white fabric, string lights twinkling as bokeh, stone pathway. Cinematic warm late-afternoon golden light fills the scene.

LEFT HALF: Soft garden continuation at lower contrast and detail. Text area.

CHARACTER: Full body RIGHT HALF. Flower girl dress. Clear of spine zone. Does not cross center.

TEXT — render on LEFT HALF:
CENTER of left half:
  "The car wound through town, past fields and ribbons and signs pointing the way."

  "When they arrived, the whole place smelled like flowers and felt like magic already."
  Medium rounded. Dark navy. Centered. Space between paragraphs.`,

      // PAGE 6 — MEETING THE BRIDE (Pages 10–11)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] meets [SENDER_NAME], the glowing bride.

LEFT HALF — CHARACTER: Richly rendered outdoor wedding setting. The bride [SENDER_NAME] in detailed white gown and veil kneels warmly to [CHILD_NAME]'s level. Soft garden bokeh behind them — floral arch visible in background. Golden late-afternoon light creates rim lighting. [CHILD_NAME] holds her basket, looking up with shy happy expression. Bride's face is radiant but without distinct features.

RIGHT HALF: Soft garden bokeh continuation. Text area.

CHARACTER: Both [CHILD_NAME] and bride in LEFT HALF. Clear of spine zone. Does not cross center.

TEXT — render on RIGHT HALF:
CENTER of right half:
  "[SENDER_NAME] was already there, glowing in a way [CHILD_NAME] had never seen before."

  "'[CHILD_NAME]!' she said, kneeling down. 'You came. I was hoping you would.'"
  Medium rounded. Dark navy. Centered.`,

      // PAGE 7 — BRIDE'S WORDS (Pages 12–13)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. Emotional cinematic close-up. [SENDER_NAME] holds [CHILD_NAME]'s hands.

RIGHT HALF — CHARACTER: Cinematic close-up. [SENDER_NAME] (bride, white gown, seen from side — face softly turned without distinct features) gently holds [CHILD_NAME]'s hands. Warm soft bokeh behind them. Cinematic rim lighting on both. [CHILD_NAME] looks up with a soft emotional expression. Out-of-focus cream roses and warm light in background.

LEFT HALF: Warm cream bokeh continuation. Text area.

CHARACTER: [CHILD_NAME] upper body RIGHT HALF. Clear of spine zone. Does not cross center.

TEXT — render on LEFT HALF:
CENTER of left half:
  "[SENDER_NAME] could have chosen anyone for this. She thought about it for a long time."

  "And every time, she thought of [CHILD_NAME] — your laugh, your brave heart, the way you make a room feel warmer just by walking in."

  "That's not something you can practise. You either have it, or you don't."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 8 — THE BASKET (Pages 14–15)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. Cinematic close-up of [CHILD_NAME] holding the petal basket.

RIGHT HALF — CHARACTER: Cinematic product-quality close-up. [CHILD_NAME]'s small hands hold the richly textured woven basket overflowing with blush pink petals. Detailed weave texture, satin ribbon bow, soft ivory dress fabric with delicate floral embroidery visible. [CHILD_NAME]'s face peeking above the basket rim with a nervous excited smile. Warm close-up bokeh lighting.

LEFT HALF: Soft warm bokeh matching background. Text area.

CHARACTER: [CHILD_NAME] close-up RIGHT HALF. Holding basket. Clear of spine zone. Does not cross center.

TEXT — render on LEFT HALF:
CENTER of left half:
  "Someone placed a small basket of petals carefully into [CHILD_NAME]'s hands."

  "'You know what to do,' they whispered."

  "[CHILD_NAME] nodded, even though her tummy had gone all fluttery, like a hundred tiny wings."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 9 — BEFORE THE DOORS (Pages 16–17)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] stands before the grand ceremony doors.

LEFT HALF — CHARACTER: Fully rendered ornate ceremony entrance. Grand tall doors — detailed carved white ornate doors with golden hardware. Warm golden sconces on the walls. Marble or stone floor. Subtle rose decorations. [CHILD_NAME] stands small against these grand doors, holding her basket. Cinematic wide-angle perspective makes her look small but brave.

RIGHT HALF: Soft architectural continuation at lower detail. Text area.

CHARACTER: [CHILD_NAME] full body LEFT HALF, facing the doors. Small and brave. Clear of spine zone. Does not cross center.

TEXT — render on RIGHT HALF:
CENTER of right half:
  "Then came the waiting."
  "Behind the big doors, [CHILD_NAME] could hear the music start, soft and far away, like the whole world was holding its breath."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 10 — BRAVE BREATH (Pages 18–19)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. Cinematic close-up. [CHILD_NAME] takes a brave breath.

RIGHT HALF — CHARACTER: Cinematic close-up portrait of [CHILD_NAME]. Eyes gently closed. Rosy cheeks. Brave peaceful expression. Soft adult hand rests on her shoulder. Warm interior bokeh behind — soft golden ceremony hall light just out of focus. Cinematic rim lighting on her face and hair. Flower girl dress shoulder and chest visible. Basket hangs from one hand.

LEFT HALF: Warm golden bokeh. Text area.

CHARACTER: [CHILD_NAME] close-up portrait RIGHT HALF, eyes closed. Clear of spine zone. Does not cross center.

TEXT — render on LEFT HALF:
CENTER of left half:
  "'It's all right to feel that flutter,' someone whispered. 'Even the bravest people do.'"

  "[CHILD_NAME] took a deep breath. She could do brave things. She had practised."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 11 — DOORS OPEN (Pages 20–21)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. The ceremony doors burst open — dramatic golden cinematic light.

CENTER-RIGHT — CHARACTER: Grand ornate ceremony doors swing open dramatically. [CHILD_NAME] seen entirely from behind in the doorway — small against the grand doors. Back of flower girl dress, blush bow/sash, natural hair, basket. Backlit by spectacular golden ceremony hall light. The wedding aisle stretches beyond — rows of guests in warm soft focus, rich floral arrangements, draped white fabric, golden light beams.

LEFT HALF: Architectural interior with warm golden tones at lower detail. Text area.

CHARACTER: [CHILD_NAME] from BEHIND, positioned right of center, clear of spine zone. Does not extend into left half.

TEXT — render on LEFT HALF:
CENTER of left half:
  "Then the doors opened. Light flooded in."
  "And there was the aisle, stretching out long and golden, with every single face turned to see [CHILD_NAME]."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 12 — WALKING DOWN THE AISLE (Pages 22–23)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] walks down the wedding aisle scattering petals — cinematic.

LEFT HALF — CHARACTER: [CHILD_NAME] walking mid-stride, joyful and brave. Scattering blush petals from her basket. Dress and sash swaying dynamically. Expression: joyful, proud, brave. Background: Fully rendered cinematic wedding ceremony hall — detailed floral arrangements, smiling guests in warm soft focus on both sides, white aisle runner, stone floor, elegant arch ahead. Warm ceremonial lighting.

RIGHT HALF: Soft ceremony hall continuation at lower detail. Text area.

CHARACTER: Full body LEFT HALF, mid-stride, scattering petals. Clear of spine zone. Does not cross center.

TEXT — render on RIGHT HALF:
CENTER of right half:
  "So [CHILD_NAME] walked."
  "Petals drifted down with every step, soft and pink against the stone path."
  "And though her heart went pitter-pat, her feet knew exactly where to go."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 13 — END OF AISLE (Pages 24–25)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] proudly reaches the end of the aisle.

RIGHT HALF — CHARACTER: [CHILD_NAME] stands proudly. Blush petals scattered at her feet and trailing behind her. The bride's white gown (lower portion only — head not in frame) stands nearby. Background: Fully rendered ceremony altar area — grand richly decorated floral arch, golden ceremonial light, blurred smiling wedding party. Cinematic warm light.

LEFT HALF: Soft venue continuation. Text area.

CHARACTER: [CHILD_NAME] full body RIGHT HALF, proud happy expression. Clear of spine zone. Does not cross center.

TEXT — render on LEFT HALF:
CENTER of left half:
  "Everyone smiled as [CHILD_NAME] reached the end of the aisle."
  "The petals were scattered behind her like a little trail of sunshine and roses."
  "And there, waiting with the softest smile, was [SENDER_NAME]."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 14 — DANCING AT RECEPTION (Pages 26–27)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] dances and twirls at the wedding reception — cinematic.

LEFT HALF — CHARACTER: [CHILD_NAME] twirling joyfully, dress swirling in motion. Pure joy on her face. Background: Fully rendered wedding reception hall — glowing string lights, beautiful floral centerpieces in soft bokeh, dancing guest silhouettes blurred in the background, elegant tablecloths, warm amber reception light. Cinematic celebratory atmosphere.

RIGHT HALF: Soft reception continuation. Text area.

CHARACTER: Full body LEFT HALF, twirling pose. Dress swirling. Joyful expression. Clear of spine zone. Does not cross center.

TEXT — render on RIGHT HALF:
CENTER of right half:
  "Later, when the music played and everyone began to dance, [CHILD_NAME] felt light as a ribbon in the wind."
  "She had done her special job."
  "And all around her, the whole day seemed to sparkle."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 15 — BEDTIME (Pages 28–29)
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape. [CHILD_NAME] in bed at night, happy-tired, remembering the beautiful day.

RIGHT HALF — CHARACTER: [CHILD_NAME] tucked in bed wearing SOFT CHILDREN'S PAJAMAS — NOT the flower girl dress. Happy-tired expression. Background: Fully rendered cozy nighttime bedroom — detailed soft floral bedding, moonlight through curtains creating silver-blue light, warm lamp glow creating golden contrast, flower girl dress hanging on a hook visible, petal basket on nightstand. Beautiful cinematic dual lighting.

LEFT HALF: Soft bedroom continuation. Text area.

CHARACTER: [CHILD_NAME] in bed RIGHT HALF, in pajamas. Happy-tired expression. Clear of spine zone. Does not cross center.

TEXT — render on LEFT HALF:
CENTER of left half:
  "That night, after the music had stopped and the cake had been cut and the dancing had worn everyone out, [CHILD_NAME] lay in bed thinking about the whole beautiful day."
  Medium rounded. Dark navy. Centered.`,

      // PAGE 16 — FINAL THANK YOU
      `${GLOBAL_STYLE_FLOWER_GIRL_V2}
SCENE: 2:1 landscape.

LEFT HALF — DECORATIVE SCENE: Richly rendered decorative close-up. A beautifully crafted wicker basket with natural weave texture, overflowing with plump blush pink rose petals. A lustrous blush satin bow adorns the basket with soft reflective sheen. Individual rose petals scattered artfully on a cream marble surface. Cinematic product-quality lighting with soft bokeh. Rich texture detail throughout.

RIGHT HALF: Clean plain soft cream or ivory. No objects, no scenery, no characters.

NO CHARACTER anywhere — no people, no flower girl, no children.

TEXT — render on LEFT HALF, upper area above the basket:
  "Thank you for saying yes, [CHILD_NAME]."
  "With love, [SENDER_NAME]"
  Medium rounded. Dark navy. Warm storybook style.`,
    ],
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

export const REVIEWS = [
  {
    name: 'Maria S.',
    location: 'Toronto, ON · Canada',
    rating: 5,
    text: "We ordered this for our daughter's baptism and everyone cried happy tears. Seeing her face on every page was absolutely magical. Worth every penny!",
    book: "God's Promises For You",
    avatar: 'M',
  },
  {
    name: 'James R.',
    location: 'Vancouver, BC · Canada',
    rating: 5,
    text: "Jared absolutely loves seeing himself in the book. He asks us to read it every single night. The quality is stunning — looks just like a real published book.",
    book: "God's Promises For You",
    avatar: 'J',
  },
  {
    name: 'Ana D.',
    location: 'Austin, TX · USA',
    rating: 5,
    text: "I gave this as a birthday gift and the mom cried when she opened it. The illustrations are Pixar-level quality. Already ordering another one for Christmas!",
    book: 'Before You Were Born',
    avatar: 'A',
  },
  {
    name: 'Grace T.',
    location: 'Calgary, AB · Canada',
    rating: 5,
    text: "The dedication page made my heart melt. Such a thoughtful, beautiful keepsake. My nephew carries it everywhere and shows everyone 'that's me in the book!'",
    book: 'You Are Brave',
    avatar: 'G',
  },
]