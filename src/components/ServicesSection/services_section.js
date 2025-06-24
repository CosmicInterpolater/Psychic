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

const ServicesSection = ({ onBookingOpen }) => {
    return (
        <section id="services" className="page-section bg-cosmic-deep/80 backdrop-blur-glass">
            <div className="page-container">
                <h2 className="text-center">Cosmic Services</h2>
                <div className="cosmic-grid-services">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            index={index}
                            onBookSession={onBookingOpen}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;