const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { OpenAI } = require('openai');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize OpenAI - with error handling
let openai;
try {
    if (!process.env.OPENAI_API_KEY) {
        console.error('ERROR: OPENAI_API_KEY is not set in environment variables');
        console.error('Please create a .env file with: OPENAI_API_KEY=your_api_key_here');
        process.exit(1);
    }
    
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('OpenAI client initialized successfully');
} catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
    process.exit(1);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.post('/api/tarot-reading', async (req, res) => {
    console.log('Tarot reading request received');
    
    const {
        spread,
        drawnCards
    } = req.body;

    let cardMessage = drawnCards.map((card, index) => {
        return `${index + 1}: ${card.name} (${card.isReversed ? "reversed" : "upright"})`;
    })
        .join('\n')

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o', // or 'gpt-3.5-turbo'
            messages: [
                {
                    role: "system",
                    content: "You are a skilled and intuitive tarot reader. You give thoughtful, insightful, and grounded interpretations of tarot card spreads, including reversed cards."
                },
                {
                    role: "user",
                    content: `The querent has drawn the following cards:\n${cardMessage}
\n
This is a ${spread} reading.\n
Please integrate the meanings of the cards into a cohesive interpretation under 300 words.`
                }
            ]
        });

        res.json({message: response.choices[0].message.content});
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({error: 'Something went wrong with tarot reading.'});
    }
});

app.post('/api/crystal-insight', async (req, res) => {
    console.log('Crystal insight request received');
    
    const { question, crystal, readingType } = req.body;
    
    if (!question || !crystal) {
        return res.status(400).json({ error: 'Question and crystal are required' });
    }

    try {
        const prompt = `As a crystal oracle, provide mystical insight for this reading:

Question: "${question}"
Crystal Selected: ${crystal.name} (${crystal.element} element, ${crystal.chakra} chakra)
Reading Type: ${readingType}
Crystal Properties: ${crystal.properties ? crystal.properties.join(', ') : 'Not specified'}
Crystal Meaning: ${crystal.meaning}

Provide a 2-3 sentence spiritual insight that:
1. Connects the crystal's energy to their specific question
2. Offers profound yet practical guidance
3. Uses mystical but accessible language
4. Feels personally meaningful and transformative

Focus on how ${crystal.name}'s unique energy addresses their concern about "${question}".`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: "system",
                    content: "You are a mystical crystal oracle with deep knowledge of crystal energies, chakras, and spiritual guidance. You provide insightful, meaningful interpretations that connect crystal properties to personal questions."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 200,
            temperature: 0.8
        });

        res.json({ insight: response.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API Error in crystal insight:', error);
        res.status(500).json({ error: 'Something went wrong with crystal insight generation.' });
    }
});

// Serve static files from webpack build (dist folder)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));

    // Handle React routing
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
}

// 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', req.url);
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /api/health');
    console.log('  GET  /api/test');
    console.log('  POST /api/tarot-reading');
    console.log('  POST /api/crystal-insight');
});
