import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { LegendCategoryLineEntry } from '../as-legend-category-line-entry/as-legend-category-line-entry';
import { LegendCategoryPointEntry } from '../as-legend-category-point-entry/as-legend-category-point-entry';
import { LegendColorCategory } from './as-legend-category';

describe('as-legend-category', () => {
  describe('Rendering', () => {
    let page: SpecPage;

    it('should render mixed types of legend entries', async () => {
      page = await newSpecPage({
        components: [LegendColorCategory,
          LegendCategoryLineEntry,
          LegendCategoryPointEntry],
        html: `<as-legend-category></as-legend-category>`
      });

      const element = page.root;
      element.data = [{
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
      }];
      await page.waitForChanges();
      expect(element.outerHTML).toMatchSnapshot();
    });

    describe('should define a CSS variable', () => {
      it('with the max width of its children', async () => {
        page = await newSpecPage({
          components: [LegendColorCategory],
          html: `<as-legend-category></as-legend-category>`
        });

        const element = page.root;
        element.data = [{
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
        }];

        await page.waitForChanges();
        // CSS variables can't be accessed any other way right now
        expect(element.innerHTML).toContain('--as--basic--legend--figure-width: 32px');
      });

      it('but never below 16', async () => {
        page = await newSpecPage({
          components: [LegendColorCategory],
          html: `<as-legend-category></as-legend-category>`
        });

        const element = page.root;
        element.data = [{
          color: '#FF0000',
          label: 'point label',
          strokeColor: '#00FF00',
          type: 'point',
          width: 10
        }];

        await page.waitForChanges();
        // CSS variables can't be accessed any other way right now
        expect(element.innerHTML).toContain('--as--basic--legend--figure-width: 16px');
      });
    });
  });
});
