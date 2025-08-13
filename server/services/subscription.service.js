/**
 * Subscription Service
 * Handles subscription operations
 */

const { db } = require('../config/firebase.config');
const subscriptionModel = require('../models/subscription.model');
const stripeService = require('./stripe.service');
const userService = require('./user.service');

const subscriptionService = {
  /**
   * Get available subscription plans
   * @returns {Object} The available plans
   */
  getPlans: () => {
    return stripeService.getPlans();
  },

  /**
   * Create a subscription for a user
   * @param {string} uid - The user ID
   * @param {string} planId - The plan ID
   * @param {Object} paymentMethodId - The payment method ID
   * @returns {Promise<Object>} The created subscription
   */
  createSubscription: async (uid, planId, paymentMethodId) => {
    try {
      // Get user profile
      const userProfile = await userService.getProfile(uid);
      
      // Check if user already has a subscription
      const existingSubscription = await subscriptionModel.getByUserId(db, uid);
      if (existingSubscription && existingSubscription.status === 'active') {
        throw new Error('User already has an active subscription');
      }
      
      // Create or get Stripe customer
      let stripeCustomerId;
      if (existingSubscription && existingSubscription.stripeCustomerId) {
        stripeCustomerId = existingSubscription.stripeCustomerId;
      } else {
        // Create Stripe customer
        const customer = await stripeService.createCustomer(
          userProfile.email,
          userProfile.displayName || userProfile.email,
          { userId: uid }
        );
        stripeCustomerId = customer.id;
      }
      
      // Attach payment method to customer if provided
      if (paymentMethodId) {
        await stripeService.attachPaymentMethod(stripeCustomerId, paymentMethodId);
      }
      
      // Create Stripe subscription
      const stripeSubscription = await stripeService.createSubscription(
        stripeCustomerId,
        planId
      );
      
      // Determine plan type
      let planType = 'monthly';
      if (planId === stripeService.getPlans().annual.id) {
        planType = 'annual';
      }
      
      // Create subscription in Firestore
      const subscription = await subscriptionModel.create(db, {
        userId: uid,
        stripeCustomerId,
        stripeSubscriptionId: stripeSubscription.id,
        plan: planType,
        status: stripeSubscription.status,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
      });
      
      return {
        subscription,
        clientSecret: stripeSubscription.latest_invoice.payment_intent.client_secret
      };
    } catch (error) {
      throw new Error(`Error creating subscription: ${error.message}`);
    }
  },

  /**
   * Get a user's subscription
   * @param {string} uid - The user ID
   * @returns {Promise<Object>} The subscription
   */
  getSubscription: async (uid) => {
    try {
      const subscription = await subscriptionModel.getByUserId(db, uid);
      
      if (!subscription) {
        return null;
      }
      
      // If subscription exists in Firestore, check if it's up to date with Stripe
      if (subscription.stripeSubscriptionId) {
        try {
          const stripeSubscription = await stripeService.getSubscription(
            subscription.stripeSubscriptionId
          );
          
          // Update subscription if Stripe data is different
          if (
            stripeSubscription.status !== subscription.status ||
            stripeSubscription.cancel_at_period_end !== subscription.cancelAtPeriodEnd ||
            new Date(stripeSubscription.current_period_end * 1000).getTime() !== subscription.currentPeriodEnd.getTime()
          ) {
            const updatedSubscription = await subscriptionModel.update(db, uid, {
              status: stripeSubscription.status,
              currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
              currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
              cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
            });
            
            return updatedSubscription;
          }
        } catch (stripeError) {
          console.error('Error fetching Stripe subscription:', stripeError);
          // Continue with local data if Stripe fetch fails
        }
      }
      
      return subscription;
    } catch (error) {
      throw new Error(`Error getting subscription: ${error.message}`);
    }
  },

  /**
   * Update a user's subscription
   * @param {string} uid - The user ID
   * @param {string} planId - The new plan ID
   * @returns {Promise<Object>} The updated subscription
   */
  updateSubscription: async (uid, planId) => {
    try {
      // Get current subscription
      const subscription = await subscriptionModel.getByUserId(db, uid);
      
      if (!subscription) {
        throw new Error('No subscription found for user');
      }
      
      // Update subscription in Stripe
      const stripeSubscription = await stripeService.updateSubscription(
        subscription.stripeSubscriptionId,
        {
          items: [
            {
              id: subscription.stripeSubscriptionId,
              price: planId
            }
          ]
        }
      );
      
      // Determine plan type
      let planType = 'monthly';
      if (planId === stripeService.getPlans().annual.id) {
        planType = 'annual';
      }
      
      // Update subscription in Firestore
      const updatedSubscription = await subscriptionModel.update(db, uid, {
        plan: planType,
        status: stripeSubscription.status,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
      });
      
      return updatedSubscription;
    } catch (error) {
      throw new Error(`Error updating subscription: ${error.message}`);
    }
  },

  /**
   * Cancel a user's subscription
   * @param {string} uid - The user ID
   * @param {boolean} atPeriodEnd - Whether to cancel at period end
   * @returns {Promise<Object>} The canceled subscription
   */
  cancelSubscription: async (uid, atPeriodEnd = true) => {
    try {
      // Get current subscription
      const subscription = await subscriptionModel.getByUserId(db, uid);
      
      if (!subscription) {
        throw new Error('No subscription found for user');
      }
      
      // Cancel subscription in Stripe
      const stripeSubscription = await stripeService.cancelSubscription(
        subscription.stripeSubscriptionId,
        atPeriodEnd
      );
      
      // Update subscription in Firestore
      const updatedSubscription = await subscriptionModel.update(db, uid, {
        status: atPeriodEnd ? subscription.status : 'canceled',
        cancelAtPeriodEnd: atPeriodEnd || false
      });
      
      return updatedSubscription;
    } catch (error) {
      throw new Error(`Error canceling subscription: ${error.message}`);
    }
  },

  /**
   * Handle Stripe webhook events
   * @param {Object} event - The Stripe event
   * @returns {Promise<Object>} The result of the webhook handling
   */
  handleWebhookEvent: async (event) => {
    try {
      const { type, data } = event;
      
      switch (type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          return await handleSubscriptionUpdated(data.object);
          
        case 'customer.subscription.deleted':
          return await handleSubscriptionDeleted(data.object);
          
        case 'invoice.payment_succeeded':
          return await handleInvoicePaymentSucceeded(data.object);
          
        case 'invoice.payment_failed':
          return await handleInvoicePaymentFailed(data.object);
          
        default:
          return { status: 'ignored', event: type };
      }
    } catch (error) {
      throw new Error(`Error handling webhook event: ${error.message}`);
    }
  }
};

