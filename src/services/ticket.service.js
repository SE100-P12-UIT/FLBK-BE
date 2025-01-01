const ApiError = require("../utils/ApiError");
const Ticket = require("../models/ticket.model");

const createTicket = async (ticketBody) => {
  return Ticket.create(ticketBody);
};

const getTicketsById = async (idTickets) => {
  const tickets = await Ticket.find({ _id: { $in: idTickets } });
  return tickets;
};

const getTicketById = async (id) => {
  return await Ticket.findById(id);
};

const getTicketByDepartureTime = async (departureTime) => {
  const tickets = await Ticket.find({ "flight.departureTime": departureTime });
  if (!tickets) {
    throw new ApiError(404, "Ticket not found");
  }
  return tickets;
};

const getTicketByDepartureAirport = async (departureAirport) => {
  const tickets = await Ticket.find({
    "flight.departureAirport": departureAirport,
  });
  if (!tickets) {
    throw new ApiError(404, "Ticket not found");
  }
  return tickets;
};

const getTicketByArrivalAirport = async (arrivalAirport) => {
  const tickets = await Ticket.find({
    "flight.arrivalAirport": arrivalAirport,
  });
  if (!tickets) {
    throw new ApiError(404, "Ticket not found");
  }
  return tickets;
};

const getTicketByStatus = async (status) => {
  const tickets = await Ticket.find({
    status: status,
  });

  if (!tickets) {
    throw new ApiError(404, "Ticket not found");
  }
  return tickets;
};

const updateTicketById = async (ticketId, updateBody) => {
  const ticket = await Ticket.findByIdAndUpdate(ticketId, updateBody, {
    new: true,
  });
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }
  return ticket;
};

const deleteTicketById = async (ticketId) => {
  const ticket = await Ticket.findByIdAndDelete(ticketId);
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }
  return ticket;
};

module.exports = {
  createTicket,
  getTicketsById,
  getTicketById,
  getTicketByDepartureTime,
  getTicketByDepartureAirport,
  getTicketByArrivalAirport,
  getTicketByStatus,
  updateTicketById,
  deleteTicketById,
};
