const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const airportSchema = mongoose.Schema({
  airportName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    province: {
      type: String,
      trim: true,
      required: false,
    },
    district: {
      type: String,
      trim: true,
      required: false,
    },
    town: {
      type: String,
      trim: true,
      required: false,
    },
    street: {
      type: String,
      trim: true,
      required: false,
    },
  },
});

airportSchema.plugin(toJSON);

const Airport = mongoose.model("Airports", airportSchema);

module.exports = Airport;
