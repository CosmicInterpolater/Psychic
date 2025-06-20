import React, { useState, useRef, useCallback, useEffect } from 'react';
import './PalmReader.scss';

const PalmReader = () => {
    const canvasRef = useRef(null);
    const [image, setImage] = useState(null);
    const [showLines, setShowLines] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPoint, setDragPoint] = useState(null);
    const [currentAnalysis, setCurrentAnalysis] = useState("Upload a palm image to begin analysis. Drag the colored lines to match the lines on the palm for accurate reading.");
    const [aiResults, setAiResults] = useState("");
    const [showAiAnalysis, setShowAiAnalysis] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Default line positions (will be scaled when image loads)
    const [lines, setLines] = useState({
        life: {
            points: [{x: 150, y: 200}, {x: 120, y: 280}, {x: 140, y: 360}],
            color: '#e74c3c',
            name: 'Life Line',
            visible: true
        },
        heart: {
            points: [{x: 100, y: 120}, {x: 250, y: 100}, {x: 350, y: 110}],
            color: '#e91e63',
            name: 'Heart Line',
            visible: true
        },
        head: {
            points: [{x: 150, y: 160}, {x: 250, y: 170}, {x: 330, y: 190}],
            color: '#3f51b5',
            name: 'Head Line',
            visible: true
        },
        fate: {
            points: [{x: 250, y: 350}, {x: 260, y: 250}, {x: 270, y: 150}],
            color: '#9c27b0',
            name: 'Fate Line',
            visible: true
        }
    });

    const loadImage = (file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setImage(img);
                resizeCanvas(img);
                resetLinesToDefault(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const resizeCanvas = (img) => {
        const canvas = canvasRef.current;
        if (!canvas || !img) return;

        const maxWidth = 600;
        const maxHeight = 600;

        let { width, height } = img;

        const scaleX = maxWidth / width;
        const scaleY = maxHeight / height;
        const scale = Math.min(scaleX, scaleY);

        width *= scale;
        height *= scale;

        canvas.width = width;
        canvas.height = height;
    };

    const resetLinesToDefault = (img) => {
        const canvas = canvasRef.current;
        if (!canvas || !img) return;

        const w = canvas.width;
        const h = canvas.height;

        setLines({
            life: {
                points: [
                    {x: w * 0.25, y: h * 0.35},
                    {x: w * 0.20, y: h * 0.55},
                    {x: w * 0.23, y: h * 0.75}
                ],
                color: '#e74c3c',
                name: 'Life Line',
                visible: true
            },
            heart: {
                points: [
                    {x: w * 0.15, y: h * 0.25},
                    {x: w * 0.45, y: h * 0.20},
                    {x: w * 0.70, y: h * 0.22}
                ],
                color: '#e91e63',
                name: 'Heart Line',
                visible: true
            },
            head: {
                points: [
                    {x: w * 0.25, y: h * 0.32},
                    {x: w * 0.50, y: h * 0.35},
                    {x: w * 0.70, y: h * 0.40}
                ],
                color: '#3f51b5',
                name: 'Head Line',
                visible: true
            },
            fate: {
                points: [
                    {x: w * 0.50, y: h * 0.80},
                    {x: w * 0.52, y: h * 0.55},
                    {x: w * 0.54, y: h * 0.30}
                ],
                color: '#9c27b0',
                name: 'Fate Line',
                visible: true
            }
        });
    };

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (image) {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = '#666';
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Upload a palm photo to begin analysis', canvas.width / 2, canvas.height / 2);
        }

        if (showLines && image) {
            drawLines(ctx);
        }
    }, [image, showLines, lines]);

    const drawLines = (ctx) => {
        Object.values(lines).forEach(line => {
            if (!line.visible) return;

            ctx.strokeStyle = line.color;
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 2;

            ctx.beginPath();
            ctx.moveTo(line.points[0].x, line.points[0].y);

            for (let i = 1; i < line.points.length; i++) {
                if (i === line.points.length - 1) {
                    ctx.lineTo(line.points[i].x, line.points[i].y);
                } else {
                    const xc = (line.points[i].x + line.points[i + 1].x) / 2;
                    const yc = (line.points[i].y + line.points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(line.points[i].x, line.points[i].y, xc, yc);
                }
            }

            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw control points
            line.points.forEach(point => {
                ctx.fillStyle = line.color;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        });
    };

    const handleMouseDown = (e) => {
        if (!image || !showLines) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if clicking on a control point
        Object.entries(lines).forEach(([lineKey, line]) => {
            line.points.forEach((point, index) => {
                const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
                if (distance < 10) {
                    setIsDragging(true);
                    setDragPoint({ lineKey, pointIndex: index });
                }
            });
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !dragPoint) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = Math.max(0, Math.min(canvas.width, e.clientX - rect.left));
        const y = Math.max(0, Math.min(canvas.height, e.clientY - rect.top));

        setLines(prev => ({
            ...prev,
            [dragPoint.lineKey]: {
                ...prev[dragPoint.lineKey],
                points: prev[dragPoint.lineKey].points.map((point, index) =>
                    index === dragPoint.pointIndex ? { x, y } : point
                )
            }
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragPoint(null);
    };

    const calculateLineLength = (points) => {
        let length = 0;
        for (let i = 1; i < points.length; i++) {
            const dx = points[i].x - points[i-1].x;
            const dy = points[i].y - points[i-1].y;
            length += Math.sqrt(dx * dx + dy * dy);
        }
        return length;
    };

    const calculateCurvature = (points) => {
        if (points.length < 3) return 0;

        const start = points[0];
        const end = points[points.length - 1];
        const middle = points[Math.floor(points.length / 2)];

        const lineLength = Math.sqrt(
            Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
        );

        if (lineLength === 0) return 0;

        const distanceToLine = Math.abs(
            (end.y - start.y) * middle.x - (end.x - start.x) * middle.y +
            end.x * start.y - end.y * start.x
        ) / lineLength;

        return distanceToLine / lineLength;
    };

    const getLineAnalysis = (lineKey, length, curvature) => {
        const analyses = {
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

        const lineAnalysis = analyses[lineKey];
        if (!lineAnalysis) return "Analysis not available.";

        let lengthAnalysis;
        if (length > 200) lengthAnalysis = lineAnalysis.long;
        else if (length > 100) lengthAnalysis = lineAnalysis.medium;
        else lengthAnalysis = lineAnalysis.short;

        const curvatureAnalysis = curvature > 0.1 ? lineAnalysis.curved : lineAnalysis.straight;

        return `${lengthAnalysis} ${curvatureAnalysis}`;
    };

    const updateAnalysis = () => {
        if (!image) return;

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

        setCurrentAnalysis(analysis || "Upload a palm image to begin analysis.");
    };

    const analyzeWithAI = () => {
        if (!image) {
            alert('Please upload a palm image first.');
            return;
        }

        setIsAnalyzing(true);

        // Simulate AI processing
        setTimeout(() => {
            const aiAnalysis = generateAIAnalysis();
            setAiResults(aiAnalysis);
            setShowAiAnalysis(true);
            setIsAnalyzing(false);
        }, 1500);
    };

    const generateAIAnalysis = () => {
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

    const resetLines = () => {
        if (!image) {
            alert('Please upload a palm image first.');
            return;
        }

        resetLinesToDefault(image);
    };

    const toggleLines = () => {
        setShowLines(!showLines);
    };

    useEffect(() => {
        draw();
        updateAnalysis();
    }, [draw, lines]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseUp);
        };
    }, [isDragging, dragPoint]);

    return (
        <div className="page-container page-component--palm-reader">
            <section className="page-section">
                <h1 className="page-title">Palm Reading Analysis</h1>
                <p>Upload a palm photo and adjust the lines for accurate reading</p>

                <div className="cosmic-card bg-cosmic-deep/80 mb-6">
                    <div className="control-group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => loadImage(e.target.files[0])}
                            className="file-input"
                        />
                        <button className={'cosmic-button'} onClick={resetLines}>Reset Lines</button>
                        <button className={'cosmic-button'} onClick={toggleLines}>
                            {showLines ? 'Hide Lines' : 'Show Lines'}
                        </button>
                        <button className={'cosmic-button'} onClick={analyzeWithAI} disabled={isAnalyzing}>
                            {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
                        </button>
                    </div>
                </div>

                <div className="main-content cosmic-card bg-cosmic-deep/80">
                    <div className="canvas-container bg-cosmic-void">
                        <div className="canvas-wrapper">
                            <canvas
                                ref={canvasRef}
                                width="600"
                                height="400"
                                className="palm-canvas"
                            />
                        </div>
                    </div>

                    <div className="sidebar bg-cosmic-void">
                        <div className="feature-section">
                            <h3>📋 Current Analysis</h3>
                            <div
                                className="current-analysis"
                                dangerouslySetInnerHTML={{ __html: currentAnalysis }}
                            />
                        </div>

                        <div className="feature-section">
                            <h3>📏 Major Lines</h3>
                            <div className="line-info">
                                <h4>Life Line (Red)</h4>
                                <p>Represents vitality, energy, and general health. A strong, clear line indicates robust health and vitality.</p>
                            </div>
                            <div className="line-info">
                                <h4>Heart Line (Pink)</h4>
                                <p>Shows emotional nature and relationships. Length and depth indicate capacity for love and emotional expression.</p>
                            </div>
                            <div className="line-info">
                                <h4>Head Line (Blue)</h4>
                                <p>Indicates intelligence, mental capacity, and thinking patterns. Clarity suggests good mental focus.</p>
                            </div>
                            <div className="line-info">
                                <h4>Fate Line (Purple)</h4>
                                <p>Represents career, destiny, and life path. Presence and strength indicate career focus and life direction.</p>
                            </div>
                        </div>

                        <div className="feature-section">
                            <h3>🏔️ Mounts</h3>
                            <div className="mounts-grid">
                                <div className="mount-item">
                                    <strong>Venus:</strong> Love, passion
                                </div>
                                <div className="mount-item">
                                    <strong>Jupiter:</strong> Ambition, leadership
                                </div>
                                <div className="mount-item">
                                    <strong>Saturn:</strong> Discipline, responsibility
                                </div>
                                <div className="mount-item">
                                    <strong>Apollo:</strong> Creativity, arts
                                </div>
                                <div className="mount-item">
                                    <strong>Mercury:</strong> Communication
                                </div>
                                <div className="mount-item">
                                    <strong>Mars:</strong> Energy, aggression
                                </div>
                                <div className="mount-item">
                                    <strong>Luna:</strong> Intuition, imagination
                                </div>
                                <div className="mount-item">
                                    <strong>Neptune:</strong> Spirituality
                                </div>
                            </div>
                        </div>

                        {showAiAnalysis && (
                            <div className="ai-analysis">
                                <h3>🤖 AI Analysis Results</h3>
                                <div
                                    className="ai-results"
                                    dangerouslySetInnerHTML={{ __html: aiResults }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PalmReader;
