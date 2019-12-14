const Joi = require('@hapi/joi');

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

exports.register = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
