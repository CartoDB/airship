import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import getDecimalPlaces from '../../../utils/get-decimal-places';
import { Thumb } from '../thumb/interfaces';

@Component({
  shadow: false,
  styleUrl: './as-range-slider.scss',
  tag: 'as-range-slider',
})
export class RangeSlider {
  /**
   * Initial value.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public value: number;

  /**
   * Initial range.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public range: number[];

  /**
   * Bottom limit of the range.
   * You cannot drag your slider below this value. By default the value is 0.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public minValue: number = 0;

  /**
   * Top limit of the range.
   * You cannot drag your slider beyond this value. By default the value is 10.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public maxValue: number = 10;

  /**
   * Increment/decrement step of the slider.
   * You can change the step setting a different number to this property. Defaults to 1.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public step: number = 1;

  /**
   * Disables component if truthy
   *
   * @type {boolean}
   * @memberof RangeSlider
   */
  @Prop() public disabled: boolean = false;

  /**
   * @deprecated Use isDraggable instead
   * @type {boolean}
   * @memberof RangeSlider
   */
  @Prop() public draggable: boolean = false;

  /**
   * If this property is set to true, and it has multiple value, you can drag the entire track.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public isDraggable: boolean = false;

  /**
   * Disables the range slider thumb
   *
   * @type {boolean}
   * @memberof RangeSlider
   */
  @Prop() public showThumb: boolean = true;

  /**
   * Disables the range slider thumb caption
   *
   * @type {boolean}
   * @memberof RangeSlider
   */
  @Prop() public showThumbCaption: boolean = true;

  /**
   * If this property receives a function, it will be used to format the numbers (eg. for adding $ or €).
   *
   * @type {function (value: number)}
   * @memberof RangeSlider
   */
  @Prop() public formatValue: (value: number) => string|number;


  @Event() public change: EventEmitter<number[]>;
  @Event() public changeStart: EventEmitter<number[]>;
  @Event() public changeEnd: EventEmitter<number[]>;

  @Element() public element: HTMLElement;

  @State() private thumbs: Thumb[] = [];
  @State() private areLabelsColliding: boolean;
  @State() private isLeftLabelOverflowing: boolean;
  @State() private isRightLabelOverflowing: boolean;

  @Watch('value')
  public validateValue(newValue: number) {
    if (!this._isBetweenValidValues(newValue)) {
      throw new Error(`RangeSlider: Value ${newValue} has to be between ` +
        `minValue (${this.minValue}) and maxValue (${this.maxValue})`
      );
    }

    this._updateThumbs();
  }

  @Watch('range')
  public validateRange(newRange: number[]) {
    if (newRange.length !== 2) {
      throw new Error(`RangeSlider: Range ${newRange} need two values at most`);
    }

    newRange.map((value) => this.validateValue(value));
    this._updateThumbs();
  }

  public componentWillLoad() {
    this._validateValues();
    this._updateThumbs();
  }

  public componentDidRender() {
    this._checkLabelOverflow();
  }

  public componentDidLoad() {
    this.checkThumbCollision();
  }

  public render() {
    if (this.thumbs.length < 1) {
      return;
    }

    const cssClasses = {
      'as-range-slider': true,
      'as-range-slider--disabled': this.disabled
    };

    return (
      <div class={cssClasses}>
        <div class='as-range-slider__rail'>
          {this.thumbs.map((thumb) => this._renderThumb(thumb))}
          {this._renderRangeBar()}
          {this._renderCollapsedLabel()}
        </div>
      </div>
    );
  }

  private _getLabelOffsetPercentage() {
    const difference = this.thumbs[1].percentage - this.thumbs[0].percentage;
    return this.thumbs[0].percentage + (difference / 2);
  }

  private _updateThumbs() {
    this.thumbs = this._createThumbs();
  }

  private _renderThumb(thumb: Thumb) {
    if (this.showThumb) {
      return <as-range-slider-thumb
        value={thumb.value}
        valueMin={thumb.valueMin}
        valueMax={thumb.valueMax}
        percentage={thumb.percentage}
        disabled={this.disabled}
        formatValue={this.formatValue}
        showCaption={this._shouldShowCaption()}
        onThumbMove={(event) => this._onThumbMove(thumb, event.detail)}
        onThumbIncrease={() => this._onKeyboardThumbMove(thumb, +1)}
        onThumbDecrease={() => this._onKeyboardThumbMove(thumb, -1)}
        onThumbChangeStart={() => this._emitChangeIn(this.changeStart)}
        onThumbChangeEnd={() => this._emitChangeIn(this.changeEnd)}
        onThumbRender={() => this.checkThumbCollision()}>
      </as-range-slider-thumb>;
    }
  }

