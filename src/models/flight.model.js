const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const flightSchema = new mongoose.Schema({
  flightName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
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
      _id: false,
    },
  ],
});

flightSchema.plugin(toJSON);
flightSchema.plugin(paginate);

const Flight = mongoose.model("Flights", flightSchema);

module.exports = Flight;
