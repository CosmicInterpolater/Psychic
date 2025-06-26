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
    // Enhanced reading data
    const enhancedReading = {
      ...signData,
      personality: `As a ${signData.name}, you embody the essence of ${signData.element} energy. Your cosmic blueprint reveals a soul destined for ${signData.personality.toLowerCase()}. The universe has blessed you with an innate understanding of life's deeper mysteries, making you naturally attuned to the celestial rhythms that govern our existence.`,
      
      lifePath: `Your life journey as a ${signData.name} is one of continuous evolution and cosmic alignment. The stars indicate that your path involves mastering the balance between your ${signData.element.toLowerCase()} nature and the practical demands of earthly existence. You are here to learn, teach, and inspire others through your unique perspective on life's grand tapestry.`,
      
      opportunities: `The cosmos presents you with abundant opportunities to shine in areas related to ${signData.strengths.slice(0, 2).join(' and ').toLowerCase()}. Your natural ${signData.strengths[0].toLowerCase()} will open doors to experiences that align with your soul's purpose. Trust in your intuitive abilities and embrace the cosmic flow.`,
      
      challenges: `Your celestial challenges revolve around overcoming tendencies toward ${signData.weaknesses.slice(0, 2).join(' and ').toLowerCase()}. The universe presents these as growth opportunities, not obstacles. By acknowledging and working with these energies, you transform them into sources of wisdom and strength.`,
      
      dates: getDateRange(sign),
      planet: signData.rulingPlanet || 'Unknown',
      emoji: getZodiacEmoji(sign),

      // Add moon phase data
      moonPhase: currentMoonPhase,
      moonInfluence: moonInfluence
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

  // Create starfield effect for the background
  useEffect(() => {
    const createStars = () => {
      const container = document.getElementById('astrology-starfield');
      if (!container) return;
      
      container.innerHTML = '';
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        star.style.opacity = String(Math.random() * 0.8 + 0.2);
        container.appendChild(star);
      }
    };
    
    createStars();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 50%, #2d1b69 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Starfield Background */}
      <div 
        id="astrology-starfield" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
      
      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {!showReading ? (
          // Input Section
          <div className={`text-center ${animationClass}`} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌟</div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: 'none'
            }}>
              Cosmic Astrology Reading
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Discover the celestial wisdom written in the stars at your birth. 
              Enter your birth date to unlock your cosmic blueprint.
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '0.5rem',
                fontSize: '1.1rem'
              }}>
                🌙 Your Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                style={{
                  padding: '12px 20px',
                  fontSize: '1.1rem',
                  borderRadius: '10px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(5px)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4ecdc4';
                  e.target.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <button
              onClick={generateReading}
              disabled={!birthDate}
              style={{
                padding: '15px 30px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                border: 'none',
                background: birthDate 
                  ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)' 
                  : 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                cursor: birthDate ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: birthDate ? '0 5px 20px rgba(78, 205, 196, 0.4)' : 'none',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                if (birthDate) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(78, 205, 196, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = birthDate ? '0 5px 20px rgba(78, 205, 196, 0.4)' : 'none';
              }}
            >
              ✨ Reveal My Cosmic Blueprint
            </button>
          </div>
        ) : (
          // Reading Results
          <div className={animationClass} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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
                <span style={{ color: '#ff6b6b' }}>🪐 Ruling Planet: {reading.planet}</span>
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

            {/* Moon Phase Influence Section - Add this after Cosmic Challenges */}
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
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
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
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
                }}
              >
                📄 Save Reading
              </button>
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
};

export default AstrologicalReader;