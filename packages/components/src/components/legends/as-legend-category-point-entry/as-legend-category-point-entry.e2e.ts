import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-legend-category-point-entry', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    it('basic points', async () => {
      page = await newE2EPage({ html: `
        <as-legend-category-point-entry>
        </as-legend-category-point-entry>
      ` });

      const element = await page.find('as-legend-category-point-entry');
      element.setProperty('label', 'Hello there');
      element.setProperty('color', '#FABADA');
      element.setProperty('strokeColor', '#C0C1D0');
      element.setProperty('strokeStyle', 'dashed');
      element.setProperty('width', '16');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('markers', async () => {
      page = await newE2EPage({ html: `
        <as-legend-category-point-entry>
        </as-legend-category-point-entry>
      ` });

      const element = await page.find('as-legend-category-point-entry');
      element.setProperty('label', 'Hello there');
      element.setProperty('color', '#FABADA');
      element.setProperty('strokeColor', '#C0C1D0');
      element.setProperty('strokeStyle', 'dashed');
      element.setProperty('marker', 'wadus.svg');
      element.setProperty('width', '16');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
