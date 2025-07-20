// crystalUtils.js - Utility functions for crystal selection and analysis

export const analyzeQuestionAndSelectCrystal = (question, readingType, crystalDatabase) => {
    // Convert database to array if it's an object
    const crystalsArray = Array.isArray(crystalDatabase) ? crystalDatabase : Object.values(crystalDatabase);

    if (!question && readingType === 'daily') {
        return getRandomCrystals(crystalsArray, 1)[0];
    }

    const questionLower = question.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    // Create keywords from crystal properties if not present
    const createKeywords = (crystal) => {
        if (crystal.keywords) return crystal.keywords;

        // Generate keywords from existing properties
        const keywords = [];
        if (crystal.properties) keywords.push(...crystal.properties.map(p => p.toLowerCase()));
        if (crystal.meaning) keywords.push(...crystal.meaning.toLowerCase().split(' '));
        if (crystal.healing) keywords.push(...crystal.healing.toLowerCase().split(' '));

        return keywords.filter(k => k.length > 2); // Filter out short words
    };

    const createIntentions = (crystal) => {
        if (crystal.intentions) return crystal.intentions;

        // Generate intentions from properties and meaning
        const intentions = [];
        if (crystal.properties) intentions.push(...crystal.properties.map(p => p.toLowerCase()));

        return intentions;
    };

    // Score each crystal based on keyword matching and reading type
    crystalsArray.forEach(crystal => {
        let score = 0;

        const keywords = createKeywords(crystal);
        const intentions = createIntentions(crystal);

        // Check keywords in question
        keywords.forEach(keyword => {
            if (questionLower.includes(keyword.toLowerCase())) {
                score += 3;
            }
        });

        // Check intentions match
        intentions.forEach(intention => {
            if (questionLower.includes(intention.toLowerCase())) {
                score += 5;
            }
        });

        // Check crystal name and meaning
        if (questionLower.includes(crystal.name.toLowerCase())) {
            score += 8;
        }

        // Check if question contains words from crystal meaning
        if (crystal.meaning) {
            const meaningWords = crystal.meaning.toLowerCase().split(' ');
            meaningWords.forEach(word => {
                if (word.length > 3 && questionLower.includes(word)) {
                    score += 2;
                }
            });
        }

        // Boost score based on reading type
        switch (readingType) {
            case 'love':
                if (crystal.chakra === 'Heart' ||
                    crystal.name.toLowerCase().includes('rose') ||
                    keywords.some(k => ['love', 'heart', 'romance', 'relationship'].includes(k.toLowerCase()))) {
                    score += 10;
                }
                break;
            case 'career':
                if (keywords.some(k => ['success', 'confidence', 'abundance', 'prosperity', 'motivation'].includes(k.toLowerCase()))) {
                    score += 10;
                }
                break;
            case 'spiritual':
                if (crystal.chakra === 'Crown' ||
                    crystal.chakra === 'Third Eye' ||
                    keywords.some(k => ['spiritual', 'meditation', 'wisdom', 'intuition'].includes(k.toLowerCase()))) {
                    score += 10;
                }
                break;
            case 'daily':
                if (keywords.some(k => ['balance', 'clarity', 'energy', 'protection'].includes(k.toLowerCase()))) {
                    score += 5;
                }
                break;
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = crystal;
        }
    });

    // If no strong match found, select based on reading type
    if (highestScore < 3) {
        const typeBasedSelection = {
            'love': crystalsArray.find(c => c.name.toLowerCase().includes('rose') || c.name === 'Rose Quartz'),
            'career': crystalsArray.find(c => c.name === 'Citrine' || c.name.toLowerCase().includes('citrine')),
            'spiritual': crystalsArray.find(c => c.name === 'Amethyst' || c.name.toLowerCase().includes('amethyst')),
            'daily': crystalsArray.find(c => c.name === 'Clear Quartz' || c.name.toLowerCase().includes('clear'))
        };
        bestMatch = typeBasedSelection[readingType] || crystalsArray[Math.floor(Math.random() * crystalsArray.length)];
    }

    return bestMatch || crystalsArray[0];
};

export const getRandomCrystals = (crystalDatabase, count = 9) => {
    const crystalsArray = Array.isArray(crystalDatabase) ? crystalDatabase : Object.values(crystalDatabase);
    const shuffled = [...crystalsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const getCrystalColor = (element) => {
    const colors = {
        Fire: 'from-red-500 to-orange-500',
        Water: 'from-blue-500 to-cyan-500',
        Earth: 'from-green-500 to-emerald-500',
        Air: 'from-purple-500 to-violet-500',
        All: 'from-white to-gray-300'
    };
    return colors[element] || colors.All;
};

export const validateQuestion = (question) => {
    if (!question || question.trim().length === 0) {
        return false; // Return boolean for compatibility
    }

    if (question.trim().length < 3) {
        return false;
    }

    return true;
};

// Enhanced validation function that returns detailed info
export const validateQuestionDetailed = (question) => {
    if (!question || question.trim().length === 0) {
        return { isValid: false, message: 'Please enter a question for the reading.' };
    }

    if (question.trim().length < 5) {
        return { isValid: false, message: 'Please provide a more detailed question.' };
    }

    return { isValid: true, message: '' };
};

export const getCrystalsByElement = (crystalDatabase, element) => {
    const crystalsArray = Array.isArray(crystalDatabase) ? crystalDatabase : Object.values(crystalDatabase);
    return crystalsArray.filter(crystal => crystal.element === element || crystal.element === 'All');
};

export const getCrystalsByChakra = (crystalDatabase, chakra) => {
    const crystalsArray = Array.isArray(crystalDatabase) ? crystalDatabase : Object.values(crystalDatabase);
    return crystalsArray.filter(crystal => crystal.chakra === chakra || crystal.chakra === 'All');
};

// Helper function to analyze question themes
export const analyzeQuestionThemes = (question) => {
    const questionLower = question.toLowerCase();
    const themes = [];

    // Love and relationships
    if (questionLower.match(/\b(love|heart|relationship|romance|partner|dating|marriage|soulmate)\b/)) {
        themes.push('love');
    }

    // Career and success
    if (questionLower.match(/\b(work|career|job|success|money|wealth|business|profession|promotion)\b/)) {
        themes.push('career');
    }

    // Health and healing
    if (questionLower.match(/\b(health|healing|pain|sick|wellness|recovery|energy|vitality)\b/)) {
        themes.push('healing');
    }

    // Spiritual growth
    if (questionLower.match(/\b(spiritual|meditation|wisdom|enlightenment|purpose|awakening|intuition)\b/)) {
        themes.push('spiritual');
    }

    // Protection and safety
    if (questionLower.match(/\b(protect|protection|safe|safety|fear|anxiety|worry|stress)\b/)) {
        themes.push('protection');
    }

    // Clarity and decision making
    if (questionLower.match(/\b(clarity|clear|decision|choice|confusion|understand|guidance)\b/)) {
        themes.push('clarity');
    }

    return themes;
};
