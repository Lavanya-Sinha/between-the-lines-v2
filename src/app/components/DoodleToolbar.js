import Button from "./ui/Button";
import Card from "./ui/Card";

const DoodleToolbar = ({
    tool,
    setTool,
    handleUndo,
    handleRedo,
    handleCanvasClear,
}) => {
    const colors = [
        "#ffffff",
        "#ef4444",
        "#3b82f6",
        "#22c55e",
        "#eab308",
        "#f97316",
        "#ec4899",
    ];

    const brushSizes = [2, 4, 8, 16, 32, 128];

    return (
        <Card className="flex flex-col gap-6 p-6">

            <div className="flex flex-col gap-2">

                <h3
                    style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-weight-semibold)",
                    }}
                >
                    Brush size
                </h3>

                <div className="flex flex-wrap gap-2">

                    {brushSizes.map((size) => (
                        <Button
                            key={size}
                            type="button"
                            variant={
                                tool.brushSize === size
                                    ? "primary"
                                    : "ghost"
                            }
                            onClick={() =>
                                setTool({
                                    ...tool,
                                    brushSize: size,
                                })
                            }
                        >
                            {size}
                        </Button>
                    ))}

                </div>

            </div>

            <div className="flex flex-col gap-2">

                <h3
                    style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-weight-semibold)",
                    }}
                >
                    Colors
                </h3>

                <div className="flex flex-wrap gap-3">

                    {colors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() =>
                                setTool({
                                    ...tool,
                                    color,
                                })
                            }
                            className="
                                h-10
                                w-10
                                rounded-full
                                border-2
                                transition-all
                                cursor-pointer
                            "
                            style={{
                                backgroundColor: color,

                                borderColor:
                                    tool.color === color
                                        ? "var(--primary)"
                                        : "var(--border)",

                                boxShadow: "var(--shadow-sm)",

                                transitionDuration:
                                    "var(--motion-fast)",

                                transitionTimingFunction:
                                    "var(--motion-easing)",
                            }}
                        />
                    ))}

                </div>

            </div>

            <div className="flex flex-wrap gap-3">

                <Button
                    type="button"
                    variant={
                        tool.mode === "draw"
                            ? "primary"
                            : "ghost"
                    }
                    onClick={() =>
                        setTool({
                            ...tool,
                            mode: "draw",
                        })
                    }
                >
                    ✏️ Draw
                </Button>

                <Button
                    type="button"
                    variant={
                        tool.mode === "erase"
                            ? "primary"
                            : "ghost"
                    }
                    onClick={() =>
                        setTool({
                            ...tool,
                            mode: "erase",
                        })
                    }
                >
                    🧽 Erase
                </Button>

            </div>

            <div className="flex flex-wrap gap-3">

                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleUndo}
                >
                    ↶ Undo
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleRedo}
                >
                    ↷ Redo
                </Button>

                <Button
                    type="button"
                    variant="danger"
                    onClick={handleCanvasClear}
                >
                    Clear
                </Button>

            </div>

        </Card>
    );
};

export default DoodleToolbar;
