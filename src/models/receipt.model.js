const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const receiptSchema = new mongoose.Schema(
  {
    total: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamp: true,
  }
);

receiptSchema.plugin(toJSON);
receiptSchema.plugin(paginate);

const Receipt = mongoose.model("Receipts", receiptSchema);

module.exports = Receipt;
