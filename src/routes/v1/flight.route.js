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
  .patch(
    auth("manageFlights"),
    validate(flightValidation.updateFlight),
    flightController.updateFlight
  )
  .delete(auth("manageFlights"), flightController.deleteFlight);

router
  .route("/getFlightByDepartureAirport/:departureAirport")
  .get(
    auth("getFlights"),
    validate(flightValidation.getFlightByDepartureAirport),
    flightController.getFlightByDepartureAirport
  );

router
  .route("/getFlightByArrivalAirport/:arrivalAirport")
  .get(
    auth("getFlights"),
    validate(flightValidation.getFlightByArrivalAirport),
    flightController.getFlightByArrivalAirport
  );

router
  .route("/getFlightByDepartureTime/:departureTime")
  .get(
    auth("getFlights"),
    validate(flightValidation.getFlightByDepartureTime),
    flightController.getFlightByDepartureTime
  );

router
  .route("/filterFlights")
  .get(auth("getFlights"), flightController.filterFlights);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Flight management and operations
 */

/**
 * @swagger
 * /flight:
 *   post:
 *     summary: Create a flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       "201":
 *         description: Flight created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: planeId
 *         schema:
 *           type: string
 *         description: plane id
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: List of flights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Flight'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalResults:
 *                   type: integer
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /flight/{flightId}:
 *   patch:
 *     summary: Update a flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       "200":
 *         description: Flight updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   delete:
 *     summary: Delete a flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /flight/getFlightByDepartureAirport/{departureAirport}:
 *   get:
 *     summary: Get flights by departure airport
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: departureAirport
 *         required: true
 *         schema:
 *           type: string
 *         description: Airport name
 *     responses:
 *       "200":
 *         description: Get flights by departure airport successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /flight/getFlightByArrivalAirport/{arrivalAirport}:
 *   get:
 *     summary: Get flights by arrival airport
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: arrivalAirport
 *         required: true
 *         schema:
 *           type: string
 *         description: Airport name
 *     responses:
 *       "200":
 *         description: Get flights by arrival airport successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /flight/getFlightByDepartureTime/{departureTime}:
 *   get:
 *     summary: Get flights by departure time
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: departureTime
 *         required: true
 *         schema:
 *           type: string
 *         description: Departure time
 *     responses:
 *       "200":
 *         description: Get flights by departure time successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /flight/filterFlights:
 *   get:
 *     summary: Get flights with filter
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: departureAirport
 *         schema:
 *           type: string
 *       - in: query
 *         name: arrivalAirport
 *         schema:
 *           type: string
 *       - in: query
 *         name: departureTime
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: airline
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: List of filter flights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Flight'
 *       "400":
 *        $ref: '#/components/responses/BadRequest'
 *       "401":
 *        $ref: '#/components/responses/Unauthorized'
 *       "403":
 *        $ref: '#/components/responses/Forbidden'
 *       "404":
 *        $ref: '#/components/responses/NotFound'
 *       "500":
 *        $ref: '#/components/responses/InternalServerError'
 *
 */
