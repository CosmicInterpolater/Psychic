import React from 'react';
// Reading Header Component
export const ReadingHeader = ({ reading }) => (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {reading.emoji}
        </div>
        <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem'
        }}>
            {reading.name} {reading.symbol || reading.emoji}
        </h2>
        <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '1rem'
        }}>
            {reading.dates}
        </p>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        }}>
            <span style={{ color: '#4ecdc4' }}>🔥 Element: {reading.element}</span>
            <span style={{ color: '#ff6b6b' }}>🪐 Ruling Planet: {reading.rulingPlanet}</span>
        </div>
    </div>
)
export default ReadingHeader;
