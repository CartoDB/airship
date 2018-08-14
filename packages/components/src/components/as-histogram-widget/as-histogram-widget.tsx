import { Component, Prop, Watch, State, Method, Event, EventEmitter } from '@stencil/core';
import readableNumber from '../../utils/readable-number';
import { shadeOrBlend } from '../../utils/styles';
import { select, event as d3event, Selection, BaseType } from 'd3-selection';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { brushX, brushSelection, BrushBehavior } from 'd3-brush';
import { axisLeft, axisBottom, Axis } from 'd3-axis';
import 'd3-transition';

const DEFAULT_BAR_COLOR = '#1785FB';
const DEFAULT_SELECTED_BAR_COLOR = '#fabada';
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
   * Display a clear button that clears the histogram selection.
   *
   * @type {boolean}
   * @memberof HistogramWidget
   */
  @Prop() public showClear: boolean;

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
   * Override color for the selected histogram bars
   *
   * @type {string}
   * @memberof HistogramWidget
   */
  @Prop() public selectedColor: string = DEFAULT_SELECTED_BAR_COLOR;

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

    if (this.selection !== null) {
      this._setSelection([this._adjustSelectionLower(this.selection[0]), this._adjustSelectionUpper(this.selection[1])]);
      this._updateHandles(this.selection);
    }
  }

  @Watch('color')
  onColorChanged() {
    this._renderBars();
  }

  /**
   * Returns the current selection
   *
   * @returns {number[]}
   * @memberof HistogramWidget
   */
  @Method()
  getSelection() : number[] {
    return this.selection;
  }

  @Event()
  selectionChanged: EventEmitter;
  
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
  private brush: BrushBehavior<{}>;
  private brushArea: Selection<BaseType, {}, null, undefined>;
  private customHandlers: Selection<BaseType, { type: string }, BaseType, {}>;
  private bottomLine: Selection<BaseType, {}, BaseType, {}>;
  private selection: number[] = null;

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
    
    this.brush = brushX()
      .handleSize(BARS_SEPARATION + 4)
      .extent([[MARGIN.LEFT, MARGIN.TOP], [WIDTH + MARGIN.LEFT, HEIGHT + MARGIN.TOP]])
      .on('brush', this._onBrush.bind(this));

    this.brushArea = this.container
      .append('g')
      .attr('class', 'brush')
      .call(this.brush);

    this.customHandlers = this.brushArea.selectAll('.handle--custom')
      .data([{type: 'w'}, {type: 'e'}])
      .enter().append('rect')
        .style('opacity', 0)
        .attr('class', 'handle--custom')
        .attr('fill', this.selectedColor)
        .attr('cursor', 'ew-resize')
        .attr('width', '10')
        .attr('height', '10')
        .attr('rx', '100')
        .attr('ry', '100');
    
    this.bottomLine = this.brushArea.append('line')
        .attr('class', 'bottomline')
        .attr('stroke', this.selectedColor)
        .attr('stroke-width', 2)
        .attr('y1', HEIGHT + MARGIN.TOP)
        .attr('y2', HEIGHT + MARGIN.TOP)
        .style('opacity', 0)
        .attr('pointer-events', 'none');

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

  _hideCustomHandlers() {
    this.customHandlers.style('opacity', 0);
    this.bottomLine.style('opacity', 0);
  }

  private _onBrush (_d, index: number, nodes: SVGElement[]) {
    const evt = d3event as any; // I can't cast this properly :(

    if (evt.selection === null) {
      this._hideCustomHandlers();
      return;
    }

    if (!evt.sourceEvent) return; // I don't know why this happens
    if (evt.sourceEvent.type === "brush") return;
    
    // Convert to our data's domain
    const d0 = evt.selection
      .map(e => e - MARGIN.LEFT)
      .map(this.xScale.invert)
      .map(e => Math.round(e));

    // Round to most approximate bucket
    const d1 = [this._adjustSelectionLower(d0[0]), this._adjustSelectionUpper(d0[1])];

    if (d1[0] === d1[1]) {
      return;
    }
    
    this._setSelection(d1);

    this._updateHandles(d1);
  }

  private _setSelection (selection: number[]) {
    this.selection = selection;
    this.selectionChanged.emit(this.selection);
  }

  private _updateHandles(values: number[]) {
    // Convert back to space coordinates
    const valuesSpace = values.map(this.xScale).map(e => e + MARGIN.LEFT);
  
    this.brushArea.call(this.brush.move, valuesSpace);

    this.customHandlers
      .style('opacity', 1)
      .attr('transform', (_d, i) => `translate(${valuesSpace[i] - 5},${HEIGHT + MARGIN.TOP - 5})`);
    this.bottomLine
      .style('opacity', 1)
      .attr('x1', valuesSpace[0])
      .attr('x2', valuesSpace[1]);

    this.barsContainer.selectAll('.bar')
      .style('fill', (_d, i) => {
        const d = this.data[i];
        return (values[0] <= d.start && d.end <= values[1]) ? this.selectedColor : this.color;
      });
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

  _renderClearBtn() {
    if (!this.showClear) {
      return;
    }

    return (
      <button onClick={() => this._onClear() }>Clear selection</button>
    );
  }

  _onClear() {
    // Clear the brush
    this.brushArea.call(this.brush.move, null);
    this.barsContainer.selectAll('rect').style('fill', this.color);
    this._setSelection(null);
  }

  render() {
    return [
      this._renderHeader(),
      <svg ref={(ref: HTMLElement) => this.container = select(ref)} viewBox='0 0 248 160'></svg>,
      this._renderClearBtn(),
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
