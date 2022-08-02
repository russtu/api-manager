const Joi = require('joi')
  .extend(require('@joi/date'));


const clubSchema = Joi.object({
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

  location: Joi
    .string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'any.required': 'location is required',
      'string.empty': 'location can not be empty',
      'string.min': 'location is should be between 1 and 100 characters',
      'string.max': 'location is  should be between 1 and 100 characters'
    }),

  budget: Joi
    .number()
    .integer()
    .min(1)
    .required()
    .messages({
      'any.required': 'budget is required',
      'number.base': 'The value of budget is not a number or could not be cast to a number',
      'number.integer': 'The number of budget is not a valid integer.',
      'number.min': 'budget should be greater than 1 character',
    }),

})


module.exports = clubSchema