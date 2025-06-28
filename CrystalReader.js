import React, { useState, useEffect } from 'react';
import { crystalDatabase } from '../../data/crystalDatabase.js';
import SacredSpace from './SacredSpace';
import ReadingTypeSelector from './ReadingTypeSelector';
import QuestionInput from './QuestionInput';
import CrystalGrid from './CrystalGrid';
import LoadingSpinner from './LoadingSpinner';
import CrystalInterpretation from './CrystalInterpretation';
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

  // Enhanced local insight generation
  const generateLocalInsight = (question, selectedCrystal, readingType) => {
    const questionThemes = analyzeQuestionThemes(question);
    const crystalProperties = selectedCrystal.properties[0] || 'wisdom';
    
    const insights = {
      'daily': [
        `The energy of ${selectedCrystal.name} flows through your daily path, whispering secrets of ${selectedCrystal.element.toLowerCase()} wisdom. Trust that each moment today carries the potential for the ${selectedCrystal.meaning.toLowerCase()} you seek.`,
        `As ${selectedCrystal.name} resonates with your ${selectedCrystal.chakra} chakra, feel how this ancient stone guides you toward experiences that align with your highest good today.`,
        `${selectedCrystal.name} illuminates your daily journey with the sacred power of ${crystalProperties.toLowerCase()}. Let this crystal's energy remind you that ordinary moments hold extraordinary potential.`
      ],
      'love': [
        `In the realm of the heart, ${selectedCrystal.name} reveals that true ${selectedCrystal.meaning.toLowerCase()} begins within. The love you seek in others is already awakening in the chambers of your own heart.`,
        `The ${selectedCrystal.element.toLowerCase()} energy of ${selectedCrystal.name} suggests that your relationships are mirrors, reflecting back the very healing and growth your soul desires.`,
        `${selectedCrystal.name} whispers that love flourishes when nurtured by ${crystalProperties.toLowerCase()}. Your heart's desires align with the universe's plan for your romantic fulfillment.`
      ],
      'career': [
        `${selectedCrystal.name} illuminates a path where your professional life becomes a sacred expression of your soul's purpose. Success flows naturally when you align your work with the ${selectedCrystal.meaning.toLowerCase()} this crystal represents.`,
        `The universe speaks through ${selectedCrystal.name}, revealing that your career challenges are invitations to embody the ${crystalProperties.toLowerCase()} and wisdom this stone teaches.`,
        `Professional transformation awaits as ${selectedCrystal.name} guides you toward opportunities that honor both your material needs and spiritual growth.`
      ],
      'spiritual': [
        `Through the mystical lens of ${selectedCrystal.name}, your spiritual journey takes on new depth. This sacred stone bridges the earthly and divine, showing you that ${selectedCrystal.meaning.toLowerCase()} is your natural birthright.`,
        `${selectedCrystal.name} whispers ancient truths: your spiritual awakening is not a destination but a remembering of who you have always been.`,
        `The sacred energy of ${selectedCrystal.name} activates dormant wisdom within your soul, revealing that your spiritual path is uniquely yours to walk with ${crystalProperties.toLowerCase()}.`
      ]
    };

    const typeInsights = insights[readingType] || insights.daily;
    return typeInsights[Math.floor(Math.random() * typeInsights.length)];
  };

  const analyzeQuestionThemes = (question) => {
    const questionLower = question.toLowerCase();
    const themes = [];
    
    if (questionLower.includes('love') || questionLower.includes('heart')) themes.push('love');
    if (questionLower.includes('work') || questionLower.includes('career')) themes.push('career');
    if (questionLower.includes('heal') || questionLower.includes('health')) themes.push('healing');
    if (questionLower.includes('money') || questionLower.includes('success')) themes.push('abundance');
    if (questionLower.includes('peace') || questionLower.includes('calm')) themes.push('peace');
    
    return themes;
  };

  const selectCrystalByAI = async () => {
    if (!validateQuestion(question)) {
      alert('Please enter a meaningful question for crystal guidance.');
      return;
    }
    
    setIsAISelection(true);
    setIsReading(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use enhanced local analysis
      const selectedCrystal = analyzeQuestionAndSelectCrystal(question, readingType, crystalDatabase);
      const insight = generateLocalInsight(question, selectedCrystal, readingType);
      
      setSelectedCrystal(selectedCrystal);
      setAiInsight(insight);
      
      setTimeout(() => {
        setShowInterpretation(true);
        setIsAISelection(false);
      }, 1000);
      
    } catch (error) {
      console.error('Crystal selection failed:', error);
      
      // Fallback
      const fallbackCrystal = analyzeQuestionAndSelectCrystal(question, readingType, crystalDatabase);
      const fallbackInsight = generateLocalInsight(question, fallbackCrystal, readingType);
      
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
          
          {/* Local wisdom mode indicator */}
          <div className="mt-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-900/50 text-purple-200 border border-purple-400">
              <div className="w-2 h-2 rounded-full mr-2 bg-purple-400"></div>
              🔮 Enhanced Local Crystal Wisdom
            </div>
          </div>
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
            />

            {isAISelection && (
              <LoadingSpinner 
                message="🔮 Crystal wisdom is analyzing your question..."
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