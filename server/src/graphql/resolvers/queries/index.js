const { NotFoundError } = require('../../../errors')

module.exports = {
  allProducts: async (_, {}, { models }) => {
    return await models.Product.find({}).populate('photos')
  },

  allPhotos: async (_, {}, { models }) => {
    return await models.Photo.find({}).populate('product')
  },

  product: async (_, { id }, { models }) => {
    const product = await models.Product.findById(id)

    if (!product) {
      throw new NotFoundError()
    }
    return product
  },

  me: async (root, args, { models, authService }) => {
    const userId = authService.assertIsAuthorized()
    
    const user = await models.User.findById(userId)

    return user
  },

  allOrders: async (_, {}, { models, authService }) => {
    authService.assertIsAuthorized()
    return await models.Order.find({})
      .populate('user')
      .populate({
        path: 'items',
        model: 'OrderItem',
        populate: { path: 'photo', model: 'Photo' }
      })
  },
  order: async (_, { id }, { models, authService }) => {
    authService.assertIsAuthorized()
    return await models.Order.findById(id)
      .populate('user')
      .populate({
        path: 'items',
        model: 'OrderItem',
        populate: { path: 'photo', model: 'Photo' }
      })
  }
}
