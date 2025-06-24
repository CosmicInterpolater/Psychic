import React, { useState, useEffect } from 'react';
import { BookingModal } from '../BookingModal';
//import { hero_section } from '../HeroSection/hero_section';
//import { services_section } from '../ServicesSection/services_section/';
//import { psychics_section } from '../PsychicsSection/psychics_section';
//import { palm_reading } from '../ServicesSection/palm_reading/'; 
//import { tarot_reading } from '../ServicesSection/tarot_reading'; 
//import { astrology_reading_page } from '../ServicesSection/astrology_reading_page';
import { PalmReader } from '../PalmReader/PalmReader'; 
import { TarotReader } from '../TarotReader/TarotReader';
import { AstrologyReader } from '../Astrology/AstrologyReader'

const Home = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [selectedPsychic, setSelectedPsychic] = useState('');

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
        setselectedservice(service);
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedService('');
        setSelectedPsychic('');
    };
    const routes = [
        // ... your existing routes
        {
            path: '../PalmReader',
            element: <PalmReader />
        },
        {
            path: '../TarotReader', 
            element: <TarotReader />
        },
        {
            path: '../Astrology',
            element: <AstrologyReader />
        }
    ];
    const handleSelectGuide = (psychicName) => {
        setSelectedPsychic(psychicName);
        openBookingModal();
    };

    return (
        <div className="page-container page-full-width page-component--home">
            <section className="page-section" style={{paddingBottom: 0}}>
                
                {/* Hero Section */}
                <hero_section onBookingOpen={openBookingModal} />

                {/* Services Section */}
                <services_section onBookingOpen={openBookingModal} />

                {/* Psychics Section */}
                <psychics_section onSelectGuide={handleSelectGuide} />

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