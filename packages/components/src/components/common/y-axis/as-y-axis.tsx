import { Component, Element, Prop } from '@stencil/core';
import { axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import readableNumber from '../../../utils/readable-number';


/**
 * Helper class to draw the vertical axis on some widgets.
 * WARNING: This component should be placed next to the SVG element.
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
    const VERTICAL_SPACING = 36; // Need 16px top and bottom to view the labels
    const TICK_RIGHT_MARGIN = 16;
    const LABEL_WIDTH = 32;
    const ELEMENT = select(this.element.previousElementSibling);
    const HEIGHT = ELEMENT.node().getBoundingClientRect().height - VERTICAL_SPACING;
    const WIDTH = ELEMENT.node().getBoundingClientRect().width;
    const TICK_SIZE = - WIDTH + LABEL_WIDTH;
    const RANGE = [HEIGHT, 0];

    const yScale = scaleLinear()
      .domain([this.from, this.to])
      .range(RANGE);

    const yAxis = axisLeft(yScale)
      .tickSizeInner(TICK_SIZE + TICK_RIGHT_MARGIN)
      .ticks(5)
      .tickFormat((d) => `${readableNumber(d)}`);


    if (ELEMENT.select('.y-axis').empty()) {
      this._createYAxisElement(ELEMENT).call(yAxis);
    } else {
      ELEMENT.select('.y-axis').call(yAxis);
    }
  }

  private _createYAxisElement(element: Selection<Element, {}, null, undefined>) {
    return element.append('g').attr('class', 'y-axis');
  }
}
