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

    const selectSpread = (spreadType) => {
        setSelectedSpread(spreadType);
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
    };

    const generateBasicInterpretation = () => {
        const spread = spreadTypes[selectedSpread];
        let interpretation = `Your ${spread.name} reading reveals:\n\n`;

        drawnCards.forEach((card) => {
            const meaning = card.isReversed ? card.reversed : card.upright;
            interpretation += `**${card.position}**: The ${card.name}${card.isReversed ? ' (Reversed)' : ''} suggests ${meaning}\n\n`;
        });

        interpretation += "This reading offers guidance for reflection. Trust your intuition and take what resonates with your current situation.";
        return interpretation;
    };

    const generateInterpretation = async () => {
        setShowInterpretation(true);
        setGettingAnalysis(true);
        setReadingAnalysis({});

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
                const response = await axios.post(endpoint, {
                    drawnCards: drawnCards,
                    spread: selectedSpread,
                }, {
                    timeout: 8000,
                    headers: { 'Content-Type': 'application/json' }
                });

                setGettingAnalysis(false);
                setReadingAnalysis({
                    result: response.data.message || response.data.result || 'Reading completed successfully!'
                });
                apiSuccess = true;
                return;
            } catch (error) {
                continue;
            }
        }

        if (!apiSuccess) {
            setGettingAnalysis(false);
            const fallbackReading = generateBasicInterpretation();
            setReadingAnalysis({ result: fallbackReading });
        }
    };

    const resetReading = () => {
        setDrawnCards([]);
        setIsReading(false);
        setShowInterpretation(false);
        setReadingAnalysis({});
    };

    const getOverallReadingSubtitle = () => {
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
        selectSpread,
        shuffleAndDraw,
        generateInterpretation,
        resetReading,
        getOverallReadingSubtitle
    };
};
