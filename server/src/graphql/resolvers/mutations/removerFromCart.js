module.exports = async (_, args, { authService, models }) => {
  const { id } = args

  const userId = authService.assertIsAuthorized()
  const user = await models.User.findById(userId)

  // Find cart from given id
  const cart = await models.CartItem.findById(id)

  // TODO: user id from request --> Find user
  // const userId = "5e15cb313cc0bd1270a2180d"

  // Check ownership of the cart
  if (cart.user.toString() !== userId) {
    throw new Error('Not authorized.')
  }

  // Delete cart
  const deletedCart = await models.CartItem.findByIdAndRemove(id)

  // Update user's carts
  const updatedUserCarts = user.carts.filter(
    (cartId) => cartId.toString() !== deletedCart.id.toString()
  )

  await models.User.findByIdAndUpdate(userId, { carts: updatedUserCarts })

  return deletedCart
}
