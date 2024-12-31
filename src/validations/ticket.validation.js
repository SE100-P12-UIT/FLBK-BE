const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createTicket = {
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId).required(),
      passenger: Joi.array()
        .items(
          Joi.object().keys({
            title: Joi.string().required(),
            name: Joi.string().required(),
            dateOfBirth: Joi.date().required(),
          })
        )
        .required(),
      departureFlight: Joi.object()
        .keys({
          flightName: Joi.string().required(),
          departureAirport: Joi.string().required(),
          arrivalAirport: Joi.string().required(),
          departureTime: Joi.date().required(),
          seatType: Joi.string().required(),
          totalPrice: Joi.number().required(),
        })
        .required(),
      returnFlight: Joi.object().keys({
        flightName: Joi.string().optional(),
        departureAirport: Joi.string().optional(),
        arrivalAirport: Joi.string().optional(),
        departureTime: Joi.date().optional(),
        seatType: Joi.string().optional(),
        totalPrice: Joi.number().optional(),
      }),
    })
    .optional(),
};

const getTickets = {};

module.exports = {
  createTicket,
};
