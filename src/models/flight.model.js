const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const flightSchema = new mongoose.Schema({
  departureAirport: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Airports",
  },
  arrivalAirport: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Airports",
  },
  departureTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  planeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Planes",
  },
  seats: [
    {
      seatId: {
        type: String,
        required: true,
      },
      isAvailable: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

flightSchema.plugin(toJSON);
flightSchema.plugin(paginate);

const Flight = mongoose.model("Flights", flightSchema);

module.exports = Flight;
