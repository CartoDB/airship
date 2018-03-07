/**
 * Calculate the distance between pointA and pointB
 */
export default function distanceTo(pointA, pointB) {
  const xDiff = (pointB.x - pointA.x) ** 2;
  const yDiff = (pointB.y - pointA.y) ** 2;

  return Math.sqrt(xDiff + yDiff);
}
