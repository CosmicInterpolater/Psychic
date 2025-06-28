// utils/palmAnalysisUtils.js
import { calculateLineLength, calculateCurvature } from './palmLineUtils';

const LINE_ANALYSES = {
    life: {
        long: "Strong vitality and robust health. Indicates a long, energetic life with good stamina.",
        medium: "Balanced energy levels. Good health with periods of activity and rest.",
        short: "Focused energy. Quality of life more important than quantity. Efficient use of energy.",
        curved: "Adventurous spirit, loves travel and new experiences. Open to change.",
        straight: "Cautious nature, prefers stability and routine. Steady life approach."
    },
    heart: {
        long: "Deep capacity for love, strong emotional connections. Generous with affection.",
        medium: "Balanced emotional nature. Capable of both giving and receiving love.",
        short: "Selective in relationships, values quality over quantity. Intense but focused emotions.",
        curved: "Romantic and expressive, wears heart on sleeve. Emotionally demonstrative.",
        straight: "Practical approach to love, stable relationships. Steady emotional nature."
    },
    head: {
        long: "Analytical mind, thinks things through carefully. Strong intellectual capacity.",
        medium: "Balanced thinking approach. Good problem-solving abilities.",
        short: "Quick thinker, makes decisions instinctively. Efficient mental processing.",
        curved: "Creative thinking, imaginative problem-solving. Artistic mental approach.",
        straight: "Logical and methodical, straightforward thinking. Clear decision-making."
    },
    fate: {
        long: "Strong sense of purpose, clear life direction. Determined path to success.",
        medium: "Developing sense of direction. Career path becoming clearer with time.",
        short: "Self-made success, creates own opportunities. Independent career development.",
        curved: "Flexible career path, adapts to circumstances. Versatile professional approach.",
        straight: "Focused career goals, steady professional growth. Linear career progression."
    }
};

export const getLineAnalysis = (lineKey, length, curvature) => {
    const lineAnalysis = LINE_ANALYSES[lineKey];
    if (!lineAnalysis) return "Analysis not available.";

    let lengthAnalysis;
    if (length > 200) lengthAnalysis = lineAnalysis.long;
    else if (length > 100) lengthAnalysis = lineAnalysis.medium;
    else lengthAnalysis = lineAnalysis.short;

    const curvatureAnalysis = curvature > 0.1 ? lineAnalysis.curved : lineAnalysis.straight;

    return `${lengthAnalysis} ${curvatureAnalysis}`;
};

export const analyzePalmLines = (lines) => {
    let analysis = '';

    Object.entries(lines).forEach(([lineKey, line]) => {
        const length = calculateLineLength(line.points);
        const curvature = calculateCurvature(line.points);

        analysis += `
            <div class="line-info">
                <h4>${line.name}</h4>
                <p><strong>Length:</strong> ${length > 200 ? 'Long' : length > 100 ? 'Medium' : 'Short'} (${Math.round(length)}px)</p>
                <p><strong>Shape:</strong> ${curvature > 0.15 ? 'Very Curved' : curvature > 0.08 ? 'Curved' : 'Straight'}</p>
                <p><strong>Analysis:</strong> ${getLineAnalysis(lineKey, length, curvature)}</p>
            </div>
        `;
    });

    return analysis || "Upload a palm image to begin analysis.";
};

export const generateAIAnalysis = () => {
    const personalityTraits = [
        "Strong leadership qualities with natural charisma and ability to inspire others",
        "Creative and artistic nature with innovative thinking and unique perspectives",
        "Excellent communication skills and natural social awareness in group settings",
        "Natural problem-solving abilities with analytical mind and logical approach"
    ];

    const careerGuidance = [
        "Well-suited for creative fields like art, design, music, or creative writing",
        "Leadership roles in management, entrepreneurship, or executive positions",
        "Service-oriented careers in healthcare, counseling, or social work",
        "Technical fields requiring analytical thinking like engineering or research"
    ];

    const selectedPersonality = personalityTraits[Math.floor(Math.random() * personalityTraits.length)];
    const selectedCareer = careerGuidance[Math.floor(Math.random() * careerGuidance.length)];

    return `
        <div class="line-info">
            <h4>🧠 Personality Analysis</h4>
            <p>${selectedPersonality}</p>
        </div>
        <div class="line-info">
            <h4>💼 Career Guidance</h4>
            <p>${selectedCareer}</p>
        </div>
        <div class="line-info">
            <h4>🌟 Overall Assessment</h4>
            <p>Your palm reveals a well-balanced individual with strong potential for success. The configuration of your major lines suggests someone who approaches life with determination and wisdom.</p>
        </div>
    `;
};