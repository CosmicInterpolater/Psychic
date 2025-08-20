const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Astrology horoscope endpoint
router.post('/horoscope', async (req, res) => {
  try {
    const { sign, period, birthCity, birthState, birthTime } = req.body;

    // Compose extra details for AI prompt
    let birthDetails = '';
    if (birthCity || birthState || birthTime) {
      birthDetails = `Birth Place: ${birthCity || ''}${birthCity && birthState ? ', ' : ''}${birthState || ''}. Time of Birth: ${birthTime || 'Unknown'}.`;
    }

    // Example: Call external astrology API or AI service
    const aiPrompt = `Provide a ${period} horoscope for ${sign}. ${birthDetails} Include ascendant and 1st house analysis if possible.`;
    const response = await axios.post('EXTERNAL_ASTROLOGY_API_URL', {
      prompt: aiPrompt,
      sign,
      period,
      birthCity,
      birthState,
      birthTime
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
