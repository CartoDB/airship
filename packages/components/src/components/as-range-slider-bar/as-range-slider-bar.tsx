import { Component, Element, Listen, Prop, State } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-range-slider-bar.scss',
  tag: 'as-range-slider-bar',
})
export class RangeSliderBar {
  @Prop() public rangeStartPercentage: number;
  @Prop() public rangeEndPercentage: number;

  @State() public rangeStartPercentageState: number;
  @State() public rangeEndPercentageState: number;

  @Element() public element: HTMLElement;
  private rangeBarElement: HTMLElement;
  private railElement: HTMLElement;

  private previousMouseEvent: MouseEvent;

  public render() {
    const barStyles = {
      left: `${this.rangeStartPercentage}%`,
      width: `${this.rangeEndPercentage - this.rangeStartPercentage}%`
    };

    return <div class='as-range-slider__range-bar' style={barStyles}></div>;
  }

  @Listen('mousedown')
  @Listen('touchstart')
  public onMouseDown(event: MouseEvent) {
    this.railElement = document.querySelector('.as-range-slider__rail');
    this.rangeBarElement = this.element.querySelector('.as-range-slider__range-bar');

    this.previousMouseEvent = event;

    const handleMove = (eventProperties) => this._handleMove(eventProperties);
    const handleRelease = () => this._handleRelease({ mouseMove: handleMove, mouseDown: handleRelease });

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleRelease);
    document.addEventListener('touchend', handleRelease);
  }

  private _handleMove(event: MouseEvent) {
    console.log({ rangeStartPercentageState: this.rangeStartPercentageState })
    debugger;
    if (!this.previousMouseEvent) {
      this.previousMouseEvent = event;
      return;
    }
    debugger;
    console.log('Posicion de la barra antes de moverse:', this.rangeBarElement.offsetLeft);

    const movementDelta = this.getMovementDelta(event, this.previousMouseEvent);
    this.previousMouseEvent = event;
    console.log('Se ha movido', movementDelta, 'px');

    const nuevaPosicionDeLaBarra = this.rangeBarElement.offsetLeft + movementDelta;

    if (nuevaPosicionDeLaBarra < 0) {
      return;
    }
    console.log('La nueva posición de la barra es', nuevaPosicionDeLaBarra);

    const nuevoPorcentajeIzquierdo = (nuevaPosicionDeLaBarra) * 100 / this.railElement.offsetWidth;
    console.log('El nuevo porcentaje izquierdo es', nuevoPorcentajeIzquierdo);

    this.rangeBarElement.style.left = `${nuevaPosicionDeLaBarra}px`;

    // if (nuevoPorcentajeIzquierdo + (this.rangeEndPercentage - this.rangeStartPercentage) > 100) {
    //   return;
    // }

    this.rangeStartPercentageState = nuevoPorcentajeIzquierdo;
    // this.rangeEndPercentageState = nuevoPorcentajeIzquierdo + (this.rangeEndPercentage - this.rangeStartPercentage);

  }

  private _handleRelease(
    listeners: { mouseMove: (eventProperties) => void, mouseDown: () => void}
  ) {
    document.removeEventListener('mousemove', listeners.mouseMove);
    document.removeEventListener('mouseup', listeners.mouseDown);
    this.previousMouseEvent = undefined;
  }

  private getMovementDelta(currentEvent: MouseEvent, previousEvent: MouseEvent) {
    console.log(currentEvent.clientX, previousEvent.clientX);
    return currentEvent.clientX - previousEvent.clientX;
  }

  // private _getPercentage(value: number) {
  //   return ((value - this.minValue) / (this.maxValue - this.minValue)) * 100;
  // }
}
