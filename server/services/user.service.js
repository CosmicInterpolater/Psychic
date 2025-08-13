/**
 * User Service
 * Handles user profile operations
 */

const { db } = require('../config/firebase.config');
const userModel = require('../models/user.model');
const readingModel = require('../models/reading.model');
const subscriptionModel = require('../models/subscription.model');

const userService = {
  /**
   * Get a user profile by UID
   * @param {string} uid - The user ID
   * @returns {Promise<Object>} The user profile
   */
  getProfile: async (uid) => {
    try {
      const userProfile = await userModel.getByUid(db, uid);
      if (!userProfile) {
        throw new Error('User profile not found');
      }
      return userProfile;
    } catch (error) {
      throw new Error(`Error getting user profile: ${error.message}`);
    }
  },

  /**
   * Create a new user profile
   * @param {Object} userData - The user data
   * @returns {Promise<Object>} The created user profile
   */
  createProfile: async (userData) => {
    try {
      const userProfile = await userModel.create(db, userData);
      return userProfile;
    } catch (error) {
      throw new Error(`Error creating user profile: ${error.message}`);
    }
  },

  /**
   * Update a user profile
   * @param {string} uid - The user ID
   * @param {Object} userData - The user data to update
   * @returns {Promise<Object>} The updated user profile
   */
  updateProfile: async (uid, userData) => {
    try {
      // Ensure user exists
      const existingUser = await userModel.getByUid(db, uid);
      if (!existingUser) {
        throw new Error('User profile not found');
      }

      // Update user profile
      const updatedProfile = await userModel.update(db, uid, userData);
      return updatedProfile;
    } catch (error) {
      throw new Error(`Error updating user profile: ${error.message}`);
    }
  },

  /**
   * Delete a user profile and all associated data
   * @param {string} uid - The user ID
   * @returns {Promise<Object>} Success status
   */
  deleteProfile: async (uid) => {
    try {
      // Delete user's reading history
      await readingModel.deleteByUserId(db, uid);

      // Delete user's subscription
      await subscriptionModel.delete(db, uid);

      // Delete user profile
      await userModel.delete(db, uid);

      return { success: true };
    } catch (error) {
      throw new Error(`Error deleting user profile: ${error.message}`);
    }
  },

  /**
   * Get a user's reading history
   * @param {string} uid - The user ID
   * @param {number} limit - The maximum number of readings to return
   * @param {Object} startAfter - The cursor for pagination
   * @returns {Promise<Array>} The user's reading history
   */
  getReadingHistory: async (uid, limit = 20, startAfter = null) => {
    try {
      const readings = await readingModel.getByUserId(db, uid, limit, startAfter);
      return readings;
    } catch (error) {
      throw new Error(`Error getting reading history: ${error.message}`);
    }
  },

  /**
   * Get a specific reading
   * @param {string} uid - The user ID
   * @param {string} readingId - The reading ID
   * @returns {Promise<Object>} The reading
   */
  getReading: async (uid, readingId) => {
    try {
      const reading = await readingModel.getById(db, readingId);
      if (!reading) {
        throw new Error('Reading not found');
      }
      
      // Ensure the reading belongs to the user
      if (reading.userId !== uid) {
        throw new Error('Unauthorized access to reading');
      }
      
      return reading;
    } catch (error) {
      throw new Error(`Error getting reading: ${error.message}`);
    }
  },

  /**
   * List all users (admin only)
   * @param {number} limit - The maximum number of users to return
   * @param {Object} startAfter - The cursor for pagination
   * @returns {Promise<Array>} The list of users
   */
  listUsers: async (limit = 100, startAfter = null) => {
    try {
      const users = await userModel.list(db, limit, startAfter);
      return users;
    } catch (error) {
      throw new Error(`Error listing users: ${error.message}`);
    }
  }
};

module.exports = userService;
