import { Component, Element, Prop } from '@stencil/core';
import { axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import readableNumber from '../../../utils/readable-number';


/**
 * Helper class to draw the vertical axis on some widgets.
 *
 * @export
 * @class YAxis
 */
@Component({
  shadow: false,
  styleUrl: './as-y-axis.scss',
  tag: 'as-y-axis',
})
export class YAxis {

  /**
   * Header of the widget to be displayed
   *
   * @type {number}
   * @memberof YAxis
   */
  @Prop() public from: number = 0;

  /**
   * Header of the widget to be displayed
   *
   * @type {Number[]}
   * @memberof YAxis
   */
  @Prop() public to: number = 0;


  /**
   * Reference to the web component element.
   */
  @Element() private element: HTMLElement;


  public render() {
    const ELEMENT = select(this.element.previousElementSibling);
    const HEIGHT = ELEMENT.node().getBoundingClientRect().height * 0.8;
    const WIDTH = ELEMENT.node().getBoundingClientRect().width;
    const RANGE = [HEIGHT, 0];
    const OFFSET = 60;

    const yScale = scaleLinear()
      .domain([this.from, this.to])
      .range(RANGE)
      .nice();

    const yAxis = axisLeft(yScale)
      .ticks(5)
      .tickSize(-(WIDTH - OFFSET))
      .tickFormat((d) => `${readableNumber(d)}`);

    ELEMENT
      .append('g')
      .attr('class', 'x-axis')
      .call(yAxis);
  }
}
