const { UserInputError } = require('apollo-server-express')

module.exports = async (_, args, { models }) => {
  const userId = authService.assertIsAuthorized()

  const user = await models.User.findById(userId)

  const product = await models.Product.findById(args.id).populate({
    path: 'user'
  })

  if (!(user.role === 'admin' || product.user.id === userId)) {
    throw new ForbiddenError('User is not authorized to edit the product')
  }

  const { id, name, description, price } = args

  const product = await models.Product.findById(id)
  product.name = name
  product.description = description
  product.price = price

  try {
    await product.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args
    })
  }

  return product
}
