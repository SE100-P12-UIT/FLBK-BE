const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const seatSchema = mongoose.Schema(
  {
    seatName: {
      type: String,
      required: true,
      trim: true,
    },
    planeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Planes",
    },
  },
  {
    timestamp: true,
  }
);

seatSchema.plugin(toJSON);
seatSchema.plugin(paginate);

const Seat = mongoose.model("Seats", seatSchema);

module.exports = Seat;
