/**
 * Subscription Routes
 */

const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { verifyToken, requireAuth } = require('../middleware/auth.middleware');

// Get available subscription plans (public)
router.get('/plans', subscriptionController.getPlans);

// Stripe webhook (no auth required)
router.post('/webhook', subscriptionController.handleWebhook);

// Protected routes
router.use(verifyToken);
router.use(requireAuth);

// Create a subscription
router.post('/subscribe', subscriptionController.subscribe);

// Get user's subscription
router.get('/', subscriptionController.getSubscription);

// Change subscription plan
router.put('/change', subscriptionController.changeSubscription);

// Cancel subscription
router.delete('/cancel', subscriptionController.cancelSubscription);

// Create setup intent for saving payment method
router.post('/setup-intent', subscriptionController.createSetupIntent);

module.exports = router;