  private _renderRangeBar() {
    const [firstThumbPercentage, lastThumbPercentage] = this._getCurrentThumbPercentages();
    const isDraggable = (this.isDraggable || this.draggable) && this.range !== undefined;
    return <as-range-slider-bar
             rangeStartPercentage={firstThumbPercentage}
             rangeEndPercentage={lastThumbPercentage}
             isDraggable={isDraggable}
             disabled={this.disabled}
             stepPercentage={this._getStepPercentage()}
             onBarChangeStart={() => this._emitChangeIn(this.changeStart)}
             onBarChangeEnd={() => this._emitChangeIn(this.changeEnd)}
             onBarMove={(event) => this._onBarMove(event)}></as-range-slider-bar>;
  }

  private _renderCollapsedLabel() {
    if (this.thumbs.length !== 2) {
      return;
    }

    const defaultFormatValue = (value: string | number) => value;
    const formatValue = this.formatValue || defaultFormatValue;

    const labelOffsetPercentage = this._getLabelOffsetPercentage();
    const thumbsBalancedLeft = this.thumbs[0].percentage < 50;

    const positionStyles = {
      left: `${labelOffsetPercentage}%`
    };

    const classes = {
      'as-caption': true,
      'as-font-medium': true,
      'as-range-slider__rail-label': true,
      'as-range-slider__rail-label--active': this.areLabelsColliding,
      'as-range-slider__rail-label__overflow--left': this.isLeftLabelOverflowing && thumbsBalancedLeft,
      'as-range-slider__rail-label__overflow--right': this.isRightLabelOverflowing && !thumbsBalancedLeft
    };

    return (
      <div class={classes} style={positionStyles}>
        {formatValue(this.thumbs[0].value)}
        <span class='as-range-slider__label-separator'>&mdash;</span>
        {formatValue(this.thumbs[1].value)}
      </div>
    );
  }

  private _getCurrentThumbPercentages() {
    const firstThumbPercentage = this._sliderHasRange() ? this.thumbs[0].percentage : 0;
    const lastThumbPercentage = this.thumbs[this.thumbs.length - 1].percentage;
    return [firstThumbPercentage, lastThumbPercentage];
  }

  private _shouldShowCaption() {
    return !this.areLabelsColliding && this.showThumbCaption;
  }

  private _validateValues() {
    if (this.value) {
      this.validateValue(this.value);
      return;
    }

    if (this.range) {
      this.validateRange(this.range);
      return;
    }
  }

  private _createThumbs() {
    const hasRangeValues = this.range && this.range.length;

    if (!hasRangeValues) {
      return [this._getThumbData(this.value)];
    }

    const thumbs = this.range.map((value) => this._getThumbData(value));
    this._clampThumbValues(thumbs);
    return thumbs;
  }

  private _getThumbData(value: number) {
    return {
      percentage: this._isBetweenValidValues(value) ?
        this._getPercentage(value)
        : this._getPercentage(this.minValue),
      value: this._isBetweenValidValues(value) ? value : this.minValue,
      valueMax: this.maxValue,
      valueMin: this.minValue
    };
  }

  private _isBetweenValidValues(value: number) {
    return value >= this.minValue && value <= this.maxValue;
  }

  private _sliderHasRange() {
    return this.range && this.range.length === 2;
  }

  private _onKeyboardThumbMove(thumb: Thumb, direction: number) {
    const percentage = this._getPercentage(thumb.value + (direction * this.step));

    if (percentage < 0 || percentage > 100) {
      return;
    }

    this._onThumbMove(thumb, percentage);
  }

  private _onThumbMove(thumb: Thumb, percentage: number) {
    const [leftThumb, rightThumb] = this.thumbs;
    const isLeftThumb = leftThumb === thumb;
    const isRightThumb = rightThumb === thumb;

    const value = this._getValueFromPercentage(percentage);
    const stepValue = this._getStepValue(value);
    const stepPercentage = this._getPercentage(stepValue);

    let valueMin = this.minValue;
    let valueMax = this.maxValue;

    if (this._sliderHasRange() && isLeftThumb) {
      valueMax = (rightThumb.value - this.step);
      if (valueMax < stepValue) {
        return;
      }
    }

    if (this._sliderHasRange() && isRightThumb) {
      valueMin = (leftThumb.value + this.step);
      if (valueMin > stepValue) {
        return;
      }
    }

    thumb.value = stepValue;
    thumb.valueMin = valueMin;
    thumb.valueMax = valueMax;
    thumb.percentage = stepPercentage;

    this.thumbs = [...this.thumbs];

    this._emitChangeIn(this.change);
  }

