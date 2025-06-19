import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

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
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
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

    const showEmergencyAlert = () => {
        setShowEmergencyModal(true);
    };

    const closeEmergencyModal = () => {
        setShowEmergencyModal(false);
    };

    const contactCrisisSupport = () => {
        window.open('tel:988', '_blank');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const selectedPsychicData = psychics.find(p => p.name === selectedPsychic);

    return (
        <div className="starship-psychics">
            {/* Floating orbs for visual effect */}
            <div className="floating-orb orb1"></div>
            <div className="floating-orb orb2"></div>
            <div className="floating-orb orb3"></div>

            {/* Animated starfield */}
            <div className="starfield" id="starfield"></div>

            <header>
                <nav className="container">
                    <div className="logo">🚀 Starship Psychics</div>
                    <ul className="nav-links">
                        <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
                        <li><a href="#services" onClick={() => scrollToSection('services')}>Services</a></li>
                        <li><a href="#psychics" onClick={() => scrollToSection('psychics')}>Cosmic Guides</a></li>
                        <li><Link to="/tarot">🔮 Tarot</Link></li>
                        <li><Link to="/palm-reader">🖐️ Palm Reading</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="home" className="hero">
                    <div className="container">
                        <h1>Navigate Your Cosmic Destiny</h1>
                        <p>Connect with stellar wisdom through our advanced AI-enhanced cosmic guidance system. Navigate the mysteries of the universe with our experienced cosmic guides.</p>
                        <a href="#services" className="cta-button" onClick={() => scrollToSection('services')}>
                            Explore Services
                        </a>
                    </div>
                </section>

                <section id="services" className="services">
                    <div className="container">
                        <h2>Cosmic Services</h2>
                        <div className="services-grid">
                            {services.map((service) => (
                                <div key={service.id} className="service-card" data-service={service.id}>
                                    <h3>{service.icon} {service.title}</h3>
                                    <p>{service.description}</p>
                                    <div className="price">${service.price} - {service.duration} minutes</div>
                                    <div className="service-buttons">
                                        <button
                                            className="book-btn"
                                            onClick={() => openBookingModal(service.title, service.price)}
                                        >
                                            Book Session
                                        </button>
                                        {service.route && (
                                            <Link to={service.route} className="try-btn">
                                                Try Interactive
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="psychics" className="psychics">
                    <div className="container">
                        <h2>Our Cosmic Guides</h2>
                        <div className="psychics-grid">
                            {psychics.map((psychic) => (
                                <div key={psychic.id} className="psychic-card" style={{ background: psychic.gradient }}>
                                    <div className="psychic-avatar">
                                        {psychic.avatar}
                                    </div>
                                    <h3>{psychic.name}</h3>
                                    <div className="psychic-specialty">{psychic.specialty}</div>
                                    <div className="psychic-rating">
                                        <div className="stars">
                                            {'★'.repeat(psychic.rating)}{'☆'.repeat(5 - psychic.rating)}
                                        </div>
                                    </div>
                                    <button
                                        className="select-psychic-btn"
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
            </main>

            {/* Booking Modal - (keep all existing modal code) */}
            {showBookingModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeBookingModal}>&times;</span>
                        <h2>Book Your Session</h2>

                        {/* Safety Notice */}
                        <div className="safety-notice">
                            <h4>🛡️ Client Safety & Monitoring Notice</h4>
                            <ul>
                                <li>All sessions are monitored for client safety and well-being</li>
                                <li>Inappropriate behavior will result in immediate session termination</li>
                                <li>Expressions of violence or harmful intent will be reported to authorities</li>
                                <li>Professional boundaries must be maintained at all times</li>
                                <li>Crisis support resources are available if needed</li>
                            </ul>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* ... keep all existing form fields ... */}
                            <div className="form-group">
                                <label htmlFor="name">Full Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Preferred Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="time">Preferred Time:</label>
                                <select
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a time</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                    <option value="17:00">5:00 PM</option>
                                    <option value="18:00">6:00 PM</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="psychic">Choose Your Cosmic Guide:</label>
                                <select
                                    id="psychic"
                                    name="psychic"
                                    value={formData.psychic}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a psychic</option>
                                    {psychics.map((psychic) => (
                                        <option key={psychic.id} value={psychic.name}>
                                            {psychic.name} - {psychic.specialty}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedPsychicData && (
                                <div className="selected-psychic-info">
                                    <h4>{selectedPsychicData.name}</h4>
                                    <p>{selectedPsychicData.bio}</p>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="service">Cosmic Service:</label>
                                <input
                                    type="text"
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Investment:</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="notes">Cosmic Questions (Optional):</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows="3"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Any specific questions or areas of focus for your cosmic journey?"
                                />
                            </div>

                            {/* Enhanced Disclaimers */}
                            <div className="disclaimer-section">
                                <h4>⚖️ Legal & Professional Disclaimers</h4>
                                <p><strong>Entertainment & Guidance:</strong> Psychic readings are for entertainment and guidance purposes only. Results are not guaranteed and should not replace professional medical, legal, or financial advice.</p>
                                <p><strong>Age Requirement:</strong> Clients must be 18 years or older. Sessions involving minors require parental consent and supervision.</p>
                                <p><strong>Recording & Monitoring:</strong> Sessions may be recorded for quality assurance and safety purposes. Monitoring systems are in place to detect inappropriate behavior.</p>
                                <p><strong>Mandatory Reporting:</strong> We are legally required to report threats of violence, child abuse, elder abuse, or other criminal activity to appropriate authorities.</p>
                                <p><strong>Crisis Resources:</strong> If you're experiencing a mental health crisis, please contact the National Suicide Prevention Lifeline at 988 or local emergency services at 911.</p>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="disclaimer"
                                    name="disclaimer"
                                    checked={formData.disclaimer}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="disclaimer">I understand that psychic reading is for entertainment purposes only and acknowledge that results may vary due to the interpretive nature of cosmic guidance.</label>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="safetyAgreement"
                                    name="safetyAgreement"
                                    checked={formData.safetyAgreement}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="safetyAgreement">I acknowledge the safety monitoring protocols and agree to maintain professional boundaries during my session. I understand that inappropriate behavior will result in session termination and potential reporting to authorities.</label>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="ageConfirmation"
                                    name="ageConfirmation"
                                    checked={formData.ageConfirmation}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="ageConfirmation">I confirm that I am 18 years of age or older and legally able to enter into this service agreement.</label>
                            </div>

                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="recordingConsent"
                                    name="recordingConsent"
                                    checked={formData.recordingConsent}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="recordingConsent">I consent to session recording and monitoring for safety and quality assurance purposes.</label>
                            </div>

                            <button type="submit" className="submit-btn">Launch Your Cosmic Journey</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Emergency Alert Modal */}
            {showEmergencyModal && (
                <div className="emergency-modal">
                    <div className="emergency-modal-content">
                        <div className="emergency-icon">🚨</div>
                        <h2>Session Safety Alert</h2>
                        <p>Inappropriate behavior has been detected. This session will be terminated immediately and appropriate authorities will be notified.</p>
                        <button className="emergency-btn" onClick={closeEmergencyModal}>Understood</button>
                        <button className="emergency-btn" onClick={contactCrisisSupport}>Crisis Support</button>
                    </div>
                </div>
            )}

            <footer>
                <div className="container">
                    <p>&copy; 2025 Starship Psychics. Professional psychic consultation services with comprehensive safety protocols.</p>
                    <p>Crisis Support: National Suicide Prevention Lifeline 988 | Emergency Services 911</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
