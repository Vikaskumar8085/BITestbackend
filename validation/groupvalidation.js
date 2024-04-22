const Joi = require("joi");

const creategroupvalidate = Joi.object({
  creator_id: Joi.string().required(),
  groupName: Joi.string().min(6).max(50).empty().required(),
});

module.exports = {
  creategroupvalidate,
};
