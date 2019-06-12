import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-legend-color-bins-polygon', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    it('basic', async () => {
      page = await newE2EPage({ html: `
        <as-legend-color-bins-polygon>
        </as-legend-color-bins-polygon>
      ` });

      const element = await page.find('as-legend-color-bins-polygon');
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
  });
});
