import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import TarotReader from './components/TarotReader/TarotReader';
import PalmReader from './components/PalmReader/PalmReader';
import StarshipPsychics from './components/Home/Home';
import './styles/tailwind.scss';
import './styles/app.scss';

const App = () => {
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

    return (
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

                    {/* Main Content */}
                    <main className="app-main">
                        <Routes>
                            <Route path="/" element={<StarshipPsychics />} />
                            <Route path="/tarot" element={<TarotReader />} />
                            <Route path="/palm-reader" element={<PalmReader />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </Router>
    );
};

// Simple 404 component
const NotFound = () => {
    return (
        <div className="not-found">
            <div className="container">
                <h1>🌌 Lost in Space</h1>
                <p>The cosmic page you're looking for doesn't exist in this dimension.</p>
                <Link to="/" className="nav-btn">
                    🚀 Return to Home
                </Link>
            </div>
        </div>
    );
};

export default App;
