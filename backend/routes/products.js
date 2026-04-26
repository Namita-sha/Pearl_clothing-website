const express  = require('express');
const router   = express.Router();
const Product  = require('../models/Product');
const protect  = require('../middleware/auth');

// GET /api/products — get all, with optional filters
router.get('/', async (req, res) => {
  try {
    const { gender, category, search } = req.query;
    let filter = {};
    if (gender)   filter.gender   = gender;
    if (category) filter.category = category;
    if (search)   filter.name     = { $regex: search, $options: 'i' };

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// GET /api/products/:id — single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// POST /api/products — add product (admin use)
router.post('/', protect, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product' });
  }
});

module.exports = router;