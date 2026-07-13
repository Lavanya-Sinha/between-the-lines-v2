//How far is this point from the straight line connecting the stroke's start and end?

const getPerpendicularDistance = (point, start, end) => {
  const distance =
    Math.abs(
      (end.y - start.y) * point.x -
        (end.x - start.x) * point.y +
        end.x * start.y -
        end.y * start.x,
    ) / Math.sqrt((end.y - start.y) ** 2 + (end.x - start.x) ** 2);

    return distance
};
export default getPerpendicularDistance;
