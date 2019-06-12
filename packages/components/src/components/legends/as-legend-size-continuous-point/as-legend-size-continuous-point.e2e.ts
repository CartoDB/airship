import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-legend-size-continuous-point', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    it('basic', async () => {
      page = await newE2EPage({ html: `
        <as-legend-size-continuous-point>
        </as-legend-size-continuous-point>
      ` });

      const element = await page.find('as-legend-size-continuous-point');
      element.setProperty('data', [{
        label: 'point label',
        width: 10,
      },
      {
        label: 'line label',
        width: 12,
      },
      {
        label: 'polygon label',
        width: 14,
      }]);
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('basic horizontal', async () => {
      page = await newE2EPage({ html: `
        <as-legend-size-continuous-point>
        </as-legend-size-continuous-point>
      ` });

      const element = await page.find('as-legend-size-continuous-point');
      element.setProperty('data', [{
        label: 'point label',
        width: 10,
      },
      {
        label: 'line label',
        width: 12,
      },
      {
        label: 'polygon label',
        width: 14,
      }]);
      element.setProperty('orientation', 'horizontal');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
