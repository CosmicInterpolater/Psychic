// components/CardDisplay.js
import React from 'react';
import TarotCard from './TarotCard';

const CardDisplay = ({ 
    spreadTypes, 
    selectedSpread, 
    drawnCards, 
    showInterpretation, 
    onResetReading, 
    onGetInterpretation 
}) => {
    const getGridClass = () => {
        if (drawnCards.length === 1) return 'grid-cols-1 max-w-sm mx-auto';
        if (drawnCards.length === 3) return 'grid-cols-1 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    };

    return (
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">
                    {spreadTypes[selectedSpread].name} Reading
                </h2>
                <button
                    onClick={onResetReading}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
                >
                    <span>↻</span>
                    New Reading
                </button>
            </div>

            <div className={`grid gap-6 ${getGridClass()}`}>
                {drawnCards.map((card, index) => (
                    <TarotCard 
                        key={index} 
                        card={card} 
                        position={card.position} 
                    />
                ))}
            </div>

            {!showInterpretation && (
                <div className="mt-8 text-center">
                    <button
                        onClick={onGetInterpretation}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                    >
                        Get Interpretation
                    </button>
                </div>
            )}
        </div>
    );
};

export default CardDisplay;