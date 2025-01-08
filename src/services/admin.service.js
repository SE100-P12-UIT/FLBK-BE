const Ticket = require("../models/ticket.model");
const ApiError = require("../utils/ApiError");

const generateFlightReport = async (startDate, endDate) => {
  const newEndDate = new Date(endDate);
  const adjustDate = new Date(newEndDate.getTime() + 24 * 60 * 60 * 1000 - 1);
  const report = await Ticket.aggregate([
    {
      $match: {
        "flight.departureTime": {
          $gte: new Date(startDate),
          $lte: new Date(adjustDate),
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
