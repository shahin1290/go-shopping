const stripe = require('../../../utils/stripe')

module.exports = async (_, { token }, { authService, models }) => {
  // Check if user logged in
  const userId = authService.assertIsAuthorized()

  // Query user from the database
  const user = await models.User.findById(userId).populate({
    path: 'carts',
    populate: { path: 'product' }
  })

  const cartItems = user.carts.filter((cartItem) => cartItem.product)

  const amount = cartItems.reduce(function (tally, cartItem) {
    return tally + cartItem.quantity * cartItem.product.price
  }, 0)

  // Create the charge with stripe

     const charge = await stripe.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token
    })
    .catch((err) => {
      console.log(err)
      throw new Error(err.message)
    }) 

  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: cartItem.product.photos[0],
      user: userId
    }
    return orderItem
  })

  const newOrderItems = await models.OrderItem.create(orderItems)

  // Create order

  const order = await models.Order.create({
    total: charge.amount,
    charge: charge.id,
    items: newOrderItems.map((orderItem) => orderItem.id)
  })

  // Delete cartItem from the database
  const deleteCartItems = async () => {
    return Promise.all(
      user.carts.map((cart) => models.CartItem.findByIdAndRemove(cart.id))
    )
  }

  await deleteCartItems()

  // Update user info in the database
  await models.User.findByIdAndUpdate(userId, {
    carts: [],
    orders: !user.orders ? [order.id] : [...user.orders, order.id]
  })

  // return order
  return models.Order.findById(order.id)
    .populate({ path: 'user' })
    .populate({ path: 'items', populate: { path: 'product' } }) 
}
