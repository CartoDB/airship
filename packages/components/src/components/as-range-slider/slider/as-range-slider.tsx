import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import { Thumb } from '../thumb/as-range-slider-thumb';

@Component({
  shadow: false,
  styleUrl: './as-range-slider.scss',
  tag: 'as-range-slider',
})
export class RangeSlider {
  /**
   * Top limit of the range.
   * You cannot drag your slider beyond this value. By default the value is 10.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public maxValue: number = 10;

  /**
   * Bottom limit of the range.
   * You cannot drag your slider below this value. By default the value is 0.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public minValue: number = 0;

  /**
   * Disables component if truthy
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public disabled: boolean = false;

  /**
   * Increment/decrement step of the slider.
   * You can change the step setting a different number to this property. Defaults to 1.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public step: number = 1;

  /**
   * If this property is set to true, and it has multiple value, you can drag the entire track.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public draggable: boolean = false;

  /**
   * If this property is set to true, and it has multiple value, you can drag the entire track.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public formatValue: (value: number) => void;

  @Event() public change: EventEmitter<number | number[]>;
  @Event() public changeStart: EventEmitter<number | number[]>;
  @Event() public changeEnd: EventEmitter<number | number[]>;

  /**
   * Initial value.
   * By default, the value is 0 or the minValue.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public value: number;

  @Watch('value')
  public validateValue(newValue: number) {
    if (!this._isBetweenValidValues(newValue)) {
      throw new Error(`RangeSlider: Value ${newValue} has to be between maxValue and minValue`);
    }
    this._updateThumbs();
  }

  /**
   * Initial range.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public range: number[];

  @Watch('range')
  public validateRange(newRange: number[]) {
    if (newRange.length !== 2) {
      throw new Error(`RangeSlider: Range ${newRange} need two values at most`);
    }

    newRange.map((value) => this.validateValue(value));
    this._updateThumbs();
  }

  @State() private thumbs: Thumb[] = [];

  public componentWillLoad() {
    this._validateValues();
    this._updateThumbs();
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
        </div>
      </div>
    );
  }

  private _updateThumbs() {
    this.thumbs = this._createThumbs();
  }

  private _renderThumb(thumb: Thumb) {
    return <as-range-slider-thumb
      value={thumb.value}
      valueMin={thumb.valueMin}
      valueMax={thumb.valueMax}
      percentage={thumb.percentage}
      disabled={this.disabled}
      formatValue={this.formatValue}
      onThumbMove={(event) => this._onThumbMove(thumb, event.detail)}
      onThumbIncrease={() => this._onThumbIncrease(thumb)}
      onThumbDecrease={() => this._onThumbDecrease(thumb)}
      onChangeStart={() => this._emitChangeIn(this.changeStart)}
      onChangeEnd={() => this._emitChangeIn(this.changeEnd)}>
    </as-range-slider-thumb>;
  }

  private _renderRangeBar() {
    const [firstThumbPercentage, lastThumbPercentage] = this._getCurrentThumbPercentages();
    return <as-range-slider-bar
      rangeStartPercentage={firstThumbPercentage}
      rangeEndPercentage={lastThumbPercentage}
      draggable={this.draggable}
      disabled={this.disabled}
      onChangeStart={() => this._emitChangeIn(this.changeStart)}
      onChangeEnd={() => this._emitChangeIn(this.changeEnd)}
      onBarMove={(event) => this._onBarMove(event)}></as-range-slider-bar>;
  }

  private _getCurrentThumbPercentages() {
    const firstThumbPercentage = this._sliderHasRange() ? this.thumbs[0].percentage : 0;
    const lastThumbPercentage = this.thumbs[this.thumbs.length - 1].percentage;
    return [firstThumbPercentage, lastThumbPercentage];
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
    this._fixMinMaxValuesIn(thumbs);

    return thumbs;
  }

  private _getThumbData(value) {
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

  private _onThumbMove(thumb: Thumb, percentage: number) {
    const value = this._getValueFromPercentage(percentage);
    const stepValue = this._getStepValueFromValue(value);
    const stepPercentage = this._getPercentage(stepValue);

    const [leftThumb, rightThumb] = this.thumbs;
    const isLeftThumb = leftThumb === thumb;
    const isRightThumb = rightThumb === thumb;

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

  private _onThumbIncrease(thumb: Thumb) {
    const percentage = this._getPercentage(thumb.value + this.step);
    if (percentage < 0 || percentage > 100) {
      return;
    }
    this._onThumbMove(thumb, percentage);
  }

  private _onThumbDecrease(thumb: Thumb) {
    const percentage = this._getPercentage(thumb.value - this.step);
    if (percentage < 0 || percentage > 100) {
      return;
    }
    this._onThumbMove(thumb, percentage);
  }

  private _onBarMove(percentage) {
    const percentageRange = percentage.detail;
    const newValues = percentageRange.map((p) => this._getValueFromPercentage(p));
    const newStepValues = newValues.map((value) => this._getStepValueFromValue(value));


    const currentValues = this.thumbs.map((thumb) => thumb.value);
    if (Math.abs(newStepValues[0] - currentValues[0]) < this.step &&
      Math.abs(newStepValues[1] - currentValues[1]) < this.step) {
      return;
    }

    const thumbs = newStepValues.map((stepValue) => ({
      percentage: this._getPercentage(stepValue),
      value: stepValue
    }));
    this._fixMinMaxValuesIn(thumbs);

    this.thumbs = thumbs;

    this._emitChangeIn(this.change);
  }

  private _fixMinMaxValuesIn(thumbs) {
    const [leftThumb, rightThumb] = thumbs;

    leftThumb.valueMin = this.minValue;
    leftThumb.valueMax = Math.min(rightThumb.value - this.step, this.maxValue);

    rightThumb.valueMin = Math.max(this.minValue, leftThumb.value + this.step);
    rightThumb.valueMax = this.maxValue;
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

  private _getStepValueFromValue(value) {
    return Math.round(value / this.step) * this.step;
  }
}
