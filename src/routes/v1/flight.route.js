const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const flightValidation = require("../../validations/flight.validation");
const flightController = require("../../controllers/flight.controller");


const router = express.Router();

router
    .route("/")
    .post(
        auth("manageFlights"),
        validate(flightValidation.createFlight),
        flightController.createFlight
    )
    .get(
        auth("getFlights"),
        validate(flightValidation.getFlights),
        flightController.getFlights
    );

router
    .route("/:flightId")
    .get(
        auth("getFlights"),
        validate(flightValidation.getFlight),
        flightController.getFlight
    )
    .patch(
        auth("manageFlights"),
        validate(flightValidation.updateFlight),
        flightController.updateFlight
    )
    .delete(
        auth("manageFlights"),
        validate(flightValidation.deleteFlight),
        flightController.deleteFlight
    );

// router
//     .route("/search-flight-by-number/:flightNumber")
//     .get(
//         auth("searchFlightByNumber"),
//         validate(flightValidation.searchFlightByNumber),
//         flightController.searchFlightByNumber
//     );
// npm
module.exports = router;
