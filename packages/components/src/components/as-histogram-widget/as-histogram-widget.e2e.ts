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

    it('should not render clear button when the showClear attribute is false', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', false);
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      const actual = await page.find('.as-histogram-widget__clear');

      expect(actual).toBeFalsy();
    });

    it('should render clear button when the showCelar attribute is true', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', true);
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      const actual = await page.find('.as-histogram-widget__clear');

      expect(actual).not.toBeFalsy();
    });

    it('should render clear button disabled if no selection is present', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', true);
      element.setProperty('data', histogramData);
      await page.waitForChanges();

      const actual = await page.find('.as-histogram-widget__clear');

      expect(actual).not.toBeFalsy();
      expect(actual.getAttribute('disabled')).not.toBeUndefined();
    });

    it('should render clear button enabled if there is a selection', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', true);
      element.setProperty('data', histogramData);
      element.callMethod('setSelection', [0, 10]);
      await page.waitForChanges();

      const actual = await page.find('.as-histogram-widget__clear');

      expect(actual).not.toBeFalsy();
      expect(actual.getAttribute('disabled')).toBeNull();
    });

    it('should render custom clear button text', async () => {
      const element: E2EElement = await page.find('as-histogram-widget');
      element.setProperty('showClear', true);
      element.setProperty('clearText', 'Radio Gaga');
      element.setProperty('data', histogramData);
      element.callMethod('setSelection', [0, 10]);
      await page.waitForChanges();

      const actual = await page.find('.as-histogram-widget__clear');

      expect(actual.innerText).toEqual('Radio Gaga');
    });
  });
});

const histogramData = [
  { start: 0, end: 10, value: 5 },
  { start: 10, end: 20, value: 10 },
  { start: 20, end: 30, value: 15 },
  { start: 30, end: 40, value: 20 },
];
