import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LegendCategoryLineEntry } from './as-legend-category-line-entry';

describe('as-legend-category-line-entry', () => {
  describe('Rendering', () => {
    let page: SpecPage;

    it('should render label and color, with 1.5px solid style by default', async () => {
      page = await newSpecPage({
        components: [LegendCategoryLineEntry],
        html: `<as-legend-category-line-entry></as-legend-category-line-entry>`
      });

      const element = page.root;
      element.label = 'Hello there';
      element.color = '#FABADA';
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should support custom stroke width', async () => {
      page = await newSpecPage({
        components: [LegendCategoryLineEntry],
        html: `<as-legend-category-line-entry></as-legend-category-line-entry>`
      });

      const element = page.root;
      element.label = 'Hello there';
      element.color = '#FABADA';
      element.width = '10';
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should support custom stroke style', async () => {
      page = await newSpecPage({
        components: [LegendCategoryLineEntry],
        html: `<as-legend-category-line-entry></as-legend-category-line-entry>`
      });

      const element = page.root;
      element.label = 'Hello there';
      element.color = '#FABADA';
      element.strokeStyle = 'dotted';
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
