const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const planeSchema = new mongoose.Schema({
  planeName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
  total: {
    type: Number,
    required: true,
    default: 0,
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
      disable: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

planeSchema.statics.isPlaneNameTaken = async function (name, excludePlaneId) {
  const plane = await this.findOne({
    planeName: name,
    _id: { $ne: excludePlaneId },
  });
  return !!plane;
};

planeSchema.plugin(toJSON);
planeSchema.plugin(paginate);

const Plane = mongoose.model("Plane", planeSchema);

module.exports = Plane;
