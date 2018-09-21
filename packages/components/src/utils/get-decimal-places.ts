export default function getDecimalPlaces(decimalNumber): number {
  // Copied this method from: https://bit.ly/2DfxbfQ

  function hasFraction(numberToCheck) {
    return Math.abs(Math.round(numberToCheck) - numberToCheck) > 1e-10;
  }

  let count = 0;
  // multiply by increasing powers of 10 until the fractional part is ~ 0
  while (hasFraction(decimalNumber * (10 ** count)) && isFinite(10 ** count)) {
    count++;
  }

  return count;
}
