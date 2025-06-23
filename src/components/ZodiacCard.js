import React from 'react';

const ZodiacCard = ({ 
    zodiacSign, 
    index = 0, 
    onClick,
    isSelected = false
}) => {
    return (
        <div
            className={`zodiac-card animate-fadeInUp ${isSelected ? 'selected' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => onClick && onClick(zodiacSign)}
        >
            <div className="zodiac-symbol">
                {zodiacSign.symbol}
            </div>
            <h3 className="zodiac-name">
                {zodiacSign.name}
            </h3>
            <div className="zodiac-dates">
                {zodiacSign.dateRange}
            </div>
            <div className="zodiac-element">
                {zodiacSign.element}
            </div>
            {zodiacSign.traits && (
                <div className="zodiac-traits">
                    {zodiacSign.traits.slice(0, 2).join(', ')}
                </div>
            )}
        </div>
    );
};

export default ZodiacCard;