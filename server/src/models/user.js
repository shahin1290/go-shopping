const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  carts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem'
    }
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
})

schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
})

schema.methods.matchPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', schema)

module.exports = { User }
