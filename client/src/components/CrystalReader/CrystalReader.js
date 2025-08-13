import React, { useState, useEffect } from 'react';
import { crystalDatabase } from '../../data/crystalDatabase.js';
import SacredSpace from './SacredSpace';
import ReadingTypeSelector from './ReadingTypeSelector';
import QuestionInput from './QuestionInput';
import CrystalGrid from './CrystalGrid';
import LoadingSpinner from './LoadingSpinner';
import CrystalInterpretation from './CrystalInterpretation';
// Fixed: Correct import path (matching the actual filename)
import AIService from './AIService.js'; // Changed from './ai_Service'
import {
    analyzeQuestionAndSelectCrystal,
    getRandomCrystals,
    validateQuestion
} from './crystalUtils.js';

const ModularCrystalReader = () => {
    // Core state
    const [selectedCrystal, setSelectedCrystal] = useState(null);
    const [isReading, setIsReading] = useState(false);
    const [readingType, setReadingType] = useState('daily');
    const [question, setQuestion] = useState('');
    const [crystalGrid, setCrystalGrid] = useState([]);
    const [showInterpretation, setShowInterpretation] = useState(false);
    const [showSacredSpace, setShowSacredSpace] = useState(true);

    // AI-related state
    const [isAISelection, setIsAISelection] = useState(false);
    const [aiInsight, setAiInsight] = useState(null);
    const [aiError, setAiError] = useState(null);
    const [backendConnected, setBackendConnected] = useState(false);

    // Fixed: Proper backend URL configuration
    const [aiService] = useState(() => {
        const service = new AIService();
        // Configure with your actual backend URL
        service.configure({
            backendURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5555/api',
            timeout: 30000
        });
        return service;
    });

    useEffect(() => {
        setCrystalGrid(getRandomCrystals(crystalDatabase, 9));
        // Test backend connection on component mount
        testBackendConnection();
    }, []);

    const testBackendConnection = async () => {
        try {
            console.log('Testing backend connection to:', aiService.backendURL);
            const isConnected = await aiService.testConnection();
            console.log('Backend connection result:', isConnected);
            setBackendConnected(isConnected);
            if (!isConnected) {
                console.warn('Backend AI service not available, will use local insights');
            }
        } catch (error) {
            console.error('Backend connection test error:', error);
            setBackendConnected(false);
        }
    };

    const handleSacredSpaceReady = () => {
        setShowSacredSpace(false);
    };

    const handleReadingTypeChange = (type) => {
        setReadingType(type);
    };

    const handleQuestionChange = (newQuestion) => {
        setQuestion(newQuestion);
    };

    const selectCrystal = (crystal) => {
        setSelectedCrystal(crystal);
        setIsReading(true);
        setAiInsight(null);
        setAiError(null);

        setTimeout(() => {
            setShowInterpretation(true);
        }, 1500);
    };

    const selectCrystalByAI = async () => {
        if (!validateQuestion(question)) {
            alert('Please enter a meaningful question for the AI to analyze.');
            return;
        }

        setIsAISelection(true);
        setIsReading(true);
        setAiError(null);

        try {
            console.log('Starting AI crystal selection...');
            console.log('Backend connected:', backendConnected);
            console.log('Question:', question);
            console.log('Reading type:', readingType);

            // Use the AIService's selectCrystal method which handles both crystal selection and insight generation
            const result = await aiService.selectCrystal(question, readingType, crystalDatabase);

            console.log('AI selection result:', result);

            setSelectedCrystal(result.crystal);
            setAiInsight(result.insight);

            setTimeout(() => {
                setShowInterpretation(true);
                setIsAISelection(false);
            }, 1000);

        } catch (error) {
            console.error('Crystal selection failed:', error);
            setAiError(`Crystal selection error: ${error.message}`);

            // Final fallback
            const fallbackCrystal = analyzeQuestionAndSelectCrystal(question, readingType, crystalDatabase);
            const fallbackInsight = aiService.generateLocalInsight(question, fallbackCrystal, readingType);

            setSelectedCrystal(fallbackCrystal);
            setAiInsight(fallbackInsight);
            setIsAISelection(false);
            setShowInterpretation(true);
        }
    };

    const resetReading = () => {
        setSelectedCrystal(null);
        setIsReading(false);
        setShowInterpretation(false);
        setQuestion('');
        setIsAISelection(false);
        setAiInsight(null);
        setAiError(null);
        setCrystalGrid(getRandomCrystals(crystalDatabase, 9));
    };

    const handleNewGrid = () => {
        setCrystalGrid(getRandomCrystals(crystalDatabase, 9));
    };

    if (showSacredSpace) {
        return (
            <SacredSpace
                onReady={handleSacredSpaceReady}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center py-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-pulse">
                        💎 Crystal Energy Reader
                    </h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                        Connect with the ancient wisdom of crystals. Choose your method of crystal selection.
                    </p>

                    {/* Backend connection status */}
                    <div className="mt-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${backendConnected
                                ? 'bg-green-900/50 text-green-200 border border-green-400'
                                : 'bg-yellow-900/50 text-yellow-200 border border-yellow-400'
                            }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${backendConnected ? 'bg-green-400' : 'bg-yellow-400'
                                }`}></div>
                            {backendConnected ? '🤖 AI Enhanced Readings Available' : '🔮 Local Crystal Wisdom Mode'}
                        </div>
                        {/* Debug info */}
                        <div className="text-xs text-blue-300 mt-2">
                            Backend URL: {aiService.backendURL}
                        </div>
                    </div>
                </div>

                {/* Show AI Error if any */}
                {aiError && (
                    <div className="mb-4 bg-yellow-900/50 border border-yellow-400 rounded-lg p-4">
                        <p className="text-yellow-200 text-sm">⚠️ {aiError}</p>
                    </div>
                )}

                {!selectedCrystal ? (
                    <div className="space-y-8">
                        <ReadingTypeSelector
                            readingType={readingType}
                            onReadingTypeChange={handleReadingTypeChange}
                        />

                        <QuestionInput
                            question={question}
                            onQuestionChange={handleQuestionChange}
                            onAISelect={selectCrystalByAI}
                            isReading={isReading}
                        />

                        {isAISelection && (
                            <LoadingSpinner
                                message={backendConnected ? "🧠 AI is analyzing your question..." : "🔮 Crystal wisdom is flowing..."}
                                subMessage="Matching your energy with the perfect crystal"
                            />
                        )}

                        {!isAISelection && (
                            <CrystalGrid
                                crystals={crystalGrid}
                                onCrystalSelect={selectCrystal}
                                onNewGrid={handleNewGrid}
                            />
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <CrystalInterpretation
                            selectedCrystal={selectedCrystal}
                            question={question}
                            readingType={readingType}
                            isReading={isReading}
                            showInterpretation={showInterpretation}
                            isAISelection={isAISelection}
                            aiInsight={aiInsight}
                            onReset={resetReading}
                            onReturnToSacredSpace={() => setShowSacredSpace(true)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModularCrystalReader;
