import React from 'react';

const PsychicCard = ({ 
    psychic, 
    index = 0, 
    onSelectGuide 
}) => {
    return (
        <div
            className={`psychic-card animate-fadeInUp`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="psychic-avatar">
                {psychic.avatar}
            </div>
            <h3 className="text-lg font-bold mb-2">{psychic.name}</h3>
            <div className="text-sm opacity-90 mb-3">
                {psychic.specialty}
            </div>
            <div className="star-rating mb-3">
                {'★'.repeat(psychic.rating)}{'☆'.repeat(5 - psychic.rating)}
            </div>
            <button
                className="cosmic-button-ghost text-sm"
                onClick={() => onSelectGuide(psychic.name)}
            >
                Select Guide
            </button>
        </div>
    );
};

export default PsychicCard;