const stripe = require('../../../utils/stripe')

module.exports = async (
  _,
  { amount, token },
  { authService, models },
  info
) => {
  console.log(token)
  // Check if user logged in
  const userId = authService.assertIsAuthorized()

  // Query user from the database
  const user = await models.User.findById(userId).populate({
    path: 'carts',
    populate: { path: 'product' }
  })

  console.log(user, amount, token);

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

  console.log(charge)

  /* // Create charge with omise
  let customer

  // Credit Card: User use existing card
  if (amount && cardId && !token && !return_uri) {
    const cust = await retrieveCustomer(cardId)

    if (!cust) throw new Error('Cannot process payment')

    customer = cust
  }

  // Credit Card: User use new card
  if (amount && token && !cardId && !return_uri) {
    const newCustomer = await createCustomer(user.email, user.name, token)

    if (!newCustomer) throw new Error('Cannot process payment')

    customer = newCustomer

    // update user'cards field
    const {
      id,
      expiration_month,
      expiration_year,
      brand,
      last_digits
    } = newCustomer.cards.data[0]

    const newCard = {
      id: newCustomer.id,
      cardInfo: {
        id,
        expiration_month,
        expiration_year,
        brand,
        last_digits
      }
    }

    await User.findByIdAndUpdate(userId, { cards: [newCard, ...user.cards] })
  }

  let charge

  if (token && return_uri) {
    // Internet Banking
    charge = await createChargeInternetBanking(amount, token, return_uri)
  } else {
    // Credit Card
    charge = await createCharge(amount, customer.id)
  }

  if (!charge)
    throw new Error('Something went wrong with payment, please try again.')

  // Convert cartItem to OrderItem
  const convertCartToOrder = async () => {
    return Promise.all(
      user.carts.map((cart) =>
        OrderItem.create({
          product: cart.product,
          quantity: cart.quantity,
          user: cart.user
        })
      )
    )
  }

  // Create order
  const orderItemArray = await convertCartToOrder()

  const order = await Order.create({
    user: userId,
    items: orderItemArray.map((orderItem) => orderItem.id),
    authorize_uri: charge.authorize_uri
  })

  // Delete cartItem from the database
  const deleteCartItems = async () => {
    return Promise.all(
      user.carts.map((cart) => CartItem.findByIdAndRemove(cart.id))
    )
  }

  await deleteCartItems()

  // Update user info in the database
  await User.findByIdAndUpdate(userId, {
    carts: [],
    orders: !user.orders ? [order.id] : [...user.orders, order.id]
  })

  // return order
  return Order.findById(order.id)
    .populate({ path: 'user' })
    .populate({ path: 'items', populate: { path: 'product' } }) */
}
