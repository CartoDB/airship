/**
 * Check if a value is an object
 */
export default function isObject(value) {
  return value !== null && typeof value === 'object';
}
