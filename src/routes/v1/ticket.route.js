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
 *   get:
 *    summary: get tickets
 *    description: Users can get tickets by id
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: idTickets
 *        schema:
 *          type: array
 *          items:
 *            type: string
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

router.get(
  "/getTicketsById",
  auth("getTickets"),
  ticketController.getTicketsById
);

/**
 * @swagger
 *  /ticket/getTicketsByStatus:
 *   get:
 *    summary: get tickets by status
 *    description: All roles can get tickets by status
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: status
 *        required: true
 *        schema:
 *          type: string
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
 *
 */

router.get(
  "/getTicketsByStatus",
  auth("getTickets"),
  validate(ticketValidation.getTicketsByStatus),
  ticketController.getTicketsByStatus
);

/**
 * @swagger
 *  /ticket/acceptBookedTicketById/{ticketId}:
 *   patch:
 *    summary: Accept a booked ticket by ID
 *    description: Employees can accept a booked ticket by ID.
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: ticketId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Ticket accepted
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
router.patch(
  "/acceptBookedTicketById/:ticketId",
  auth("manageTickets"),
  ticketController.acceptBookedTicketById
);

/**
 * @swagger
 *  /ticket/declineBookedTicketById/{ticketId}:
 *   patch:
 *    summary: Decline a booked ticket by ID
 *    description: Employees can decline a booked ticket by ID.
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: ticketId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              note:
 *                type: string
 *    responses:
 *      "200":
 *        description: Ticket declined
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
router.patch(
  "/declineBookedTicketById/:ticketId",
  auth("manageTickets"),
  validate(ticketValidation.declineBookedTicket),
  ticketController.declineBookedTicketById
);

/**
 * @swagger
 *  /ticket/requestCancelTicketById/{ticketId}:
 *   patch:
 *    summary: Request cancel a booked ticket by ID
 *    description: Users can request cancel a booked ticket by ID.
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: ticketId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Request successfully
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
router.patch(
  "/requestCancelTicketById/:ticketId",
  auth("cancelTickets"),
  ticketController.requestCancelTicketById
);

/**
 * @swagger
 *  /ticket/acceptRequestCancelTicketById/{ticketId}:
 *   patch:
 *    summary: Accept request cancel a booked ticket by ID
 *    description: Employees can accept request cancel a booked ticket by ID.
 *    tags: [Tickets]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: ticketId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              note:
 *                type: string
 *    responses:
 *      "200":
 *        description: Ticket canceled
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
router.patch(
  "/acceptRequestCancelTicketById/:ticketId",
  auth("manageTickets"),
  validate(ticketValidation.acceptRequestCancelTicketById),
  ticketController.acceptRequestCancelTicketById
);

module.exports = router;
