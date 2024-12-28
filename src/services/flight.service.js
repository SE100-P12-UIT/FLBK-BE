const Flight = require("../models/flight.model");
const ApiError = require("../utils/ApiError");

const createFlight = async (flightBody) => {
  return Flight.create(flightBody);
};

const queryFlights = async (filter, options) => {
  const flights = await Flight.paginate(filter, options);
  return flights;
};

const getFlightById = async (id) => {
  return await Flight.findById(id);
};

const updateFlightById = async (flightId, updateBody) => {
  const flight = await getFlightById(flightId);
  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }
  Object.assign(flight, updateBody);
  await flight.save();
  return flight;
};

const deleteFlightById = async (flightId) => {
  const flight = await Flight.findByIdAndDelete(flightId);
  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }
  return flight;
};

const getFlightByDepartureAirport = async (departureAirport) => {
  const flights = await Flight.find({ departureAirport: departureAirport });
  if (!flights) {
    throw new ApiError(404, "Flight not found");
  }
  return flights;
};

const getFlightByArrivalAirport = async (arrivalAirport) => {
  const flights = await Flight.find({ arrivalAirport: arrivalAirport });
  if (!flights) {
    throw new ApiError(404, "Flight not found");
  }
  return flights;
};

const getFlightByDepartureTime = async (departureTime) => {
  const flights = await Flight.find({ departureTime: departureTime });
  if (!flights) {
    throw new ApiError(404, "Flight not found");
  }
  return flights;
};

module.exports = {
  createFlight,
  queryFlights,
  getFlightById,
  updateFlightById,
  deleteFlightById,
  getFlightByArrivalAirport,
  getFlightByDepartureAirport,
  getFlightByDepartureTime,
};
