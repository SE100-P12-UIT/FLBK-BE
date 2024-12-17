const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const planeSchema = mongoose.Schema({
  planeName: {
    type: String,
    required: true,
    trim: true,
  },
  planeType: {
    type: String,
    required: true,
    trim: true,
  },
  maxSeats: {
    type: Number,
    required: true,
  },
  airline: {
    type: String,
    required: true,
    trim: true,
  },
});

planeSchema.plugin(toJSON);
planeSchema.plugin(paginate);

const Plane = mongoose.model("Planes", planeSchema);

module.exports = Plane;
