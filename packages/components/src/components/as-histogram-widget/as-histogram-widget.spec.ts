import { TestWindow } from '@stencil/core/dist/testing';
import { HistogramWidget } from './as-histogram-widget';
import { histogram } from 'd3';

describe('as-category-widget', () => {
  let histogramWidget;

  beforeEach(() => {
    histogramWidget = new HistogramWidget();
  });histogramWidget

  it('should build', () => {
    expect(histogramWidget).toBeTruthy();
  });

  describe('Rendering', () => {
    let element: HTMLAsHistogramWidgetElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [HistogramWidget],
        html: '<as-histogram-widget></as-histogram-widget>'
      });
    });

    it('should render properly', async () => {
      element.heading = 'Histogram Widget Example';
      element.description = 'Description for Histogram Widget';
      element.showClear = true;
      await testWindow.flush();

      element.data = histogramData;
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('should not render header when showHeader is false', async () => {
      element.heading = 'Histogram Widget Example';
      element.description = 'Description for Histogram Widget';
      element.showHeader = false;
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('should render clear button', async () => {
      element.showClear = true;
      await testWindow.flush();

      element.data = histogramData;
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });
  });

  describe('Behaviour', () => {
    let element: HTMLAsHistogramWidgetElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [HistogramWidget],
        html: '<as-histogram-widget></as-histogram-widget>'
      });
    });

    it('should emit an event with the selected range', async () => {
      const selectionChanged = jest.fn();
      element.addEventListener('selectionChanged', selectionChanged);
      element.data = histogramData;
      await testWindow.flush();

      element.setSelection([0, 20]);

      const brushElement = element.querySelector('.brush') as HTMLDivElement;
      console.log(brushElement.click);
      expect(selectionChanged).toHaveBeenCalled();
    });
  });
});

const histogramData = [
  { start: 0, end: 10, value: 5 },
  { start: 10, end: 20, value: 10 },
  { start: 20, end: 30, value: 15 },
  { start: 30, end: 40, value: 20 },
];