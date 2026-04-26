const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const protect = require('../middleware/auth');

// We store cart in frontend localStorage for speed.
// Wishlist is stored in DB (needs login).

// GET /api/cart/wishlist
router.get('/wishlist', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

// POST /api/cart/wishlist/:productId — toggle wishlist
router.post('/wishlist/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const pid  = req.params.productId;

    const index = user.wishlist.indexOf(pid);
    if (index === -1) {
      user.wishlist.push(pid);
    } else {
      user.wishlist.splice(index, 1);
    }
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error updating wishlist' });
  }
});

module.exports = router;