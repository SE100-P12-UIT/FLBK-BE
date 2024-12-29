const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const planeValidation = require("../../validations/plane.validation");
const planeController = require("../../controllers/plane.controller");

const router = express.Router();
/**
 * @swagger
 * tags:
 *  name: Planes
 *  description: Plane management API
 */

/**
 * @swagger
 *  /plane/createPlane:
 *   post:
 *    summary: Create a plane
 *    description: Only admins can create other planes.
 *    tags: [Planes]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Plane'
 *    responses:
 *      "201":
 *        description: Plane created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plane'
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
  "/createPlane",
  auth("managePlanes"),
  validate(planeValidation.createPlane),
  planeController.createPlane
);

/**
 * @swagger
 *  /plane/getPlanes:
 *   get:
 *    summary: Get all planes
 *    description: Only admins can get all planes.
 *    tags: [Planes]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *       - in: query
 *         name: airline
 *         schema:
 *           type: string
 *         description: Airline name
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
 *         description: Maximum number of planes
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *    responses:
 *      "200":
 *        description: Planes retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Plane'
 *      "400":
 *        $ref: '#/components/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "500":
 *        $ref: '#/components/responses/InternalServerError'
 */
router.get("/getPlanes", auth("managePlanes"), planeController.getPlanes);

/**
 * @swagger
 *  /plane/getPlane/{planeId}:
 *   get:
 *    summary: Get a plane by ID
 *    description: Only admins can get a plane by ID.
 *    tags: [Planes]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: planeId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the plane to retrieve
 *    responses:
 *      "200":
 *        description: Plane retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plane'
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
  "/getPlane/:planeId",
  auth("managePlanes"),
  planeController.getPlane
);

/**
 * @swagger
 *  /plane/updatePlane/{planeId}:
 *   patch:
 *    summary: Update a plane by ID
 *    description: Only admins can update a plane by ID.
 *    tags: [Planes]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: planeId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the plane to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Plane'
 *    responses:
 *      "200":
 *        description: Plane updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plane'
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
  "/updatePlane/:planeId",
  auth("managePlanes"),
  validate(planeValidation.updatePlane),
  planeController.updatePlane
);

/**
 * @swagger
 *  /plane/deletePlane/{planeId}:
 *   delete:
 *    summary: Delete a plane by ID
 *    description: Only admins can delete a plane by ID.
 *    tags: [Planes]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: planeId
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the plane to delete
 *    responses:
 *      "204":
 *        description: Plane deleted successfully
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
  "/deletePlane/:planeId",
  auth("managePlanes"),
  planeController.deletePlane
);

/**
 * @swagger
 *  /plane/getPlaneWithoutPaginate:
 *   get:
 *    summary: Get all planes
 *    description: Get all planes.
 *    tags: [Planes]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      "200":
 *        description: Planes retrieved successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Plane'
 *      "400":
 *        $ref: '#/components/responses/BadRequest'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 *      "403":
 *        $ref: '#/components/responses/Forbidden'
 *      "500":
 *        $ref: '#/components/responses/InternalServerError'
 */

router.get(
  "/getPlaneWithoutPaginate",
  auth("managePlanes"),
  planeController.getPlanesWithoutPaginate
);

module.exports = router;
