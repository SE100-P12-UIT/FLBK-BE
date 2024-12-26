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

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Flight management and operations
 */

/**
 * @swagger
 * /flights:
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
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of flights per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field and order (e.g., 'date:desc')
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
 * /flights/{flightId}:
 *   get:
 *     summary: Get a flight by ID
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
 *       "200":
 *         description: Flight details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
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



module.exports = router;
