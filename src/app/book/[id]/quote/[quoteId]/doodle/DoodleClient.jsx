"use client";

import { useEffect, useState, useRef } from "react";
import CreateDoodle from "@/app/actions/CreateDoodle";
import UpdateDoodle from "@/app/actions/UpdateDoodle";
import { drawLine, replayCanvas } from "@/lib/canvas/replayCanvas";
import DeleteDoodle from "@/app/actions/DeleteDoodle";
import DoodleToolbar from "@/app/components/DoodleToolbar";
import simplifyCanvas from "@/lib/canvas/simplifyCanvas";

const DoodleClient = ({ doodle, quoteId, id }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasBackground = "black";
  const [tool, setTool] = useState({
    color: "white",
    brushSize: 4,
    mode: "draw",
  });

  //helper for clearing canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  //undo
  const redoRef = useRef([]);
  const handleUndo = () => {
    if (strokeRef.current.length === 0) return;
    const lastStroke = strokeRef.current.pop();
    redoRef.current.push(lastStroke);
    clearCanvas();
    replayCanvas(ctxRef.current, strokeRef.current, canvasBackground);
  };

  //redo
  const handleRedo = () => {
    if (redoRef.current.length === 0) return;
    const lastRedoStroke = redoRef.current.pop();
    strokeRef.current.push(lastRedoStroke);
    clearCanvas();
    replayCanvas(ctxRef.current, strokeRef.current, canvasBackground);
  };
  const previousPointRef = useRef(null);
  const ctxRef = useRef(null);

  const getMousePosition = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };
  const strokeRef = useRef([]);

  const handleMouseDown = (event) => {
    const point = getMousePosition(event);
    setIsDrawing(true);
    redoRef.current = [];
    previousPointRef.current = point;
    strokeRef.current.push({
      color: tool.color,
      brushSize: tool.brushSize,
      mode: tool.mode,
      points: [point],
    });
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const currentPoint = getMousePosition(event);

    ctxRef.current.strokeStyle =
      tool.mode === "erase" ? canvasBackground : tool.color;
    ctxRef.current.lineWidth = tool.brushSize;
    drawLine(ctxRef.current, previousPointRef.current, currentPoint);
    previousPointRef.current = currentPoint;

    const currentStroke = strokeRef.current[strokeRef.current.length - 1];
    currentStroke.points.push(currentPoint);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    previousPointRef.current = null;
    console.log(strokeRef.current);
  };

  const handleCanvasClear = () => {
    clearCanvas();
    strokeRef.current = [];
    redoRef.current = [];
  };

  
  const handleCanvasSave = async () => {
    const EPSILON = 0.5
    const optimizedCanvas = simplifyCanvas(strokeRef.current, EPSILON)

 const originalSize = JSON.stringify(strokeRef.current).length;
const optimizedSize = JSON.stringify(optimizedCanvas).length;

console.log("Original JSON:", originalSize);
console.log("Optimized JSON:", optimizedSize);
console.log(
  `Reduction: ${(
    ((originalSize - optimizedSize) / originalSize) *
    100
  ).toFixed(2)}%`
);

    if (doodle) {
      await UpdateDoodle(doodle.id, optimizedCanvas);
      return;
    }
    await CreateDoodle(quoteId, optimizedCanvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
    ctxRef.current.lineWidth = tool.brushSize;
    ctxRef.current.lineCap = "round";
    ctxRef.current.strokeStyle = tool.color;
    ctxRef.current.lineJoin = "round";
    if (doodle) {
      console.log(doodle.canvas_data);
      strokeRef.current = doodle.canvas_data;
      replayCanvas(ctxRef.current, doodle.canvas_data, canvasBackground);
      console.log(strokeRef.current);
    }
  }, [doodle]);

  return (
    <main>
      <DoodleToolbar
        tool={tool}
        setTool={setTool}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleCanvasClear={handleCanvasClear}
      />

      <canvas
        ref={canvasRef}
        width={700}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid white", backgroundColor: canvasBackground }}
      />
      <button onClick={handleCanvasSave}>Save Doodle</button>
      {doodle && (
        <form action={DeleteDoodle}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="quoteId" value={quoteId} />
          <button type="submit">Delete Doodle</button>
        </form>
      )}
    </main>
  );
};
export default DoodleClient;
