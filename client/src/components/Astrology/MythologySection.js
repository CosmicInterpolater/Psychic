// Mythology Section
import React from 'react';
export const MythologySection = ({ reading }) => (
    <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
            fontSize: '1.5rem',
            color: '#e17055',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            🏛️ Mythological Origins
        </h3>
        <div style={{
            background: 'rgba(225, 112, 85, 0.1)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid rgba(225, 112, 85, 0.3)'
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e17055' }}>Origin:</strong>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', marginLeft: '0.5rem' }}>
                    {reading.mythology.origin}
                </span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e17055' }}>Archetype:</strong>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', marginLeft: '0.5rem' }}>
                    {reading.mythology.archetype}
                </span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e17055' }}>Associated Deity:</strong>
                <span style={{ color: 'rgba(255, 255, 255, 0.9)', marginLeft: '0.5rem' }}>
                    {reading.mythology.deity}
                </span>
            </div>
            <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic'
            }}>
                {reading.mythology.story}
            </p>
        </div>
    </div>
);
export default MythologySection;
