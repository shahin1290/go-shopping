const { UserInputError } = require('apollo-server-express')
const yup = require('yup')
const jwt = require('jsonwebtoken')

const authorizeInputSchema = yup.object().shape({
  email: yup.string().required().lowercase().trim(),
  password: yup.string().required().trim()
})

module.exports = async (root, args, { models, authService }) => {
  const normalizedAuthorization = await authorizeInputSchema.validate(args, {
    stripUnknown: true
  })

  const { email, password } = normalizedAuthorization

  const user = await models.User.findOne({ email }).populate({
    path: 'carts',
    populate: { path: 'product' }
  })

  if (!user || !(await user.matchPassword(password, user.password))) {
    throw new UserInputError('wrong credentials')
  }

  const token = authService.createAccessToken(user.id, user.name).accessToken

  return {
    ...user._doc,
    id: user._id,
    token
  }
}
