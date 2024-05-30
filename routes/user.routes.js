const { Router } = require('express');
const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = Router();

router.get('/profile', authMiddleware.verifyToken, userController.getUserProfile);
router.put('/profile', authMiddleware.verifyToken, userController.updateUserProfile);
router.delete('/profile', authMiddleware.verifyToken, userController.deleteUserProfile);

module.exports = router;
