/**
 * Subscription Model
 * Defines the structure for user subscription data
 */

const subscriptionModel = {
  // Schema definition for a subscription
  schema: {
    userId: String,                // Reference to user
    stripeCustomerId: String,      // Stripe customer ID
    stripeSubscriptionId: String,  // Stripe subscription ID
    plan: {                        // Subscription plan
      type: String,
      enum: ['free', 'monthly', 'annual'],
      default: 'free'
    },
    status: {                      // Subscription status
      type: String,
      enum: ['active', 'canceled', 'past_due', 'unpaid', 'trialing'],
      default: 'active'
    },
    currentPeriodStart: Date,      // Current billing period start
    currentPeriodEnd: Date,        // Current billing period end
    cancelAtPeriodEnd: {           // Whether subscription will cancel at period end
      type: Boolean,
      default: false
    },
    createdAt: Date,               // Subscription creation timestamp
    updatedAt: Date                // Last update timestamp
  },

  // Create a new subscription
  create: (db, subscriptionData) => {
    const subscription = {
      userId: subscriptionData.userId,
      stripeCustomerId: subscriptionData.stripeCustomerId,
      stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
      plan: subscriptionData.plan || 'free',
      status: subscriptionData.status || 'active',
      currentPeriodStart: subscriptionData.currentPeriodStart || new Date(),
      currentPeriodEnd: subscriptionData.currentPeriodEnd || new Date(),
      cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return db.collection('subscriptions').doc(subscriptionData.userId).set(subscription)
      .then(() => subscription);
  },

  // Get a subscription by user ID
  getByUserId: (db, userId) => {
    return db.collection('subscriptions').doc(userId).get()
      .then(doc => {
        if (!doc.exists) {
          return null;
        }
        return doc.data();
      });
  },

  // Get a subscription by Stripe subscription ID
  getByStripeSubscriptionId: (db, stripeSubscriptionId) => {
    return db.collection('subscriptions')
      .where('stripeSubscriptionId', '==', stripeSubscriptionId)
      .limit(1)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return null;
        }
        return snapshot.docs[0].data();
      });
  },

  // Update a subscription
  update: (db, userId, subscriptionData) => {
    const updates = {
      ...subscriptionData,
      updatedAt: new Date()
    };
    
    return db.collection('subscriptions').doc(userId).update(updates)
      .then(() => {
        return db.collection('subscriptions').doc(userId).get();
      })
      .then(doc => doc.data());
  },

  // Delete a subscription
  delete: (db, userId) => {
    return db.collection('subscriptions').doc(userId).delete();
  },

  // List all subscriptions (for admin)
  list: (db, limit = 100, startAfter = null) => {
    let query = db.collection('subscriptions').orderBy('createdAt', 'desc').limit(limit);
    
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    
    return query.get()
      .then(snapshot => {
        const subscriptions = [];
        snapshot.forEach(doc => {
          subscriptions.push(doc.data());
        });
        return subscriptions;
      });
  }
};

module.exports = subscriptionModel;
