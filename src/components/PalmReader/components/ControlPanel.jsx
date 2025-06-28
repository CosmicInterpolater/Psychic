// components/ControlPanel.jsx
import React from 'react';

const ControlPanel = ({ 
    onLoadImage, 
    onResetLines, 
    onToggleLines, 
    onAIAnalysis, 
    showLines, 
    isAnalyzing 
}) => (
    <div className="cosmic-card bg-cosmic-deep/80 mb-6">
        <div className="control-group">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onLoadImage(e.target.files[0])}
                className="file-input"
            />
            <button className="cosmic-button" onClick={onResetLines}>
                Reset Lines
            </button>
            <button className="cosmic-button" onClick={onToggleLines}>
                {showLines ? 'Hide Lines' : 'Show Lines'}
            </button>
            <button 
                className="cosmic-button" 
                onClick={onAIAnalysis} 
                disabled={isAnalyzing}
            >
                {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
            </button>
        </div>
    </div>
);

export default ControlPanel;