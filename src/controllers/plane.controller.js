const catchAsync = require("../utils/catchAsync");
const planeService = require("../services/plane.service");

const createPlane = catchAsync(async (req, res) => {
  const plane = await planeService.createPlane(req.body);
  res.status(201).send(plane);
});

const getPlanes = catchAsync(async (req, res) => {
  const planes = await planeService.getPlanes();
  res.status(200).send(planes);
});

const getPlane = catchAsync(async (req, res) => {
  const plane = await planeService.getPlane(req.params.planeId);
  res.status(200).send(plane);
});

const updatePlane = catchAsync(async (req, res) => {
  const plane = await planeService.updatePlane(req.params.planeId, req.body);
  res.status(200).send(plane);
});

const deletePlane = catchAsync(async (req, res) => {
  await planeService.deletePlane(req.params.planeId);
  res.status(204).send();
});

module.exports = {
  createPlane,
  getPlanes,
  getPlane,
  updatePlane,
  deletePlane,
};
