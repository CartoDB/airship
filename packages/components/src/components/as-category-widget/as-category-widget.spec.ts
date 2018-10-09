import { CategoryWidget } from './as-category-widget';
import { Category } from './interfaces';

describe('as-category-widget', () => {
  let categoryWidget;

  beforeEach(() => {
    categoryWidget = new CategoryWidget();
  });

  it('should build', () => {
    expect(new CategoryWidget()).toBeTruthy();
  });

  describe('.getSelectedCategories', () => {
    it('should return selectedCategories', () => {
      const selectedCategories = ['Category 1'];
      categoryWidget.selectedCategories = selectedCategories;

      expect(categoryWidget.getSelectedCategories()).toEqual(selectedCategories);
    });
  });

  describe('.clearSelection', () => {
    beforeEach(() => {
      spyOn(categoryWidget, '_onCategoriesChanged');
    });

    it('should clear selected categories', () => {
      const selectedCategories = ['Category 1'];
      categoryWidget.selectedCategories = selectedCategories;

      categoryWidget.clearSelection();

      expect(categoryWidget.getSelectedCategories()).toEqual([]);
    });
  });

  describe('._isSelected', () => {
    it('should return true if category is selected', () => {
      const category = 'Category 1';
      categoryWidget.selectedCategories = [category];

      expect(categoryWidget._isSelected(category)).toBe(true);
    });

    it('should return false if category is not selected', () => {
      expect(categoryWidget._isSelected('Fake Category')).toBe(false);
    });
  });

  describe('._toggleCategory', () => {
    beforeEach(() => {
      spyOn(categoryWidget, '_onCategoriesChanged');
    });

    it('should select category if it is not selected', () => {
      const category = { name: 'Category 1', value: 10, color: '#000' };
      categoryWidget._toggleCategory(category);

      expect(categoryWidget.getSelectedCategories()).toEqual([category.name]);
    });

    it('should remove category if it was selected', () => {
      const category = { name: 'Category 1', value: 10, color: '#000' };
      categoryWidget.selectedCategories = [category.name];

      categoryWidget._toggleCategory(category);

      expect(categoryWidget.getSelectedCategories()).toEqual([]);
    });

    it('should not toggle category if interaction is disabled', () => {
      categoryWidget.disableInteractivity = true;

      const category = { name: 'Category 1', value: 10, color: '#000' };
      categoryWidget._toggleCategory(category);

      expect(categoryWidget.getSelectedCategories()).toEqual([]);
    });
  });

  describe('._getCategoriesMaximumValue', () => {
    it('should return maximum value of visible categories', () => {
      categoryWidget.useTotalPercentage = false;
      categoryWidget.visibleCategories = 5;

      expect(categoryWidget._getCategoriesMaximumValue(exampleCategories)).toEqual(1000);
    });
  });

  describe('._getCategoriesTotalValue', () => {
    it('should return value sum of passed categories', () => {
      expect(categoryWidget._getCategoriesTotalValue(exampleCategories)).toEqual(6100);
    });
  });

  describe('._getBarColor', () => {
    it('should return provided color if category is not selected', () => {
      expect(categoryWidget._getBarColor('#FFFFFF')).toBe('#FFFFFF');
    });

    it('should return darker color if category is selected', () => {
      expect(categoryWidget._getBarColor('#FFFFFF', { isSelected: true })).toBe('#d6d6d6');
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
