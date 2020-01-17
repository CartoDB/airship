import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { WidgetHeader } from '../../common/as-widget-header/as-widget-header';
import { Legend } from './as-legend';

describe('as-legend', () => {
  describe('Rendering', () => {
    let page: SpecPage;

    it('should render a heading and description', async () => {
      page = await newSpecPage({
        components: [Legend, WidgetHeader],
        html: `<as-legend heading="Heading" description="Description"></as-legend>`
      });

      const element = page.root;
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render the heading element if no heading and description are provided', async () => {
      page = await newSpecPage({
        components: [Legend],
        html: `<as-legend></as-legend>`
      });

      const element = page.root.querySelectorAll('as-widget-header');
      expect(element.length).toBe(0);
    });

    it('should not render content if loading', async () => {
      page = await newSpecPage({
        components: [Legend],
        html: `<as-legend loading></as-legend>`
      });

      const element = page.root;
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should support a slot for legends', async () => {
      page = await newSpecPage({
        components: [Legend],
        html: `<as-legend><span slot="legends">Legend</span></as-legend>`
      });

      const element = page.root;
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should support a slot for the footer', async () => {
      page = await newSpecPage({
        components: [Legend],
        html: `<as-legend><span slot="footer">Footer</span></as-legend>`
      });

      const element = page.root;
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
