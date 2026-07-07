const DoodleToolbar = ({
  tool,
  setTool,
  handleUndo,
  handleRedo,
  handleCanvasClear,
}) => {
  const colors = [
    "white",
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "pink",
    "black",
    "maroon",
    "lilac",
    "lavender",
    "purple",
  ];
  const brushSizes = [2, 4, 8, 16, 32, 128];

  return (
    <main>
      <div>
        {brushSizes.map((size) => (
          <button
            key={size}
            onClick={() =>
              setTool({
                ...tool,
                brushSize: size,
              })
            }
          >
            {size}
          </button>
        ))}
      </div>
      <div>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() =>
              setTool({
                ...tool,
                color,
              })
            }
            style={{
              backgroundColor: color,
              width: "30px",
              height: "30px",
              border: "1px solid white",
              margin: "5px",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <button
        onClick={() =>
          setTool({
            ...tool,
            mode: "draw",
          })
        }
      >
        Draw
      </button>

      <button
        onClick={() =>
          setTool({
            ...tool,
            mode: "erase",
          })
        }
      >
        Eraser
      </button>

  <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
  <button onClick={handleCanvasClear}>Clear Doodle</button>
    </main>
  );
};
export default DoodleToolbar;
