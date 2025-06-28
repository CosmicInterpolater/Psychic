import React, { useState, useEffect } from 'react';
import { crystalDatabase } from '../../data/crystalDatabase.js';
import SacredSpace from './SacredSpace';
import ReadingTypeSelector from './ReadingTypeSelector';
import QuestionInput from './QuestionInput';
import CrystalGrid from './CrystalGrid';
import LoadingSpinner from './LoadingSpinner';
import CrystalInterpretation from './CrystalInterpretation';
import AIService from './ai_Service';
import { 
  analyzeQuestionAndSelectCrystal, 
  getRandomCrystals,
  validateQuestion 
} from './crystal_utils';

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
  const [aiService] = useState(new AIService());
  const [openAIKey, setOpenAIKey] = useState('');
  
  useEffect(() => {
    setCrystalGrid(getRandomCrystals(crystalDatabase, 9));
  }, []);

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
    
    setTimeout(() => {
      setShowInterpretation(true);
    }, 1500);
  };

  const selectCrystalByAI = async () => {
    if (!validateQuestion(question)) {
      alert('Please enter a question for the AI to analyze.');
      return;
    }
    
    setIsAISelection(true);
    setIsReading(true);
    
    try {
      // Use AI service if API key is available, otherwise use local analysis
      let selectedCrystal;
      let insight = null;
      
      if (openAIKey && aiService.isConfigured()) {
        const aiResult = await aiService.selectCrystal(question, readingType, crystalDatabase);
        selectedCrystal = aiResult.crystal;
        insight = aiResult.insight;
      } else {
        selectedCrystal = analyzeQuestionAndSelectCrystal(question, readingType, crystalDatabase);
      }
      
      setSelectedCrystal(selectedCrystal);
      setAiInsight(insight);
      
      setTimeout(() => {
        setShowInterpretation(true);
        setIsAISelection(false);
      }, 1000);
    } catch (error) {
      console.error('AI selection failed:', error);
      // Fallback to local analysis
      const fallbackCrystal = analyzeQuestionAndSelectCrystal(question, readingType, crystalDatabase);
      setSelectedCrystal(fallbackCrystal);
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
        </div>

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
              openAIKey={openAIKey}
              onOpenAIKeyChange={setOpenAIKey}
            />

            {isAISelection && (
              <LoadingSpinner 
                message="🧠 AI is analyzing your question..."
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
              crystal={selectedCrystal}
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