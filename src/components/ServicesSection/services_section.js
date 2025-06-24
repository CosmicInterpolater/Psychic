import React from 'react';
import ServiceCard from './ServiceCard';

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
                                        onClick={() => onServiceSelect(service.id)}
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