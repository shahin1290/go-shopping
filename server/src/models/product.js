const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 20,
  },
  description: {
    type: String,
    minlength: 10,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});

const Product = mongoose.model('Product', schema);
module.exports = { Product };
