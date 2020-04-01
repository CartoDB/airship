import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-legend-color-continuous-polygon', () => {
  describe('Rendering', () => {
    let page: E2EPage;

    it('basic', async () => {
      page = await newE2EPage({ html: `
        <as-legend-color-continuous-polygon>
        </as-legend-color-continuous-polygon>
      ` });

      const element = await page.find('as-legend-color-continuous-polygon');
      element.setProperty('data', [{
        color: '#FF0000',
        label: 'point label'
      },
      {
        color: '#00FF00',
        label: 'line label'
      },
      {
        color: '#0000FF',
        label: 'polygon label'
      }]);
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('basic horizontal', async () => {
      page = await newE2EPage({ html: `
        <as-legend-color-continuous-polygon>
        </as-legend-color-continuous-polygon>
      ` });

      const element = await page.find('as-legend-color-continuous-polygon');
      element.setProperty('data', [{
        color: '#FF0000',
        label: 'point label'
      },
      {
        color: '#00FF00',
        label: 'line label'
      },
      {
        color: '#0000FF',
        label: 'polygon label'
      }]);
      element.setProperty('orientation', 'horizontal');
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should contain one item less than the number of data entries', async () => {
      page = await newE2EPage({ html: `
        <as-legend-color-continuous-polygon>
        </as-legend-color-continuous-polygon>
      ` });

      const element = await page.find('as-legend-color-continuous-polygon');
      element.setProperty('data', [{
        color: '#FF0000',
        label: 'point label'
      },
      {
        color: '#00FF00',
        label: 'line label'
      },
      {
        color: '#0000FF',
        label: 'polygon label'
      }]);
      await page.waitForChanges();

      const gradients = await page.findAll('.as-legend-color-continuous-polygon--step');
      expect(gradients.length).toEqual(2);
    });
  });
});
