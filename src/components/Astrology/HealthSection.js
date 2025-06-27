{/* Health Section */}
import React from 'react';
export const HealthSection = ({ reading }) => (
<div style={{ marginBottom: '2rem' }}>
    <h3 style={{
      fontSize: '1.5rem',
      color: '#a29bfe',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      🏥 Health & Wellness
    </h3>
    <div style={{
      background: 'rgba(162, 155, 254, 0.1)',
      borderRadius: '15px',
      padding: '1.5rem',
      border: '1px solid rgba(162, 155, 254, 0.3)'
    }}>
      <div className="grid-responsive" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div>
          <strong style={{ color: '#a29bfe' }}>🎯 Focus Areas:</strong>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0' }}>
            {reading.health.bodyParts.join(', ') || 'General wellness'}
          </p>
        </div>
        <div>
          <strong style={{ color: '#a29bfe' }}>⚠️ Watch For:</strong>
          <ul style={{ listStyle: 'none', padding: '0.5rem 0', margin: 0 }}>
            {reading.health.tendencies.length > 0 ? 
              reading.health.tendencies.map((tendency, index) => (
                <li key={index} style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: '#a29bfe' }}>•</span>
                  {tendency}
                </li>
              )) : 
              <li style={{ color: 'rgba(255, 255, 255, 0.9)' }}>General health maintenance</li>
            }
          </ul>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(162, 155, 254, 0.3)',
        paddingTop: '1rem'
      }}>
        <strong style={{ color: '#a29bfe' }}>💡 Recommendations:</strong>
        <ul style={{ listStyle: 'none', padding: '0.5rem 0', margin: 0 }}>
          {reading.health.recommendations.length > 0 ? 
            reading.health.recommendations.map((rec, index) => (
              <li key={index} style={{
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#a29bfe' }}>✨</span>
                {rec}
              </li>
            )) : 
            <li style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Maintain balanced lifestyle and regular check-ups</li>
          }
        </ul>
      </div>
    </div>
  </div>
)
export default HealthSection;