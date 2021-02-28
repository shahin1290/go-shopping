const Joi = require('@hapi/joi')
const { registerValidate } = require('../../validators/user')

module.exports = async (root, args, { models }) => {
  Joi.assert(args, registerValidate, { abortEarly: false })

  console.log(args);

  const newUser = new models.User(args)

  const user = await newUser.save()

  return user
}
