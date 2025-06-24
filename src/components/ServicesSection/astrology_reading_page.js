import React, { useState } from 'react';
import { zodiacSigns } from '../../data/ZodiacSigns';
import { BookingModal } from '../BookingModal';

const AstrologyReading = () => {
    const [selectedZodiac, setSelectedZodiac] = useState(null);
    const [birthDate, setBirthDate] = useState('');
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    // Calculate zodiac sign based on birth date
    const calculateZodiacSign = (date) => {
        if (!date) return null;
        
        const birthDate = new Date(date);
        const month = birthDate.getMonth() + 1;
        const day = birthDate.getDate();
        
        // Find matching zodiac sign based on date ranges
        return zodiacSigns.find(sign => {
            const [startMonth, startDay] = sign.dateRange.start.split('/').map(Number);
            const [endMonth, endDay] = sign.dateRange.end.split('/').map(Number);
            
            // Handle year-end wrap (Capricorn)
            if (startMonth > endMonth) {
                return (month === startMonth && day >= startDay) || 
                       (month === endMonth && day <= endDay);
            }
            
            return (month === startMonth && day >= startDay) || 
                   (month === endMonth && day <= endDay) ||
                   (month > startMonth && month < endMonth);
        });
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setBirthDate(date);
        const zodiac = calculateZodiacSign(date);
        setSelectedZodiac(zodiac);
    };

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
                        🪐 Galactic Astrology Reading
                    </h1>
                    <p className="text-text-cosmic text-lg mb-8 max-w-3xl mx-auto animate-fadeInUp animate-delay-200">
                        Discover your cosmic blueprint through deep-space birth chart analysis. 
                        Uncover your celestial purpose and stellar influences.
                    </p>
                </div>

                {/* Birth Date Input */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="cosmic-card p-8 text-center">
                        <h3 className="text-2xl mb-6 text-cosmic-light">Enter Your Birth Date</h3>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={handleDateChange}
                            className="w-full max-w-md mx-auto p-3 rounded-lg bg-cosmic-void/30 border border-cosmic-accent/30 text-cosmic-light text-center text-lg focus:outline-none focus:border-cosmic-accent"
                        />
                    </div>
                </div>

                {/* Zodiac Sign Result */}
                {selectedZodiac && (
                    <div className="max-w-4xl mx-auto mb-12 animate-fadeInUp">
                        <div className="cosmic-card p-8">
                            <div className="text-center mb-8">
                                <div className="text-6xl mb-4">{selectedZodiac.symbol}</div>
                                <h2 className="text-4xl text-cosmic-light mb-2">{selectedZodiac.name}</h2>
                                <p className="text-cosmic-accent text-xl mb-4">{selectedZodiac.element} • {selectedZodiac.quality}</p>
                                <p className="text-cosmic-muted">
                                    {selectedZodiac.dateRange.start} - {selectedZodiac.dateRange.end}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl text-cosmic-accent mb-3">Personality Traits</h4>
                                    <p className="text-cosmic-light leading-relaxed mb-4">
                                        {selectedZodiac.description}
                                    </p>
                                    <div className="space-y-2">
                                        <div><strong className="text-cosmic-accent">Strengths:</strong> {selectedZodiac.strengths.join(', ')}</div>
                                        <div><strong className="text-cosmic-accent">Challenges:</strong> {selectedZodiac.weaknesses.join(', ')}</div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xl text-cosmic-accent mb-3">Cosmic Influences</h4>
                                    <div className="space-y-3">
                                        <div><strong className="text-cosmic-accent">Ruling Planet:</strong> {selectedZodiac.rulingPlanet}</div>
                                        <div><strong className="text-cosmic-accent">Lucky Colors:</strong> {selectedZodiac.colors.join(', ')}</div>
                                        <div><strong className="text-cosmic-accent">Compatible Signs:</strong> {selectedZodiac.compatibility.join(', ')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={openBookingModal}
                                    className="cosmic-button-primary"
                                >
                                    Get Full Astrology Reading - $40
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* All Zodiac Signs Grid */}
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl text-center text-cosmic-light mb-12">Explore All Zodiac Signs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {zodiacSigns.map((sign, index) => (
                            <div
                                key={sign.name}
                                className={`cosmic-card p-6 text-center cursor-pointer transition-all hover:scale-105 animate-fadeInUp ${
                                    selectedZodiac?.name === sign.name ? 'ring-2 ring-cosmic-accent' : ''
                                }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => setSelectedZodiac(sign)}
                            >
                                <div className="text-4xl mb-3">{sign.symbol}</div>
                                <h4 className="text-cosmic-light font-semibold mb-2">{sign.name}</h4>
                                <p className="text-cosmic-muted text-sm">
                                    {sign.dateRange.start} - {sign.dateRange.end}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Service Benefits */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="cosmic-card p-8">
                        <h3 className="text-3xl text-center text-cosmic-light mb-8">What You'll Receive</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">🌟</div>
                                <h4 className="text-cosmic-accent mb-2">Personal Birth Chart</h4>
                                <p className="text-cosmic-muted">Complete planetary positions at your birth moment</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🪐</div>
                                <h4 className="text-cosmic-accent mb-2">Cosmic Influences</h4>
                                <p className="text-cosmic-muted">How current planetary transits affect your life</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🔮</div>
                                <h4 className="text-cosmic-accent mb-2">Future Insights</h4>
                                <p className="text-cosmic-muted">Upcoming opportunities and challenges revealed</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={closeBookingModal}
                selectedService="astrology"
            />
        </div>
    );
};

export default AstrologyReading;