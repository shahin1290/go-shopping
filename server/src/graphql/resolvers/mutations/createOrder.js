const stripe = require('../../../utils/stripe')

module.exports = async (
  _,
  { amount, token },
  { authService, models },
  info
) => {
  console.log(models.User, models.OrderItem)
  // Check if user logged in
  const userId = authService.assertIsAuthorized()

  // Query user from the database
  const user = await models.User.findById(userId).populate({
    path: 'carts',
    populate: { path: 'product' }
  })

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

  const orderItems = user.carts.map((cart) => {
    const orderItem = {
      product: cart.product,
      quantity: cart.quantity,
      user: cart.user
    }
    return orderItem
  })

  const newOrderItems = await models.OrderItem.create(orderItems)

  // Create order

  const order = await models.Order.create({
    user: userId,
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
