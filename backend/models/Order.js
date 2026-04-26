const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    price:    { type: Number }
  }],
  totalAmount:       { type: Number, required: true },
  razorpayOrderId:   { type: String },
  razorpayPaymentId: { type: String },
  status:            { type: String, default: 'pending' }, // pending / paid / failed
  shippingAddress: {
    name:    String,
    phone:   String,
    address: String,
    city:    String,
    pincode: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);