// Replace the existing useEffect for mouse events with this:
useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create handler functions that will always use current state
    const handleMouseDownWrapper = (e) => handleMouseDown(e);
    const handleMouseMoveWrapper = (e) => handleMouseMove(e);
    const handleMouseUpWrapper = () => handleMouseUp();

    canvas.addEventListener('mousedown', handleMouseDownWrapper);
    canvas.addEventListener('mousemove', handleMouseMoveWrapper);
    canvas.addEventListener('mouseup', handleMouseUpWrapper);
    canvas.addEventListener('mouseleave', handleMouseUpWrapper);

    return () => {
        canvas.removeEventListener('mousedown', handleMouseDownWrapper);
        canvas.removeEventListener('mousemove', handleMouseMoveWrapper);
        canvas.removeEventListener('mouseup', handleMouseUpWrapper);
        canvas.removeEventListener('mouseleave', handleMouseUpWrapper);
    };
}, []); // Empty dependency array - only run once

// Also, make sure your handler functions use useCallback to prevent recreations:
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
}, [image, showLines, lines]);

const handleMouseMove = useCallback((e) => {
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
}, [isDragging, dragPoint]);

const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragPoint(null);
}, []);