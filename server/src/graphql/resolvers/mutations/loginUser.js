const { UserInputError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const yup = require('yup')

const authorizeInputSchema = yup.object().shape({
  email: yup.string().required().lowercase().trim(),
  password: yup.string().required().trim()
})

module.exports = async (root, args, { models }) => {
  const normalizedAuthorization = await authorizeInputSchema.validate(args, {
    stripUnknown: true
  })

  const { email, password } = normalizedAuthorization

  const user = await models.User.findOne({ email: args.email })

  if (!user || !(await user.matchPassword(args.password, user.password))) {
    throw new UserInputError('wrong credentials')
  }

  const userForToken = {
    name: user.name,
    id: user._id
  }

  return {
    value: jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })
  }
}
