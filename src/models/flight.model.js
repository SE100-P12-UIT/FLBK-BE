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
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  plane: {
    planeName: {
      type: String,
      required: true,
    },
    airline: {
      type: String,
      required: true,
    },
  },
  seats: [
    {
      seatName: {
        type: String,
        required: true,
      },
      seatType: {
        type: String,
        required: false,
        enum: ["business", "common"],
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
