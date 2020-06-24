import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-formula-widget', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
      <as-formula-widget></as-formula-widget>
    `);
  });

  describe('Rendering', () => {
    it('should render properly', async () => {
      const element: E2EElement = await page.find('as-formula-widget');
      element.setProperty('heading', 'Formula Widget Example');
      element.setProperty('description', 'Description for Formula Widget');
      element.setProperty('value', 1000);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render loading when data is not present yet', async () => {
      const element: E2EElement = await page.find('as-formula-widget');
      element.setProperty('heading', 'Formula Widget Example');
      element.setProperty('description', 'Description for Formula Widget');

      await page.waitForChanges();

      const placeholderElement = await element.find('as-placeholder');
      expect(placeholderElement).toBeDefined();
    });

    it('should render empty state when data is empty', async () => {
      const element: E2EElement = await page.find('as-formula-widget');
      element.setProperty('heading', 'Formula Widget Example');
      element.setProperty('description', 'Description for Formula Widget');

      element.setProperty('value', 1000);
      await page.waitForChanges();

      element.setProperty('value', undefined);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render header when showHeader is false', async () => {
      const element: E2EElement = await page.find('as-formula-widget');
      element.setProperty('heading', 'Formula Widget Example');
      element.setProperty('description', 'Description for Formula Widget');
      element.setProperty('showHeader', false);

      await page.waitForChanges();

      const actual = await page.find('.as-histogram-widget__header');

      expect(actual).toBeFalsy();
    });
  });
});
