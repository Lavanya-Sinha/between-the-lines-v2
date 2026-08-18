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

    const brushSizes = [
        2,
        4,
        8,
        16,
        32,
        128,
    ];

    const sectionHeadingStyle = {
        fontFamily:
            "var(--font-body)",

        fontSize:
            "var(--font-size-sm)",

        fontWeight:
            "var(--font-weight-semibold)",

        lineHeight:
            "var(--line-height-body)",

        color:
            "var(--text-primary)",
    };

    return (
        <Card
            className="
                flex
                flex-col
                gap-6
                p-6
            "
        >
            {/* Brush size */}

            <div
                className="
                    flex
                    flex-col
                    gap-3
                "
            >
                <h3
                    style={
                        sectionHeadingStyle
                    }
                >
                    Brush size
                </h3>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-2
                    "
                >
                    {brushSizes.map(
                        (size) => (
                            <Button
                                key={size}
                                type="button"
                                variant={
                                    tool.brushSize ===
                                    size
                                        ? "primary"
                                        : "ghost"
                                }
                                onClick={() =>
                                    setTool({
                                        ...tool,
                                        brushSize:
                                            size,
                                    })
                                }
                            >
                                {size}
                            </Button>
                        )
                    )}
                </div>
            </div>

            {/* Colors */}

            <div
                className="
                    flex
                    flex-col
                    gap-3
                "
            >
                <h3
                    style={
                        sectionHeadingStyle
                    }
                >
                    Colors
                </h3>

                <div
                    className="
                        flex
                        flex-wrap
                        gap-3
                    "
                >
                    {colors.map(
                        (color) => {
                            const isSelected =
                                tool.color ===
                                color;

                            return (
                                <button
                                    key={color}
                                    type="button"
                                    aria-label={`Select ${color} brush color`}
                                    aria-pressed={
                                        isSelected
                                    }
                                    onClick={() =>
                                        setTool({
                                            ...tool,
                                            color,
                                        })
                                    }
                                    className="
                                        h-10
                                        w-10
                                        cursor-pointer
                                        rounded-full
                                        border-2
                                        transition-all
                                    "
                                    style={{
                                        backgroundColor:
                                            color,

                                        borderColor:
                                            isSelected
                                                ? "var(--primary)"
                                                : "var(--border)",

                                        boxShadow:
                                            "var(--shadow-sm)",

                                        transitionDuration:
                                            "var(--motion-fast)",

                                        transitionTimingFunction:
                                            "var(--motion-easing)",
                                    }}
                                />
                            );
                        }
                    )}
                </div>
            </div>

            {/* Drawing mode */}

            <div
                className="
                    flex
                    flex-wrap
                    gap-3
                "
            >
                <Button
                    type="button"
                    variant={
                        tool.mode ===
                        "draw"
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
                        tool.mode ===
                        "erase"
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

            {/* History */}

            <div
                className="
                    flex
                    flex-wrap
                    gap-3
                "
            >
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
                    onClick={
                        handleCanvasClear
                    }
                >
                    Clear
                </Button>
            </div>
        </Card>
    );
};

export default DoodleToolbar;
