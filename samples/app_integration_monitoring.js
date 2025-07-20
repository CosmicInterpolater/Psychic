import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navigation from '../src/components/Navigation';
import Footer from '../src/components/Footer';
import TarotReader from '../src/components/TarotReader/TarotReader';
import PalmReader from '../src/components/PalmReader/PalmReader';
import StarshipPsychics from '../src/components/Home/Home';
import { ContentMonitoringService } from './services/contentMonitoring';
import CrisisModal from './components/Modals/CrisisModal';
import './styles/tailwind.scss';
import './styles/app.scss';

// Create Context for Content Monitoring
const ContentMonitoringContext = createContext();

// Hook to use content monitoring in any component
export const useContentMonitoring = () => {
    const context = useContext(ContentMonitoringContext);
    if (!context) {
        throw new Error('useContentMonitoring must be used within ContentMonitoringProvider');
    }
    return context;
};

const App = () => {
    // Content monitoring state
    const [monitoringService] = useState(() => new ContentMonitoringService());
    const [sessionBlocked, setSessionBlocked] = useState(false);
    const [showCrisisModal, setShowCrisisModal] = useState(false);
    const [crisisData, setCrisisData] = useState(null);
    const [userWarnings, setUserWarnings] = useState({});

    // Generate or get user ID (you might have this from auth)
    const [userId] = useState(() => {
        // This would typically come from your auth system
        return localStorage.getItem('userId') || 'user_' + Date.now();
    });

    // Content monitoring functions
    const checkContent = async (content, componentName = 'unknown') => {
        if (sessionBlocked) {
            return { safe: false, action: 'blocked', message: 'Session terminated' };
        }

        try {
            const result = await monitoringService.analyzeContent({
                ...content,
                userId,
                component: componentName,
                timestamp: new Date().toISOString()
            });

            // Handle different violation types
            await handleMonitoringResult(result);

            return result;
        } catch (error) {
            console.error('Content monitoring error:', error);
            // Fail safely - when in doubt, allow but log
            return { safe: true, action: 'allow', error: true };
        }
    };

    const handleMonitoringResult = async (result) => {
        if (result.safe) return;

        for (const violation of result.violations) {
            switch (violation.type) {
                case 'self_harm':
                    setCrisisData({
                        type: 'self_harm',
                        resources: {
                            suicide_prevention: '988',
                            crisis_text: 'Text HOME to 741741',
                            emergency: '911'
                        },
                        message: 'We noticed you might be going through a difficult time. Please know that help is available.'
                    });
                    setShowCrisisModal(true);
                    setSessionBlocked(true);
                    break;

                case 'inappropriate_content':
                    const warningCount = userWarnings[userId] || 0;
                    if (warningCount === 0) {
                        // First warning
                        setUserWarnings(prev => ({ ...prev, [userId]: 1 }));
                        alert('Please keep content appropriate. This is your first and only warning.');
                    } else {
                        // Second offense - terminate session
                        setSessionBlocked(true);
                        alert('Session terminated due to repeated inappropriate content. All sales are final.');
                    }
                    break;

                case 'violence_threat':
                    setSessionBlocked(true);
                    alert('Session terminated due to threatening content. All sales are final.');
                    // Log for potential authorities notification
                    console.error('Violence threat detected:', { userId, violation });
                    break;

                case 'extremist_content':
                    setSessionBlocked(true);
                    alert('Session terminated. All sales are final.');
                    // This would trigger additional security measures
                    console.error('Extremist content detected:', { userId, violation });
                    break;
            }
        }
    };

    const closeCrisisModal = () => {
        setShowCrisisModal(false);
        // Keep session blocked - user needs to acknowledge and restart
    };

    const resetSession = () => {
        setSessionBlocked(false);
        setUserWarnings(prev => ({ ...prev, [userId]: 0 }));
        setCrisisData(null);
    };

    // Create starfield effect on app load
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
                star.style.animationDelay = Math.random() * 2 + 's';
                starfield.appendChild(star);
            }
        };

        createStarfield();
    }, []);

    // Content monitoring context value
    const monitoringContextValue = {
        checkContent,
        sessionBlocked,
        userId,
        resetSession,
        userWarnings: userWarnings[userId] || 0
    };

    return (
        <ContentMonitoringContext.Provider value={monitoringContextValue}>
            <Router>
                <div className="app">
                    {/* Cosmic Background with Effects */}
                    <div className="cosmic-background">
                        {/* Animated Starfield */}
                        <div className="starfield" id="starfield"></div>

                        {/* Floating Orbs */}
                        <div className="floating-orb orb-1"></div>
                        <div className="floating-orb orb-2"></div>
                        <div className="floating-orb orb-3"></div>

                        {/* Navigation */}
                        <Navigation />

                        {/* Main Content - Only render if session not blocked */}
                        <main className="app-main">
                            {sessionBlocked ? (
                                <SessionBlockedMessage 
                                    onReset={resetSession}
                                    crisisData={crisisData}
                                />
                            ) : (
                                <Routes>
                                    <Route path="/" element={<StarshipPsychics />} />
                                    <Route path="/tarot" element={<TarotReader />} />
                                    <Route path="/palm-reader" element={<PalmReader />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            )}
                        </main>

                        {/* Footer */}
                        <Footer />
                    </div>

                    {/* Crisis Modal */}
                    {showCrisisModal && (
                        <CrisisModal 
                            isOpen={showCrisisModal}
                            onClose={closeCrisisModal}
                            crisisData={crisisData}
                        />
                    )}
                </div>
            </Router>
        </ContentMonitoringContext.Provider>
    );
};

// Session Blocked Component
const SessionBlockedMessage = ({ onReset, crisisData }) => {
    return (
        <div className="page-container">
            <section className="page-section">
                <div className="text-center">
                    <h1 className="page-title">🚫 Session Unavailable</h1>
                    {crisisData ? (
                        <div className="crisis-message bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
                            <h2 className="text-xl font-semibold text-white mb-4">We're Here to Help</h2>
                            <p className="text-red-200 mb-4">{crisisData.message}</p>
                            <div className="space-y-2 text-left">
                                <p className="text-white">
                                    <strong>National Suicide Prevention Lifeline:</strong><br/>
                                    <a href="tel:988" className="text-blue-300 hover:text-blue-200">988</a>
                                </p>
                                <p className="text-white">
                                    <strong>Crisis Text Line:</strong><br/>
                                    <span className="text-blue-300">Text HOME to 741741</span>
                                </p>
                                <p className="text-white">
                                    <strong>Emergency:</strong><br/>
                                    <a href="tel:911" className="text-red-300 hover:text-red-200">911</a>
                                </p>
                            </div>
                            <p className="text-sm text-gray-300 mt-4">
                                You are not alone. Professional help is available 24/7.
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto">
                            <p className="text-blue-200 mb-6">
                                Your session has been terminated due to policy violations.
                            </p>
                            <p className="text-sm text-gray-300 mb-6">
                                All sales are final as stated in our terms of service.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

// Simple 404 component
const NotFound = () => {
    return (
        <div className="page-container">
            <section className="page-section">
                <h1 className="page-title">🌌 Lost in Space</h1>
                <div className={'container text-center'}>
                    <p>The cosmic page you're looking for doesn't exist in this dimension.</p>
                    <Link to="/" className="cosmic-button">
                        🚀 Return to Home
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default App;