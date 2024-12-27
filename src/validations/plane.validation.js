const Joi = require("joi");

const createPlane = {
  body: Joi.object().keys({
    planeName: Joi.string().required(),
    maxSeats: Joi.number().required().positive(),
    airline: Joi.string().required(),
    seats: Joi.array()
      .items(
        Joi.object().keys({
          seatName: Joi.string().required(),
          seatType: Joi.string().optional().valid("business", "common"),
          disable: Joi.boolean().required(),
        })
      )
      .required(),
  }),
};

const updatePlane = {
  body: Joi.object().keys({
    planeName: Joi.string(),
    maxSeats: Joi.number().positive(),
    airline: Joi.string(),
    seats: Joi.array().items(
      Joi.object().keys({
        seatName: Joi.string(),
        seatType: Joi.string(),
        disable: Joi.boolean(),
      })
    ),
  }),
};

module.exports = {
  createPlane,
  updatePlane,
};
