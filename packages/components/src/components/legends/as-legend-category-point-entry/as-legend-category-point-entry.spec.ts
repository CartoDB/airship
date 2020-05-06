import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LegendCategoryPointEntry } from './as-legend-category-point-entry';

describe('as-legend-category-point-entry', () => {
  describe('Rendering', () => {
    let page: SpecPage;

    it('basic points', async () => {
      page = await newSpecPage({
        components: [LegendCategoryPointEntry],
        html: `<as-legend-category-point-entry></as-legend-category-point-entry>`
      });

      const element = page.root;
      element.label = 'Hello there';
      element.color = '#FABADA';
      element.strokeColor = '#C0C1D0';
      element.strokeStyle = 'dashed';
      element.width = '16';
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('markers', async () => {
      page = await newSpecPage({
        components: [LegendCategoryPointEntry],
        html: `<as-legend-category-point-entry></as-legend-category-point-entry>`
      });

      const element = page.root;
      element.label = 'Hello there';
      element.color = '#FABADA';
      element.strokeColor = '#C0C1D0';
      element.strokeStyle = 'dashed';
      element.marker = 'wadus.svg';
      element.width = '16';
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
