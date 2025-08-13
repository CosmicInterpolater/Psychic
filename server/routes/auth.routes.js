/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Register a new user
router.post('/register', authController.register);

// Login (server-side validation if needed)
router.post('/login', verifyToken, authController.login);

// Logout
router.post('/logout', authController.logout);

// Reset password
router.post('/reset-password', authController.resetPassword);

// Verify email
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
