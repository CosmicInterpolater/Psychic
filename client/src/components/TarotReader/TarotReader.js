// Refactored main TarotReader.js
import React from 'react';
import './TarotReader.scss';
import { tarotDeck } from '../../data/tarotDeckData';
import SpreadSelector from './components/SpreadSelector';
import CardDisplay from './components/CardDisplay';
import { arrangeLotusSpread } from './lotusSpread';
import { arrangeCelticCross } from './celticCrossSpread';
import InterpretationDisplay from './components/InterpretationDisplay';
import QuestionInput from './components/QuestionInput';
import { useTarotReading } from './hooks/useTarotReading';

const spreadTypes = {
    "single": { name: "Single Card", cards: 1, positions: ["Present Situation"] },
    "three": { name: "Past, Present, Future", cards: 3, positions: ["Past", "Present", "Future"] },
    "seven": {
        name: "Horseshoe", cards: 7, positions: ["The Chance", "The Booty", "The Sacrifice", "The Trail",
            "The Wit", "The Vigilance", "The Survival Instinct"]
    },
    "celtic": {
        name: "Celtic Cross", cards: 10, positions: [
            "Present Situation", "Challenge", "Distant Past", "Recent Past",
            "Possible Outcome", "Near Future", "Your Approach", "External Influences",
            "Hopes & Fears", "Final Outcome"
        ]
    }
};

const TarotReader = () => {
    const {
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
    } = useTarotReading(tarotDeck, spreadTypes);

    return (
        <div className="page-container page--component-tarot-reader">
            <section className="page-section">
                <h1 className="page-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Tarot Card Reader</h1>
                <p className="text-center" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Discover insights through the ancient wisdom of the cards</p>

                {!isReading && (
                    <div className="space-y-6">
                        <QuestionInput
                            userQuestion={userQuestion}
                            onQuestionChange={setQuestion}
                            placeholder="What guidance are you seeking from the cards?"
                        />

                        <SpreadSelector
                            spreadTypes={spreadTypes}
                            selectedSpread={selectedSpread}
                            onSpreadSelect={selectSpread}
                            onDrawCards={shuffleAndDraw}
                        />
                    </div>
                )}

                {isReading && (
                    <div className="card-display space-y-8">
                        {questionAsked && (
                            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                                <h3 className="text-lg font-semibold text-white mb-2">Your Question:</h3>
                                <p className="text-white/80 italic">"{questionAsked}"</p>
                            </div>
                        )}

                        <CardDisplay
                            spreadTypes={spreadTypes}
                            selectedSpread={selectedSpread}
                            drawnCards={
                                selectedSpread === 'seven'
                                    ? arrangeLotusSpread(drawnCards)
                                    : selectedSpread === 'celtic'
                                        ? arrangeCelticCross(drawnCards)
                                        : drawnCards
                            }
                            showInterpretation={showInterpretation}
                            onResetReading={resetReading}
                            onGetInterpretation={generateInterpretation}
                        />

                        {showInterpretation && (
                            <InterpretationDisplay
                                drawnCards={drawnCards}
                                gettingAnalysis={gettingAnalysis}
                                readingAnalysis={readingAnalysis}
                                questionAsked={questionAsked}
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
