// components/InterpretationDisplay.js
import React from 'react';

const InterpretationDisplay = ({ 
    drawnCards, 
    gettingAnalysis, 
    readingAnalysis, 
    questionAsked,
    getOverallReadingSubtitle 
}) => {
    return (
        <div className="interpretation bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-4">
                {questionAsked ? 'Your Reading & Analysis' : 'Your Card Interpretation'}
            </h3>

            <p className="italic mb-4 text-white/80">{getOverallReadingSubtitle()}</p>

            <div className={`mb-6 p-4 rounded-lg border ${
                gettingAnalysis 
                    ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-500' 
                    : questionAsked 
                        ? 'bg-purple-500/20 border-purple-500/30 text-white'
                        : 'bg-blue-500/20 border-blue-500/30 text-white'
            }`}>
                {gettingAnalysis ? (
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                        {questionAsked 
                            ? 'Getting AI-powered analysis for your question...' 
                            : 'Getting your personalized interpretation...'
                        }
                    </div>
                ) : (
                    <div>
                        {readingAnalysis.isFallback && (
                            <div className="bg-orange-500/20 border border-orange-500/30 rounded p-3 mb-4">
                                <p className="text-orange-200 text-sm">
                                    ⚠️ AI analysis unavailable - showing traditional interpretation
                                </p>
                            </div>
                        )}
                        <div className="whitespace-pre-line leading-relaxed">
                            {readingAnalysis.result}
                        </div>
                        {questionAsked && !readingAnalysis.isFallback && (
                            <div className="mt-4 pt-4 border-t border-white/20">
                                <p className="text-white/70 text-sm">
                                    ✨ This interpretation was generated by AI specifically for your question
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
                    Individual Card Meanings
                </h4>
                {drawnCards.map((card, index) => (
                    <div key={index} className="border-l-4 border-yellow-400 pl-4">
                        <h5 className="text-lg font-semibold text-white mb-2">
                            {card.position}: {card.name} {card.isReversed ? "(Reversed)" : ""}
                        </h5>
                        <p className="text-blue-100 leading-relaxed">
                            {card.isReversed ? card.reversed : card.upright}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <p className="text-blue-100 text-sm text-center mb-0">
                    {questionAsked 
                        ? "Remember, this reading responds to your specific question. Trust your intuition about how it applies to your situation."
                        : "Remember, tarot readings offer guidance and reflection. Trust your intuition and take what resonates with you."
                    }
                </p>
            </div>
        </div>
    );
};

export default InterpretationDisplay;