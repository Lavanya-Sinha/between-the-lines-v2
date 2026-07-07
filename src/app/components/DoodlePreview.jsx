"use client";
import { useRef, useEffect } from "react";
import { replayCanvas } from "@/lib/canvas/replayCanvas";

const DoodlePreview = ({ canvasData }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const canvasBackground = "black";
  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
    ctxRef.current.lineCap = "round";
    ctxRef.current.lineJoin = "round";

    const scaleX = canvas.width / 700;
    const scaleY = canvas.height / 500;

    ctxRef.current.save();
    ctxRef.current.scale(scaleX, scaleY);

    replayCanvas(ctxRef.current, canvasData, canvasBackground);
     ctxRef.current.restore();
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={120}
      style={{ border: "1px solid white", backgroundColor: canvasBackground, }}
    />
  );
};
export default DoodlePreview;
