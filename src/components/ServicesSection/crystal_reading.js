import React, { useState } from 'react';
import { BookingModal } from '../BookingModal';

const crystalData = [
    { name: "Amethyst", meaning: "Spiritual wisdom, clarity, peace", energy: "Calming, protective, intuitive" },
    { name: "Rose Quartz", meaning: "Unconditional love, emotional healing", energy: "Gentle, nurturing, heart-opening" },
    { name: "Clear Quartz", meaning: "Amplification, clarity, purification", energy: "Powerful, cleansing, versatile" },
    { name: "Citrine", meaning: "Abundance, confidence, manifestation", energy: "Energizing, optimistic, creative" },
    { name: "Black Tourmaline", meaning: "Protection, grounding, negativity clearing", energy: "Shielding, stabilizing, cleansing" },
    { name: "Labradorite", meaning: "Transformation, intuition, magic", energy: "Mystical, awakening, illuminating" },
    { name: "Selenite", meaning: "Divine connection, mental clarity, peace", energy: "Purifying, high-vibrational, cleansing" },
    { name: "Carnelian", meaning: "Courage, creativity, motivation", energy: "Stimulating, empowering, passionate" }
];

const CrystalReading = () => {
    const [selectedCrystals, setSelectedCrystals] = useState([]);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const drawThreeCrystals = () => {
        const shuffledCrystals = [...crystalData].sort(() => Math.random() - 0.5);
        const drawnCrystals = shuffledCrystals.slice(0, 3);
        setSelectedCrystals(drawnCrystals);
        setIsRevealed(true);
    };

    const resetReading = () => {
        setSelectedCrystals([]);
        setIsRevealed(false);
    };

    const openBookingModal = () => {
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
    };

    const getCrystalEmoji = (crystalName) => {
        const emojiMap = {
            "Amethyst": "💜",
            "Rose Quartz": "💗",
            "Clear Quartz": "💎",
            "Citrine": "💛",
            "Black Tourmaline": "🖤",
            "Labradorite": "✨",
            "Selenite": "🤍",
            "Carnelian": "🧡"
        };
        return emojiMap[crystalName] || "💎";
    };

    return (
        <div className="page-container page-full-width">
            <section className="page-section">
                
                {/* Header */}
                <div className="text-center py-16">
                    <h1 className="animate-fadeInUp">
                        💎 Crystal Energy Reading
                    </h1>
                    <p className="text-text-cosmic text-lg mb-8 max-w-3xl mx-auto animate-fadeInUp animate-delay-200">
                        Harness the ancient power of crystals to unlock your energy pathways and discover 
                        the healing vibrations that will guide your spiritual journey.
                    </p>
                </div>

                {/* Free Mini Reading */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="cosmic-card p-8 text-center">
                        <h3 className="text-2xl mb-6 text-cosmic-light">Try a Free 3-Crystal Energy Reading</h3>
                        <p className="text-cosmic-muted mb-8">
                            Discover your current energy alignment with our complimentary crystal guidance spread
                        </p>
                        
                        {!isRevealed ? (
                            <button
                                onClick={drawThreeCrystals}
                                className="cosmic-button-primary"
                            >
                                Select Your Crystals
                            </button>
                        ) : (
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-3 gap-8">
                                    {selectedCrystals.map((crystal, index) => (
                                        <div key={index} className="cosmic-card p-6 animate-fadeInUp" style={{ animationDelay: `${index * 200}ms` }}>
                                            <div className="text-4xl mb-4">{getCrystalEmoji(crystal.name)}</div>
                                            <h4 className="text-cosmic-accent mb-2">
                                                {index === 0 ? 'Mind' : index === 1 ? 'Body' : 'Spirit'}
                                            </h4>
                                            <h5 className="text-cosmic-light font-semibold mb-2">{crystal.name}</h5>
                                            <p className="text-cosmic-muted text-sm mb-2">{crystal.meaning}</p>
                                            <p className="text-cosmic-accent text-xs italic">{crystal.energy}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={resetReading}
                                        className="cosmic-button-secondary"
                                    >
                                        Select Again
                                    </button>
                                    <button
                                        onClick={openBookingModal}
                                        className="cosmic-button-primary"
                                    >
                                        Get Full Crystal Reading - $30
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Service Details */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
                    <div className="cosmic-card p-8">
                        <h3 className="text-2xl text-cosmic-light mb-6">What is Crystal Energy Reading?</h3>
                        <p className="text-cosmic-muted mb-4">
                            Crystal Energy Reading taps into the vibrational frequencies of sacred stones to 
                            reveal your energetic patterns, chakra alignments, and spiritual healing pathways.
                        </p>
                        <ul className="space-y-2 text-cosmic-muted">
                            <li>• 40-minute comprehensive energy analysis</li>
                            <li>• Personalized crystal recommendations</li>
                            <li>• Chakra balancing guidance</li>
                            <li>• Healing stone placement techniques</li>
                            <li>• Monthly crystal cleansing rituals</li>
                        </ul>
                    </div>

                    <div className="cosmic-card p-8">
                        <h3 className="text-2xl text-cosmic-light mb-6">Reading Specializations</h3>
                        <div className="space-y-4">
                            <div className="border-l-4 border-cosmic-accent pl-4">
                                <h4 className="text-cosmic-accent font-semibold">Chakra Alignment</h4>
                                <p className="text-cosmic-muted text-sm">Balance your seven energy centers</p>
                            </div>
                            <div className="border-l-4 border-cosmic-accent pl-4">
                                <h4 className="text-cosmic-accent font-semibold">Emotional Healing</h4>
                                <p className="text-cosmic-muted text-sm">Release trauma and embrace inner peace</p>
                            </div>
                            <div className="border-l-4 border-cosmic-accent pl-4">
                                <h4 className="text-cosmic-accent font-semibold">Manifestation Power</h4>
                                <p className="text-cosmic-muted text-sm">Amplify your intentions and goals</p>
                            </div>
                            <div className="border-l-4 border-cosmic-accent pl-4">
                                <h4 className="text-cosmic-accent font-semibold">Protection & Grounding</h4>
                                <p className="text-cosmic-muted text-sm">Shield from negative energies</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Crystal Properties Grid */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h3 className="text-2xl text-cosmic-light text-center mb-8">Featured Healing Crystals</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        {crystalData.map((crystal, index) => (
                            <div key={index} className="cosmic-card p-4 text-center">
                                <div className="text-3xl mb-3">{getCrystalEmoji(crystal.name)}</div>
                                <h4 className="text-cosmic-light font-semibold mb-2">{crystal.name}</h4>
                                <p className="text-cosmic-muted text-sm">{crystal.meaning}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pricing & CTA */}
                <div className="max-w-4xl mx-auto text-center">
                    <div className="cosmic-card p-8">
                        <h3 className="text-3xl text-cosmic-light mb-4">Full Crystal Energy Reading</h3>
                        <div className="text-4xl text-cosmic-accent mb-4">$30</div>
                        <p className="text-cosmic-muted mb-8">40-minute comprehensive crystal guidance with personalized healing plan</p>
                        <button
                            onClick={openBookingModal}
                            className="cosmic-button-primary"
                        >
                            Book Your Crystal Reading
                        </button>
                    </div>
                </div>

            </section>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={closeBookingModal}
                selectedService="crystal"
            />
        </div>
    );
};

export default CrystalReading;