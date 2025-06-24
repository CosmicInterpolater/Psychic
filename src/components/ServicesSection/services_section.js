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

const ServicesSection = ({ onBookingOpen, onServiceSelect }) => {
    const [currentView, setCurrentView] = useState('overview');
    const [selectedService, setSelectedService] = useState(null);

    const handleServiceSelect = (serviceId) => {
        setSelectedService(serviceId);
        setCurrentView('detail');
        // Also call the parent callback if provided
        if (onServiceSelect) {
            onServiceSelect(serviceId);
        }
    };

    const handleBackToOverview = () => {
        setCurrentView('overview');
        setSelectedService(null);
    };

    const renderServiceDetail = () => {
        const service = services.find(s => s.id === selectedService);
        if (!service) return null;

        switch (selectedService) {
            case 'tarot':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🌟</div>
                            <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
                            <p className="text-blue-200 text-lg max-w-2xl mx-auto">{service.description}</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">What You'll Experience</h3>
                                <ul className="space-y-2 text-blue-200">
                                    <li>• 30-minute personalized reading</li>
                                    <li>• AI-enhanced card interpretations</li>
                                    <li>• Cosmic timing and energy analysis</li>
                                    <li>• Actionable guidance for your path</li>
                                </ul>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Reading Types</h3>
                                <div className="space-y-3">
                                    <div className="border-l-4 border-yellow-400 pl-3">
                                        <h4 className="text-yellow-400 font-semibold">Celtic Cross</h4>
                                        <p className="text-blue-200 text-sm">Complete life situation analysis</p>
                                    </div>
                                    <div className="border-l-4 border-yellow-400 pl-3">
                                        <h4 className="text-yellow-400 font-semibold">Love & Relationships</h4>
                                        <p className="text-blue-200 text-sm">Romantic guidance and insights</p>
                                    </div>
                                    <div className="border-l-4 border-yellow-400 pl-3">
                                        <h4 className="text-yellow-400 font-semibold">Career Path</h4>
                                        <p className="text-blue-200 text-sm">Professional direction and opportunities</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">${service.price}</div>
                            <div className="text-blue-300 mb-6">{service.duration} minutes</div>
                            <button
                                onClick={() => onBookingOpen(service.id)}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all text-lg"
                            >
                                Book Your Reading Now
                            </button>
                        </div>
                    </div>
                );

            case 'palmistry':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="text-6xl mb-4">✋</div>
                            <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
                            <p className="text-blue-200 text-lg max-w-2xl mx-auto">{service.description}</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">What Your Palm Reveals</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">💖</span>
                                        <div>
                                            <h4 className="text-yellow-400 font-semibold">Love & Relationships</h4>
                                            <p className="text-blue-200 text-sm">Romantic patterns and emotional depth</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">🎯</span>
                                        <div>
                                            <h4 className="text-yellow-400 font-semibold">Career & Success</h4>
                                            <p className="text-blue-200 text-sm">Professional strengths and achievements</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">⚡</span>
                                        <div>
                                            <h4 className="text-yellow-400 font-semibold">Life Energy</h4>
                                            <p className="text-blue-200 text-sm">Vitality levels and health indicators</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-white mb-4">Our Methods</h3>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">🌌</div>
                                        <h4 className="text-yellow-400 font-semibold">Traditional Palmistry</h4>
                                        <p className="text-blue-200 text-sm">Classical line and mount analysis</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">⚛️</div>
                                        <h4 className="text-yellow-400 font-semibold">Quantum Analysis</h4>
                                        <p className="text-blue-200 text-sm">Advanced energy mapping techniques</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">${service.price}</div>
                            <div className="text-blue-300 mb-6">{service.duration} minutes</div>
                            <button
                                onClick={() => onBookingOpen(service.id)}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all text-lg"
                            >
                                Book Your Palm Reading
                            </button>
                        </div>
                    </div>
                );

            case 'astrology':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🪐</div>
                            <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
                            <p className="text-blue-200 text-lg max-w-2xl mx-auto">{service.description}</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">🌟</div>
                                <h4 className="text-yellow-400 font-semibold mb-2">Personal Birth Chart</h4>
                                <p className="text-blue-200 text-sm">Complete planetary positions at your birth moment</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">🪐</div>
                                <h4 className="text-yellow-400 font-semibold mb-2">Cosmic Influences</h4>
                                <p className="text-blue-200 text-sm">How current planetary transits affect your life</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center">
                                <div className="text-4xl mb-4">🔮</div>
                                <h4 className="text-yellow-400 font-semibold mb-2">Future Insights</h4>
                                <p className="text-blue-200 text-sm">Upcoming opportunities and challenges revealed</p>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4 text-center">Sample Zodiac Elements</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">♈</div>
                                    <p className="text-yellow-400 text-sm">Aries</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">♌</div>
                                    <p className="text-yellow-400 text-sm">Leo</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">♏</div>
                                    <p className="text-yellow-400 text-sm">Scorpio</p>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">♓</div>
                                    <p className="text-yellow-400 text-sm">Pisces</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">${service.price}</div>
                            <div className="text-blue-300 mb-6">{service.duration} minutes</div>
                            <button
                                onClick={() => onBookingOpen(service.id)}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all text-lg"
                            >
                                Book Your Astrology Reading
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // If we're showing a service detail, render that instead
    if (currentView === 'detail' && selectedService) {
        return (
            <section id="services" className="page-section bg-cosmic-deep/80 backdrop-blur-glass">
                <div className="page-container">
                    {/* Back Button */}
                    <div className="mb-8">
                        <button
                            onClick={handleBackToOverview}
                            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all flex items-center gap-2 text-lg"
                        >
                            ← Back to All Services
                        </button>
                    </div>
                    {/* Service Detail Content */}
                    <div className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/20">
                        {renderServiceDetail()}
                    </div>
                </div>
            </section>
        );
    }

    // Default services overview
    return (
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
    );
};

export default ServicesSection;