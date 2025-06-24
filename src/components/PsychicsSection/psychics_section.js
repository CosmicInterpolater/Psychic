import React from 'react';
import PsychicCard from './PsychicCard';

const psychics = [
    {
        id: 1,
        name: "Luna Stardust",
        specialty: "Cosmic Tarot & Timeline Reading",
        avatar: "🌙",
        rating: 5,
        bio: "Channel of lunar energies with 15+ years navigating cosmic timelines. Specializes in past-life connections and future trajectory mapping.",
        gradient: "linear-gradient(45deg, #667eea, #764ba2)"
    },
    {
        id: 2,
        name: "Orion Nebula",
        specialty: "Galactic Astrology & Star Charts",
        avatar: "⭐",
        rating: 5,
        bio: "Master astrologer connecting stellar alignments to earthly experiences. Expert in planetary transits and cosmic influences.",
        gradient: "linear-gradient(45deg, #f093fb, #f5576c)"
    },
    {
        id: 3,
        name: "Sage Cosmos",
        specialty: "Crystal Matrix & Energy Healing",
        avatar: "💎",
        rating: 5,
        bio: "Quantum crystal healer bridging dimensional frequencies. Specializes in chakra alignment and vibrational therapy.",
        gradient: "linear-gradient(45deg, #4facfe, #00f2fe)"
    },
    {
        id: 4,
        name: "Phoenix Starweaver",
        specialty: "Palm Reading & Life Path Analysis",
        avatar: "🔥",
        rating: 4,
        bio: "Ancient palmistry wisdom meets modern intuitive insights. Expert in life line interpretation and destiny mapping.",
        gradient: "linear-gradient(45deg, #ff6b6b, #feca57)"
    }
];

const PsychicsSection = ({ onSelectGuide }) => {
    return (
        <section id="psychics" className="page-section bg-cosmic-void/80 backdrop-blur-glass">
            <div className="page-container">
                <h2 className="text-center">Our Cosmic Guides</h2>
                <div className="cosmic-grid-psychics">
                    {psychics.map((psychic, index) => (
                        <PsychicCard
                            key={psychic.id}
                            psychic={psychic}
                            index={index}
                            onSelectGuide={onSelectGuide}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PsychicsSection;