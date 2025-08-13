// hooks/usePalmAnalysis.js
import { useState, useCallback, useEffect } from 'react';
import { analyzePalmLines, generateAIAnalysis } from '../utils/palmAnalysisUtils';

export const usePalmAnalysis = (image, lines, setIsAnalyzing, setShowAiAnalysis) => {
    const [currentAnalysis, setCurrentAnalysis] = useState(
        "Upload a palm image to begin analysis. Drag the colored lines to match the lines on the palm for accurate reading."
    );
    const [aiResults, setAiResults] = useState("");

    const updateAnalysis = useCallback(() => {
        if (!image) return;
        const analysis = analyzePalmLines(lines);
        setCurrentAnalysis(analysis);
    }, [image, lines]);

    const analyzeWithAI = useCallback(() => {
        setIsAnalyzing(true);
        
        // Simulate AI processing
        setTimeout(() => {
            const aiAnalysis = generateAIAnalysis();
            setAiResults(aiAnalysis);
            setShowAiAnalysis(true);
            setIsAnalyzing(false);
        }, 1500);
    }, [setIsAnalyzing, setShowAiAnalysis]);

    useEffect(() => {
        updateAnalysis();
    }, [updateAnalysis]);

    return { currentAnalysis, aiResults, analyzeWithAI };
};