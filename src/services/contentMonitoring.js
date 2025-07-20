// Content Monitoring System - Modular Architecture
// This would be a separate service/module integrated into your app

// 1. Main Monitoring Service
class ContentMonitoringService {
    constructor() {
        this.textAnalyzer = new TextAnalyzer();
        this.imageAnalyzer = new ImageAnalyzer();
        this.behaviorTracker = new BehaviorTracker();
        this.crisisHandler = new CrisisHandler();
        this.violationLogger = new ViolationLogger();
    }

    async analyzeContent(content) {
        const results = {
            safe: true,
            violations: [],
            action: 'allow',
            severity: 'none'
        };

        try {
            // Analyze different content types
            if (content.text) {
                const textResult = await this.textAnalyzer.analyze(content.text);
                this.mergeResults(results, textResult);
            }

            if (content.image) {
                const imageResult = await this.imageAnalyzer.analyze(content.image);
                this.mergeResults(results, imageResult);
            }

            // Track user behavior patterns
            await this.behaviorTracker.recordActivity(content.userId, results);

            // Handle violations based on severity
            await this.handleViolations(results, content.userId);

            return results;
        } catch (error) {
            console.error('Content monitoring error:', error);
            // Fail safely - when in doubt, flag for review
            return { safe: false, action: 'review', severity: 'unknown' };
        }
    }

    mergeResults(mainResults, newResults) {
        if (!newResults.safe) {
            mainResults.safe = false;
            mainResults.violations.push(...newResults.violations);
            mainResults.severity = this.getHigherSeverity(mainResults.severity, newResults.severity);
            mainResults.action = this.getStricterAction(mainResults.action, newResults.action);
        }
    }

    async handleViolations(results, userId) {
        if (results.violations.length === 0) return;

        for (const violation of results.violations) {
            switch (violation.type) {
                case 'self_harm':
                    await this.crisisHandler.handleSelfHarm(userId, violation);
                    break;
                case 'inappropriate_content':
                    await this.handleInappropriateContent(userId, violation);
                    break;
                case 'violence_threat':
                    await this.handleViolenceThreat(userId, violation);
                    break;
                case 'extremist_content':
                    await this.handleExtremistContent(userId, violation);
                    break;
            }
        }

        // Log all violations
        await this.violationLogger.log(userId, results);
    }

    getHigherSeverity(current, new_severity) {
        const levels = ['none', 'low', 'medium', 'high', 'critical'];
        const currentIndex = levels.indexOf(current);
        const newIndex = levels.indexOf(new_severity);
        return levels[Math.max(currentIndex, newIndex)];
    }

    getStricterAction(current, new_action) {
        const actions = ['allow', 'warn', 'remove', 'suspend', 'ban'];
        const currentIndex = actions.indexOf(current);
        const newIndex = actions.indexOf(new_action);
        return actions[Math.max(currentIndex, newIndex)];
    }

    async handleInappropriateContent(userId, violation) {
        const userHistory = await this.behaviorTracker.getUserHistory(userId);
        const previousViolations = userHistory.violations.filter(v => v.type === 'inappropriate_content');
        
        if (previousViolations.length === 0) {
            // First offense - warning
            await this.sendWarning(userId, 'inappropriate_content');
        } else {
            // Repeat offense - session termination
            await this.terminateSession(userId, 'repeated_inappropriate_content');
        }
    }

    async handleViolenceThreat(userId, violation) {
        // Immediate session termination for violence threats
        await this.terminateSession(userId, 'violence_threat');
        await this.notifyModerators(userId, violation);
    }

    async handleExtremistContent(userId, violation) {
        // Immediate ban for extremist content
        await this.banUser(userId, 'extremist_content');
        await this.notifyAuthorities(userId, violation);
    }
}

// 2. Text Analysis Module
class TextAnalyzer {
    constructor() {
        this.harmKeywords = [
            // Self-harm indicators
            'kill myself', 'end it all', 'not worth living', 'suicide',
            // Violence indicators  
            'hurt someone', 'kill them', 'make them pay', 'revenge',
            // Extremist indicators
            'join the cause', 'holy war', 'destroy the infidels'
        ];
        
        this.inappropriateKeywords = [
            // Content that should be filtered
            'explicit sexual terms would go here'
        ];
    }

    async analyze(text) {
        const result = {
            safe: true,
            violations: [],
            severity: 'none'
        };

        const lowerText = text.toLowerCase();

        // Check for self-harm indicators
        const selfHarmIndicators = this.detectSelfHarm(lowerText);
        if (selfHarmIndicators.length > 0) {
            result.safe = false;
            result.violations.push({
                type: 'self_harm',
                severity: 'critical',
                indicators: selfHarmIndicators
            });
            result.severity = 'critical';
        }

        // Check for violence indicators
        const violenceIndicators = this.detectViolence(lowerText);
        if (violenceIndicators.length > 0) {
            result.safe = false;
            result.violations.push({
                type: 'violence_threat',
                severity: 'high',
                indicators: violenceIndicators
            });
            result.severity = this.getHigherSeverity(result.severity, 'high');
        }

        // Check for inappropriate content
        const inappropriateContent = this.detectInappropriateContent(lowerText);
        if (inappropriateContent.length > 0) {
            result.safe = false;
            result.violations.push({
                type: 'inappropriate_content',
                severity: 'medium',
                indicators: inappropriateContent
            });
            result.severity = this.getHigherSeverity(result.severity, 'medium');
        }

        return result;
    }

