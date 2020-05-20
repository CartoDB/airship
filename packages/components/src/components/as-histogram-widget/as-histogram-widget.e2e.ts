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

    it('should format X axis using up to 2 decimals when range is higher than 1 using values with precision higher than 2', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');

      element.setProperty('data', histogramDataFloatingToDecimal);
      await page.waitForChanges();

      const ticks = await page.findAll('.x-axis text');
      const ticksValues = ticks.map((tick) => tick.innerText);

      expect(ticksValues).toEqual(['-0.12', '0.88', '1.9', '2.9', '3.9']);
    });

    it('should format X axis using up to 3 decimals when range is lower than 1 using values with precision lower than 3', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');

      element.setProperty('data', histogramDataFloatingToDecimalPrecision2);
      await page.waitForChanges();

      const ticks = await page.findAll('.x-axis text');
      const ticksValues = ticks.map((tick) => tick.innerText);

      expect(ticksValues).toEqual(['0.12', '0.32', '0.51', '0.71', '0.9']);
    });

    it('should format X axis using up to 3 decimals when range is lower than 1 using values with precision equal to 3', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');

      element.setProperty('data', histogramDataFloatingToDecimalPrecision3);
      await page.waitForChanges();

      const ticks = await page.findAll('.x-axis text');
      const ticksValues = ticks.map((tick) => tick.innerText);

      expect(ticksValues).toEqual(['0.124', '0.125', '0.126', '0.127', '0.128']);
    });

    it('should format X axis using up to 3 decimals when range is lower than 1 using values with precision higher than 3', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');

      element.setProperty('data', histogramDataFloatingToDecimalPrecision6);
      await page.waitForChanges();

      const ticks = await page.findAll('.x-axis text');
      const ticksValues = ticks.map((tick) => tick.innerText);

      expect(ticksValues).toEqual(['0.123', '0.32', '0.516', '0.712', '0.908']);
    });

    // As we define 3 decimals, d3-format reads at least 3 non-zero decimals
    it('should format X axis using 6 decimals when range is lower than 0.001 using micro values', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');

      element.setProperty('data', histogramDataFloatingToDecimalMicro);
      await page.waitForChanges();

      const ticks = await page.findAll('.x-axis text');
      const ticksValues = ticks.map((tick) => tick.innerText);

      expect(ticksValues).toEqual(['0.000123', '0.000123', '0.000124', '0.000124', '0.000124']);
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

const histogramDataFloatingToDecimalPrecision2 = [
  { start: 0.12, end: 0.14, value: 5 },
  { start: 0.23, end: 0.45, value: 10 },
  { start: 0.56, end: 0.78, value: 15 },
  { start: 0.89, end: 0.90, value: 20 },
];

const histogramDataFloatingToDecimalPrecision3 = [
  { start: 0.124, end: 0.125, value: 5 },
  { start: 0.125, end: 0.126, value: 10 },
  { start: 0.126, end: 0.127, value: 15 },
  { start: 0.127, end: 0.128, value: 20 },
];

const histogramDataFloatingToDecimalPrecision6 = [
  { start: 0.12341234, end: 0.14321432, value: 5 },
  { start: 0.23452345, end: 0.45434543, value: 10 },
  { start: 0.56785678, end: 0.78767876, value: 15 },
  { start: 0.89018901, end: 0.90819081, value: 20 },
];

const histogramDataFloatingToDecimalMicro = [
  { start: 0.0001234, end: 0.0001235, value: 5 },
  { start: 0.0001235, end: 0.0001236, value: 10 },
  { start: 0.0001236, end: 0.0001237, value: 15 },
  { start: 0.0001237, end: 0.0001238, value: 20 },
];