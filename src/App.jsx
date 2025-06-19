import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import TarotReader from './components/TarotReader/TarotReader';
import PalmReader from './components/PalmReader/PalmReader';
import StarshipPsychics from './components/Home/Home';
import './styles/App.scss';

// Navigation component that shows on all pages except StarshipPsychics
const Navigation = () => {
    const location = useLocation();

    // Hide navigation on the home page (StarshipPsychics)
    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav className="app-nav">
            <div className="nav-container">
                <Link to="/" className="app-title">✨ Mystic Readings ✨</Link>
                <div className="nav-buttons">
                    <Link
                        to="/"
                        className="nav-btn"
                    >
                        🚀 Home
                    </Link>
                    <Link
                        to="/tarot"
                        className={`nav-btn ${location.pathname === '/tarot' ? 'active' : ''}`}
                    >
                        🔮 Tarot Cards
                    </Link>
                    <Link
                        to="/palm-reader"
                        className={`nav-btn ${location.pathname === '/palm-reader' ? 'active' : ''}`}
                    >
                        🖐️ Palm Reading
                    </Link>
                </div>
            </div>
        </nav>
    );
};

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navigation />

                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<StarshipPsychics />} />
                        <Route path="/tarot" element={<TarotReader />} />
                        <Route path="/palm-reader" element={<PalmReader />} />
                        {/* 404 fallback route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
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
