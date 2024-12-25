const { TicketTypes } = require("../models");
const ApiError = require("../utils/ApiError");

const createTicketType = async (ticketTypeBody) => {
  if (await TicketTypes.isTicketTypeTaken(ticketTypeBody.name)) {
    throw new ApiError(400, "Ticket type already existed");
  }
  return TicketTypes.create(ticketTypeBody);
};

const getTicketTypes = async () => {
  return await TicketTypes.find();
};

const getTicketType = async (ticketTypeId) => {
  const ticketType = await TicketTypes.findById(ticketTypeId);
  if (!ticketType) {
    throw new ApiError(404, "Ticket type not found");
  }
  return ticketType;
};

const updateTicketType = async (ticketTypeId, updateBody) => {
  const ticketType = await TicketTypes.findByIdAndUpdate(
    ticketTypeId,
    updateBody,
    { new: true }
  );
  if (!ticketType) {
    throw new ApiError(404, "Ticket type not found");
  }
  return ticketType;
};

const deleteTicketType = async (ticketTypeId) => {
  const ticketType = await TicketTypes.findByIdAndDelete(ticketTypeId);
  if (!ticketType) {
    throw new ApiError(404, "Ticket type not found");
  }
  return ticketType;
};

module.exports = {
  createTicketType,
  getTicketTypes,
  getTicketType,
  updateTicketType,
  deleteTicketType,
};
