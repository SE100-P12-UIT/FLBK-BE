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
  return await Flight.findById(id).populate("departureAirport arrivalAirport");
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
  const flight = await getFlightById(flightId);
  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }
  await flight.remove();
};

module.exports = {
  createFlight,
  queryFlights,
  getFlightById,
  updateFlightById,
  deleteFlightById,
};
