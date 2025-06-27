{/* Strengths & Weaknesses Grid */}
import React from 'react';
export const StrengthsWeaknessesGrid = ({ reading }) => (
<div className="grid-responsive" style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  }}>
    {/* Strengths */}
    <div>
      <h3 style={{
        fontSize: '1.3rem',
        color: '#45b7d1',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        💪 Cosmic Strengths
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reading.strengths?.map((strength, index) => (
          <li key={index} style={{
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ color: '#45b7d1' }}>✨</span>
            {strength}
          </li>
        ))}
      </ul>
    </div>

    {/* Weaknesses */}
    <div>
      <h3 style={{
        fontSize: '1.3rem',
        color: '#ff6b6b',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🌙 Growth Areas
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reading.weaknesses?.map((weakness, index) => (
          <li key={index} style={{
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ color: '#ff6b6b' }}>🔮</span>
            {weakness}
          </li>
        ))}
      </ul>
    </div>
  </div>
)
// export default StrengthsWeaknessesGrid;
export default StrengthsWeaknessesGrid;