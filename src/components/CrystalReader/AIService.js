// aiService.js - Backend Integration for Crystal Readings
import axios from 'axios';

class AIService {
    constructor() {
        // More comprehensive endpoint list addressing common localhost issues
        this.apiEndpoints = [
            '/api/crystal-insight',
            'http://127.0.0.1:5000/api/crystal-insight',  // Use IP instead of localhost
            'http://127.0.0.1:3001/api/crystal-insight',
            'http://127.0.0.1:5555/api/crystal-insight',
            'http://localhost:5000/api/crystal-insight',   // Keep localhost as backup
            'http://localhost:3001/api/crystal-insight',
            'http://localhost:5555/api/crystal-insight'
        ];

        this.timeout = 10000; // Shorter timeout for faster failover
        this.useBackend = true;
        this.debugMode = false; // Enable for troubleshooting
    }

    log(...args) {
        if (this.debugMode) {
            console.log('[AIService]', ...args);
        }
    }

    isConfigured() {
        return true;
    }

    configure(options = {}) {
        if (options.backendURL) {
            this.apiEndpoints.unshift(options.backendURL + '/crystal-insight');
        }
        if (options.timeout) {
            this.timeout = options.timeout;
        }
    }

    async selectCrystal(question, readingType, crystalDatabase) {
        // Use local analysis for crystal selection
        const crystal = this.analyzeQuestionLocally(question, readingType, crystalDatabase);

        // Generate insight using backend - EXACT same pattern as tarot
        let insight;
        if (this.useBackend) {
            try {
                insight = await this.generateCrystalInsight(question, crystal, readingType);
            } catch (error) {
                console.warn('Backend insight failed, falling back to local:', error.message);
                insight = this.generateLocalInsight(question, crystal, readingType);
            }
        } else {
            insight = this.generateLocalInsight(question, crystal, readingType);
        }

        return {
            crystal,
            insight
        };
    }

