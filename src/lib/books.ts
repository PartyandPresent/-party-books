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
SCENE: 2:1 landscape. Warm cream-ivory background across the entire spread. Soft 3D rendered flower shapes, soft 3D curved rose petals, 3D sparkle stars, and tiny 3D heart shapes float gently throughout both halves at varying scales.

LEFT HALF: Clean open warm cream-ivory. CRITICAL — KEEP LEFT CENTER COMPLETELY CLEAR for logo placement. No character, no large elements blocking left center. Floating 3D petals and tiny 3D flowers fine at the very edges.

RIGHT HALF: Warm cream background with character and floating 3D decorative elements.

CHARACTER: Full body, head to toe. Standing RIGHT HALF, right of center, clear of spine zone. Gentle 3/4 pose toward viewer. Sweet innocent smile. Holding woven petal basket. Ivory flower girl dress with blush sash and blush headband. Does not cross center.

TEXT — render EXACTLY as shown below, RIGHT HALF only:

UPPER-RIGHT, above the character — LARGE bold playful decorative rounded font — VIVID HOT PINK with BOLD WHITE OUTLINE:
  Before the
  Music Plays

JUST BELOW that — MEDIUM rounded font — SOFT LAVENDER-BLUE with thin WHITE OUTLINE:
  A Story for [CHILD_NAME]

LOWER-RIGHT, below the character — MEDIUM rounded font — CORAL-PINK with thin WHITE OUTLINE:
  On the Day She Was Chosen

BOTTOM-RIGHT, very small — SMALL font — SOFT CORAL-PINK:
  by : party&presents`,

      // PAGE 1 — DEDICATION
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape. Strict left-right split.

LEFT HALF: Completely plain white. Clean and empty like a blank page. No texture, no scenery, no objects, no decorative elements in this half.

RIGHT HALF: Warm soft cream-ivory background. A gently curling ivory or white satin ribbon winds gracefully across the lower-center area. Small soft 3D miniature flower blooms rest around the ribbon — tiny 3D rounded blue, yellow, and pink flower shapes with real petal depth and soft shadows. Soft 3D curved rose petals scattered. Small 3D sparkle shapes near edges. Warm gentle light.

NO CHARACTER anywhere on this spread.

TEXT — render on RIGHT HALF only, in the upper portion above the ribbon — BOLD ROUNDED VERY DARK NAVY font, centered in right half, no outline:
  For [CHILD_NAME], who said yes.
  And for the day that needed
  exactly the right person
  to make it complete.`,

      // PAGE 2 — WAKING UP (Pages 2–3 in reference)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — RIGHT HALF: [CHILD_NAME] sits up happily in bed wearing soft children's pajamas or sleeping outfit — NOT the flower girl dress. She has just woken up. Expression: excited, cozy, full of wonder — hands raised near her face or cheeks with joy, mouth open in delight. Sitting up against soft pillows and floral bedding.

BACKGROUND behind the character: plain pale peach background with a softly faded bedroom scene — a soft bed shape, fluffy pillows, a small window glowing with warm golden morning sunlight, and a few soft flower shapes near the window. Everything extremely blurred like soft bokeh photography. Floating small soft 3D flower shapes (NOT flat 2D) and soft 3D curved petals drift gently around [CHILD_NAME].

LEFT HALF: Plain pale peach. No scenery.

CHARACTER: Sitting up in bed, RIGHT HALF, in pajamas only. Clear of spine zone. Does not cross center.

