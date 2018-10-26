import { Component, Element, Event, EventEmitter, Method, Prop, State, Watch } from '@stencil/core';
import { max } from 'd3-array';
import { Axis, axisBottom, axisLeft } from 'd3-axis';
import { BrushBehavior, brushX } from 'd3-brush';
import { format } from 'd3-format';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import {
  BaseType,
  event as d3event,
  select,
  Selection
} from 'd3-selection';
import 'd3-transition';
import readableNumber from '../../utils/readable-number';
import { shadeOrBlend } from '../../utils/styles';
import contentFragment from '../common/content.fragment';
import { HistogramColorRange, HistogramData } from './interfaces';
import dataService from './utils/data.service';
import drawService from './utils/draw.service';

const CUSTOM_HANDLE_SIZE = 15;
const DEFAULT_BAR_COLOR = 'var(--as-color-primary, #1785FB)';
const DEFAULT_SELECTED_BAR_COLOR = 'var(--as-color-complementary, #47DB99)';
const HEIGHT = 125;
const BARS_SEPARATION = 1;
const MARGIN = {
  BOTTOM: 15,
  LEFT: 30,
  RIGHT: 3,
  TOP: 5,
  YAxis: 20
};
const CUSTOM_HANDLE_Y_COORD = HEIGHT + MARGIN.TOP - (CUSTOM_HANDLE_SIZE / 2);

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
  @Prop() public showHeader: boolean = true;

  /**
   * Display a clear button that clears the histogram selection.
   *
   * @type {boolean}
   * @memberof HistogramWidget
   */
  @Prop() public showClear: boolean;

  /**
   * Disables selection brushes and events for the widget
   *
   * @type {boolean}
   * @memberof HistogramWidget
   */
  @Prop() public disableInteractivity: boolean = false;

  /**
   * Histogram data to be displayed
   *
   * @type {HistogramData[]}
   * @memberof HistogramWidget
   */
  @Prop() public data: HistogramData[] = [];

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
   * Label the x axis of the histogram with the given string.
   */
  @Prop() public xLabel: string;

  /**
   * Label the y axis of the histogram with the given string.
   */
  @Prop() public yLabel: string;

  /**
   * Boolean property to control if the widget is loading
   */
  @Prop() public isLoading: boolean = false;

  /**
   * Control the text shown in header subtitle
   */
  @Prop() public error: string = '';

  /**
   * Extended error description, only shown when error is present
   */
  @Prop() public errorDescription: string = '';

  @Element() private el: HTMLElement;

  /**
   * Fired when user update or clear the widget selection.
   *
   * @type {EventEmitter<number[]>}
   * @memberof HistogramWidget
   */
  @Event()
  private selectionChanged: EventEmitter<number[]>;

  @State()
  private tooltip: string;

  private container: Selection<HTMLElement, {}, null, undefined>;
  private tooltipElement: HTMLElement;

  private xScale: ScaleLinear<number, number>;
  private yScale: ScaleLinear<number, number>;
  private yAxis: Axis<{ valueOf(): number }>;
  private xAxis: Axis<{ valueOf(): number }>;
  private barsContainer: Selection<BaseType, {}, null, undefined>;
  private brush: BrushBehavior<{}>;
  private brushArea: Selection<BaseType, {}, null, undefined>;
  private customHandlers: Selection<BaseType, { type: string }, BaseType, {}>;
  private bottomLine: Selection<BaseType, {}, BaseType, {}>;
  private selection: number[] = null;

  private chartWidth: number;

  /**
   * Default formatting function. Makes the value a readable number and
   * converts it into a string. Useful to compose with your own formatting
   * function.
   *
   * @memberof HistogramWidget
   */
  public defaultFormatter(data: HistogramData) {
    return `${readableNumber(data.value)}`;
  }

  /**
   * Returns the current selection
   *
   * @returns {number[]}
   * @memberof HistogramWidget
   */
  @Method()
  public async getSelection(): Promise<number[]> {
    return this.selection;
  }

  /**
   * Programmatically set the selection. It will be adjusted to the buckets
   * present in {@link data}. To clear see {@link clearSelection} or call with null
   *
   * @param {number[] | null} values
   * @memberof HistogramWidget
   */
  @Method()
  public setSelection(values: number[] | null) {
    this._setSelection(values);
    this.selectionChanged.emit(this.selection);
  }

  /**
   * Clears the Histogram selection
   *
   * @memberof HistogramWidget
   */
  @Method()
  public clearSelection() {
    this.setSelection(null);
  }

  @Watch('data')
  public onDataChanged() {
    if (this.isLoading || this._isEmpty() || this.error) {
      return;
    }
    const xDomain = dataService.getXDomain(this.data);
    const yDomain = dataService.getYDomain(this.data);

    drawService.updateAxes(
      this.container, this.xScale, this.yScale, this.xAxis, this.yAxis, xDomain, yDomain);

    drawService.renderBars(
      this.data, this.yScale, this.chartWidth, MARGIN, this.barsContainer, HEIGHT, BARS_SEPARATION, this.color);

    if (this.selection === null) {
      return;
    }

    if (this._selectionInData(this.selection)) {
      this._setSelection(this.selection);
    } else {
      this.clearSelection();
    }
  }

  @Watch('color')
  public onColorChanged() {
    drawService.renderBars(
      this.data, this.yScale, this.chartWidth, MARGIN, this.barsContainer, HEIGHT, BARS_SEPARATION, this.color);
  }

  public componentDidLoad() {
    if (this.isLoading || this._isEmpty() || this.error) {
      return;
    }
    // This is probably not necessary for production, but HMR causes this method
    // to be called on each file change
    this.container.selectAll('*').remove();

    this._renderGraph();
  }

  public render() {
    const spaceForYLabel = this.yLabel ? 25 : 0;
    MARGIN.LEFT = spaceForYLabel ? MARGIN.LEFT + 25 : MARGIN.LEFT;
    this.chartWidth = (this.el.offsetWidth - MARGIN.YAxis) - spaceForYLabel;

    return [
      this._renderHeader(),
      this._renderContent(),
    ];
  }

  private _renderContent() {
    const histogramClasses = {
      'as-histogram-widget__wrapper': true,
      'as-histogram-widget__wrapper--disabled': this.disableInteractivity
    };
    return contentFragment(this.isLoading, this.error, this._isEmpty(), this.heading, this.errorDescription,
      [
        <div class={histogramClasses}>
          {this._renderTooltip()}
          <svg ref={(ref: HTMLElement) => this.container = select(ref)}></svg>
          {this._renderLabels()}
        </div>,
        this.showClear && !this.disableInteractivity ? this._renderClearBtn() : ''
      ]);
  }

  private _renderGraph() {
    this._renderYAxis();
    this._renderXAxis();

    this.barsContainer = this.container
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this.brush = brushX()
      .handleSize(BARS_SEPARATION + 4)
      .extent([[MARGIN.LEFT, MARGIN.TOP], [this.chartWidth + MARGIN.LEFT, HEIGHT + MARGIN.TOP]])
      .on('brush', this._onBrush.bind(this))
      .on('end', this._onBrushEnd.bind(this));

    if (!this.disableInteractivity) {
      this.brushArea = this.container
        .append('g')
        .attr('class', 'brush')
        .call(this.brush);

      this.customHandlers = this.brushArea.selectAll('.handle--custom')
        .data([{ type: 'w' }, { type: 'e' }])
        .enter().append('rect')
        .style('opacity', 0)
        .attr('class', 'handle--custom')
        .attr('fill', this.selectedColor)
        .attr('cursor', 'ew-resize')
        .attr('width', CUSTOM_HANDLE_SIZE)
        .attr('height', CUSTOM_HANDLE_SIZE)
        .attr('rx', '100')
        .attr('ry', '100');

      this.bottomLine = this.brushArea.append('line')
        .attr('class', 'bottomline')
        .attr('stroke', this.selectedColor)
        .attr('stroke-width', 4)
        .attr('y1', HEIGHT + MARGIN.TOP)
        .attr('y2', HEIGHT + MARGIN.TOP)
        .style('opacity', 0)
        .attr('pointer-events', 'none');
    }

    this.container.on('mousemove', () => {
      const evt = d3event as MouseEvent;
      const { clientX, clientY } = evt;
      let anyHovered = false;

      this.barsContainer.selectAll('rect')
        .each((data: HistogramData, i, nodes) => {
          const selected = this._isSelected(data);
          const nodeSelection = select(nodes[i]);
          const node = nodes[i] as Element;
          const bb = node.getBoundingClientRect();
          const isInsideBB = bb.left <= clientX &&
            clientX <= bb.right &&
            bb.top <= clientY &&
            clientY <= bb.bottom;

          if (isInsideBB) {
            let color = selected ? this._toColor(this.selectedColor) : data.color || this._toColor(this.color);
            color = shadeOrBlend(-0.16, color);
            nodeSelection.style('fill', color);
            this.tooltip = this.tooltipFormatter(data);
            this._showTooltip(evt);
            anyHovered = true;
          } else {
            nodeSelection.style('fill', selected ? this.selectedColor : data.color || this.color);
          }
        });

      if (!anyHovered) {
        this.tooltip = null;
      }
    })
      .on('mouseout', () => {
        this.tooltip = null;
        this.barsContainer.selectAll('rect')
          .style('fill', (data: HistogramData) => {
            if (this._isSelected(data)) {
              return this.selectedColor;
            }
            return data.color || this.color;
          });
      });

    drawService.renderBars(
      this.data, this.yScale, this.chartWidth, MARGIN, this.barsContainer, HEIGHT, BARS_SEPARATION, this.color);
  }

  private _adjustSelection(values: number[] | null): number[] | null {
    if (values === null) {
      return null;
    }

    return [this._adjustSelectionFor(values[0], 'start'),
    this._adjustSelectionFor(values[1], 'end')];
  }

  private _adjustSelectionFor(value: number, fieldName: 'start' | 'end') {
    if (value <= this.data[0].start) {
      return this.data[0][fieldName];
    }

    if (value >= this.data[this.data.length - 1].end) {
      return this.data[this.data.length - 1][fieldName];
    }

    for (const iterator of this.data) {
      const breakPoint = iterator.start + Math.floor((iterator.end - iterator.start) / 2);
      if (value >= iterator.start && value <= breakPoint) {
        return iterator.start;
      } else if (value > breakPoint && value < iterator.end) {
        return iterator.end;
      }
    }
  }

  private _hideCustomHandlers() {
    this.customHandlers.style('opacity', 0);
    this.bottomLine.style('opacity', 0);
  }

  private _onBrush() {
    if (this.disableInteractivity) {
      return;
    }

    const evt = d3event as any; // I can't cast this properly :(

    if (evt.selection === null) {
      this._hideCustomHandlers();
      return;
    }

    // I don't know why this happens
    if (!evt.sourceEvent || evt.sourceEvent.type === 'brush') {
      return;
    }

    // Convert to our data's domain
    const d0 = evt.selection
      .map((e) => Math.round(this.xScale.invert(e - MARGIN.LEFT)));

    this._setSelection(d0);
  }

  private _onBrushEnd() {
    if (this.disableInteractivity) {
      return;
    }

    this.selectionChanged.emit(this.selection);
  }

  private _setSelection(selection: number[]) {
    if (this.disableInteractivity) {
      return;
    }

    const adjustedSelection = this._adjustSelection(selection);

    if (adjustedSelection !== null && (adjustedSelection[0] === adjustedSelection[1])) {
      return;
    }

    this.selection = adjustedSelection;
    this._updateHandles(adjustedSelection);
  }

  private _selectionInData(selection: number[]) {
    const inData = selection.map((selectionValue) => {
      return this.data.some((value) => selectionValue >= value.start && selectionValue <= value.end);
    });

    // True if any of the selection values is inside the data
    // Using inData.every(e => e) would be more restrictive
    return inData.some((e) => e);
  }

  private _isSelected(data: HistogramData) {
    if (this.selection === null) {
      return false;
    }

    return data.start >= this.selection[0] && data.end <= this.selection[1];
  }

  private _updateHandles(values: number[] | null) {
    if (values === null) {
      this.barsContainer.selectAll('rect')
        .style('fill', (_d, i) => {
          const d = this.data[i];
          return d.color || this.color;
        });
      this.brushArea.call(this.brush.move, null);

      return;
    }

    // Convert back to space coordinates
    const valuesSpace = values
      .map(this.xScale)
      .map((e) => e + MARGIN.LEFT);

    this.brushArea.call(this.brush.move, valuesSpace);

    this.customHandlers
      .style('opacity', 1)
      .attr('transform', (_d, i) => `translate(${valuesSpace[i] - (CUSTOM_HANDLE_SIZE / 2)},${CUSTOM_HANDLE_Y_COORD})`);
    this.bottomLine
      .style('opacity', 1)
      .attr('x1', valuesSpace[0])
      .attr('x2', valuesSpace[1]);

    this.barsContainer.selectAll('.bar')
      .style('fill', (_d, i) => {
        const d = this.data[i];
        if ((values[0] <= d.start && d.end <= values[1])) {
          return this.selectedColor;
        }
        return d.color || this.color;
      });
  }

  private _renderYAxis() {
    const barsWidth = this.chartWidth - MARGIN.YAxis;
    const yDomain = dataService.getYDomain(this.data);
    const [yScale, yAxis] = drawService.renderYAxis(this.container, yDomain, barsWidth, MARGIN, HEIGHT);

    this.yScale = yScale;
    this.yAxis = yAxis;
  }

  private _renderXAxis() {
    const barsWidth = this.chartWidth - MARGIN.YAxis;
    const xDomain = dataService.getXDomain(this.data);
    const [xScale, xAxis] = drawService.renderXAxis(this.container, xDomain, barsWidth, MARGIN, HEIGHT);

    this.xScale = xScale;
    this.xAxis = xAxis;
  }

  private _getTooltipPosition(mouseX: number, mouseY: number) {
    const OFFSET = 25;
    let x = mouseX;
    let y = mouseY;

    const viewportBoundaries = {
      bottom: window.innerHeight + window.pageYOffset,
      right: window.innerWidth + window.pageXOffset,
    };

    const tooltipContainerBoundingRect = this.tooltipElement.getBoundingClientRect();

    const tooltipBoundaries = {
      bottom: mouseY + tooltipContainerBoundingRect.height,
      right: mouseX + tooltipContainerBoundingRect.width,
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
    if (!this.tooltipElement) {
      return;
    }

    const [x, y] = this._getTooltipPosition(event.layerX, event.layerY);

    select(this.tooltipElement)
      .style('opacity', '1')
      .style('left', `${x + 10}px`)
      .style('top', `${y + 20}px`);
  }

  private _renderHeader() {
    if (!this.showHeader) {
      return;
    }

    return <as-widget-header
      header={this.heading}
      subheader={this.description}
      is-loading={this.isLoading}
      is-empty={this._isEmpty()}
      error={this.error}>
    </as-widget-header>;
  }

  private _renderTooltip() {
    if (this.tooltip === null) {
      return;
    }

    return (<span
      ref={(ref: HTMLElement) => this.tooltipElement = ref}
      role='tooltip'
      class='as-histogram-widget__tooltip'>
      {this.tooltip}
    </span>);
  }

  private _renderClearBtn() {
    return (
      <button
        class='as-btn as-btn--primary as-btn--s as-histogram-widget__clear'
        onClick={() => this._setSelection(null)}>Clear selection
      </button>
    );
  }

  private _renderLabels() {

    return [
      this.yLabel ? <div class='y-label-wrapper'><div class='y-label'>{this.yLabel}</div> </div> : '',
      this.xLabel ? <div class='x-label'>{this.xLabel}</div> : '',
    ];
  }

  // If the parameter is a css variable will be evaluated to a color
  private _toColor(color) {
    if (color.startsWith('var(')) {
      color = color.match(/--\S[^\|,)]*/)[0];
      return getComputedStyle(this.el).getPropertyValue(color).toLowerCase().trim();
    }
    return color;
  }

  private _isEmpty(): boolean {
    return !this.data || !this.data.length;
  }
}
