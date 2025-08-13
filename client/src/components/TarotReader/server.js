// Example Express.js backend API endpoint
// File: server.js or routes/tarot.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Set this in your environment variables
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Alternative: You can also use other AI services like:
// - Anthropic Claude API
// - Google Gemini API
// - Local AI models via Ollama
// - Azure OpenAI Service

app.post('/api/tarot-reading', async (req, res) => {
    try {
        const { drawnCards, spread, spreadType, question } = req.body;

        // Validate input
        if (!drawnCards || !Array.isArray(drawnCards) || drawnCards.length === 0) {
            return res.status(400).json({ error: 'No cards provided for reading' });
        }

        // Build the prompt for the AI
        const prompt = buildTarotPrompt(drawnCards, spreadType, question);

        // Make request to OpenAI API
        const openAIResponse = await axios.post(OPENAI_API_URL, {
            model: "gpt-4", // or "gpt-3.5-turbo" for faster/cheaper responses
            messages: [
                {
                    role: "system",
                    content: "You are an experienced tarot reader with deep knowledge of card meanings, symbolism, and interpretative techniques. Provide insightful, compassionate, and meaningful readings while being respectful of the questioner's concerns. Focus on guidance and reflection rather than making definitive predictions."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 1000,
            temperature: 0.7,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        const aiInterpretation = openAIResponse.data.choices[0].message.content;

        res.json({
            success: true,
            result: aiInterpretation,
            hasQuestion: !!question,
            spread: spreadType.name,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error generating tarot reading:', error.message);

        // Handle different types of errors
        if (error.response?.status === 401) {
            res.status(500).json({ error: 'AI service authentication failed' });
        } else if (error.response?.status === 429) {
            res.status(429).json({ error: 'AI service rate limit exceeded. Please try again later.' });
        } else if (error.code === 'ECONNABORTED') {
            res.status(408).json({ error: 'AI service request timeout' });
        } else {
            res.status(500).json({ error: 'Failed to generate reading interpretation' });
        }
    }
});

function buildTarotPrompt(drawnCards, spreadType, question) {
    let prompt = `Please provide a comprehensive tarot reading interpretation.\n\n`;

    if (question) {
        prompt += `**Question Asked**: "${question}"\n\n`;
    }

    prompt += `**Spread Type**: ${spreadType.name} (${drawnCards.length} cards)\n\n`;

    prompt += `**Cards Drawn**:\n`;
    drawnCards.forEach((card, index) => {
        prompt += `${index + 1}. **${card.position}**: ${card.name}${card.isReversed ? ' (Reversed)' : ''}\n`;
        prompt += `   - Upright meaning: ${card.upright}\n`;
        if (card.reversed) {
            prompt += `   - Reversed meaning: ${card.reversed}\n`;
        }
        prompt += `\n`;
    });

    if (question) {
        prompt += `Please provide a detailed interpretation that specifically addresses the question "${question}" using the context of these cards and their positions. `;
    }

    prompt += `Please provide:\n`;
    prompt += `1. An overall interpretation of the reading\n`;
    prompt += `2. How the cards relate to each other within the spread\n`;
    prompt += `3. Key insights or guidance based on the card combination\n`;
    if (question) {
        prompt += `4. Specific guidance related to the question asked\n`;
    }
    prompt += `\nPlease write in a warm, insightful tone that offers guidance for reflection and personal growth.`;

    return prompt;
}

// Alternative API endpoint for different AI services
//app.post('/api/tarot-reading-claude', async (req, res) => {
// Implementation for Anthropic Claude API
// Similar structure but different API endpoint and request format
//});

//app.post('/api/tarot-reading-local', async (req, res) => {
// Implementation for local AI models (e.g., Ollama)
// Example: http://localhost:11434/api/generate for Ollama
//});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Tarot reading API server running on port ${PORT}`);
});

module.exports = app;
