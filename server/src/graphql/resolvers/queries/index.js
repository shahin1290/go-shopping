module.exports = {
  allProducts: async (_, {}, { models }) => {
    return await models.Product.find({}).populate('photos')
  },

  allPhotos: async (_, {}, { models }) => {
    return await models.Photo.find({}).populate('product')
  },

  product: async (_, { id }, { models }) => {
    return await models.Product.findById(id).populate('photos')
  },

  me: async (root, args, { models, authService }) => {
    const userId = authService.assertIsAuthorized()
    const products = await models.User.findById(userId).populate({
      path: 'carts',
      model: 'CartItem',
      populate: {
        path: 'product',
        model: 'Product',
        populate: { path: 'photos', model: 'Photo' }
      }
    })

    return products
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
