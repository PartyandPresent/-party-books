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
}

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find(b => b.slug === slug)
}

const GLOBAL_STYLE = `
GLOBAL RULES — apply to every page without exception:

ART STYLE: Pixar/Disney 3D animated feature film quality. Warm cinematic lighting. Soft volumetric light rays. Full bleed 2:1 landscape ratio. No borders. No watermarks.

CHARACTER: Keep exact same child — same face, hair, skin tone, beige knit cardigan sweater with buttons, cream pants. Full body visible head to toe unless sleeping/kneeling scene.

TITLE TEXT STYLE: Bold thick rounded ALL-CAPS sans-serif. Fill: vivid red-orange #E8420A. White stroke outline 4–5px. Clean crisp rendering. DO NOT write font name in the image.

VERSE TEXT STYLE: Handwritten/cursive style. Mixed case. Fill: white #FFFFFF with soft drop shadow on dark backgrounds. Fill: dark navy #1A2744 on light backgrounds. DO NOT write font name in the image. Just render the verse text in a handwritten cursive style.

IMPORTANT: Never render font names in the image. Only render the actual text content.

CENTER SAFE ZONE: The center 15% of the image (x:42%–58%) is the book spine/binding area.
- NO character body or face in the center zone.
- NO important animals, props, or text in the center zone.
- Background scenery only may pass through the center naturally.
- Place character clearly on LEFT (x:8%–40%) or RIGHT (x:60%–90%) only.
`

