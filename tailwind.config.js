/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                // Cosmic Background Colors
                cosmic: {
                    'deep': '#0f0c29',      // Deepest space
                    'void': '#302b63',      // Space purple
                    'nebula': '#24243e',    // Dark nebula
                    'twilight': '#1a1a2e',  // Darker space
                    'midnight': '#16213e',  // Deep blue-purple
                },

                // Starship Brand Colors
                starship: {
                    'primary': '#667eea',   // Primary purple-blue
                    'secondary': '#764ba2', // Secondary purple
                    'accent': '#f093fb',    // Pink accent
                    'gold': '#fbbf24',      // Cosmic gold
                    'coral': '#ff6b6b',     // Coral/salmon
                    'orange': '#ee5a24',    // Warm orange
                },

                // Psychic Guide Colors (from your cards)
                guides: {
                    'luna': '#667eea',      // Luna Stardust - purple-blue
                    'orion': '#f093fb',     // Orion Nebula - pink
                    'sage': '#4facfe',      // Sage Cosmos - blue
                    'phoenix': '#ff6b6b',   // Phoenix Starweaver - orange-red
                },

                // Service Card Colors
                services: {
                    'tarot': '#667eea',     // Stellar Tarot
                    'astrology': '#764ba2', // Galactic Astrology
                    'palm': '#f093fb',      // Quantum Palm
                    'crystal': '#4facfe',   // Crystal Matrix
                },

                // Glassmorphism & Transparency
                glass: {
                    'light': 'rgba(255, 255, 255, 0.1)',
                    'medium': 'rgba(255, 255, 255, 0.2)',
                    'dark': 'rgba(0, 0, 0, 0.3)',
                    'cosmic': 'rgba(102, 126, 234, 0.1)',
                },

                // Status & Interaction Colors
                status: {
                    'success': '#10b981',   // Emerald
                    'warning': '#f59e0b',   // Amber
                    'error': '#ef4444',     // Red
                    'info': '#3b82f6',      // Blue
                },

                // Text Colors
                text: {
                    'cosmic': '#e5e7eb',    // Light cosmic text
                    'stardust': '#d1d5db',  // Medium cosmic text
                    'nebula': '#9ca3af',    // Muted cosmic text
                    'void': '#6b7280',      // Dark cosmic text
                }
            },

            // Gradient Definitions
            backgroundImage: {
                // Main Cosmic Gradients
                'cosmic-primary': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                'cosmic-secondary': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                'cosmic-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0c29 100%)',

                // Service Card Gradients
                'service-tarot': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                'service-astrology': 'linear-gradient(135deg, #764ba2 0%, #f093fb 50%, #667eea 100%)',
                'service-palm': 'linear-gradient(135deg, #f093fb 0%, #667eea 50%, #764ba2 100%)',
                'service-crystal': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #667eea 100%)',

                // Psychic Guide Gradients
                'guide-luna': 'linear-gradient(45deg, #667eea, #764ba2)',
                'guide-orion': 'linear-gradient(45deg, #f093fb, #f5576c)',
                'guide-sage': 'linear-gradient(45deg, #4facfe, #00f2fe)',
                'guide-phoenix': 'linear-gradient(45deg, #ff6b6b, #feca57)',

                // Button Gradients
                'btn-primary': 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                'btn-secondary': 'linear-gradient(45deg, #667eea, #764ba2)',
                'btn-accent': 'linear-gradient(45deg, #f093fb, #764ba2)',

                // Special Effects
                'aurora': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                'nebula-burst': 'radial-gradient(circle, #4facfe, #1e293b)',
                'cosmic-glow': 'radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent)',

                // Emergency/Alert Gradients
                'alert-danger': 'linear-gradient(135deg, #ff4757, #c44569)',
                'alert-warning': 'linear-gradient(135deg, #ffeaa7, #fab1a0)',
                'alert-success': 'linear-gradient(135deg, #55efc4, #81ecec)',
            },

            // Box Shadows
            boxShadow: {
                'cosmic': '0 8px 32px rgba(0, 0, 0, 0.3)',
                'cosmic-lg': '0 15px 40px rgba(102, 126, 234, 0.4)',
                'cosmic-xl': '0 25px 50px rgba(102, 126, 234, 0.5)',
                'glow': '0 0 20px rgba(255, 255, 255, 0.5)',
                'glow-purple': '0 0 30px rgba(102, 126, 234, 0.6)',
                'glow-pink': '0 0 30px rgba(240, 147, 251, 0.6)',
                'glow-blue': '0 0 30px rgba(79, 172, 254, 0.6)',
                'card-hover': '0 15px 40px rgba(102, 126, 234, 0.4)',
                'modal': '0 25px 50px rgba(0, 0, 0, 0.8)',
            },

            // Border Radius
            borderRadius: {
                'cosmic': '20px',
                'card': '15px',
                'pill': '50px',
                'orb': '50%',
            },

            // Backdrop Blur
            backdropBlur: {
                'cosmic': '16px',
                'glass': '10px',
                'modal': '5px',
            },

            // Font Families
            fontFamily: {
                'cosmic': ['Inter', 'system-ui', 'sans-serif'],
                'heading': ['Poppins', 'system-ui', 'sans-serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            },

            // Font Sizes
            fontSize: {
                'cosmic-xs': ['0.75rem', { lineHeight: '1rem' }],
                'cosmic-sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'cosmic-base': ['1rem', { lineHeight: '1.5rem' }],
                'cosmic-lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'cosmic-xl': ['1.25rem', { lineHeight: '1.75rem' }],
                'cosmic-2xl': ['1.5rem', { lineHeight: '2rem' }],
                'cosmic-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                'cosmic-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                'cosmic-5xl': ['3rem', { lineHeight: '1' }],
                'cosmic-6xl': ['3.75rem', { lineHeight: '1' }],
            },

            // Spacing
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },

            // Animation Keyframes
            keyframes: {
                'twinkle': {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'fadeInUp': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'modalSlideIn': {
                    '0%': { opacity: '0', transform: 'translateY(-50px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'emergencyPulse': {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                'cosmic-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(102, 126, 234, 0.8)' },
                },
                'orbit': {
                    '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
                },
            },

            // Animations
            animation: {
                'twinkle': 'twinkle 2s infinite',
                'float': 'float 6s ease-in-out infinite',
                'fadeInUp': 'fadeInUp 1s ease',
                'modalSlideIn': 'modalSlideIn 0.3s ease',
                'emergencyPulse': 'emergencyPulse 0.5s ease',
                'cosmic-glow': 'cosmic-glow 3s ease-in-out infinite',
                'orbit': 'orbit 20s linear infinite',
            },

            // Transition Durations
            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
                '400': '400ms',
                '600': '600ms',
            },

            // Z-Index
            zIndex: {
                'modal': '2000',
                'emergency': '3000',
                'nav': '1000',
                'floating': '999',
            },
        },
    },
    plugins: [
        // Custom plugin for cosmic utilities
        function({ addUtilities, theme }) {
            const newUtilities = {
                '.cosmic-card': {
                    background: theme('backgroundImage.cosmic-secondary'),
                    borderRadius: theme('borderRadius.cosmic'),
                    boxShadow: theme('boxShadow.cosmic'),
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                },
                '.cosmic-card:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme('boxShadow.cosmic-lg'),
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '.glass-morphism': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
                '.cosmic-text-shadow': {
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                },
                '.cosmic-glow-text': {
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                },
                '.cosmic-button': {
                    background: theme('backgroundImage.btn-primary'),
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: theme('borderRadius.pill'),
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                },
                '.cosmic-button:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                },
            }
            addUtilities(newUtilities)
        },
    ],
}
