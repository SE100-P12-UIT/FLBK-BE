const { Role } = require("../models");
const ApiError = require("../utils/ApiError");

const createRole = async (roleBody) => {
  if (await Role.isRoleNameTaken(roleBody.name)) {
    throw new ApiError(400, "Role name already taken");
  }
  return Role.create(roleBody);
};

const getRoles = async () => {
  return await Role.find();
};

const getRole = async (roleId) => {
  const role = await Role.findById(roleId);
  if (!role) {
    throw new ApiError(404, "Role not found");
  }
  return role;
};

const updateRole = async (roleId, updateBody) => {
  const role = await Role.findByIdAndUpdate(roleId, updateBody, { new: true });
  if (!role) {
    throw new ApiError(404, "Role not found");
  }
  return role;
};

const deleteRole = async (roleId) => {
  const role = await Role.findByIdAndDelete(roleId);
  if (!role) {
    throw new ApiError(404, "Role not found");
  }
  return role;
};

module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};
