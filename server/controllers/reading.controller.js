/**
 * Reading Controller
 * Handles reading history-related API endpoints
 */

const { db } = require('../config/firebase.config');
const readingModel = require('../models/reading.model');

/**
 * Save a new reading
 * POST /api/readings/save
 */
const saveReading = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { type, content, metadata } = req.body;
    
    // Validate input
    if (!type || !content) {
      return res.status(400).json({ error: 'Reading type and content are required' });
    }
    
    // Validate reading type
    const validTypes = ['tarot', 'palm', 'astrology', 'crystal', 'general'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid reading type' });
    }
    
    // Create reading data object
    const readingData = {
      userId: req.user.uid,
      type,
      content,
      metadata: metadata || {}
    };
    
    // Save reading to database
    const reading = await readingModel.create(db, readingData);
    
    return res.status(201).json({
      message: 'Reading saved successfully',
      reading
    });
  } catch (error) {
    console.error('Error saving reading:', error);
    return res.status(500).json({ error: 'Error saving reading' });
  }
};

/**
 * Get user's reading history
 * GET /api/readings/history
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
    
    // Get readings for user
    const readings = await readingModel.getByUserId(db, req.user.uid, limit, startAfter);
    
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
 * GET /api/readings/history/:id
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
    
    // Get reading
    const reading = await readingModel.getById(db, readingId);
    
    if (!reading) {
      return res.status(404).json({ error: 'Reading not found' });
    }
    
    // Ensure the reading belongs to the user
    if (reading.userId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized access to reading' });
    }
    
    return res.status(200).json(reading);
  } catch (error) {
    console.error('Error getting reading:', error);
    return res.status(500).json({ error: 'Error retrieving reading' });
  }
};

/**
 * Delete a reading
 * DELETE /api/readings/history/:id
 */
const deleteReading = async (req, res) => {
  try {
    // The user should be attached to the request by the verifyToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const readingId = req.params.id;
    
    if (!readingId) {
      return res.status(400).json({ error: 'Reading ID is required' });
    }
    
    // Get reading to check ownership
    const reading = await readingModel.getById(db, readingId);
    
    if (!reading) {
      return res.status(404).json({ error: 'Reading not found' });
    }
    
    // Ensure the reading belongs to the user
    if (reading.userId !== req.user.uid) {
      return res.status(403).json({ error: 'Unauthorized access to reading' });
    }
    
    // Delete reading
    await readingModel.delete(db, readingId);
    
    return res.status(200).json({
      message: 'Reading deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting reading:', error);
    return res.status(500).json({ error: 'Error deleting reading' });
  }
};

module.exports = {
  saveReading,
  getReadingHistory,
  getReading,
  deleteReading
};
