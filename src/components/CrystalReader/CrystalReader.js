import React, { useState, useEffect } from 'react';
import { crystalDatabase} from '../../data/crystalDatabase.js';


//const crystalDatabase 

// AI-powered crystal selection based on question analysis
const analyzeQuestionAndSelectCrystal = (question, readingType) => {
  if (!question && readingType === 'daily') {
    return getRandomCrystals(1)[0];
  }

  const questionLower = question.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  // Score each crystal based on keyword matching and reading type
  crystalDatabase.forEach(crystal => {
    let score = 0;
    
    // Check keywords in question
    crystal.keywords.forEach(keyword => {
      if (questionLower.includes(keyword)) {
        score += 3;
      }
    });
    
    // Check intentions match
    crystal.intentions.forEach(intention => {
      if (questionLower.includes(intention)) {
        score += 5;
      }
    });
    
    // Boost score based on reading type
    switch (readingType) {
      case 'love':
        if (crystal.chakra === 'Heart' || crystal.keywords.includes('love')) score += 10;
        break;
      case 'career':
        if (crystal.keywords.includes('success') || crystal.keywords.includes('confidence') || crystal.keywords.includes('abundance')) score += 10;
        break;
      case 'spiritual':
        if (crystal.chakra === 'Crown' || crystal.chakra === 'Third Eye' || crystal.keywords.includes('spiritual')) score += 10;
        break;
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = crystal;
    }
  });
  
  // If no strong match found, select based on reading type
  if (highestScore < 3) {
    const typeBasedSelection = {
      'love': crystalDatabase.find(c => c.name === 'Rose Quartz'),
      'career': crystalDatabase.find(c => c.name === 'Citrine'),
      'spiritual': crystalDatabase.find(c => c.name === 'Amethyst'),
      'daily': crystalDatabase.find(c => c.name === 'Clear Quartz')
    };
    bestMatch = typeBasedSelection[readingType] || crystalDatabase[0];
  }
  
  return bestMatch;
};

