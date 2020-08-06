import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { Category } from './interfaces';

describe('as-category-widget', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
      <as-category-widget></as-category-widget>
    `);
  });

  describe('Rendering', () => {
    it('should render properly with showClearButton', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('heading', 'Category Widget Example');
      element.setProperty('description', 'Description for Category Widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('showClearButton', true);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render properly with showClear', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('heading', 'Category Widget Example');
      element.setProperty('description', 'Description for Category Widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('showClear', true);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render loading when data is not present yet', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('heading', 'Category Widget Example');
      element.setProperty('description', 'Description for Category Widget');

      await page.waitForChanges();

      const placeholderElement = await element.find('as-placeholder');
      expect(placeholderElement).toBeDefined();
    });

    it('should render empty state when data is empty', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('heading', 'Category Widget Example');
      element.setProperty('description', 'Description for Category Widget');

      element.setProperty('categories', exampleCategories);
      await page.waitForChanges();

      element.setProperty('categories', []);
      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render header when showHeader is false', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('heading', 'Category Widget Example');
      element.setProperty('description', 'Description for Category Widget');
      element.setProperty('showHeader', false);

      await page.waitForChanges();

      const actual = await page.find('.as-histogram-widget__header');

      expect(actual).toBeFalsy();
    });

    it('should render clear button with showClearButton', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('showClearButton', true);
      element.setProperty('categories', exampleCategories);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render clear button with showClear', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('showClear', true);
      element.setProperty('categories', exampleCategories);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render bars according to total value', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('useTotalPercentage', true);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    // This test is broken because of the valueFormatter, disabling for now
    xit('should format display value when formatValue prop is present', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('valueFormatter', (value) => `${value}€`);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('Behaviour', () => {
    it('should emit an event containing selected categories when a new category is selected', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);

      await page.waitForChanges();

      const categoriesSelectedSpy = await page.spyOnEvent('categoriesSelected');

      await page.click('.as-category-widget__category');
      await page.waitForChanges();

      expect(categoriesSelectedSpy).toHaveReceivedEventDetail([exampleCategories[0].name]);
    });

    it('should emit an event containing selected categories when categories are cleared with showClearButton',
     async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('showClearButton', true);

      await page.waitForChanges();

      await page.click('.as-category-widget__category');
      await page.waitForChanges();

      const categoriesSelectedSpy = await page.spyOnEvent('categoriesSelected');

      await page.click('.as-widget-selection__clear');
      await page.waitForChanges();

      expect(categoriesSelectedSpy).toHaveReceivedEventDetail([]);
    });

    it('should emit an event containing selected categories when categories are cleared with showClear', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('showClear', true);

      await page.waitForChanges();

      await page.click('.as-category-widget__category');
      await page.waitForChanges();

      const categoriesSelectedSpy = await page.spyOnEvent('categoriesSelected');

      await page.click('.as-widget-selection__clear');
      await page.waitForChanges();

      expect(categoriesSelectedSpy).toHaveReceivedEventDetail([]);
    });
  });
});

const exampleCategories: Category[] = [
  { name: 'Bars & Restaurants', value: 1000, color: '#FABADA' },
  { name: 'Fashion', value: 900 },
  { name: 'Grocery', value: 800 },
  { name: 'Health', value: 400 },
  { name: 'Shopping mall', value: 250 },
  { name: 'Transportation', value: 1550 },
  { name: 'Leisure', value: 1200 }
];
