/**
 *  Convert long numbers to
 *  readizable numbers.
 *
 *  Ex: 1200 -> 1.2K
 */
export default function(value): string {
  const roundedNumber = Math.abs(Math.ceil(value * 100) / 100);

  if (roundedNumber >= 1000000000) {
    return `${(roundedNumber / 1000000000).toFixed(1)}G`.padStart(5);
  }
  if (roundedNumber >= 1000000) {
    return `${(roundedNumber / 1000000).toFixed(1)}M`.padStart(5);
  }
  if (roundedNumber >= 1000) {
    return `${(roundedNumber / 1000).toFixed(1)}K`.padStart(5);
  }

  const roundedStr = `${roundedNumber}`;

  // This seems backwards but it's an Edge issue.
  // padStart(5) looks weird for 0 - 9, looks better with padStart(8)
  // 10 - 99 looks better with padStart(7)
  return roundedStr.padStart(6 + Math.abs(roundedStr.length - 3));
}
