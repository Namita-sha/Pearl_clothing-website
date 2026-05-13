require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('./models/Product');

const products = [

  // ─────────── WOMEN — DRESSES ───────────────────────────────────────────────
  {
    name: 'Ivory Silk Slip Dress',
    price: 3499, category: 'dresses', gender: 'women',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    description: 'Fluid ivory silk slip with delicate spaghetti straps. Minimalist old-money energy.',
    tags: ['minimal', 'silk', 'evening', 'ivory', 'slip', 'old-money']
  },
  {
    name: 'Cognac Wrap Midi',
    price: 2899, category: 'dresses', gender: 'women',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
    description: 'Rich cognac wrap dress in crepe — defines the waist, flatters every body type.',
    tags: ['wrap', 'midi', 'cognac', 'elegant', 'casual', 'date']
  },
  {
    name: 'Phoenix Rebirth Dress',
    price: 2499, category: 'dresses', gender: 'women',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600',
    description: 'Like a flame rising softly at dawn, this dress captures the essence of quiet transformation.',
    tags: ['phoenix', 'elegant', 'flowy', 'statement', 'graceful', 'ethereal']
  },
  {
    name: 'Bloom Reverie Dress',
    price: 3999, category: 'dresses', gender: 'women',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
    description: 'A garden captured in motion — delicate florals unfold across this dress like a quiet daydream.',
    tags: ['floral', 'romantic', 'soft', 'feminine', 'spring', 'dreamy']
  },
  {
    name: 'Midnight Glitter Dress',
    price: 2199, category: 'dresses', gender: 'women',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600',
    description: 'A constellation woven into fabric — this glitter dress catches every flicker of light.',
    tags: ['glitter', 'party', 'night', 'bold', 'shimmer', 'statement']
  },

  // ─────────── WOMEN — SHIRTS / TOPS ────────────────────────────────────────
  {
    name: 'Blush Essence Top',
    price: 1899, category: 'shirts', gender: 'women',
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600',
    description: 'Soft blush tones meet effortless femininity in a piece that feels like a quiet statement.',
    tags: ['pink', 'blush', 'soft', 'feminine', 'elegant', 'chic']
  },
  {
    name: 'Azure Striped Classic Shirt',
    price: 1599, category: 'shirts', gender: 'women',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
    description: 'Crisp blue stripes layered over a timeless silhouette.',
    tags: ['blue', 'striped', 'classic', 'smart', 'casual', 'timeless']
  },
  {
    name: 'Maroon Allure Top',
    price: 2299, category: 'shirts', gender: 'women',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600',
    description: 'Deep maroon, rich with quiet intensity — a shade that speaks before you do.',
    tags: ['maroon', 'rich', 'elegant', 'bold', 'evening', 'feminine']
  },

  // ─────────── WOMEN — OUTERWEAR ─────────────────────────────────────────────
  {
    name: 'Pink Longline Coat',
    price: 8999, category: 'outerwear', gender: 'women',
    image: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600',
    description: 'Structured pink wool-blend coat falling below the knee. The definition of quiet luxury.',
    tags: ['Pink', 'wool', 'winter', 'structured', 'old-money', 'longline']
  },
  {
    name: 'Emerald Velvet Blazer',
    price: 5499, category: 'outerwear', gender: 'women',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600',
    description: 'Deep emerald velvet blazer — wear it as a jacket or a statement piece solo.',
    tags: ['velvet', 'emerald', 'formal', 'blazer', 'statement', 'green']
  },
  {
    name: 'Ivory Boucle Jacket',
    price: 6499, category: 'outerwear', gender: 'women',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
    description: 'Chanel-inspired ivory boucle jacket with gold button closure. Timeless, elevated.',
    tags: ['boucle', 'ivory', 'formal', 'classic', 'elegant', 'old-money']
  },

  // ─────────── WOMEN — TROUSERS ─────────────────────────────────────────────
  {
    name: 'Cream Wide-Leg Trousers',
    price: 2699, category: 'trousers', gender: 'women',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
    description: 'High-waisted cream palazzo trousers in fluid crepe. Elongating and elegant.',
    tags: ['wide-leg', 'cream', 'elegant', 'palazzo', 'casual', 'minimal']
  },
  {
    name: 'Black Tailored Cigarette Pants',
    price: 2899, category: 'trousers', gender: 'women',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4571?w=600',
    description: 'Cropped cigarette trousers in black stretch wool. Office to dinner, effortlessly.',
    tags: ['black', 'tailored', 'formal', 'cigarette', 'classic', 'office']
  },

  // ─────────── MEN — SHIRTS ─────────────────────────────────────────────────
  {
    name: 'Olive Heritage Shirt',
    price: 1999, category: 'shirts', gender: 'men',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600',
    description: 'A shade drawn from quiet landscapes and timeless taste — this olive shirt carries an effortless depth.',
    tags: ['olive', 'classic', 'earthy', 'smart', 'timeless', 'old-money']
  },
  {
    name: 'Blush Silk-Touch Shirt',
    price: 2199, category: 'shirts', gender: 'men',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600',
    description: 'Soft as a passing moment and just as unforgettable — this blush-toned shirt redefines confidence.',
    tags: ['pink', 'blush', 'soft', 'elegant', 'luxury', 'modern']
  },
  {
    name: 'Azure Minimal Shirt',
    price: 2499, category: 'shirts', gender: 'men',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
    description: 'Clean, sharp, and endlessly composed — this blue shirt reflects a mind that values clarity.',
    tags: ['blue', 'minimal', 'formal', 'smart', 'clean', 'elegant']
  },
  {
    name: 'Pure White Signature Shirt',
    price: 1899, category: 'shirts', gender: 'men',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600',
    description: 'Nothing is more powerful than simplicity done right. This pure white shirt is precision.',
    tags: ['white', 'classic', 'essential', 'formal', 'timeless', 'old-money']
  },

  // ─────────── MEN — TROUSERS ───────────────────────────────────────────────
  {
    name: 'Beige Slim Chino',
    price: 2299, category: 'trousers', gender: 'men',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600',
    description: 'Tailored slim chino in warm beige. Smarter than jeans, more relaxed than wool.',
    tags: ['beige', 'slim', 'chino', 'casual', 'versatile', 'warm']
  },
  {
    name: 'Charcoal Wool Dress Trousers',
    price: 3599, category: 'trousers', gender: 'men',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
    description: 'Mid-rise charcoal wool-blend trousers with a clean break. Boardroom ready.',
    tags: ['charcoal', 'wool', 'formal', 'tailored', 'classic', 'grey']
  },
  {
    name: 'Black Cargo Trousers',
    price: 2599, category: 'trousers', gender: 'men',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600',
    description: 'Relaxed cargo trousers — utilitarian aesthetic with a refined silhouette.',
    tags: ['Black', 'cargo', 'casual', 'relaxed', 'streetwear', 'Black']
  },

  // ─────────── MEN — OUTERWEAR ──────────────────────────────────────────────
  {
    name: 'Cream Silk Heritage Coat',
    price: 8499, category: 'outerwear', gender: 'men',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600',
    description: 'A coat that does not simply exist — it arrives. Crafted from luminous cream silk.',
    tags: ['cream', 'silk', 'luxury', 'elegant', 'royal', 'old-money']
  },
  {
    name: 'Midnight Velvet Sovereign Coat',
    price: 9999, category: 'outerwear', gender: 'men',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
    description: 'Dark as midnight and twice as captivating — this black velvet coat absorbs light and returns only mystery.',
    tags: ['black', 'velvet', 'luxury', 'formal', 'evening', 'old-money']
  },
  {
    name: 'Noir Minimal Jacket',
    price: 3999, category: 'outerwear', gender: 'men',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    description: 'Precision in its purest form. This black jacket strips away excess and leaves only intention.',
    tags: ['black', 'jacket', 'minimal', 'modern', 'casual', 'old-money']
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Product.deleteMany({});
    console.log('Cleared old products');

    const inserted = await Product.insertMany(products);
    console.log(`Seeded ${inserted.length} products successfully`);
    console.log('\nProduct breakdown:');
    console.log(`  Women — Dresses:   ${products.filter(p => p.gender === 'women' && p.category === 'dresses').length}`);
    console.log(`  Women — Shirts:    ${products.filter(p => p.gender === 'women' && p.category === 'shirts').length}`);
    console.log(`  Women — Outerwear: ${products.filter(p => p.gender === 'women' && p.category === 'outerwear').length}`);
    console.log(`  Women — Trousers:  ${products.filter(p => p.gender === 'women' && p.category === 'trousers').length}`);
    console.log(`  Men   — Shirts:    ${products.filter(p => p.gender === 'men' && p.category === 'shirts').length}`);
    console.log(`  Men   — Trousers:  ${products.filter(p => p.gender === 'men' && p.category === 'trousers').length}`);
    console.log(`  Men   — Outerwear: ${products.filter(p => p.gender === 'men' && p.category === 'outerwear').length}`);

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();
// require('dotenv').config();
// const mongoose = require('mongoose');
// const Product  = require('./models/Product');

// // All images reference your local /public/images/ folder.
// // Place your downloaded images there with these exact filenames.
// const products = [

//   // ─────────── WOMEN — DRESSES ───────────────────────────────────────────────
//   {
//     name: 'Ivory Silk Slip Dress',
//     price: 3499,
//     category: 'dresses',
//     gender: 'women',
//     image: '/images/dress14.jpg',
//     description: 'Fluid ivory silk slip with delicate spaghetti straps. Minimalist old-money energy.',
//     tags: ['minimal', 'silk', 'evening', 'ivory', 'slip', 'old-money']
//   },
//   {
//     name: 'Cognac Wrap Midi',
//     price: 2899,
//     category: 'dresses',
//     gender: 'women',
//     image: '/images/dark_blue_dress.png',
//     description: 'Rich cognac wrap dress in crepe — defines the waist, flatters every body type.',
//     tags: ['wrap', 'midi', 'cognac', 'elegant', 'casual', 'date']
//   },
//   {
//   name: 'Phoenix Rebirth Dress',
//   price: 2499,
//   category: 'dresses',
//   gender: 'women',
//   image: '/images/dress4.jpg',
//   description: 'Like a flame rising softly at dawn, this dress captures the essence of quiet transformation. Fluid, powerful, and almost poetic in movement, it feels alive with every step. It is not just a dress — it is a presence, a moment of becoming, where strength meets grace in its purest form.',
//   tags: ['phoenix', 'elegant', 'flowy', 'statement', 'graceful', 'ethereal']
// },
// {
//   name: 'Bloom Reverie Dress',
//   price: 3999,
//   category: 'dresses',
//   gender: 'women',
//   image: '/images/dress10.jpg',
//   description: 'A garden captured in motion — delicate florals unfold across this dress like a quiet daydream. Light, romantic, and effortlessly enchanting, it carries the softness of spring and the charm of slow, golden afternoons. Designed for moments that feel almost too beautiful to be real.',
//   tags: ['floral', 'romantic', 'soft', 'feminine', 'spring', 'dreamy']
// },
// {
//   name: 'Midnight Glitter Dress',
//   price: 2199,
//   category: 'dresses',
//   gender: 'women',
//   image: '/images/gliter_dress.png',
//   description: 'A constellation woven into fabric — this glitter dress catches every flicker of light and turns it into pure magnetism. Bold yet refined, it is made for nights that refuse to be forgotten. You don’t enter the room in this — you arrive, and everything shifts.',
//   tags: ['glitter', 'party', 'night', 'bold', 'shimmer', 'statement']
// },

//   // ─────────── WOMEN — SHIRTS / TOPS ────────────────────────────────────────
// {
//   name: 'Blush Essence Top',
//   price: 1899,
//   category: 'shirts',
//   gender: 'women',
//   image: '/images/top6.jpg',
//   description: 'Soft blush tones meet effortless femininity in a piece that feels like a quiet statement. Light, graceful, and endlessly wearable, this top carries a delicate charm that lingers long after you’ve left the room. It is not just worn — it becomes part of your presence.',
//   tags: ['pink', 'blush', 'soft', 'feminine', 'elegant', 'chic']
// },
// {
//   name: 'Azure Striped Classic Shirt',
//   price: 1599,
//   category: 'shirts',
//   gender: 'women',
//   image: '/images/top10.jpg',
//   description: 'Crisp blue stripes layered over a timeless silhouette — this shirt captures the ease of coastal mornings and polished afternoons. Structured yet relaxed, it moves seamlessly between casual confidence and refined sophistication.',
//   tags: ['blue', 'striped', 'classic', 'smart', 'casual', 'timeless']
// },
// {
//   name: 'Maroon Allure Top',
//   price: 2299,
//   category: 'shirts',
//   gender: 'women',
//   image: '/images/tshirt4.jpg',
//   description: 'Deep maroon, rich with quiet intensity — a shade that speaks before you do. This top wraps you in warmth and subtle drama, designed for moments where elegance meets emotion. Bold, refined, and impossible to ignore.',
//   tags: ['maroon', 'rich', 'elegant', 'bold', 'evening', 'feminine']
// },

//   // ─────────── WOMEN — OUTERWEAR ─────────────────────────────────────────────
//   {
//     name: 'Pink Longline Coat',
//     price: 8999,
//     category: 'outerwear',
//     gender: 'women',
//     image: '/images/coat3.jpg',
//     description: 'Structured pink wool-blend coat falling below the knee. The definition of quiet luxury.',
//     tags: ['Pink', 'wool', 'winter', 'structured', 'old-money', 'longline']
//   },
//   {
//     name: 'Emerald Velvet Blazer',
//     price: 5499,
//     category: 'outerwear',
//     gender: 'women',
//     image: '/images/coat8.jpg',
//     description: 'Deep emerald velvet blazer — wear it as a jacket or a statement piece solo.',
//     tags: ['velvet', 'emerald', 'formal', 'blazer', 'statement', 'green']
//   },
//   {
//     name: 'Ivory Boucle Jacket',
//     price: 6499,
//     category: 'outerwear',
//     gender: 'women',
//     image: '/images/coat6.jpg',
//     description: 'Chanel-inspired ivory boucle jacket with gold button closure. Timeless, elevated.',
//     tags: ['boucle', 'ivory', 'formal', 'classic', 'elegant', 'old-money']
//   },

//   // ─────────── WOMEN — TROUSERS ─────────────────────────────────────────────
//   {
//     name: 'Cream Wide-Leg Trousers',
//     price: 2699,
//     category: 'trousers',
//     gender: 'women',
//     image: '/images/trouser4.jpg',
//     description: 'High-waisted cream palazzo trousers in fluid crepe. Elongating and elegant.',
//     tags: ['wide-leg', 'cream', 'elegant', 'palazzo', 'casual', 'minimal']
//   },
//   {
//     name: 'Black Tailored Cigarette Pants',
//     price: 2899,
//     category: 'trousers',
//     gender: 'women',
//     image: '/images/black_trouser.jpg',
//     description: 'Cropped cigarette trousers in black stretch wool. Office to dinner, effortlessly.',
//     tags: ['black', 'tailored', 'formal', 'cigarette', 'classic', 'office']
//   },

//   // ─────────── MEN — SHIRTS ─────────────────────────────────────────────────
//  {
//   name: 'Olive Heritage Shirt',
//   price: 1999,
//   category: 'shirts',
//   gender: 'men',
//   image: '/images/oliveshirt.jpeg',
//   description: 'A shade drawn from quiet landscapes and timeless taste — this olive shirt carries an effortless depth. Tailored yet relaxed, it feels like something worn on slow afternoons in sunlit estates. Understated, grounded, and undeniably refined — the kind of piece that never asks for attention, yet always receives it.',
//   tags: ['olive', 'classic', 'earthy', 'smart', 'timeless', 'old-money']
// },
// {
//   name: 'Blush Silk-Touch Shirt',
//   price: 2199,
//   category: 'shirts',
//   gender: 'men',
//   image: '/images/pinkshirt.jpg',
//   description: 'Soft as a passing moment and just as unforgettable — this blush-toned shirt redefines confidence with subtlety. It doesn’t shout, it lingers. The fabric glides effortlessly, catching light in the most delicate way. Worn by those who understand that true elegance is never loud, only felt.',
//   tags: ['pink', 'blush', 'soft', 'elegant', 'luxury', 'modern']
// },
// {
//   name: 'Azure Minimal Shirt',
//   price: 2499,
//   category: 'shirts',
//   gender: 'men',
//   image: '/images/blueshirt.jpg',
//   description: 'Clean, sharp, and endlessly composed — this blue shirt reflects a mind that values clarity and control. Every line is intentional, every detail restrained. It is the uniform of quiet achievers, where simplicity becomes the ultimate sophistication.',
//   tags: ['blue', 'minimal', 'formal', 'smart', 'clean', 'elegant']
// },
// {
//   name: 'Pure White Signature Shirt',
//   price: 1899,
//   category: 'shirts',
//   gender: 'men',
//   image: '/images/whiteshirt.jpg',
//   description: 'Nothing is more powerful than simplicity done right. This pure white shirt is precision, discipline, and quiet luxury woven together. Crisp yet effortless, it belongs everywhere — from important mornings to unplanned evenings. A foundation piece that defines the man who wears it.',
//   tags: ['white', 'classic', 'essential', 'formal', 'timeless', 'old-money']
// },

//   // ─────────── MEN — TROUSERS ───────────────────────────────────────────────
//   {
//     name: 'Beige Slim Chino',
//     price: 2299,
//     category: 'trousers',
//     gender: 'men',
//     image: '/images/trouser4.jpg',
//     description: 'Tailored slim chino in warm beige. Smarter than jeans, more relaxed than wool.',
//     tags: ['beige', 'slim', 'chino', 'casual', 'versatile', 'warm']
//   },
//   {
//     name: 'Charcoal Wool Dress Trousers',
//     price: 3599,
//     category: 'trousers',
//     gender: 'men',
//     image: '/images/khakhi.jpg',
//     description: 'Mid-rise charcoal wool-blend trousers with a clean break. Boardroom ready.',
//     tags: ['charcoal', 'wool', 'formal', 'tailored', 'classic', 'grey']
//   },
//   {
//     name: 'Black Cargo Trousers',
//     price: 2599,
//     category: 'trousers',
//     gender: 'men',
//     image: '/images/black_trouser.jpg',
//     description: 'Relaxed cargo trousers — utilitarian aesthetic with a refined silhouette.',
//     tags: ['Black', 'cargo', 'casual', 'relaxed', 'streetwear', 'Black']
//   },

//   // ─────────── MEN — OUTERWEAR ──────────────────────────────────────────────
//   {
//   name: 'Cream Silk Heritage Coat',
//   price: 8499,
//   category: 'outerwear',
//   gender: 'men',
//   image: '/images/creamcoat.png',
//   description: 'A coat that does not simply exist — it arrives. Crafted from luminous cream silk that catches light like quiet wealth, this piece drapes with an almost regal fluidity. Every movement feels intentional, every glance inevitable. It is the kind of coat worn in slow walks through grand corridors, where presence speaks louder than words. Soft, powerful, unforgettable.',
//   tags: ['cream', 'silk', 'luxury', 'elegant', 'royal', 'old-money']
// },
// {
//   name: 'Midnight Velvet Sovereign Coat',
//   price: 9999,
//   category: 'outerwear',
//   gender: 'men',
//   image: '/images/blackcoat.jpg',
//   description: 'Dark as midnight and twice as captivating — this black velvet coat absorbs light and returns only mystery. The texture is deep, almost hypnotic, with a richness that feels untouchable. Designed for evenings where silence holds power and presence commands attention, it wraps you in quiet dominance. Not worn for warmth, but for impact.',
//   tags: ['black', 'velvet', 'luxury', 'formal', 'evening', 'old-money']
// },
// {
//   name: 'Noir Minimal Jacket',
//   price: 3999,
//   category: 'outerwear',
//   gender: 'men',
//   image: '/images/blackjacket.jpg',
//   description: 'Precision in its purest form. This black jacket strips away excess and leaves only intention — sharp lines, effortless structure, and a presence that feels naturally commanding. It is the kind of piece that does not try to impress, yet never goes unnoticed. Understated, controlled, and undeniably powerful.',
//   tags: ['black', 'jacket', 'minimal', 'modern', 'casual', 'old-money']
// },
// ];

// const seed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');

//     await Product.deleteMany({});
//     console.log('Cleared old products');

//     const inserted = await Product.insertMany(products);
//     console.log(`Seeded ${inserted.length} products successfully`);
//     console.log('\nProduct breakdown:');
//     console.log(`  Women — Dresses:   ${products.filter(p => p.gender === 'women' && p.category === 'dresses').length}`);
//     console.log(`  Women — Shirts:    ${products.filter(p => p.gender === 'women' && p.category === 'shirts').length}`);
//     console.log(`  Women — Outerwear: ${products.filter(p => p.gender === 'women' && p.category === 'outerwear').length}`);
//     console.log(`  Women — Trousers:  ${products.filter(p => p.gender === 'women' && p.category === 'trousers').length}`);
//     console.log(`  Men   — Shirts:    ${products.filter(p => p.gender === 'men' && p.category === 'shirts').length}`);
//     console.log(`  Men   — Trousers:  ${products.filter(p => p.gender === 'men' && p.category === 'trousers').length}`);
//     console.log(`  Men   — Outerwear: ${products.filter(p => p.gender === 'men' && p.category === 'outerwear').length}`);

//     process.exit(0);
//   } catch (err) {
//     console.error('Seed failed:', err);
//     process.exit(1);
//   }
// };

// seed();