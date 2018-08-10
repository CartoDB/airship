import { Component, Prop, Watch, State, Method } from '@stencil/core';
import readableNumber from '../../utils/readable-number';
import { shadeOrBlend } from '../../utils/styles';
import { select, event as d3event, Selection, BaseType } from 'd3-selection';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { brushX } from 'd3-brush';
import { axisLeft, axisBottom, Axis } from 'd3-axis';
import 'd3-transition';

const DEFAULT_BAR_COLOR = '#1785FB';
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

  /**
   * Override color for the histogram bars
   *
   * @type {string}
   * @memberof HistogramWidget
   */
  @Prop() public color: string = DEFAULT_BAR_COLOR;

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

  /**
   * Function that formats the tooltip. Receives HistogramData and outputs a string
   * 
   * @type {(HistogramData) => string}
   * @memberof HistogramWidget
   */
  @Prop() public tooltipFormatter: (value: HistogramData) => string = this.defaultFormatter;

  /**
   * Default formatting function. Makes the value a readable number and
   * converts it into a string. Useful to compose with your own formatting
   * function.
   * 
   * @memberof HistogramWidget
   */
  @Method()
  defaultFormatter(data: HistogramData) {
    return `${readableNumber(data.value)}`;
  }

  @State() tooltip: string;

  @Watch('data')
  onDataChanged() {
    this._updateAxes();
    this._renderBars();
  }

  @Watch('color')
  onColorChanged() {
    this._renderBars();
  }
  
  private container: Selection<HTMLElement, {}, null, undefined>;
  private tooltipElement: HTMLElement;

  private xScale: ScaleLinear<number, number>;
  private yScale: ScaleLinear<number, number>;
  private yAxis: Axis<{ valueOf(): number }>;
  private xAxis: Axis<{ valueOf(): number }>;
  private yAxisSelection: Selection<BaseType, {}, null, undefined>;
  private xAxisSelection: Selection<BaseType, {}, null, undefined>;
  private barsContainer: Selection<BaseType, {}, null, undefined>;
  private bars: Selection<BaseType, HistogramData, BaseType, {}>;

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
    
    this.container
      .append('g')
      .attr('class', 'brush')
      .call(brushX()
        .handleSize(BARS_SEPARATION + 4)
        .extent([[MARGIN.LEFT, MARGIN.TOP], [WIDTH + MARGIN.LEFT, HEIGHT + MARGIN.TOP]])
        .on('brush', this._onBrush.bind(this))
        );

    this._renderBars();
    this._cleanAxes();
  }

  private _adjustSelectionLower (value: number) {
    if (value <= this.data[0].start) {
      return this.data[0].start;
    }

    if (value >= this.data[this.data.length - 1].end) {
      return this.data[this.data.length - 1].start;
    }

    for (var i = 0; i < this.data.length; i++) {
      if (value >= this.data[i].start && value < this.data[i].end) {
        return this.data[i].start;
      }
    }
  }

  private _adjustSelectionUpper (value: number) {
    if (value <= this.data[0].start) {
      return this.data[0].end;
    }

    if (value >= this.data[this.data.length - 1].end) {
      return this.data[this.data.length - 1].end;
    }

    for (var i = 0; i < this.data.length; i++) {
      if (value > this.data[i].start && value <= this.data[i].end) {
        return this.data[i].end;
      }
    }
  }

  private _onBrush (_d, index: number, nodes: SVGElement[]) {
    const evt = d3event as any; // I can't cast this properly :(
    if (evt.sourceEvent.type === "brush") return;
    const d0 = evt.selection
      .map(e => e - MARGIN.LEFT)
      .map(this.xScale.invert)
      .map(e => Math.round(e));

    const d1 = [this._adjustSelectionLower(d0[0]), this._adjustSelectionUpper(d0[1])];

    console.log(d0, d1);
  
    select(nodes[index]).call(evt.target.move, d1.map(this.xScale).map(e => e + MARGIN.LEFT));
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
      .on('mouseout', (_data: HistogramData, index: number, nodes: BaseType[]) => {
        select(nodes[index]).style('fill', this.color)
        this.tooltip = null;
      })
      .on('mouseenter', (data: HistogramData) => {
        this.tooltip = this.tooltipFormatter(data);
        this._showTooltip(event as MouseEvent);
      })
      .on('mousemove', (_data: HistogramData, index: number, nodes: BaseType[]) => {
        select(nodes[index]).style('fill', shadeOrBlend(-0.16, this.color))
        select(this.tooltipElement).style('opacity', 0);
        this._showTooltip(event as MouseEvent);
      })
      .merge(this.bars)
      .attr('class', 'bar')
      .attr('y', HEIGHT)
      .attr('x', (_d: HistogramData, index: number) => index * barWidth)
      .attr('width', () => Math.max(0, barWidth - BARS_SEPARATION))
      .attr('height', 0)
      .style('fill', this.color)
      .transition()
      .delay(200)
      .attr('y', (data: HistogramData) => this.yScale(data.value))
      .attr('height', (data: HistogramData) => HEIGHT - this.yScale(data.value));

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
        {this.tooltip}
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
