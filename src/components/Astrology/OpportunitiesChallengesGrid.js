{/* Opportunities & Challenges Grid */}
import React from 'react';
export const OpportunitiesChallengesGrid = ({ reading }) => (
<div className="grid-responsive" style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem'
  }}>
    {/* Opportunities */}
    <div>
      <h3 style={{
        fontSize: '1.3rem',
        color: '#10ac84',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        🚀 Cosmic Opportunities
      </h3>
      <p style={{
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: '1.6'
      }}>
        {reading.opportunities}
      </p>
    </div>

    {/* Challenges */}
    <div>
      <h3 style={{
        fontSize: '1.3rem',
        color: '#ff9ff3',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        ⚡ Cosmic Challenges
      </h3>
      <p style={{
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: '1.6'
      }}>
        {reading.challenges}
      </p>
    </div>
  </div>
)
export default OpportunitiesChallengesGrid;  