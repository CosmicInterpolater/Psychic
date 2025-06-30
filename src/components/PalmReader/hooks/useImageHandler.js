// hooks/useImageHandler.js
import { useState, useCallback } from 'react';

export const useImageHandler = () => {
    const [image, setImage] = useState(null);

    const loadImage = useCallback((file) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setImage(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }, []);

    const loadImageFromCapture = useCallback((file) => {
        // Same functionality as loadImage, but can be extended for capture-specific logic
        loadImage(file);
    }, [loadImage]);

    const clearImage = useCallback(() => {
        setImage(null);
    }, []);

    return { 
        image, 
        loadImage, 
        loadImageFromCapture,
        clearImage 
    };
};