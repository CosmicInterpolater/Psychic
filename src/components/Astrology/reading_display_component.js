// components/ReadingDisplay.js - Main Reading Display Component
import React from 'react';
import ReadingHeader from './ReadingHeader';
import PersonalitySection from './PersonalitySection';
import CompatibilitySection from './CompatibilitySection';
import SeasonalSection from './SeasonalSection';
import StrengthsWeaknessesGrid from './StrengthsWeaknessesGrid';
import LifePathSection from './LifePathSection';
import OpportunitiesChallengesGrid from './OpportunitiesChallengesGrid';
import CareerSection from './CareerSection';
import HealthSection from './HealthSection';
import LuckyElementsSection from './LuckyElementsSection';
import MoonPhaseSection from './MoonPhaseSection';
import MythologySection from './MythologySection';

const ReadingDisplay = ({ reading, onReset }) => {
  return (
    <div className="animate-fadeInUp" style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <ReadingHeader reading={reading} />
      <MythologySection reading={reading} />
      <PersonalitySection reading={reading} />
      <CompatibilitySection reading={reading} />
      <SeasonalSection reading={reading} />
      <StrengthsWeaknessesGrid reading={reading} />
      <LifePathSection reading={reading} />
      <OpportunitiesChallengesGrid reading={reading} />
      <CareerSection reading={reading} />
      <HealthSection reading={reading} />
      <LuckyElementsSection reading={reading} />
      <MoonPhaseSection reading={reading} />

      {/* Action Buttons */}
      <div style={{
        textAlign: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <button
          onClick={onReset}
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
  );
};

export default ReadingDisplay;