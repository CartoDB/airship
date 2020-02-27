import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-range-slider', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
      <as-range-slider></as-range-slider>
    `);
  });

  describe('Rendering', () => {
    it('should render without parameters, using defaults', async () => {
      await page.waitForChanges();

      const element = await page.find('as-range-slider');
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render 1 thumb + 1 bar when using a value', async () => {
      const element = await page.find('as-range-slider');
      element.setProperty('value', 5);
      element.setProperty('minValue', 0);
      element.setProperty('maxValue', 10);
      element.setProperty('step', 1);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render 2 thumbs + 1 bar when using a range', async () => {
      const element = await page.find('as-range-slider');
      element.setProperty('range', [2, 4]);
      element.setProperty('minValue', 2);
      element.setProperty('maxValue', 20);
      element.setProperty('step', 2);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should show collapsed range label when labels collapse', async () => {
      const element = await page.find('as-range-slider');
      element.setProperty('minValue', 1000);
      element.setProperty('maxValue', 2000);
      element.setProperty('range', [1510, 1512]);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should set ".as-range-slider__rail-label__overflow--left" when range label overlaps left edge', async () => {
      const element = await page.find('as-range-slider');
      element.setProperty('minValue', 1000);
      element.setProperty('maxValue', 2000);
      element.setProperty('range', [1000, 1002]);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should set ".as-range-slider__rail-label__overflow--right" when range label overlaps right edge', async () => {
      const element = await page.find('as-range-slider');
      element.setProperty('minValue', 1000);
      element.setProperty('maxValue', 2000);
      element.setProperty('range', [1998, 2000]);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('can be rendered disabled', async () => {
      const element = await page.find('as-range-slider');
      element.setProperty('disabled', true);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
