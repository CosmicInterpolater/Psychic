// Seasonal Connection Section
import React from 'react';
export const SeasonalSection = ({ reading }) => (
    <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
            fontSize: '1.5rem',
            color: '#00b894',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            🌿 Seasonal Connection
        </h3>
        <div style={{
            background: 'rgba(0, 184, 148, 0.1)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid rgba(0, 184, 148, 0.3)'
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#00b894' }}>Season:</strong>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', marginLeft: '0.5rem' }}>
                    {reading.seasonal.season}
                </span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#00b894' }}>Best Season:</strong>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', marginLeft: '0.5rem' }}>
                    {reading.seasonal.bestSeason}
                </span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#00b894' }}>Energy:</strong>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', marginLeft: '0.5rem' }}>
                    {reading.seasonal.energy}
                </span>
            </div>
            <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic'
            }}>
                {reading.seasonal.connection}
            </p>
        </div>
    </div>
)
export default SeasonalSection;
