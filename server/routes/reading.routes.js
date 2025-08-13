/**
 * Reading History Routes
 */

const express = require('express');
const router = express.Router();
const readingController = require('../controllers/reading.controller');
const { verifyToken, requireAuth } = require('../middleware/auth.middleware');

// Apply verifyToken middleware to all routes
router.use(verifyToken);
router.use(requireAuth);

// Save a new reading
router.post('/save', readingController.saveReading);

// Get user's reading history
router.get('/history', readingController.getReadingHistory);

// Get a specific reading
router.get('/history/:id', readingController.getReading);

// Delete a reading
router.delete('/history/:id', readingController.deleteReading);

module.exports = router;
