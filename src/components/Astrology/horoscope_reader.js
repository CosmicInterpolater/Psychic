import React, { useState, useEffect } from 'react';

const HoroscopeReader = ({ 
  birthDate, 
  onProceedToFullReading, 
  onBackToHome,
  getZodiacSign,
  getZodiacEmoji 
}) => {
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animationClass, setAnimationClass] = useState('');

  // Check if navigator.onLine is available and if we're online
  const isOnline = () => {
    return navigator.onLine !== false; // Default to true if navigator.onLine is undefined
  };

  // Check network connectivity by trying to fetch a simple resource
  const checkNetworkConnectivity = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
      
      const response = await fetch('https://httpbin.org/get', {
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-cache'
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn('Network connectivity check failed:', error);
      return false;
    }
  };

  // Enhanced fetch with timeout
  const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  // Get horoscope data from multiple free APIs with fallbacks
  const fetchHoroscope = async (zodiacSign) => {
    setLoading(true);
    setError(null);
    
    // First check if we're online
    if (!isOnline()) {
      console.warn('Browser reports offline status');
      setHoroscope(generateOfflineHoroscope(zodiacSign));
      setAnimationClass('animate-fadeInUp');
      setLoading(false);
      return;
    }

    // Check actual network connectivity
    const hasNetwork = await checkNetworkConnectivity();
    if (!hasNetwork) {
      console.warn('Network connectivity test failed');
      setHoroscope(generateOfflineHoroscope(zodiacSign));
      setAnimationClass('animate-fadeInUp');
      setLoading(false);
      return;
    }

    const apis = [
      // API 1: horoscope-api.herokuapp.com
      {
        name: 'horoscope-api',
        daily: `https://horoscope-api.herokuapp.com/horoscope/today/${zodiacSign}`,
        weekly: `https://horoscope-api.herokuapp.com/horoscope/week/${zodiacSign}`
      },
      // API 2: horoscopefree.herokuapp.com  
      {
        name: 'horoscopefree',
        daily: `https://horoscopefree.herokuapp.com/daily/${zodiacSign.toLowerCase()}`,
        weekly: null // This API might not have weekly
      }
    ];

    let dailyHoroscope = null;
    let weeklyHoroscope = null;
    
    // Try each API for daily horoscope with timeout
    for (const api of apis) {
      try {
        console.log(`Trying ${api.name} for daily horoscope...`);
        const response = await fetchWithTimeout(api.daily, {}, 8000);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`${api.name} daily response:`, data);
        
        // Handle different API response formats
        if (api.name === 'horoscope-api') {
          dailyHoroscope = {
            content: data.horoscope || data.description || 'Horoscope not available',
            date: data.date || new Date().toLocaleDateString(),
            source: api.name
          };
        } else if (api.name === 'horoscopefree') {
          dailyHoroscope = {
            content: data.today || data.horoscope || data.description || 'Horoscope not available',
            date: new Date().toLocaleDateString(),
            source: api.name
          };
        }
        
        if (dailyHoroscope && dailyHoroscope.content !== 'Horoscope not available') {
          console.log(`Successfully got daily horoscope from ${api.name}`);
          break;
        }
      } catch (err) {
        console.warn(`${api.name} daily API failed:`, err);
        continue;
      }
    }

    // Try to get weekly horoscope with timeout
    for (const api of apis) {
      if (!api.weekly) continue;
      
      try {
        console.log(`Trying ${api.name} for weekly horoscope...`);
        const response = await fetchWithTimeout(api.weekly, {}, 8000);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`${api.name} weekly response:`, data);
        
        weeklyHoroscope = {
          content: data.horoscope || data.description || data.week || 'Weekly horoscope not available',
          source: api.name
        };
        
        if (weeklyHoroscope && weeklyHoroscope.content !== 'Weekly horoscope not available') {
          console.log(`Successfully got weekly horoscope from ${api.name}`);
          break;
        }
      } catch (err) {
        console.warn(`${api.name} weekly API failed:`, err);
        continue;
      }
    }

    // Fallback horoscopes if APIs fail
    if (!dailyHoroscope) {
      dailyHoroscope = {
        content: generateFallbackHoroscope(zodiacSign, 'daily'),
        date: new Date().toLocaleDateString(),
        source: 'fallback'
      };
    }

    if (!weeklyHoroscope) {
      weeklyHoroscope = {
        content: generateFallbackHoroscope(zodiacSign, 'weekly'),
        source: 'fallback'
      };
    }

    setHoroscope({
      sign: zodiacSign,
      daily: dailyHoroscope,
      weekly: weeklyHoroscope
    });
    
    setAnimationClass('animate-fadeInUp');
    setLoading(false);
  };

  // Generate offline horoscope when no network is available
  const generateOfflineHoroscope = (zodiacSign) => {
    return {
      sign: zodiacSign,
      daily: {
        content: generateFallbackHoroscope(zodiacSign, 'daily'),
        date: new Date().toLocaleDateString(),
        source: 'offline'
      },
      weekly: {
        content: generateFallbackHoroscope(zodiacSign, 'weekly'),
        source: 'offline'
      }
    };
  };

  // Generate fallback horoscope content
  const generateFallbackHoroscope = (sign, period) => {
    const dailyMessages = {
      aries: "Today brings dynamic energy and new opportunities your way. Trust your instincts and take bold action.",
      taurus: "Steady progress and practical decisions will serve you well today. Focus on building solid foundations.",
      gemini: "Communication and adaptability are your superpowers today. Embrace variety and new connections.",
      cancer: "Emotional intelligence and intuition guide you toward meaningful experiences today.",
      leo: "Your natural charisma shines bright today. Step into the spotlight and inspire others.",
      virgo: "Attention to detail and methodical approach lead to success today. Perfect timing for organization.",
      libra: "Balance and harmony are calling you today. Seek beauty and fairness in all your endeavors.",
      scorpio: "Deep transformation and intense focus characterize today's energy. Trust your inner wisdom.",
      sagittarius: "Adventure and expansion await you today. Broaden your horizons and seek new knowledge.",
      capricorn: "Discipline and ambition propel you forward today. Your hard work is about to pay off.",
      aquarius: "Innovation and humanitarian ideals inspire you today. Think outside the box and help others.",
      pisces: "Intuition and creativity flow freely today. Trust your dreams and artistic inspirations."
    };

    const weeklyMessages = {
      aries: "This week emphasizes leadership and pioneering new paths. Your courage opens doors to exciting possibilities.",
      taurus: "A week focused on stability and material growth. Plant seeds for long-term prosperity and security.",
      gemini: "Mental agility and social connections flourish this week. Diverse experiences bring valuable insights.",
      cancer: "Family and emotional matters take center stage this week. Nurture your relationships and inner peace.",
      leo: "Creative expression and recognition highlight this week. Share your talents with confidence and joy.",
      virgo: "Practical achievements and health improvements mark this productive week. Your efforts show tangible results.",
      libra: "Partnerships and aesthetic pursuits bring fulfillment this week. Seek harmony in all your relationships.",
      scorpio: "Profound insights and transformative experiences characterize this intense week. Embrace deep changes.",
      sagittarius: "Learning and travel opportunities expand your worldview this week. Adventure calls your name.",
      capricorn: "Career advancement and goal achievement highlight this ambitious week. Your persistence pays dividends.",
      aquarius: "Progressive ideas and community involvement inspire you this week. Make a positive difference in the world.",
      pisces: "Spiritual growth and artistic inspiration flow through this mystical week. Trust your inner guidance."
    };

    const messages = period === 'daily' ? dailyMessages : weeklyMessages;
    return messages[sign.toLowerCase()] || `The stars align favorably for you this ${period}. Trust in the cosmic flow and embrace the opportunities ahead.`;
  };

  // Initialize horoscope when birth date changes
  useEffect(() => {
    if (birthDate && getZodiacSign) {
      const date = new Date(birthDate);
      const sign = getZodiacSign(date);
      fetchHoroscope(sign);
    }
  }, [birthDate, getZodiacSign]);

  // Capitalize first letter of zodiac sign
  const capitalizeSign = (sign) => {
    return sign.charAt(0).toUpperCase() + sign.slice(1);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            animation: 'twinkle 1.5s infinite'
          }}>
            🔮
          </div>
          <h2 style={{
            color: 'white',
            fontSize: '1.5rem',
            marginBottom: '1rem'
          }}>
            Consulting the Stars...
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem'
          }}>
            Gathering your cosmic insights
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Cosmic Connection Lost
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '2rem' }}>
            {error}
          </p>
          <button
            onClick={onBackToHome}
            style={{
              padding: '12px 25px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              border: 'none',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!horoscope) return null;

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

      <div className={animationClass} style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {getZodiacEmoji ? getZodiacEmoji(horoscope.sign) : '⭐'}
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            {capitalizeSign(horoscope.sign)} Horoscope
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2rem'
          }}>
            Your cosmic forecast is ready
          </p>
        </div>

        {/* Offline Notice */}
        {(horoscope.daily.source === 'offline' || horoscope.weekly.source === 'offline') && (
          <div style={{
            background: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌟</div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.9rem',
              margin: 0
            }}>
              <strong>Offline Mode:</strong> The stars have provided you with a timeless cosmic reading while you're disconnected from the network.
            </p>
          </div>
        )}

        {/* Daily Horoscope */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#feca57',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ☀️ Today's Horoscope
          </h3>
          <div style={{
            background: 'rgba(254, 202, 87, 0.1)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid rgba(254, 202, 87, 0.3)',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem'
              }}>
                📅 {horoscope.daily.date}
              </span>
              {horoscope.daily.source !== 'fallback' && horoscope.daily.source !== 'offline' && (
                <span style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic'
                }}>
                  via {horoscope.daily.source}
                </span>
              )}
            </div>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0
            }}>
              {horoscope.daily.content}
            </p>
          </div>
        </div>

        {/* Weekly Horoscope */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem',
            color: '#4ecdc4',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📅 This Week's Horoscope
          </h3>
          <div style={{
            background: 'rgba(78, 205, 196, 0.1)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid rgba(78, 205, 196, 0.3)'
          }}>
            {horoscope.weekly.source !== 'fallback' && horoscope.weekly.source !== 'offline' && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '1rem'
              }}>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic'
                }}>
                  via {horoscope.weekly.source}
                </span>
              </div>
            )}
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0
            }}>
              {horoscope.weekly.content}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onBackToHome}
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
              minWidth: '160px'
            }}
          >
            🏠 Back to Home
          </button>
          
          <button
            onClick={onProceedToFullReading}
            style={{
              padding: '12px 25px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              border: 'none',
              background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 5px 20px rgba(255, 107, 107, 0.4)',
              minWidth: '200px'
            }}
          >
            🔮 Full Cosmic Reading
          </button>
        </div>

        {/* Disclaimer */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontStyle: 'italic',
            margin: 0
          }}>
            ✨ Horoscopes are for entertainment purposes. Trust your intuition and inner wisdom above all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoroscopeReader;