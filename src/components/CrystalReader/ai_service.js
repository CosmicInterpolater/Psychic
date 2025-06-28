// aiService.js - Backend Integration for Crystal Readings
import axios from 'axios';

class AIService {
  constructor() {
    // Default backend URL - can be configured later
    this.backendURL = 'http://localhost:5555/api';
    this.timeout = 30000; // 30 second timeout
    
    // Configuration flags
    this.useBackend = true;
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
    
    // Try to get backend URL from window object if set
    if (typeof window !== 'undefined' && window.REACT_APP_BACKEND_URL) {
      this.backendURL = window.REACT_APP_BACKEND_URL;
    }
  }

  isConfigured() {
    return true; // Backend approach always works with fallback
  }

  // Method to configure the service
  configure(options = {}) { 
    if (options.backendURL) {
      this.backendURL = options.backendURL;
    }
    if (options.timeout) {
      this.timeout = options.timeout;
    }
  }

  async selectCrystal(question, readingType, crystalDatabase) {
    // Use local analysis for crystal selection
    const crystal = this.analyzeQuestionLocally(question, readingType, crystalDatabase);
    
    // Generate insight using backend
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
    try {
      // Make request to backend API
      const response = await axios.post(
        `${this.backendURL}/crystal-insight`,
        {
          question,
          crystal: {
            name: selectedCrystal.name,
            element: selectedCrystal.element,
            chakra: selectedCrystal.chakra,
            properties: selectedCrystal.properties,
            meaning: selectedCrystal.meaning
          },
          readingType
        },
        {
          timeout: this.timeout,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.insight) {
        return response.data.insight;
      } else {
        throw new Error('Invalid response format from backend');
      }

    } catch (error) {
      console.error('Backend Service Error:', error);
      
      // Handle different types of errors
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      } else if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.error || 'Backend service error';
        
        if (status === 401) {
          throw new Error('Authentication failed with AI service');
        } else if (status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (status === 503) {
          throw new Error('AI service temporarily unavailable');
        } else {
          throw new Error(`Backend error: ${message}`);
        }
      } else if (error.request) {
        // Request made but no response received
        throw new Error('Unable to reach backend service. Please check your connection.');
      } else {
        // Something else happened
        throw new Error('Unexpected error occurred');
      }
    }
  }

  // Local crystal analysis (unchanged)
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

  createPrompt(question, crystal, readingType) {
    return `As a crystal oracle, provide mystical insight for this reading:

Question: "${question}"
Crystal Selected: ${crystal.name} (${crystal.element} element, ${crystal.chakra} chakra)
Reading Type: ${readingType}
Crystal Properties: ${crystal.properties.join(', ')}
Crystal Meaning: ${crystal.meaning}

Provide a 2-3 sentence spiritual insight that:
1. Connects the crystal's energy to their specific question
2. Offers profound yet practical guidance
3. Uses mystical but accessible language
4. Feels personally meaningful and transformative

Focus on how ${crystal.name}'s unique energy addresses their concern about "${question}".`;
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

  // Method to test backend connectivity
  async testConnection() {
    try {
      const response = await axios.get(`${this.backendURL}/health`, {
        timeout: 5000
      });
      return response.status === 200;
    } catch (error) {
      console.error('Backend connectivity test failed:', error);
      return false;
    }
  }
}

export default AIService;