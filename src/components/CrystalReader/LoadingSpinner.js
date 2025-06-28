import React from 'react';

const LoadingSpinner = ({ 
  isAISelection = false, 
  isReading = false, 
  showInterpretation = false 
}) => {
  if (isAISelection) {
    return (
      <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20 text-center">
        <div className="animate-spin w-12 h-12 border-2 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-white text-lg">🧠 AI is analyzing your question...</p>
        <p className="text-blue-200 text-sm mt-2">Matching your energy with the perfect crystal</p>
      </div>
    );
  }

  if (isReading && !showInterpretation) {
    return (
      <div className="py-8">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-blue-200">Reading crystal energy vibrations...</p>
      </div>
    );
  }

  return null;
};

export default LoadingSpinner;