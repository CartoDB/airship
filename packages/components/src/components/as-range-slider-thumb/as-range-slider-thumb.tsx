import { Component, Element, Event, EventEmitter, Listen, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-range-slider-thumb.scss',
  tag: 'as-range-slider-thumb',
})
export class RangeSliderThumb {
  @Prop() public maxValue: number;
  @Prop() public minValue: number;
  @Prop() public value: number;
  @Prop() public formatValue: (value: number) => void;

  @Event() public valueUpdate: EventEmitter<number>;
  @Event() public changeStart: EventEmitter<number | number[]>;
  @Event() public changeEnd: EventEmitter<number | number[]>;

  @Element() public thumbElement: HTMLElement;
  public railElement: HTMLElement;

  public render() {
    const thumbStyles = {
      left: `${this._getPercentage(this.value)}%`
    };

    return (
      <div class='as-range-slider__thumb' style={thumbStyles} data-value={this.value}>
          <span class='as-range-slider__value as-caption as-font-medium'>
            {this._getDisplayValue(this.value)}
          </span>
      </div>);
  }

  @Listen('mousedown')
  @Listen('touchstart')
  public onMouseDown(event: MouseEvent) {
    this.railElement = document.querySelector('.as-range-slider__rail');

    const thumb = event.target as HTMLElement;
    thumb.classList.add('as-range-slider__thumb--moving');

    const handleMove = (eventProperties) => this._handleMove(eventProperties);
    const handleRelease = () => this._handleRelease(thumb, { mouseMove: handleMove, mouseDown: handleRelease });

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleRelease);
    document.addEventListener('touchend', handleRelease);

    this.thumbElement.focus();
  }

  private _handleMove(event: MouseEvent) {
    const barPercentage = (event.pageX - this.railElement.offsetLeft) * 100 / this.railElement.offsetWidth;
    const newValue = (barPercentage * (this.maxValue - this.minValue)) / 100;

    if (newValue < 0 || newValue > this.maxValue) {
      return;
    }

    this.valueUpdate.emit(newValue);
  }

  private _handleRelease(
    thumb: HTMLElement,
    listeners: { mouseMove: (eventProperties) => void, mouseDown: () => void}
  ) {
    document.removeEventListener('mousemove', listeners.mouseMove);
    document.removeEventListener('mouseup', listeners.mouseDown);
    thumb.classList.remove('as-range-slider__thumb--moving');
  }

  private _getPercentage(value: number) {
    return ((value - this.minValue) / (this.maxValue - this.minValue)) * 100;
  }

  private _getDisplayValue(value: number) {
    const displayValue = Math.round(value);
    return (this.formatValue && this.formatValue(value)) || displayValue;
  }
}

export interface Thumb {
  value: number;
}
