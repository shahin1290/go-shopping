const { ApolloError } = require('apollo-server-express')
const yup = require('yup')

class EmailExistsError extends ApolloError {
  constructor(message, properties) {
    super(message, 'EMAIL_EXISTS', properties)
  }

  static fromEmail(email) {
    return new EmailExistsError(
      `The email ${email} is already in the database, Please login`,
      {
        email
      }
    )
  }
}

const createUserInputSchema = yup.object().shape({
  name: yup.string().min(2).max(30).lowercase().trim().required(),
  email: yup.string().lowercase().trim().email().required(),
  password: yup.string().min(5).max(50).trim().required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

module.exports = async (root, args, { models, authService }) => {
  console.log(args)
  const normalizedUser = await createUserInputSchema.validate(args, {
    stripUnknown: true
  })
  const existingUser = await models.User.findOne({
    email: normalizedUser.email
  })

  if (existingUser) {
    throw EmailExistsError.fromEmail(normalizedUser.email)
  }

  const newUser = new models.User(normalizedUser)

  const user = await newUser.save()

  if (user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: authService.createAccessToken(user.id).accessToken
    }
  } else {
    throw new Error('Invalid user data')
  }
}
