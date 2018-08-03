import { Component, Element, Event, EventEmitter, Listen, Prop } from '@stencil/core';
import { MouseTrack } from '../MouseTrack';

@Component({
  shadow: false,
  styleUrl: './as-range-slider-bar.scss',
  tag: 'as-range-slider-bar',
})
export class RangeSliderBar extends MouseTrack {
  @Prop({ mutable: true }) public rangeStartPercentage: number;
  @Prop({ mutable: true }) public rangeEndPercentage: number;
  @Prop() public draggable: boolean;
  @Prop() public disabled: boolean;

  @Event() public barMove: EventEmitter<number[]>;
  @Event() public changeStart: EventEmitter<void>;
  @Event() public changeEnd: EventEmitter<void>;

  @Element() public element: HTMLElement;
  private rangeBarElement: HTMLElement;
  private railElement: HTMLElement;

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

    this.changeStart.emit();

    this.railElement = document.querySelector('.as-range-slider__rail');
    this.rangeBarElement = this.element.querySelector('.as-range-slider__range-bar');

    this.previousMouseEvent = event;

    super.handleMouseDown({
      move: (moveEvent) => this._onMove(moveEvent),
      release: () => this._onRelease()
    });
  }

  private _onMove(event: MouseEvent) {
    if (!this.previousMouseEvent) {
      this.previousMouseEvent = event;
      return;
    }

    const rangeDifference = this.rangeEndPercentage - this.rangeStartPercentage;
    const movementDelta = this._getMovementDelta(event, this.previousMouseEvent);
    const barXPosition = this.rangeBarElement.offsetLeft + movementDelta;

    const leftPercentage = (barXPosition) * 100 / this.railElement.offsetWidth;
    const rightPercentage = leftPercentage + rangeDifference;

    if (leftPercentage < 0 || rightPercentage > 100) {
      return;
    }

    this.rangeStartPercentage = leftPercentage;
    this.rangeEndPercentage = rightPercentage;
    this.previousMouseEvent = event;

    this.barMove.emit([this.rangeStartPercentage, this.rangeEndPercentage]);
  }

  private _onRelease() {
    this.previousMouseEvent = undefined;
    this.changeEnd.emit();
  }

  private _getMovementDelta(currentEvent: MouseEvent, previousEvent: MouseEvent) {
    return currentEvent.clientX - previousEvent.clientX;
  }
}
