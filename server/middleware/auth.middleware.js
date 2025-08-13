/**
 * Authentication Middleware
 * Provides middleware functions for route protection
 */

const authService = require('../services/auth.service');
const userService = require('../services/user.service');

/**
 * Middleware to verify Firebase ID token in the request
 * Attaches the decoded token to req.user if valid
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    // Extract the token from the Authorization header
    // Format: "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Invalid authorization format' });
    }

    const token = parts[1];
    
    // Verify the token
    const decodedToken = await authService.verifyIdToken(token);
    
    // Attach the decoded token to the request object
    req.user = decodedToken;
    
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Middleware to ensure the user is authenticated
 * Must be used after verifyToken middleware
 */
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

/**
 * Middleware to ensure the user is an admin
 * Must be used after verifyToken middleware
 */
const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get the user profile to check role
    const userProfile = await userService.getProfile(req.user.uid);
    
    if (!userProfile || userProfile.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Middleware to ensure the user has an active subscription
 * Must be used after verifyToken middleware
 */
const requireSubscription = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Import here to avoid circular dependency
    const subscriptionService = require('../services/subscription.service');
    
    // Check if user has an active subscription
    const subscription = await subscriptionService.getSubscription(req.user.uid);
    
    if (!subscription || subscription.status !== 'active') {
      return res.status(403).json({ error: 'Active subscription required' });
    }
    
    // Attach subscription to request for potential use in route handlers
    req.subscription = subscription;
    
    next();
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  verifyToken,
  requireAuth,
  requireAdmin,
  requireSubscription
};
