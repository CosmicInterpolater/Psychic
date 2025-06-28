import React from 'react';

const CrystalGrid = ({ crystals, onCrystalSelect, isVisible }) => {
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

  if (!isVisible) return null;

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
      <h3 className="text-xl text-white mb-6 text-center">
        Or Select the Crystal That Calls to You
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
        {crystals.map((crystal, index) => (
          <button
            key={index}
            onClick={() => onCrystalSelect(crystal)}
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
  );
};

export default CrystalGrid;