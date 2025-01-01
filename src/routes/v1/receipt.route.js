const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const receiptValidation = require("../../validations/receipt.validation");
const receiptController = require("../../controllers/receipt.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Receipts
 *  description: Receipt management API
 */

/**
 * @swagger
 *  /receipt/getReceiptsByUserId/{userId}:
 *   get:
 *    summary: get receipts
 *    description: Users can get receipts by user id
 *    tags: [Receipts]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the receipts to retrieve
 *    responses:
 *      "200":
 *        description: Receipts retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Receipt'
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
  "/getReceiptsByUserId/:userId",
  auth("getReceipts"),
  validate(receiptValidation.getReceiptByUserId),
  receiptController.getReceiptsByUserId
);

module.exports = router;
