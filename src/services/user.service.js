const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const Ticket = require("../models/ticket.model");

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(400, "Email already taken");
  }
  return User.create(userBody);
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);

  return users;
};

const getUserById = async (userId) => {
  return User.findById(userId);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(400, "Email already taken");
  }

  Object.assign(user, updateBody);
  await user.save();
  console.log(user);

  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await User.deleteOne({ _id: userId });
  return user;
};

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const searchUsersByEmail = async (input) => {
  try {
    if (typeof input !== "string") {
      throw new ApiError(400, "Input must be a string");
    }
    const escapedInput = escapeRegExp(input);

    const regex = new RegExp(`^${escapedInput}`, "i");

    const users = await User.findOne({ email: regex });

    if (!users) {
      throw new ApiError(404, "No users found with provided input");
    }

    return users;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Error retrieving users by input");
  }
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  searchUsersByEmail,
};
