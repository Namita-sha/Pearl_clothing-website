const express                   = require('express');
const router                    = express.Router();
const { GoogleGenerativeAI }    = require('@google/generative-ai');
const Product                   = require('../models/Product');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─────────────────────────────────────────────
// POST /api/ai/style-me
// Supports two modes:
//   1. Photo mode  — imageBase64 + mimeType provided
//   2. Form mode   — userProfile object provided (no image)
// ─────────────────────────────────────────────
router.post('/style-me', async (req, res) => {
  try {
    const {
      imageBase64,
      mimeType,
      gender,
      occasion,
      userProfile,   // { skinTone, undertone, faceShape, hairType, hairColor, height, weight, bodyType, stylePreference, fitPreference, budget, preferredColors, avoidColors }
      quickMode      // boolean — skip profile, show best sellers
    } = req.body;

    // Fetch products from DB
    const products = await Product.find(
      gender ? { gender } : {}
    ).limit(30);

    const productList = products.map(p =>
      `- ${p.name} | category: ${p.category} | price: ₹${p.price} | tags: ${(p.tags || []).join(', ')} | desc: ${p.description || ''}`
    ).join('\n');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    let prompt = '';

    if (quickMode) {
      // ── Quick mode: no profile, just recommend top picks ──
      prompt = `
You are PEARL — an ultra-premium luxury AI fashion stylist. The user skipped the style quiz.

Gender preference: ${gender || 'unisex'}
Occasion: ${occasion || 'casual'}

Our current inventory:
${productList}

Without any personal analysis, recommend the 4 most stylish, versatile pieces from our inventory that work for most people. Prioritize elegance and versatility.

Respond ONLY in this exact JSON (no markdown, no extra text):
{
  "mode": "quick",
  "analysis": {
    "skinTone": "Universal",
    "bodyType": "All body types",
    "styleVibe": "Effortlessly Elegant"
  },
  "recommendations": [
    {
      "productName": "exact name from inventory",
      "category": "category from inventory",
      "price": price_number,
      "reason": "why this is a universal wardrobe essential",
      "stylingTip": "how to wear and style it"
    }
  ],
  "colorPalette": ["color1", "color2", "color3"],
  "overallTip": "one powerful style message"
}
`;
    } else if (imageBase64) {
      // ── Photo mode: analyze image + optional profile ──
      const profileContext = userProfile ? `
User's additional preferences:
- Style preference: ${userProfile.stylePreference || 'not specified'}
- Occasion: ${occasion || userProfile.occasion || 'casual'}
- Budget: ${userProfile.budget || 'not specified'}
- Preferred colors: ${userProfile.preferredColors || 'not specified'}
- Colors to avoid: ${userProfile.avoidColors || 'none'}
- Fit preference: ${userProfile.fitPreference || 'regular'}
` : '';

      prompt = `
You are PEARL — an ultra-premium luxury AI fashion stylist for a high-end brand.

Analyze this person's photo with precision.
${profileContext}

Our current inventory:
${productList}

Perform a thorough appearance analysis:
1. Skin tone (fair/light/medium/tan/deep) and undertone (warm/cool/neutral)
2. Face shape (oval/round/square/heart/oblong)
3. Body type and proportions
4. Current style vibe from their photo

Then recommend exactly 3 pieces from our inventory that would suit this person. Be specific, aesthetic, and premium. DO NOT give generic advice.

Respond ONLY in this exact JSON (no markdown, no extra text):
{
  "mode": "photo",
  "analysis": {
    "skinTone": "...",
    "undertone": "warm/cool/neutral",
    "faceShape": "...",
    "bodyType": "...",
    "styleVibe": "..."
  },
  "recommendations": [
    {
      "productName": "exact name from inventory",
      "category": "category from inventory",
      "price": price_number,
      "reason": "why this suits their specific features",
      "stylingTip": "exact styling instructions"
    }
  ],
  "colorPalette": ["hex or color name 1", "hex or color name 2", "hex or color name 3"],
  "avoidColors": ["color to avoid 1", "color to avoid 2"],
  "overallTip": "one powerful, premium style message personalized to them"
}
`;
    } else if (userProfile) {
      // ── Form/questionnaire mode: full profile, no image ──
      prompt = `
You are PEARL — an ultra-premium luxury AI personal fashion stylist for an exclusive brand.
Your tone is precise, aesthetic, and elevated. DO NOT give generic suggestions. Every word must feel tailored.

User Data:
Appearance:
- Skin Tone: ${userProfile.skinTone || 'not specified'}
- Undertone: ${userProfile.undertone || 'not specified'}
- Face Shape: ${userProfile.faceShape || 'not specified'}
- Hair: ${userProfile.hairType || ''} ${userProfile.hairColor || ''}
Body:
- Height: ${userProfile.height || 'not specified'}
- Weight: ${userProfile.weight || 'not specified'}
- Body Type: ${userProfile.bodyType || 'not specified'}
Preferences:
- Style: ${userProfile.stylePreference || 'not specified'}
- Occasion: ${occasion || userProfile.occasion || 'casual'}
- Fit Preference: ${userProfile.fitPreference || 'regular fit'}
- Budget: ${userProfile.budget || 'not specified'}
- Preferred Colors: ${userProfile.preferredColors || 'no preference'}
- Avoid Colors: ${userProfile.avoidColors || 'none'}

Our current inventory (ONLY recommend from this list):
${productList}

Your task:
1. Recommend exactly 3 complete outfit ideas using pieces from our inventory
2. For each outfit: explain WHY it works for this person's specific features, body type, and undertone
3. Suggest a personal color palette based on their undertone and skin tone
4. Suggest accessories (even if not in our inventory) — bags, footwear, perfume notes
5. Give one powerful, memorable style tip that feels written only for them

Respond ONLY in this exact JSON (no markdown, no extra text):
{
  "mode": "questionnaire",
  "analysis": {
    "skinTone": "${userProfile.skinTone || ''}",
    "undertone": "${userProfile.undertone || ''}",
    "faceShape": "${userProfile.faceShape || ''}",
    "bodyType": "${userProfile.bodyType || ''}",
    "styleVibe": "AI-determined style vibe for this person"
  },
  "recommendations": [
    {
      "productName": "exact name from inventory",
      "category": "category",
      "price": price_number,
      "outfitIdea": "complete outfit description: top + bottom + footwear",
      "reason": "specific why this works for their skin tone, body type, and undertone",
      "stylingTip": "precise styling instruction"
    }
  ],
  "colorPalette": {
    "bestColors": ["color1", "color2", "color3", "color4"],
    "avoidColors": ["color1", "color2"],
    "why": "one sentence explanation tied to their undertone"
  },
  "accessories": {
    "bags": "specific suggestion",
    "footwear": "specific suggestion",
    "perfumeNotes": "fragrance profile that matches their vibe"
  },
  "overallTip": "one powerful, personalized style mantra for this person"
}
`;
    } else {
      return res.status(400).json({ message: 'Provide either an image, userProfile, or set quickMode to true.' });
    }

    let result;

    if (imageBase64 && !quickMode) {
      result = await model.generateContent([
        {
          inlineData: {
            mimeType: mimeType || 'image/jpeg',
            data: imageBase64
          }
        },
        prompt
      ]);
    } else {
      result = await model.generateContent(prompt);
    }

    const text = result.response.text();

    // Strip markdown code fences if present
    const cleaned = text.replace(/```json|```/g, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json({ message: 'AI response parsing error' });

    const parsed = JSON.parse(jsonMatch[0]);

    // Attach full product objects for matched recommendations
    const enriched = await Promise.all(
      (parsed.recommendations || []).map(async (rec) => {
        const product = await Product.findOne({
          name: { $regex: rec.productName, $options: 'i' }
        });
        return { ...rec, product: product || null };
      })
    );

    parsed.recommendations = enriched;
    res.json(parsed);

  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ message: 'AI styling failed', error: err.message });
  }
});

module.exports = router;