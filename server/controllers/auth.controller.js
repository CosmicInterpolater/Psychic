/**
 * Authentication Controller
 * Handles authentication-related API endpoints
 */

const authService = require('../services/auth.service');
const userService = require('../services/user.service');

/**
 * Register a new user
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Create user in Firebase Auth and Firestore
    const user = await authService.createUser(email, password, { displayName });

    // Return success response
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        uid: user.auth.uid,
        email: user.auth.email,
        displayName: user.auth.displayName || '',
        emailVerified: user.auth.emailVerified
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'Email already in use' });
    } else if (error.code === 'auth/invalid-email') {
      return res.status(400).json({ error: 'Invalid email format' });
    } else if (error.code === 'auth/weak-password') {
      return res.status(400).json({ error: 'Password is too weak' });
    }
    
    return res.status(500).json({ error: 'Error registering user' });
  }
};

/**
 * Login is handled client-side with Firebase Auth
 * This endpoint is for server-side validation if needed
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    // The actual authentication is handled by Firebase on the client side
    // This endpoint can be used for additional server-side validation or session management
    
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Get user profile from Firestore
    const userProfile = await userService.getProfile(req.user.uid);
    
    // Return user data
    return res.status(200).json({
      message: 'Login successful',
      user: {
        uid: req.user.uid,
        email: req.user.email,
        displayName: userProfile.displayName || '',
        photoURL: userProfile.photoURL || '',
        role: userProfile.role || 'user'
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Logout
 * POST /api/auth/logout
 */
const logout = (req, res) => {
  // Firebase handles token invalidation on the client side
  // This endpoint can be used for server-side session cleanup if needed
  return res.status(200).json({ message: 'Logout successful' });
};

/**
 * Reset password
 * POST /api/auth/reset-password
 */
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Generate password reset link
    const resetLink = await authService.generatePasswordResetLink(email);
    
    // In a production environment, you would send this link via email
    // For development, we can return it directly
    if (process.env.NODE_ENV === 'development') {
      return res.status(200).json({
        message: 'Password reset link generated',
        resetLink
      });
    }
    
    // TODO: Send email with reset link
    
    return res.status(200).json({
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/user-not-found') {
      // For security reasons, don't reveal that the user doesn't exist
      return res.status(200).json({ message: 'If the email exists, a reset link has been sent' });
    }
    
    return res.status(500).json({ error: 'Error processing password reset' });
  }
};

/**
 * Verify email
 * POST /api/auth/verify-email
 */
const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Generate email verification link
    const verificationLink = await authService.generateEmailVerificationLink(email);
    
    // In a production environment, you would send this link via email
    // For development, we can return it directly
    if (process.env.NODE_ENV === 'development') {
      return res.status(200).json({
        message: 'Email verification link generated',
        verificationLink
      });
    }
    
    // TODO: Send email with verification link
    
    return res.status(200).json({
      message: 'Verification email sent'
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    
    // Handle specific Firebase Auth errors
    if (error.code === 'auth/user-not-found') {
      // For security reasons, don't reveal that the user doesn't exist
      return res.status(200).json({ message: 'If the email exists, a verification link has been sent' });
    }
    
    return res.status(500).json({ error: 'Error processing email verification' });
  }
};

module.exports = {
  register,
  login,
  logout,
  resetPassword,
  verifyEmail
};
