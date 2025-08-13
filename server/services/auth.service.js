/**
 * Authentication Service
 * Handles authentication operations using Firebase Auth
 */

const { auth } = require('../config/firebase.config');
const userModel = require('../models/user.model');
const { db } = require('../config/firebase.config');

const authService = {
  /**
   * Verify a Firebase ID token
   * @param {string} idToken - The Firebase ID token to verify
   * @returns {Promise<Object>} The decoded token
   */
  verifyIdToken: async (idToken) => {
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new Error(`Error verifying ID token: ${error.message}`);
    }
  },

  /**
   * Create a custom token for a user
   * @param {string} uid - The user ID
   * @param {Object} claims - Additional claims to include in the token
   * @returns {Promise<string>} The custom token
   */
  createCustomToken: async (uid, claims = {}) => {
    try {
      const token = await auth.createCustomToken(uid, claims);
      return token;
    } catch (error) {
      throw new Error(`Error creating custom token: ${error.message}`);
    }
  },

  /**
   * Get a user by UID
   * @param {string} uid - The user ID
   * @returns {Promise<Object>} The user data
   */
  getUserByUid: async (uid) => {
    try {
      const user = await auth.getUser(uid);
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  },

  /**
   * Create a new user in Firebase Auth
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @param {Object} userData - Additional user data
   * @returns {Promise<Object>} The created user
   */
  createUser: async (email, password, userData = {}) => {
    try {
      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || '',
        emailVerified: false,
        disabled: false
      });

      // Create user profile in Firestore
      const userProfile = await userModel.create(db, {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || '',
        photoURL: userRecord.photoURL || '',
        role: userData.role || 'user',
        preferences: userData.preferences || {}
      });

      return {
        auth: userRecord,
        profile: userProfile
      };
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  /**
   * Update a user in Firebase Auth
   * @param {string} uid - The user ID
   * @param {Object} userData - The user data to update
   * @returns {Promise<Object>} The updated user
   */
  updateUser: async (uid, userData) => {
    try {
      // Update user in Firebase Auth
      const updateAuthData = {};
      if (userData.email) updateAuthData.email = userData.email;
      if (userData.password) updateAuthData.password = userData.password;
      if (userData.displayName) updateAuthData.displayName = userData.displayName;
      if (userData.photoURL) updateAuthData.photoURL = userData.photoURL;
      if (userData.emailVerified !== undefined) updateAuthData.emailVerified = userData.emailVerified;
      if (userData.disabled !== undefined) updateAuthData.disabled = userData.disabled;

      const userRecord = await auth.updateUser(uid, updateAuthData);

      // Update user profile in Firestore if needed
      let userProfile = null;
      const updateProfileData = {};
      if (userData.email) updateProfileData.email = userData.email;
      if (userData.displayName) updateProfileData.displayName = userData.displayName;
      if (userData.photoURL) updateProfileData.photoURL = userData.photoURL;
      if (userData.role) updateProfileData.role = userData.role;
      if (userData.preferences) updateProfileData.preferences = userData.preferences;

      if (Object.keys(updateProfileData).length > 0) {
        userProfile = await userModel.update(db, uid, updateProfileData);
      }

      return {
        auth: userRecord,
        profile: userProfile
      };
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  /**
   * Delete a user
   * @param {string} uid - The user ID
   * @returns {Promise<void>}
   */
  deleteUser: async (uid) => {
    try {
      // Delete user from Firebase Auth
      await auth.deleteUser(uid);

      // Delete user profile from Firestore
      await userModel.delete(db, uid);

      return { success: true };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },

  /**
   * Generate a password reset link
   * @param {string} email - The user's email
   * @returns {Promise<string>} The password reset link
   */
  generatePasswordResetLink: async (email) => {
    try {
      const link = await auth.generatePasswordResetLink(email);
      return link;
    } catch (error) {
      throw new Error(`Error generating password reset link: ${error.message}`);
    }
  },

  /**
   * Generate an email verification link
   * @param {string} email - The user's email
   * @returns {Promise<string>} The email verification link
   */
  generateEmailVerificationLink: async (email) => {
    try {
      const link = await auth.generateEmailVerificationLink(email);
      return link;
    } catch (error) {
      throw new Error(`Error generating email verification link: ${error.message}`);
    }
  }
};

module.exports = authService;
