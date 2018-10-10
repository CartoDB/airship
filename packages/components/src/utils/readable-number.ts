/**
 *  Convert long numbers to
 *  readizable numbers.
 *
 *  Ex: 1200 -> 1.2K
 */
export default function (value): string {
  const roundedNumber = Math.abs(Math.ceil(value * 100) / 100);
  const prefix = value < 0 ? '-' : '';

  if (roundedNumber >= 1000000000) {
    return `${prefix}${(roundedNumber / 1000000000).toFixed(1)}G`;
  }
  if (roundedNumber >= 1000000) {
    return `${prefix}${(roundedNumber / 1000000).toFixed(1)}M`;
  }
  if (roundedNumber >= 1000) {
    return `${prefix}${(roundedNumber / 1000).toFixed(1)}K`;
  }

  return `${roundedNumber}`;
}
