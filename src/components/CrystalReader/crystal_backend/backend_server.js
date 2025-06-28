// server.js - Backend server for Crystal Readings
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend server is running' });
});

// Crystal insight endpoint using OpenAI
// Crystal insight endpoint
router.post('/crystal-insight', async (req, res) => {
  try {
    const { question, crystal, readingType } = req.body;

    if (!question || !crystal) {
      return res.status(400).json({ error: 'Question and crystal are required' });
    }

    const prompt = `As a crystal oracle, provide mystical insight for this reading:

Question: "${question}"
Crystal Selected: ${crystal.name} (${crystal.element} element, ${crystal.chakra} chakra)
Reading Type: ${readingType}
Crystal Properties: ${crystal.properties.join(', ')}
Crystal Meaning: ${crystal.meaning}

Provide a 2-3 sentence spiritual insight that:
1. Connects the crystal's energy to their specific question
2. Offers profound yet practical guidance
3. Uses mystical but accessible language
4. Feels personally meaningful and transformative

Focus on how ${crystal.name}'s unique energy addresses their concern about "${question}".`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a mystical crystal oracle who provides profound, spiritual insights. Your responses are wise, mystical, and personally meaningful while remaining grounded and practical."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 250,
        temperature: 0.8,
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const insight = response.data.choices[0].message.content.trim();
    res.json({ insight });

  } catch (error) {
    console.error('Crystal insight error:', error);
    
    if (error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid OpenAI API key' });
    } else if (error.response?.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded' });
    } else {
      res.status(500).json({ error: 'Failed to generate insight' });
    }
  }
});

// Alternative completion endpoint
app.post('/api/ai-completion', async (req, res) => {
  try {
    const { prompt, max_tokens = 250, temperature = 0.8 } = req.body;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens,
      temperature
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const completion = response.data.choices[0].message.content.trim();
    res.json({ completion });

  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate completion' });
  }
});

app.listen(PORT, () => {
  console.log(`Crystal Reading Backend Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
