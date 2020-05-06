import { Component, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import readableNumber from '../../utils/readable-number';
import { shadeOrBlend } from '../../utils/styles';
import contentFragment from '../common/content.fragment';
import { Category, CategoryOptions } from './interfaces';

const OTHER_CATEGORY_COLOR = '#747474';
const OTHER_CATEGORY_NAME = 'Other';

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
  @Prop() public defaultBarColor: string;

  /**
   * Description text of the widget
   *
   * @type {string}
   * @memberof CategoryWidget
   */
  @Prop() public description: string;

  /**
   * Disable category selection in Widget
   *
   * @type {string}
   * @memberof CategoryWidget
   */
  @Prop() public disableInteractivity: boolean = false;

  /**
   * If this property receives a function, it will be used to format the numbers (eg. for adding $ or €).
   *
   * @type {function (value: number)}
   * @memberof RangeSlider
   */
  @Prop() public valueFormatter: (value: number) => string = this.defaultFormatter;

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
   * Boolean property to control the widget loading state. If true, a spinner is shown.
   */
  @Prop() public isLoading: boolean = false;

  /**
   * Text shown in the header subtitle when there's an error
   */
  @Prop() public error: string = '';

  /**
   * Extended error description, only shown when error is present
   */
  @Prop() public errorDescription: string = '';

  /**
   * Message shown in header when no data is available
   */
  @Prop() public noDataHeaderMessage: string = 'NO DATA AVAILABLE';

  /**
   * Message shown in body when no data is available
   */
  @Prop() public noDataBodyMessage: string = 'There is no data to display.';

  /**
   * Fired when selected categories changed or selected categories are cleared.
   *
   * @event categoriesSelected
   * @type {EventEmitter<string[]>}
   * @memberof CategoryWidget
   */
  @Event() public categoriesSelected: EventEmitter<string[]>;

  @State() private selectedCategories: string[] = [];
  @State() private _firstDataSupplied: boolean = false;

  @Watch('categories')
  public onDataChange() {
    if (!this._firstDataSupplied) {
      this._firstDataSupplied =  Boolean(this.categories && this.categories.length);
    }
  }

  public componentWillLoad() {
    this._firstDataSupplied = Boolean(this.categories && this.categories.length);
  }

  /**
   * Default formatting function. Makes the value a readable number and
   * converts it into a string. Useful to compose with your own formatting
   * function.
   *
   * @memberof CategoryWidget
   */
  public defaultFormatter(value: number) {
    return `${readableNumber(value)}`;
  }

  /**
   * Get current selected categories
   *
   * @returns
   * @memberof CategoryWidget
   */
  @Method()
  public async getSelectedCategories() {
    return this.selectedCategories;
  }

  /**
   * Clear current selected categories
   *
   * @returns
   * @memberof CategoryWidget
   */
  @Method()
  public async clearSelection() {
    if (!this.selectedCategories.length) {
      return;
    }

    this.selectedCategories = [];
    this._onCategoriesChanged();
  }

  public render() {
    if (this._isLoading()) {
      return (
        <as-category-widget-placeholder>
          {this._renderHeader()}
        </as-category-widget-placeholder>
      );
    }

    return [
      this._renderHeader(),
      this._renderSelection(),
      this._renderContent(),
    ];
  }

  private _renderSelection() {
    if (this._isLoading() || this._isEmpty() || this.error || !this.showClearButton) {
      return '';
    }

    const selectedCount = this.selectedCategories.length;

    return <as-widget-selection
      selection={`${selectedCount || 'All'} selected`}
      clearText='Clear selection'
      showClear={selectedCount > 0}
      onClear={() => this.clearSelection()}
      >
    </as-widget-selection>;
  }

  private _renderHeader() {
    if (!this.showHeader) {
      return;
    }

    return <as-widget-header
      header={this.heading}
      subheader={this.description}
      is-empty={this._isEmpty()}
      is-loading={this._isLoading()}
      error={this.error}
      no-data-message={this.noDataHeaderMessage}>
    </as-widget-header>;
  }

  private _renderContent() {
    return contentFragment(
      false,
      this.error,
      this._isEmpty(),
      this.heading,
      this.errorDescription,
      this.noDataBodyMessage,
      this._renderCategoryList()
    );
  }

  private _renderCategoryList() {
    const cssClasses = {
      'as-category-widget__list': true,
      'as-category-widget__list--disabled': this.disableInteractivity
    };

    return <ul class={cssClasses}>{this._renderCategories()}</ul>;
  }

  private _renderCategories() {
    const moreCategoriesThanVisible = this.categories.length > this.visibleCategories;
    const { categories, otherCategory } = this._parseCategories();
    let otherCategoryTemplate;

    const categoriesToRender = categories.slice(0, this.visibleCategories);

    const maximumValue = this.useTotalPercentage
      ? this._getCategoriesTotalValue(this.categories)
      : this._getCategoriesMaximumValue(categories, Boolean(otherCategory));

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

    const barColor = this._getBarColor(category.color, { isSelected, isOther });

    const progressStyles = {
      backgroundColor: barColor ? barColor : `var(--as--category-bar--color)`,
      width: `${(category.value / maximumValue) * 100}%`
    };

    const cssClasses = {
      'as-category-widget__category': true,
      'as-category-widget__category--not-selected': isAnyCategorySelected && (!isSelected || isOther),
      'as-category-widget__category--other': isOther,
      'as-category-widget__category--selected': isSelected
    };

    const displayValue = category.value !== null ? this.valueFormatter(category.value) : '';

    return (
      <li class={cssClasses} onClick={() => this._toggleCategory(category)}>
        <p class='as-category-widget__info as-body'>
          <div class='as-category-widget__title'>{category.name}</div>
          {displayValue}
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

  private _isSelected(categoryName: string) {
    return this.selectedCategories.includes(categoryName);
  }

  private _toggleCategory(category: Category) {
    if (this.disableInteractivity) {
      return;
    }

    this.selectedCategories = this._isSelected(category.name)
      ? this.selectedCategories.filter((currentCategory) => currentCategory !== category.name)
      : [...this.selectedCategories, category.name];

    this._onCategoriesChanged();
  }

  private _onCategoriesChanged() {
    this.categoriesSelected.emit(this.selectedCategories);
  }

  private _getCategoriesMaximumValue(categories: Category[], otherCategoryPresent: boolean = false) {
    return this._getVisibleCategories(categories, otherCategoryPresent).reduce(
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
        .filter((category: Category) => category.name !== otherCategory.name) as Category[];

      return { categories, otherCategory };
    }

    return { categories: this.categories as Category[] };
  }

  private _getVisibleCategories(parsedCategories, otherCategoryPresent: boolean) {
    if (otherCategoryPresent) {
      return parsedCategories;
    }

    return parsedCategories.slice(0, this.visibleCategories);
  }

  private _isLoading(): boolean {
    return (!this._firstDataSupplied || this.isLoading) && !this.error;
  }

  private _isEmpty(): boolean {
    return this.categories && !this.categories.length;
  }
}
