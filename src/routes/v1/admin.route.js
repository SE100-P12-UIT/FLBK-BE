const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const adminController = require("../../controllers/admin.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management and operations
 */

/**
 * @swagger
 * /admin/generateFlightReport:
 *   get:
 *     summary: Generate a report
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       "200":
 *         description: Report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       totalTicketsSold:
 *                         type: number
 *                       totalRevenue:
 *                         type: number
 *                       totalTicketsCanceled:
 *                         type: number
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

router
  .route("/generateFlightReport")
  .get(auth("manageReports"), adminController.generateFlightReport);

module.exports = router;
