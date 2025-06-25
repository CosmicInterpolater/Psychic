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
            component: 'tarot'  // Changed to string identifier
        },
        {
            id: 'astrology',
            title: 'Galactic Astrology Chart',
            icon: '🪐',
            component: 'astrology'  // Changed to string identifier
        },
        {
            id: 'palmistry',
            title: 'Quantum Palm Reading',
            icon: '✋',
            component: 'palmistry'  // Changed to string identifier
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
            setActiveReader(currentService.component);  // Set string identifier
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

    // Helper function to render the correct component
    const renderReaderComponent = () => {
        switch(activeReader) {
            case 'tarot':
                return <TarotReader />;
            case 'palmistry':
                return <PalmReader />;
            case 'astrology':
                return <AstrologyReader />;
            default:
                return <div style={{ color: 'white', textAlign: 'center', padding: '40px' }}>
                    Component not available
                </div>;
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            {/* Render the active reading component */}
            {currentStep === 'reading' && activeReader ? (
                <div style={{
                    width: '95vw',
                    height: '95vh',
                    backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    borderRadius: '20px',
                    border: '2px solid #4a90e2',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '20px',
                        borderBottom: '1px solid #333',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)'
                    }}>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
                            {currentService?.icon} {currentService?.title}
                        </h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={handleBackToSubscription}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #4a90e2',
                                    color: '#4a90e2',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                ← Back
                            </button>
                            <button
                                onClick={handleClose}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
                        {renderReaderComponent()}
                    </div>
                </div>
            ) : (
                /* Render subscription form */
                <div style={{
                    maxWidth: '800px',
                    width: '100%',
                    maxHeight: '90vh',
                    backgroundColor: '#1a1a2e',
                    borderRadius: '20px',
                    border: '2px solid #4a90e2',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        padding: '20px',
                        borderBottom: '1px solid #333',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)'
                    }}>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>
                            🚀 Start Your Cosmic Journey
                        </h2>
                        <button
                            onClick={handleClose}
                            style={{
                                padding: '8px 12px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '24px',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                    
                    <div style={{ 
                        flex: 1, 
                        overflow: 'auto', 
                        padding: '20px',
                        color: 'white'
                    }}>
                        {/* Selected Service Display */}
                        {currentService && (
                            <div style={{
                                padding: '16px',
                                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                                border: '1px solid #4a90e2',
                                borderRadius: '12px',
                                marginBottom: '24px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '2rem' }}>{currentService.icon}</span>
                                    <div>
                                        <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>
                                            Selected Service: {currentService.title}
                                        </h4>
                                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#b0b0b0' }}>
                                            This will launch immediately after subscription
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Subscription Plans */}
                        <div style={{ marginBottom: '32px' }}>
                            <h3 style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: '600', 
                                color: 'white', 
                                marginBottom: '16px' 
                            }}>
                                Choose Your Subscription Plan
                            </h3>
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                                gap: '16px' 
                            }}>
                                {/* Monthly Plan */}
                                <div 
                                    style={{
                                        padding: '20px',
                                        backgroundColor: selectedPlan === 'monthly' ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                        border: selectedPlan === 'monthly' ? '2px solid #4a90e2' : '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        textAlign: 'center',
                                        color: 'white',
                                        opacity: 1
                                    }}
                                    onClick={() => handlePlanSelect('monthly')}
                                    onMouseEnter={(e) => {
                                        if (selectedPlan !== 'monthly') {
                                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                            e.target.style.borderColor = 'rgba(74, 144, 226, 0.5)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedPlan !== 'monthly') {
                                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        }
                                    }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🌙</div>
                                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 8px 0' }}>Monthly</h4>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700', marginBottom: '8px' }}>$4.99</div>
                                    <p style={{ fontSize: '0.875rem', color: '#b0b0b0', margin: '0 0 12px 0' }}>per month</p>
                                    <ul style={{ 
                                        fontSize: '0.75rem', 
                                        color: '#a0a0a0', 
                                        listStyle: 'none', 
                                        padding: 0, 
                                        margin: 0,
                                        textAlign: 'left'
                                    }}>
                                        <li style={{ marginBottom: '4px' }}>• Unlimited readings</li>
                                        <li style={{ marginBottom: '4px' }}>• All cosmic services</li>
                                        <li>• Cancel anytime</li>
                                    </ul>
                                </div>

                                {/* Yearly Plan */}
                                <div 
                                    style={{
                                        padding: '20px',
                                        backgroundColor: selectedPlan === 'yearly' ? 'rgba(74, 144, 226, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                        border: selectedPlan === 'yearly' ? '2px solid #4a90e2' : '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        textAlign: 'center',
                                        color: 'white',
                                        position: 'relative',
                                        opacity: 1
                                    }}
                                    onClick={() => handlePlanSelect('yearly')}
                                    onMouseEnter={(e) => {
                                        if (selectedPlan !== 'yearly') {
                                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                            e.target.style.borderColor = 'rgba(74, 144, 226, 0.5)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedPlan !== 'yearly') {
                                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        }
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '12px',
                                        backgroundColor: '#4a90e2',
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        Best Value
                                    </div>
                                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⭐</div>
                                    <h4 style={{ fontSize: '1.125rem', fontWeight: '600', margin: '0 0 8px 0' }}>Yearly</h4>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700', marginBottom: '8px' }}>$49.95</div>
                                    <p style={{ fontSize: '0.875rem', color: '#b0b0b0', margin: '0 0 4px 0' }}>per year</p>
                                    <p style={{ fontSize: '0.75rem', color: '#00ff88', margin: '0 0 12px 0' }}>Save $9.93!</p>
                                    <ul style={{ 
                                        fontSize: '0.75rem', 
                                        color: '#a0a0a0', 
                                        listStyle: 'none', 
                                        padding: 0, 
                                        margin: 0,
                                        textAlign: 'left'
                                    }}>
                                        <li style={{ marginBottom: '4px' }}>• Unlimited readings</li>
                                        <li style={{ marginBottom: '4px' }}>• All cosmic services</li>
                                        <li style={{ marginBottom: '4px' }}>• Priority support</li>
                                        <li>• Cancel anytime</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Safety Notice */}
                        <div style={{
                            padding: '16px',
                            backgroundColor: 'rgba(255, 193, 7, 0.1)',
                            border: '1px solid #ffc107',
                            borderRadius: '12px',
                            marginBottom: '24px'
                        }}>
                            <h4 style={{ margin: '0 0 8px 0', color: '#ffc107' }}>🛡️ Client Safety & Monitoring Notice</h4>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.875rem', color: '#e0e0e0' }}>
                                <li>All sessions are monitored for client safety and well-being</li>
                                <li>Professional boundaries must be maintained at all times</li>
                                <li>Crisis support resources are available if needed</li>
                            </ul>
                        </div>

                        <form onSubmit={handleSubscriptionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                                gap: '16px' 
                            }}>
                                <div>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        color: '#e0e0e0' 
                                    }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontSize: '14px'
                                        }}
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        color: '#e0e0e0' 
                                    }}>
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontSize: '14px'
                                        }}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Disclaimers */}
                            <div style={{
                                padding: '16px',
                                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                                border: '1px solid #4a90e2',
                                borderRadius: '12px'
                            }}>
                                <h4 style={{ margin: '0 0 12px 0', color: '#4a90e2' }}>⚖️ Important Information</h4>
                                <div style={{ fontSize: '0.875rem', color: '#e0e0e0', lineHeight: '1.5' }}>
                                    <p style={{ margin: '0 0 8px 0' }}><strong>Entertainment & Guidance:</strong> Readings are for entertainment purposes only.</p>
                                    <p style={{ margin: '0 0 8px 0' }}><strong>Age Requirement:</strong> Must be 18+ years old.</p>
                                    <p style={{ margin: '0 0 8px 0' }}><strong>Crisis Resources:</strong> National Suicide Prevention Lifeline 988</p>
                                    <p style={{ margin: 0 }}><strong>Billing:</strong> Subscription will auto-renew unless cancelled.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <input
                                        type="checkbox"
                                        id="disclaimer"
                                        name="disclaimer"
                                        checked={formData.disclaimer}
                                        onChange={handleInputChange}
                                        style={{ marginTop: '2px' }}
                                        required
                                    />
                                    <label htmlFor="disclaimer" style={{ fontSize: '0.875rem', color: '#e0e0e0', cursor: 'pointer' }}>
                                        I understand this is for entertainment purposes and acknowledge results may vary.
                                    </label>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        name="terms"
                                        checked={formData.terms}
                                        onChange={handleInputChange}
                                        style={{ marginTop: '2px' }}
                                        required
                                    />
                                    <label htmlFor="terms" style={{ fontSize: '0.875rem', color: '#e0e0e0', cursor: 'pointer' }}>
                                        I agree to the subscription terms, maintain professional boundaries, and consent to session monitoring.
                                    </label>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', paddingTop: '16px' }}>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    style={{
                                        flex: 1,
                                        padding: '12px 24px',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #666',
                                        color: '#ccc',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        flex: 1,
                                        padding: '12px 24px',
                                        backgroundColor: selectedPlan ? '#4a90e2' : '#666',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '8px',
                                        cursor: selectedPlan ? 'pointer' : 'not-allowed',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        opacity: selectedPlan ? 1 : 0.6
                                    }}
                                    disabled={!selectedPlan}
                                >
                                    🚀 Subscribe & Launch Reading
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};