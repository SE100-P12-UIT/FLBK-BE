const ApiError = require("../utils/ApiError");
const flightService = require("../services/flight.service");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

const createFlight = catchAsync(async (req, res) => {
  const flight = await flightService.createFlight(req.body);
  res.status(201).send(flight);
});

const getFlights = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["planeId"]);
  const options = pick(req.query, ["page", "limit", "sortBy"]);
  const result = await flightService.queryFlights(filter, options);
  res.status(200).send(result);
});

const getFlight = catchAsync(async (req, res) => {
  const flight = await flightService.getFlightById(req.params.flightId);
  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }
  res.status(200).send(flight);
});

const updateFlight = catchAsync(async (req, res) => {
  const flight = await flightService.updateFlightById(
    req.params.flightId,
    req.body
  );
  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }
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

const getFlightByDepartureAirport = catchAsync(async (req, res) => {
  const flights = await flightService.getFlightByDepartureAirport(
    req.params.departureAirport
  );
  res.status(200).send(flights);
});

const getFlightByArrivalAirport = catchAsync(async (req, res) => {
  const flights = await flightService.getFlightByArrivalAirport(
    req.params.arrivalAirport
  );
  res.status(200).send(flights);
});

const getFlightByDepartureTime = catchAsync(async (req, res) => {
  const flights = await flightService.getFlightByDepartureTime(
    req.params.departureTime
  );
  res.status(200).send(flights);
});

const filterFlights = catchAsync(async (req, res) => {
  const { departureAirport, arrivalAirport, departureTime, airline } = req.body;

  const flights = await flightService.filterFlights(
    departureAirport,
    arrivalAirport,
    departureTime,
    airline
  );

  if (!flights) {
    throw new ApiError(404, "Flight not found");
  }

  res.status(200).send(flights);
});

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  updateFlight,
  deleteFlight,
  getFlightByDepartureAirport,
  getFlightByArrivalAirport,
  getFlightByDepartureTime,
  filterFlights,
};
