const express = require('express');
const controller = require('./controller')

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - client_id
 *         - incident_desc
 *         - city
 *         - country
 *       properties:
 *         client_id:
 *           type: integer
 *           description: client_id
 *         incident_desc:
 *           type: string
 *           description: indcident description
 *         city:
 *           type: string
 *           description: city of incident
 *         country:
 *           type: string
 *           description: country of incident
 *       example:
 *         client_id: 2
 *         incident_desc: Flooding in the whole of Kumasi
 *         city: kumasi
 *         country: Ghana
 */

 /**
  * @swagger
  * tags:
  *   name: Reports
  *   description: The Reports managing API
  */

/**
 * @swagger
 * /report/:
 *   get:
 *     summary: Returns the list of all the Reports
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: The list of the Reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 */
router.get('/', controller.getReports)


/**
 * @swagger
 * /report/{id}:
 *   get:
 *     summary: Get the report by id
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The report id
 *     responses:
 *       200:
 *         description: The report description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: The report was not found
 */

router.get('/:id', controller.getReport)

/**
 * @swagger
 * /report/:
 *   post:
 *     summary: Create a new report
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: The report was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       500:
 *         description: Some server error
 */
router.post('/', controller.createReport)
module.exports = router;

// *             schema:
//  *               $ref: '#/components/schemas/Report'