// openaiService.js - Service for integrating ChatGPT responses with crystal readings

/**
 * Service for querying OpenAI's ChatGPT when crystal responses need elaboration
 * Requires OPENAI_API_KEY environment variable to be set
 */

class OpenAIService {
  constructor() {
    // Get API key from environment variables
    this.apiKey = process.env.OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
    
    if (!this.apiKey) {
      console.warn('OpenAI API key not found in environment variables. ChatGPT elaboration will be disabled.');
    }
  }

  /**
   * Determines if a crystal response should be elaborated by ChatGPT
   * @param {Object} crystal - The selected crystal object
   * @param {string} question - User's question
   * @param {string} readingType - Type of reading (daily, love, career, spiritual)
   * @returns {boolean} - Whether to use ChatGPT elaboration
   */
  shouldElaborate(crystal, question, readingType) {
    // Always elaborate if there's a specific question
    if (question && question.trim().length > 10) {
      return true;
    }

    // Elaborate for complex reading types
    if (['career', 'spiritual'].includes(readingType)) {
      return true;
    }

    // Elaborate for certain crystals that benefit from deeper explanation
    const deepCrystals = ['Labradorite', 'Amethyst', 'Moonstone', 'Clear Quartz'];
    if (deepCrystals.includes(crystal.name)) {
      return true;
    }

    return false;
  }

  /**
   * Creates a structured prompt for ChatGPT based on crystal and user context
   * @param {Object} crystal - The selected crystal object
   * @param {string} question - User's question
   * @param {string} readingType - Type of reading
   * @param {string} basicMessage - The basic crystal message
   * @returns {string} - Formatted prompt for ChatGPT
   */
  createCrystalPrompt(crystal, question, readingType, basicMessage) {
    const prompt = `You are an experienced crystal healer and spiritual guide. A person has selected ${crystal.name} for guidance. Please provide an elaborate, insightful interpretation that expands on the basic message.

Crystal Details:
- Name: ${crystal.name}
- Element: ${crystal.element}
- Chakra: ${crystal.chakra}
- Meaning: ${crystal.meaning}
- Properties: ${crystal.properties.join(', ')}
- Healing: ${crystal.healing}
- Basic Advice: ${crystal.advice}

Reading Context:
- Reading Type: ${readingType}
- Basic Message: "${basicMessage}"
${question ? `- User's Question: "${question}"` : ''}

Please provide:
1. A deeper interpretation of why this crystal appeared for them
2. Specific practical guidance related to their situation
3. How to work with this crystal's energy
4. Any timing or next steps they should consider

Keep the tone mystical yet practical, warm and encouraging. Aim for 3-4 paragraphs that feel personally meaningful. Don't repeat the basic information already provided - instead, elaborate and expand with deeper wisdom.`;

    return prompt;
  }

  /**
   * Queries ChatGPT for an elaborate crystal interpretation
   * @param {Object} crystal - The selected crystal object
   * @param {string} question - User's question
   * @param {string} readingType - Type of reading
   * @param {string} basicMessage - The basic crystal message
   * @returns {Promise<string>} - Elaborate interpretation from ChatGPT
   */
  async getElaborateInterpretation(crystal, question, readingType, basicMessage) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = this.createCrystalPrompt(crystal, question, readingType, basicMessage);

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4', // Use gpt-3.5-turbo if you prefer faster/cheaper responses
          messages: [
            {
              role: 'system',
              content: 'You are a wise and intuitive crystal healer who provides deep, meaningful guidance.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.8, // Slightly creative but not too random
          top_p: 0.9
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from OpenAI API');
      }

      return data.choices[0].message.content.trim();

    } catch (error) {
      console.error('Error querying ChatGPT:', error);
      
      // Return a fallback message that indicates the service is unavailable
      return `The crystal energies are particularly strong today, making digital divination challenging. ${crystal.name} encourages you to trust your own inner wisdom at this time. The guidance you seek lies within your heart - listen carefully to your intuition as you move forward with ${crystal.meaning.toLowerCase()}.`;
    }
  }

  /**
   * Simple method to test API connectivity
   * @returns {Promise<boolean>} - Whether the API is accessible
   */
  async testConnection() {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Hello' }],
          max_tokens: 5
        })
      });

      return response.ok;
    } catch (error) {
      console.error('OpenAI connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
const openAIService = new OpenAIService();
export default openAIService;