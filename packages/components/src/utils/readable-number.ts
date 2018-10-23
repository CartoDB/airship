/**
 *  Convert long numbers to
 *  readizable numbers.
 *
 *  Ex: 1200 -> 1.2K
 */
export default function (value): string {
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

  return `${roundedNumber}`.padStart(5);
}
