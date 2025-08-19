const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Astrology horoscope endpoint
router.post('/horoscope', async (req, res) => {
  try {
    const { sign, period } = req.body; // period: 'daily' or 'weekly'
    // Example: Call external astrology API
    const response = await axios.post('EXTERNAL_ASTROLOGY_API_URL', {
      sign,
      period
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.AI_API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get horoscope', details: error.message });
  }
});

module.exports = router;
