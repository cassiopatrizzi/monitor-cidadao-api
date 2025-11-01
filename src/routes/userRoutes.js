const express = require('express');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticateJWT, userController.getProfile);
router.put('/profile', authenticateJWT, userController.updateProfile);
router.delete('/profile', authenticateJWT, userController.deleteProfile);
router.get('/validate/:token', userController.validateUser);

module.exports = router;
