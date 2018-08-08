import { Component, Prop, Element } from '@stencil/core';
import readableNumber from '../../utils/readable-number';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max, range } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import 'd3-transition';

const WIDTH = 205;
const HEIGHT = 125;
const DIVISION_WIDTH = 80;
// const BARS_SEPARATION = 1;
const MARGIN = {
  TOP: 15,
  RIGHT: 3,
  BOTTOM: 15,
  LEFT: 30,
};

/**
 * Histogram Widget
 *
 * @export
 * @class HistogramWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-histogram-widget.scss',
  tag: 'as-histogram-widget',
})
export class HistogramWidget {
  /**
   * Title of the widget to be displayed
   *
   * @type {string}
   * @memberof HistogramWidget
   */
  @Prop() public heading: string;

  /**
   * Description of the widget to be displayed
   *
   * @type {string}
   * @memberof HistogramWidget
   */
  @Prop() public description: string;

  /**
   * Toggles displaying title and description
   *
   * @type {boolean}
   * @memberof HistogramWidget
   */
  @Prop() public showHeader: boolean;

  /**
   * Histogram data to be displayed
   *
   * @type {HistogramData[]}
   * @memberof HistogramWidget
   */
  @Prop() public data: HistogramData[];

  /**
   * Bar color to be used by default
   *
   * @type {string}
   * @memberof HistogramWidget
   */
  @Prop() public defaultBarColor: string;

  /**
   * Color range for histogram data
   *
   * @type {HistogramColorRange[]}
   * @memberof HistogramWidget
   */
  @Prop() public colorRange: HistogramColorRange[];

  @Element() histogramEl: HTMLElement;
  
  private container;

  private xScale: any;
  private yScale: any;
  private yAxis: any;
  private xAxis: any;
  private yAxisSelection: any;
  private xAxisSelection: any;

  componentDidLoad() {
    this.container = select(this.histogramEl.querySelector('svg'));
    // This is probably not necessary for production, but HMR causes this method
    // to be called on each file change
    this.container.selectAll('*').remove();

    if (this.data) {
      this._renderGraph();
    }
  }

  private _renderGraph() {
    this._renderYAxis();
    this._renderXAxis();
  }

  private _renderYAxis() {
    const data = this.data;

    // -- Y Axis
    this.yScale = scaleLinear()
      .range([HEIGHT, 0])
      .domain([0, max(data, d => d.value)])
      .nice();

    this.yAxis = axisLeft(this.yScale)
      .tickSize(-WIDTH, 0, 0)
      .ticks(5)
      .tickPadding(10);

    this.yAxisSelection = this.container
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
      .call(this.yAxis);

    this.yAxisSelection.select('.domain').remove();
  }

  private _renderXAxis() {
    const data = this.data;
    const { start } = data[0];
    const { end } = data[data.length - 1];

    this.xScale = scaleLinear()
      .domain([start, end])
      .range([0, WIDTH]);

    this.xAxis = axisBottom(this.xScale)
      .tickSize(-WIDTH, 0, 0)
      .ticks(3)
      .tickPadding(10);

    this.xAxisSelection = this.container
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(${MARGIN.LEFT}, ${HEIGHT + MARGIN.BOTTOM})`)
      .call(this.xAxis);

    this.xAxisSelection.select('.domain').remove();
    this.xAxisSelection.selectAll('line').remove();
  }

  _renderHeader() {
    if (!this.showHeader) {
      return;
    }

    return [
      <h3 class="">{this.heading}</h3>,
      <p class="">{this.description}</p>,
    ];
  }

  render() {
    return [
      this._renderHeader(),
      <svg viewBox='0 0 248 160'></svg>
    ];
  }
}

export interface HistogramData {
  start: number;
  end: number;
  value: number;
}

export interface HistogramColorRange {
  min: number;
  max: number;
  color: string;
}
