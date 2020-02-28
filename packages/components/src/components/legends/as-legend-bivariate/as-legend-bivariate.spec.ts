import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LegendBivariate } from '../as-legend-bivariate/as-legend-bivariate';

describe('as-legend-category', () => {
  describe('Rendering', () => {
    let page: SpecPage;

    it('should render', async () => {
      page = await newSpecPage({
        components: [LegendBivariate],
        html: `<as-legend-bivariate id="bivariate-legend"></as-legend-bivariate>`
      });

      const element = page.root;

      element.colors = ['red', 'yellow', 'blue', 'green', 'orange', 'purple', 'pink', 'violet', 'silver'];
      element.labelX = 'labelX';
      element.labelY = 'labelY';
      element.numQuantiles = 3;

      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
