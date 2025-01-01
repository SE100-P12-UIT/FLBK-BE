const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const ticketService = require("../services/ticket.service");
const Ticket = require("../models/ticket.model");
const receiptService = require("../services/receipt.service");
const flightService = require("../services/flight.service");
const Receipt = require("../models/receipt.model");

const createTicket = catchAsync(async (req, res) => {
  const { userId, passenger, departureFlight, returnFlight } = req.body;
  const newSeatStatus = false;
  let departureTicket = [];
  let returnTicket = [];
  let isRoundTrip;

  if (returnFlight && Object.keys(returnFlight).length > 0) {
    isRoundTrip = true;
  } else isRoundTrip = false;

  const receipt = await receiptService.createReceipt(
    new Receipt({
      userId: userId,
      total: isRoundTrip
        ? passenger.length *
          (departureFlight.totalPrice + returnFlight.totalPrice)
        : passenger.length * departureFlight.totalPrice,
      totalTickets: isRoundTrip ? passenger.length * 2 : passenger.length,
      isRoundTrip: isRoundTrip,
    })
  );

  const seats = await flightService.getSeats(
    departureFlight.flightName,
    departureFlight.seatType
  );

  if (!seats || seats.length < passenger.length) {
    throw new ApiError(400, "Not enough seats available");
  }

  const seatsForPassengers = seats.slice(0, passenger.length);
  for (const [index, element] of passenger.entries()) {
    const ticket = await ticketService.createTicket(
      new Ticket({
        userId: userId,
        passenger: element,
        seatName: seatsForPassengers[index].seats.seatName,
        seatType: departureFlight.seatType,
        totalPrice: departureFlight.totalPrice,
        flight: departureFlight,
        receiptId: receipt._id,
        status: "Success",
      })
    );
    departureTicket.push(ticket._id);
  }
  await flightService.updateStatusForSeats(
    departureFlight.flightName,
    seatsForPassengers,
    newSeatStatus
  );

  await receiptService.updateReceipt(receipt._id, {
    departureTicket: departureTicket,
  });

  if (isRoundTrip) {
    const returnSeats = await flightService.getSeats(
      returnFlight.flightName,
      returnFlight.seatType
    );

    const returnSeatsForPassengers = returnSeats.slice(0, passenger.length);
    for (const [index, element] of passenger.entries()) {
      const ticket = await ticketService.createTicket(
        new Ticket({
          userId: userId,
          passenger: element,
          seatName: returnSeatsForPassengers[index].seats.seatName,
          seatType: returnFlight.seatType,
          totalPrice: returnFlight.totalPrice,
          flight: returnFlight,
          receiptId: receipt._id,
          status: "Success",
        })
      );
      returnTicket.push(ticket._id);
    }
    await flightService.updateStatusForSeats(
      departureFlight.flightName,
      seatsForPassengers,
      newSeatStatus
    );

    await receiptService.updateReceipt(receipt._id, {
      returnTicket: returnTicket,
    });
  }

  res.status(201).send();
});

const getTicketsById = catchAsync(async (req, res) => {
  const tickets = await ticketService.getTicketsById(req.body.idTickets);

  if (!tickets) {
    throw new ApiError(404, "Tickets not found");
  }

  res.status(200).send(tickets);
});

module.exports = {
  createTicket,
  getTicketsById,
};
