import React, { useState, useEffect } from 'react';

// Astrological data
import { zodiacSigns } from '../../data/ZodiacSigns';


  const generateReading = () => {
    if (!birthDate) return;
    
    const date = new Date(birthDate);
    const sign = getZodiacSign(date);
    const signData = zodiacSigns[sign];
    
    setReading(signData);
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
        star.style.opacity = Math.random() * 0.8 + 0.2;
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
                {reading.name} {reading.symbol}
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
                marginBottom: '2rem'
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
            <div style={{
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
                  {reading.strengths.map((strength, index) => (
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
                  {reading.weaknesses.map((weakness, index) => (
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
            <div style={{
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