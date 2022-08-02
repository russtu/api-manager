const Joi = require('joi')
  .extend(require('@joi/date'));


const budgetSchema = Joi.object({

  newBudget: Joi
    .number()
    .integer()
    .min(1)
    .required()
    .messages({
      'any.required': 'salary is required',
      'number.base': 'The value of salary is not a number or could not be cast to a number',
      'number.integer': 'The number of salary is not a valid integer.',
      'number.min': 'salary value should be greater than 1 ',
    }),

})


module.exports = budgetSchema