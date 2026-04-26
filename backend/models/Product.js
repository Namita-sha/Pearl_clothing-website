const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  image:       { type: String },
  category:    { type: String },  // dresses, shirts, outerwear, etc.
  gender:      { type: String },  // men / women / kids
  description: { type: String },
  stock:       { type: Number, default: 10 },
  tags:        [String]           // for AI recommendations
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);