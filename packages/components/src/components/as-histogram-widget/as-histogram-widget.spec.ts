import { HistogramWidget } from './as-histogram-widget';

describe('as-histogram-widget', () => {
  let histogramWidget;

  beforeEach(() => {
    histogramWidget = new HistogramWidget();
  });

  it('should build', () => {
    expect(histogramWidget).toBeTruthy();
  });
});
