// hooks/usePalmCanvas.js
import { useCallback, useEffect } from 'react';
import { resizeCanvas, drawPalmCanvas } from '../utils/canvasUtils';

export const usePalmCanvas = (canvasRef, image, lines, showLines) => {
    const draw = useCallback(() => {
        drawPalmCanvas(canvasRef.current, image, lines, showLines);
    }, [image, showLines, lines]);

    // Resize canvas when image loads
    useEffect(() => {
        if (image && canvasRef.current) {
            resizeCanvas(canvasRef.current, image);
        }
    }, [image]);

    return { draw };
};