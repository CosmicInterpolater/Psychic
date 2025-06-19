module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",  // Make sure this matches your files
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                // Mystical gradient colors
                'mystic': {
                    'deep-purple': '#4c1d95',
                    'royal-purple': '#581c87',
                    'cosmic-blue': '#1e3a8a',
                    'starlight': '#312e81',
                    'gold': '#fbbf24',
                    'silver': '#e5e7eb',
                    'moonlight': '#f3f4f6',
                },

                // Card colors
                'tarot': {
                    'major': '#dc2626',      // Red for Major Arcana
                    'cups': '#3b82f6',       // Blue for Cups
                    'pentacles': '#16a34a',  // Green for Pentacles
                    'swords': '#6b7280',     // Gray for Swords
                    'wands': '#ea580c',      // Orange for Wands
                },

                // UI colors with opacity support
                'glass': {
                    'light': 'rgba(255, 255, 255, 0.1)',
                    'medium': 'rgba(255, 255, 255, 0.2)',
                    'dark': 'rgba(0, 0, 0, 0.3)',
                }
            },

            // Custom gradients
            backgroundImage: {
                'mystic-gradient': 'linear-gradient(135deg, #581c87 0%, #1e3a8a 50%, #312e81 100%)',
                'card-gradient': 'linear-gradient(to bottom, #fbbf24, #f59e0b)',
                'cosmic-gradient': 'radial-gradient(circle, #4c1d95, #1e293b)',
            }
        }
    },
    plugins: [],
}
