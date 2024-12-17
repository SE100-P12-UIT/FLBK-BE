const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const ticketSchema = mongoose.Schema(
  {
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Seats",
    },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Flights",
    },
    receiptId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Receipts",
    },
    ticketTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TicketTypes",
    },
  },
  {
    timestamp: true,
  }
);

receiptSchema.plugin(toJSON);
receiptSchema.plugin(paginate);

const Ticket = mongoose.model("Tickets", ticketSchema);

module.exports = Ticket;
