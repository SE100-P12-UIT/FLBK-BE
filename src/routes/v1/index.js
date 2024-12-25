const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const docsRoute = require("./docs.route");
const roleRoute = require("./role.route");
const ticketTypesRoute = require("./ticketTypes.route");
const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/docs",
    route: docsRoute,
  },
  {
    path: "/role",
    route: roleRoute,
  },
  {
    path: "/ticketTypes",
    route: ticketTypesRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
