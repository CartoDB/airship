import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-legend-category-polygon-entry', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    it('basic polygons', async () => {
      page = await newE2EPage({ html: `
        <as-legend-category-polygon-entry>
        </as-legend-category-polygon-entry>
      ` });

      const element = await page.find('as-legend-category-polygon-entry');
      element.setProperty('label', 'Hello there');
      element.setProperty('color', '#FABADA');
      element.setProperty('strokeColor', '#C0C1D0');
      element.setProperty('strokeStyle', 'dashed');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
