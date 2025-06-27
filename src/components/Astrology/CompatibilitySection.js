// Compatibility Section
import React from 'react';
export const CompatibilitySection = ({ reading }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{
      fontSize: '1.5rem',
      color: '#fd79a8',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      💕 Cosmic Compatibility
    </h3>
    <div style={{
      background: 'rgba(253, 121, 168, 0.1)',
      borderRadius: '15px',
      padding: '1.5rem',
      border: '1px solid rgba(253, 121, 168, 0.3)'
    }}>
      <div className="grid-responsive" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div>
          <strong style={{ color: '#fd79a8' }}>💖 Most Compatible:</strong>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0' }}>
            {reading.compatibility.mostCompatible.join(', ')}
          </p>
        </div>
        <div>
          <strong style={{ color: '#fd79a8' }}>⚡ Least Compatible:</strong>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0' }}>
            {reading.compatibility.leastCompatible.join(', ')}
          </p>
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <strong style={{ color: '#fd79a8' }}>✨ Soulmate Sign:</strong>
        <span style={{ color: 'rgba(255, 255, 255, 0.9)', marginLeft: '0.5rem' }}>
          {reading.compatibility.soulmate}
        </span>
      </div>
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        color: 'rgba(255, 255, 255, 0.9)',
        fontStyle: 'italic'
      }}>
        {reading.compatibility.description}
      </p>
    </div>
  </div>
);
export default CompatibilitySection;
