const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const flightSchema = new mongoose.Schema({
  flightName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  route: [
    {
      airport: {
        type: String,
        trim: true,
        required: true,
      },
      location: {
        type: String,
        trim: true,
        required: true,
      },
      _id: false,
    },
  ],
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
      _id: false,
    },
  ],
});

flightSchema.plugin(toJSON);
flightSchema.plugin(paginate);

const Flight = mongoose.model("Flights", flightSchema);

module.exports = Flight;
