const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getReceiptByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getReceiptByUserId,
};
