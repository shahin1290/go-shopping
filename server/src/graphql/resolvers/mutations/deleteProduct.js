const { UserInputError, ForbiddenError } = require('apollo-server-express')
const cloudinary = require('cloudinary')

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = async (_, args, { models, authService }) => {
  const userId = authService.assertIsAuthorized()

  const user = await models.User.findById(userId)

  const product = await models.Product.findById(args.id).populate({
    path: 'user'
  })

  if (!(user.role === 'admin' || product.user.id === userId)) {
    throw new ForbiddenError('User is not authorized to delete the product')
  }

  try {
    const deletedProduct = await models.Product.findByIdAndDelete(args.id)
    const photo = await models.Photo.findById(deletedProduct.photos[0]._id)
    await photo.remove()
    await cloudinary.uploader.destroy(photo.cloudinary_id)
    return deletedProduct
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args
    })
  }
}
