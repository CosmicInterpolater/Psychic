import React, { useState } from 'react';

export const BookingModal = ({ 
    isOpen, 
    onClose, 
    selectedService, 
    selectedPrice, 
    selectedPsychic, 
    services, 
    psychics 
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        psychic: selectedPsychic || '',
        service: selectedService || '',
        price: selectedPrice ? `$${selectedPrice}` : '',
        notes: '',
        disclaimer: false,
        terms: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.disclaimer || !formData.terms) {
            alert('Please agree to all terms and conditions.');
            return;
        }
        
        // Simulate booking process
        alert('Thank you for your booking! We will contact you shortly to confirm your cosmic journey.');
        onClose();
        
        // Reset form
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
            terms: false
        });
    };

    if (!isOpen) return null;

    return (
        <div className="cosmic-modal">
            <div className="cosmic-modal-content">
                <div className="cosmic-modal-header">
                    <h2>Book Your Cosmic Session</h2>
                    <button
                        onClick={onClose}
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

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                <option value="Stellar Tarot Reading">🌟 Stellar Tarot Reading - $25</option>
                                <option value="Galactic Astrology Chart">🪐 Galactic Astrology Chart - $40</option>
                                <option value="Quantum Palm Reading">🖐️ Quantum Palm Reading - $30</option>
                                <option value="Crystal Matrix Consultation">💎 Crystal Matrix Consultation - $35</option>
                            </select>
                        </div>

                        <div className="cosmic-form-group">
                            <label className="cosmic-form-label">Select Your Cosmic Guide</label>
                            <select
                                name="psychic"
                                value={formData.psychic}
                                onChange={handleInputChange}
                                className="cosmic-form-select"
                            >
                                <option value="">Choose your guide</option>
                                {psychics && psychics.map(psychic => (
                                    <option key={psychic.id} value={psychic.name}>
                                        {psychic.avatar} {psychic.name} - {psychic.specialty}
                                    </option>
                                ))}
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
                                onClick={onClose}
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
    );
};