// utils/moonPhaseUtils.js - Moon phase calculation utilities

// Helper function to get moon emoji
export const getMoonEmoji = (phase) => {
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
export const formatPhaseName = (phase) => {
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

// Backup moon phase calculation
export const calculateMoonPhaseBackup = () => {
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

// Function to get moon phase from online API with fallback calculation
export const getMoonPhase = async () => {
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