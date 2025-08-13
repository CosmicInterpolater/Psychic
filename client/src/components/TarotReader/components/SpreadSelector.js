// components/SpreadSelector.js
import React from 'react';

const SpreadSelector = ({ spreadTypes, selectedSpread, onSpreadSelect, onDrawCards }) => {
    return (
        <div className="spread-selection bg-white/10 backdrop-blur rounded-xl p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">Choose Your Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(spreadTypes).map(([key, spread]) => (
                    <button
                        key={key}
                        onClick={() => onSpreadSelect(key)}
                        className={`spread-btn p-4 rounded-lg border-2 transition-all ${selectedSpread === key
                                ? 'border-yellow-400 bg-yellow-400/20 text-white'
                                : 'border-white/30 bg-white/5 text-blue-200 hover:border-white/50'
                            }`}
                    >
                        <div className="font-semibold">{spread.name}</div>
                        <div className="text-sm opacity-80">{spread.cards} card{spread.cards > 1 ? 's' : ''}</div>
                    </button>
                ))}
            </div>

            <button
                onClick={onDrawCards}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
                <span>🔀</span>
                Draw Cards
            </button>
        </div>
    );
};

export default SpreadSelector;
