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

    it('should not render clear button when the showCelar attribute is false', async () => {
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
  });
});

const histogramData = [
  { start: 0, end: 10, value: 5 },
  { start: 10, end: 20, value: 10 },
  { start: 20, end: 30, value: 15 },
  { start: 30, end: 40, value: 20 },
];
