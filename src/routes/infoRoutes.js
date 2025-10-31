
const express = require('express');
const infoController = require('../controllers/infoController');
const router = express.Router();
// Rota agregada para todas as informações
router.get('/all', infoController.getAllInfo);

router.get('/air-quality', infoController.getAirQuality);
router.get('/noise', infoController.getNoise);
router.get('/lighting', infoController.getLighting);
router.get('/potholes', infoController.getPotholes);
router.get('/trash', infoController.getTrash);
router.get('/construction', infoController.getConstruction);
router.get('/flooded-areas', infoController.getFloodedAreas);
router.get('/public-transport', infoController.getPublicTransport);
router.get('/social', infoController.getSocial);

module.exports = router;
