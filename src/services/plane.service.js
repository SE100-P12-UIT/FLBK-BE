const { Plane } = require("../models");
const ApiError = require("../utils/ApiError");

const createPlane = async (planeBody) => {
  if (await Plane.isPlaneNameTaken(planeBody.name)) {
    throw new ApiError(400, "Plane name already taken");
  }
  return Plane.create(planeBody);
};

const getPlanes = async (filter, options) => {
  return await Plane.paginate(filter, options);
};

const getPlane = async (planeId) => {
  const plane = await Plane.findById(planeId);
  if (!plane) {
    throw new ApiError(404, "Plane not found");
  }
  return plane;
};

const updatePlane = async (planeId, updateBody) => {
  const plane = await Plane.findByIdAndUpdate(planeId, updateBody, {
    new: true,
  });
  if (!plane) {
    throw new ApiError(404, "Plane not found");
  }
  return plane;
};

const deletePlane = async (planeId) => {
  const plane = await Plane.findByIdAndDelete(planeId);
  if (!plane) {
    throw new ApiError(404, "Plane not found");
  }
  return plane;
};

module.exports = {
  createPlane,
  getPlanes,
  getPlane,
  updatePlane,
  deletePlane,
};
