import getPerpendicularDistance from "./getPerpendicularDistance"

const simplifyStrokes = (points, epsilon)=>{
   if(points.length <= 2){
    return points
   }
   const start = points[0]
   const end = points[points.length -1]

   let maxDistance = 0
   let maxIndex = 0

   for(let i = 1; i < points.length - 1; i++){
   const distance = getPerpendicularDistance(points[i], start, end)
   if(distance > maxDistance){
      maxDistance = distance
      maxIndex = i
   }
   }

   if(maxDistance <= epsilon){
      return [start, end]
   }
   const left = points.slice(0, maxIndex + 1)
   const right = points.slice(maxIndex)

   const simplifiedLeft = simplifyStrokes(left, epsilon)
   const simplifiedRight = simplifyStrokes(right, epsilon)

   return [...simplifiedLeft, ...simplifiedRight.slice(1)]
}
export default simplifyStrokes
