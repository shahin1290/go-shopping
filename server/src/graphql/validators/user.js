import Joi from '@hapi/joi'

const email = Joi.string().email().required().label('Email')
const name = Joi.string().max(254).required().label('name')
const password = Joi.string()
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/)
  .required()
  .messages({
    'string.pattern.base':
      'must have eight characters, at least one lowercase letter, one uppercase letter, one digit and one special character'
  })

export const signupValidate = Joi.object().keys({
  email,
  name,
  password
})

export const signinValidate = Joi.object().keys({
  email,
  password
})
