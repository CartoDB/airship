import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-legend', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    it('should render a heading and description', async () => {
      page = await newE2EPage({ html: `
        <as-legend heading="Heading" description="Description">
        </as-legend>
      ` });

      const element = await page.find('as-legend');
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render the heading element if no heading and description are provided', async () => {
      page = await newE2EPage({ html: `
        <as-legend>
        </as-legend>
      ` });

      const element = await page.find('as-widget-header');
      expect(element).toBeNull();
    });

    it('should not render content if loading', async () => {
      page = await newE2EPage({ html: `
        <as-legend loading>
        </as-legend>
      ` });

      const element = await page.find('as-legend');
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should support a slot for legends', async () => {
      page = await newE2EPage({ html: `
        <as-legend>
          <span slot="legends">Legend</span>
        </as-legend>
      ` });

      const element = await page.find('as-legend');
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should support a slot for the footer', async () => {
      page = await newE2EPage({ html: `
        <as-legend>
          <span slot="footer">Footer</span>
        </as-legend>
      ` });

      const element = await page.find('as-legend');
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
