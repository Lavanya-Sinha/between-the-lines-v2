"use client";

import { useEffect, useState, useRef } from "react";

import CreateDoodle from "@/app/actions/CreateDoodle";
import UpdateDoodle from "@/app/actions/UpdateDoodle";
import DeleteDoodle from "@/app/actions/DeleteDoodle";

import { drawLine, replayCanvas } from "@/lib/canvas/replayCanvas";
import simplifyCanvas from "@/lib/canvas/simplifyCanvas";

import DoodleToolbar from "@/app/components/DoodleToolbar";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";

const DoodleClient = ({ doodle, quoteId, id }) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const previousPointRef = useRef(null);
    const strokeRef = useRef([]);
    const redoRef = useRef([]);

    const [isDrawing, setIsDrawing] = useState(false);

    const canvasBackground = "black";

    const [tool, setTool] = useState({
        color: "white",
        brushSize: 4,
        mode: "draw",
    });

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleUndo = () => {
        if (strokeRef.current.length === 0) {
            return;
        }

        const lastStroke = strokeRef.current.pop();

        redoRef.current.push(lastStroke);

        clearCanvas();

        replayCanvas(
            ctxRef.current,
            strokeRef.current,
            canvasBackground
        );
    };

    const handleRedo = () => {
        if (redoRef.current.length === 0) {
            return;
        }

        const lastRedoStroke = redoRef.current.pop();

        strokeRef.current.push(lastRedoStroke);

        clearCanvas();

        replayCanvas(
            ctxRef.current,
            strokeRef.current,
            canvasBackground
        );
    };

    const getMousePosition = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

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
        if (!isDrawing) {
            return;
        }

        const currentPoint = getMousePosition(event);

        ctxRef.current.strokeStyle =
            tool.mode === "erase"
                ? canvasBackground
                : tool.color;

        ctxRef.current.lineWidth = tool.brushSize;

        drawLine(
            ctxRef.current,
            previousPointRef.current,
            currentPoint
        );

        previousPointRef.current = currentPoint;

        const currentStroke =
            strokeRef.current[
                strokeRef.current.length - 1
            ];

        currentStroke.points.push(currentPoint);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);

        previousPointRef.current = null;
    };

    const handleCanvasClear = () => {
        clearCanvas();

        strokeRef.current = [];

        redoRef.current = [];
    };

    const handleCanvasSave = async () => {
        const EPSILON = 0.5;

        const optimizedCanvas = simplifyCanvas(
            strokeRef.current,
            EPSILON
        );

        if (doodle) {
            await UpdateDoodle(
                doodle.id,
                optimizedCanvas
            );

            return;
        }

        await CreateDoodle(
            quoteId,
            optimizedCanvas
        );
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        ctxRef.current = canvas.getContext("2d");

        ctxRef.current.lineWidth = tool.brushSize;
        ctxRef.current.lineCap = "round";
        ctxRef.current.lineJoin = "round";
        ctxRef.current.strokeStyle = tool.color;

        if (doodle) {
            strokeRef.current = doodle.canvas_data;

            replayCanvas(
                ctxRef.current,
                doodle.canvas_data,
                canvasBackground
            );
        }
    }, [doodle]);

    return (
        <main className="flex flex-col gap-6">
            <DoodleToolbar
                tool={tool}
                setTool={setTool}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                handleCanvasClear={handleCanvasClear}
            />

            <Card className="overflow-hidden p-6">
                <canvas
                    ref={canvasRef}
                    width={700}
                    height={500}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    style={{
                        border: "1px solid var(--border)",
                        backgroundColor: canvasBackground,
                        width: "100%",
                        maxWidth: "700px",
                        display: "block",
                        margin: "0 auto",
                    }}
                />
            </Card>

            <div className="flex flex-wrap gap-4">
                <Button onClick={handleCanvasSave}>
                    Save Doodle
                </Button>

                {doodle && (
                    <form action={DeleteDoodle}>
                        <input
                            type="hidden"
                            name="id"
                            value={id}
                        />

                        <input
                            type="hidden"
                            name="quoteId"
                            value={quoteId}
                        />

                        <Button variant="danger">
                            Delete Doodle
                        </Button>
                    </form>
                )}
            </div>
        </main>
    );
};

export default DoodleClient;