    detectSelfHarm(text) {
        const selfHarmKeywords = [
            'kill myself', 'end it all', 'not worth living', 'suicide',
            'hurt myself', 'self harm', 'end my life'
        ];
        return selfHarmKeywords.filter(keyword => text.includes(keyword));
    }

    detectViolence(text) {
        const violenceKeywords = [
            'hurt someone', 'kill them', 'make them pay', 'revenge',
            'violence', 'attack', 'harm others'
        ];
        return violenceKeywords.filter(keyword => text.includes(keyword));
    }

    detectInappropriateContent(text) {
        // This would contain actual inappropriate terms
        const inappropriateKeywords = ['example_inappropriate_term'];
        return inappropriateKeywords.filter(keyword => text.includes(keyword));
    }

    getHigherSeverity(current, new_severity) {
        const levels = ['none', 'low', 'medium', 'high', 'critical'];
        const currentIndex = levels.indexOf(current);
        const newIndex = levels.indexOf(new_severity);
        return levels[Math.max(currentIndex, newIndex)];
    }
}

// 3. Image Analysis Module
class ImageAnalyzer {
    async analyze(imageData) {
        // This would integrate with image analysis APIs
        // For demo purposes, showing the structure
        const result = {
            safe: true,
            violations: [],
            severity: 'none'
        };

        try {
            // Placeholder for actual image analysis
            // In reality, you'd use services like:
            // - Google Cloud Vision API
            // - AWS Rekognition
            // - Microsoft Azure Computer Vision
            
            const analysisResult = await this.callImageAnalysisAPI(imageData);
            
            if (analysisResult.inappropriateContent) {
                result.safe = false;
                result.violations.push({
                    type: 'inappropriate_content',
                    severity: 'high',
                    details: analysisResult.details
                });
                result.severity = 'high';
            }

            return result;
        } catch (error) {
            console.error('Image analysis error:', error);
            // Fail safely
            return { safe: false, severity: 'unknown', violations: [{ type: 'analysis_error' }] };
        }
    }

    async callImageAnalysisAPI(imageData) {
        // Placeholder for actual API call
        return { inappropriateContent: false };
    }
}

// 4. Crisis Handler Module
class CrisisHandler {
    async handleSelfHarm(userId, violation) {
        const crisisResources = {
            national_suicide_prevention: '988',
            crisis_text_line: 'Text HOME to 741741',
            emergency: '911'
        };

        // Immediately display crisis resources
        await this.displayCrisisResources(userId, crisisResources);
        
        // Log the incident
        await this.logCrisisIncident(userId, violation);
        
        // Suspend the session temporarily
        await this.temporarilySuspendSession(userId);
    }

    async displayCrisisResources(userId, resources) {
        // This would trigger a UI component showing crisis resources
        const message = `
            We're concerned about you. Please reach out for help:
            
            • National Suicide Prevention Lifeline: ${resources.national_suicide_prevention}
            • Crisis Text Line: ${resources.crisis_text_line}
            • Emergency Services: ${resources.emergency}
            
            You are not alone. Help is available.
        `;
        
        // Trigger UI to show this message
        console.log('Crisis resources displayed for user:', userId);
    }

    async logCrisisIncident(userId, violation) {
        // Log to secure database for follow-up
        console.log('Crisis incident logged:', { userId, violation, timestamp: new Date() });
    }

    async temporarilySuspendSession(userId) {
        // Suspend session until user acknowledges crisis resources
        console.log('Session temporarily suspended for user:', userId);
    }
}

// 5. Integration with React Components
const useContentMonitoring = () => {
    const monitoringService = new ContentMonitoringService();
    
    const checkContent = async (content, userId) => {
        const result = await monitoringService.analyzeContent({
            ...content,
            userId
        });
        
        return result;
    };

    return { checkContent };
};

// 6. Example integration in TarotReader component
const TarotReaderWithMonitoring = () => {
    const { checkContent } = useContentMonitoring();
    const [sessionActive, setSessionActive] = useState(true);
    const [showCrisisResources, setShowCrisisResources] = useState(false);

    const handleUserInput = async (userInput, userId) => {
        if (!sessionActive) return;

        const monitoringResult = await checkContent(
            { text: userInput },
            userId
        );

        if (!monitoringResult.safe) {
            switch (monitoringResult.action) {
                case 'suspend':
                    setSessionActive(false);
                    break;
                case 'remove':
                    // Remove the content, continue session
                    break;
                case 'crisis':
                    setShowCrisisResources(true);
                    setSessionActive(false);
                    break;
            }
            return false; // Don't process the input
        }

        return true; // Safe to process
    };

    // Rest of component logic...
};

export {
    ContentMonitoringService,
    TextAnalyzer,
    ImageAnalyzer,
    CrisisHandler,
    useContentMonitoring
};