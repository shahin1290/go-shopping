module.exports = async (_, args, { authService, models }) => {
  // id --> productId
  const { id } = args

  const userId = authService.assertIsAuthorized()

  console.log(id, userId)

  try {
    const user = await models.User.findById(userId).populate({
      path: 'carts',
      populate: { path: 'product' }
    })

    const findCartItemIndex = user.carts.findIndex(
      (cartItem) => cartItem.product.id === id
    )

    if (findCartItemIndex > -1) {
      // A. The new addToCart item is already in cart
      // A.1 Find the cartItem and update in database
      user.carts[findCartItemIndex].quantity += 1

      await models.CartItem.findByIdAndUpdate(
        user.carts[findCartItemIndex].id,
        {
          quantity: user.carts[findCartItemIndex].quantity
        }
      )

      // A.2 Find updated cartItem
      const updatedCartItem = await models.CartItem.findById(
        user.carts[findCartItemIndex].id
      )
        .populate({ path: 'product' })
        .populate({ path: 'user' })

      return updatedCartItem
    } else {
      // B. The new addToCart item is not in cart yet
      // B.1 Create new cartItem
      const cartItem = await models.CartItem.create({
        product: id,
        quantity: 1,
        user: userId
      })

      // B.2 find new cartItem
      const newCartItem = await models.CartItem.findById(cartItem.id)
        .populate({ path: 'product' })
        .populate({ path: 'user' })

      // B.2 Update user.carts
      await models.User.findByIdAndUpdate(userId, {
        carts: [...user.carts, newCartItem]
      })

      return newCartItem
    }
  } catch (error) {
    console.log(error)
  }
}
