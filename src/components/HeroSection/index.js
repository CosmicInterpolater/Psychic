import React from 'react';

const HeroSection = ({ onBookingOpen }) => {
    return (
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
                            onClick={() => onBookingOpen()}
                            className="cosmic-button-primary"
                        >
                            Start Your Cosmic Journey
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
