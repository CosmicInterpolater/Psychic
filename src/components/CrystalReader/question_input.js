import React, { useState } from 'react';

const QuestionInput = ({ 
  question, 
  onQuestionChange, 
  onAISelect, 
  isReading,
  openAIKey,
  onOpenAIKeyChange
}) => {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

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
      
      {/* API Key Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-blue-200">
            OpenAI API Key (Optional - for enhanced AI insights)
          </label>
          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="text-xs text-purple-300 hover:text-purple-200 underline"
          >
            {showApiKeyInput ? 'Hide' : 'Show'} API Key Input
          </button>
        </div>
        
        {showApiKeyInput && (
          <div className="mb-4">
            <input
              type="password"
              value={openAIKey}
              onChange={(e) => onOpenAIKeyChange(e.target.value)}
              placeholder="sk-..."
              className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-blue-300 border border-white/30 focus:border-purple-400 focus:outline-none text-sm"
            />
            <p className="text-xs text-blue-300 mt-1">
              🔒 Your API key is stored locally and never shared. Get one from{' '}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-200 underline"
              >
                OpenAI
              </a>
            </p>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <button
          onClick={onAISelect}
          disabled={!question.trim() || isReading}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:cursor-not-allowed"
        >
          {isReading ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              Analyzing...
            </>
          ) : (
            <>🤖 Let AI Select My Crystal</>
          )}
        </button>
        <p className="text-blue-200 text-sm mt-2">
          {openAIKey ? 
            "🤖 Using OpenAI for enhanced insights" : 
            "Using local AI analysis (add API key for enhanced insights)"
          }
        </p>
      </div>
    </div>
  );
};

export default QuestionInput;