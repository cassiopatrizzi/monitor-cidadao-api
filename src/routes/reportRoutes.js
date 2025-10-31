const express = require('express');
const reportController = require('../controllers/reportController');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

router.post('/', authenticateJWT, reportController.createReport);
router.get('/', reportController.getAllReports);

module.exports = router;