  private _onBarMove(percentage) {
    const percentageRange = percentage.detail;
    const rangeValues = percentageRange.map((p) => this._getValueFromPercentage(p));
    const stepValues = rangeValues.map((value) => this._getStepValue(value));

    const thumbs = stepValues.map((stepValue) => ({
      percentage: this._getPercentage(stepValue),
      value: stepValue
    }));

    this._clampThumbValues(thumbs);
    this.thumbs = [...thumbs];

    this._emitChangeIn(this.change);
  }

  private _emitChangeIn(eventEmitterInstance: EventEmitter<number | number[]>) {
    const values = this.thumbs.map((thumb) => thumb.value);
    return eventEmitterInstance.emit(values);
  }

  private _getPercentage(value) {
    return ((value - this.minValue) / (this.maxValue - this.minValue)) * 100;
  }

  private _getValueFromPercentage(percentage) {
    return ((percentage * (this.maxValue - this.minValue)) / 100) + this.minValue;
  }

  private _getStepPercentage() {
    const range = (this.maxValue - this.minValue);
    return this.step * 100 / range;
  }

  private _clampThumbValues(thumbs) {
    const [leftThumb, rightThumb] = thumbs;

    leftThumb.valueMin = this.minValue;
    leftThumb.valueMax = Math.min(rightThumb.value - this.step, this.maxValue);

    rightThumb.valueMin = Math.max(this.minValue, leftThumb.value + this.step);
    rightThumb.valueMax = this.maxValue;
  }

  private _getStepValue(value) {
    const stepValue = Math.max(this.minValue, Math.round(value / this.step) * this.step);
    return this.roundToStep(stepValue, this.step);
  }

  private roundToStep(numberToRound: number, step: number) {
    return Number.parseFloat(numberToRound.toFixed(getDecimalPlaces(step)));
  }

  private _checkLabelOverflow() {
    const thumbLabels = this.element.querySelectorAll('as-range-slider-thumb .as-range-slider__value');

    if (thumbLabels) {
      const { overflow: leftLabelOverflows } = this.checkOverflowInParentContainer(
        thumbLabels[0] as HTMLElement
      );

      const { overflow: rightLabelOverflows } = (thumbLabels.length > 1)
        ? this.checkOverflowInParentContainer(thumbLabels[1] as HTMLElement)
        : false;

      this.isLeftLabelOverflowing = leftLabelOverflows;
      this.isRightLabelOverflowing = rightLabelOverflows;
    }
  }

  private _setLeftLabelOverflowing(thumbLabel: HTMLElement) {

  }

  private _setRightLabelOverflowing(thumbLabel: HTMLElement) {
    
  }

  private checkThumbCollision() {
    const thumbLabels = this.element.querySelectorAll('as-range-slider-thumb .as-range-slider__value');
    if (!thumbLabels || thumbLabels.length !== 2) {
      return;
    }

    const leftThumbLabel = thumbLabels[0];
    const rightThumbLabel = thumbLabels[1];

    const leftThumbLabelCR = leftThumbLabel.getBoundingClientRect();
    const rightThumbLabelCR = rightThumbLabel.getBoundingClientRect();

    this.areLabelsColliding = isColliding(leftThumbLabelCR, rightThumbLabelCR, 8);
  }

  private checkOverflowInParentContainer(labelElement: HTMLElement) {
    if (labelElement) {
      const containerElement = this.element.parentElement;

      const containerBCR = containerElement.getBoundingClientRect();
      const labelBCR = labelElement.getBoundingClientRect();

      const isOverflowingLeft = containerBCR.left > labelBCR.left;
      const isOverflowingRight = containerBCR.right < labelBCR.left + labelBCR.width;

      return {
        left: isOverflowingLeft,
        overflow: isOverflowingLeft || isOverflowingRight,
        right: isOverflowingRight
      };
    }
  }
}

function isColliding(a, b, margin: number) {
  return !(
    ((a.y + a.height) < (b.y)) ||
    (a.y > (b.y + b.height)) ||
    ((a.x + a.width + margin) < b.x) ||
    (a.x > (b.x + b.width + margin))
  );
}
