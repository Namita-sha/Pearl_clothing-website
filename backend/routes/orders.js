const express   = require('express');
const router    = express.Router();
const Razorpay  = require('razorpay');
const crypto    = require('crypto');
const Order     = require('../models/Order');
const protect   = require('../middleware/auth');

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/orders/create-razorpay-order
// Called when user clicks "Pay Now" — creates a Razorpay order
router.post('/create-razorpay-order', protect, async (req, res) => {
  try {
    const { totalAmount } = req.body; // amount in INR

    const options = {
      amount:   totalAmount * 100, // Razorpay needs paise (1 INR = 100 paise)
      currency: 'INR',
      receipt:  `receipt_${Date.now()}`
    };

    const razorpayOrder = await razorpay.orders.create(options);
    res.json({ orderId: razorpayOrder.id, amount: options.amount });
  } catch (err) {
    res.status(500).json({ message: 'Error creating Razorpay order' });
  }
});

// POST /api/orders/verify-payment
// Called after user pays — verifies signature and saves order to DB
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      totalAmount,
      shippingAddress
    } = req.body;

    // Verify signature (security check)
    const body      = razorpay_order_id + '|' + razorpay_payment_id;
    const expected  = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Save order to DB
    const order = new Order({
      user:              req.user.id,
      items,
      totalAmount,
      razorpayOrderId:   razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status:            'paid',
      shippingAddress
    });
    await order.save();

    res.json({ message: 'Payment verified, order placed!', order });
  } catch (err) {
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

// GET /api/orders/my-orders — user's order history
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;