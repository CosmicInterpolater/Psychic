import React, { useState, useEffect } from 'react';
import { BookingModal } from '../BookingModal';
// Import the services section
import ServicesSection from '../ServicesSection/services_section';
// Import the individual service components
import PalmReading from '../ServicesSection/palm_reading'; 
import TarotReading from '../ServicesSection/tarot_reading';
import AstrologyReading from '../ServicesSection/astrology_reading_page';
// Import the interactive components
import PalmReader from '../PalmReader/PalmReader'; 
import TarotReader from '../TarotReader/TarotReader';

const Home = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [selectedPsychic, setSelectedPsychic] = useState('');
    const [currentView, setCurrentView] = useState('home'); // Track which view to show

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

    const openBookingModal = (service = '') => {
        setSelectedService(service); // Fixed typo: was setselectedservice
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedService('');
        setSelectedPsychic('');
    };

    const handleSelectGuide = (psychicName) => {
        setSelectedPsychic(psychicName);
        openBookingModal();
    };

    // Navigation functions for different views
    const navigateToService = (serviceName) => {
        setCurrentView(serviceName);
    };

    const navigateHome = () => {
        setCurrentView('home');
    };

    // Render different views based on currentView state
    const renderCurrentView = () => {
        switch (currentView) {
            case 'tarot':
                return <TarotReading />;
            case 'palmistry':
                return <PalmReading />;
            case 'astrology':
                return <AstrologyReading />;
            case 'tarot-reader':
                return <TarotReader />;
            case 'palm-reader':
                return <PalmReader />;
            default:
                return renderHomeView();
        }
    };

    const renderHomeView = () => (
        <div className="page-container page-full-width page-component--home">
            <section className="page-section" style={{paddingBottom: 0}}>
                
                {/* Hero Section - You'll need to create this component */}
                <div className="text-center py-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Welcome to Your Cosmic Journey
                    </h1>
                    <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
                        Discover the mysteries of the universe through ancient wisdom and modern insights
                    </p>
                    <button
                        onClick={() => openBookingModal()}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                    >
                        Start Your Reading
                    </button>
                </div>

                {/* Services Section */}
                <ServicesSection 
                    onBookingOpen={openBookingModal}
                    onServiceSelect={navigateToService}
                />

                {/* Interactive Tools Section */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-12">
                            Try Our Interactive Tools
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                                <h3 className="text-2xl font-semibold text-white mb-4">AI Tarot Reader</h3>
                                <p className="text-blue-200 mb-6">
                                    Draw cards and get instant AI-powered interpretations
                                </p>
                                <button
                                    onClick={() => navigateToService('tarot-reader')}
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                                >
                                    Try Tarot Reader
                                </button>
                            </div>
                            <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20">
                                <h3 className="text-2xl font-semibold text-white mb-4">AI Palm Reader</h3>
                                <p className="text-blue-200 mb-6">
                                    Upload your palm photo for instant analysis
                                </p>
                                <button
                                    onClick={() => navigateToService('palm-reader')}
                                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                                >
                                    Try Palm Reader
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Psychics Section - You'll need to create this component */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-12">
                            Meet Our Psychic Guides
                        </h2>
                        <p className="text-blue-200 mb-8">
                            Connect with experienced readers for personalized guidance
                        </p>
                        <button
                            onClick={() => openBookingModal()}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all"
                        >
                            Book a Reading
                        </button>
                    </div>
                </section>

                {/* Main CTA Section */}
                <section className="text-center py-12">
                    <button
                        onClick={() => openBookingModal()}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                    >
                        Start Your Cosmic Journey
                    </button>
                </section>

            </section>
        </div>
    );

    return (
        <div>
            {/* Navigation Bar */}
            {currentView !== 'home' && (
                <nav className="fixed top-4 left-4 z-50">
                    <button
                        onClick={navigateHome}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur transition-all"
                    >
                        ← Home
                    </button>
                </nav>
            )}

            {/* Render Current View */}
            {renderCurrentView()}

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={closeBookingModal}
                selectedService={selectedService}
            />
        </div>
    );
};

export default Home;