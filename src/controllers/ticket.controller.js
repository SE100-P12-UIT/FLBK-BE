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
        ? departureFlight.totalPrice + returnFlight.totalPrice
        : departureFlight.totalPrice,
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
        status: "Verifying",
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
          status: "Verifying",
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
  const tickets = await ticketService.getTicketsById(req.query.idTickets);

  if (!tickets) {
    throw new ApiError(404, "Tickets not found");
  }

  res.status(200).send(tickets);
});

const getTicketsByStatus = catchAsync(async (req, res) => {
  const tickets = await ticketService.getTicketsByStatus(req.query.status);

  if (!tickets) {
    throw new ApiError(404, "Tickets not found");
  }

  res.status(200).send(tickets);
});

const acceptBookedTicketById = catchAsync(async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.ticketId);

  if (ticket.status !== "Verifying") {
    throw new ApiError(404, "Ticket not found");
  }

  const newTicket = await ticketService.updateTicketById(req.params.ticketId, {
    status: "Success",
  });

  if (!newTicket) {
    throw new ApiError(404, "Ticket not found");
  }

  res.status(200).send(newTicket);
});

const declineBookedTicketById = catchAsync(async (req, res) => {
  const newStatus = true;
  const ticket = await ticketService.getTicketById(req.params.ticketId);

  if (ticket.status !== "Verifying") {
    throw new ApiError(404, "Ticket not found");
  }

  const updateBody = Object.assign(
    {},
    {
      status: "Invalid",
    },
    req.body
  );

  const newTicket = await ticketService.updateTicketById(
    req.params.ticketId,
    updateBody
  );

  if (!newTicket) {
    throw new ApiError(404, "Tickets not found");
  }

  const flight = await flightService.updateStatusForSeat(
    ticket.flight.flightName,
    ticket.seatName,
    newStatus
  );

  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }

  res.status(200).send(newTicket);
});

const requestCancelTicketById = catchAsync(async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.ticketId);

  if (ticket.status !== "Success") {
    throw new ApiError(404, "Ticket not found");
  }

  const newTicket = await ticketService.updateTicketById(req.params.ticketId, {
    status: "PendingCancel",
  });

  if (!newTicket) {
    throw new ApiError(404, "Tickets not found");
  }

  res.status(200).send(newTicket);
});

const acceptRequestCancelTicketById = catchAsync(async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.ticketId);

  if (ticket.status !== "PendingCancel") {
    throw new ApiError(404, "Ticket not found");
  }

  const updateBody = Object.assign(
    {},
    {
      status: "Canceled",
    },
    req.body
  );

  const newStatus = true;

  const newTicket = await ticketService.updateTicketById(
    req.params.ticketId,
    updateBody
  );

  if (!newTicket) {
    throw new ApiError(404, "Ticket not found");
  }

  const flight = await flightService.updateStatusForSeat(
    ticket.flight.flightName,
    ticket.seatName,
    newStatus
  );

  if (!flight) {
    throw new ApiError(404, "Flight not found");
  }

  res.status(200).send(newTicket);
});

const declineRequestCancelTicketById = catchAsync(async (req, res) => {
  const ticket = await ticketService.getTicketById(req.params.ticketId);

  if (ticket.status !== "PendingCancel") {
    throw new ApiError(404, "Ticket not found");
  }

  const newTicket = await ticketService.updateTicketById(req.params.ticketId, {
    status: "Success",
  });

  if (!newTicket) {
    throw new ApiError(404, "Ticket not found");
  }

  res.status(200).send(newTicket);
});

module.exports = {
  createTicket,
  getTicketsById,
  getTicketsByStatus,
  acceptBookedTicketById,
  declineBookedTicketById,
  requestCancelTicketById,
  acceptRequestCancelTicketById,
  declineRequestCancelTicketById,
};
