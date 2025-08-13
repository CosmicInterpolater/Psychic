// components/CrystalGrid.js
import React from 'react';
import { getCrystalColor } from './crystalUtils';

const CrystalGrid = ({ crystals, onCrystalSelect, onNewGrid }) => {
    return (
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl text-white text-center flex-1">
                    Select the Crystal That Calls to You
                </h3>
                <button
                    onClick={onNewGrid}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm transition-all"
                >
                    🔄 New Grid
                </button>
            </div>

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

            <div className="text-center mt-4">
                <p className="text-blue-200 text-sm italic">
                    Trust your intuition - the right crystal will draw your attention
                </p>
            </div>
        </div>
    );
};

export default CrystalGrid;
