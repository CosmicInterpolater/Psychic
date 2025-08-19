const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Tarot interpretation endpoint
router.post('/interpret', async (req, res) => {
  try {
    const { spread } = req.body;
    // Example: Call external AI service for tarot interpretation
    const response = await axios.post('EXTERNAL_TAROT_API_URL', {
      spread
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.AI_API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tarot interpretation', details: error.message });
  }
});

module.exports = router;