export const BOOKS: Book[] = [
  {
    slug: 'gods-promises-for-you',
    title: "God's Promises For You",
    subtitle: '17 pages of scripture made beautifully personal',
    price: 23.98,
    coverImage: 'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Cover_-_Page_0_gssekg.png',
    previewImages: [
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427840/Dedication_Page_-_Page_1_bujjhe.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_3_u2rqpp.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_4_oxlsdp.png',
      'https://res.cloudinary.com/dhf1caifd/image/upload/v1779427841/Page_5_gy532g.png',
    ],
    totalPages: 17,
    tags: ['faith', 'bestseller'],
    recipient: ['baby', 'toddler', 'child'],
    occasion: ['baptism', 'birthday', 'christmas', 'easter', 'any'],
    description: "A one-of-a-kind personalized storybook where your child is the main character — with their face, name, and God's promises woven into every single page. 17 beautifully illustrated scenes, each featuring a scripture verse and your child's likeness rendered in stunning Pixar-quality art.",
    shortDesc: "Your child's face meets God's promises — 17 stunning pages of faith and love.",
    badge: 'Bestseller',
    badgeColor: '#FF559C',
    rating: 4.9,
    reviews: 248,
    featured: true,
    pagePrompts: [

      // PAGE 0 — COVER
      `${GLOBAL_STYLE}
SCENE: Wide 2:1 landscape. Lush spring meadow at golden-pink sunset. Pink cherry blossom trees scattered across the midground. Dense colorful wildflowers — heart-shaped pink tulips, white daisies, purple lavender — carpet the foreground. Soft rolling green hills in the background. Multiple white doves and colorful butterflies (monarch orange, purple, blue) fly gracefully through warm glowing air. A soft pastel rainbow arcs across the upper-right sky. Warm golden cinematic lighting, soft lens warmth.

CHARACTER: Place the child character standing in the RIGHT-CENTER of the image (x:60%–80%, y:25%–88%). Full body visible head to toe. Looking upward with wide joyful open-mouth smile. Height approximately 60% of image height. Feet resting naturally in the flower field. Character strictly in right half only.

TEXT PLACEMENT — render exactly:
- UPPER-RIGHT AREA — text follows the rainbow arc curve:
  Render text: "GOD'S PROMISES FOR"
  Bold thick rounded ALL-CAPS. Fill: bright orange-yellow #F4900C. White stroke 5px.
  Size: large approximately 40px. Text curves upward following the rainbow arc shape.
  Position: upper-right quadrant following rainbow.

- BELOW THE ARC right side:
  Render text: "[CHILD_NAME]"
  Extra bold rounded ALL-CAPS. Fill: vivid red #E8420A. White stroke 7px.
  Size: very large approximately 50px — noticeably bigger than title line.
  Position: centered below the arc text on right side.

- LEFT SIDE CENTER (x:18%–38%, y:42%–56%):
  The second image provided is the party & presents logo. Place this EXACT logo in white on the left side of the cover. Render it faithfully — the PP icon mark with gift box ribbon design, and "party & presents" text beside it. All in white color. Size approximately 90px wide.

- BOTTOM-RIGHT corner:
  Render text: "by : party&presents"
  Small italic white text. Size approximately 14px.

STYLE: Pixar/Disney 3D animated feature film. 2:1 landscape. Full bleed. No borders.`,

      // PAGE 1 — DEDICATION
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape.
RIGHT HALF (50%–100% of width): Warm cozy animated nursery interior. Cream upper walls, sage-green lower wainscoting. Small wooden bookshelf with colorful board books. Plush white lamb stuffed toy on carpet floor. Neatly folded light-blue fleece blanket. Small wooden stool with glowing yellow smiley-face star nightlight. Tiny framed watercolor rainbow painting on wall. Hanging dove and star mobile. Tiny gold sparkle dust particles floating. Soft warm morning window light from off-frame right.
LEFT HALF (0%–50% of width): Completely clean pure white — NO scene elements, no textures, no gradients, nothing here at all. Pure white only.

CHARACTER: Place the child character seated on the carpeted nursery floor in the RIGHT HALF only (x:60%–85%, y:35%–90%). Sitting naturally with legs loosely in front. Looking upward-left toward the text with a wide happy smile. Height approximately 55% of image height. Character stays fully within right half.

TEXT PLACEMENT — render on LEFT WHITE HALF only (x:2%–46%):
- UPPER AREA of left half (x:4%–44%, y:8%–25%):
  Render text: "This book belongs to [CHILD_NAME]."
  Rounded handwritten style. Mixed case. NOT all caps.
  Fill: dark navy #2D3748. No stroke. Soft shadow only. Size approximately 26px. Bold weight.

- BELOW with breathing space (x:4%–44%, y:30%–55%):
  Render text: "[DEDICATION]"
  Same rounded handwritten style. Size approximately 20px.
  Fill: dark navy #2D3748. Multi-line. Comfortable line height.

CRITICAL: ALL text strictly inside left white half. CHARACTER strictly inside right nursery half.
STYLE: Pixar/Disney 3D. 2:1 landscape. Full bleed.`,

      // PAGE 2 — GOD WILL ALWAYS BE WITH YOU
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Magical enchanted forest at golden hour. Winding dirt path curves from foreground-center toward background-right. Ancient towering trees with massive gnarled trunks flank both sides. Thick canopy above with amber-green leaves. Warm golden-orange god-rays of sunlight pierce through the canopy illuminating the path. Colorful wildflowers lining the path edges — white daisies, blue bell flowers, purple lupines, golden yellow blooms. Colorful butterflies flutter in the light shafts. Small bluebird perched on a high branch at upper-left. Two small fluffy brown rabbits on sides of the path. Glowing firefly-like light particles near the ground.

CHARACTER: Place the child character walking forward along the path in RIGHT-CENTER area (x:60%–80%, y:25%–88%). Full body visible. Mid-stride natural walking pose — left foot forward. Looking forward with curious brave expression. Height approximately 62% of image height. Feet on the dirt path.

TEXT PLACEMENT — render exactly:
- TOP-RIGHT QUADRANT (x:55%–95%, y:5%–25%):
  Render text: "GOD WILL ALWAYS BE WITH YOU, [CHILD_NAME]."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 30px. 2 lines. Left-aligned within that area.
  Text does NOT overlap the character.

- LOWER-LEFT AREA (x:2%–42%, y:45%–78%):
  Over the darker forest floor area.
  Render text in handwritten cursive style: "Haven't I commanded you? Be strong and courageous. Don't be afraid. Don't be dismayed, for Yahweh your God is with you wherever you go."
  New line: "Joshua 1:9"
  Fill: white #FFFFFF. Soft dark drop shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Magical golden-hour forest. 2:1 landscape. Full bleed.`,

      // PAGE 3 — GOD MADE YOU SPECIAL
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Bright cheerful open meadow at midday. Pastel blue-pink sky with fluffy cotton-candy clouds. Soft pastel rainbow arcs across upper-right sky. Rolling soft green hills in far background. Lush colorful wildflowers — vibrant red poppies, white daisies, purple bell flowers, orange blooms. Leafy green tree branch from upper-right corner with two small adorable bluebirds. Multiple colorful butterflies throughout. Small cute woodland animals around the child — two-three fluffy brown rabbits looking up adoringly. One baby fawn near center-right. One rabbit near character's feet.

CHARACTER: Place the child character standing upright in LEFT-CENTER area (x:15%–40%, y:18%–88%). Full body visible. Huge delighted open-mouth smile, sparkling happy eyes. Arms relaxed naturally at sides. Height approximately 68% of image height. Animals gathered around naturally.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA (x:2%–48%, y:3%–22%):
  Render text: "GOD MADE YOU SPECIAL, BEAUTIFUL, AND WONDERFULLY YOU, [CHILD_NAME]."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 23px. 3 lines. Left-aligned.
  Text above and left of character — does not overlap.

- RIGHT SIDE MID-HEIGHT (x:52%–96%, y:38%–70%):
  Render text in handwritten cursive style: "I will give thanks to you, for I am fearfully and wonderfully made. Your works are wonderful. My soul knows that very well."
  New line: "Psalm 139:14"
  Fill: dark navy #1A2744. Soft shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Bright sunny meadow. 2:1 landscape. Full bleed.`,

      // PAGE 4 — GOD'S LOVE FOR YOU WILL NEVER END
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Magical glowing ancient enormous tree at warm golden dusk. A massive ancient tree with enormous gnarled trunk dominates the center-background. Thick spreading roots, wide canopy glowing with warm golden-amber light from within. Light particles and fireflies float throughout. Pink cherry blossom-like flowers on branches. Open glowing books float magically in upper branches. Pink and yellow flowers carpet the ground around the tree base. Small birds perched at lower branches. Warm magical loving atmosphere.

CHARACTER: Place the child character sitting at the RIGHT side of the tree base (x:60%–80%, y:40%–88%). Back leaning contentedly against the right side of the trunk. Legs loosely out in front. Looking upward with joyful wonder-filled expression and big smile. Height approximately 42% of image height.

TEXT PLACEMENT — render exactly:
- TOP-RIGHT AREA (x:55%–95%, y:3%–18%):
  Render text: "GOD'S LOVE FOR YOU, [CHILD_NAME], WILL NEVER END."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 30px. 2 lines. Right-aligned.

- LEFT SIDE MID-HEIGHT (x:2%–42%, y:35%–62%):
  Render text in handwritten cursive style: "Yes, I have loved you with an everlasting love. Therefore I have drawn you with loving kindness."
  New line: "Jeremiah 31:3"
  Fill: white #FFFFFF. Soft dark drop shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Magical glowing ancient tree. Warm golden light. 2:1 landscape. Full bleed.`,

      // PAGE 5 — GOD FILLS YOUR HEART WITH PEACE
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Peaceful serene meadow beside a gentle stream at soft morning light. The stream winds gently through the lower-right area, sparkling softly. Lush green grass with wildflowers — white daisies, small purple flowers, yellow blooms. Tall cattail reeds and soft grasses at water's edge. Colorful butterflies and a white dove in flight. Sky is soft and peaceful — pale blue-white gradient, very light and airy. Purple mountains in far background. Soft morning mist over water. Scene feels deeply peaceful and still.

CHARACTER: Place the child character sitting peacefully on the grassy bank in CENTER-LEFT area (x:15%–40%, y:28%–88%). Sitting with legs loosely out front, hands resting on knees. Peaceful gentle smile, eyes soft and content. Looking slightly upward. Height approximately 55% of image height. Barefoot, completely relaxed.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA (x:2%–48%, y:3%–18%):
  Render text: "GOD FILLS YOUR HEART WITH PEACE, [CHILD_NAME], WHEN YOU NEED IT MOST."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 30px. 2 lines. Left-aligned.

- RIGHT SIDE MID-HEIGHT (x:52%–96%, y:30%–60%):
  Render text in handwritten cursive style: "Peace I leave with you. My peace I give to you; not as the world gives, I give to you. Don't let your heart be troubled, neither let it be fearful."
  New line: "John 14:27"
  Fill: dark navy #1A2744. Soft shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Peaceful serene meadow stream. Soft morning light. 2:1 landscape. Full bleed.`,

      // PAGE 6 — WHENEVER YOU TALK TO GOD HE LISTENS
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Warm cozy child's bedroom at peaceful night. Wooden bed in CENTER-RIGHT with patchwork quilt — soft blues, grays, creams. Wooden bedside table with warm lamp glowing softly. Open storybook on the floor. Small slippers near the bed. Plush bunny stuffed toy on the bed. Large window on the right showing beautiful night sky — deep blue with glowing crescent moon, stars twinkling, soft clouds. Magical soft sparkle light rays coming through the window. A glowing white dove visible outside the window. Scene feels warm, safe, deeply loved.

CHARACTER: Place the child character kneeling beside the bed in RIGHT-CENTER area (x:60%–82%, y:25%–88%). Both knees on the soft rug. Hands pressed together in prayer position in front of chest. Head bowed slightly, eyes closed. Expression completely peaceful, serene, trusting. Height approximately 55% of image height.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA (x:2%–48%, y:4%–20%):
  Render text: "WHENEVER YOU TALK TO GOD, [CHILD_NAME], HE LISTENS."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 23px. 2 lines. Left-aligned.

- LEFT SIDE MID-HEIGHT (x:2%–45%, y:35%–62%):
  Render text in handwritten cursive style: "You shall call on me, and you shall go and pray to me, and I will listen to you."
  New line: "Jeremiah 29:12"
  Fill: white #FFFFFF. Soft dark drop shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Warm cozy bedroom at night. 2:1 landscape. Full bleed.`,

      // PAGE 7 — GOD WATCHES OVER YOU DAY AND NIGHT
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Child's cozy bedroom at deep peaceful night. Soft blue-gray moonlit atmosphere. Wooden bed in CENTER-RIGHT with child sleeping. Soft cream/gray quilted duvet. Multiple small stuffed animals on and around bed — teddy bear, plush bunny, plush dog. Bedside lamp glowing softly on right table. Large window on LEFT showing beautiful moonlit night sky — large glowing full moon, soft clouds, glowing stars. Moonlight streams through window casting soft silver-blue light. A softly glowing white dove hovers near the ceiling. Scene feels profoundly peaceful, safe, protected.

CHARACTER: Place the child character lying in bed sleeping (x:42%–80%, y:32%–72%). Tucked snugly under covers, head on pillow, eyes closed. Peaceful sleeping expression. Surrounded by stuffed animals. Upper body and head visible above covers.

TEXT PLACEMENT — render exactly:
- TOP-RIGHT AREA (x:52%–95%, y:3%–18%):
  Render text: "GOD WATCHES OVER YOU, [CHILD_NAME], DAY AND NIGHT."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 30px. 2 lines. Right-aligned.

- LEFT SIDE MID-HEIGHT (x:2%–45%, y:30%–60%):
  Render text in handwritten cursive style: "Yahweh will keep you from all evil. He will keep your soul. Yahweh will keep your going out and your coming in, from this time forward, and forever more."
  New line: "Psalm 121:7-8"
  Fill: white #FFFFFF. Soft dark drop shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Peaceful moonlit bedroom. 2:1 landscape. Full bleed.`,

      // PAGE 8 — WHEN YOU FEEL WEAK GOD WILL MAKE YOU STRONG
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Beautiful hilltop meadow at golden sunrise. Gentle grassy hill with scattered rocks in foreground. Lush wildflowers — yellow daisies, orange blooms, purple lavender, white flowers. Rolling green hills in background-right. Sky is breathtaking — brilliant golden-white sunrise light floods from upper-right, dramatic golden rays fanning outward. Puffy golden-lit clouds. Small birds soaring as silhouettes. Wind blowing softly — petals and leaves drift through the air. Scene feels energetic, triumphant, full of God's power.

CHARACTER: Place the child character in LEFT-CENTER area on the hilltop (x:10%–38%, y:15%–85%). Standing in triumphant wind-blown pose — one foot forward on a rock, one arm raised upward toward the sky, other arm slightly back. Expression: joyful, brave, triumphant, exhilarated. Height approximately 60% of image height. Hair/clothes gently blown by breeze.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA (x:2%–48%, y:3%–18%):
  Render text: "WHEN YOU FEEL WEAK, [CHILD_NAME], GOD WILL MAKE YOU STRONG."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 23px. 2 lines. Left-aligned.
  Text positioned above character — does not overlap.

- RIGHT SIDE MID-HEIGHT (x:52%–96%, y:32%–60%):
  Render text in handwritten cursive style: "He gives power to the weak. He increases the strength of him who has no might."
  New line: "Isaiah 40:29"
  Fill: dark navy #1A2744. Soft shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Triumphant hilltop sunrise. 2:1 landscape. Full bleed.`,

      // PAGE 9 — YOU NEVER HAVE TO BE AFRAID
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Rainy day path — dramatic but hopeful atmosphere. A wet cobblestone/dirt path glistening in gentle rain. Soft light rain falling. Puddles reflecting soft light. Green grass and plants on the sides. A beautiful vibrant full rainbow arcs from LEFT side curving to RIGHT — bright vivid colors. The right side of sky is brighter — golden light breaking through dark clouds. Trees in background. Small orange fox sitting on LEFT side of path. Small fluffy rabbit on RIGHT side of path. Scene feels dramatic but full of hope.

CHARACTER: Place the child character walking on the path in CENTER-LEFT area (x:18%–42%, y:15%–88%). Walking forward with determined expression. Holding a transparent clear umbrella with pink polka dots. Expression: wide-eyed but brave, determined, not afraid. Height approximately 60% of image height. Fox on left side, rabbit on right side.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA (x:2%–50%, y:3%–18%):
  Render text: "YOU NEVER HAVE TO BE AFRAID, [CHILD_NAME], BECAUSE GOD IS WITH YOU."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 23px. 2 lines. Left-aligned.
  Text above character — does not overlap.

- RIGHT SIDE MID-HEIGHT (x:52%–96%, y:25%–60%):
  Render text in handwritten cursive style: "Don't you be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness."
  New line: "Isaiah 41:10"
  Fill: white #FFFFFF. Soft dark drop shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Rainy day path with rainbow. 2:1 landscape. Full bleed.`,

      // PAGE 10 — GOD HAS BEAUTIFUL PLANS FOR YOUR LIFE
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Beautiful open golden meadow at brilliant sunrise. Wide open sky taking up upper 50% — soft blue transitioning to brilliant warm golden-white at horizon. Lush green meadow with colorful wildflowers everywhere. Rolling gentle hills in background. A winding path leads toward a distant glowing fairytale castle on a hill in background-right. Glowing golden stars trail upward in the sky. A colorful kite flying in upper-right sky. A hot air balloon in far upper-right. Small sailboat silhouette on horizon. Scene feels full of possibility, beautiful dreams, and hope.

CHARACTER: Place the child character in LEFT-CENTER area (x:15%–40%, y:18%–88%). Standing upright looking upward at the sky with wide-eyed wonder and hope. Both arms slightly out at sides, relaxed open pose. Mouth slightly open in awe and delight. Height approximately 60% of image height.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA (x:2%–48%, y:3%–18%):
  Render text: "GOD HAS BEAUTIFUL PLANS FOR YOUR LIFE, [CHILD_NAME]."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 23px. 2 lines. Left-aligned.
  Text above character — does not overlap.

- RIGHT SIDE MID-HEIGHT (x:52%–96%, y:28%–58%):
  Render text in handwritten cursive style: "For I know the thoughts that I think toward you, says Yahweh, thoughts of peace, and not of evil, to give you hope and a future."
  New line: "Jeremiah 29:11"
  Fill: dark navy #1A2744. Soft shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Open golden meadow sunrise. 2:1 landscape. Full bleed.`,

      // PAGE 11 — GOD WILL HELP LEAD YOU EVERY STEP
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Magical glowing stepping-stone path through an enchanted garden at golden hour. Beautiful stone stepping-stones wind from foreground-center toward a glowing warm horizon. Glowing golden arrow markers in the stones pointing forward. Small gentle waterfalls cascade on BOTH sides of the path. Lush green bushes, cherry blossom trees with pink petals, colorful flowers lining both sides. Japanese paper lanterns hanging from tree branches on left. Cherry blossom petals drifting through warm air. Fireflies and golden light particles throughout. Scene feels magical, gently guiding, warm.

CHARACTER: Place the child character standing on the stepping stones in LEFT-CENTER area (x:15%–40%, y:15%–88%). Full body visible. Standing still looking forward and slightly upward with wonder, openness, and trust. Hands naturally at sides. Height approximately 60% of image height.

TEXT PLACEMENT — render exactly:
- TOP-RIGHT AREA (x:52%–96%, y:3%–18%):
  Render text: "GOD WILL HELP LEAD YOU, [CHILD_NAME], EVERY STEP OF THE WAY."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 30px. 2 lines. Right-aligned.

- RIGHT SIDE MID-HEIGHT (x:52%–96%, y:25%–55%):
  Render text in handwritten cursive style: "I will instruct you and teach you in the way which you shall go. I will counsel you with my eye on you."
  New line: "Psalm 32:8"
  Fill: dark navy #1A2744. Soft shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Magical stepping stone path. Golden warm light. 2:1 landscape. Full bleed.`,

      // PAGE 12 — GOD BRINGS JOY TO YOUR HEART EACH NEW DAY
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Joyful vibrant colorful meadow on a bright sunny morning. Rich green meadow bursting with colorful wildflowers — red poppies, orange blooms, blue bell flowers, yellow daisies, purple lavender. Bright blue sky with soft white fluffy clouds. Dozens of transparent soap bubbles floating and drifting everywhere catching beautiful light. Colorful butterflies in flight. Bluebirds and yellow birds flying in upper area. Golden sparkle light particles drifting. Rolling green hills in background. Scene radiates pure happiness and morning joy.

CHARACTER: Place the child character in RIGHT-CENTER area (x:60%–82%, y:15%–88%). Running/skipping forward joyfully through the meadow — mid-stride, one foot off ground. Arms slightly out for balance. Expression: the biggest most joyful open-mouth laughing smile, eyes sparkling with delight. Height approximately 58% of image height. Bubbles floating around character.

TEXT PLACEMENT — render exactly:
- TOP-RIGHT AREA (x:52%–96%, y:3%–18%):
  Render text: "GOD BRINGS JOY TO YOUR HEART, [CHILD_NAME], EACH NEW DAY."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 30px. 2 lines. Right-aligned.
  Text above and right of character — does not overlap.

- LEFT SIDE MID-HEIGHT (x:2%–45%, y:32%–62%):
  Render text in handwritten cursive style: "You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more."
  New line: "Psalm 16:11"
  Fill: white #FFFFFF. Soft dark drop shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Joyful bubble meadow. Bright sunny morning. 2:1 landscape. Full bleed.`,

      // PAGE 13 — GOD HELPS YOUR HEART GROW KIND
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Beautiful warm enchanted garden at golden afternoon. Lush garden with stone pathway winding through the scene. Well-manicured green bushes and hedges. Beautiful climbing roses on trellises — pink, yellow, red. Colorful flowers everywhere — roses, lavender, foxgloves, peonies in full bloom. Fruit trees with berries in background. Warm golden afternoon sunlight streaming from upper-right. Golden light particles drifting softly. Orange and purple butterflies throughout. Garden feels warm, lush, full of life, kindness, and gentleness.

CHARACTER: Place the child character in LEFT-CENTER area (x:12%–40%, y:22%–88%). Kneeling down on both knees on the garden path. Both hands cupped gently together in front, holding a small bright blue bluebird sitting trustingly in their palms. Expression: gentle, tender, kind, wonder-filled soft smile. Looking down at the bird with complete love and care. Height (kneeling) approximately 50% of image height. Small brown rabbit on LEFT side looking up adoringly. Small orange squirrel on RIGHT side looking up adoringly.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA (x:2%–50%, y:3%–18%):
  Render text: "GOD HELPS YOUR HEART GROW KIND, LOVING, AND GENTLE, [CHILD_NAME]."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 27px. 2 lines. Left-aligned.
  Text above character — does not overlap.

- RIGHT SIDE MID-HEIGHT (x:50%–96%, y:28%–65%):
  Render text in handwritten cursive style: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control. Against such things there is no law."
  New line: "Galatians 5:22-23"
  Fill: white #FFFFFF. Soft dark drop shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Warm enchanted garden. Golden afternoon light. 2:1 landscape. Full bleed.`,

      // PAGE 14 — GOD IS LOVING FORGIVING AND FULL OF MERCY
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Soft warm ethereal garden path at gentle morning. Stone cobblestone path runs through center. Lush colorful garden on BOTH sides — LEFT: darker deeper tones — deep pink, purple blooms, dark green foliage. RIGHT: lighter warmer tones — yellow flowers, orange blooms, pink flowers, bright greens in warm backlight. Scattered golden light rays from upper-right. Gold light particles float gently. Small brown sparrow on LEFT of path. Small blue-gray bird on RIGHT of path. Orange monarch butterfly center upper area. A woven wicker basket tipped on its side with red apples spilling out across cobblestones.

CHARACTER: Place the child character sitting on cobblestone path in RIGHT-CENTER area (x:60%–80%, y:38%–88%). Sitting on the ground, legs loosely in front. One hand resting on cobblestones, leaning slightly. Looking upward-left with remorseful but hopeful expression. Height (seated) approximately 42% of image height.

TEXT PLACEMENT — render exactly:
- TOP-RIGHT AREA (x:55%–96%, y:3%–20%):
  Render text: "GOD IS LOVING, FORGIVING, AND FULL OF MERCY FOR YOU, [CHILD_NAME]."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 30px. 2 lines. Right-aligned within area.

- LEFT SIDE MID-HEIGHT (x:2%–46%, y:32%–62%):
  Render text in handwritten cursive style: "If we confess our sins, he is faithful and righteous to forgive us the sins and to cleanse us from all unrighteousness."
  New line: "1 John 1:9"
  Fill: white #FFFFFF. Soft dark drop shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Soft warm garden path. Warm forgiving tones. 2:1 landscape. Full bleed.`,

      // PAGE 15 — GOD FILLS YOUR LIFE WITH HOPE PEACE AND LIGHT
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. Magnificent hilltop vista at stunning sunset/dusk. Character stands on a grassy hilltop in lower-center-left. Rolling misty green hills and valleys stretch to the horizon. A glowing winding river of light — shimmering silver-white sparkles traces through the valley below like a path made of stars. Tall wildflowers and grass at hilltop edges — purple, pink, yellow, white blooms. Sky is the hero — dramatic sunset: deep blue upper sky transitions through purple, to rose-pink, to warm amber-orange at the horizon. Fluffy pink-orange lit clouds in layers. Several small birds soar as silhouettes in the mid-sky. Entire scene feels expansive, hopeful, awe-inspiring.

CHARACTER: Place the child character standing on the hilltop in LEFT-CENTER area (x:10%–38%, y:18%–88%). Full body visible head to toe. Standing upright, tall, confident, still. Hands clasped gently together in front at waist level. Looking forward toward the glowing horizon with a serene, peaceful, grateful expression. Height approximately 65% of image height.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA (x:2%–50%, y:3%–20%):
  Render text: "GOD FILLS YOUR LIFE WITH HOPE, PEACE, AND LIGHT, [CHILD_NAME]."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 27px. 2 lines. Left-aligned.

- RIGHT SIDE MID-HEIGHT (x:50%–96%, y:32%–62%):
  Render text in handwritten cursive style: "Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope in the power of the Holy Spirit."
  New line: "Romans 15:13"
  Fill: dark navy #1A2744. Soft shadow. Size approximately 20px. Centered within area.

STYLE: Pixar/Disney 3D animated. Hilltop sunset vista. Dramatic pink-purple-gold sky. 2:1 landscape. Full bleed.`,

      // PAGE 16 — GOD'S BLESSINGS WILL GO WITH YOU
      `${GLOBAL_STYLE}
SCENE: 2:1 landscape. STRICT SPLIT LAYOUT.
LEFT HALF (0%–50%): Warm golden meadow scene at brilliant sunrise. Rolling green hills in background. Lush wildflowers in foreground — orange poppies, pink flowers, white daisies, purple blooms. Warm golden-white sunburst from center-upper area of left panel. Dozens of monarch butterflies fill the air along with small birds in flight. Pink flower petals drift through warm air. Soft golden clouds.
RIGHT HALF (50%–100%): Completely clean soft white background. A soft very subtle floral watercolor border frames the outer edges of the right panel only. Center of right half is clean white.

CHARACTER: Place the child character in LEFT HALF center of left panel (x:12%–40%, y:18%–88%). Full body visible head to toe. Standing with both arms spread wide open — both arms extended outward like wings, palms facing forward/upward in pure joyful celebration. Head tilted back slightly, looking upward with the biggest most joyful open-mouth laughing expression. Height approximately 65% of left panel height. Character fully within left half only.

TEXT PLACEMENT — render exactly:
- TOP-LEFT AREA of left panel (x:2%–46%, y:3%–22%):
  Render text: "GOD'S BLESSINGS WILL GO WITH YOU, [CHILD_NAME], TODAY AND ALWAYS."
  Bold thick rounded ALL-CAPS. Fill: #E8420A. White stroke 5px.
  Size approximately 23px. 3 lines. Left-aligned.

- LOWER-LEFT AREA of left panel (x:2%–46%, y:65%–84%):
  Render text in handwritten cursive style: "Yahweh bless you, and keep you. Yahweh make his face to shine on you, and be gracious to you."
  New line: "Numbers 6:24-25"
  Fill: dark navy #1A2744. Soft shadow. Size approximately 18px. Centered within area.

- CENTER of right white panel (x:55%–92%, y:38%–62%):
  Render text in handwritten cursive style: "With all our love,"
  New line: "[SENDER_NAME]"
  Fill: dark navy #1A2744. Centered in right white panel. Size approximately 22px.

CRITICAL: RIGHT HALF must be clean white with only subtle floral border on outer edges.
STYLE: Pixar/Disney 3D animated. Glorious sunrise left. Clean white right. 2:1 landscape. Full bleed.`,
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
  { label: 'Any Occasion', value: 'any' },
]

export const REVIEWS = [
  {
    name: 'Maria S.',
    location: 'Manila, PH',
    rating: 5,
    text: "We ordered this for our daughter's baptism and everyone cried happy tears. Seeing her face on every page was absolutely magical. Worth every peso!",
    book: "God's Promises For You",
    avatar: 'M',
  },
  {
    name: 'James R.',
    location: 'Cebu, PH',
    rating: 5,
    text: "Jared absolutely loves seeing himself in the book. He asks us to read it every single night. The quality is stunning — looks just like a real published book.",
    book: "God's Promises For You",
    avatar: 'J',
  },
  {
    name: 'Ana D.',
    location: 'Davao, PH',
    rating: 5,
    text: "I gave this as a birthday gift and the mom cried when she opened it. The illustrations are Pixar-level quality. Already ordering another one for Christmas!",
    book: 'Before You Were Born',
    avatar: 'A',
  },
  {
    name: 'Grace T.',
    location: 'Quezon City, PH',
    rating: 5,
    text: "The dedication page made my heart melt. Such a thoughtful, beautiful keepsake. My nephew carries it everywhere and shows everyone 'that's me in the book!'",
    book: 'You Are Brave',
    avatar: 'G',
  },
]