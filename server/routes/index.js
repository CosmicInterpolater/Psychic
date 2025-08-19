/**
 * Main Router
 * Combines all API routes
 */

const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const readingRoutes = require('./reading.routes');
const subscriptionRoutes = require('./subscription.routes');
const tarotRoutes = require('./tarot.routes');
const astrologyRoutes = require('./astrology.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/readings', readingRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/tarot', tarotRoutes);
router.use('/astrology', astrologyRoutes);

module.exports = router;
