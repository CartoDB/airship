import { isNumericalHistogramEqual } from '.';

const hist1 = [
  {
    x: [0, 10] as [number, number],
    y: 30
  },
  {
    x: [10, 20] as [number, number],
    y: 40
  }
];

describe('vl/utils/comparison/histogram', () => {
  it('should detect equal histograms', () => {
    expect(isNumericalHistogramEqual({ input: '', value: hist1 }, { input: '', value: hist1 })).toBe(true);
  });

  it('should detect histograms of different length as different', () => {
    // Test for different length
    expect(isNumericalHistogramEqual({ input: '', value: hist1 }, { input: '', value: hist1.slice(0, 1) })).toBe(false);
  });

  it('should detect non-equal histograms through content', () => {
    // Test for different content
    expect(isNumericalHistogramEqual(
      { input: '', value: hist1 },
      { input: '', value: [hist1[1], hist1[0]] }
    )).toBe(false);
  });
});
