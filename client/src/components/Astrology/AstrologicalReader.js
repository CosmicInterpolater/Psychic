// AstrologicalReader.js - Fixed Navigation Logic
import React, { useState } from 'react';
import DateInput from './DateInput';
import ReadingDisplay from './ReadingDisplay';
import HoroscopeReader from './HoroscopeReader';
import { zodiacSigns } from '../../data/ZodiacSigns';
import { getZodiacSign, getDateRange, getZodiacEmoji } from './zodiacUtils';
import { getMoonPhase } from '../../services/astrologyService';

const AstrologicalReader = ({ onNavigateHome, birthDate, birthCity, birthState, birthTime }) => {
    // Accept birth details as props and initialize state
    const [localBirthDate, setLocalBirthDate] = useState(birthDate || '');
    const [localBirthCity, setLocalBirthCity] = useState(birthCity || '');
    const [localBirthState, setLocalBirthState] = useState(birthState || '');
    const [localBirthTime, setLocalBirthTime] = useState(birthTime || '');
    const [reading, setReading] = useState(null);
    const [showReading, setShowReading] = useState(false);
    const [showHoroscope, setShowHoroscope] = useState(false);
    const [moonPhase, setMoonPhase] = useState(null);
    const [currentStep, setCurrentStep] = useState('input'); // 'input', 'horoscope', 'reading'

    // On mount, set birth details from props if provided
    // No need for useEffect, state is initialized from props above

    const handleDateSubmit = () => {
        if (!localBirthDate) return;
        setCurrentStep('horoscope');
        setShowHoroscope(true);
    };

    const handleProceedToFullReading = async () => {
        if (!localBirthDate) return;

        const date = new Date(localBirthDate);
        const sign = getZodiacSign(date);
        const signData = zodiacSigns[sign];

        // Get current moon phase
        const currentMoonPhase = await getMoonPhase();
        setMoonPhase(currentMoonPhase);

        // Get moon phase influence for this zodiac sign
        const moonInfluence = signData.moonPhases && signData.moonPhases[currentMoonPhase.name]
            ? signData.moonPhases[currentMoonPhase.name]
            : `The current ${currentMoonPhase.phase} brings a time of cosmic reflection and energy alignment for your ${signData.name} nature.`;

        // Compose birth details for ascendant/house analysis
        let birthDetailsText = '';
        if (localBirthCity || localBirthState || localBirthTime) {
            birthDetailsText = `\nBirth Place: ${localBirthCity || ''}${localBirthCity && localBirthState ? ', ' : ''}${localBirthState || ''}\nTime of Birth: ${localBirthTime || 'Unknown'}`;
        }

        // Enhanced reading data
        const enhancedReading = {
            ...signData,
            personality: `As a ${signData.name}, you embody the essence of ${signData.element} energy. Your cosmic blueprint reveals a soul destined for ${signData.personality.toLowerCase()}.` + birthDetailsText,
            lifePath: `Your life journey as a ${signData.name} is one of continuous evolution and cosmic alignment.`,
            opportunities: `The cosmos presents you with abundant opportunities to shine in areas related to ${signData.strengths.slice(0, 2).join(' and ').toLowerCase()}.`,
            challenges: `Your celestial challenges revolve around overcoming tendencies toward ${signData.weaknesses.slice(0, 2).join(' and ').toLowerCase()}.`,
            dates: getDateRange(sign),
            emoji: getZodiacEmoji(sign),
            moonPhase: currentMoonPhase,
            moonInfluence: moonInfluence,
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
            },
            birthCity: localBirthCity,
            birthState: localBirthState,
            birthTime: localBirthTime
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
                    birthDate={localBirthDate}
                    setBirthDate={setLocalBirthDate}
                    birthCity={localBirthCity}
                    setBirthCity={setLocalBirthCity}
                    birthState={localBirthState}
                    setBirthState={setLocalBirthState}
                    birthTime={localBirthTime}
                    setBirthTime={setLocalBirthTime}
                    onGenerate={handleDateSubmit}
                />
            )}

            {currentStep === 'horoscope' && showHoroscope && (
                <HoroscopeReader
                    birthDate={localBirthDate}
                    birthCity={localBirthCity}
                    birthState={localBirthState}
                    birthTime={localBirthTime}
                    onProceedToFullReading={handleProceedToFullReading}
                    onBackToHome={handleBackToHome}
                    getZodiacSign={getZodiacSign}
                    getZodiacEmoji={getZodiacEmoji}
                />
            )}

            {currentStep === 'reading' && showReading && (
                <ReadingDisplay
                    reading={reading}
                    birthDate={localBirthDate}
                    birthCity={localBirthCity}
                    birthState={localBirthState}
                    birthTime={localBirthTime}
                    onReset={handleResetReading}
                    onBackToHome={handleBackToHome}
                />
            )}

            {/* Fallback for blank screen: show error if nothing renders */}
            {!(currentStep === 'input' || (currentStep === 'horoscope' && showHoroscope) || (currentStep === 'reading' && showReading)) && (
                <div style={{ color: 'white', textAlign: 'center', padding: '40px', background: '#660000' }}>
                    <h2>⚠️ Service Error</h2>
                    <p>Something went wrong. Please check your inputs and try again, or contact support.</p>
                </div>
            )}
        </div>
    );
};

export default AstrologicalReader;
