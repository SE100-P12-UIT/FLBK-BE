const { model } = require("mongoose");
const { modelName } = require("../models/user.model");

module.exports.authService = require("./auth.service");
module.exports.tokenService = require("./token.service");
module.exports.userService = require("./user.service");
module.exports.roleService = require("./role.service");
module.exports.planeService = require("./plane.service");
module.exports.ticketTypesService = require("./ticketTypes.service");

module.exports.flightService = require("./flight.service");
