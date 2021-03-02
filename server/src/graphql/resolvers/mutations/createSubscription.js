const stripe = require('../../../stripe')
module.exports = async (_, { source }, { authService, models }) => {
  const userId = authService.assertIsAuthorized()

  const user = await models.User.findById(userId)

  console.log(user)

  const customer = await stripe.customers.create({
    email: user.email,
    source
  })
  user.stripeId = customer.id
  user.type = 'paid'

  await user.save

  return user
}
