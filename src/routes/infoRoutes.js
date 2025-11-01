
const express = require('express');
const infoController = require('../controllers/infoController');
const router = express.Router();
router.get('/all', infoController.getAllInfo);

module.exports = router;
