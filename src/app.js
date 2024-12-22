const express = require("express");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");
const { jwtStrategy } = require("./config/passport");
const passport = require("passport");
const { errorConverter, errorHandler } = require("./middlewares/error");

require("dotenv").config();

const app = express();

//set static folder
app.use("/", express.static(path.join(__dirname, "./public")));

//set security HTTP headers
app.use(helmet());

//parse json request body
app.use(express.json());

//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//sanitize request data
app.use(xss());
app.use(mongoSanitize());

//gzip compression
app.use(compression());

//enable cors
app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
