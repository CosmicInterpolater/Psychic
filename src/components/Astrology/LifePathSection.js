{/* Life Path */ }
import React from 'react';

export const LifePathSection = ({ reading }) => (
    <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
            fontSize: '1.5rem',
            color: '#feca57',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            🛤️ Your Life Path
        </h3>
        <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.9)'
        }}>
            {reading.lifePath}
        </p>
    </div>
)
export default LifePathSection;
