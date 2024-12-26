const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const tickTypesValidation = require("../../validations/ticketTypes.validation");
const ticketTypesController = require("../../controllers/ticketTypes.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: TicketTypes
 *  description: Ticket Types Management API
 */

/**
 * @swagger
 *  /ticketType/createTicketType:
 *    post:
 *      summary: Create a ticket type
 *      description: Only admins can create other ticket type.
 *      tags: [TicketTypes]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TicketType'
 *      responses:
 *        "201":
 *          description: Ticket type created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TicketType'
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
  "/createTicketType",
  auth("manageTicketTypes"),
  validate(tickTypesValidation.createTicketType),
  ticketTypesController.createTicketType
);

/**
 * @swagger
 *  /ticketType/getTicketTypes:
 *    get:
 *     summary: Get all ticket types
 *     description: Only admins can get all ticket types.
 *     tags: [TicketTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Ticket type retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketType'
 *     "400":
 *       $ref: '#/components/responses/BadRequest'
 *     "401":
 *       $ref: '#/components/responses/Unauthorized'
 *     "403":
 *       $ref: '#/components/responses/Forbidden'
 *     "500":
 *       $ref: '#/components/responses/InternalServerError'
 */

router.get(
  "/getTicketTypes",
  auth("manageTicketTypes"),
  ticketTypesController.getTicketTypes
);

/**
 * @swagger
 *  /ticketType/getTicketType/{ticketTypeId}:
 *    get:
 *     summary: Get a ticket type by ID
 *     description: Only admins can get a ticket type by ID.
 *     tags: [TicketTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketTypeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ticket type to retrieve
 *     responses:
 *       "200":
 *         description: Ticket type retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get(
  "/getTicketType/:ticketTypeId",
  auth("manageTicketTypes"),
  ticketTypesController.getTicketType
);

/**
 * @swagger
 *  /ticketType/updateTicketType/{ticketTypeId}:
 *    patch:
 *     summary: Update a ticket type by ID
 *     description: Only admins can update a ticket type by ID.
 *     tags: [TicketTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketTypeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ticket type to retrieve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketType'
 *     responses:
 *       "200":
 *         description: Ticket type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketType'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *       "500":
 *         $ref: '#/components/responses/InternalServerError'
 */

router.patch(
  "/updateTicketType/:ticketTypeId",
  auth("manageTicketTypes"),
  validate(tickTypesValidation.updateTicketType),
  ticketTypesController.updateTicketType
);

/**
 * @swagger
 *  /ticketType/deleteTicketType/{ticketTypeId}:
 *   delete:
 *    summary: Delete a role by ID
 *    description: Only admins can delete a role by ID.
 *    tags: [TicketTypes]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: ticketTypeId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the ticket type to delete
 *    responses:
 *      "204":
 *        description: Ticket type deleted successfully
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
router.delete(
  "/deleteTicketType/:ticketTypeId",
  auth("manageTicketTypes"),
  ticketTypesController.deleteTicketType
);

module.exports = router;
