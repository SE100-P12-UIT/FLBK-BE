const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin", "employee"),
    dateOfBirth: Joi.date().optional(),
    phoneNumber: Joi.string().optional(),
    citizenId: Joi.string().optional(),
    address: Joi.object()
      .keys({
        province: Joi.string().required(),
        district: Joi.string().required(),
        town: Joi.string().required(),
        street: Joi.string().required(),
      })
      .optional(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    sortBy: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      dateOfBirth: Joi.date(),
      phoneNumber: Joi.string(),
      citizenId: Joi.string(),
      address: Joi.object()
        .keys({
          province: Joi.string(),
          district: Joi.string(),
          town: Joi.string(),
          street: Joi.string(),
        })
        .optional(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const searchUserByEmail = {
  params: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUserByEmail,
};
