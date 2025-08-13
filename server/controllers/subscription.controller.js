/**
 * Subscription Controller
 * Handles subscription-related API endpoints
 */

const subscriptionService = require('../services/subscription.service');
const stripeService = require('../services/stripe.service');

/**
 * Get available subscription plans
 * GET /api/subscriptions/plans
 */
const getPlans = (req, res) => {
  try {
    const plans = subscriptionService.getPlans();
    return res.status(200).json({ plans });
  } catch (error) {
    console.error('Error getting subscription plans:', error);
    return res.status(500).json({ error: 'Error retrieving subscription plans' });
  }
};

/**
 * Create a subscription
 * POST /api/subscriptions/subscribe
 */
const subscribe = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { planId, paymentMethodId } = req.body;
    
    if (!planId) {
      return res.status(400).json({ error: 'Plan ID is required' });
    }
    
    // Create subscription
    const result = await subscriptionService.createSubscription(
      req.user.uid,
      planId,
      paymentMethodId
    );
    
    return res.status(201).json({
      message: 'Subscription created successfully',
      subscription: result.subscription,
      clientSecret: result.clientSecret
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    
    if (error.message.includes('User already has an active subscription')) {
      return res.status(400).json({ error: 'User already has an active subscription' });
    }
    
    return res.status(500).json({ error: 'Error creating subscription' });
  }
};

/**
 * Get user's subscription
 * GET /api/subscriptions
 */
const getSubscription = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const subscription = await subscriptionService.getSubscription(req.user.uid);
    
    if (!subscription) {
      return res.status(404).json({ error: 'No subscription found' });
    }
    
    return res.status(200).json({ subscription });
  } catch (error) {
    console.error('Error getting subscription:', error);
    return res.status(500).json({ error: 'Error retrieving subscription' });
  }
};

/**
 * Update subscription (change plan)
 * PUT /api/subscriptions/change
 */
const changeSubscription = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { planId } = req.body;
    
    if (!planId) {
      return res.status(400).json({ error: 'Plan ID is required' });
    }
    
    // Update subscription
    const updatedSubscription = await subscriptionService.updateSubscription(
      req.user.uid,
      planId
    );
    
    return res.status(200).json({
      message: 'Subscription updated successfully',
      subscription: updatedSubscription
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    
    if (error.message.includes('No subscription found for user')) {
      return res.status(404).json({ error: 'No subscription found' });
    }
    
    return res.status(500).json({ error: 'Error updating subscription' });
  }
};

/**
 * Cancel subscription
 * DELETE /api/subscriptions/cancel
 */
const cancelSubscription = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { atPeriodEnd } = req.body;
    
    // Cancel subscription
    const canceledSubscription = await subscriptionService.cancelSubscription(
      req.user.uid,
      atPeriodEnd !== false // Default to true if not explicitly set to false
    );
    
    return res.status(200).json({
      message: 'Subscription canceled successfully',
      subscription: canceledSubscription
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    
    if (error.message.includes('No subscription found for user')) {
      return res.status(404).json({ error: 'No subscription found' });
    }
    
    return res.status(500).json({ error: 'Error canceling subscription' });
  }
};

/**
 * Handle Stripe webhook
 * POST /api/subscriptions/webhook
 */
const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    
    if (!signature) {
      return res.status(400).json({ error: 'Stripe signature is required' });
    }
    
    // Verify webhook signature
    const event = stripeService.verifyWebhookSignature(req.rawBody, signature);
    
    // Handle webhook event
    const result = await subscriptionService.handleWebhookEvent(event);
    
    return res.status(200).json({ received: true, result });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(400).json({ error: 'Webhook error' });
  }
};

/**
 * Create a setup intent for saving payment method
 * POST /api/subscriptions/setup-intent
 */
const createSetupIntent = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get user's subscription to get customer ID
    const subscription = await subscriptionService.getSubscription(req.user.uid);
    
    if (!subscription || !subscription.stripeCustomerId) {
      return res.status(404).json({ error: 'No customer found' });
    }
    
    // Create setup intent
    const setupIntent = await stripeService.createSetupIntent(
      subscription.stripeCustomerId,
      { userId: req.user.uid }
    );
    
    return res.status(200).json({
      clientSecret: setupIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating setup intent:', error);
    return res.status(500).json({ error: 'Error creating setup intent' });
  }
};

module.exports = {
  getPlans,
  subscribe,
  getSubscription,
  changeSubscription,
  cancelSubscription,
  handleWebhook,
  createSetupIntent
};
