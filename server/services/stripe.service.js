/**
 * Stripe Service
 * Handles Stripe payment processing operations
 */

const stripeConfig = require('../config/stripe.config');
const { stripe, plans, webhookSecret } = stripeConfig;

const stripeService = {
  /**
   * Create a Stripe customer
   * @param {string} email - The customer's email
   * @param {string} name - The customer's name
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<Object>} The created customer
   */
  createCustomer: async (email, name, metadata = {}) => {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata
      });
      return customer;
    } catch (error) {
      throw new Error(`Error creating Stripe customer: ${error.message}`);
    }
  },

  /**
   * Create a subscription
   * @param {string} customerId - The Stripe customer ID
   * @param {string} planId - The plan ID
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} The created subscription
   */
  createSubscription: async (customerId, planId, options = {}) => {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: planId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        ...options
      });
      return subscription;
    } catch (error) {
      throw new Error(`Error creating subscription: ${error.message}`);
    }
  },

  /**
   * Get a subscription
   * @param {string} subscriptionId - The subscription ID
   * @returns {Promise<Object>} The subscription
   */
  getSubscription: async (subscriptionId) => {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error) {
      throw new Error(`Error retrieving subscription: ${error.message}`);
    }
  },

  /**
   * Update a subscription
   * @param {string} subscriptionId - The subscription ID
   * @param {Object} updateData - The data to update
   * @returns {Promise<Object>} The updated subscription
   */
  updateSubscription: async (subscriptionId, updateData) => {
    try {
      const subscription = await stripe.subscriptions.update(
        subscriptionId,
        updateData
      );
      return subscription;
    } catch (error) {
      throw new Error(`Error updating subscription: ${error.message}`);
    }
  },

  /**
   * Cancel a subscription
   * @param {string} subscriptionId - The subscription ID
   * @param {boolean} atPeriodEnd - Whether to cancel at period end
   * @returns {Promise<Object>} The canceled subscription
   */
  cancelSubscription: async (subscriptionId, atPeriodEnd = true) => {
    try {
      const subscription = atPeriodEnd
        ? await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true })
        : await stripe.subscriptions.cancel(subscriptionId);
      return subscription;
    } catch (error) {
      throw new Error(`Error canceling subscription: ${error.message}`);
    }
  },

  /**
   * Get available subscription plans
   * @returns {Object} The available plans
   */
  getPlans: () => {
    return plans;
  },

  /**
   * Create a payment intent
   * @param {number} amount - The amount in cents
   * @param {string} currency - The currency
   * @param {string} customerId - The customer ID
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<Object>} The payment intent
   */
  createPaymentIntent: async (amount, currency = 'usd', customerId, metadata = {}) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        metadata
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Error creating payment intent: ${error.message}`);
    }
  },

  /**
   * Create a setup intent
   * @param {string} customerId - The customer ID
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<Object>} The setup intent
   */
  createSetupIntent: async (customerId, metadata = {}) => {
    try {
      const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
        metadata
      });
      return setupIntent;
    } catch (error) {
      throw new Error(`Error creating setup intent: ${error.message}`);
    }
  },

  /**
   * Verify a webhook signature
   * @param {string} payload - The request body
   * @param {string} signature - The Stripe signature
   * @returns {Object} The webhook event
   */
  verifyWebhookSignature: (payload, signature) => {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );
      return event;
    } catch (error) {
      throw new Error(`Webhook signature verification failed: ${error.message}`);
    }
  }
};

module.exports = stripeService;
