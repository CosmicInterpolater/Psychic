import React, { useState } from 'react';
import { BookingModal } from '../BookingModal';

const tarotCards = [
    { name: "The Star", meaning: "Hope, inspiration, spiritual guidance" },
    { name: "The Moon", meaning: "Intuition, illusion, subconscious" },
    { name: "The Sun", meaning: "Joy, success, vitality" },
    { name: "The Fool", meaning: "New beginnings, spontaneity, innocence" },
    { name: "The Magician", meaning: "Manifestation, resourcefulness, power" },
    { name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine" }
];

const TarotReading = () => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const drawThreeCards = () => {
        const shuffledCards = [...tarotCards].sort(() => Math.random() - 0.5);
        const drawnCards = shuffledCards.slice(0, 3);
        setSelectedCards(drawnCards);
        setIsRevealed(true);
    };

    const resetReading = () => {
        setSelectedCards([]);
        setIsRevealed(false);
    };

    const openBookingModal = () => {
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
    };

    return (
        <div className="page-container page-full-width">
            <section className="page-section">
                
                {/* Header */}
                <div className="text-center py-16">
                    <h1 className="animate-fadeInUp">
                        🌟 Stellar Tarot Reading
                    </h1>
                    <p className="text-text-cosmic text-lg mb-8 max-w-3xl mx-auto animate-fadeInUp animate-delay-200">
                        Navigate your cosmic path through ancient tarot wisdom enhanced by stellar AI insights. 
                        Discover what the universe has in store for you.
                    </p>
                </div>

                {/* Free Mini Reading */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="cosmic-card p-8 text-center">
                        <h3 className="text-2xl mb-6 text-cosmic-light">Try a Free 3-Card Reading</h3>
                        <p className="text-cosmic-muted mb-8">
                            Experience the power of tarot with our complimentary past-present-future spread
                        </p>
                        
                        {!isRevealed ? (
                            <button
                                onClick={drawThreeCards}
                                className="cosmic-button-primary"
                            >
                                Draw Your Cards
                            </button>
                        ) : (
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-3 gap-8">
                                    {selectedCards.map((card, index) => (
                                        <div key={index} className="cosmic-card p-6 animate-fadeInUp" style={{ animationDelay: `${index * 200}ms` }}>
                                            <div className="text-4xl mb-4">🃏</div>
                                            <h4 className="text-cosmic-accent mb-2">
                                                {index === 0 ? 'Past' : index === 1 ? 'Present' : 'Future'}
                                            </h4>
                                            <h5 className="text-cosmic-light font-semibold mb-2">{card.name}</h5>
                                            <p className="text-cosmic-muted text-sm">{card.meaning}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={resetReading}
                                        className="cosmic-button-secondary"
                                    >
                                        Draw Again
                                    </button>
                                    <button
                                        onClick={openBookingModal}
                                        className="cosmic-button-primary"
                                    >
                                        Get Full Reading - $25
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Service Details */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
                    <div className="cosmic-card p-8">
                        <h3 className="text-2xl text-cosmic-light mb-6">What is Stellar Tarot?</h3>
                        <p className="text-cosmic-muted mb-4">
                            Our Stellar Tarot Reading combines ancient tarot wisdom with modern AI-enhanced insights, 
                            providing you with deeper clarity and cosmic guidance for your life's journey.
                        </p>
                        <ul className="space-y-2 text-cosmic-muted">
                            <li>• 30-minute personalized reading</li>
                            <li>• AI-enhanced card interpretations</li>
                            <li>• Cosmic timing and energy analysis</li>
                            <li>• Actionable guidance for your path</li>
                        </ul>
                    </div>

                    <div className="cosmic-card p-8">
                        <h3 className="text-2xl text-cosmic-light mb-6">Reading Formats</h3>
                        <div className="space-y-4">
                            <div className="border-l-4 border-cosmic-accent pl-4">
                                <h4 className="text-cosmic-accent font-semibold">Celtic Cross</h4>
                                <p className="text-cosmic-muted text-sm">Complete life situation analysis</p>
                            </div>
                            <div className="border-l-4 border-cosmic-accent pl-4">
                                <h4 className="text-cosmic-accent font-semibold">Love & Relationships</h4>
                                <p className="text-cosmic-muted text-sm">Romantic guidance and connection insights</p>
                            </div>
                            <div className="border-l-4 border-cosmic-accent pl-4">
                                <h4 className="text-cosmic-accent font-semibold">Career Path</h4>
                                <p className="text-cosmic-muted text-sm">Professional direction and opportunities</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing & CTA */}
                <div className="max-w-4xl mx-auto text-center">
                    <div className="cosmic-card p-8">
                        <h3 className="text-3xl text-cosmic-light mb-4">Full Stellar Tarot Reading</h3>
                        <div className="text-4xl text-cosmic-accent mb-4">$25</div>
                        <p className="text-cosmic-muted mb-8">30-minute comprehensive reading with cosmic guidance</p>
                        <button
                            onClick={openBookingModal}
                            className="cosmic-button-primary"
                        >
                            Book Your Reading Now
                        </button>
                    </div>
                </div>

            </section>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={closeBookingModal}
                selectedService="tarot"
            />
        </div>
    );
};

export default TarotReading;