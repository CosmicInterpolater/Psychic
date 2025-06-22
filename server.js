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

// API Routes
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.post('/api/tarot-reading', async (req, res) => {

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
        res.status(500).json({error: 'Something went wrong.'});
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
