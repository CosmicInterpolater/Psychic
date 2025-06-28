// components/LineInfoPanel.jsx
import React from 'react';

const LineInfoPanel = () => (
    <div className="feature-section">
        <h3>📏 Major Lines</h3>
        <div className="line-info">
            <h4>Life Line (Red)</h4>
            <p>Represents vitality, energy, and general health. A strong, clear line indicates robust health and vitality.</p>
        </div>
        <div className="line-info">
            <h4>Heart Line (Pink)</h4>
            <p>Shows emotional nature and relationships. Length and depth indicate capacity for love and emotional expression.</p>
        </div>
        <div className="line-info">
            <h4>Head Line (Blue)</h4>
            <p>Indicates intelligence, mental capacity, and thinking patterns. Clarity suggests good mental focus.</p>
        </div>
        <div className="line-info">
            <h4>Fate Line (Purple)</h4>
            <p>Represents career, destiny, and life path. Presence and strength indicate career focus and life direction.</p>
        </div>
    </div>
);

export default LineInfoPanel;