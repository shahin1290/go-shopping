const { UserInputError } = require('apollo-server-express')

module.exports = async (_, args, { models }) => {
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
