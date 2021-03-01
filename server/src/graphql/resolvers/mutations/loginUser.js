const { UserInputError } = require('apollo-server-express')
const yup = require('yup')

const authorizeInputSchema = yup.object().shape({
  email: yup.string().required().lowercase().trim(),
  password: yup.string().required().trim()
})

module.exports = async (root, args, { authService, models }) => {
  const normalizedAuthorization = await authorizeInputSchema.validate(args, {
    stripUnknown: true
  })

  const { email, password } = normalizedAuthorization

  const user = await models.User.findOne({ email })

  if (!user || !(await user.matchPassword(args.password, user.password))) {
    throw new UserInputError('wrong credentials')
  }

  return {
    ...authService.createAccessToken(user.id)
  }
}
