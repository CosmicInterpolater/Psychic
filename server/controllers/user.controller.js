/**
 * User Controller
 * Handles user profile-related API endpoints
 */

const userService = require('../services/user.service');
const authService = require('../services/auth.service');

/**
 * Get current user profile
 * GET /api/users/profile
 */
const getProfile = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userProfile = await userService.getProfile(req.user.uid);
    
    // Remove sensitive information
    const { uid, email, displayName, photoURL, createdAt, updatedAt, role, preferences } = userProfile;
    
    return res.status(200).json({
      uid,
      email,
      displayName,
      photoURL,
      createdAt,
      updatedAt,
      role,
      preferences
    });
  } catch (error) {
    console.error('Error getting user profile:', error);
    
    if (error.message === 'User profile not found') {
      return res.status(404).json({ error: 'User profile not found' });
    }
    
    return res.status(500).json({ error: 'Error retrieving user profile' });
  }
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
const updateProfile = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { displayName, photoURL, preferences } = req.body;
    
    // Create update object with only the fields that are provided
    const updateData = {};
    if (displayName !== undefined) updateData.displayName = displayName;
    if (photoURL !== undefined) updateData.photoURL = photoURL;
    if (preferences !== undefined) updateData.preferences = preferences;
    
    // Update user profile in Firestore
    const updatedProfile = await userService.updateProfile(req.user.uid, updateData);
    
    // Update user in Firebase Auth if needed
    if (displayName !== undefined || photoURL !== undefined) {
      const authUpdateData = {};
      if (displayName !== undefined) authUpdateData.displayName = displayName;
      if (photoURL !== undefined) authUpdateData.photoURL = photoURL;
      
      await authService.updateUser(req.user.uid, authUpdateData);
    }
    
    // Remove sensitive information
    const { uid, email, createdAt, updatedAt, role } = updatedProfile;
    
    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        uid,
        email,
        displayName: updatedProfile.displayName,
        photoURL: updatedProfile.photoURL,
        createdAt,
        updatedAt,
        role,
        preferences: updatedProfile.preferences
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    
    if (error.message === 'User profile not found') {
      return res.status(404).json({ error: 'User profile not found' });
    }
    
    return res.status(500).json({ error: 'Error updating user profile' });
  }
};

/**
 * Delete user account
 * DELETE /api/users/profile
 */
const deleteAccount = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Delete user account
    await authService.deleteUser(req.user.uid);
    
    return res.status(200).json({
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user account:', error);
    return res.status(500).json({ error: 'Error deleting user account' });
  }
};

/**
 * Get user's reading history
 * GET /api/users/readings
 */
const getReadingHistory = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get pagination parameters
    const limit = parseInt(req.query.limit) || 20;
    const startAfter = req.query.startAfter || null;
    
    const readings = await userService.getReadingHistory(req.user.uid, limit, startAfter);
    
    return res.status(200).json({
      readings,
      pagination: {
        limit,
        startAfter: readings.length > 0 ? readings[readings.length - 1].createdAt : null,
        hasMore: readings.length === limit
      }
    });
  } catch (error) {
    console.error('Error getting reading history:', error);
    return res.status(500).json({ error: 'Error retrieving reading history' });
  }
};

/**
 * Get a specific reading
 * GET /api/users/readings/:id
 */
const getReading = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const readingId = req.params.id;
    
    if (!readingId) {
      return res.status(400).json({ error: 'Reading ID is required' });
    }
    
    const reading = await userService.getReading(req.user.uid, readingId);
    
    return res.status(200).json(reading);
  } catch (error) {
    console.error('Error getting reading:', error);
    
    if (error.message === 'Reading not found') {
      return res.status(404).json({ error: 'Reading not found' });
    } else if (error.message === 'Unauthorized access to reading') {
      return res.status(403).json({ error: 'Unauthorized access to reading' });
    }
    
    return res.status(500).json({ error: 'Error retrieving reading' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
  getReadingHistory,
  getReading
};
