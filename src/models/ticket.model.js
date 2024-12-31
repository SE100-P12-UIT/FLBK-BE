const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const ticketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    passenger: {
      title: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
    },
    seatName: {
      type: String,
      required: true,
    },
    seatType: {
      type: String,
      required: true,
      enum: ["business", "common"],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    flight: {
      flightName: {
        type: String,
        required: true,
      },
      departureAirport: {
        type: String,
        required: true,
      },
      arrivalAirport: {
        type: String,
        required: true,
      },
      departureTime: {
        type: Date,
        required: true,
      },
    },
    receiptId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Receipts",
    },
    status: {
      type: String,
      required: true,
      enum: ["Verifying", "PendingCancel", "Invalid", "Canceled", "Success"],
    },
    note: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

ticketSchema.plugin(toJSON);
ticketSchema.plugin(paginate);

const Ticket = mongoose.model("Tickets", ticketSchema);

module.exports = Ticket;
