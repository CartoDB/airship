import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-range-slider-bar', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
      <as-range-slider-bar></as-range-slider-bar>
    `);
  });

  describe('Rendering', () => {
    it('should render a bar with its values', async () => {
      const element = await page.find('as-range-slider-bar');
      element.setProperty('rangeStartPercentage', 20);
      element.setProperty('rangeEndPercentage', 80);
      element.setProperty('stepPercentage', 10);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
