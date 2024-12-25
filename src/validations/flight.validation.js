const Joi = require("joi");

const createFlight = {
    body: Joi.object().keys({
        flightNumber: Joi.string().required(),
        departure: Joi.string().required(),
        destination: Joi.string().required(),
        departureTime: Joi.date().required(),
        arrivalTime: Joi.date().required(),
        airline: Joi.string().required(),
    }),
};

const getFlights = {
    query: Joi.object().keys({
        departure: Joi.string(),
        destination: Joi.string(),
        airline: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getFlight = {
    params: Joi.object().keys({
        flightId: Joi.string().required(),
    }),
};

const updateFlight = {
    params: Joi.object().keys({
        flightId: Joi.string().required(),
    }),
    body: Joi.object()
        .keys({
            flightNumber: Joi.string(),
            departure: Joi.string(),
            destination: Joi.string(),
            departureTime: Joi.date(),
            arrivalTime: Joi.date(),
            airline: Joi.string(),
        })
        .min(1),
};

const deleteFlight = {
    params: Joi.object().keys({
        flightId: Joi.string().required(),
    }),
};

// const searchFlightByNumber = {
//     params: Joi.object().keys({
//         flightNumber: Joi.string().required(),
//     }),
// };

module.exports = {
    createFlight,
    getFlights,
    getFlight,
    updateFlight,
    deleteFlight
    // searchFlightByNumber,
};
