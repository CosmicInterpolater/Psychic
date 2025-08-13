// PalmReader.jsx - Main Component
import React, { useState, useRef, useEffect } from 'react';
import { usePalmCanvas } from './hooks/usePalmCanvas';
import { usePalmLines } from './hooks/usePalmLines';
import { usePalmAnalysis } from './hooks/usePalmAnalysis';
import { useImageHandler } from './hooks/useImageHandler';
import CanvasSection from './components/CanvasSection';
import AnalysisPanel from './components/AnalysisPanel';
import ControlPanel from './components/ControlPanel';
import LineInfoPanel from './components/LineInfoPanel';
import MountsPanel from './components/MountsPanel';
import AIAnalysisPanel from './components/AIAnalysisPanel';
import ImageInputSection from './components/ImageInputSection';
import './PalmReader.scss';

const PalmReader = () => {
    const canvasRef = useRef(null);
    const [showLines, setShowLines] = useState(true);
    const [showAiAnalysis, setShowAiAnalysis] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Custom hooks for different concerns
    const { image, loadImage, loadImageFromCapture, clearImage } = useImageHandler();
    const { lines, resetLines, updateLinePoint } = usePalmLines(image, canvasRef);
    const { draw } = usePalmCanvas(canvasRef, image, lines, showLines);
    const { currentAnalysis, aiResults, analyzeWithAI } = usePalmAnalysis(
        image, 
        lines, 
        setIsAnalyzing, 
        setShowAiAnalysis
    );

    const handleResetLines = () => {
        if (!image) {
            alert('Please upload a palm image first.');
            return;
        }
        resetLines();
    };

    const handleToggleLines = () => {
        setShowLines(!showLines);
    };

    const handleAIAnalysis = () => {
        if (!image) {
            alert('Please upload a palm image first.');
            return;
        }
        analyzeWithAI();
    };

    const handleClearImage = () => {
        clearImage();
        resetLines();
        setShowAiAnalysis(false);
    };

    useEffect(() => {
        draw();
    }, [draw]);

    return (
        <div className="page-container page-component--palm-reader">
            <section className="page-section">
                <h1 className="page-title">Palm Reading Analysis</h1>
                <p>Upload a palm photo or take a picture, then adjust the lines for accurate reading</p>

                <ImageInputSection
                    onImageLoad={loadImage}
                    onImageCapture={loadImageFromCapture}
                    hasImage={!!image}
                    onClearImage={handleClearImage}
                />

                {image && (
                    <ControlPanel
                        onResetLines={handleResetLines}
                        onToggleLines={handleToggleLines}
                        onAIAnalysis={handleAIAnalysis}
                        showLines={showLines}
                        isAnalyzing={isAnalyzing}
                    />
                )}

                {image && (
                    <div className="main-content cosmic-card bg-cosmic-deep/80">
                        <CanvasSection
                            canvasRef={canvasRef}
                            image={image}
                            lines={lines}
                            showLines={showLines}
                            onUpdateLinePoint={updateLinePoint}
                        />

                        <div className="sidebar bg-cosmic-void">
                            <AnalysisPanel currentAnalysis={currentAnalysis} />
                            <LineInfoPanel />
                            <MountsPanel />
                            {showAiAnalysis && <AIAnalysisPanel aiResults={aiResults} />}
                        </div>
                    </div>
                )}

                {!image && (
                    <div className="no-image-placeholder">
                        <div className="placeholder-content">
                            <div className="placeholder-icon">👋</div>
                            <h3>Ready to Read Your Palm</h3>
                            <p>Choose to upload a photo from your device or take a new picture with your camera to get started with your palm reading analysis.</p>
                            <div className="placeholder-tips">
                                <h4>Tips for best results:</h4>
                                <ul>
                                    <li>Use good lighting (natural light works best)</li>
                                    <li>Keep your palm flat and fingers slightly spread</li>
                                    <li>Fill most of the frame with your palm</li>
                                    <li>Avoid shadows on your palm</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default PalmReader;