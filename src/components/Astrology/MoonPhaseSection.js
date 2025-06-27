// Moon Phase Section
import React from 'react';
export const MoonPhaseSection = ({ reading }) => (
<div style={{ marginBottom: '2rem' }}>
    <h3 style={{
      fontSize: '1.5rem',
      color: '#c8a2c8',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      {reading.moonPhase?.emoji} Current Moon Phase Influence
    </h3>
    <div style={{
      background: 'rgba(200, 162, 200, 0.1)',
      borderRadius: '15px',
      padding: '1.5rem',
      border: '1px solid rgba(200, 162, 200, 0.3)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        <span style={{
          fontSize: '1.2rem',
          color: '#c8a2c8',
          fontWeight: 'bold'
        }}>
          {reading.moonPhase?.emoji} {reading.moonPhase?.phase}
        </span>
        <span style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.9rem'
        }}>
          {reading.moonPhase?.illumination}% illuminated
        </span>
      </div>
      <p style={{
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.9)',
        fontStyle: 'italic'
      }}>
        {reading.moonInfluence}
      </p>
    </div>
  </div>
)
export default MoonPhaseSection;