{/* Lucky Elements Section */}
import React from 'react';
export const LuckyElementsSection = ({ reading }) => (
<div style={{ marginBottom: '2rem' }}>
    <h3 style={{
      fontSize: '1.5rem',
      color: '#fab1a0',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      🍀 Lucky Elements
    </h3>
    <div style={{
      background: 'rgba(250, 177, 160, 0.1)',
      borderRadius: '15px',
      padding: '1.5rem',
      border: '1px solid rgba(250, 177, 160, 0.3)'
    }}>
      <div className="grid-responsive" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        <div>
          <strong style={{ color: '#fab1a0' }}>🔢 Lucky Numbers:</strong>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0' }}>
            {reading.luckyElements.numbers.join(', ') || 'Numbers not specified'}
          </p>
        </div>
        <div>
          <strong style={{ color: '#fab1a0' }}>🎨 Lucky Colors:</strong>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0' }}>
            {reading.luckyElements.colors.join(', ') || 'Colors not specified'}
          </p>
        </div>
        <div>
          <strong style={{ color: '#fab1a0' }}>📅 Lucky Days:</strong>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0' }}>
            {reading.luckyElements.days.join(', ') || 'Days not specified'}
          </p>
        </div>
        <div>
          <strong style={{ color: '#fab1a0' }}>💎 Lucky Stones:</strong>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0' }}>
            {reading.luckyElements.stones.join(', ') || 'Stones not specified'}
          </p>
        </div>
        <div>
          <strong style={{ color: '#fab1a0' }}>⚡ Lucky Metals:</strong>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: '0.5rem 0' }}>
            {reading.luckyElements.metals.join(', ') || 'Metals not specified'}
          </p>
        </div>
      </div>
    </div>
  </div>
)
export default LuckyElementsSection;