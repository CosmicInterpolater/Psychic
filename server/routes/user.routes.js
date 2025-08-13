/**
 * User Profile Routes
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, requireAuth } = require('../middleware/auth.middleware');

// Apply verifyToken middleware to all routes
router.use(verifyToken);
router.use(requireAuth);

// Get current user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile', userController.updateProfile);

// Delete user account
router.delete('/profile', userController.deleteAccount);

// Get user's reading history
router.get('/readings', userController.getReadingHistory);

// Get a specific reading
router.get('/readings/:id', userController.getReading);

module.exports = router;
