import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import { Thumb } from '../as-range-slider-thumb/as-range-slider-thumb';

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
  @Prop() public value: number = 0;

  @State() private thumbs: Thumb[] = [];

  /**
   * Initial value.
   * By default, the value is 0 or the minValue.
   *
   * @type {number}
   * @memberof RangeSlider
   */
  @Prop() public range: number[] = [];

  @Watch('value')
  public validateValue(newValue: number) {
    if (!this._isBetweenValidValues(newValue)) {
      throw new Error(`RangeSlider: Value ${newValue} has to be between maxValue and minValue`);
    }
  }

  @Watch('range')
  public validateRange(newRange: number[]) {
    if (!this._sliderHasRange()) {
      throw new Error(`RangeSlider: Range ${newRange} need two values at most`);
    }

    newRange.map((value) => this.validateValue(value));
  }


  public componentWillLoad() {
    this._validateValues();
    this.thumbs = this._createThumbs();
  }

  public render() {
    if (this.thumbs.length < 1) {
      return;
    }

    return (
      <div class='as-range-slider'>
        <div class='as-range-slider__rail'>
          { this.thumbs.map((thumb) => this.renderThumb(thumb)) }
          { this.renderRangeBar() }
        </div>
      </div>
    );
  }

  private renderThumb(thumb: Thumb) {
    return <as-range-slider-thumb
              value={thumb.value}
              minValue={this.minValue}
              maxValue={this.maxValue}
              onValueUpdate={(event) => this.onValueUpdated(thumb, event.detail)}>
           </as-range-slider-thumb>;
  }

  private renderRangeBar() {
    const firstThumbPercentage = this._getPercentage(this.thumbs[0].value);
    const lastThumbPercentage = this._getPercentage(this.thumbs[this.thumbs.length - 1].value);

    return <as-range-slider-bar
             rangeStartPercentage={firstThumbPercentage}
             rangeEndPercentage={lastThumbPercentage}></as-range-slider-bar>;
  }

  private _getPercentage(value) {
    return ((value - this.minValue) / (this.maxValue - this.minValue)) * 100;
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
    const hasRangeValues = this.range.length;

    if (!hasRangeValues) {
      return [{
        value: this._isBetweenValidValues(this.value) ? this.value : this.minValue
      }];
    }

    return this.range.map((value) => ({
      value: this._isBetweenValidValues(value) ? value : this.minValue
    }));
  }

  private _isBetweenValidValues(value: number) {
    return value >= this.minValue && value <= this.maxValue;
  }

  private _sliderHasRange() {
    return this.range.length === 2;
  }

  private onValueUpdated(thumb: Thumb, value: number) {
    const [leftThumb, rightThumb] = this.thumbs;
    const isLeftThumb = leftThumb === thumb;
    const isRightThumb = rightThumb === thumb;

    if (isLeftThumb && ((rightThumb.value - 1) < value)) {
      return;
    }

    if (isRightThumb && ((leftThumb.value + 1) > value)) {
      return;
    }

    thumb.value = value;
    this.thumbs = [...this.thumbs];
  }
}
