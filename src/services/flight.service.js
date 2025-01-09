const Flight = require("../models/flight.model");
const ApiError = require("../utils/ApiError");

const createFlight = async (flightBody) => {
  return Flight.create(flightBody);
};

const queryFlights = async (filter, options) => {
  const flights = await Flight.paginate(filter, options);
  return flights;
};

const updateFlightById = async (flightId, updateBody) => {
  const flight = await Flight.findByIdAndUpdate(flightId, updateBody);
  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }
  return flight;
};

const deleteFlightById = async (flightId) => {
  const flight = await Flight.findByIdAndDelete(flightId);
  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }
  return flight;
};

const filterFlights = async (
  departureAirport,
  arrivalAirport,
  departureTime,
  airline
) => {
  let flights;
  const end = new Date(departureTime);
  const newEnd = new Date(end.getTime() + 24 * 60 * 60 * 1000 - 1);
  if (airline === null || airline === undefined) {
    flights = await Flight.find({
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      departureTime: {
        $gte: departureTime,
        $lte: newEnd,
      },
    });
  } else {
    flights = await Flight.find({
      departureAirport: departureAirport,
      arrivalAirport: arrivalAirport,
      departureTime: {
        $gte: departureTime,
        $lte: newEnd,
      },
      "plane.airline": airline,
    });
  }
  if (!flights) {
    throw new ApiError(404, "Flight not found");
  }

  return flights;
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
  const end = new Date(departureTime);
  const newEnd = new Date(end.getTime() + 24 * 60 * 60 * 1000 - 1);
  const flights = await Flight.find({
    departureTime: {
      $gte: departureTime,
      $lte: newEnd,
    },
  });
  if (!flights) {
    throw new ApiError(404, "Flight not found");
  }
  return flights;
};

const getSeats = async (flightName, seatType) => {
  const seats = await Flight.aggregate([
    { $match: { flightName: flightName } },
    { $unwind: "$seats" },
    {
      $match: {
        "seats.seatType": seatType,
        "seats.isAvailable": true,
      },
    },
    { $project: { seats: 1, _id: 0 } },
  ]);

  return seats;
};

const updateStatusForSeats = async (flightName, seats, newStatus) => {
  const bulkOperations = seats.map((seat) => ({
    updateOne: {
      filter: {
        flightName: flightName,
        "seats.seatName": seat.seats.seatName,
      },
      update: {
        $set: { "seats.$.isAvailable": newStatus },
      },
    },
  }));

  return await Flight.bulkWrite(bulkOperations);
};

const updateStatusForSeat = async (flightName, seatName, status) => {
  const flight = await Flight.findOneAndUpdate(
    { flightName: flightName, "seats.seatName": seatName },
    { $set: { "seats.$.isAvailable": status } },
    { new: true }
  );

  return flight;
};

module.exports = {
  createFlight,
  queryFlights,
  updateFlightById,
  deleteFlightById,
  getFlightByArrivalAirport,
  getFlightByDepartureAirport,
  getFlightByDepartureTime,
  getSeats,
  updateStatusForSeats,
  updateStatusForSeat,
  filterFlights,
};
