const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  total: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem'
    }
  ],
  charge: String
})

const Order = mongoose.model('Order', orderSchema)

module.exports = { Order }
