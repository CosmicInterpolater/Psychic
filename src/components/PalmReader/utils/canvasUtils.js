// utils/canvasUtils.js
export const resizeCanvas = (canvas, img) => {
    if (!canvas || !img) return;

    const maxWidth = 600;
    const maxHeight = 600;

    let { width, height } = img;

    const scaleX = maxWidth / width;
    const scaleY = maxHeight / height;
    const scale = Math.min(scaleX, scaleY);

    width *= scale;
    height *= scale;

    canvas.width = width;
    canvas.height = height;
};

export const drawPalmCanvas = (canvas, image, lines, showLines) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#666';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Upload a palm photo to begin analysis', canvas.width / 2, canvas.height / 2);
    }

    if (showLines && image) {
        drawLines(ctx, lines);
    }
};

const drawLines = (ctx, lines) => {
    Object.values(lines).forEach(line => {
        if (!line.visible) return;

        ctx.strokeStyle = line.color;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 2;

        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);

        for (let i = 1; i < line.points.length; i++) {
            if (i === line.points.length - 1) {
                ctx.lineTo(line.points[i].x, line.points[i].y);
            } else {
                const xc = (line.points[i].x + line.points[i + 1].x) / 2;
                const yc = (line.points[i].y + line.points[i + 1].y) / 2;
                ctx.quadraticCurveTo(line.points[i].x, line.points[i].y, xc, yc);
            }
        }

        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw control points
        line.points.forEach(point => {
            ctx.fillStyle = line.color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    });
};