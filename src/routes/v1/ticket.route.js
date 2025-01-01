const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const ticketValidation = require("../../validations/ticket.validation");
const ticketController = require("../../controllers/ticket.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Tickets
 *  description: Ticket management API
 */

/**
 * @swagger
 *  /ticket/createTicket:
 *   post:
 *    summary: create ticket
 *    description: All roles can create ticket
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTicket'
 *    responses:
 *      "201":
 *        description: Plane created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ticket'
 *      "400":
 *        $ref: '#/components/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "500":
 *        $ref: '#/components/responses/InternalServerError'
 */

router.post(
  "/createTicket",
  auth("createTickets"),
  validate(ticketValidation.createTicket),
  ticketController.createTicket
);

/**
 * @swagger
 *  /ticket/getTicketsById:
 *   post:
 *    summary: get tickets
 *    description: Users can get tickets by id
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idTickets:
 *                type: array
 *                items:
 *                  type: string
 *                description: Array of ticket IDs to retrieve
 *            required:
 *              - idTickets
 *    responses:
 *      "200":
 *        description: Tickets retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Ticket'
 *      "400":
 *        $ref: '#/components/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "404":
 *        $ref: '#/components/responses/NotFound'
 *      "500":
 *        $ref: '#/components/responses/InternalServerError'
 */

router.post(
  "/getTicketsById",
  auth("getTickets"),
  validate(ticketValidation.getTicketsById),
  ticketController.getTicketsById
);

module.exports = router;
