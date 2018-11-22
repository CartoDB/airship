import { Component, Element, Event, EventEmitter, Method, Prop, Watch } from '@stencil/core';
import { BrushBehavior, brushX } from 'd3-brush';
import { ScaleLinear } from 'd3-scale';
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
import { Container } from './types/Container';
import dataService, { binsScale } from './utils/data.service';
import drawService from './utils/draw.service';

// This is the default value of --as--color--primary
const DEFAULT_BAR_COLOR_HEX = '#1785FB';
// This is the default value of --as--color--complementary
const DEFAULT_SELECTED_BAR_COLOR_HEX = '#1785FB';
const DEFAULT_BAR_COLOR = `var(--as--color--primary, ${DEFAULT_BAR_COLOR_HEX})`;
const DEFAULT_SELECTED_BAR_COLOR = `var(--as--color--complementary, ${DEFAULT_SELECTED_BAR_COLOR_HEX})`;
const BARS_SEPARATION = 1;
const CUSTOM_HANDLE_WIDTH = BARS_SEPARATION + 5;
const CUSTOM_HANDLE_HEIGHT = 14;

// we could use getComputedStyle instead of these
const X_PADDING = 38;
const Y_PADDING = 36;
const LABEL_PADDING = 25;

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
   * Use this attribute to put the widget in "loading mode".
   * When loading mode is active, a spinner will be shown and the data will be hidden.
   */
  @Prop() public isLoading: boolean = false;

  /**
   * Use this widget to put the widget in "error mode".
   * When error mode is active. The header will display the given text.
   * And the body will be display the errorDescription instead any data.
   */
  @Prop() public error: string = '';

  /**
   * Extended error description, only shown when error is present
   */
  @Prop() public errorDescription: string = '';

  /**
   * Message shown in header when no data is available
   */
  @Prop() public noDataHeaderMessage: string = 'NO DATA AVAILABLE';

  /**
   * Message shown in body when no data is available
   */
  @Prop() public noDataBodyMessage: string = 'There is no data to display.';

  /**
   * Use this attribute to decide if the widget should be rerendered on window resize.
   * Defaults to true.
   */
  @Prop() public responsive: boolean = true;

  @Element() private el: HTMLElement;

  /**
   * Fired when user update or clear the widget selection.
   *
   * @type {EventEmitter<number[]>}
   * @memberof HistogramWidget
   */
  @Event()
  private selectionChanged: EventEmitter<number[]>;

  private tooltip: string;

  private container: Container;
  private tooltipElement: HTMLElement;

  private xScale: ScaleLinear<number, number>;
  private binsScale: ScaleLinear<number, number>;
  private yScale: ScaleLinear<number, number>;
  private barsContainer: Container;
  private brush: BrushBehavior<{}>;
  private brushArea: Container;
  private customHandlers: Selection<BaseType, { type: string }, BaseType, {}>;
  private bottomLine: Selection<BaseType, {}, BaseType, {}>;
  private selection: number[] = null;

  private width: number;
  private height: number;
  private prevWidth: number;
  private prevHeight: number;

  private _color: string;
  private _selectedColor: string;

  constructor() {
    this._resizeRender = this._resizeRender.bind(this);
  }

  @Watch('data')
  public _onDataChanged(newData) {
    this.binsScale = binsScale(newData);
  }

  @Watch('color')
  public _onColorChanged(newColor) {
    const incomingColor = newColor || DEFAULT_BAR_COLOR;
    this._color = this._toColor(incomingColor, DEFAULT_BAR_COLOR_HEX);
  }

  @Watch('selectedColor')
  public _onSelectedColorChanged(newColor) {
    const incomingColor = newColor || DEFAULT_SELECTED_BAR_COLOR;
    this._selectedColor = this._toColor(incomingColor, DEFAULT_SELECTED_BAR_COLOR_HEX);
  }

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

  public componentDidLoad() {
    this._color = this._toColor(this.color, DEFAULT_BAR_COLOR_HEX);
    this._selectedColor = this._toColor(this.selectedColor, DEFAULT_SELECTED_BAR_COLOR_HEX);

    if (!this._hasDataToDisplay()) {
      return;
    }

    this.binsScale = binsScale(this.data);

    this._renderGraph();
  }

  public componentDidUpdate() {
    this._renderGraph();
  }

  public componentWillLoad() {
    addEventListener('resize', this._resizeRender);
  }

  public componentDidUnload() {
    removeEventListener('resize', this._resizeRender);
  }

  public render() {

    return [
      this._renderHeader(),
      this._renderContent(),
    ];
  }

  private _resizeRender() {
    this._renderGraph();
  }

  private _renderContent() {
    const histogramClasses = {
      'as-histogram-widget__wrapper': true,
      'as-histogram-widget__wrapper--disabled': this.disableInteractivity
    };
    const svgClasses = {
      'figure': true,
      'figure--has-x-label': this.xLabel,
      'figure--has-y-label': this.yLabel
    };
    return contentFragment(
      this.isLoading,
      this.error,
      this._isEmpty(),
      this.heading,
      this.errorDescription,
      this.noDataBodyMessage,
      [
        <div class={histogramClasses}>
          <svg class={svgClasses} ref={(ref: SVGElement) => this.container = select(ref)}></svg>
          {this._renderLabels()}
          {this._renderTooltip()}
        </div>,
        this.showClear && !this.disableInteractivity ? this._renderClearBtn() : ''
      ]);
  }

  private _renderGraph() {
    requestAnimationFrame(() => {
      const bbox = this.container.node().getBoundingClientRect();
      const firstRender = this.prevWidth === undefined || this.prevHeight === undefined;
      this.prevWidth = this.width;
      this.prevHeight = this.height;
      this.width = bbox.width;
      this.height = bbox.height;
      const resizing = !firstRender && (this.prevWidth !== this.width || this.height !== this.prevHeight);

      if (this.height === 0 || this.width === 0) { return; }

      this._renderYAxis();
      this._renderXAxis();

      if (this.container.select('.plot').empty()) {
        this.barsContainer = this.container
          .append('g');
        this.barsContainer
          .attr('class', 'plot');
      }

      if (!this.disableInteractivity) {
        if (!this.container.select('.brush').empty()) {
          this.container.select('.brush').remove();
        }

        this.brush = brushX()
          .handleSize(CUSTOM_HANDLE_WIDTH)
          .extent([[0, 0], [this.width - X_PADDING, this.height - Y_PADDING + (CUSTOM_HANDLE_HEIGHT / 2)]])
          .on('brush', this._onBrush.bind(this))
          .on('end', this._onBrushEnd.bind(this));

        this.brushArea = this.container
          .append('g');
        this.brushArea
          .attr('class', 'brush');

        this.brushArea.call(this.brush);

        this.bottomLine = this.brushArea.append('line')
          .attr('class', 'bottomline')
          .attr('stroke-width', 4)
          .attr('y1', this.height - Y_PADDING)
          .attr('y2', this.height - Y_PADDING)
          .style('opacity', 0)
          .attr('pointer-events', 'none');

        this.customHandlers = this.brushArea.selectAll('.handle--custom')
          .data([{ type: 'w' }, { type: 'e' }])
          .enter()
          .append('g')
          .attr('class', 'handle--wrapper');

        // We're setting width, height and transform here instead of CSS because of IE11
        this.customHandlers
          .append('rect')
          .attr('class', 'handle--custom')
          .attr('width', CUSTOM_HANDLE_WIDTH)
          .attr('height', CUSTOM_HANDLE_HEIGHT)
          .attr('rx', 2)
          .attr('ry', 2);

        const handleGrab = this.customHandlers
          .append('g')
          .attr('class', 'handle--grab');


        for (let i = 0; i < 3; i++) {
          handleGrab
            .append('line')
            .attr('x1', 2)
            .attr('y1', i * 2)
            .attr('x2', 4)
            .attr('y2', i * 2)
            .attr('class', 'grab-line');
        }
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
              let color = selected ? this._selectedColor : data.color || this._color;
              color = shadeOrBlend(-0.16, color);
              nodeSelection.style('fill', color);
              this.tooltip = this.tooltipFormatter(data);
              this._showTooltip(evt);
              anyHovered = true;
            } else {
              nodeSelection.style('fill', selected ? this._selectedColor : data.color || this._color);
            }
          });

        if (!anyHovered) {
          this.tooltip = null;
          this._hideTooltip();
        }
      })
        .on('mouseleave', () => {
          this.tooltip = null;
          this._hideTooltip();
          this.barsContainer.selectAll('rect')
            .style('fill', (data: HistogramData) => {
              if (this._isSelected(data)) {
                return this._selectedColor;
              }
              return data.color || this._color;
            });
        });

      drawService.renderBars(
        this.data,
        this.yScale,
        this.container,
        this.barsContainer,
        BARS_SEPARATION,
        this._color,
        X_PADDING + (this.yLabel ? LABEL_PADDING : 0),
        Y_PADDING,
        resizing);

      this._updateSelection();
    });
  }

  private _updateSelection() {
    if (this.selection === null || this.disableInteractivity) {
      return;
    }

    if (this._selectionInData(this.selection)) {
      this._setSelection(this.selection);
    } else {
      this.clearSelection();
    }
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
      .map((selection) => this.xScale.invert(selection))
      .map((bucket) => this.binsScale.invert(bucket));

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
    this._hideTooltip();
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
          return d.color || this._color;
        });
      this.brushArea.call(this.brush.move, null);

      return;
    }

    const yCoord = this.height - Y_PADDING;

    // Convert back to space coordinates
    const valuesSpace = values
      .map(this.binsScale)
      .map(this.xScale);

    this.brushArea.call(this.brush.move, valuesSpace);

    this.customHandlers
      .style('opacity', 1)
      .attr('transform', (_d, i) => {
        return `translate(${(valuesSpace[i] - (CUSTOM_HANDLE_WIDTH / 2) - 1)},${yCoord - CUSTOM_HANDLE_HEIGHT / 2})`;
      });
    this.bottomLine
      .style('opacity', 1)
      .attr('x1', valuesSpace[0])
      .attr('x2', valuesSpace[1]);

    this.barsContainer.selectAll('.bar')
      .style('fill', (_d, i) => {
        const d = this.data[i];
        if ((values[0] <= d.start && d.end <= values[1])) {
          return this._selectedColor;
        }
        return d.color || this._color;
      });
  }

  private _renderYAxis() {
    const yDomain = dataService.getYDomain(this.data);
    const yAxis = drawService.renderYAxis(
      this.container,
      yDomain,
      X_PADDING + (this.yLabel ? LABEL_PADDING : 0),
      Y_PADDING);

    this.yScale = yAxis.scale();
  }

  private _renderXAxis() {
    const xDomain = dataService.getXDomain(this.data);
    const xAxis = drawService.renderXAxis(
      this.container,
      xDomain,
      this.data.length,
      X_PADDING + (this.yLabel ? LABEL_PADDING : 0),
      Y_PADDING);

    this.xScale = xAxis.scale();
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

    const [x, y] = this._getTooltipPosition(event.clientX, event.clientY);

    select(this.tooltipElement)
      .style('display', 'inline')
      .style('left', `${x}px`)
      .style('top', `${y}px`)
      .text(this.tooltip);
  }

  private _hideTooltip() {
    select(this.tooltipElement)
      .style('display', 'none');
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
      error={this.error}
      no-data-message={this.noDataHeaderMessage}>
    </as-widget-header>;
  }

  private _renderTooltip() {
    if (this.tooltip === null) {
      return;
    }
    return (<span
      ref={(ref: HTMLElement) => this.tooltipElement = ref}
      role='tooltip'
      class='as-tooltip as-tooltip--top'>
    </span>);
  }

  private _renderClearBtn() {
    return (
      <div>
        <button
          class='as-btn as-btn--primary as-btn--s as-histogram-widget__clear'
          onClick={() => this._setSelection(null)}>Clear selection
        </button>
      </div>
    );
  }

  private _renderLabels() {

    return [
      this.yLabel ? <div class='y-label'>{this.yLabel}</div> : '',
      this.xLabel ? <div class='x-label'>{this.xLabel}</div> : '',
    ];
  }

  /**
   * Converts to a hex color string, allowing CSS variables to be passed.
   *
   * @param color color string, can be a CSS variable declaration: var(varname[, fallback])
   * @param fallbackColor if the variable is malformed, or if the CSS variable is not defined, this will be returned
   */
  private _toColor(color: string, fallbackColor: string) {
    if (color.startsWith('var(')) {
      const match = color.match(/var\(([^,\)]+)(,.+)?\)/);

      if (match === null) {
        return fallbackColor;
      }

      const variable = match[1];
      const fallback = (match[2] || '').replace(',', '').trim();
      const computed = getComputedStyle(this.el).getPropertyValue(variable).toLowerCase().trim();

      if (computed.length === 0) {
        return fallback.length === 0 ? fallbackColor : fallback;
      }

      return computed;
    }
    return color;
  }

  private _isEmpty(): boolean {
    return !this.data || !this.data.length;
  }

  private _hasDataToDisplay() {
    return !(this.isLoading || this._isEmpty() || this.error);
  }
}
