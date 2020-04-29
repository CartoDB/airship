import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-histogram-widget', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: '<as-histogram-widget></as-histogram-widget>' });
  });

  describe('Rendering', () => {
    it('should not render header when showHeader is false', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('heading', 'Histogram Widget Example');
      element.setProperty('showHeader', false);
      await page.waitForChanges();

      const actual = await page.find('.as-histogram-widget__header');

      expect(actual).toBeFalsy();
    });

    it('should render loading when data is not present yet', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('heading', 'Category Widget Example');

      await page.waitForChanges();

      const placeholderElement = await element.find('as-placeholder');
      expect(placeholderElement).toBeDefined();
    });

    it('should render empty state when data is empty', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('heading', 'Category Widget Example');

      element.setProperty('data', histogramData);
      await page.waitForChanges();

      element.setProperty('data', []);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should never render clear button when the showClear attribute is false', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', false);
      element.setProperty('data', histogramData);
      // It only shows if there's a selection
      element.callMethod('setSelection', [0, 10]);
      await page.waitForChanges();

      const actual = await page.find('.as-widget-selection__clear');

      expect(actual).toBeFalsy();
    });

    it('should not render the clear button disabled if no selection is present', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', true);
      element.setProperty('data', histogramData);
      element.callMethod('setSelection', [0, 10]);
      await page.waitForChanges();

      const actual = await page.find('.as-widget-selection__clear');

      expect(actual).not.toBeFalsy();
    });

    it('should render clear button enabled if there is a selection', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', true);
      element.setProperty('data', histogramData);
      element.callMethod('setSelection', [0, 10]);
      await page.waitForChanges();

      const actual = await page.find('.as-widget-selection__clear');

      expect(actual).not.toBeFalsy();
    });

    it('should render custom clear button text', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', true);
      element.setProperty('clearText', 'Radio Gaga');
      element.setProperty('data', histogramData);
      element.callMethod('setSelection', [0, 10]);
      await page.waitForChanges();

      const actual = await page.find('.as-widget-selection__clear');

      expect(actual.innerText).toEqual('Radio Gaga');
    });

    it('should format X axis ignoring decimals and SI prefixes when range is higher than 1', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');

      element.setProperty('data', histogramDataFloatingToDecimal);
      await page.waitForChanges();

      const ticks = await page.findAll('.x-axis text');
      const ticksValues = ticks.map((tick) => tick.innerText);

      expect(ticksValues).toEqual(['-0.12', '0.88', '1.9', '2.9', '3.9']);
    });

    it('should format X axis using SI prefixes when range is lower than 1', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');

      element.setProperty('data', histogramDataFloatingToSIPrefix);
      await page.waitForChanges();

      const ticks = await page.findAll('.x-axis text');
      const ticksValues = ticks.map((tick) => tick.innerText);

      expect(ticksValues).toEqual(['120m', '320m', '520m', '710m', '910m']);
    });
  });
});

const histogramData = [
  { start: 0, end: 10, value: 5 },
  { start: 10, end: 20, value: 10 },
  { start: 20, end: 30, value: 15 },
  { start: 30, end: 40, value: 20 },
];

const histogramDataFloatingToDecimal = [
  { start: -0.1234, end: 0.1432, value: 5 },
  { start: 1.2345, end: 1.4543, value: 10 },
  { start: 2.5678, end: 2.7876, value: 15 },
  { start: 3.8901, end: 3.9081, value: 20 },
];

const histogramDataFloatingToSIPrefix = [
  { start: 0.1234, end: 0.1432, value: 5 },
  { start: 0.2345, end: 0.4543, value: 10 },
  { start: 0.5678, end: 0.7876, value: 15 },
  { start: 0.8901, end: 0.9081, value: 20 },
];