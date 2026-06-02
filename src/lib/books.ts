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
      `SCENE: Wide 2:1 landscape. Lush spring meadow at golden-pink sunset. Pink cherry blossom trees scattered across the midground. Dense colorful wildflowers — heart-shaped pink tulips, white daisies, purple lavender — carpet the foreground. Soft rolling green hills in the background. Multiple white doves and colorful butterflies (monarch orange, purple, blue) fly gracefully through warm glowing air. A soft pastel rainbow arcs across the upper-right sky. Warm golden cinematic lighting, soft lens warmth.

CHARACTER: Place the child character standing in the RIGHT-CENTER of the image. Full body visible head to toe. Looking upward with wide joyful open-mouth smile. Height approximately 65% of image height. Feet resting naturally in the flower field.

TEXT PLACEMENT:
- UPPER-RIGHT AREA in a gentle upward rainbow arc: "GOD'S PROMISES FOR" — bold rounded thick all-caps, fill bright orange-yellow (#F4900C), white stroke 5px, approximately 52pt.
- BELOW THE ARC right side: "[CHILD_NAME]" — extra bold rounded all-caps, fill vivid red (#E8420A), white stroke 7px, approximately 88pt.
- BOTTOM-RIGHT CORNER: "by : party&presents" — small italic white, approximately 16pt.

STYLE: Pixar/Disney 3D animated feature film. 2:1 landscape. Full bleed. No borders.`,

      // PAGE 1 — DEDICATION
      `SCENE: 2:1 landscape. RIGHT HALF (50%-100% of width): Warm cozy animated nursery interior. Cream upper walls, sage-green lower wainscoting. Small wooden bookshelf with colorful board books. Plush white lamb stuffed toy on carpet. Neatly folded light-blue fleece blanket. Small wooden stool with glowing yellow smiley-face star nightlight. Tiny framed watercolor rainbow painting on wall. Hanging dove and star mobile. Tiny gold sparkle dust particles floating. Soft warm morning window light from off-frame right. LEFT HALF (0%-50%): Clean soft white — NO scene elements at all.

CHARACTER: Place the child character seated on the carpeted nursery floor in the RIGHT HALF, lower-center. Sitting naturally with legs loosely in front. Looking upward-left toward the text with a wide happy smile. Height approximately 55% of image height.

TEXT PLACEMENT — on the LEFT WHITE HALF only:
- UPPER AREA centered within left half: "This book belongs to [CHILD_NAME]." — rounded storybook serif, mixed case, dark navy (#2D3748), approximately 26pt bold.
- BELOW with breathing space: "[DEDICATION]" — same font, slightly smaller (~20pt), dark navy, multi-line wrapping, max width 85% of left panel.

CRITICAL: ALL text strictly inside left white half only. CHARACTER strictly inside right nursery half only. No text overlaps the nursery scene.
STYLE: Pixar/Disney 3D. 2:1 landscape. Full bleed.`,

      // PAGE 2 — GOD WILL ALWAYS BE WITH YOU
      `SCENE: 2:1 landscape. Magical enchanted forest at golden hour. Winding dirt path curves from foreground-center toward background-right. Ancient towering trees with massive gnarled trunks flank both sides. Thick canopy above with amber-green leaves. Warm golden-orange god-rays of sunlight pierce through the canopy illuminating the path in a heavenly glow. Colorful wildflowers lining the path edges — white daisies, blue bell flowers, purple lupines, golden yellow blooms. Colorful butterflies flutter in the light shafts. Small robin perched on a high branch at upper-left. Two small fluffy brown rabbits — one peeking from left flowers, one sitting right of the path. Glowing firefly-like light particles near the ground.

CHARACTER: Place the child character walking forward along the path in the RIGHT-CENTER area. Full body visible. Mid-stride natural walking pose — left foot forward. Looking forward and slightly upward with a curious brave expression. Height approximately 62% of image height.

TEXT PLACEMENT:
- TOP-RIGHT QUADRANT (x:55%-95%, y:5%-28%): "GOD WILL ALWAYS BE WITH YOU, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 54pt, 2 lines, left-aligned.
- LOWER-LEFT AREA (x:2%-42%, y:45%-80%): "Haven't I commanded you? Be strong and courageous. Don't be afraid. Don't be dismayed, for Yahweh your God is with you wherever you go." new line "Joshua 1:9" — handwriting cursive, white (#FFFFFF), soft dark drop shadow, approximately 21pt.

STYLE: Pixar/Disney 3D animated. Magical golden-hour forest. 2:1 landscape. Full bleed.`,

      // PAGE 3 — GOD MADE YOU SPECIAL
      `SCENE: 2:1 landscape. Bright cheerful open meadow at midday. Pastel blue-pink sky with fluffy cotton-candy clouds. Soft pastel rainbow arcs across upper-right sky. Rolling soft green hills in far background. Lush colorful wildflowers fill foreground and midground — vibrant red poppies, white daisies, purple bell flowers, orange blooms. Leafy green tree branch extends from upper-right corner with two small adorable bluebirds. Multiple colorful butterflies flutter throughout. Small cute woodland animals gathered around the child's left side — two-three small fluffy brown rabbits looking up adoringly. One baby fawn standing center-right. One rabbit near character's feet right side.

CHARACTER: Place the child character standing upright in the LEFT-CENTER area of the meadow. Full body visible head to toe. Head tilted very slightly upward. Huge delighted open-mouth smile, sparkling happy eyes. Arms relaxed naturally at sides. Height approximately 68% of image height.

TEXT PLACEMENT:
- TOP-LEFT AREA (x:2%-48%, y:3%-22%): "GOD MADE YOU SPECIAL, BEAUTIFUL, AND WONDERFULLY YOU, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 48pt, 3 lines, left-aligned.
- RIGHT SIDE MID-HEIGHT (x:52%-96%, y:38%-72%): "I will give thanks to you, for I am fearfully and wonderfully made. Your works are wonderful. My soul knows that very well." new line "Psalm 139:14" — handwriting cursive, dark navy (#1A2744), soft shadow, approximately 21pt.

STYLE: Pixar/Disney 3D animated. Bright sunny meadow. 2:1 landscape. Full bleed.`,

      // PAGE 4 — GOD WILL GIVE YOU STRENGTH
      `SCENE: 2:1 landscape. Dramatic mountain landscape at sunrise. Character stands on a rocky outcrop ledge in the lower-center-left area. Towering rugged mountain peaks rise in the background, their snowy tips glowing orange-pink in the sunrise light. The sky is breathtaking — deep royal blue upper sky, transitioning to brilliant orange-gold at the horizon. Dramatic god-rays fan out from behind the mountains. Eagles or large hawks soar as silhouettes in the upper sky — 2-3 birds. Wildflowers grow from rocky crevices in the foreground. A small cascading waterfall visible in the background-left. Golden morning mist fills the valleys between peaks.

CHARACTER: Place the child character standing tall on the rocky outcrop in the LEFT-CENTER area. Full body visible. Standing with feet shoulder-width apart, strong confident stance. Both fists raised upward toward the sky in a triumphant victory pose. Head tilted back, looking upward with the biggest most joyful triumphant expression. Height approximately 65% of image height.

TEXT PLACEMENT:
- TOP-RIGHT AREA (x:50%-96%, y:3%-20%): "GOD WILL GIVE YOU STRENGTH, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 54pt, 2 lines, right-aligned.
- LOWER-RIGHT AREA (x:50%-96%, y:60%-85%): "I can do all things through Christ, who strengthens me." new line "Philippians 4:13" — handwriting cursive, white (#FFFFFF), soft dark drop shadow, approximately 22pt.

STYLE: Pixar/Disney 3D animated. Epic mountain sunrise. 2:1 landscape. Full bleed.`,

      // PAGE 5 — GOD'S LOVE FOR YOU NEVER ENDS
      `SCENE: 2:1 landscape. Breathtaking ocean beach at golden sunset. Wide sandy beach curves gently from foreground to background-right. Shallow crystal-clear turquoise water laps gently at the shore. The ocean stretches to the horizon on the right half of the image. The sky is spectacular — brilliant golden-orange sun low on the horizon, radiating warm golden light across everything. Dramatic pink-purple clouds in layers above. Warm light reflects off the wet sand and water creating golden shimmer. Several white seagulls soar in the sky. Small sandcastles in the foreground-left. Tiny colorful seashells scattered on the sand near the water's edge.

CHARACTER: Place the child character standing in the LEFT-CENTER area at the water's edge. Full body visible head to toe. Standing with arms spread wide open — both arms extended outward like wings. Head slightly tilted back, huge joyful open-mouth smile, eyes sparkling. The warm sunset light illuminates the character from the right. Feet at the very edge of the water with tiny gentle waves lapping around the feet. Height approximately 65% of image height.

TEXT PLACEMENT:
- TOP-LEFT AREA (x:2%-50%, y:3%-20%): "GOD'S LOVE FOR YOU NEVER ENDS, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 52pt, 2 lines, left-aligned.
- CENTER-RIGHT MID-HEIGHT (x:48%-95%, y:35%-65%): Over the lighter sky/ocean area. "Give thanks to Yahweh, for he is good, for his loving kindness endures forever." new line "Psalm 136:1" — handwriting cursive, dark navy (#1A2744), soft shadow, approximately 22pt.

STYLE: Pixar/Disney 3D animated. Golden ocean sunset. 2:1 landscape. Full bleed.`,

      // PAGE 6 — GOD WILL PROTECT YOU
      `SCENE: 2:1 landscape. Magical night sky scene. Character sits on a gentle grassy hill in the lower-center area. The sky above is absolutely breathtaking — deep midnight blue-purple sky filled with thousands of glittering stars. A spectacular glowing full moon dominates the upper-right area, radiating soft silver-white light. The Milky Way galaxy visible as a soft glowing band across the upper sky. Several large golden stars near the moon glow extra bright. The hillside is bathed in soft silver moonlight. Fireflies create tiny golden lights near the grass around the character. Soft glowing flowers — white and pale blue — dot the hillside. A small fluffy owl perched on a branch at upper-left looks down toward the character. Soft mist in the distant valleys below.

CHARACTER: Place the child character sitting cross-legged on the grassy hillside in the CENTER-LEFT area. Full body visible. Sitting upright, hands resting gently on knees. Head tilted back looking up at the stars with pure wide-eyed wonder and awe expression — mouth slightly open in amazement, eyes very wide and sparkling with the star reflections. Height approximately 50% of image height.

TEXT PLACEMENT:
- TOP-LEFT AREA (x:2%-50%, y:3%-20%): "GOD WILL PROTECT YOU, [CHILD_NAME], THROUGH EVERY NIGHT." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 48pt, 2-3 lines, left-aligned.
- RIGHT SIDE MID-HEIGHT (x:50%-96%, y:30%-65%): Over the darker night sky area. "He will not allow your foot to be moved. He who keeps you will not slumber." new line "Psalm 121:3" — handwriting cursive, white (#FFFFFF), soft glow drop shadow, approximately 21pt.

STYLE: Pixar/Disney 3D animated. Magical starry night. 2:1 landscape. Full bleed.`,

      // PAGE 7 — GOD HEARS YOUR PRAYERS
      `SCENE: 2:1 landscape. Warm cozy bedroom interior at dusk/early night. Child kneels beside a small wooden bed on the RIGHT side of the image. The bed has a soft white and cream quilted duvet, plush pillows. A glowing warm yellow nightlight on the bedside table casts soft amber light. Through a window on the right wall — soft purple-blue twilight sky visible with a few early stars appearing. Small bookshelf with colorful books on the left wall. A few beloved stuffed animals on the bed — small teddy bear, plush bunny. On the wooden floor — a small soft rug in pastel colors. Gold sparkle dust particles float softly in the warm nightlight glow. The entire scene feels incredibly warm, safe, and peaceful.

CHARACTER: Place the child character kneeling beside the bed in the RIGHT-CENTER area. Full body visible. Kneeling on both knees on the soft rug. Hands pressed together in prayer position in front of chest. Head bowed slightly, eyes gently closed. Expression: perfectly peaceful, serene, trusting. The warm nightlight glow illuminates the character from the right. Height approximately 55% of image height.

TEXT PLACEMENT:
- TOP-LEFT AREA (x:2%-54%, y:3%-20%): "GOD HEARS EVERY PRAYER YOU PRAY, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 50pt, 2 lines, left-aligned.
- LEFT SIDE MID-HEIGHT (x:2%-48%, y:38%-72%): Over the darker left wall area. "Don't be anxious about anything, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God." new line "Philippians 4:6" — handwriting cursive, white (#FFFFFF), soft dark drop shadow, approximately 19pt.

STYLE: Pixar/Disney 3D animated. Warm cozy bedroom at night. 2:1 landscape. Full bleed.`,

      // PAGE 8 — GOD GIVES YOU JOY
      `SCENE: 2:1 landscape. Vibrant colorful carnival/festival scene outdoors. Bright blue sky with a few fluffy white clouds. String lights crisscross above between colorful striped tents. Bunting flags in rainbow colors hang between poles. Colorful carousel visible in the background-right with horses and lights. Balloons in every color float upward throughout the scene — red, yellow, blue, green, pink, orange, purple. Carnival game booths with striped awnings in the background. Colorful confetti falls gently through the air. Cheerful colorful pennants and streamers everywhere. The entire scene is bursting with warm joyful energy.

CHARACTER: Place the child character in the CENTER-LEFT area. Full body visible head to toe. In pure mid-jump celebration pose — both feet off the ground, knees bent slightly upward. Both arms raised HIGH above the head, hands open with fingers spread wide in pure celebration. Head thrown back with the absolute biggest most joyful laughing open-mouth expression. Height approximately 65% of image height.

TEXT PLACEMENT:
- TOP-RIGHT AREA (x:48%-96%, y:3%-20%): "GOD GIVES YOU JOY, [CHILD_NAME]!" — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 58pt, 2 lines, right-aligned.
- LOWER-LEFT AREA (x:2%-46%, y:58%-82%): "This is the day that Yahweh has made. We will rejoice and be glad in it." new line "Psalm 118:24" — handwriting cursive, dark navy (#1A2744), soft shadow, approximately 22pt.

STYLE: Pixar/Disney 3D animated. Vibrant joyful carnival. 2:1 landscape. Full bleed.`,

      // PAGE 9 — GOD WILL GUIDE YOUR PATH
      `SCENE: 2:1 landscape. Breathtaking aerial-perspective landscape at golden afternoon. A winding path/road winds from the foreground upward through the scene toward the horizon. On the LEFT of the path — a vibrant wildflower meadow, colorful blooms in every direction. On the RIGHT of the path — a gentle stream with sparkling water catching golden light, smooth pebbles, and lush ferns. The path ahead glows with warm golden light from the horizon, as if it's leading toward something beautiful. The sky is golden-hour perfection — warm amber, soft gold, light peach tones. A large white dove in flight in the upper-center of the sky, wings fully spread. Several monarch butterflies follow the path. Small directional signpost visible in the midground with a small heart symbol on it.

CHARACTER: Place the child character on the path in the LEFT-CENTER area, walking forward confidently. Full body visible. Walking with a purposeful cheerful stride — slight skip in the step. One arm swings forward naturally, the other hand points forward toward the glowing horizon with excitement. Head up, looking ahead with a bright confident adventurous smile. Height approximately 62% of image height.

TEXT PLACEMENT:
- TOP-RIGHT AREA (x:48%-96%, y:3%-20%): "GOD WILL GUIDE YOUR PATH, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 52pt, 2 lines, right-aligned.
- LOWER-RIGHT AREA (x:50%-96%, y:58%-82%): "Trust in Yahweh with all your heart, and don't lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight." new line "Proverbs 3:5-6" — handwriting cursive, dark navy (#1A2744), soft shadow, approximately 19pt.

STYLE: Pixar/Disney 3D animated. Glowing golden-hour path landscape. 2:1 landscape. Full bleed.`,

      // PAGE 10 — GOD BLESSES YOU WITH GIFTS AND TALENTS
      `SCENE: 2:1 landscape. Bright cheerful creative studio/art room. Large wooden art table in the center-right of the scene. Art supplies everywhere — colorful paint jars open, brushes in cups, scattered crayons, sheets of colorful paper. On the art table — a large drawing/painting in progress showing a colorful rainbow landscape, clearly made by the child. Finished artworks hang on the wall behind — small colorful paintings and drawings in simple frames. A large window on the right wall lets in brilliant warm morning sunlight that illuminates the whole scene beautifully. Small potted plants on the windowsill. A colorful bunting banner hangs above with small star and heart shapes. Scattered flower petals and glitter on the floor near the table. The overall feel is warm, creative, joyful, and celebratory.

CHARACTER: Place the child character in the CENTER-LEFT area, standing in front of the art table. Full body visible. Standing at the table, one hand holding a large paintbrush raised upward with a flourish, the other hand on hip confidently. Head turned toward viewer with the biggest proudest most delighted smile — eyes sparkling. As if showing off their finished artwork. Height approximately 68% of image height.

TEXT PLACEMENT:
- TOP-LEFT AREA (x:2%-50%, y:3%-22%): "GOD BLESSES YOU WITH GIFTS AND TALENTS, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 48pt, 2-3 lines, left-aligned.
- RIGHT SIDE MID-HEIGHT (x:52%-96%, y:38%-68%): Over the lighter window area. "Each of you has received a gift. Use it to serve one another, as good stewards of God's grace." new line "1 Peter 4:10" — handwriting cursive, dark navy (#1A2744), soft shadow, approximately 20pt.

STYLE: Pixar/Disney 3D animated. Warm creative art studio. 2:1 landscape. Full bleed.`,

      // PAGE 11 — GOD WANTS YOU TO BE BRAVE
      `SCENE: 2:1 landscape. Epic adventure landscape — a grand stone bridge arching over a wide sparkling river gorge. The bridge is ancient, covered in moss and small wildflowers growing from the cracks. Below — a breathtaking river gorge with sparkling blue-white water rushing through, green ferns and vines on the rocky walls. Ahead of the bridge — a magical glowing forest, trees with golden-green leaves lit from within, as if the forest is magical and welcoming. The sky above is dramatic but beautiful — stormy on the left side (dark dramatic purple-gray clouds) but brilliant golden sunlight breaking through on the right side where the magical forest is. A rainbow begins on the dark left and ends in the magical golden forest ahead. The contrast of the dark storm left and glowing magic right creates a sense of courage overcoming fear. Small birds fly in the golden right sky.

CHARACTER: Place the child character at the beginning of the bridge in the LEFT-CENTER area. Full body visible. Standing at the entrance to the bridge, one foot already stepping forward onto the bridge — mid-stride forward movement. Body turned slightly forward but head turned back toward viewer. Expression: determined, brave, slightly uncertain but pushing forward anyway — small courageous smile, slightly furrowed brow of concentration, chin up. One hand raised slightly forward as if beckoning the viewer to follow. Height approximately 65% of image height.

TEXT PLACEMENT:
- TOP-RIGHT AREA (x:48%-96%, y:3%-20%): "GOD WANTS YOU TO BE BRAVE, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 52pt, 2 lines, right-aligned.
- LOWER-LEFT AREA (x:2%-46%, y:55%-80%): Over the darker left storm area. "Be strong and courageous. Don't be afraid or discouraged, for Yahweh your God is with you wherever you go." new line "Joshua 1:9" — handwriting cursive, white (#FFFFFF), soft dark drop shadow, approximately 20pt.

STYLE: Pixar/Disney 3D animated. Epic bridge adventure landscape. 2:1 landscape. Full bleed.`,

      // PAGE 12 — GOD CREATED THE WHOLE WORLD FOR YOU TO ENJOY
      `SCENE: 2:1 landscape. Spectacular panoramic world-view scene. The character stands on a grassy clifftop overlook with a breathtaking 270-degree view of an incredible landscape below. The scene shows the diversity of God's creation all at once — LEFT side: tropical ocean with turquoise water, white sand beach, palm trees. CENTER: lush green rolling hills and meadows with wildflowers. RIGHT side: dramatic snow-capped mountain peaks glowing in sunrise light. The sky is spectacular — sunrise colors transitioning from deep blue upper sky through purple, rose pink, to brilliant gold-orange at the horizon. Northern-lights-like shimmering green-teal ribbons of light visible in the upper left sky. Multiple rainbows — one large, one small double arc. White doves and colorful birds fly through the scene. Every element feels like the most beautiful version of creation.

CHARACTER: Place the child character standing on the clifftop overlook in the CENTER-LEFT area. Full body visible head to toe. Standing with both arms spread wide open and upward — like embracing the entire world. Head tilted back looking up with an expression of absolute wonder, awe, and gratitude — mouth open in a silent "wow", eyes wide with joy. As if seeing the beauty of everything all at once. Height approximately 65% of image height.

TEXT PLACEMENT:
- TOP-RIGHT AREA (x:48%-96%, y:3%-20%): "GOD CREATED THIS WHOLE BEAUTIFUL WORLD FOR YOU TO ENJOY, [CHILD_NAME]!" — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 44pt, 3 lines, right-aligned.
- LOWER-LEFT AREA (x:2%-46%, y:60%-82%): Over the meadow area. "The earth is Yahweh's, with its fullness; the world, and those who dwell in it." new line "Psalm 24:1" — handwriting cursive, white (#FFFFFF), soft dark drop shadow, approximately 21pt.

STYLE: Pixar/Disney 3D animated. Spectacular panoramic world creation. 2:1 landscape. Full bleed.`,

      // PAGE 13 — GOD HELPS YOUR HEART GROW KIND
      `SCENE: 2:1 landscape. Warm enchanted garden courtyard at golden afternoon. Beautiful stone garden path winds through the center. Lush blooming garden on both sides — climbing roses (pink, white, red) on stone walls, lavender bushes, flowering hedges. A charming wooden garden gate in the background-center covered in climbing vines and flowers. Warm golden afternoon light floods the scene from upper-right. Soft golden light particles and flower petals drift gently. Large colorful butterflies throughout. A small brown rabbit on LEFT looking up at character. Small orange-brown squirrel on RIGHT looking up at character. Birdsong suggested by small birds perched on the garden wall in the background.

CHARACTER: Place the child character in the CENTER-LEFT area. Kneeling down on one knee on the garden path. Both hands cupped gently together holding a small bright blue bluebird — bird sitting trustingly in the character's palms. Expression: gentle, tender, kind, wonder-filled soft smile. Looking down at the bird with complete love and care. Full body visible. Height (kneeling) approximately 50% of image height.

TEXT PLACEMENT:
- TOP-LEFT AREA (x:2%-52%, y:3%-20%): "GOD HELPS YOUR HEART GROW KIND, LOVING, AND GENTLE, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 46pt, 2 lines, left-aligned.
- RIGHT SIDE MID-HEIGHT (x:50%-96%, y:28%-68%): "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control. Against such things there is no law." new line "Galatians 5:22-23" — handwriting cursive, white (#FFFFFF), soft dark drop shadow, approximately 19pt.

STYLE: Pixar/Disney 3D animated. Warm enchanted garden. Golden afternoon light. 2:1 landscape. Full bleed.`,

      // PAGE 14 — GOD IS LOVING FORGIVING AND FULL OF MERCY
      `SCENE: 2:1 landscape. Soft warm ethereal garden path at gentle morning. A stone cobblestone path runs center of image. Lush colorful garden on BOTH sides — LEFT: darker deeper tones — deep pink, purple blooms, dark green foliage. RIGHT: lighter warmer tones — yellow flowers, orange blooms, pink flowers, bright greens in warm backlight. Scattered golden light rays from upper-right. Gold and warm light particles float gently. Several small birds on the path. Orange monarch butterfly center upper area. A woven wicker basket tipped on its side on the path with red apples spilling out.

CHARACTER: Place the child character sitting on the cobblestone path in the RIGHT-CENTER area. Sitting on the ground, legs loosely in front. One hand resting on the ground, leaning slightly. Looking upward-left toward the light with a remorseful but hopeful expression — slightly furrowed brow, eyes looking up with a small uncertain smile, like a child who made a mistake but knows they are still loved. Full body visible. Height (seated) approximately 42% of image height.

TEXT PLACEMENT:
- TOP-RIGHT AREA (x:48%-96%, y:3%-20%): "GOD IS LOVING, FORGIVING, AND FULL OF MERCY FOR YOU, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 46pt, 2 lines, right-aligned.
- LEFT SIDE MID-HEIGHT (x:2%-46%, y:32%-65%): "If we confess our sins, he is faithful and righteous to forgive us the sins and to cleanse us from all unrighteousness." new line "1 John 1:9" — handwriting cursive, white (#FFFFFF), soft dark drop shadow, approximately 20pt.

STYLE: Pixar/Disney 3D animated. Soft warm garden path. Warm forgiving tones. 2:1 landscape. Full bleed.`,

      // PAGE 15 — GOD FILLS YOUR LIFE WITH HOPE PEACE AND LIGHT
      `SCENE: 2:1 landscape. Magnificent hilltop vista at stunning sunset/dusk. Character stands on a grassy hilltop in lower-center-left. Rolling misty green hills and valleys stretch to the horizon. A glowing winding river of light — shimmering silver-white sparkles traces through the valley below, like a path of stars on the ground. Tall wildflowers and grass at the hilltop edges — purple, pink, yellow, white blooms. The sky is the hero — dramatic sunset: Deep blue upper sky transitions through purple, to rose-pink, to warm amber-orange at the horizon. Fluffy pink-orange lit clouds in layers. Several small birds soar as silhouettes in the mid-sky. Entire scene feels expansive, hopeful, awe-inspiring.

CHARACTER: Place the child character standing on the hilltop in the LEFT-CENTER area. Full body visible head to toe. Standing upright, tall, confident, still. Hands clasped gently together in front at waist level. Looking forward toward the glowing horizon with a serene, peaceful, grateful expression. Warm sunset light catches the character from the front-right. Height approximately 65% of image height.

TEXT PLACEMENT:
- TOP-LEFT AREA (x:2%-50%, y:3%-20%): "GOD FILLS YOUR LIFE WITH HOPE, PEACE, AND LIGHT, [CHILD_NAME]." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 50pt, 2 lines, left-aligned.
- RIGHT SIDE MID-HEIGHT (x:50%-96%, y:32%-65%): "Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope in the power of the Holy Spirit." new line "Romans 15:13" — handwriting cursive, dark navy (#1A2744), soft shadow, approximately 20pt.

STYLE: Pixar/Disney 3D animated. Hilltop sunset vista. Dramatic pink-purple-gold sky. 2:1 landscape. Full bleed.`,

      // PAGE 16 — GOD'S BLESSINGS WILL GO WITH YOU
      `SCENE: 2:1 landscape. SPLIT LAYOUT. LEFT HALF (0%-50%): Warm golden meadow scene at brilliant sunrise. Rolling green hills in background. Lush wildflowers in foreground — orange poppies, pink flowers, white daisies, purple blooms. Warm golden-white sunburst from center-upper area of left panel. Dozens of monarch butterflies fill the air along with small birds in flight. Pink flower petals drift through the warm air. Soft golden clouds. RIGHT HALF (50%-100%): Clean soft white background. A soft very subtle floral watercolor border can frame the right panel.

CHARACTER: Place the child character in the LEFT HALF, CENTER of left panel. Full body visible head to toe. Standing with arms spread wide open — both arms extended outward like wings, palms facing forward/upward in pure joyful celebration. Head tilted back slightly, looking upward with the biggest most joyful open-mouth smile and laughing expression. The pose of pure gratitude and celebration. Height approximately 65% of left panel height.

TEXT PLACEMENT:
- TOP-LEFT AREA of left panel (x:2%-46%, y:3%-22%): "GOD'S BLESSINGS WILL GO WITH YOU, [CHILD_NAME], TODAY AND ALWAYS." — bold rounded all-caps, fill vivid red (#E8420A), white stroke 5px, approximately 44pt, 3 lines, left-aligned.
- LOWER-LEFT AREA of left panel (x:2%-46%, y:65%-85%): "Yahweh bless you, and keep you. Yahweh make his face to shine on you, and be gracious to you." new line "Numbers 6:24-25" — handwriting cursive, dark navy (#1A2744), soft shadow, approximately 18pt.
- RIGHT HALF — closing message for [SENDER_NAME]: Leave as clean white — personal closing from the sender overlaid separately.

STYLE: Pixar/Disney 3D animated. Glorious sunrise celebration left. Clean white right. 2:1 landscape. Full bleed.`,
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
    description: "When the world feels too big and fears feel too real, this book reminds your child of exactly who they are — brave, strong, and never alone. Personalized with their name and face, every page is a given reminder that courage lives inside them.",
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