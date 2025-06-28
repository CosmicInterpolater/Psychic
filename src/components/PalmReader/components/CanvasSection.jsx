// components/CanvasSection.jsx
import React, { useCallback } from 'react';
import { useDragHandlers } from '../hooks/useDragHandlers';

const CanvasSection = ({ canvasRef, image, lines, showLines, onUpdateLinePoint }) => {
    const { handleMouseDown, handleMouseMove, handleMouseUp } = useDragHandlers(
        canvasRef,
        image,
        lines,
        showLines,
        onUpdateLinePoint
    );

    return (
        <div className="canvas-container bg-cosmic-void">
            <div className="canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    width="600"
                    height="400"
                    className="palm-canvas"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                />
            </div>
        </div>
    );
};

export default CanvasSection;