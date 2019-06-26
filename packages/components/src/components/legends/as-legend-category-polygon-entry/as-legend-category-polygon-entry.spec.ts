import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LegendColorCategoryPolygonEntry } from './as-legend-category-polygon-entry';

describe('as-legend-category-polygon-entry', () => {
  describe('Rendering', () => {
    let page: SpecPage;

    it('basic polygons', async () => {
      page = await newSpecPage({
        components: [LegendColorCategoryPolygonEntry],
        html: `<as-legend-category-polygon-entry></as-legend-category-polygon-entry>`
      });

      const element = page.root;
      element.label = 'Hello there';
      element.color = '#FABADA';
      element.strokeColor = '#C0C1D0';
      element.strokeStyle = 'dashed';
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
