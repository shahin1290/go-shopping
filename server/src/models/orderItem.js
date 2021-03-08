const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  },
  quantity: Number,
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  } 
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

module.exports = { OrderItem }
