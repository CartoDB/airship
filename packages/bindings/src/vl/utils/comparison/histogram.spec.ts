import { isHistogramEqual } from './histogram';

const hist1: VLHistogramData[] = [
  {
    x: [0, 10],
    y: 30
  },
  {
    x: [10, 20],
    y: 40
  }
];

describe('vl/utils/comparison/histogram', () => {
  it('should detect equal histograms', () => {
    expect(isHistogramEqual(hist1, hist1)).toBe(true);
  });

  it('should detect histograms of different length as different', () => {
    // Test for different length
    expect(isHistogramEqual(hist1, hist1.slice(0, 1))).toBe(false);
  });

  it('should detect non-equal histograms through content', () => {
    // Test for different content
    expect(isHistogramEqual(hist1, [hist1[1], hist1[0]])).toBe(false);
  });
});
