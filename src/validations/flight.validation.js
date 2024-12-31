const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createFlight = {
  body: Joi.object().keys({
    flightName: Joi.string().required(),

    departureAirport: Joi.string().required(),
    arrivalAirport: Joi.string().required(),
    departureTime: Joi.date().required(),
    duration: Joi.number().required(),
    price: Joi.number().positive().required(),
    plane: Joi.object()
      .keys({
        planeName: Joi.string().required(),
        airline: Joi.string().required(),
      })
      .required(),
    seats: Joi.array()
      .items(
        Joi.object({
          seatName: Joi.string().required(),
          seatType: Joi.string().optional().valid("business", "common"),
          isAvailable: Joi.boolean().required(),
        })
      )
      .required(),
  }),
};

const getFlights = {
  query: Joi.object().keys({
    planeId: Joi.string().custom(objectId),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    sortBy: Joi.string(),
  }),
};

const getFlight = {
  params: Joi.object().keys({
    flightId: Joi.string().custom(objectId).required(),
  }),
};

const updateFlight = {
  params: Joi.object().keys({
    flightId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      flightName: Joi.string(),
      departureAirport: Joi.string(),
      arrivalAirport: Joi.string(),
      departureTime: Joi.date(),
      duration: Joi.number(),
      price: Joi.number().positive(),
      plane: Joi.object().keys({
        planeName: Joi.string(),
        airline: Joi.string(),
      }),
      seats: Joi.array().items(
        Joi.object({
          seatName: Joi.string().required(),
          seatType: Joi.string().optional().valid("business", "common"),
          isAvailable: Joi.boolean(),
        })
      ),
    })
    .min(1),
};

const deleteFlight = {
  params: Joi.object().keys({
    flightId: Joi.string().custom(objectId).required(),
  }),
};

const getFlightByArrivalAirport = {
  params: Joi.object().keys({
    arrivalAirport: Joi.string().required(),
  }),
};

const getFlightByDepartureAirport = {
  params: Joi.object().keys({
    departureAirport: Joi.string().required(),
  }),
};

const getFlightByDepartureTime = {
  params: Joi.object().keys({
    departureTime: Joi.string().isoDate().required(),
  }),
};

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  updateFlight,
  deleteFlight,
  getFlightByArrivalAirport,
  getFlightByDepartureAirport,
  getFlightByDepartureTime,
};