/**
 * Handle subscription updated webhook
 * @param {Object} subscription - The Stripe subscription
 * @returns {Promise<Object>} The result
 */
const handleSubscriptionUpdated = async (subscription) => {
  try {
    // Find the subscription in Firestore by Stripe subscription ID
    const firestoreSubscription = await subscriptionModel.getByStripeSubscriptionId(
      db,
      subscription.id
    );
    
    if (!firestoreSubscription) {
      return { status: 'ignored', reason: 'Subscription not found in Firestore' };
    }
    
    // Update subscription in Firestore
    const updatedSubscription = await subscriptionModel.update(
      db,
      firestoreSubscription.userId,
      {
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end
      }
    );
    
    return { status: 'success', subscription: updatedSubscription };
  } catch (error) {
    throw new Error(`Error handling subscription updated: ${error.message}`);
  }
};

/**
 * Handle subscription deleted webhook
 * @param {Object} subscription - The Stripe subscription
 * @returns {Promise<Object>} The result
 */
const handleSubscriptionDeleted = async (subscription) => {
  try {
    // Find the subscription in Firestore by Stripe subscription ID
    const firestoreSubscription = await subscriptionModel.getByStripeSubscriptionId(
      db,
      subscription.id
    );
    
    if (!firestoreSubscription) {
      return { status: 'ignored', reason: 'Subscription not found in Firestore' };
    }
    
    // Update subscription in Firestore
    const updatedSubscription = await subscriptionModel.update(
      db,
      firestoreSubscription.userId,
      {
        status: 'canceled',
        cancelAtPeriodEnd: false
      }
    );
    
    return { status: 'success', subscription: updatedSubscription };
  } catch (error) {
    throw new Error(`Error handling subscription deleted: ${error.message}`);
  }
};

/**
 * Handle invoice payment succeeded webhook
 * @param {Object} invoice - The Stripe invoice
 * @returns {Promise<Object>} The result
 */
const handleInvoicePaymentSucceeded = async (invoice) => {
  try {
    if (!invoice.subscription) {
      return { status: 'ignored', reason: 'Invoice not associated with a subscription' };
    }
    
    // Find the subscription in Firestore by Stripe subscription ID
    const firestoreSubscription = await subscriptionModel.getByStripeSubscriptionId(
      db,
      invoice.subscription
    );
    
    if (!firestoreSubscription) {
      return { status: 'ignored', reason: 'Subscription not found in Firestore' };
    }
    
    // Update subscription in Firestore if needed
    if (firestoreSubscription.status !== 'active') {
      const updatedSubscription = await subscriptionModel.update(
        db,
        firestoreSubscription.userId,
        {
          status: 'active'
        }
      );
      
      return { status: 'success', subscription: updatedSubscription };
    }
    
    return { status: 'success', subscription: firestoreSubscription };
  } catch (error) {
    throw new Error(`Error handling invoice payment succeeded: ${error.message}`);
  }
};

/**
 * Handle invoice payment failed webhook
 * @param {Object} invoice - The Stripe invoice
 * @returns {Promise<Object>} The result
 */
const handleInvoicePaymentFailed = async (invoice) => {
  try {
    if (!invoice.subscription) {
      return { status: 'ignored', reason: 'Invoice not associated with a subscription' };
    }
    
    // Find the subscription in Firestore by Stripe subscription ID
    const firestoreSubscription = await subscriptionModel.getByStripeSubscriptionId(
      db,
      invoice.subscription
    );
    
    if (!firestoreSubscription) {
      return { status: 'ignored', reason: 'Subscription not found in Firestore' };
    }
    
    // Update subscription in Firestore
    const updatedSubscription = await subscriptionModel.update(
      db,
      firestoreSubscription.userId,
      {
        status: 'past_due'
      }
    );
    
    return { status: 'success', subscription: updatedSubscription };
  } catch (error) {
    throw new Error(`Error handling invoice payment failed: ${error.message}`);
  }
};

module.exports = subscriptionService;
