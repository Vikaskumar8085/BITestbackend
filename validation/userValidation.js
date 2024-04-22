const Joi = require("joi");

// register validate
const registervalidate = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(10).required(),
  password: Joi.string().min(6).max(12).required(),
});
const loginvalidate = Joi.object({
  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(12).required(),
});

module.exports = {
  registervalidate,
  loginvalidate,
};