    async generateCrystalInsight(question, selectedCrystal, readingType) {
        const requestData = {
            question,
            crystal: {
                name: selectedCrystal.name,
                element: selectedCrystal.element,
                chakra: selectedCrystal.chakra,
                properties: selectedCrystal.properties,
                meaning: selectedCrystal.meaning
            },
            readingType
        };

        let lastError = null;

        // Try each endpoint with better error handling
        for (let i = 0; i < this.apiEndpoints.length; i++) {
            const endpoint = this.apiEndpoints[i];
            this.log(`Trying endpoint ${i + 1}/${this.apiEndpoints.length}: ${endpoint}`);

            try {
                const response = await axios.post(endpoint, requestData, {
                    timeout: this.timeout,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    withCredentials: false // Explicitly disable credentials for CORS
                });

                if (response.data && response.data.insight) {
                    this.log(`Success with endpoint: ${endpoint}`);
                    return response.data.insight;
                }
            } catch (error) {
                lastError = error;
                this.log(`Endpoint ${endpoint} failed:`, error.message);

                // Add small delay between attempts
                if (i < this.apiEndpoints.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }

        // All endpoints failed
        const errorMsg = lastError?.message || 'All backend endpoints failed';
        this.log('All endpoints failed. Last error:', errorMsg);
        throw new Error(`Backend connection failed: ${errorMsg}`);
    }

    // Local crystal analysis (unchanged from working version)
    analyzeQuestionLocally(question, readingType, crystalDatabase) {
        const questionLower = question.toLowerCase();
        const crystals = Object.values(crystalDatabase);

        // Simple keyword matching for crystal selection
        const keywords = {
            love: ['love', 'relationship', 'heart', 'romance', 'partner', 'dating'],
            healing: ['heal', 'health', 'pain', 'sick', 'wellness', 'recovery'],
            protection: ['protect', 'safe', 'fear', 'anxiety', 'worry', 'stress'],
            abundance: ['money', 'wealth', 'success', 'prosperity', 'career', 'job'],
            clarity: ['clarity', 'confusion', 'decision', 'choice', 'understand'],
            peace: ['peace', 'calm', 'relax', 'meditation', 'balance']
        };

        // Score crystals based on question content
        const scoredCrystals = crystals.map(crystal => {
            let score = 0;
            const crystalText = `${crystal.name} ${crystal.meaning} ${crystal.properties.join(' ')} ${crystal.healing}`.toLowerCase();

            // Check keyword matches
            Object.entries(keywords).forEach(([category, words]) => {
                words.forEach(word => {
                    if (questionLower.includes(word) && crystalText.includes(word)) {
                        score += 3;
                    }
                });
            });

            // Reading type bonus
            if (readingType === 'love' && crystalText.includes('love')) score += 2;
            if (readingType === 'career' && crystalText.includes('success')) score += 2;
            if (readingType === 'spiritual' && crystalText.includes('spiritual')) score += 2;

            return { crystal, score };
        });

        // Sort by score and return highest scoring crystal
        scoredCrystals.sort((a, b) => b.score - a.score);

        // If no good match, return random crystal
        if (scoredCrystals[0].score === 0) {
            return crystals[Math.floor(Math.random() * crystals.length)];
        }

        return scoredCrystals[0].crystal;
    }

    // Enhanced local insight generation (unchanged)
    generateLocalInsight(question, selectedCrystal, readingType) {
        const questionThemes = this.analyzeQuestionThemes(question);
        const crystalProperties = selectedCrystal.properties[0] || 'wisdom';

        const insights = {
            'daily': [
                `The energy of ${selectedCrystal.name} flows through your daily path, whispering secrets of ${selectedCrystal.element.toLowerCase()} wisdom. Trust that each moment today carries the potential for the ${selectedCrystal.meaning.toLowerCase()} you seek.`,
                `As ${selectedCrystal.name} resonates with your ${selectedCrystal.chakra} chakra, feel how this ancient stone guides you toward experiences that align with your highest good today.`,
                `${selectedCrystal.name} illuminates your daily journey with the sacred power of ${crystalProperties.toLowerCase()}. Let this crystal's energy remind you that ordinary moments hold extraordinary potential.`
            ],
            'love': [
                `In the realm of the heart, ${selectedCrystal.name} reveals that true ${selectedCrystal.meaning.toLowerCase()} begins within. The love you seek in others is already awakening in the chambers of your own heart.`,
                `The ${selectedCrystal.element.toLowerCase()} energy of ${selectedCrystal.name} suggests that your relationships are mirrors, reflecting back the very healing and growth your soul desires.`,
                `${selectedCrystal.name} whispers that love flourishes when nurtured by ${crystalProperties.toLowerCase()}. Your heart's desires align with the universe's plan for your romantic fulfillment.`
            ],
            'career': [
                `${selectedCrystal.name} illuminates a path where your professional life becomes a sacred expression of your soul's purpose. Success flows naturally when you align your work with the ${selectedCrystal.meaning.toLowerCase()} this crystal represents.`,
                `The universe speaks through ${selectedCrystal.name}, revealing that your career challenges are invitations to embody the ${crystalProperties.toLowerCase()} and wisdom this stone teaches.`,
                `Professional transformation awaits as ${selectedCrystal.name} guides you toward opportunities that honor both your material needs and spiritual growth.`
            ],
            'spiritual': [
                `Through the mystical lens of ${selectedCrystal.name}, your spiritual journey takes on new depth. This sacred stone bridges the earthly and divine, showing you that ${selectedCrystal.meaning.toLowerCase()} is your natural birthright.`,
                `${selectedCrystal.name} whispers ancient truths: your spiritual awakening is not a destination but a remembering of who you have always been.`,
                `The sacred energy of ${selectedCrystal.name} activates dormant wisdom within your soul, revealing that your spiritual path is uniquely yours to walk with ${crystalProperties.toLowerCase()}.`
            ]
        };

        const typeInsights = insights[readingType] || insights.daily;
        return typeInsights[Math.floor(Math.random() * typeInsights.length)];
    }

    analyzeQuestionThemes(question) {
        const questionLower = question.toLowerCase();
        const themes = [];

        if (questionLower.includes('love') || questionLower.includes('heart')) themes.push('love');
        if (questionLower.includes('work') || questionLower.includes('career')) themes.push('career');
        if (questionLower.includes('heal') || questionLower.includes('health')) themes.push('healing');
        if (questionLower.includes('money') || questionLower.includes('success')) themes.push('abundance');
        if (questionLower.includes('peace') || questionLower.includes('calm')) themes.push('peace');

        return themes;
    }

    async testConnection() {
        const healthEndpoints = this.apiEndpoints.map(endpoint =>
            endpoint.replace('/crystal-insight', '/health')
        );

        this.log('Testing backend connectivity...');

        for (let i = 0; i < healthEndpoints.length; i++) {
            const endpoint = healthEndpoints[i];
            this.log(`Testing health endpoint ${i + 1}/${healthEndpoints.length}: ${endpoint}`);

            try {
                const response = await axios.get(endpoint, {
                    timeout: 3000,
                    withCredentials: false
                });
                if (response.status === 200) {
                    this.log(`Health check passed for: ${endpoint}`);
                    return true;
                }
            } catch (error) {
                this.log(`Health check failed for ${endpoint}:`, error.message);
                continue;
            }
        }

        this.log('All health checks failed');
        return false;
    }

    // Enable debugging method for troubleshooting
    enableDebug() {
        this.debugMode = true;
        this.log('Debug mode enabled');
    }

    disableDebug() {
        this.debugMode = false;
    }
}

export default AIService;
