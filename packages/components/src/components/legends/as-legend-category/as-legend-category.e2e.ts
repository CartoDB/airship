import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-legend-category', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    it('should render mixed types of legend entries', async () => {
      page = await newE2EPage({ html: `
        <as-legend-category>
        </as-legend-category>
      ` });

      const element = await page.find('as-legend-category');
      element.setProperty('data', [{
        color: '#FF0000',
        label: 'point label',
        strokeColor: '#00FF00',
        type: 'point',
        width: 16
      },
      {
        color: '#FF0000',
        label: 'line label',
        type: 'line'
      },
      {
        color: '#FF0000',
        label: 'polygon label',
        strokeColor: '#00FF00',
        type: 'line'
      }]);
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    describe('should define a CSS variable', () => {
      it('with the max width of its children', async () => {
        page = await newE2EPage({ html: `
          <as-legend-category>
          </as-legend-category>
        ` });

        const element = await page.find('as-legend-category');
        element.setProperty('data', [{
          color: '#FF0000',
          label: 'point label',
          strokeColor: '#00FF00',
          type: 'point',
          width: 16
        },
        {
          color: '#FF0000',
          label: 'point label',
          strokeColor: '#00FF00',
          type: 'point',
          width: 32
        },
        {
          color: '#FF0000',
          label: 'point label',
          strokeColor: '#00FF00',
          type: 'point',
          width: 20
        }]);

        await page.waitForChanges();
        // CSS variables can't be accessed any other way right now
        expect(element.innerHTML).toContain('--as--basic--legend--figure-width: 32px');
      });

      it('but never below 16', async () => {
        page = await newE2EPage({ html: `
          <as-legend-category>
          </as-legend-category>
        ` });

        const element = await page.find('as-legend-category');
        element.setProperty('data', [{
          color: '#FF0000',
          label: 'point label',
          strokeColor: '#00FF00',
          type: 'point',
          width: 10
        }]);

        await page.waitForChanges();
        // CSS variables can't be accessed any other way right now
        expect(element.innerHTML).toContain('--as--basic--legend--figure-width: 16px');
      });
    });
  });
});
