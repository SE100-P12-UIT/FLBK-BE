const Flight = require("../models/flight.model");
const ApiError = require("../utils/ApiError");

/**
 * Create a flight
 * @param {Object} flightBody
 * @returns {Promise<Flight>}
 */
const createFlight = async (flightBody) => {
  return Flight.create(flightBody);
};

/**
 * Query for flights
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options (sort, limit, page)
 * @returns {Promise<QueryResult>}
 */
const queryFlights = async (filter, options) => {
  return Flight.paginate(filter, options);
};

/**
 * Get flight by id
 * @param {ObjectId} id
 * @returns {Promise<Flight>}
 */
const getFlightById = async (id) => {
  return Flight.findById(id).populate("departureAirport arrivalAirport");
};

/**
 * Update flight by id
 * @param {ObjectId} flightId
 * @param {Object} updateBody
 * @returns {Promise<Flight>}
 */
const updateFlightById = async (flightId, updateBody) => {
  const flight = await getFlightById(flightId);
  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }
  Object.assign(flight, updateBody);
  await flight.save();
  return flight;
};

/**
 * Delete flight by id
 * @param {ObjectId} flightId
 * @returns {Promise<void>}
 */
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
