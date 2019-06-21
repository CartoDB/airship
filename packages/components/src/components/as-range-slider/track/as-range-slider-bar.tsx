import { Component, Element, Event, EventEmitter, h, Listen, Prop } from '@stencil/core';
import { handleMouseDown } from '../MouseTrack';

const MAX_PERCENTAGE = 100;
const MIN_PERCENTAGE = 0;

@Component({
  shadow: false,
  styleUrl: './as-range-slider-bar.scss',
  tag: 'as-range-slider-bar',
})
export class RangeSliderBar {
  @Prop({ mutable: true }) public rangeStartPercentage: number;
  @Prop({ mutable: true }) public rangeEndPercentage: number;
  @Prop() public stepPercentage: number;
  @Prop() public draggable: boolean;
  @Prop() public disabled: boolean;

  @Event() public barMove: EventEmitter<number[]>;
  @Event() public barChangeStart: EventEmitter<void>;
  @Event() public barChangeEnd: EventEmitter<void>;

  @Element() public element: HTMLElement;
  public rangeBarElement: HTMLElement;
  public railElement: HTMLElement;

  private previousMouseEvent: MouseEvent;

  public render() {
    const barStyles = {
      left: `${this.rangeStartPercentage}%`,
      width: `${this.rangeEndPercentage - this.rangeStartPercentage}%`
    };

    const cssClasses = {
      'as-range-slider__range-bar': true,
      'as-range-slider__range-bar--disabled': this.disabled,
      'as-range-slider__range-bar--draggable': this.draggable
    };

    return <div class={cssClasses} style={barStyles}></div>;
  }

  @Listen('mousedown')
  @Listen('touchstart')
  public onMouseDown(event: MouseEvent) {
    if (!this.draggable) {
      return;
    }

    this.barChangeStart.emit();

    this.railElement = document.querySelector('.as-range-slider__rail');
    this.rangeBarElement = this.element.querySelector('.as-range-slider__range-bar');

    this.previousMouseEvent = event;

    handleMouseDown({
      move: (moveEvent) => this.onMove(moveEvent),
      release: () => this._onRelease()
    });
  }

  public onMove(event: MouseEvent) {
    if (!this.previousMouseEvent) {
      this.previousMouseEvent = event;
      return;
    }

    this.setCursorTo('grabbing');
    if (this.rangeBarElement && this.rangeBarElement.classList) {
      this.rangeBarElement.classList.add('as-range-slider__range-bar--moving');
    }

    const rangeDifference = this._getRangeDifference();
    const movementDelta = this._getMovementDelta(event, this.previousMouseEvent);
    const barXPosition = this.rangeBarElement.offsetLeft + movementDelta;

    let leftPercentage = barXPosition * 100 / this.railElement.offsetWidth;
    let rightPercentage = leftPercentage + rangeDifference;

    if (leftPercentage < MIN_PERCENTAGE) {
      leftPercentage = MIN_PERCENTAGE;
      rightPercentage = leftPercentage + rangeDifference;
    }

    if (rightPercentage > MAX_PERCENTAGE) {
      rightPercentage = MAX_PERCENTAGE;
      leftPercentage = rightPercentage - rangeDifference;
    }

    const thresholdPassed = this._updateRangePercentages([leftPercentage, rightPercentage]);

    if (thresholdPassed) {
      this.previousMouseEvent = event;
    }

    this.barMove.emit([this.rangeStartPercentage, this.rangeEndPercentage]);
  }

  private _updateRangePercentages(percentages: number[]) {
    const [leftPercentage, rightPercentage] = percentages;

    const direction = (leftPercentage < this.rangeStartPercentage) ? -1 : 1;
    const delta = Math.abs(this.rangeStartPercentage - leftPercentage);
    const threshold = this.stepPercentage;
    const rangeDifference = this._getRangeDifference();

    if (delta >= threshold) {
      this.rangeStartPercentage += direction * delta;
      this.rangeEndPercentage += direction * delta;
      return true;
    }

    if (rightPercentage > (MAX_PERCENTAGE - threshold)) {
      this.rangeStartPercentage = MAX_PERCENTAGE - rangeDifference;
      this.rangeEndPercentage = MAX_PERCENTAGE;
      return false;
    }

    if (leftPercentage < (MIN_PERCENTAGE + threshold)) {
      this.rangeStartPercentage = MIN_PERCENTAGE;
      this.rangeEndPercentage = MIN_PERCENTAGE + rangeDifference;
      return false;
    }
  }

  private _onRelease() {
    this.setCursorTo('');
    if (this.rangeBarElement && this.rangeBarElement.classList) {
      this.rangeBarElement.classList.remove('as-range-slider__range-bar--moving');
    }

    this.barChangeEnd.emit();
  }

  private _getMovementDelta(currentEvent: MouseEvent | TouchEvent, previousEvent: MouseEvent | TouchEvent) {
    const currentChangedTouches = (currentEvent as TouchEvent).changedTouches;
    const previousChangedTouches = (previousEvent as TouchEvent).changedTouches;

    const currentEventX = currentChangedTouches
      ? currentChangedTouches[0].pageX
      : (currentEvent as MouseEvent).pageX;

    const previousEventX = previousChangedTouches
      ? previousChangedTouches[0].pageX
      : (previousEvent as MouseEvent).pageX;

    return currentEventX - previousEventX;
  }

  private _getRangeDifference() {
    return this.rangeEndPercentage - this.rangeStartPercentage;
  }

  private setCursorTo(value) {
    document.body.style.cursor = value;
  }

}