const getRandomCrystals = (count) => {
  const shuffled = [...crystalDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const CrystalReader = () => {
  const [selectedCrystal, setSelectedCrystal] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [readingType, setReadingType] = useState('daily');
  const [question, setQuestion] = useState('');
  const [crystalGrid, setCrystalGrid] = useState([]);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [showSacredSpace, setShowSacredSpace] = useState(true);
  const [isAISelection, setIsAISelection] = useState(false);

  useEffect(() => {
    setCrystalGrid(getRandomCrystals(9));
  }, []);

  const selectCrystal = (crystal) => {
    setSelectedCrystal(crystal);
    setIsReading(true);
    
    setTimeout(() => {
      setShowInterpretation(true);
    }, 1500);
  };

  const selectCrystalByAI = () => {
    if (!question.trim()) {
      alert('Please enter a question for the AI to analyze.');
      return;
    }
    
    setIsAISelection(true);
    setIsReading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const aiSelectedCrystal = analyzeQuestionAndSelectCrystal(question, readingType);
      setSelectedCrystal(aiSelectedCrystal);
      
      setTimeout(() => {
        setShowInterpretation(true);
        setIsAISelection(false);
      }, 1000);
    }, 2000);
  };

  const resetReading = () => {
    setSelectedCrystal(null);
    setIsReading(false);
    setShowInterpretation(false);
    setQuestion('');
    setIsAISelection(false);
    setCrystalGrid(getRandomCrystals(9));
  };

  const getReadingMessage = () => {
    if (!selectedCrystal) return '';
    
    const messages = {
      daily: [
        `${selectedCrystal.name} brings ${selectedCrystal.element.toLowerCase()} energy to guide your day.`,
        `Your ${selectedCrystal.chakra} chakra seeks attention today through ${selectedCrystal.name}.`,
        `The universe has chosen ${selectedCrystal.name} to illuminate your path today.`
      ],
      love: [
        `In matters of the heart, ${selectedCrystal.name} reveals the healing you need.`,
        `${selectedCrystal.name} guides your heart toward authentic love and connection.`,
        `Your romantic energy aligns with the vibration of ${selectedCrystal.name}.`
      ],
      career: [
        `Professional success flows through the energy of ${selectedCrystal.name}.`,
        `${selectedCrystal.name} empowers your career ambitions and goals.`,
        `Your work life benefits from ${selectedCrystal.name}'s supportive energy.`
      ],
      spiritual: [
        `${selectedCrystal.name} opens doorways to deeper spiritual understanding.`,
        `Your soul resonates with the ancient wisdom of ${selectedCrystal.name}.`,
        `Spiritual growth accelerates through ${selectedCrystal.name}'s guidance.`
      ]
    };
    
    const typeMessages = messages[readingType] || messages.daily;
    return typeMessages[Math.floor(Math.random() * typeMessages.length)];
  };

  const getCrystalColor = (element) => {
    const colors = {
      Fire: 'from-red-500 to-orange-500',
      Water: 'from-blue-500 to-cyan-500',
      Earth: 'from-green-500 to-emerald-500',
      Air: 'from-purple-500 to-violet-500',
      All: 'from-white to-gray-300'
    };
    return colors[element] || colors.All;
  };

  if (showSacredSpace) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🕯️ Sacred Space Preparation
            </h1>
            <p className="text-purple-200 text-lg">
              Before we connect with crystal energy, let's prepare your sacred space
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-purple-900/50 rounded-lg p-6">
                  <h3 className="text-xl text-purple-200 mb-3 flex items-center">
                    🧘‍♀️ Prepare Your Mind
                  </h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li>• Take three deep, cleansing breaths</li>
                    <li>• Release any tension in your body</li>
                    <li>• Set an intention to be open to guidance</li>
                    <li>• Clear your mind of distractions</li>
                  </ul>
                </div>

                <div className="bg-blue-900/50 rounded-lg p-6">
                  <h3 className="text-xl text-blue-200 mb-3 flex items-center">
                    🕯️ Create Sacred Space
                  </h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li>• Light a candle or incense if available</li>
                    <li>• Ensure you won't be interrupted</li>
                    <li>• Sit comfortably in a quiet space</li>
                    <li>• Hold a clear intention for your reading</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-900/50 rounded-lg p-6">
                  <h3 className="text-xl text-green-200 mb-3 flex items-center">
                    🌿 Energy Cleansing
                  </h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li>• Visualize white light surrounding you</li>
                    <li>• Ask for protection and clarity</li>
                    <li>• Release any negative energy</li>
                    <li>• Connect with your highest self</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/50 rounded-lg p-6">
                  <h3 className="text-xl text-yellow-200 mb-3 flex items-center">
                    💫 Set Your Intent
                  </h3>
                  <ul className="text-white space-y-2 text-sm">
                    <li>• Focus on your question or concern</li>
                    <li>• Trust your intuition will guide you</li>
                    <li>• Be open to unexpected messages</li>
                    <li>• Approach with gratitude and respect</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              <p className="text-purple-200 mb-6 italic">
                "When we approach crystals with reverence and an open heart, 
                we create a sacred bridge between the physical and spiritual realms."
              </p>
              <button
                onClick={() => setShowSacredSpace(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
              >
                I'm Ready to Begin My Reading ✨
              </button>
            </div>
          </div>
        </div>
      </div>
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
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-xl text-white mb-4 text-center">Choose Your Reading Focus</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'daily', label: 'Daily Guidance', emoji: '🌅' },
                  { key: 'love', label: 'Love & Relationships', emoji: '💕' },
                  { key: 'career', label: 'Career & Success', emoji: '🌟' },
                  { key: 'spiritual', label: 'Spiritual Growth', emoji: '🔮' }
                ].map(type => (
                  <button
                    key={type.key}
                    onClick={() => setReadingType(type.key)}
                    className={`p-3 rounded-lg transition-all ${
                      readingType === type.key 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white/20 text-blue-200 hover:bg-white/30'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.emoji}</div>
                    <div className="text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-lg text-white mb-3">Your Question or Intention</h3>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What guidance do you seek? Be specific for AI crystal selection..."
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border border-white/30 focus:border-purple-400 focus:outline-none resize-none"
                rows={3}
              />
              
              <div className="mt-4 text-center">
                <button
                  onClick={selectCrystalByAI}
                  disabled={!question.trim() || isReading}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:cursor-not-allowed"
                >
                  🤖 Let AI Select My Crystal
                </button>
                <p className="text-blue-200 text-sm mt-2">
                  AI analyzes your question and selects the most suitable crystal
                </p>
              </div>
            </div>

            {isAISelection && (
              <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20 text-center">
                <div className="animate-spin w-12 h-12 border-2 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white text-lg">🧠 AI is analyzing your question...</p>
                <p className="text-blue-200 text-sm mt-2">Matching your energy with the perfect crystal</p>
              </div>
            )}

            {!isAISelection && (
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <h3 className="text-xl text-white mb-6 text-center">
                  Or Select the Crystal That Calls to You
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                  {crystalGrid.map((crystal, index) => (
                    <button
                      key={index}
                      onClick={() => selectCrystal(crystal)}
                      className="group relative bg-white/20 hover:bg-white/30 rounded-xl p-6 border border-white/30 hover:border-purple-400 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                      <div className="text-4xl mb-2">{crystal.emoji}</div>
                      <div className="text-white font-semibold">{crystal.name}</div>
                      <div className="text-blue-200 text-sm mt-1">{crystal.element}</div>
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${getCrystalColor(crystal.element)} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20 text-center">
              <div className="text-6xl mb-4 animate-bounce">{selectedCrystal.emoji}</div>
              <h2 className="text-3xl font-bold text-white mb-2">{selectedCrystal.name}</h2>
              <div className="text-blue-200 mb-4">{selectedCrystal.element} Element • {selectedCrystal.chakra} Chakra</div>
              
              {isAISelection && (
                <div className="bg-pink-900/50 rounded-lg p-4 mb-4">
                  <p className="text-pink-200 text-sm">
                    🤖 AI selected this crystal based on your question's energy signature
                  </p>
                </div>
              )}
              
              {isReading && !showInterpretation && (
                <div className="py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-blue-200">Reading crystal energy vibrations...</p>
                </div>
              )}

              {showInterpretation && (
                <div className="space-y-6 animate-fadeInUp">
                  <div className="bg-purple-900/50 rounded-lg p-6">
                    <h3 className="text-xl text-purple-200 mb-3">Crystal Message</h3>
                    <p className="text-white text-lg italic">"{getReadingMessage()}"</p>
                  </div>

                  <div className="bg-blue-900/50 rounded-lg p-6">
                    <h3 className="text-xl text-blue-200 mb-3">Meaning & Properties</h3>
                    <p className="text-white mb-4">{selectedCrystal.meaning}</p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-2">Properties:</h4>
                        <ul className="text-blue-100 space-y-1">
                          {selectedCrystal.properties.map((prop, i) => (
                            <li key={i}>• {prop}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-2">Healing Energy:</h4>
                        <p className="text-blue-100">{selectedCrystal.healing}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/50 rounded-lg p-6">
                    <h3 className="text-xl text-green-200 mb-3">Guidance & Advice</h3>
                    <p className="text-white">{selectedCrystal.advice}</p>
                  </div>

                  {question && (
                    <div className="bg-yellow-900/50 rounded-lg p-6">
                      <h3 className="text-xl text-yellow-200 mb-3">Your Question</h3>
                      <p className="text-white italic mb-3">"{question}"</p>
                      <p className="text-yellow-100">
                        {selectedCrystal.name} suggests focusing on {selectedCrystal.meaning.toLowerCase()} 
                        as you navigate this situation. Trust in the process and remain open to the guidance 
                        this crystal brings to your specific concern.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {showInterpretation && (
              <div className="text-center space-y-4">
                <button
                  onClick={resetReading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 mr-4"
                >
                  Select Another Crystal
                </button>
                <button
                  onClick={() => setShowSacredSpace(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  Return to Sacred Space
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrystalReader;