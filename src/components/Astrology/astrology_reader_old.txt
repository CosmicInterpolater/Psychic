import React, { useState, useEffect } from 'react';

// Astrological data
import { zodiacSigns } from '../../data/ZodiacSigns';

const AstrologicalReader = () => {
  const [birthDate, setBirthDate] = useState('');
  const [reading, setReading] = useState(null);
  const [showReading, setShowReading] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [moonPhase, setMoonPhase] = useState(null);

  // Function to get zodiac sign based on birth date
  const getZodiacSign = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Zodiac date ranges
    const zodiacRanges = [
      { sign: 'capricorn', start: [12, 22], end: [1, 19] },
      { sign: 'aquarius', start: [1, 20], end: [2, 18] },
      { sign: 'pisces', start: [2, 19], end: [3, 20] },
      { sign: 'aries', start: [3, 21], end: [4, 19] },
      { sign: 'taurus', start: [4, 20], end: [5, 20] },
      { sign: 'gemini', start: [5, 21], end: [6, 20] },
      { sign: 'cancer', start: [6, 21], end: [7, 22] },
      { sign: 'leo', start: [7, 23], end: [8, 22] },
      { sign: 'virgo', start: [8, 23], end: [9, 22] },
      { sign: 'libra', start: [9, 23], end: [10, 22] },
      { sign: 'scorpio', start: [10, 23], end: [11, 21] },
      { sign: 'sagittarius', start: [11, 22], end: [12, 21] }
    ];

    for (const range of zodiacRanges) {
      const [startMonth, startDay] = range.start;
      const [endMonth, endDay] = range.end;

      if (startMonth === endMonth) {
        if (month === startMonth && day >= startDay && day <= endDay) {
          return range.sign;
        }
      } else {
        // Handle year-end wrap (like Capricorn)
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
          return range.sign;
        }
      }
    }

    return 'aries'; // Default fallback
  };

  const getDateRange = (sign) => {
    const ranges = {
      aries: 'March 21 - April 19',
      taurus: 'April 20 - May 20',
      gemini: 'May 21 - June 20',
      cancer: 'June 21 - July 22',
      leo: 'July 23 - August 22',
      virgo: 'August 23 - September 22',
      libra: 'September 23 - October 22',
      scorpio: 'October 23 - November 21',
      sagittarius: 'November 22 - December 21',
      capricorn: 'December 22 - January 19',
      aquarius: 'January 20 - February 18',
      pisces: 'February 19 - March 20'
    };
    return ranges[sign] || 'Unknown';
  };

  const getZodiacEmoji = (sign) => {
    const emojis = {
      aries: '♈',
      taurus: '♉',
      gemini: '♊',
      cancer: '♋',
      leo: '♌',
      virgo: '♍',
      libra: '♎',
      scorpio: '♏',
      sagittarius: '♐',
      capricorn: '♑',
      aquarius: '♒',
      pisces: '♓'
    };
    return emojis[sign] || '⭐';
  };

  // Function to get moon phase from online API with fallback calculation
  const getMoonPhase = async () => {
    try {
      // Try online API first
      const response = await fetch('https://api.farmsense.net/v1/moonphases/?d=1');
      const data = await response.json();
      
      if (data && data.length > 0) {
        const currentPhase = data[0];
        return {
          phase: currentPhase.Phase,
          illumination: currentPhase.Illumination,
          emoji: getMoonEmoji(currentPhase.Phase),
          name: formatPhaseName(currentPhase.Phase)
        };
      }
    } catch (error) {
      console.warn('Online moon phase API failed, using backup calculation:', error);
    }
    
    // Fallback to mathematical calculation
    return calculateMoonPhaseBackup();
  };

  // Backup moon phase calculation
  const calculateMoonPhaseBackup = () => {
    const today = new Date();
    const knownNewMoon = new Date(2024, 0, 11); // January 11, 2024 was a new moon
    const lunarCycle = 29.53059; // days in a lunar cycle
    
    const daysSinceKnownNewMoon = Math.floor((today - knownNewMoon) / (1000 * 60 * 60 * 24));
    const currentCycle = daysSinceKnownNewMoon % lunarCycle;
    
    let phase, illumination, name;
    
    if (currentCycle < 1) {
      phase = 'New Moon';
      name = 'newMoon';
      illumination = 0;
    } else if (currentCycle < 7.4) {
      phase = 'Waxing Crescent';
      name = 'waxingCrescent';
      illumination = Math.round((currentCycle / 7.4) * 50);
    } else if (currentCycle < 8.4) {
      phase = 'First Quarter';
      name = 'firstQuarter';
      illumination = 50;
    } else if (currentCycle < 14.8) {
      phase = 'Waxing Gibbous';
      name = 'waxingGibbous';
      illumination = Math.round(50 + ((currentCycle - 8.4) / 6.4) * 50);
    } else if (currentCycle < 15.8) {
      phase = 'Full Moon';
      name = 'fullMoon';
      illumination = 100;
    } else if (currentCycle < 22.1) {
      phase = 'Waning Gibbous';
      name = 'waningGibbous';
      illumination = Math.round(100 - ((currentCycle - 15.8) / 6.3) * 50);
    } else if (currentCycle < 23.1) {
      phase = 'Last Quarter';
      name = 'lastQuarter';
      illumination = 50;
    } else {
      phase = 'Waning Crescent';
      name = 'waningCrescent';
      illumination = Math.round(50 - ((currentCycle - 23.1) / 6.4) * 50);
    }
    
    return {
      phase,
      name,
      illumination,
      emoji: getMoonEmoji(phase)
    };
  };

  // Helper function to get moon emoji
  const getMoonEmoji = (phase) => {
    const phaseEmojis = {
      'New Moon': '🌑',
      'Waxing Crescent': '🌒',
      'First Quarter': '🌓',
      'Waxing Gibbous': '🌔',
      'Full Moon': '🌕',
      'Waning Gibbous': '🌖',
      'Last Quarter': '🌗',
      'Waning Crescent': '🌘'
    };
    return phaseEmojis[phase] || '🌙';
  };

  // Helper function to format phase name for zodiac data lookup
  const formatPhaseName = (phase) => {
    const phaseMap = {
      'New Moon': 'newMoon',
      'Waxing Crescent': 'waxingCrescent',
      'First Quarter': 'firstQuarter',
      'Waxing Gibbous': 'waxingGibbous',
      'Full Moon': 'fullMoon',
      'Waning Gibbous': 'waningGibbous',
      'Last Quarter': 'lastQuarter',
      'Waning Crescent': 'waningCrescent'
    };
    return phaseMap[phase] || 'newMoon';
  };

  const generateReading = async () => {
    if (!birthDate) return;
    
    const date = new Date(birthDate);
    const sign = getZodiacSign(date);
    const zodiacSignKey = getZodiacSign(date);
    const signData = zodiacSigns[zodiacSignKey];

    // Get current moon phase
    const currentMoonPhase = await getMoonPhase();
    setMoonPhase(currentMoonPhase);

    // Get moon phase influence for this zodiac sign
    const moonInfluence = signData.moonPhases && signData.moonPhases[currentMoonPhase.name] 
      ? signData.moonPhases[currentMoonPhase.name]
      : `The current ${currentMoonPhase.phase} brings a time of cosmic reflection and energy alignment for your ${signData.name} nature. This lunar phase encourages you to embrace the celestial rhythms and trust in the universe's divine timing.`;

    // Enhanced reading data with all missing elements
    const enhancedReading = {
      ...signData,
      
      // Enhanced personality with cosmic context
      personality: `As a ${signData.name}, you embody the essence of ${signData.element} energy. Your cosmic blueprint reveals a soul destined for ${signData.personality.toLowerCase()}. The universe has blessed you with an innate understanding of life's deeper mysteries, making you naturally attuned to the celestial rhythms that govern our existence.`,
      
      // Enhanced life path
      lifePath: `Your life journey as a ${signData.name} is one of continuous evolution and cosmic alignment. The stars indicate that your path involves mastering the balance between your ${signData.element.toLowerCase()} nature and the practical demands of earthly existence. You are here to learn, teach, and inspire others through your unique perspective on life's grand tapestry.`,
      
      // Enhanced opportunities
      opportunities: `The cosmos presents you with abundant opportunities to shine in areas related to ${signData.strengths.slice(0, 2).join(' and ').toLowerCase()}. Your natural ${signData.strengths[0].toLowerCase()} will open doors to experiences that align with your soul's purpose. Trust in your intuitive abilities and embrace the cosmic flow.`,
      
      // Enhanced challenges
      challenges: `Your celestial challenges revolve around overcoming tendencies toward ${signData.weaknesses.slice(0, 2).join(' and ').toLowerCase()}. The universe presents these as growth opportunities, not obstacles. By acknowledging and working with these energies, you transform them into sources of wisdom and strength.`,
      
      // Basic info
      dates: getDateRange(sign),
      emoji: getZodiacEmoji(sign),

      // Add moon phase data
      moonPhase: currentMoonPhase,
      moonInfluence: moonInfluence,

      // Include all the missing elements from zodiac data
      planet: signData.planet || signData.rulingPlanet || 'Unknown',
      rulingPlanet: signData.rulingPlanet || signData.planet || 'Unknown',
      compatibility: signData.compatibility || {
        mostCompatible: ['Compatible signs not available'],
        leastCompatible: ['Incompatible signs not available'],
        soulmate: 'Unknown',
        description: 'Compatibility information not available for this sign.'
      },
      luckyElements: signData.luckyElements || {
        numbers: [],
        colors: [],
        days: [],
        stones: [],
        metals: []
      },
      careerSpecific: signData.careerSpecific || {
        ideal: ['Career information not available'],
        avoid: ['No specific careers to avoid'],
        leadership: 'Leadership information not available'
      },
      health: signData.health || {
        bodyParts: [],
        tendencies: [],
        recommendations: []
      },
      mythology: signData.mythology || {
        origin: 'Mythological origin not available',
        story: 'Story not available',
        archetype: 'Unknown archetype',
        deity: 'Associated deity unknown'
      },
      seasonal: signData.seasonal || {
        season: 'Season not specified',
        energy: 'Seasonal energy not defined',
        connection: 'Seasonal connection not available',
        bestSeason: 'Best season not specified'
      }
    };
    
    setReading(enhancedReading);
    setAnimationClass('animate-fadeInUp');
    setShowReading(true);
  };

  const resetReading = () => {
    setShowReading(false);
    setReading(null);
    setBirthDate('');
    setAnimationClass('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Input Section */}
      {!showReading && (
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          marginTop: '10vh'
        }}>
          <h1 style={{
            fontSize: '3rem',
            color: 'white',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            ✨ Cosmic Reader ✨
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2rem'
          }}>
            Discover your cosmic blueprint and celestial destiny
          </p>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <label style={{
              display: 'block',
              color: 'white',
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              Enter your birth date:
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={{
                padding: '12px',
                fontSize: '1.1rem',
                borderRadius: '10px',
                border: 'none',
                marginBottom: '1.5rem',
                width: '100%',
                maxWidth: '300px'
              }}
            />
            <br />
            <button
              onClick={generateReading}
              disabled={!birthDate}
              style={{
                padding: '12px 30px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                border: 'none',
                background: birthDate ? 'linear-gradient(45deg, #ff6b6b, #feca57)' : '#ccc',
                color: 'white',
                cursor: birthDate ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: birthDate ? '0 5px 20px rgba(255, 107, 107, 0.4)' : 'none'
              }}
            >
              🔮 Reveal Your Cosmic Truth
            </button>
          </div>
        </div>
      )}

      {/* Reading Results */}
      {showReading && reading && (
        <div className={animationClass} style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header */}
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

          {/* Mythology Section */}
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
              border: '1px solid rgba(225, 112, 85, 0.3)',
              marginBottom: '1rem'
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

          {/* Personality */}
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

          {/* Compatibility Section - After Personality */}
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

            {/* Seasonal Connection - After Compatibility */}
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

            {/* Strengths & Weaknesses Grid */}
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

            {/* Life Path */}
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

            {/* Opportunities & Challenges */}
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

            {/* Career Specific Section - After Opportunities & Challenges */}
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

            {/* Health Section - After Career */}
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

            {/* Lucky Elements Section */}
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

            {/* Moon Phase Influence Section */}
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


          {/* Action Buttons */}
          <div style={{
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <button
              onClick={resetReading}
              style={{
                padding: '12px 25px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginRight: '1rem'
              }}
            >
              🔄 New Reading
            </button>
            
            <button
              onClick={() => window.print()}
              style={{
                padding: '12px 25px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                border: 'none',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 20px rgba(102, 126, 234, 0.4)'
              }}
            >
              📄 Save Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstrologicalReader;