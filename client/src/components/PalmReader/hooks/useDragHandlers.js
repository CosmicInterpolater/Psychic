// hooks/useDragHandlers.js
import { useState, useCallback } from 'react';

export const useDragHandlers = (canvasRef, image, lines, showLines, onUpdateLinePoint) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragPoint, setDragPoint] = useState(null);

    const handleMouseDown = useCallback((e) => {
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
    }, [image, showLines, lines, canvasRef]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging || !dragPoint) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = Math.max(0, Math.min(canvas.width, e.clientX - rect.left));
        const y = Math.max(0, Math.min(canvas.height, e.clientY - rect.top));

        onUpdateLinePoint(dragPoint.lineKey, dragPoint.pointIndex, { x, y });
    }, [isDragging, dragPoint, canvasRef, onUpdateLinePoint]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setDragPoint(null);
    }, []);

    return { handleMouseDown, handleMouseMove, handleMouseUp };
};