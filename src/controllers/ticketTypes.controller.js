const catchAsync = require("../utils/catchAsync");
const ticketTypesService = require("../services/ticketTypes.service");

const createTicketType = catchAsync(async (req, res) => {
  const ticketType = await ticketTypesService.createTicketType(req.body);
  res.status(201).send(ticketType);
});

const getTicketTypes = catchAsync(async (req, res) => {
  const ticketTypes = await ticketTypesService.getTicketTypes();
  res.status(200).send(ticketTypes);
});

const getTicketType = catchAsync(async (req, res) => {
  const ticketType = await ticketTypesService.getTicketType(
    req.params.ticketTypeId
  );
  res.status(200).send(ticketType);
});

const updateTicketType = catchAsync(async (req, res) => {
  const ticketType = await ticketTypesService.updateTicketType(
    req.params.ticketTypeId,
    req.body
  );
  res.status(200).send(ticketType);
});

const deleteTicketType = catchAsync(async (req, res) => {
  await ticketTypesService.deleteTicketType(req.params.ticketTypeId);
  res.status(204).send();
});

module.exports = {
  createTicketType,
  getTicketTypes,
  getTicketType,
  updateTicketType,
  deleteTicketType,
};
