// components/ReadingSection.js - Individual section components

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
);

// Mythology Section
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

// Personality Section
export const PersonalitySection = ({ reading }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{
      fontSize: '1.5rem',
      color: '#4ecdc4',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      🌟 Your Cosmic Personality
    </h3>
    <p style={{
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.9)'
    }}>
      {reading.personality}
    </p>
  </div>
);

// Compatibility Section
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

// Seasonal Connection Section
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

{/* Strengths & Weaknesses Grid */}
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

{/* Life Path */}
export const LifePathSection = ({ reading }) => (
<div style={{ marginBottom: '2rem' }}>
    <h3 style={{
      fontSize: '1.5rem',
      color: '#feca57',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      🛤️ Your Life Path
    </h3>
    <p style={{
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.9)'
    }}>
      {reading.lifePath}
    </p>
  </div>
)

{/* Opportunities & Challenges Grid */}
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
{/* Career Section */}
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

{/* Health Section */}
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
{/* Lucky Elements Section */}
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
// Moon Phase Section
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
// Export all sections for easy import
export const ReadingSections = {
  ReadingHeader,
  MythologySection,
  PersonalitySection,
  CompatibilitySection,
  SeasonalSection,
  StrengthsWeaknessesGrid,
  LifePathSection,
  OpportunitiesChallengesGrid,
  CareerSection,
  HealthSection,
  LuckyElementsSection,
  MoonPhaseSection
};