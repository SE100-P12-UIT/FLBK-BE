const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const docsRoute = require("./docs.route");
const roleRoute = require("./role.route");
const flightRoute = require("./flight.route");
const ticketTypesRoute = require("./ticketTypes.route");
const planeRoute = require("./plane.route");
const ticketRoute = require("./ticket.route");
const receiptRoute = require("./receipt.route");
const adminRoute = require("./admin.route");
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
    path: "/flight",
    route: flightRoute,
  },
  {
    path: "/ticketType",
    route: ticketTypesRoute,
  },
  {
    path: "/plane",
    route: planeRoute,
  },
  {
    path: "/ticket",
    route: ticketRoute,
  },
  {
    path: "/receipt",
    route: receiptRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
