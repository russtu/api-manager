const Joi = require('joi')
  .extend(require('@joi/date'));


const playerRegisterSchema = Joi.object({

  salary: Joi
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

    playerId: Joi
    .number()
    .integer()
    .min(1)
    .required()
    .messages({
      'any.required': 'clubId is required',
      'number.base': 'The value of clubId is not a number or could not be cast to a number',
      'number.integer': 'The number of clubId is not a valid integer.',
      'number.min': 'clubId value should be greater than 0 ',
    }),

})


module.exports = playerRegisterSchema