// ─── Listing image standard (10-slot template) ────────────────────────────────
//
// Every NEW book added to the site must supply a `listingImages` object with
// all 10 of the following named slots, in this fixed order. The product-page
// gallery renders them in slot order (1 → 10).
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

  // ─── Before the Music Plays — Version 1 and Version 2 removed from site ─────
  // Slug: before-the-music-plays-1 and before-the-music-plays-2
  // Entries deleted 2026-07-04. Keep only 'before-the-music-plays' below.

  // ─── Before the Music Plays — compositing pipeline ───────────────────────
  // No pagePrompts — route.tsx detects this slug and uses the new compositing
  // pipeline (src/lib/books/before-the-music-plays.ts + src/lib/compositeText.ts)
  // instead of sending full-page prompts to Gemini.
  {
    slug: 'before-the-music-plays',
    title: 'Before the Music Plays',
    subtitle: 'A flower girl story — personalized with her face',
    price: 23.98,
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
    characterPrompt: FLOWER_GIRL_CHARACTER_PROMPT,
    characterConsistencyNote: FLOWER_GIRL_CONSISTENCY_NOTE,
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
    book: 'Before the Music Plays',
    avatar: 'A',
  },
  {
    name: 'Grace T.',
    location: 'Calgary, AB · Canada',
    rating: 5,
    text: "The dedication page made my heart melt. Such a thoughtful, beautiful keepsake. My nephew carries it everywhere and shows everyone 'that's me in the book!'",
    book: "God's Promises For You",
    avatar: 'G',
  },
]
