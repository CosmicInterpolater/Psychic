// components/AnalysisPanel.jsx
import React from 'react';

const AnalysisPanel = ({ currentAnalysis }) => (
    <div className="feature-section">
        <h3>📋 Current Analysis</h3>
        <div
            className="current-analysis"
            dangerouslySetInnerHTML={{ __html: currentAnalysis }}
        />
    </div>
);

export default AnalysisPanel;