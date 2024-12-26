const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const ticketSchema = new mongoose.Schema(
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
    status: {
      type: String,
      required: true,
      enum: ["Verifying", "PendingCancel", "Invalid", "Canceled, Success"],
    },
    note: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamp: true,
  }
);

ticketSchema.plugin(toJSON);
ticketSchema.plugin(paginate);

const Ticket = mongoose.model("Tickets", ticketSchema);

module.exports = Ticket;
