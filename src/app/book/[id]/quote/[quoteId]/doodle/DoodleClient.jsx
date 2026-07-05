"use client";

import { useEffect, useState, useRef } from "react";
import CreateDoodle from "@/app/actions/CreateDoodle";
import UpdateDoodle from "@/app/actions/UpdateDoodle";
import { drawLine, replayCanvas } from "@/lib/canvas/replayCanvas";
import { useParams } from "next/navigation";
import DeleteDoodle from "@/app/actions/DeleteDoodle";


const DoodleClient = ({doodle}) => {

  const params = useParams()
  const quoteId = params.quoteId
  const id = params.id
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const previousPointRef = useRef(null);
  const ctxRef = useRef(null);

   const getMousePosition = (event)=>{
    const rect = canvasRef.current.getBoundingClientRect()
     return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
  }
  const strokeRef = useRef([])

  const handleMouseDown = (event)=>{
     const point = getMousePosition(event);
     setIsDrawing(true)
     previousPointRef.current = point
    strokeRef.current.push({
      points : [point]
    })
  }

   const handleMouseMove = (event)=>{
   if(!isDrawing) return
   const currentPoint = getMousePosition(event)

   drawLine(ctxRef.current, previousPointRef.current,currentPoint);
    previousPointRef.current = currentPoint

    const currentStroke = strokeRef.current[strokeRef.current.length - 1]
    currentStroke.points.push(currentPoint)
  }

  const handleMouseUp = ()=>{
   setIsDrawing(false)
   previousPointRef.current = null
    console.log(strokeRef.current);
  }

  const handleCanvasClear = ()=>{
    const canvas = canvasRef.current;
     const ctx = ctxRef.current;
    ctx.clearRect(0,0, canvas.width, canvas.height)
    strokeRef.current = []
    console.log(strokeRef.current);
    
  }
 
  const handleCanvasSave = async()=>{
    if(doodle){
      await UpdateDoodle(doodle.id, strokeRef.current)
    }
    await CreateDoodle(quoteId, strokeRef.current)
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext("2d");
    ctxRef.current.lineWidth = 4
    ctxRef.current.lineCap = "round"
    ctxRef.current.strokeStyle = "white"
    ctxRef.current.lineJoin = "round"
    if(doodle){
       console.log(doodle.canvas_data);
       strokeRef.current = doodle.canvas_data;
      replayCanvas(ctxRef.current,doodle.canvas_data)
      console.log(strokeRef.current);
    }
  }, [doodle]);

  return (
    <main>
      <canvas
        ref={canvasRef}
        width={700}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid white" }}
      />
      <button onClick={handleCanvasClear}>Clear Doodle</button>
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
