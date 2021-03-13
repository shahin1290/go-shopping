const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      minlength: 10
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    image: {
      type: String,
      required: true
    },

    brand: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', schema)
module.exports = { Product }