TEXT — render on LEFT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  On the morning of the day everyone
  had been waiting for, [CHILD_NAME] woke up to
  a house full of flowers and a feeling
  that something wonderful was about
  to happen.`,

      // PAGE 3 — GETTING DRESSED (Pages 4–5)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — LEFT HALF: [CHILD_NAME] stands in her ivory or cream flower girl dress with soft tulle, flutter sleeves, and blush sash. An adult helper — a warm woman wearing an elegant rose-colored dress, with gentle visible features and a styled updo — stands close beside or behind her, tenderly adjusting the blush sash or soft tulle. [CHILD_NAME] looks shy, happy, and amazed. A small woven petal basket with a blush bow sits on the floor beside them.

BACKGROUND behind them: plain soft blush-pink background with a softly faded dressing-room scene — a faint mannequin/dress form silhouette, soft curtain shapes, a blurred elegant tufted chair, delicate wedding flowers in the far distance. Everything soft and secondary. Floating soft 3D flower shapes and soft 3D blush petals at the edges.

RIGHT HALF: Plain soft blush-pink-cream. No scenery.

CHARACTER: Full body LEFT HALF. Clear of spine zone. Does not cross center.

TEXT — render on RIGHT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  There was a special dress
  laid out — just for today.

  She tried it on slowly,
  like it might be magic.`,

      // PAGE 4 — MIRROR (Pages 6–7)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape. [CHILD_NAME] looks at herself in a large ornate mirror and sees her flower girl reflection.

FULL SPREAD COMPOSITION: [CHILD_NAME] stands in the LEFT PORTION of the spread holding her basket, in front of a large ornate white decorative mirror standing in the RIGHT PORTION. Her reflection in the mirror must match her exactly — same ivory dress, same blush sash, same hair, same basket — mirrored pose.

BACKGROUND: plain lavender-cream (soft purple-white tone) throughout. Behind [CHILD_NAME]: very softly faded bedroom elements, almost transparent. Ornate white mirror frame with decorative molding. Floating soft 3D flower shapes, 3D sparkle stars, and 3D blush petals around both [CHILD_NAME] and the mirror.

CHARACTER: [CHILD_NAME] LEFT HALF (clear of spine). Mirror reflection RIGHT HALF (clear of spine). Both in flower girl dress. Wide eyes, sweet amazed smile.

TEXT — render at BOTTOM of spread — BOLD ROUNDED VERY DARK NAVY font, no outline:
BOTTOM-LEFT area, centered there:
  When [CHILD_NAME] looked in the mirror,
  she almost didn't recognize
  the person looking back.

BOTTOM-RIGHT area, centered there:
  Today, she looked like someone
  with a very important job to do.`,

      // PAGE 5 — VENUE ARRIVAL (Pages 8–9)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — RIGHT HALF: [CHILD_NAME] in her ivory flower girl dress and blush sash, holding her small woven petal basket, standing with calm dreamy wide eyes as she takes in the beautiful wedding venue for the first time. Expression: calm, dreamy, and gently excited. She may be looking slightly to one side as if seeing the venue. Full body visible.

BACKGROUND behind her: plain pale sage green background with a softly faded garden wedding scene — a visible soft floral arch with pale cream roses and greenery in the upper background, pale ribbons draping softly, blurry lush greenery, soft string lights as warm bokeh points, cream flowers in the distance. Scene is soft and painterly but VISIBLE. Floating small soft 3D daisy flower shapes in white and coral, and soft 3D blush petals, drift around [CHILD_NAME].

LEFT HALF: Plain pale sage-cream. No scenery.

CHARACTER: Full body RIGHT HALF. Holding basket. Clear of spine zone.

TEXT — render on LEFT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  The car wound through town, past
  fields and ribbons and signs
  pointing the way.

  When they arrived, the whole place
  smelled like flowers and felt
  like magic already.`,

      // PAGE 6 — MEETING THE BRIDE (Pages 10–11)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — LEFT HALF: [CHILD_NAME] and the bride together. The bride ([SENDER_NAME]) wears an elegant white bridal gown with a long flowing veil. She kneels or bends warmly down to [CHILD_NAME]'s level, perhaps with one arm gently around [CHILD_NAME] or pulling her close in a soft embrace. The bride's face has no distinct features — softly glowing radiant presence, face angled away or blurred. [CHILD_NAME] holds her petal basket and looks up at the bride with a shy, happy, and importantly chosen expression.

BACKGROUND behind them: plain warm ivory background with softly faded wedding garden — soft floral shapes, a faint arch outline, gentle cream fabric, warm golden light. Very blurred and pastel. Floating soft 3D blush flower shapes and soft 3D petals around the two figures.

RIGHT HALF: Plain soft warm ivory-cream. No scenery.

CHARACTER: Both [CHILD_NAME] and bride LEFT HALF. Clear of spine zone.

