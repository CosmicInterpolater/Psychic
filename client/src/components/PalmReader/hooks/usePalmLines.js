// hooks/usePalmLines.js
import { useState, useCallback, useEffect } from 'react';
import { getDefaultLines } from '../utils/palmLineUtils';

export const usePalmLines = (image, canvasRef) => {
    const [lines, setLines] = useState(getDefaultLines());

    const resetLines = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const w = canvas.width;
        const h = canvas.height;
        setLines(getDefaultLines(w, h));
    }, [image, canvasRef]);

    const updateLinePoint = useCallback((lineKey, pointIndex, newPoint) => {
        setLines(prev => ({
            ...prev,
            [lineKey]: {
                ...prev[lineKey],
                points: prev[lineKey].points.map((point, index) =>
                    index === pointIndex ? newPoint : point
                )
            }
        }));
    }, []);

    // Reset lines when image changes
    useEffect(() => {
        if (image) {
            resetLines();
        }
    }, [image, resetLines]);

    return { lines, resetLines, updateLinePoint };
};