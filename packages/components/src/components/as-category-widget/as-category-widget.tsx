import { Component, Event, EventEmitter, Method, Prop, State } from '@stencil/core';
import readableNumber from '../../utils/readable-number';
import { shadeOrBlend } from '../../utils/styles';

const OTHER_CATEGORY_COLOR = '#747474';
const OTHER_CATEGORY_NAME = 'Other';
const DEFAULT_BAR_COLOR = '#47DB99';

@Component({
  shadow: false,
  styleUrl: './as-category-widget.scss',
  tag: 'as-category-widget',
})
export class CategoryWidget {
  @Prop() public categories: object[] = [];
  @Prop() public defaultBarColor: string = DEFAULT_BAR_COLOR;
  @Prop() public description: string;
  @Prop() public heading: string;
  @Prop() public showClearButton: boolean = false;
  @Prop() public showHeader: boolean = true;
  @Prop() public useTotalPercentage: boolean = false;
  @Prop() public visibleCategories: number = Infinity;

  @Event() public categoriesSelected: EventEmitter<string[]>;

  @State() private selectedCategories: string[] = [];

  @Method()
  public getSelectedCategories() {
    return this.selectedCategories;
  }

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
      <h2 class='as-subheader'>{this.heading}</h2>,
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

    const categoriesToRender =  moreCategoriesThanVisible
      ? categories.slice(0, this.visibleCategories)
      : categories;

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
    const isSelected = this._isSelected(category.name);
    const isAnyCategorySelected = this.selectedCategories.length > 0;
    const barColor = options.isOther
      ? OTHER_CATEGORY_COLOR
      : this._getBarColor(category.color || this.defaultBarColor, { isSelected });

    const progressStyles = {
      backgroundColor: barColor,
      width: `${(category.value / options.maximumValue) * 100}%`
    };

    const cssClasses = {
      'as-category-widget__category': true,
      'as-category-widget__category--not-selected': isAnyCategorySelected && (!isSelected || options.isOther),
      'as-category-widget__category--other': options.isOther,
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
    const selectedCount = this.selectedCategories.length || 'All';

    return (
      <footer class='as-category-widget__footer'>
        <div class='as-category-widget__count as-body'>{selectedCount} selected</div>
        { this.showClearButton
          ? <button class='as-category-widget__clear' onClick={() => this.clearSelection()}>Clear selection</button>
          : '' }
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

  private _getBarColor(color: string, options: { isSelected?: boolean } = {}) {
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
