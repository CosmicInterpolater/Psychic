import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// AI-Generated Psychic Profiles
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

const Home = () => {
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedPsychic, setSelectedPsychic] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        psychic: '',
        service: '',
        price: '',
        notes: '',
        disclaimer: false,
        safetyAgreement: false,
        ageConfirmation: false,
        recordingConsent: false
    });

    // Create starfield effect
    useEffect(() => {
        const createStarfield = () => {
            const starfield = document.getElementById('starfield');
            if (!starfield) return;

            const numStars = 100;
            starfield.innerHTML = '';

            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.width = Math.random() * 3 + 1 + 'px';
                star.style.height = star.style.width;
                star.style.animationDuration = Math.random() * 3 + 2 + 's';
                starfield.appendChild(star);
            }
        };

        createStarfield();
    }, []);

    const openBookingModal = (serviceName, price) => {
        setSelectedService(serviceName);
        setSelectedPrice(price);
        setFormData(prev => ({
            ...prev,
            service: serviceName,
            price: `$${price}`
        }));
        setShowBookingModal(true);
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            psychic: '',
            service: '',
            price: '',
            notes: '',
            disclaimer: false,
            safetyAgreement: false,
            ageConfirmation: false,
            recordingConsent: false
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'psychic') {
            setSelectedPsychic(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all checkboxes are checked
        const requiredCheckboxes = ['disclaimer', 'safetyAgreement', 'ageConfirmation', 'recordingConsent'];
        const allChecked = requiredCheckboxes.every(checkbox => formData[checkbox]);

        if (!allChecked) {
            alert('Please agree to all terms and conditions before proceeding.');
            return;
        }

        // Simulate booking process
        alert('Thank you for your booking! We will contact you shortly to confirm your cosmic journey.');
        closeBookingModal();
    };

    const selectedPsychicData = psychics.find(p => p.name === selectedPsychic);

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        if (!formData.disclaimer || !formData.terms) {
            alert('Please agree to all terms and conditions.');
            return;
        }
        setShowBookingModal(false);
    };

    return (
        <div className="page-container page-full-width page-component--home">
            <section className="page-section" style={{paddingBottom: 0}}>
                {/* Hero Section */}
                <section id="home" className="py-32">
                    <div className="page-container">
                        <div className="text-center">
                            <h1 className="animate-fadeInUp">
                                Navigate Your Cosmic Destiny
                            </h1>
                            <p className="text-text-cosmic text-lg mb-8 max-w-3xl mx-auto animate-fadeInUp animate-delay-200">
                                Connect with stellar wisdom through our advanced AI-enhanced cosmic guidance system.
                                Navigate the mysteries of the universe with our experienced cosmic guides.
                            </p>
                            <div className="animate-fadeInUp animate-delay-400">
                                <button
                                    onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                                    className="cosmic-button-primary"
                                >
                                    Explore Services
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="page-section bg-cosmic-deep/80 backdrop-blur-glass;">
                    <div className="page-container">
                        <h2 className={'text-center'}>Cosmic Services</h2>
                        <div className="cosmic-grid-services">
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`cosmic-card-service animated animate-fadeInUp`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="service-icon">{service.icon}</div>
                                    <h3 className="service-title">
                                        {service.title}
                                    </h3>
                                    <p className="service-description">
                                        {service.description}
                                    </p>
                                    <div className="service-price">
                                        ${service.price} - {service.duration} minutes
                                    </div>
                                    <div className="flex gap-2 justify-center flex-wrap">
                                        <button
                                            onClick={() => openBookingModal(service.title, service.price)}
                                            className="cosmic-button-ghost"
                                        >
                                            Book Session
                                        </button>
                                        {service.route && (
                                            <Link to={service.route} className="cosmic-button-ghost">
                                                Try Interactive
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Psychics Section */}
                <section id="psychics" className="page-section bg-cosmic-void/80 backdrop-blur-glass">
                    <div className="page-container">
                        <h2 className={'text-center'}>Our Cosmic Guides</h2>
                        <div className="cosmic-grid-psychics">
                            {psychics.map((psychic, index) => (
                                <div
                                    key={psychic.id}
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
                                        onClick={() => {
                                            setSelectedPsychic(psychic.name);
                                            setFormData(prev => ({ ...prev, psychic: psychic.name }));
                                        }}
                                    >
                                        Select Guide
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </section>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="cosmic-modal">
                    <div className="cosmic-modal-content">
                        <div className="cosmic-modal-header">
                            <h2>Book Your Cosmic Session</h2>
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="close-button"
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        </div>
                        <div className="cosmic-modal-body">

                            {/* Safety Notice */}
                            <div className="cosmic-notice notice-warning">
                                <h4>🛡️ Client Safety & Monitoring Notice</h4>
                                <ul>
                                    <li>All sessions are monitored for client safety and well-being</li>
                                    <li>Professional boundaries must be maintained at all times</li>
                                    <li>Crisis support resources are available if needed</li>
                                </ul>
                            </div>

                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="cosmic-form-group">
                                        <label className="cosmic-form-label">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="cosmic-form-input"
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>

                                    <div className="cosmic-form-group">
                                        <label className="cosmic-form-label">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="cosmic-form-input"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="cosmic-form-group">
                                    <label className="cosmic-form-label">Cosmic Service *</label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        className="cosmic-form-select"
                                        required
                                    >
                                        <option value="">Choose your cosmic journey</option>
                                        <option value="tarot">🌟 Stellar Tarot Reading - $25</option>
                                        <option value="astrology">🪐 Galactic Astrology Chart - $40</option>
                                        <option value="palm">🖐️ Quantum Palm Reading - $30</option>
                                        <option value="crystal">💎 Crystal Matrix Consultation - $35</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="cosmic-form-group">
                                        <label className="cosmic-form-label">Preferred Date *</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="cosmic-form-input"
                                            required
                                        />
                                    </div>

                                    <div className="cosmic-form-group">
                                        <label className="cosmic-form-label">Preferred Time *</label>
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleInputChange}
                                            className="cosmic-form-select"
                                            required
                                        >
                                            <option value="">Select time</option>
                                            <option value="09:00">9:00 AM</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="14:00">2:00 PM</option>
                                            <option value="15:00">3:00 PM</option>
                                            <option value="16:00">4:00 PM</option>
                                            <option value="18:00">6:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="cosmic-form-group">
                                    <label className="cosmic-form-label">Cosmic Questions (Optional)</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="cosmic-form-textarea"
                                        placeholder="Any specific questions or areas of focus for your cosmic journey?"
                                        rows="3"
                                    />
                                </div>

                                {/* Disclaimers */}
                                <div className="cosmic-notice notice-info">
                                    <h4>⚖️ Important Information</h4>
                                    <p><strong>Entertainment & Guidance:</strong> Readings are for entertainment purposes only.</p>
                                    <p><strong>Age Requirement:</strong> Must be 18+ years old.</p>
                                    <p><strong>Crisis Resources:</strong> National Suicide Prevention Lifeline 988</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="cosmic-checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="disclaimer"
                                            name="disclaimer"
                                            checked={formData.disclaimer}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label htmlFor="disclaimer">
                                            I understand this is for entertainment purposes and acknowledge results may vary.
                                        </label>
                                    </div>

                                    <div className="cosmic-checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            name="terms"
                                            checked={formData.terms}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label htmlFor="terms">
                                            I agree to maintain professional boundaries and consent to session monitoring.
                                        </label>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowBookingModal(false)}
                                        className="cosmic-button-ghost flex-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="cosmic-button-primary flex-1"
                                    >
                                        🚀 Launch Your Journey
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
