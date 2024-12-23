const catchAsync = require("../utils/catchAsync");
const roleService = require("../services/role.service");

const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(201).send(role);
});

const getRoles = catchAsync(async (req, res) => {
  const roles = await roleService.getRoles();
  res.status(200).send(roles);
});

const getRole = catchAsync(async (req, res) => {
  const role = await roleService.getRole(req.params.roleId);
  res.status(200).send(role);
});

const updateRole = catchAsync(async (req, res) => {
  const role = await roleService.updateRole(req.params.roleId, req.body);
  res.status(200).send(role);
});

const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRole(req.params.roleId);
  res.status(204).send();
});

module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};
