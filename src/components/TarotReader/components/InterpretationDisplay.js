// components/InterpretationDisplay.js
import React from 'react';

const InterpretationDisplay = ({ 
    drawnCards, 
    gettingAnalysis, 
    readingAnalysis, 
    getOverallReadingSubtitle 
}) => {
    return (
        <div className="interpretation bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-4">Your Card Interpretation</h3>

            <p className="italic mb-4">{getOverallReadingSubtitle()}</p>

            <div className={`mb-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30 ${gettingAnalysis ? 'text-yellow-500' : 'text-white'}`}>
                {gettingAnalysis ? (
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                        Getting your personalized interpretation...
                    </div>
                ) : (
                    <div className="whitespace-pre-line">
                        {readingAnalysis.result}
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {drawnCards.map((card, index) => (
                    <div key={index} className="border-l-4 border-yellow-400 pl-4">
                        <h4 className="text-xl font-semibold text-white mb-2">
                            {card.position}: {card.name} {card.isReversed ? "(Reversed)" : ""}
                        </h4>
                        <p className="text-blue-100 leading-relaxed">
                            {card.isReversed ? card.reversed : card.upright}
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
    );
};

export default InterpretationDisplay;