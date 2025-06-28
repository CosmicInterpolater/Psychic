import React from 'react';

const ReadingTypeSelector = ({ readingType, onReadingTypeChange }) => {
  const readingTypes = [
    { key: 'daily', label: 'Daily Guidance', emoji: '🌅' },
    { key: 'love', label: 'Love & Relationships', emoji: '💕' },
    { key: 'career', label: 'Career & Success', emoji: '🌟' },
    { key: 'spiritual', label: 'Spiritual Growth', emoji: '🔮' }
  ];

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
      <h3 className="text-xl text-white mb-4 text-center">Choose Your Reading Focus</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {readingTypes.map(type => (
          <button
            key={type.key}
            onClick={() => onReadingTypeChange(type.key)}
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
  );
};

export default ReadingTypeSelector;