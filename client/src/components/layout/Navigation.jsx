import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Navigation component that shows on all pages except StarshipPsychics
const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect for navigation
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const scrollToSection = (sectionId) => {
        // Only scroll if we're on the home page
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isHomePage = location.pathname === '/';

    return (
        <header className={`cosmic-nav fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">

                    {/* Logo/Brand */}
                    <Link to="/" className="cosmic-nav-brand flex items-center gap-2">
                        <span className="text-2xl">🚀</span>
                        <span className="hidden sm:inline text-xl">Starship Psychics</span>
                        <span className="sm:hidden text-lg">Starship</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {isHomePage ? (
                            <>
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="cosmic-nav-link"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="cosmic-nav-link"
                                >
                                    Services
                                </button>
                                <button
                                    onClick={() => scrollToSection('psychics')}
                                    className="cosmic-nav-link"
                                >
                                    Cosmic Guides
                                </button>
                            </>
                        ) : (
                            <Link to="/" className="cosmic-nav-link">
                                🏠 Home
                            </Link>
                        )}

                        <Link
                            to="/tarot"
                            className={`cosmic-nav-link ${location.pathname === '/tarot' ? 'active' : ''}`}
                        >
                            <span>🔮</span>
                            Tarot
                        </Link>
                        <Link
                            to="/palm-reader"
                            className={`cosmic-nav-link ${location.pathname === '/palm-reader' ? 'active' : ''}`}
                        >
                            <span>🖐️</span>
                            Palm Reading
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                            <div className={`w-full h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                            <div className={`w-full h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                            <div className={`w-full h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="glass-container p-4 space-y-3">
                        {isHomePage ? (
                            <>
                                <button
                                    onClick={() => scrollToSection('home')}
                                    className="cosmic-nav-link block w-full text-left py-2"
                                >
                                    🏠 Home
                                </button>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="cosmic-nav-link block w-full text-left py-2"
                                >
                                    ⚡ Services
                                </button>
                                <button
                                    onClick={() => scrollToSection('psychics')}
                                    className="cosmic-nav-link block w-full text-left py-2"
                                >
                                    👥 Cosmic Guides
                                </button>
                                <hr className="border-white/20 my-3" />
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="cosmic-nav-link block py-2"
                                >
                                    🏠 Home
                                </Link>
                                <hr className="border-white/20 my-3" />
                            </>
                        )}

                        <Link
                            to="/tarot"
                            className={`cosmic-nav-link block py-2 flex items-center gap-3 ${location.pathname === '/tarot' ? 'active' : ''}`}
                        >
                            <span className="text-xl">🔮</span>
                            <span>Interactive Tarot</span>
                        </Link>
                        <Link
                            to="/palm-reader"
                            className={`cosmic-nav-link block py-2 flex items-center gap-3 ${location.pathname === '/palm-reader' ? 'active' : ''}`}
                        >
                            <span className="text-xl">🖐️</span>
                            <span>Interactive Palm Reading</span>
                        </Link>

                        {/* Mobile CTA Button */}
                        {isHomePage && (
                            <div className="pt-3">
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="cosmic-button-secondary w-full text-sm py-2"
                                >
                                    ✨ Start Your Journey
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Navigation;
