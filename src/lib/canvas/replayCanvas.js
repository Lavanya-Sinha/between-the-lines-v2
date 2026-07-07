//helper canvas functions

export const drawLine = (ctx, startPoint, endPoint) => {
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.stroke();
};

export const replayCanvas = (ctx, canvasData, canvasBackground) => {
  console.log("Replay", canvasData);
  for (const stroke of canvasData) {
    ctx.strokeStyle = stroke.mode === "erase" ? canvasBackground : stroke.color;

    ctx.lineWidth = stroke.brushSize;

    const points = stroke.points;
    for (let i = 1; i < points.length; i++) {
      drawLine(ctx, points[i - 1], points[i]);
    }
  }
};
