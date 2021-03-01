module.exports = {
  allProducts: async (_, {}, { models }) => {
    return await models.Product.find({}).populate('photos');
  },

  allPhotos: async (_, {}, { models }) => {
    return await models.Photo.find({}).populate('product');
  },

  product: async (_, { id }, { models }) =>
    await models.Product.findById(id).populate('photos'),

  me: async(root, args, { models, authService}) => {
    const userId = authService.assertIsAuthorized()
    return await models.User.findById(userId)
  },
};