TEXT — render on RIGHT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  [SENDER_NAME] was already there,
  glowing in a way [CHILD_NAME]
  had never seen before.

  "[CHILD_NAME]!" she said, kneeling down.
  "You came. I was hoping you would."`,

      // PAGE 7 — BRIDE'S WORDS (Pages 12–13)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape. Close-up emotional scene — [SENDER_NAME] holds [CHILD_NAME]'s hands.

COMPOSITION: The bride ([SENDER_NAME], in white bridal gown) is seen from her side/back on the LEFT side of the spread — her face turned away with no distinct features, her veil visible. She extends both hands toward [CHILD_NAME], gently holding [CHILD_NAME]'s hands. [CHILD_NAME] stands on the RIGHT portion of the spread, close-up, looking up at the bride with a soft emotional smile, feeling loved and chosen. Their hands meet near the center of the image. Upper bodies and faces of both are visible.

BACKGROUND: plain creamy champagne background. Minimal faded soft floral shapes. Gentle golden glow. Soft 3D blush flower shapes and soft 3D pale petals scattered. A few soft 3D sparkle shapes. Simple — the emotional moment is the focus.

CHARACTER: [CHILD_NAME] RIGHT HALF, looking up. Bride LEFT HALF, facing away. Hands near center. Clear of spine zone.

TEXT — render on LEFT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  [SENDER_NAME] could have chosen
  anyone for this. She thought
  about it for a long time.

  And every time, she thought of
  [CHILD_NAME] — your laugh, your brave
  heart, the way you make a room
  feel warmer just by walking in.

  That's not something you can practise.
  You either have it, or you don't.`,

      // PAGE 8 — THE BASKET (Pages 14–15)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape. An extreme close-up focused on [CHILD_NAME]'s little hands holding the petal basket.

CHARACTER AND BACKGROUND — RIGHT HALF: Very close-up view. The woven petal basket is LARGE in the frame, filling most of the right side. [CHILD_NAME]'s small hands grip the basket. The basket overflows with soft blush pink rose petals. The woven texture, ribbon details, and [CHILD_NAME]'s ivory dress fabric are clearly visible. [CHILD_NAME]'s face peeks above the basket rim with only her eyes, forehead, and the top of her head visible — wide-eyed and nervous but excited expression, looking upward over the basket.

BACKGROUND: plain blush-peach / salmon-pink background. Very soft blurred shapes of dresses and fabric in the far distance — very low contrast. Floating soft 3D curved petals and soft 3D flower shapes throughout.

LEFT HALF: Plain blush-peach-cream. No scenery.

CHARACTER: [CHILD_NAME] close-up RIGHT HALF — large basket dominant in foreground, face peeking over rim. Clear of spine zone.

TEXT — render on LEFT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  Someone placed a small basket
  of petals carefully into
  [CHILD_NAME]'s hands.

  "You know what to do,"
  they whispered.

  [CHILD_NAME] nodded, even though
  her tummy had gone all fluttery,
  like a hundred tiny wings.`,

      // PAGE 9 — BEFORE THE DOORS (Pages 16–17)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — LEFT HALF: [CHILD_NAME] stands quietly in front of large, tall, closed ceremony doors. She holds her petal basket with both hands, close to her body. Her small figure against the grand doors makes her look small but brave and determined. Expression: nervous but brave and ready — a little pouty-brave face.

BACKGROUND behind her: plain pale champagne background with large ceremony doors taking up the background — warm brown wood with ornate carved panel details, softly rendered. Warm golden light glows softly from beneath the door gap, as if ceremony light seeps through. Soft 3D flower shapes, 3D petals, and subtle 3D sparkle shapes around her. Doors soft and dreamlike.

RIGHT HALF: Plain pale champagne-cream. No scenery.

CHARACTER: [CHILD_NAME] full body LEFT HALF, facing the doors. Flower girl dress. Small brave figure. Clear of spine zone.

TEXT — render on RIGHT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  Then came the waiting.

  Behind the big doors,
  [CHILD_NAME] could hear the music start,
  soft and far away, like the whole
  world was holding its breath.`,

      // PAGE 10 — BRAVE BREATH (Pages 18–19)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape. A tender close-up — [CHILD_NAME] takes a brave breath.

