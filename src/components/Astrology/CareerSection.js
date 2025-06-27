{/* Career Section */}
import React from 'react';
export const CareerSection = ({ reading }) => (
<div style={{ marginBottom: '2rem' }}>
    <h3 style={{
      fontSize: '1.5rem',
      color: '#fdcb6e',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      💼 Career & Professional Path
    </h3>
    <div style={{
      background: 'rgba(253, 203, 110, 0.1)',
      borderRadius: '15px',
      padding: '1.5rem',
      border: '1px solid rgba(253, 203, 110, 0.3)'
    }}>
      <div className="grid-responsive" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <div>
          <strong style={{ color: '#fdcb6e' }}>✅ Ideal Careers:</strong>
          <ul style={{ listStyle: 'none', padding: '0.5rem 0', margin: 0 }}>
            {reading.careerSpecific.ideal.map((career, index) => (
              <li key={index} style={{
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '0.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#fdcb6e' }}>•</span>
                {career}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong style={{ color: '#fdcb6e' }}>❌ Careers to Consider Carefully:</strong>
          <ul style={{ listStyle: 'none', padding: '0.5rem 0', margin: 0 }}>
            {reading.careerSpecific.avoid.map((career, index) => (
              <li key={index} style={{
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '0.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#fdcb6e' }}>•</span>
                {career}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(253, 203, 110, 0.3)',
        paddingTop: '1rem'
      }}>
        <strong style={{ color: '#fdcb6e' }}>👑 Leadership Style:</strong>
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          margin: '0.5rem 0',
          fontStyle: 'italic'
        }}>
          {reading.careerSpecific.leadership}
        </p>
      </div>
    </div>
  </div>
)
export default CareerSection;