const Ticket = require("../models/ticket.model");
const ApiError = require("../utils/ApiError");

const generateFlightReport = async (startDate, endDate) => {
  const report = await Ticket.aggregate([
    {
      $match: {
        "flight.departureTime": {
          $gte: new Date(startDate),
          $lte: new Date(endDate.setHours(23, 59, 59, 999)),
        },
      },
    },
    {
      $group: {
        _id: "$flight.flightName",
        totalTicketsSold: {
          $sum: { $cond: [{ $eq: ["$status", "Success"] }, 1, 0] },
        },
        totalRevenue: {
          $sum: {
            $cond: [{ $eq: ["$status", "Success"] }, "$totalPrice", 0],
          },
        },
        totalTicketsCanceled: {
          $sum: {
            $cond: [{ $eq: ["$status", "Canceled"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        totalTicketsSold: 1,
        totalRevenue: 1,
        totalTicketsCanceled: 1,
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return report;
};

module.exports = {
  generateFlightReport,
};