CHARACTER AND BACKGROUND — LEFT HALF: Close-up portrait of [CHILD_NAME]. Her eyes are gently closed. Cheeks softly rosy. Expression: nervous but brave, gathering quiet courage. A warm reassuring adult hand rests softly on her shoulder or back — only the hand and part of the arm visible. [CHILD_NAME]'s flower girl dress is visible at her shoulders and chest. The basket hangs from one hand below frame or is partially visible.

BACKGROUND: plain soft cream. Only tiny floating soft 3D petals, small soft 3D flower shapes, and a few soft 3D sparkle shapes. No full scene — simple, calm, emotionally focused.

RIGHT HALF: Plain soft cream. No scenery.

CHARACTER: [CHILD_NAME] close-up portrait LEFT HALF, eyes gently closed. Clear of spine zone.

TEXT — render on RIGHT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  "It's all right to feel that flutter,"
  someone whispered.
  "Even the bravest people do."

  [CHILD_NAME] took a deep breath.
  She could do brave things.
  She had practised.`,

      // PAGE 11 — DOORS OPEN (Pages 20–21)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape. The ceremony doors burst open — warm golden light floods in.

CHARACTER AND BACKGROUND — CENTER-RIGHT: Large ornate ceremony doors swing wide open, one panel to the left side of the right half and one panel to the right edge — creating a warm golden doorway frame. The doors are warm brown wood with beautiful ornate carved panel details. [CHILD_NAME] stands centered in the open doorway, seen entirely from BEHIND — back of her ivory flower girl dress clearly visible, blush sash bow at her back, natural hair, small basket in hand. She is backlit by spectacular warm golden ceremony light from beyond. Through the open doorway: a softly faded wedding aisle stretches ahead — dreamy blurred rows of guests on both sides, cream flowers, flowing white fabric draping, warm golden light filling the space. Keep the aisle vision dreamy and low contrast.

BACKGROUND: plain warm golden-cream throughout. Soft 3D petals and 3D sparkle shapes drift in the golden doorway light.

LEFT HALF: Plain warm golden-cream. No scenery.

CHARACTER: [CHILD_NAME] from BEHIND, standing centered in the open doorway, positioned center-right. Clear of spine zone. Not extending into left half.

TEXT — render on LEFT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  Then the doors opened.
  Light flooded in.
  And there was the aisle,
  stretching out long and golden,
  with every single face turned
  to see [CHILD_NAME].`,

      // PAGE 12 — WALKING DOWN THE AISLE (Pages 22–23)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — LEFT HALF: [CHILD_NAME] walking joyfully mid-stride down the aisle. She has ONE ARM RAISED HIGH in the air — hand up with pure joy and excitement, as if waving or celebrating freely. Her other arm holds the basket at her side. Blush pink petals drift through the air around her. Expression: big open joyful smile, proud and brave and thrilled. Her ivory flower girl dress and blush sash sway as she walks. Full body visible from head to toe.

BACKGROUND behind her: plain ivory-pink / soft blush background with a softly faded aisle scene — gentle rows of blurred chairs, blurred warm cheering guests far back, soft cream flowers and sage greenery, pale aisle runner. Dreamy memory-like quality. Floating soft 3D petals around [CHILD_NAME].

RIGHT HALF: Plain soft ivory-cream. No scenery.

CHARACTER: Full body LEFT HALF, mid-stride, ONE ARM RAISED HIGH. Clear of spine zone.

