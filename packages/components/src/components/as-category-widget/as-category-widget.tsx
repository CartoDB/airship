import { Component, Event, EventEmitter, Method, Prop, State } from '@stencil/core';
import readableNumber from '../../utils/readable-number';
import { shadeOrBlend } from '../../utils/styles';

const OTHER_CATEGORY_COLOR = '#747474';
const OTHER_CATEGORY_NAME = 'Other';
const DEFAULT_BAR_COLOR = '#47DB99';


/**
 * Category Widget
 *
 * @export
 * @class CategoryWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-category-widget.scss',
  tag: 'as-category-widget',
})
export class CategoryWidget {
  /**
   * Array of categories to display in the widget.
   * Each category should include a `name` and a `value`.
   * You can also override the bar color for each category with `color`.
   *
   * @type {object[]}
   * @memberof CategoryWidget
   */
  @Prop() public categories: object[] = [];

  /**
   * Default color to draw the bars. Default value is `#47DB99`.
   *
   * @type {string}
   * @memberof CategoryWidget
   */
  @Prop() public defaultBarColor: string = DEFAULT_BAR_COLOR;

  /**
   * Description text of the widget
   *
   * @type {string}
   * @memberof CategoryWidget
   */
  @Prop() public description: string;


  /**
   * Heading text of the widget
   *
   * @type {string}
   * @memberof CategoryWidget
   */
  @Prop() public heading: string;


  /**
   * If truthy, it'll show a button to clear selected categories when there are any. Default value is `false`.
   *
   * @type {boolean}
   * @memberof CategoryWidget
   */
  @Prop() public showClearButton: boolean = false;

  /**
   * If truthy, it'll render the heading and component's description. Default value is `true`.
   *
   * @type {boolean}
   * @memberof CategoryWidget
   */
  @Prop() public showHeader: boolean = true;


  /**
   * If truthy, we'll use the sum of all categories' value to render the bar percentage.
   * By default, we use the maximum category value to render the bar percentage.
   *
   * @type {boolean}
   * @memberof CategoryWidget
   */
  @Prop() public useTotalPercentage: boolean = false;


  /**
   * The number of visible categories without aggregation.
   *
   * @type {number}
   * @memberof CategoryWidget
   */
  @Prop() public visibleCategories: number = Infinity;

  /**
   * Fired when selected categories changed or selected categories are cleared.
   *
   * @event categoriesSelected
   * @type {EventEmitter<string[]>}
   * @memberof CategoryWidget
   */
  @Event() public categoriesSelected: EventEmitter<string[]>;

  @State() private selectedCategories: string[] = [];

  /**
   * Get current selected categories
   *
   * @returns
   * @memberof CategoryWidget
   */
  @Method()
  public getSelectedCategories() {
    return this.selectedCategories;
  }


  /**
   * Clear current selected categories
   *
   * @returns
   * @memberof CategoryWidget
   */
  @Method()
  public clearSelection() {
    if (!this.selectedCategories.length) {
      return;
    }

    this.selectedCategories = [];
    this._onCategoriesChanged();
  }

  public render() {
    return [
      this._renderHeader(),
      this._renderCategoryList(),
      this._renderFooter()
    ];
  }

  private _renderHeader() {
    if (!this.showHeader) {
      return;
    }

    return [
      <h2 class='as-category-widget__heading'>{this.heading}</h2>,
      <p class='as-category-widget__description as-body'>{this.description}</p>,
    ];
  }

  private _renderCategoryList() {
    return <ul class='as-category-widget__list'>{this._renderCategories()}</ul>;
  }

  private _renderCategories() {
    const moreCategoriesThanVisible = this.categories.length > this.visibleCategories;
    const { categories, otherCategory } = this._parseCategories();
    let otherCategoryTemplate;

    const categoriesToRender =  categories.slice(0, this.visibleCategories);

    const maximumValue = this.useTotalPercentage
      ? this._getCategoriesTotalValue(this.categories)
      : this._getVisibleCategoriesMaximumValue();

    if (otherCategory || moreCategoriesThanVisible) {
      otherCategoryTemplate = this._renderOtherCategory(otherCategory, { maximumValue });
    }

    return [
      categoriesToRender.map((category: Category) => this._renderCategory(category, { maximumValue })),
      otherCategoryTemplate
    ];
  }

  private _renderCategory(category: Category, options: CategoryOptions) {
    const { isOther, maximumValue } = options;
    const isSelected = this._isSelected(category.name);
    const isAnyCategorySelected = this.selectedCategories.length > 0;
    const barColor = this._getBarColor(category.color || this.defaultBarColor, { isSelected, isOther });

    const progressStyles = {
      backgroundColor: barColor,
      width: `${(category.value / maximumValue) * 100}%`
    };

    const cssClasses = {
      'as-category-widget__category': true,
      'as-category-widget__category--not-selected': isAnyCategorySelected && (!isSelected || isOther),
      'as-category-widget__category--other': isOther,
      'as-category-widget__category--selected': isSelected
    };

    return (
      <li class={cssClasses} onClick={() => this._toggleCategory(category)}>
        <p class='as-category-widget__info as-body'>
          <div class='as-category-widget__title'>{category.name}</div>
          {readableNumber(category.value)}
        </p>

        <div class='as-category-widget__bar'>
          <div class='as-category-widget__bar-value' style={progressStyles}></div>
        </div>
      </li>
    );
  }

  private _renderOtherCategory(category: Category, options: CategoryOptions) {
    const categoryData = category || {
      name: 'Other',
      value: this._getCategoriesTotalValue(
        this.categories.slice(this.visibleCategories, this.categories.length)
      )
    };

    return this._renderCategory(categoryData, { maximumValue: options.maximumValue, isOther: true });
  }

  private _renderFooter() {
    const selectedCount = this.selectedCategories.length;

    if (selectedCount === 0) {
      return;
    }

    return (
      <footer class='as-category-widget__footer'>
        <div class='as-category-widget__count as-body'>{selectedCount} selected</div>
        { this.showClearButton &&
            <button class='as-btn as-btn--primary as-btn--s' onClick={() => this.clearSelection()}>Clear selection</button>}
      </footer>
    );
  }

  private _isSelected(categoryName: string) {
    return this.selectedCategories.includes(categoryName);
  }

  private _toggleCategory(category: Category) {
    this.selectedCategories = this._isSelected(category.name)
      ? this.selectedCategories.filter((currentCategory) => currentCategory !== category.name)
      : [...this.selectedCategories, category.name];

    this._onCategoriesChanged();
  }

  private _onCategoriesChanged() {
    this.categoriesSelected.emit(this.selectedCategories);
  }

  private _getVisibleCategoriesMaximumValue() {
    return this._getVisibleCategories().reduce(
      (maximum, currentCategory: Category) => currentCategory.value > maximum ? currentCategory.value : maximum, 0
    );
  }

  private _getCategoriesTotalValue(categories: object[]) {
    return categories.reduce(
      (sum, currentCategory: Category) => currentCategory.value + sum, 0
    );
  }

  private _getBarColor(color: string, options: { isSelected?: boolean, isOther?: boolean } = {}) {
    if (options.isOther) {
      return OTHER_CATEGORY_COLOR;
    }

    if (options.isSelected) {
      return shadeOrBlend(-0.16, color);
    }

    return color;
  }

  private _parseCategories() {
    const otherCategory = this.categories.find(
      (category: Category) => category.name === OTHER_CATEGORY_NAME
    ) as Category;

    if (otherCategory) {
      const categories = this.categories
        .filter((category: Category) => category.name !== otherCategory.name);

      return { categories, otherCategory };
    }

    return { categories: this.categories };
  }

  private _getVisibleCategories() {
    return this.categories.slice(0, this.visibleCategories);
  }
}

export interface Category {
  name: string;
  value: number;
  color?: string;
}
export interface CategoryOptions {
  maximumValue: number;
  isOther?: boolean;
}
