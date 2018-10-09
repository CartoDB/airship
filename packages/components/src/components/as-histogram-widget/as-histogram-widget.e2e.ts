import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-histogram-widget', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: '<as-histogram-widget></as-histogram-widget>' });
  });

  describe('Rendering', () => {
    it('should render properly', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('heading', 'Histogram Widget Example');
      element.setProperty('description', 'Description for Histogram Widget');
      element.setProperty('showClear', true);
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should not render header when showHeader is false', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('heading', 'Histogram Widget Example');
      element.setProperty('description', 'Description for Histogram Widget');
      element.setProperty('showHeader', false);
      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should render clear button', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', true);
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should render selection properly', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      element.callMethod('setSelection', [[0, 20]]);
      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should render colors properly', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('color', '#FFAAAA');
      element.setProperty('selectedColor', '#EEFFFF');
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      await element.callMethod('setSelection', [[0, 20]]);

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });
  });

  describe('Behaviour', () => {
    it('should emit an event with the selected range', async () => {
      const selectionChangedSpy = await page.spyOnEvent('selectionChanged');

      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      await element.callMethod('setSelection', [0, 20]);
      await page.waitForChanges();

      expect(selectionChangedSpy).toHaveReceivedEventDetail([0, 20]);
    });

    it('should clear the selection', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      element.callMethod('setSelection', [0, 20]);

      const currentSelection = await element.callMethod('getSelection');
      expect(currentSelection).toEqual([0, 20]);

      element.callMethod('clearSelection');

      const newSelection = await element.callMethod('getSelection');
      expect(newSelection).toEqual(null);
    });

    it('should adjust the selection to the closest buckets', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      element.callMethod('setSelection', [4, 22]);

      const currentSelection = await element.callMethod('getSelection');
      expect(currentSelection).toEqual([0, 20]);
    });
  });
});

const histogramData = [
  { start: 0, end: 10, value: 5 },
  { start: 10, end: 20, value: 10 },
  { start: 20, end: 30, value: 15 },
  { start: 30, end: 40, value: 20 },
];