TEXT — render on RIGHT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  So [CHILD_NAME] walked.
  Petals drifted down with every step,
  soft and pink against the stone path.
  And though her heart went pitter-pat,
  her feet knew exactly where to go.`,

      // PAGE 13 — END OF AISLE (Pages 24–25)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — RIGHT HALF: [CHILD_NAME] stands proudly at the end of the aisle, looking up with a proud, gentle, happy expression. A trail of scattered blush petals lies behind her on the ground. The bride [SENDER_NAME] stands on the FAR RIGHT of the image — only her lower white bridal gown and one hand or arm visible, with her head completely NOT in the frame. [CHILD_NAME] holds her now-lighter basket and looks up toward where the bride's face would be.

BACKGROUND: plain champagne background with a softly faded floral arch above and behind them. Cream flowers, blush petal accents, soft pale gold glow. Soft 3D flower shapes near edges. Soft 3D blush petals on the ground.

LEFT HALF: Plain champagne-cream. No scenery.

CHARACTER: [CHILD_NAME] full body RIGHT HALF, proud and happy. Bride's lower gown far right only. Clear of spine zone.

TEXT — render on LEFT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  Everyone smiled as [CHILD_NAME]
  reached the end of the aisle.
  The petals were scattered behind her
  like a little trail of sunshine and roses.
  And there, waiting with the softest smile,
  was [SENDER_NAME].`,

      // PAGE 14 — DANCING AT RECEPTION (Pages 26–27)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — LEFT HALF: [CHILD_NAME] dances and twirls with pure joy at the wedding reception. Her ivory flower girl dress and blush sash swirl and fly outward as she spins. Her natural hair moves softly with the motion. Expression: pure blissful joy — big laughing smile, eyes closed or sparkling, completely free and happy.

BACKGROUND behind her: plain soft peach-lavender background (warm pink-purple pastel tone) with a softly faded reception scene — glowing string lights as warm bokeh points, blurred flowers, faint table shapes far away, gentle guest silhouettes in the distance. Floating soft 3D flower shapes, soft 3D petals, soft 3D sparkles, and tiny soft 3D heart shapes scattered around [CHILD_NAME] — this page has the most decorative elements.

RIGHT HALF: Plain matching peach-lavender-cream. No scenery.

CHARACTER: Full body LEFT HALF, twirling pose. Dress flying outward. Joyful. Clear of spine zone.

TEXT — render on RIGHT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  Later, when the music played and
  everyone began to dance,
  [CHILD_NAME] felt light as a ribbon
  in the wind.
  She had done her special job.
  And all around her, the whole day
  seemed to sparkle.`,

      // PAGE 15 — BEDTIME (Pages 28–29)
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape.

CHARACTER AND BACKGROUND — RIGHT HALF: [CHILD_NAME] is tucked snugly in bed at night. OUTFIT: soft children's pajamas or cozy nightgown — NOT the flower girl dress. Happy-tired dreamy expression — a small content smile as she thinks about the beautiful day.

BACKGROUND behind the character: plain soft blue-gray background with a softly faded nighttime bedroom — a pale moonlit window with silver-blue light, soft pillow and blanket shapes, warm bedside lamp glow. CRITICAL DETAIL: the flower girl dress hangs visibly on a hanger on the LEFT SIDE of the background — this must be visible. The petal basket rests on the nightstand with a few petals. Everything faded and dreamy. Floating soft 3D flower shapes and soft 3D star shapes around the spread.

LEFT HALF: Plain soft blue-gray-cream. No scenery.

CHARACTER: [CHILD_NAME] in bed RIGHT HALF, in pajamas only. Happy-tired. Dress hanging in background on left side. Clear of spine zone.

TEXT — render on LEFT HALF, vertically centered — BOLD ROUNDED VERY DARK NAVY font, no outline, centered:
  That night, after the music had stopped
  and the cake had been cut
  and the dancing had worn everyone out,
  [CHILD_NAME] lay in bed thinking about
  the whole beautiful day.`,

      // PAGE 16 — FINAL THANK YOU
      `${GLOBAL_STYLE_FLOWER_GIRL_V1}
SCENE: 2:1 landscape. Strict left-right split.

LEFT HALF — DECORATIVE SCENE: A beautiful large woven wicker basket centered in this half, generously filled with soft blush pink rose petals, adorned with a blush satin ribbon bow tied at the front. Soft 3D blush petals scattered gracefully around the basket on a clean warm cream surface. Small soft 3D flower shapes and decorative dot shapes around the scene. Gentle warm soft top-down lighting. The basket is the hero of this half.

RIGHT HALF: Plain clean white or very soft ivory. Completely empty.

NO CHARACTER anywhere on this page.

TEXT — render on LEFT HALF only, UPPER PORTION above the basket — BOLD ROUNDED VERY DARK NAVY font, centered:
  Thank you for saying yes, [CHILD_NAME].
  With love, [SENDER_NAME]`,
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