const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  stripe,
  plans: {
    monthly: {
      id: process.env.STRIPE_MONTHLY_PLAN_ID || 'price_monthly',
      name: 'Monthly',
      amount: 999, // $9.99
      interval: 'month'
    },
    annual: {
      id: process.env.STRIPE_ANNUAL_PLAN_ID || 'price_annual',
      name: 'Annual',
      amount: 9999, // $99.99
      interval: 'year'
    }
  },
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
};
