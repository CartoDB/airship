import { TestWindow } from '@stencil/core/dist/testing';
import { CategoryWidget } from './as-category-widget';

describe('as-category-widget', () => {
  let categoryWidget;

  beforeEach(() => {
    categoryWidget = new CategoryWidget();
  });

  it('should build', () => {
    expect(new CategoryWidget()).toBeTruthy();
  });

  describe('getSelectedCategories', () => {
    it('should return selectedCategories', () => {
      const selectedCategories = ['Category 1'];
      categoryWidget.selectedCategories = selectedCategories;

      expect(categoryWidget.getSelectedCategories()).toEqual(selectedCategories);
    });
  });

  describe('clearSelection', () => {
    it('should clear selected categories', () => {
      const selectedCategories = ['Category 1'];
      categoryWidget.selectedCategories = selectedCategories;

      categoryWidget.clearSelection();

      expect(categoryWidget.getSelectedCategories()).toEqual([]);
    });
  });

  describe('_toggleCategory', () => {
    beforeEach(() => {
      spyOn(categoryWidget, '_onCategoriesChanged');
    });

    it('should select category if it is not selected', () => {
      const category = { name: 'Category 1', value: 10, color: '#000' };
      categoryWidget._toggleCategory(category);
      expect(categoryWidget._onCategoriesChanged).toHaveBeenCalled();
      expect(categoryWidget.getSelectedCategories()).toEqual([category.name]);
    });

    it('should remove category if it was selected', () => {
      const category = { name: 'Category 1', value: 10, color: '#000' };
      categoryWidget.selectedCategories = [category.name];

      categoryWidget._toggleCategory(category);

      expect(categoryWidget._onCategoriesChanged).toHaveBeenCalled();
      expect(categoryWidget.getSelectedCategories()).toEqual([]);
    });
  });

  // describe('_onCategoriesChanged', () => {
  //   beforeEach(() => {
  //     spyOn(categoryWidget.categoriesSelected, 'emit');
  //   });

  //   it('should emit an event containing selected categories', () => {
  //     categoryWidget.selectedCategories = ['Category 1'];

  //     this._onCategoriesChanged();

  //     expect(categoryWidget.categoriesSelected.emit).toHaveBeenCalledWith(categoryWidget.selectedCategories);
  //   });
  // });
});
