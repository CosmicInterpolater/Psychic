// aiService.js - OpenAI Integration for Crystal Readings

class AIService {
  constructor(apiKey = null) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  async generateCrystalInsight(question, selectedCrystal, readingType) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not provided');
    }

    const prompt = this.createPrompt(question, selectedCrystal, readingType);

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a wise crystal oracle and spiritual guide. Provide insightful, compassionate, and mystical guidance based on crystal energy and metaphysical wisdom. Your responses should be profound yet accessible, blending ancient wisdom with practical spiritual advice.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 300,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
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

  // Fallback method for when OpenAI is not available
  generateLocalInsight(question, selectedCrystal, readingType) {
    const insights = {
      'daily': [
        `The energy of ${selectedCrystal.name} flows through your daily path, whispering secrets of ${selectedCrystal.element.toLowerCase()} wisdom. Trust that each moment today carries the potential for the ${selectedCrystal.meaning} you seek.`,
        `As ${selectedCrystal.name} resonates with your ${selectedCrystal.chakra} chakra, feel how this ancient stone guides you toward experiences that align with your highest good today.`
      ],
      'love': [
        `In the realm of the heart, ${selectedCrystal.name} reveals that true ${selectedCrystal.meaning} begins within. The love you seek in others is already awakening in the chambers of your own heart.`,
        `The ${selectedCrystal.element.toLowerCase()} energy of ${selectedCrystal.name} suggests that your relationships are mirrors, reflecting back the very healing and growth your soul desires.`
      ],
      'career': [
        `${selectedCrystal.name} illuminates a path where your professional life becomes a sacred expression of your soul's purpose. Success flows naturally when you align your work with the ${selectedCrystal.meaning} this crystal represents.`,
        `The universe speaks through ${selectedCrystal.name}, revealing that your career challenges are invitations to embody the ${selectedCrystal.properties[0].toLowerCase()} and wisdom this stone teaches.`
      ],
      'spiritual': [
        `Through the mystical lens of ${selectedCrystal.name}, your spiritual journey takes on new depth. This sacred stone bridges the earthly and divine, showing you that ${selectedCrystal.meaning} is your natural birthright.`,
        `${selectedCrystal.name} whispers ancient truths: your spiritual awakening is not a destination but a remembering of who you have always been.`
      ]
    };

    const typeInsights = insights[readingType] || insights.daily;
    return typeInsights[Math.floor(Math.random() * typeInsights.length)];
  }
}

export default AIService;