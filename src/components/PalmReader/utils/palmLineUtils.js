// utils/palmLineUtils.js
export const getDefaultLines = (width = 600, height = 400) => ({
    life: {
        points: [
            { x: width * 0.25, y: height * 0.35 },
            { x: width * 0.20, y: height * 0.55 },
            { x: width * 0.23, y: height * 0.75 }
        ],
        color: '#e74c3c',
        name: 'Life Line',
        visible: true
    },
    heart: {
        points: [
            { x: width * 0.15, y: height * 0.25 },
            { x: width * 0.45, y: height * 0.20 },
            { x: width * 0.70, y: height * 0.22 }
        ],
        color: '#e91e63',
        name: 'Heart Line',
        visible: true
    },
    head: {
        points: [
            { x: width * 0.25, y: height * 0.32 },
            { x: width * 0.50, y: height * 0.35 },
            { x: width * 0.70, y: height * 0.40 }
        ],
        color: '#3f51b5',
        name: 'Head Line',
        visible: true
    },
    fate: {
        points: [
            { x: width * 0.50, y: height * 0.80 },
            { x: width * 0.52, y: height * 0.55 },
            { x: width * 0.54, y: height * 0.30 }
        ],
        color: '#9c27b0',
        name: 'Fate Line',
        visible: true
    }
});

export const calculateLineLength = (points) => {
    let length = 0;
    for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i-1].x;
        const dy = points[i].y - points[i-1].y;
        length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
};

export const calculateCurvature = (points) => {
    if (points.length < 3) return 0;

    const start = points[0];
    const end = points[points.length - 1];
    const middle = points[Math.floor(points.length / 2)];

    const lineLength = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );

    if (lineLength === 0) return 0;

    const distanceToLine = Math.abs(
        (end.y - start.y) * middle.x - (end.x - start.x) * middle.y +
        end.x * start.y - end.y * start.x
    ) / lineLength;

    return distanceToLine / lineLength;
};