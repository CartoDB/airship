/**
 * Clamp a value between a min and max value
 */
export default function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
