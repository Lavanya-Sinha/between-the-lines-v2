//Keep everything about the stroke the same... except replace its points with simplified points.

import simplifyStroke from "./simplifyStrokes";

const simplifyCanvas = (strokes, epsilon)=>{
  return strokes.map((stroke)=>({
    ...stroke,
    points : simplifyStroke(stroke.points, epsilon)
  }))
}

export default simplifyCanvas;