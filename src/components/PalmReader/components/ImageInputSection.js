// components/ImageInputSection.jsx
import React, { useState, useRef } from 'react';
import ImageCaptureModal from './ImageCaptureModal';
import './ImageInputSection.scss';

const ImageInputSection = ({ onImageLoad, onImageCapture, hasImage, onClearImage }) => {
    const [showCaptureModal, setShowCaptureModal] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            onImageLoad(file);
        }
        // Reset input so same file can be selected again
        event.target.value = '';
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleCaptureClick = () => {
        setShowCaptureModal(true);
    };

    const handleCaptureComplete = (file) => {
        onImageCapture(file);
        setShowCaptureModal(false);
    };

    const handleCaptureCancel = () => {
        setShowCaptureModal(false);
    };

    return (
        <div className="image-input-section">
            <div className="input-options">
                <button 
                    className="input-btn upload-btn"
                    onClick={handleUploadClick}
                    title="Upload from device"
                >
                    <span className="btn-icon">📁</span>
                    Upload Photo
                </button>

                <button 
                    className="input-btn capture-btn"
                    onClick={handleCaptureClick}
                    title="Take photo with camera"
                >
                    <span className="btn-icon">📷</span>
                    Take Photo
                </button>

                {hasImage && (
                    <button 
                        className="input-btn clear-btn"
                        onClick={onClearImage}
                        title="Clear current image"
                    >
                        <span className="btn-icon">🗑️</span>
                        Clear
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
            />

            <ImageCaptureModal
                isOpen={showCaptureModal}
                onClose={handleCaptureCancel}
                onImageCapture={handleCaptureComplete}
            />
        </div>
    );
};

export default ImageInputSection;