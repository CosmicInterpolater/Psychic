// components/ImageCaptureModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ImageCaptureModal.scss';

const ImageCaptureModal = ({ isOpen, onClose, onImageCapture }) => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);
    const [facingMode, setFacingMode] = useState('environment'); // 'user' for front, 'environment' for back
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => stopCamera();
    }, [isOpen, facingMode]);

    const startCamera = async () => {
        try {
            setError(null);
            setIsStreaming(false);

            const constraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    setIsStreaming(true);
                };
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('Unable to access camera. Please check permissions.');
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsStreaming(false);
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to blob and pass to parent
        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], 'palm-capture.jpg', { type: 'image/jpeg' });
                onImageCapture(file);
                handleClose();
            }
        }, 'image/jpeg', 0.9);
    };

    const handleClose = () => {
        stopCamera();
        onClose();
    };

    const switchCamera = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    if (!isOpen) return null;

    return (
        <div className="image-capture-modal-overlay" onClick={handleClose}>
            <div className="image-capture-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Capture Palm Photo</h3>
                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>

                <div className="modal-content">
                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                            <button onClick={startCamera} className="retry-btn">
                                Try Again
                            </button>
                        </div>
                    )}

                    {!error && (
                        <div className="camera-container">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className={`camera-preview ${!isStreaming ? 'loading' : ''}`}
                            />

                            {!isStreaming && (
                                <div className="loading-overlay">
                                    <div className="loading-spinner"></div>
                                    <p>Starting camera...</p>
                                </div>
                            )}

                            <canvas ref={canvasRef} style={{ display: 'none' }} />
                        </div>
                    )}

                    <div className="capture-instructions">
                        <p>Position your palm clearly in the frame and tap capture</p>
                        <ul>
                            <li>Ensure good lighting</li>
                            <li>Keep your palm flat and steady</li>
                            <li>Fill most of the frame with your palm</li>
                        </ul>
                    </div>
                </div>

                <div className="modal-actions">
                    <button
                        onClick={switchCamera}
                        className="switch-camera-btn"
                        disabled={!isStreaming}
                    >
                        Switch Camera
                    </button>
                    <button
                        onClick={capturePhoto}
                        className="capture-btn"
                        disabled={!isStreaming}
                    >
                        📸 Capture Photo
                    </button>
                    <button onClick={handleClose} className="cancel-btn">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCaptureModal;
