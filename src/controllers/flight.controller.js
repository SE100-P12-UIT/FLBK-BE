const ApiError = require("../utils/ApiError");
const flightService = require("../services/flight.service");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const createFlight = catchAsync(async (req, res) => {
    const flight = await flightService.createFlight(req.body);
    res.status(201).send(flight);
});

const getFlights = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["departureAirport", "arrivalAirport", "departureTime", "price"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await flightService.queryFlights(filter, options);
    res.status(200).send(result);
});

const getFlight = catchAsync(async (req, res) => {
    const flight = await flightService.getFlightById(req.params.flightId);
    if (!flight) {
        throw new ApiError(404, "Flight not found");
    }
    res.status(200).send(flight.toJSON());
});

const updateFlight = catchAsync(async (req, res) => {
    const flight = await flightService.updateFlightById(req.params.flightId, req.body);
    res.status(200).send(flight);
});

const deleteFlight = catchAsync(async (req, res) => {
    const flight = await flightService.getFlightById(req.params.flightId);
    if (!flight) {
        throw new ApiError(404, "Flight not found");
    }
    await flightService.deleteFlightById(req.params.flightId);
    res.status(204).send();
});

module.exports = {
    createFlight,
    getFlights,
    getFlight,
    updateFlight,
    deleteFlight,
};
