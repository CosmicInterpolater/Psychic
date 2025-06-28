// openaiService.js - Legacy service (can be removed if not needed elsewhere)
// Since the backend now handles AI services, this file may not be necessary

/**
 * DEPRECATION NOTICE:
 * This service is no longer needed since AI functionality has been moved to the backend.
 * The AIService class in ai_service.js now handles all AI interactions through the backend API.
 * 
 * This file can be safely removed unless other parts of the application still reference it.
 * If you need direct OpenAI integration for other features, keep this file but update
 * the implementation to work with your new architecture.
 */

console.warn('OpenAI Service: This service is deprecated. AI functionality has been moved to backend.');

class OpenAIService {
  constructor() {
    console.warn('OpenAIService is deprecated. Use AIService instead.');
  }

  shouldElaborate() {
    console.warn('OpenAIService.shouldElaborate is deprecated.');
    return false;
  }

  async getElaborateInterpretation() {
    console.warn('OpenAIService.getElaborateInterpretation is deprecated.');
    throw new Error('This method is no longer supported. Use AIService backend integration.');
  }

  async testConnection() {
    console.warn('OpenAIService.testConnection is deprecated.');
    return false;
  }
}

// Export singleton instance for backward compatibility
const openAIService = new OpenAIService();
export default openAIService;