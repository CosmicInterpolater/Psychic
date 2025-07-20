// AstrologicalReader.js - Fixed Navigation Logic
import React, { useState } from 'react';
import DateInput from './DateInput';
import ReadingDisplay from './ReadingDisplay';
import HoroscopeReader from './HoroscopeReader';
import { zodiacSigns } from '../../data/ZodiacSigns';
import { getZodiacSign, getDateRange, getZodiacEmoji } from './zodiacUtils';
import { getMoonPhase } from '../../services/astrologyService';

const AstrologicalReader = ({ onNavigateHome }) => {
    const [birthDate, setBirthDate] = useState('');
    const [reading, setReading] = useState(null);
    const [showReading, setShowReading] = useState(false);
    const [showHoroscope, setShowHoroscope] = useState(false);
    const [moonPhase, setMoonPhase] = useState(null);
    const [currentStep, setCurrentStep] = useState('input'); // 'input', 'horoscope', 'reading'

    const handleDateSubmit = () => {
        if (!birthDate) return;

        // Move to horoscope step
        setCurrentStep('horoscope');
        setShowHoroscope(true);
    };

    const handleProceedToFullReading = async () => {
        if (!birthDate) return;

        const date = new Date(birthDate);
        const sign = getZodiacSign(date);
        const signData = zodiacSigns[sign];

        // Get current moon phase
        const currentMoonPhase = await getMoonPhase();
        setMoonPhase(currentMoonPhase);

        // Get moon phase influence for this zodiac sign
        const moonInfluence = signData.moonPhases && signData.moonPhases[currentMoonPhase.name]
            ? signData.moonPhases[currentMoonPhase.name]
            : `The current ${currentMoonPhase.phase} brings a time of cosmic reflection and energy alignment for your ${signData.name} nature.`;

        // Enhanced reading data
        const enhancedReading = {
            ...signData,

            // Enhanced personality with cosmic context
            personality: `As a ${signData.name}, you embody the essence of ${signData.element} energy. Your cosmic blueprint reveals a soul destined for ${signData.personality.toLowerCase()}.`,

            // Enhanced life path
            lifePath: `Your life journey as a ${signData.name} is one of continuous evolution and cosmic alignment.`,

            // Enhanced opportunities
            opportunities: `The cosmos presents you with abundant opportunities to shine in areas related to ${signData.strengths.slice(0, 2).join(' and ').toLowerCase()}.`,

            // Enhanced challenges
            challenges: `Your celestial challenges revolve around overcoming tendencies toward ${signData.weaknesses.slice(0, 2).join(' and ').toLowerCase()}.`,

            // Basic info
            dates: getDateRange(sign),
            emoji: getZodiacEmoji(sign),
            moonPhase: currentMoonPhase,
            moonInfluence: moonInfluence,

            // Include fallback data for missing elements
            planet: signData.planet || signData.rulingPlanet || 'Unknown',
            rulingPlanet: signData.rulingPlanet || signData.planet || 'Unknown',
            compatibility: signData.compatibility || {
                mostCompatible: ['Compatible signs not available'],
                leastCompatible: ['Incompatible signs not available'],
                soulmate: 'Unknown',
                description: 'Compatibility information not available for this sign.'
            },
            luckyElements: signData.luckyElements || {
                numbers: [], colors: [], days: [], stones: [], metals: []
            },
            careerSpecific: signData.careerSpecific || {
                ideal: ['Career information not available'],
                avoid: ['No specific careers to avoid'],
                leadership: 'Leadership information not available'
            },
            health: signData.health || {
                bodyParts: [], tendencies: [], recommendations: []
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
        setCurrentStep('reading');
        setShowReading(true);
        setShowHoroscope(false);
    };

    // FIXED: This function now properly handles navigation back to main home
    const handleBackToHome = () => {
        // Always use the onNavigateHome prop if it exists (which it should when called from main Home component)
        if (onNavigateHome) {
            onNavigateHome();
            return;
        }

        // Fallback: if for some reason onNavigateHome doesn't exist, reset the component
        // This should rarely happen since this component is called from Home.js
        console.warn('onNavigateHome prop not found, resetting component instead');
        setCurrentStep('input');
        setShowReading(false);
        setShowHoroscope(false);
        setReading(null);
        setBirthDate('');
    };

    // ADDED: Separate function for resetting within the astrology reader (for "New Reading" type functionality)
    const handleResetReading = () => {
        setCurrentStep('input');
        setShowReading(false);
        setShowHoroscope(false);
        setReading(null);
        setBirthDate('');
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        @media (max-width: 768px) {
          .grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

            {currentStep === 'input' && (
                <DateInput
                    birthDate={birthDate}
                    setBirthDate={setBirthDate}
                    onGenerate={handleDateSubmit}
                />
            )}

            {currentStep === 'horoscope' && showHoroscope && (
                <HoroscopeReader
                    birthDate={birthDate}
                    onProceedToFullReading={handleProceedToFullReading}
                    onBackToHome={handleBackToHome} // This will now properly go back to main home
                    getZodiacSign={getZodiacSign}
                    getZodiacEmoji={getZodiacEmoji}
                />
            )}

            {currentStep === 'reading' && showReading && (
                <ReadingDisplay
                    reading={reading}
                    onReset={handleResetReading} // Use the reset function for "New Reading"
                    onBackToHome={handleBackToHome} // Use home navigation for "Back to Home"
                />
            )}
        </div>
    );
};

export default AstrologicalReader;
