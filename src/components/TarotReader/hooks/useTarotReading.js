// hooks/useTarotReading.js
import { useState } from 'react';
import axios from 'axios';

export const useTarotReading = (tarotDeck, spreadTypes) => {
    const [selectedSpread, setSelectedSpread] = useState("single");
    const [drawnCards, setDrawnCards] = useState([]);
    const [isReading, setIsReading] = useState(false);
    const [showInterpretation, setShowInterpretation] = useState(false);
    const [gettingAnalysis, setGettingAnalysis] = useState(false);
    const [readingAnalysis, setReadingAnalysis] = useState({});
    const [userQuestion, setUserQuestion] = useState("");
    const [questionAsked, setQuestionAsked] = useState("");

    const selectSpread = (spreadType) => {
        setSelectedSpread(spreadType);
    };

    const setQuestion = (question) => {
        setUserQuestion(question);
    };

    const shuffleAndDraw = () => {
        const spread = spreadTypes[selectedSpread];
        const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
        const cards = shuffled.slice(0, spread.cards).map((card, index) => ({
            ...card,
            position: spread.positions[index],
            isReversed: Math.random() < 0.3
        }));

        setDrawnCards(cards);
        setIsReading(true);
        setShowInterpretation(false);
        setQuestionAsked(userQuestion); // Save the question that was asked
    };

    const generateBasicInterpretation = (withQuestion = false) => {
        const spread = spreadTypes[selectedSpread];
        let interpretation = "";
        
        if (withQuestion && questionAsked) {
            interpretation += `**Your Question**: "${questionAsked}"\n\n`;
        }
        
        interpretation += `Your ${spread.name} reading reveals:\n\n`;

        drawnCards.forEach((card) => {
            const meaning = card.isReversed ? card.reversed : card.upright;
            interpretation += `**${card.position}**: The ${card.name}${card.isReversed ? ' (Reversed)' : ''} suggests ${meaning}\n\n`;
        });

        if (withQuestion && questionAsked) {
            interpretation += `**Guidance for your question**: The cards suggest reflecting on how these energies relate to "${questionAsked}". `;
        }
        
        interpretation += "This reading offers guidance for reflection. Trust your intuition and take what resonates with your current situation.";
        return interpretation;
    };

    const generateInterpretation = async () => {
        setShowInterpretation(true);
        setGettingAnalysis(true);
        setReadingAnalysis({});

        // Prepare the payload with question if provided
        const payload = {
            drawnCards: drawnCards,
            spread: selectedSpread,
            spreadType: spreadTypes[selectedSpread],
            question: questionAsked || null
        };

        const apiEndpoints = [
            '/api/tarot-reading',
            'http://localhost:5000/api/tarot-reading',
            'http://localhost:3001/api/tarot-reading', 
            'http://localhost:5555/api/tarot-reading'
        ];

        let apiSuccess = false;

        for (const endpoint of apiEndpoints) {
            if (apiSuccess) break;

            try {
                const response = await axios.post(endpoint, payload, {
                    timeout: 15000, // Increased timeout for AI processing
                    headers: { 'Content-Type': 'application/json' }
                });

                setGettingAnalysis(false);
                setReadingAnalysis({
                    result: response.data.message || response.data.result || 'Reading completed successfully!',
                    hasQuestion: !!questionAsked
                });
                apiSuccess = true;
                return;
            } catch (error) {
                console.log(`API endpoint ${endpoint} failed:`, error.message);
                continue;
            }
        }

        if (!apiSuccess) {
            console.log("All API endpoints failed, using fallback interpretation");
            setGettingAnalysis(false);
            const fallbackReading = generateBasicInterpretation(true);
            setReadingAnalysis({ 
                result: fallbackReading,
                hasQuestion: !!questionAsked,
                isFallback: true
            });
        }
    };

    const resetReading = () => {
        setDrawnCards([]);
        setIsReading(false);
        setShowInterpretation(false);
        setReadingAnalysis({});
        setUserQuestion("");
        setQuestionAsked("");
    };

    const getOverallReadingSubtitle = () => {
        if (questionAsked) {
            return `The cards respond to your question: "${questionAsked}"`;
        }
        
        if (drawnCards.length === 1) {
            return "Focus on this card's message for guidance in your current situation.";
        } else if (drawnCards.length === 3) {
            return "This reading shows the flow of energy from past experiences through your present circumstances toward future possibilities.";
        } else {
            return "This comprehensive reading reveals the complex forces at work in your situation, offering deep insights into your path forward.";
        }
    };

    return {
        selectedSpread,
        drawnCards,
        isReading,
        showInterpretation,
        gettingAnalysis,
        readingAnalysis,
        userQuestion,
        questionAsked,
        selectSpread,
        setQuestion,
        shuffleAndDraw,
        generateInterpretation,
        resetReading,
        getOverallReadingSubtitle
    };
};