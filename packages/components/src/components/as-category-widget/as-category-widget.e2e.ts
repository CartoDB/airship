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

  describe('Rendering', async () => {
    it('should render properly', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('heading', 'Category Widget Example');
      element.setProperty('description', 'Description for Category Widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('showClearButton', true);

      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should not render header when showHeader is false', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('heading', 'Category Widget Example');
      element.setProperty('description', 'Description for Category Widget');
      element.setProperty('showHeader', false);

      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should render clear button', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('showClearButton', true);
      element.setProperty('categories', exampleCategories);

      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should render bars according to total value', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('useTotalPercentage', true);

      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should format display value when formatValue prop is present', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('valueFormatter', (value) => `${value}€`);

      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });
  });

  describe('Behaviour', async () => {
    it('should emit an event containing selected categories when a new category is selected', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);

      await page.waitForChanges();

      const categoriesSelectedSpy = await page.spyOnEvent('categoriesSelected');

      const categoryElement = await page.find('.as-category-widget__category');
      categoryElement.click();

      await page.waitForChanges();

      expect(categoriesSelectedSpy).toHaveReceivedEventDetail([exampleCategories[0].name]);
    });

    it('should emit an event containing selected categories when categories are cleared', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('showClearButton', true);

      await page.waitForChanges();

      const categoryElement = await page.find('.as-category-widget__category');
      categoryElement.click();

      await page.waitForChanges();

      const categoriesSelectedSpy = await page.spyOnEvent('categoriesSelected');

      const clearButton = await page.find('.as-category-widget__clear');
      clearButton.click();

      await page.waitForChanges();

      expect(categoriesSelectedSpy).toHaveReceivedEventDetail([]);
    });

    it('should clear the selectedCategories when the category list is changed', async () => {
      const element: E2EElement = await page.find('as-category-widget');
      element.setProperty('categories', exampleCategories);
      element.setProperty('showClearButton', true);

      await page.waitForChanges();

      const categoryElement = await page.find('.as-category-widget__category');
      categoryElement.click();
      await page.waitForChanges();

      const firstResult = await element.callMethod('getSelectedCategories');
      expect(firstResult).toEqual([exampleCategories[0].name]);

      element.setProperty('categories', [{ name: 'foo', value: 10 }]);
      await page.waitForChanges();

      const secondResult = await element.callMethod('getSelectedCategories');
      expect(secondResult).toEqual([]);
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
