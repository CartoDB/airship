import { Component, Element, Event, EventEmitter, Listen, Prop } from '@stencil/core';
import { MouseTrack } from '../MouseTrack';

@Component({
  shadow: false,
  styleUrl: './as-range-slider-thumb.scss',
  tag: 'as-range-slider-thumb',
})
export class RangeSliderThumb extends MouseTrack {
  @Prop() public percentage: number;
  @Prop() public value: number;
  @Prop() public disabled: boolean;
  @Prop() public formatValue: (value: number) => void;

  @Event() public thumbMove: EventEmitter<number>;
  @Event() public changeStart: EventEmitter<void>;
  @Event() public changeEnd: EventEmitter<void>;

  @Element() public element: HTMLElement;
  public railElement: HTMLElement;

  public render() {
    const thumbStyles = {
      left: `${this.percentage}%`
    };

    const cssClasses = {
      'as-range-slider__thumb': true,
      'as-range-slider__thumb--disabled': this.disabled
    };
    return (
      <div class={cssClasses} style={thumbStyles} data-value={this.value}>
          <span class='as-range-slider__value as-caption as-font-medium'>
            {this._getDisplayValue(this.value)}
          </span>
      </div>);
  }

  @Listen('mousedown')
  @Listen('touchstart')
  public onMouseDown(event: MouseEvent) {
    this.changeStart.emit();
    this.railElement = document.querySelector('.as-range-slider__rail');

    const thumb = event.target as HTMLElement;
    thumb.classList.add('as-range-slider__thumb--moving');

    super.handleMouseDown({
      move: (moveEvent) => this.onMove(moveEvent),
      release: () => this.onRelease(thumb)
    });

    thumb.focus();
  }

  private onMove(event: MouseEvent) {
    const barPercentage = (event.pageX - this.railElement.offsetLeft) * 100 / this.railElement.offsetWidth;

    if (barPercentage < 0 || barPercentage > 100) {
      return;
    }

    this.thumbMove.emit(barPercentage);
  }

  private onRelease(thumb: HTMLElement) {
    thumb.classList.remove('as-range-slider__thumb--moving');
    this.changeEnd.emit();
  }

  private _getDisplayValue(value: number) {
    const displayValue = Math.round(value);
    return (this.formatValue && this.formatValue(displayValue)) || displayValue;
  }
}

export interface Thumb {
  value: number;
  percentage: number;
}
