const Joi = require('@hapi/joi')

const email = Joi.string().email().required().label('Email')
const name = Joi.string().max(254).required().label('Name')
const password = Joi.string()
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/)
  .required()
  .label('Password')
  .messages({
    'string.pattern.base':
      'must have eight characters, at least one lowercase letter, one uppercase letter, one digit and one special character'
  })

const registerValidate = Joi.object().keys({
  email,
  name,
  password
})

const logingValidate = Joi.object().keys({
  email,
  password
})

module.exports = { registerValidate, logingValidate }
