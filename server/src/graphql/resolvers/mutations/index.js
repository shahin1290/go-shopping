const createProduct = require('./createProduct')
const updateProduct = require('./updateProduct')
const deleteProduct = require('./deleteProduct')
const registerUser = require('./registerUser')
const loginUser = require('./loginUser')
const createOrder = require('./createOrder')
const addToCart = require('./addToCart')
const removeFromCart = require('./removerFromCart')

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  registerUser,
  loginUser,
  createOrder,
  addToCart,
  removeFromCart
}
