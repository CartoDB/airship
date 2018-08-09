import { Component, Prop, Watch, State } from '@stencil/core';
import readableNumber from '../../utils/readable-number';
import { select, Selection } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';
import 'd3-transition';

const WIDTH = 205;
const HEIGHT = 125;
const BARS_SEPARATION = 1;
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

  @Watch('data')
  onDataChanged() {
    this._updateAxes();
    this._renderBars();
  }

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

  @State() tooltip: string;
  
  private container: Selection<HTMLElement, {}, null, undefined>;
  private tooltipElement: HTMLElement;

  private xScale: any;
  private yScale: any;
  private yAxis: any;
  private xAxis: any;
  private yAxisSelection: any;
  private xAxisSelection: any;
  private barsContainer: any;
  private bars: any;

  componentDidLoad() {
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

    this.barsContainer = this.container
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this._renderBars();
    this._cleanAxes();
  }

  private _renderYAxis() {
    const data = this.data;

    // -- Y Axis
    this.yScale = scaleLinear()
      .range([HEIGHT, 0])
      .domain([0, max(data, d => d.value)])
      .nice();

    this.yAxis = axisLeft(this.yScale)
      .tickSize(-WIDTH)
      .ticks(5)
      .tickPadding(10);

    this.yAxisSelection = this.container
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
      .call(this.yAxis);
  }

  private _renderXAxis() {
    const data = this.data;
    const { start } = data[0];
    const { end } = data[data.length - 1];

    this.xScale = scaleLinear()
      .domain([start, end])
      .range([0, WIDTH]);

    this.xAxis = axisBottom(this.xScale)
      .tickSize(-WIDTH)
      .ticks(3)
      .tickPadding(10);

    this.xAxisSelection = this.container
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(${MARGIN.LEFT}, ${HEIGHT + MARGIN.BOTTOM})`)
      .call(this.xAxis);
  }

  private _renderBars() {
    const data = this.data;
    const barWidth = WIDTH / data.length;

    // -- Draw bars
    this.bars = this.barsContainer
      .selectAll('rect')
      .data(data);

    // -- Exit
    this.bars.exit().remove();

    // -- Enter
    this.bars
      .enter()
      .append('rect')
      .on('mouseout', () => this.tooltip = null)
      .on('mouseenter', d => {
        this.tooltip = d.value;
        this._showTooltip(event as MouseEvent);
      })
      .on('mousemove', () => {
        select(this.tooltipElement).style('opacity', 0);
        this._showTooltip(event as MouseEvent);
      })
      .merge(this.bars)
      .attr('class', 'bar')
      .attr('y', HEIGHT)
      .attr('x', (d, index) => index * barWidth)
      .attr('width', () => Math.max(0, barWidth - BARS_SEPARATION))
      .attr('height', 0)
      .transition()
      .delay(200)
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => HEIGHT - this.yScale(d.value));

    // -- Update
    this.bars
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => HEIGHT - this.yScale(d.value));

  }

  private _getTooltipPosition(mouseX: number, mouseY: number) {
    const OFFSET = 25;
    let x = mouseX;
    let y = mouseY;

    const viewportBoundaries = {
      right: window.innerWidth + window.pageXOffset,
      bottom: window.innerHeight + window.pageYOffset,
    };

    const tooltipContainerBoundingRect = this.tooltipElement.getBoundingClientRect();

    const tooltipBoundaries = {
      right: mouseX + tooltipContainerBoundingRect.width,
      bottom: mouseY + tooltipContainerBoundingRect.height,
    };

    if (viewportBoundaries.right < tooltipBoundaries.right) {
      x = mouseX - tooltipContainerBoundingRect.width;
    }

    if (viewportBoundaries.bottom < tooltipBoundaries.bottom) {
      y = mouseY - tooltipContainerBoundingRect.height - OFFSET;
    }

    return [x, y];
  }

  private _showTooltip(event: MouseEvent) {
    const [x, y] = this._getTooltipPosition(event.layerX, event.layerY);

    select(this.tooltipElement)
      .style('opacity', '1')
      .style('left', `${x + 10}px`)
      .style('top', `${y + 20}px`)
  }

  private _cleanAxes() {
    this.yAxisSelection.select('.domain').remove();
    this.xAxisSelection.select('.domain').remove();
    this.xAxisSelection.selectAll('line').remove();
  }

  private _updateAxes() {
    const data = this.data;
    const { start } = data[0];
    const { end } = data[data.length - 1];

    // -- Update scales
    this.yScale
      .domain([0, max(data, d => d.value)])
      .nice();

    this.xScale
      .domain([start, end]);

    // -- Update axes
    this.xAxisSelection
      .call(this.xAxis);

    this.yAxisSelection
      .call(this.yAxis);

    this._cleanAxes();
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

  _renderTooltip() {
    if (this.tooltip === null) {
      return;
    }

    return (<span
      ref={(ref: HTMLElement) => this.tooltipElement = ref}
      role="tooltip"
      class="as-histogram-widget__tooltip">
        {readableNumber(this.tooltip)}
      </span>);
  }

  render() {
    return [
      this._renderHeader(),
      <svg ref={(ref: HTMLElement) => this.container = select(ref)} viewBox='0 0 248 160'></svg>,
      this._renderTooltip()
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
