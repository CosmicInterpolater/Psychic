
// Refactored main TarotReader.js
import React from 'react';
import './TarotReader.scss';
import { tarotDeck } from '../../data/tarotDeckData';
import SpreadSelector from './components/SpreadSelector';
import CardDisplay from './components/CardDisplay';
import InterpretationDisplay from './components/InterpretationDisplay';
import { useTarotReading } from './hooks/useTarotReading';

const spreadTypes = {
    "single": { name: "Single Card", cards: 1, positions: ["Present Situation"] },
    "three": { name: "Past, Present, Future", cards: 3, positions: ["Past", "Present", "Future"] },
    "seven": { name: "Horseshoe", cards: 7, positions: ["The Chance", "The Booty", "The Sacrifice", "The Trail",
            "The Wit", "The Vigilance", "The Survival Instinct"] },
    "celtic": { name: "Celtic Cross", cards: 10, positions: [
            "Present Situation", "Challenge", "Distant Past", "Recent Past",
            "Possible Outcome", "Near Future", "Your Approach", "External Influences",
            "Hopes & Fears", "Final Outcome"
        ]}
};

const TarotReader = () => {
    const {
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
    } = useTarotReading(tarotDeck, spreadTypes);

    return (
        <div className="page-container page--component-tarot-reader">
            <section className="page-section">
                <h1 className="page-title">Tarot Card Reader</h1>
                <p className="text-center">Discover insights through the ancient wisdom of the cards</p>

                {!isReading && (
                    <SpreadSelector
                        spreadTypes={spreadTypes}
                        selectedSpread={selectedSpread}
                        onSpreadSelect={selectSpread}
                        onDrawCards={shuffleAndDraw}
                    />
                )}

                {isReading && (
                    <div className="card-display space-y-8">
                        <CardDisplay
                            spreadTypes={spreadTypes}
                            selectedSpread={selectedSpread}
                            drawnCards={drawnCards}
                            showInterpretation={showInterpretation}
                            onResetReading={resetReading}
                            onGetInterpretation={generateInterpretation}
                        />

                        {showInterpretation && (
                            <InterpretationDisplay
                                drawnCards={drawnCards}
                                gettingAnalysis={gettingAnalysis}
                                readingAnalysis={readingAnalysis}
                                getOverallReadingSubtitle={getOverallReadingSubtitle}
                            />
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default TarotReader;