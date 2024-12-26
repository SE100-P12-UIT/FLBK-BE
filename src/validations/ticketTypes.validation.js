const Joi = require("joi");

const createTicketType = {
  body: Joi.object().keys({
    typeName: Joi.string().required().valid("business", "common"),
    coefficient: Joi.number().required(),
  }),
};

const updateTicketType = {
  body: Joi.object().keys({
    typeName: Joi.string(),
    coefficient: Joi.number(),
  }),
};

module.exports = {
  createTicketType,
  updateTicketType,
};
