const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const receiptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    total: {
      type: Number,
      required: true,
    },
    totalTickets: {
      type: Number,
      required: true,
    },
    isRoundTrip: {
      type: Boolean,
      required: true,
    },
    departureTicket: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
    returnTicket: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

receiptSchema.plugin(toJSON);
receiptSchema.plugin(paginate);

const Receipt = mongoose.model("Receipts", receiptSchema);

module.exports = Receipt;
