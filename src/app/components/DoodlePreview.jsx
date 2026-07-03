"use client";
import { useRef, useEffect } from "react";
import { replayCanvas } from "@/lib/canvas/replayCanvas";

const DoodlePreview = ({ canvasData }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
    ctxRef.current.lineWidth = 4;
    ctxRef.current.lineCap = "round";
    ctxRef.current.strokeStyle = "white";
    ctxRef.current.lineJoin = "round";

    const scaleX = canvas.width / 700;
    const scaleY = canvas.height / 500;

    ctxRef.current.save();
    ctxRef.current.scale(scaleX, scaleY);

    replayCanvas(ctxRef.current, canvasData);
     ctxRef.current.restore();
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={120}
      style={{ border: "1px solid white" }}
    />
  );
};
export default DoodlePreview;
