import React, { useState } from 'react';
import TarotReader from './TarotReader/TarotReader';
import PalmReader from './PalmReader/PalmReader';
import AstrologyReader from './Astrology/astrology_reader';

export const BookingModal = ({ 
    isOpen, 
    onClose, 
    selectedService
}) => {
    const [currentStep, setCurrentStep] = useState('subscription'); // 'subscription' or 'reading'
    const [selectedPlan, setSelectedPlan] = useState('');
    const [activeReader, setActiveReader] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        plan: '',
        disclaimer: false,
        terms: false
    });

    const services = [
        {
            id: 'tarot',
            title: 'Stellar Tarot Reading',
            icon: '🌟',
            component: TarotReader
        },
        {
            id: 'astrology',
            title: 'Galactic Astrology Chart',
            icon: '🪐',
            component: AstrologyReader
        },
        {
            id: 'palmistry',
            title: 'Quantum Palm Reading',
            icon: '✋',
            component: PalmReader
        },
        {
            id: 'crystal',
            title: 'Crystal Matrix Consultation',
            icon: '💎',
            component: null // Will be added when component is ready
        }
    ];

    const currentService = services.find(s => s.id === selectedService);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setFormData(prev => ({
            ...prev,
            plan: plan
        }));
    };

    const handleSubscriptionSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.disclaimer || !formData.terms) {
            alert('Please agree to all terms and conditions.');
            return;
        }

        if (!selectedPlan) {
            alert('Please select a subscription plan.');
            return;
        }
        
        // Simulate subscription process
        alert(`Welcome to Cosmic Readings! Your ${selectedPlan} subscription is active. Launching your ${currentService?.title} now...`);
        
        // Launch the selected reading immediately
        if (currentService?.component) {
            setActiveReader(currentService.component);
            setCurrentStep('reading');
        } else if (currentService?.id === 'crystal') {
            alert('Crystal Matrix Consultation coming soon! Your subscription is active and you can access this reading when it becomes available.');
            handleClose();
        }
    };

    const handleClose = () => {
        setCurrentStep('subscription');
        setActiveReader(null);
        setSelectedPlan('');
        setFormData({
            name: '',
            email: '',
            plan: '',
            disclaimer: false,
            terms: false
        });
        onClose();
    };

    const handleBackToSubscription = () => {
        setCurrentStep('subscription');
        setActiveReader(null);
    };

    if (!isOpen) return null;

    // Render the active reading component
    if (currentStep === 'reading' && activeReader) {
        const ReaderComponent = activeReader;
        return (
            <div className="cosmic-modal cosmic-modal-fullscreen">
                <div className="cosmic-modal-content-fullscreen">
                    <div className="cosmic-modal-header">
                        <h2>{currentService?.icon} {currentService?.title}</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleBackToSubscription}
                                className="cosmic-button-ghost"
                                aria-label="Back to subscription"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={handleClose}
                                className="close-button"
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    <div className="cosmic-modal-body-fullscreen">
                        <ReaderComponent />
                    </div>
                </div>
            </div>
        );
    }

    // Render subscription form
    return (
        <div className="cosmic-modal">
            <div className="cosmic-modal-content">
                <div className="cosmic-modal-header">
                    <h2>🚀 Start Your Cosmic Journey</h2>
                    <button
                        onClick={handleClose}
                        className="close-button"
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>
                <div className="cosmic-modal-body">
                    {/* Selected Service Display */}
                    {currentService && (
                        <div className="cosmic-notice notice-info mb-6">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{currentService.icon}</span>
                                <div>
                                    <h4 className="font-semibold">Selected Service: {currentService.title}</h4>
                                    <p className="text-sm">This will launch immediately after subscription</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Subscription Plans */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Choose Your Subscription Plan</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div 
                                className={`cosmic-plan-card ${selectedPlan === 'monthly' ? 'selected' : ''}`}
                                onClick={() => handlePlanSelect('monthly')}
                            >
                                <div className="text-2xl mb-2">🌙</div>
                                <h4 className="text-lg font-semibold">Monthly</h4>
                                <div className="text-2xl font-bold text-yellow-400 mb-2">$4.99</div>
                                <p className="text-sm text-blue-200">per month</p>
                                <ul className="text-xs text-blue-300 mt-3 space-y-1">
                                    <li>• Unlimited readings</li>
                                    <li>• All cosmic services</li>
                                    <li>• Cancel anytime</li>
                                </ul>
                            </div>

                            <div 
                                className={`cosmic-plan-card ${selectedPlan === 'yearly' ? 'selected' : ''}`}
                                onClick={() => handlePlanSelect('yearly')}
                            >
                                <div className="text-2xl mb-2">⭐</div>
                                <div className="cosmic-badge">Best Value</div>
                                <h4 className="text-lg font-semibold">Yearly</h4>
                                <div className="text-2xl font-bold text-yellow-400 mb-2">$49.95</div>
                                <p className="text-sm text-blue-200">per year</p>
                                <p className="text-xs text-green-400">Save $9.93!</p>
                                <ul className="text-xs text-blue-300 mt-3 space-y-1">
                                    <li>• Unlimited readings</li>
                                    <li>• All cosmic services</li>
                                    <li>• Priority support</li>
                                    <li>• Cancel anytime</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Safety Notice */}
                    <div className="cosmic-notice notice-warning mb-6">
                        <h4>🛡️ Client Safety & Monitoring Notice</h4>
                        <ul>
                            <li>All sessions are monitored for client safety and well-being</li>
                            <li>Professional boundaries must be maintained at all times</li>
                            <li>Crisis support resources are available if needed</li>
                        </ul>
                    </div>

                    <form onSubmit={handleSubscriptionSubmit} className="space-y-4">
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

                        {/* Disclaimers */}
                        <div className="cosmic-notice notice-info">
                            <h4>⚖️ Important Information</h4>
                            <p><strong>Entertainment & Guidance:</strong> Readings are for entertainment purposes only.</p>
                            <p><strong>Age Requirement:</strong> Must be 18+ years old.</p>
                            <p><strong>Crisis Resources:</strong> National Suicide Prevention Lifeline 988</p>
                            <p><strong>Billing:</strong> Subscription will auto-renew unless cancelled.</p>
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
                                    I agree to the subscription terms, maintain professional boundaries, and consent to session monitoring.
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="cosmic-button-ghost flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="cosmic-button-primary flex-1"
                                disabled={!selectedPlan}
                            >
                                🚀 Subscribe & Launch Reading
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};