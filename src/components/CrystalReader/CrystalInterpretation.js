import React from 'react';

const CrystalInterpretation = ({ 
  selectedCrystal, 
  readingType, 
  question, 
  isAISelection,
  aiInsight = null
}) => {
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

  return (
    <div className="space-y-6 animate-fadeInUp">
      {/* AI Selection Indicator */}
      {isAISelection && (
        <div className="bg-pink-900/50 rounded-lg p-4">
          <p className="text-pink-200 text-sm">
            🤖 AI selected this crystal based on your question's energy signature
          </p>
        </div>
      )}

      {/* Crystal Message */}
      <div className="bg-purple-900/50 rounded-lg p-6">
        <h3 className="text-xl text-purple-200 mb-3">Crystal Message</h3>
        <p className="text-white text-lg italic">"{getReadingMessage()}"</p>
      </div>

      {/* AI Insight (if available) */}
      {aiInsight && (
        <div className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 rounded-lg p-6 border border-pink-400/30">
          <h3 className="text-xl text-pink-200 mb-3 flex items-center">
            🤖 AI Oracle Insight
          </h3>
          <p className="text-white leading-relaxed">{aiInsight}</p>
        </div>
      )}

      {/* Meaning & Properties */}
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

      {/* Guidance & Advice */}
      <div className="bg-green-900/50 rounded-lg p-6">
        <h3 className="text-xl text-green-200 mb-3">Guidance & Advice</h3>
        <p className="text-white">{selectedCrystal.advice}</p>
      </div>

      {/* Question-specific guidance */}
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
  );
};

export default CrystalInterpretation;