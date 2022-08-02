const Joi = require('joi')
  .extend(require('@joi/date'));


const coachCreateSchema = Joi.object({
  name: Joi
    .string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'any.required': 'name is required',
      'string.empty': 'name  can not be empty',
      'string.min': 'name is should be between 1 and 100 characters',
      'string.max': 'name is  should be between 1 and 100 characters'
    }),

  country: Joi
    .string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'any.required': 'country is required',
      'string.empty': 'country can not be empty',
      'string.min': 'country is should be between 1 and 100 characters',
      'string.max': 'country is  should be between 1 and 100 characters'
    }),

  age: Joi
    .number()
    .integer()
    .min(15)
    .required()
    .messages({
      'any.required': 'age is required',
      'number.base': 'The value of age is not a number or could not be cast to a number',
      'number.integer': 'The number of age is not a valid integer.',
      'number.min': 'age value should be greater than 15 ',
    }),



})


module.exports = coachCreateSchema