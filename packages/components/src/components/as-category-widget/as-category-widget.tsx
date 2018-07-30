import { Component, Event, EventEmitter, Method, Prop, State } from '@stencil/core';
import readableNumber from '../../utils/readable-number';

const OTHER_COLOR = '#747474';
@Component({
  shadow: false,
  styleUrl: './as-category-widget.scss',
  tag: 'as-category-widget',
})
export class CategoryWidget {
  @Prop() public categories: object[] = [];
  @Prop() public defaultBarColor: string = '#47DB99';
  @Prop() public showClearButton: boolean;
  @Prop() public showHeader: boolean = true;
  @Prop() public useTotalPercentage: boolean = false;
  @Prop() public widgetDescription: string;
  @Prop() public widgetTitle: string;

  @State() private selectedCategories: string[] = [];
  @State() private numberOfVisibleCategories: number = 5;

  @Event() private categoriesSelected: EventEmitter;

  @Method()
  public getSelectedCategories() {
    return this.selectedCategories;
  }

  @Method()
  public clearSelection() {
    this.selectedCategories = [];
    this._onCategoriesChanged();
  }

  public render() {
    return [
      this._renderHeader(),
      <ul class='as-category-widget__list'>{this._renderCategories()}</ul>,
      this._renderFooter()
    ];
  }

  private _renderHeader() {
    if (!this.showHeader) {
      return;
    }

    return [
      <h2 class='as-subheader'>{this.widgetTitle}</h2>,
      <p class='as-category-widget__description as-body'>{this.widgetDescription}</p>,
    ];
  }

  private _renderCategories() {
    const maximumValue = this._getCategoriesMaximumValue();
    const moreCategoriesThanVisible = this.categories.length > this.numberOfVisibleCategories;

    const categoriesToRender =  moreCategoriesThanVisible
      ? this.categories.slice(0, this.numberOfVisibleCategories)
      : this.categories;

    const JSXTemplate = categoriesToRender.map(
      (category: Category) => this._renderCategory(category, { maximumValue})
    );

    if (moreCategoriesThanVisible) {
      JSXTemplate.push(
        this._renderCategory(
          { name: 'Other', value: this._getOtherCategorySum() },
          { maximumValue, isOther: true }
        )
      );
    }

    return JSXTemplate;
  }

  private _renderCategory(category: Category, options: CategoryOptions) {
    const isSelected = this._isSelected(category.name);
    const barColor = !options.isOther
      ? this.getBarColor(category.color, { isSelected })
      : OTHER_COLOR;

    const progressStyles = {
      backgroundColor: barColor,
      width: `${(category.value / options.maximumValue) * 100}%`
    };

    const classes = {
      'as-category-widget__category': true,
      'as-category-widget__category--other': options.isOther,
      'as-category-widget__category--selected': isSelected
    };

    return (
      <li class={classes}
          onClick={() => this._toggleCategory(category)}>
        <p class='as-category-widget__category-title as-body' data-value={readableNumber(category.value)}>
          {category.name}
        </p>

        <div class='as-category-widget__bar'>
          <div class='as-category-widget__value' style={progressStyles}></div>
        </div>
      </li>
    );
  }

  private _renderFooter() {
    const selectedCount = this.selectedCategories.length ? this.selectedCategories.length : 'All';

    return (
      <footer class='as-category-widget__footer'>
        <div class='as-category-widget__count as-body'>{selectedCount} selected</div>
        { this.showClearButton ? <button class='' onClick={() => this.clearSelection()}>Clear selection</button> : '' }
      </footer>
    );
  }

  private _isSelected(categoryName: string) {
    return this.selectedCategories.indexOf(categoryName) > -1;
  }

  private _toggleCategory(category: Category) {
    const newSelectedCategories = this._isSelected(category.name)
      ? this.selectedCategories.filter((currentCategory) => currentCategory !== category.name)
      : [...this.selectedCategories, category.name];

    this.selectedCategories = newSelectedCategories;
    this._onCategoriesChanged();
  }

  private _onCategoriesChanged() {
    this.categoriesSelected.emit(this.selectedCategories);
  }

  private _getCategoriesMaximumValue() {
    const categories = this.useTotalPercentage
      ? this.categories
      : this.categories.slice(0, this.numberOfVisibleCategories);

    return categories.reduce(
      (maximum, currentCategory: Category) => currentCategory.value > maximum ? currentCategory.value : maximum, 0
    );
  }

  private _getOtherCategorySum() {
    const categories = this.categories.slice(this.numberOfVisibleCategories, this.categories.length);

    return categories.reduce(
      (sum, currentCategory: Category) => currentCategory.value + sum, 0
    );
  }

  private getBarColor(color, options) {
    if (options.isSelected || options.isHovered) {
      // darken color
      return '#000';
    }

    if (color) {
      return color;
    }

    return this.defaultBarColor;
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
