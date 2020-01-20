import { Component, Element, h, Prop, State, Listen } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-placeholder-chart.scss',
  tag: 'as-placeholder-chart',
})
export class PlaceholderChart {
  @Element() public element: HTMLElement;
  @Prop() public barWidth: number = 10;
  @State() public elementWidth: number;

  public resizeTimerId;

  @Listen('resize', { target: 'window', passive: true })
  public onWindowResize() {
    window.clearTimeout(this.resizeTimerId);
    this.resizeTimerId = setTimeout(() => { this.setElementWidth(); }, 250);
  }

  public componentDidLoad() {
    this.setElementWidth();
  }

  public render() {
    const numberOfBars = calculateBarsQuantity(this.elementWidth, this.barWidth);
    const placeholderBars = this.renderBars(numberOfBars);

    return [
      <section class='placeholder__vaxis'>
        <div class='vaxis-item vaxis-item--y'></div>
        <div class='vaxis-item vaxis-item--y'></div>
        <div class='vaxis-item vaxis-item--y'></div>
        <div class='vaxis-item vaxis-item--x'></div>
      </section>,

      <section class='placeholder-chart'>
        {placeholderBars}
      </section>
    ];
  }

  public renderBars(numberOfBars: number) {
    const bars = [];

    for (let i = 0; i < numberOfBars; i++) {
      const barPercentage = Math.trunc(Math.random() * 85) + 15;

      bars.push(
        <as-placeholder-bar class='placeholder-chart__bar' height={`${barPercentage}%`} width={`${this.barWidth}px`}>
        </as-placeholder-bar>
      );
    }

    return bars;
  }

  public setElementWidth() {
    const boundingRect = this.element.getBoundingClientRect();
    this.elementWidth = boundingRect.width;
  }
}

function calculateBarsQuantity(elementWidth, barWidth) {
  if (!elementWidth) {
    return 1;
  }

  return Math.floor(elementWidth / barWidth);
}
