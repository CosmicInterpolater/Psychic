import React, { useState } from 'react';
import './TarotReader.scss';
import { tarotDeck } from '../../data/tarotDeckData';

const spreadTypes = {
    "single": { name: "Single Card", cards: 1, positions: ["Present Situation"] },
    "three": { name: "Past, Present, Future", cards: 3, positions: ["Past", "Present", "Future"] },
    "celtic": { name: "Celtic Cross", cards: 10, positions: [
            "Present Situation", "Challenge", "Distant Past", "Recent Past",
            "Possible Outcome", "Near Future", "Your Approach", "External Influences",
            "Hopes & Fears", "Final Outcome"
        ]}
};

const TarotReader = () => {
    const [selectedSpread, setSelectedSpread] = useState("single");
    const [drawnCards, setDrawnCards] = useState([]);
    const [isReading, setIsReading] = useState(false);
    const [showInterpretation, setShowInterpretation] = useState(false);

    const selectSpread = (spreadType) => {
        setSelectedSpread(spreadType);
    };

    const shuffleAndDraw = () => {
        const spread = spreadTypes[selectedSpread];
        const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
        const cards = shuffled.slice(0, spread.cards).map((card, index) => ({
            ...card,
            position: spread.positions[index],
            reversed: Math.random() < 0.3 // 30% chance of reversed
        }));

        setDrawnCards(cards);
        setIsReading(true);
        setShowInterpretation(false);
    };

    const generateInterpretation = () => {
        setShowInterpretation(true);
    };

    const resetReading = () => {
        setDrawnCards([]);
        setIsReading(false);
        setShowInterpretation(false);
    };

    const getOverallReading = () => {
        if (drawnCards.length === 1) {
            return "Focus on this card's message for guidance in your current situation.";
        } else if (drawnCards.length === 3) {
            return "This reading shows the flow of energy from past experiences through your present circumstances toward future possibilities.";
        } else {
            return "This comprehensive reading reveals the complex forces at work in your situation, offering deep insights into your path forward.";
        }
    };

    const getGridClass = () => {
        if (drawnCards.length === 1) return 'grid-cols-1 max-w-sm mx-auto';
        if (drawnCards.length === 3) return 'grid-cols-1 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    };

    return (
        <div className="page-container">
            <section className="page-section">
                <h1 className="page-title">Tarot Card Reader</h1>

                <p className="text-center">Discover insights through the ancient wisdom of the cards</p>

                {/* Spread Selection */}
                {!isReading && (
                    <div className="spread-selection bg-white/10 backdrop-blur rounded-xl p-6 mb-8 border border-white/20">
                        <h2 className="text-2xl font-semibold text-white mb-4">Choose Your Reading</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {Object.entries(spreadTypes).map(([key, spread]) => (
                                <button
                                    key={key}
                                    onClick={() => selectSpread(key)}
                                    className={`spread-btn p-4 rounded-lg border-2 transition-all ${
                                        selectedSpread === key
                                            ? 'border-yellow-400 bg-yellow-400/20 text-white'
                                            : 'border-white/30 bg-white/5 text-blue-200 hover:border-white/50'
                                    }`}
                                >
                                    <div className="font-semibold">{spread.name}</div>
                                    <div className="text-sm opacity-80">{spread.cards} card{spread.cards > 1 ? 's' : ''}</div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={shuffleAndDraw}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <span>🔀</span>
                            Draw Cards
                        </button>
                    </div>
                )}

                {/* Card Display */}
                {isReading && (
                    <div className="card-display space-y-8">
                        {/* Cards Layout */}
                        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-white">
                                    {spreadTypes[selectedSpread].name} Reading
                                </h2>
                                <button
                                    onClick={resetReading}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
                                >
                                    <span>↻</span>
                                    New Reading
                                </button>
                            </div>

                            <div className={`grid gap-6 ${getGridClass()}`}>
                                {drawnCards.map((card, index) => (
                                    <div key={index} className="text-center">
                                        <div className={`card-container bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-lg p-6 mb-3 shadow-lg border-2 border-yellow-500 min-h-[200px] flex flex-col justify-center ${card.reversed ? 'card-reversed' : ''}`}>
                                            <div className={card.reversed ? 'card-content-reversed' : ''}>
                                                <div className="text-2xl mb-2">
                                                    {card.suit === "major" ? "✨" : "🃏"}
                                                </div>
                                                <div className="font-bold text-gray-800 text-lg mb-2">{card.name}</div>
                                                <div className="text-sm text-gray-700">
                                                    {card.keywords.slice(0, 2).join(" • ")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-white font-semibold">{card.position}</div>
                                        {card.reversed && <div className="text-yellow-400 text-sm">Reversed</div>}
                                    </div>
                                ))}
                            </div>

                            {!showInterpretation && (
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={generateInterpretation}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                                    >
                                        Reveal Interpretation
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Interpretation */}
                        {showInterpretation && (
                            <div className="interpretation bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                                <h3 className="text-2xl font-semibold text-white mb-4">Your Reading</h3>

                                <div className="mb-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                                    <p className="text-yellow-100 text-center italic">{getOverallReading()}</p>
                                </div>

                                <div className="space-y-6">
                                    {drawnCards.map((card, index) => (
                                        <div key={index} className="border-l-4 border-yellow-400 pl-4">
                                            <h4 className="text-xl font-semibold text-white mb-2">
                                                {card.position}: {card.name} {card.reversed ? "(Reversed)" : ""}
                                            </h4>
                                            <p className="text-blue-100 leading-relaxed">
                                                {card.reversed ? card.reversed : card.upright}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                                    <p className="text-blue-100 text-sm text-center mb-0">
                                        Remember, tarot readings offer guidance and reflection. Trust your intuition and take what resonates with you.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default TarotReader;
