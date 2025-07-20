import React, { useState } from 'react';
import ServiceCard from '../ServiceCard';

const services = [
    {
        id: 'tarot',
        title: 'Stellar Tarot Reading',
        icon: '🌟',
        description: 'Navigate your cosmic path through ancient tarot wisdom enhanced by stellar AI insights.',
        price: 25,
        duration: 30
    },
    {
        id: 'astrology',
        title: 'Galactic Astrology Chart',
        icon: '🪐',
        description: 'Deep-space birth chart analysis revealing your celestial blueprint and cosmic purpose.',
        price: 40,
        duration: 45
    },
    {
        id: 'palmistry',
        title: 'Quantum Palm Reading',
        icon: '✋',
        description: 'Advanced palmistry analysis using quantum consciousness mapping techniques.',
        price: 30,
        duration: 25
    },
    {
        id: 'crystal',
        title: 'Crystal Matrix Consultation',
        icon: '💎',
        description: 'Harness crystalline frequencies for interdimensional energy alignment and guidance.',
        price: 35,
        duration: 40
    }
];

const ServiceDetailModal = ({ service, isOpen, onClose, onBookingOpen }) => {
    if (!isOpen || !service) return null;

    const renderServiceContent = () => {
        switch (service.id) {
            case 'tarot':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🌟</div>
                            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-blue-200">{service.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-white mb-3">What You'll Experience</h4>
                                <ul className="space-y-2 text-blue-200 text-sm">
                                    <li>• 30-minute personalized reading</li>
                                    <li>• AI-enhanced card interpretations</li>
                                    <li>• Cosmic timing and energy analysis</li>
                                    <li>• Actionable guidance for your path</li>
                                </ul>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-white mb-3">Reading Types</h4>
                                <div className="space-y-2">
                                    <div className="border-l-2 border-yellow-400 pl-2">
                                        <h5 className="text-yellow-400 font-semibold text-sm">Celtic Cross</h5>
                                        <p className="text-blue-200 text-xs">Complete life situation analysis</p>
                                    </div>
                                    <div className="border-l-2 border-yellow-400 pl-2">
                                        <h5 className="text-yellow-400 font-semibold text-sm">Love & Relationships</h5>
                                        <p className="text-blue-200 text-xs">Romantic guidance and insights</p>
                                    </div>
                                    <div className="border-l-2 border-yellow-400 pl-2">
                                        <h5 className="text-yellow-400 font-semibold text-sm">Career Path</h5>
                                        <p className="text-blue-200 text-xs">Professional direction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'palmistry':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="text-5xl mb-4">✋</div>
                            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-blue-200">{service.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-white mb-3">What Your Palm Reveals</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">💖</span>
                                        <div>
                                            <h5 className="text-yellow-400 font-semibold text-sm">Love & Relationships</h5>
                                            <p className="text-blue-200 text-xs">Romantic patterns and emotional depth</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">🎯</span>
                                        <div>
                                            <h5 className="text-yellow-400 font-semibold text-sm">Career & Success</h5>
                                            <p className="text-blue-200 text-xs">Professional strengths</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">⚡</span>
                                        <div>
                                            <h5 className="text-yellow-400 font-semibold text-sm">Life Energy</h5>
                                            <p className="text-blue-200 text-xs">Vitality and health indicators</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                                <h4 className="text-lg font-semibold text-white mb-3">Our Methods</h4>
                                <div className="space-y-3">
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">🌌</div>
                                        <h5 className="text-yellow-400 font-semibold text-sm">Traditional Palmistry</h5>
                                        <p className="text-blue-200 text-xs">Classical line analysis</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">⚛️</div>
                                        <h5 className="text-yellow-400 font-semibold text-sm">Quantum Analysis</h5>
                                        <p className="text-blue-200 text-xs">Advanced energy mapping</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'astrology':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🪐</div>
                            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-blue-200">{service.description}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                                <div className="text-3xl mb-2">🌟</div>
                                <h5 className="text-yellow-400 font-semibold text-sm mb-1">Personal Birth Chart</h5>
                                <p className="text-blue-200 text-xs">Complete planetary positions</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                                <div className="text-3xl mb-2">🪐</div>
                                <h5 className="text-yellow-400 font-semibold text-sm mb-1">Cosmic Influences</h5>
                                <p className="text-blue-200 text-xs">Current planetary transits</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                                <div className="text-3xl mb-2">🔮</div>
                                <h5 className="text-yellow-400 font-semibold text-sm mb-1">Future Insights</h5>
                                <p className="text-blue-200 text-xs">Opportunities revealed</p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                            <h4 className="text-lg font-semibold text-white mb-3 text-center">Zodiac Elements</h4>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="text-center">
                                    <div className="text-2xl mb-1">♈</div>
                                    <p className="text-yellow-400 text-xs">Aries</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">♌</div>
                                    <p className="text-yellow-400 text-xs">Leo</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">♏</div>
                                    <p className="text-yellow-400 text-xs">Scorpio</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">♓</div>
                                    <p className="text-yellow-400 text-xs">Pisces</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header with close button */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Service Details</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-300 text-2xl w-8 h-8 flex items-center justify-center"
                        >
                            ×
                        </button>
                    </div>

                    {/* Service content */}
                    {renderServiceContent()}

                    {/* Pricing and CTA */}
                    <div className="mt-8 text-center border-t border-white/20 pt-6">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">${service.price}</div>
                        <div className="text-blue-300 mb-6">{service.duration} minutes</div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={onClose}
                                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    onBookingOpen(service.id);
                                    onClose();
                                }}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                            >
                                Book This Service
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServicesSection = ({ onBookingOpen, onServiceSelect }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleServiceSelect = (serviceId) => {
        const service = services.find(s => s.id === serviceId);
        setSelectedService(service);
        setIsModalOpen(true);
        // Also call the parent callback if provided
        if (onServiceSelect) {
            onServiceSelect(serviceId);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    return (
        <>
            <section id="services" className="page-section bg-cosmic-deep/80 backdrop-blur-glass">
                <div className="page-container">
                    <h2 className="text-center text-3xl font-bold text-white mb-12">Cosmic Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={service.id} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 text-center">
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                                <p className="text-blue-200 mb-4 text-sm">{service.description}</p>
                                <div className="text-2xl font-bold text-yellow-400 mb-2">${service.price}</div>
                                <div className="text-sm text-blue-300 mb-6">{service.duration} minutes</div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => onBookingOpen(service.id)}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                                    >
                                        Book Session
                                    </button>

                                    {/* Only show "Learn More" for services that have dedicated pages */}
                                    {(service.id === 'tarot' || service.id === 'palmistry' || service.id === 'astrology') && (
                                        <button
                                            onClick={() => handleServiceSelect(service.id)}
                                            className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                                        >
                                            Learn More
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Detail Modal */}
            <ServiceDetailModal
                service={selectedService}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onBookingOpen={onBookingOpen}
            />
        </>
    );
};

export default ServicesSection;
