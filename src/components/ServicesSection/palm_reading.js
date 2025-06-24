import React, { useState } from 'react';
import { BookingModal } from '../BookingModal';

const palmLines = [
    {
        name: "Life Line",
        description: "Reveals your vitality, physical health, and life path journey",
        meaning: "Strength, endurance, and major life changes"
    },
    {
        name: "Heart Line",
        description: "Shows your emotional nature, relationships, and romantic patterns",
        meaning: "Love, compassion, and emotional stability"
    },
    {
        name: "Head Line",
        description: "Indicates your mental approach, communication style, and intellect",
        meaning: "Wisdom, logic, and decision-making abilities"
    },
    {
        name: "Fate Line",
        description: "Reveals your career path, success, and life direction",
        meaning: "Destiny, purpose, and material achievements"
    }
];

const PalmReading = () => {
    const [selectedLine, setSelectedLine] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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
                        ✋ Quantum Palm Reading
                    </h1>
                    <p className="text-text-cosmic text-lg mb-8 max-w-3xl mx-auto animate-fadeInUp animate-delay-200">
                        Advanced palmistry analysis using quantum consciousness mapping techniques. 
                        Discover the secrets written in your hands by the universe itself.
                    </p>
                </div>

                {/* Interactive Palm */}
                <div className="max-w-5xl mx-auto mb-16">
                    <div className="cosmic-card p-8">
                        <h3 className="text-2xl text-center text-cosmic-light mb-8">Explore Your Palm Lines</h3>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Palm Visual */}
                            <div className="text-center">
                                <div className="relative inline-block">
                                    <div className="text-9xl mb-4 filter drop-shadow-lg">✋</div>
                                    <div className="absolute inset-0 pointer-events-none">
                                        {/* Interactive palm line indicators */}
                                        <div className="relative w-full h-full">
                                            {palmLines.map((line, index) => (
                                                <button
                                                    key={line.name}
                                                    className={`absolute w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-150 ${
                                                        selectedLine === index 
                                                            ? 'bg-cosmic-primary border-cosmic-primary shadow-cosmic' 
                                                            : 'bg-transparent border-cosmic-light hover:bg-cosmic-light'
                                                    }`}
                                                    style={{
                                                        left: index === 0 ? '25%' : index === 1 ? '15%' : index === 2 ? '35%' : '45%',
                                                        top: index === 0 ? '30%' : index === 1 ? '20%' : index === 2 ? '40%' : '50%'
                                                    }}
                                                    onClick={() => setSelectedLine(selectedLine === index ? null : index)}
                                                    aria-label={`Select ${line.name}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-cosmic-light text-sm mt-4">Click the glowing points to explore each palm line</p>
                            </div>

                            {/* Line Information Panel */}
                            <div className="space-y-6">
                                {selectedLine !== null ? (
                                    <div className="animate-fadeInUp">
                                        <div className="cosmic-card-inner p-6 border border-cosmic-primary">
                                            <h4 className="text-xl text-cosmic-primary mb-3">
                                                {palmLines[selectedLine].name}
                                            </h4>
                                            <p className="text-text-cosmic mb-4">
                                                {palmLines[selectedLine].description}
                                            </p>
                                            <div className="text-sm text-cosmic-light">
                                                <strong>Reveals:</strong> {palmLines[selectedLine].meaning}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-cosmic-light">
                                        <div className="text-4xl mb-4">🔮</div>
                                        <p>Select a palm line to discover its meaning</p>
                                        <p className="text-sm mt-2">Each line tells a unique story about your life path</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Palm Reading Methods */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h3 className="text-3xl text-center text-cosmic-light mb-12">Our Quantum Palm Reading Methods</h3>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="cosmic-card p-6 text-center">
                            <div className="text-4xl mb-4">🌌</div>
                            <h4 className="text-xl text-cosmic-primary mb-3">Traditional Palmistry</h4>
                            <p className="text-text-cosmic">Classical interpretation of major and minor lines, mounts, and hand shape analysis</p>
                        </div>

                        <div className="cosmic-card p-6 text-center">
                            <div className="text-4xl mb-4">⚛️</div>
                            <h4 className="text-xl text-cosmic-primary mb-3">Quantum Analysis</h4>
                            <p className="text-text-cosmic">Advanced energy mapping techniques that reveal deeper soul patterns and future potentials</p>
                        </div>

                        <div className="cosmic-card p-6 text-center">
                            <div className="text-4xl mb-4">🔬</div>
                            <h4 className="text-xl text-cosmic-primary mb-3">Scientific Integration</h4>
                            <p className="text-text-cosmic">Combining ancient wisdom with modern understanding of neural pathways and consciousness</p>
                        </div>
                    </div>
                </div>

                {/* What Your Palm Reveals */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="cosmic-card p-8">
                        <h3 className="text-3xl text-center text-cosmic-light mb-8">What Your Palm Reveals</h3>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl">💖</div>
                                    <div>
                                        <h4 className="text-lg text-cosmic-primary mb-2">Love & Relationships</h4>
                                        <p className="text-text-cosmic">Your relationship patterns, romantic compatibility, and emotional depth</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl">🎯</div>
                                    <div>
                                        <h4 className="text-lg text-cosmic-primary mb-2">Career & Success</h4>
                                        <p className="text-text-cosmic">Professional strengths, leadership qualities, and material achievements</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl">🧠</div>
                                    <div>
                                        <h4 className="text-lg text-cosmic-primary mb-2">Mental Abilities</h4>
                                        <p className="text-text-cosmic">Intellectual gifts, decision-making style, and communication patterns</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl">⚡</div>
                                    <div>
                                        <h4 className="text-lg text-cosmic-primary mb-2">Life Energy</h4>
                                        <p className="text-text-cosmic">Vitality levels, health indicators, and life force strength</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl">🔮</div>
                                    <div>
                                        <h4 className="text-lg text-cosmic-primary mb-2">Spiritual Path</h4>
                                        <p className="text-text-cosmic">Intuitive abilities, spiritual growth, and higher consciousness connection</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl">🌟</div>
                                    <div>
                                        <h4 className="text-lg text-cosmic-primary mb-2">Hidden Talents</h4>
                                        <p className="text-text-cosmic">Undiscovered abilities, creative potential, and unique gifts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reading Process */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h3 className="text-3xl text-center text-cosmic-light mb-12">Your Reading Experience</h3>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="cosmic-card p-6 mb-4">
                                <div className="text-3xl mb-2">📱</div>
                                <h4 className="text-lg text-cosmic-primary">1. Connect</h4>
                            </div>
                            <p className="text-text-cosmic text-sm">Schedule your session via video call or in-person</p>
                        </div>

                        <div className="text-center">
                            <div className="cosmic-card p-6 mb-4">
                                <div className="text-3xl mb-2">✋</div>
                                <h4 className="text-lg text-cosmic-primary">2. Analyze</h4>
                            </div>
                            <p className="text-text-cosmic text-sm">Detailed examination of both hands using quantum techniques</p>
                        </div>

                        <div className="text-center">
                            <div className="cosmic-card p-6 mb-4">
                                <div className="text-3xl mb-2">📖</div>
                                <h4 className="text-lg text-cosmic-primary">3. Interpret</h4>
                            </div>
                            <p className="text-text-cosmic text-sm">Comprehensive reading of all lines, mounts, and patterns</p>
                        </div>

                        <div className="text-center">
                            <div className="cosmic-card p-6 mb-4">
                                <div className="text-3xl mb-2">🎁</div>
                                <div className="text-lg text-cosmic-primary">4. Receive</div>
                            </div>
                            <p className="text-text-cosmic text-sm">Written summary and personalized guidance for your journey</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mb-16">
                    <div className="cosmic-card p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl text-cosmic-light mb-4">Ready to Discover Your Palm's Secrets?</h3>
                        <p className="text-text-cosmic mb-6">
                            Book your quantum palm reading session and unlock the wisdom written in your hands by the universe itself.
                        </p>
                        <button 
                            onClick={openBookingModal}
                            className="btn-primary text-lg px-8 py-4"
                        >
                            Book Your Palm Reading ✋
                        </button>
                    </div>
                </div>

            </section>

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <BookingModal onClose={closeBookingModal} />
            )}
        </div>
    );
};

export default PalmReading;
