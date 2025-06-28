// components/QuestionInput.js
import React, { useState } from 'react';

const QuestionInput = ({ 
  question, 
  onQuestionChange, 
  onAISelect, 
  isReading, 
  openAIKey, 
  onOpenAIKeyChange 
}) => {
  const [showAPIKeyInput, setShowAPIKeyInput] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
      <h3 className="text-lg text-white mb-3">Your Question or Intention</h3>
      <textarea
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="What guidance do you seek? Be specific for AI crystal selection..."
        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-blue-200 border border-white/30 focus:border-purple-400 focus:outline-none resize-none"
        rows={3}
      />
      
      {/* API Key Input (Optional) */}
      <div className="mt-4">
        <button
          onClick={() => setShowAPIKeyInput(!showAPIKeyInput)}
          className="text-blue-300 text-sm hover:text-blue-200 transition-colors"
        >
          {showAPIKeyInput ? '🔒 Hide' : '🔑 Add'} OpenAI API Key (optional for enhanced AI)
        </button>
        
        {showAPIKeyInput && (
          <div className="mt-2">
            <input
              type="password"
              value={openAIKey}
              onChange={(e) => onOpenAIKeyChange(e.target.value)}
              placeholder="sk-..."
              className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-blue-200 border border-white/30 focus:border-purple-400 focus:outline-none text-sm"
            />
            <p className="text-blue-200 text-xs mt-1">
              Optional: Add your OpenAI API key for enhanced AI crystal selection. Your key is not stored.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <button
          onClick={onAISelect}
          disabled={!question.trim() || isReading}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:cursor-not-allowed"
        >
          🤖 Let AI Select My Crystal
        </button>
        <p className="text-blue-200 text-sm mt-2">
          AI analyzes your question and selects the most suitable crystal
          {openAIKey ? ' (Enhanced with OpenAI)' : ' (Local analysis)'}
        </p>
      </div>
    </div>
  );
};

export default QuestionInput;