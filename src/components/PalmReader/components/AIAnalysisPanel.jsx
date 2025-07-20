// components/AIAnalysisPanel.jsx
import React from 'react';

const AIAnalysisPanel = ({ aiResults }) => (
    <div className="ai-analysis">
        <h3>🤖 AI Analysis Results</h3>
        <div
            className="ai-results"
            dangerouslySetInnerHTML={{ __html: aiResults }}
        />
    </div>
);

export default AIAnalysisPanel;
