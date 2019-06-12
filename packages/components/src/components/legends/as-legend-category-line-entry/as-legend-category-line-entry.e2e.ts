import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-legend-category-line-entry', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    it('should render label and color, with 1.5px solid style by default', async () => {
      page = await newE2EPage({ html: `
        <as-legend-category-line-entry>
        </as-legend-category-line-entry>
      ` });

      const element = await page.find('as-legend-category-line-entry');
      element.setProperty('label', 'Hello there');
      element.setProperty('color', '#FABADA');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should support custom stroke width', async () => {
      page = await newE2EPage({ html: `
        <as-legend-category-line-entry>
        </as-legend-category-line-entry>
      ` });

      const element = await page.find('as-legend-category-line-entry');
      element.setProperty('label', 'Hello there');
      element.setProperty('color', '#FABADA');
      element.setProperty('width', '10');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should support custom stroke style', async () => {
      page = await newE2EPage({ html: `
        <as-legend-category-line-entry>
        </as-legend-category-line-entry>
      ` });

      const element = await page.find('as-legend-category-line-entry');
      element.setProperty('label', 'Hello there');
      element.setProperty('color', '#FABADA');
      element.setProperty('strokeStyle', 'dotted');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
