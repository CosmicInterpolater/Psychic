// Example: How to use content monitoring in TarotReader component
import React, { useState } from 'react';
import { useContentMonitoring } from '../../App';

const TarotReader = () => {
    const { checkContent, sessionBlocked } = useContentMonitoring();
    const [userQuestion, setUserQuestion] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        if (sessionBlocked || !userQuestion.trim()) return;

        setIsProcessing(true);

        try {
            // Check the user's question before processing
            const monitoringResult = await checkContent(
                { text: userQuestion },
                'tarot_reader'
            );

            if (!monitoringResult.safe) {
                // Content was flagged - monitoring system will handle the response
                setUserQuestion('');
                setIsProcessing(false);
                return;
            }

            // Safe to proceed with tarot reading
            await processTarotQuestion(userQuestion);
            setUserQuestion('');
        } catch (error) {
            console.error('Error processing question:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const processTarotQuestion = async (question) => {
        // Your existing tarot reading logic here
        console.log('Processing tarot question:', question);
    };

    if (sessionBlocked) {
        return null; // App.jsx will handle the blocked session display
    }

    return (
        <div className="tarot-reader">
            <h1>Tarot Card Reader</h1>
            
            {/* Question Input Form */}
            <form onSubmit={handleQuestionSubmit} className="question-form">
                <div className="form-group">
                    <label htmlFor="question">Ask your question:</label>
                    <textarea
                        id="question"
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)}
                        placeholder="What guidance do you seek from the cards?"
                        rows={3}
                        disabled={isProcessing}
                        className="form-control"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isProcessing || !userQuestion.trim()}
                    className="btn btn-primary"
                >
                    {isProcessing ? 'Checking...' : 'Ask the Cards'}
                </button>
            </form>

            {/* Rest of your tarot reader component */}
        </div>
    );
};

// Example: Monitoring image uploads in PalmReader
const PalmReader = () => {
    const { checkContent, sessionBlocked } = useContentMonitoring();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || sessionBlocked) return;

        setIsAnalyzing(true);

        try {
            // Convert file to base64 for monitoring
            const imageData = await fileToBase64(file);
            
            // Check the uploaded image
            const monitoringResult = await checkContent(
                { 
                    image: imageData,
                    filename: file.name,
                    fileType: file.type 
                },
                'palm_reader'
            );

            if (!monitoringResult.safe) {
                // Image was flagged - clear the input
                e.target.value = '';
                setIsAnalyzing(false);
                return;
            }

            // Safe to proceed with palm reading
            setUploadedImage(imageData);
            await analyzePalmImage(imageData);
        } catch (error) {
            console.error('Error processing image:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const analyzePalmImage = async (imageData) => {
        // Your existing palm reading logic here
        console.log('Analyzing palm image');
    };

    if (sessionBlocked) {
        return null; // App.jsx will handle the blocked session display
    }

    return (
        <div className="palm-reader">
            <h1>Palm Reader</h1>
            
            <div className="upload-section">
                <label htmlFor="palm-image">Upload your palm image:</label>
                <input
                    id="palm-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isAnalyzing}
                    className="form-control"
                />
                {isAnalyzing && <p>Analyzing image...</p>}
            </div>

            {uploadedImage && (
                <div className="palm-display">
                    <img src={uploadedImage} alt="Palm" className="palm-image" />
                </div>
            )}

            {/* Rest of your palm reader component */}
        </div>
    );
};

// Example: Monitoring chat/text input in any component
const useMonitoredInput = (componentName) => {
    const { checkContent } = useContentMonitoring();
    const [isChecking, setIsChecking] = useState(false);

    const checkAndProcess = async (inputValue, onSuccess) => {
        if (!inputValue.trim()) return;

        setIsChecking(true);
        
        try {
            const result = await checkContent(
                { text: inputValue },
                componentName
            );

            if (result.safe) {
                await onSuccess(inputValue);
            }
            // If not safe, the monitoring system handles the response
        } catch (error) {
            console.error('Monitoring error:', error);
        } finally {
            setIsChecking(false);
        }
    };

    return { checkAndProcess, isChecking };
};

export { TarotReader, PalmReader, useMonitoredInput };