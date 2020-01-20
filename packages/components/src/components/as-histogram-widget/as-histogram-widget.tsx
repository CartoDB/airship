import { Component, Element, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { Axis } from 'd3';
import { BrushBehavior } from 'd3-brush';
import { ScaleLinear } from 'd3-scale';
import {
  event as d3event,
  select
} from 'd3-selection';
import 'd3-transition';
import readableNumber from '../../utils/readable-number';
import {
  DEFAULT_BACKGROUND_BAR_COLOR,
  DEFAULT_BACKGROUND_BAR_COLOR_HEX,
  DEFAULT_BAR_COLOR,
  DEFAULT_BAR_COLOR_HEX
} from '../common/constants';
import contentFragment from '../common/content.fragment';
import {
  AxisOptions,
  HistogramColorRange,
  HistogramData,
  HistogramSelection,
  HistogramType,
  TooltipFormat
} from './interfaces';
import { SVGContainer, SVGGContainer } from './types/Container';
import { RenderOptions } from './types/RenderOptions';
import brushService from './utils/brush.service';
import dataService, { binsScale, isBackgroundCompatible, isCategoricalData, prepareData } from './utils/data.service';
import drawService, { conditionalFormatter } from './utils/draw.service';
import interactionService from './utils/interaction.service';

const CUSTOM_HANDLE_WIDTH = 8;
const CUSTOM_HANDLE_HEIGHT = 20;

// we could use getComputedStyle instead of these
const X_PADDING = 38;
const Y_PADDING = 40;
const LABEL_PADDING = 25;

const FG_CLASSNAME = 'foreground-bar';
const BG_CLASSNAME = 'background-bar';

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
   * Data that will be merged into buckets with value === 0
   *
   * @type {HistogramData[]}
   * @memberof HistogramWidget
   */
  @Prop() public backgroundData: HistogramData[] = null;

  /**
   * Override color for the histogram bars
   *
   * @type {string}
   * @memberof HistogramWidget
   */
  @Prop() public color: string = DEFAULT_BAR_COLOR;

  /**
   * Override color for the non selected histogram bars
   *
   * @type {string}
   * @memberof HistogramWidget
   */
  @Prop() public unselectedColor: string = DEFAULT_BACKGROUND_BAR_COLOR;

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
  @Prop() public tooltipFormatter: (value: HistogramData) => TooltipFormat | Promise<TooltipFormat> = this.formatter;

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

  /**
   * Function used to format the x-axis values
   *
   * @memberof HistogramWidget
   */
  @Prop() public axisFormatter: (value: number | Date) => string;

  /**
   * Text rendered inside the clear selection button
   */
  @Prop() public clearText: string = 'Clear selection';

  /**
   * Function to format the range selected text displayed below the histogram
   *
   * @memberof HistogramWidget
   */
  @Prop() public selectedFormatter: (value: number[]) => string = this._selectionFormatter;

  /**
   * This prop lets you provide the range of the y-axis so it's not automatically calculated with
   * data or backgroundData. It always starts at 0, you can provide the top value.
   *
   * @memberof HistogramWidget
   */
  @Prop() public range: [number, number] = null;

  /**
   * This lets you disable the animations for the bars when showing / updating the data
   *
   * @type {boolean}
   * @memberof HistogramWidget
   */
  @Prop() public disableAnimation: boolean = false;

  /**
   * This prop is a proxy to some d3-axis options for the X Axis
   *
   * @type {AxisOptions}
   * @memberof TimeSeriesWidget
   */
  @Prop() public xAxisOptions: AxisOptions = {};

  /**
   * This prop is a proxy to some d3-axis options for the Y Axis
   *
   * @type {AxisOptions}
   * @memberof TimeSeriesWidget
   */
  @Prop() public yAxisOptions: AxisOptions = {};

  public selection: number[] = null;

  @Element() private el: HTMLAsHistogramWidgetElement;

  /**
   * Fired when user update or clear the widget selection.
   *
   * @type {EventEmitter<number[]>}
   * @memberof HistogramWidget
   */
  @Event()
  private selectionChanged: EventEmitter<HistogramSelection>;

  @Event()
  private selectionInput: EventEmitter<HistogramSelection>;

  @Event()
  private drawParametersChanged: EventEmitter<RenderOptions>;

  @State()
  private tooltip: string | string[] = null;

  @State() private _firstDataSupplied: boolean = false;

  private container: SVGContainer;
  private tooltipElement: HTMLElement;

  private xScale: ScaleLinear<number, number>;
  private binsScale: ScaleLinear<number, number>;
  private yScale: ScaleLinear<number, number>;
  private yAxis: Axis<{ valueOf(): number }>;
  private barsContainer: SVGGContainer;
  private brush: BrushBehavior<{}>;
  private brushArea: SVGGContainer;
  private customHandles: SVGGContainer<{ type: string }, SVGGElement, {}>;

  private width: number;
  private height: number;
  private prevWidth: number;
  private prevHeight: number;

  private _data: HistogramData[];
  private _backgroundData: HistogramData[];
  private _color: string;
  private _barBackgroundColor: string;
  private _muteSelectionChanged: boolean = false;
  private _dataJustChanged: boolean;
  private _lastEmittedSelection: number[] = null;

  @State()
  private selectionEmpty: boolean = true;

  @State()
  private selectionFooter: string = '';

  @State()
  private isCategoricalData: boolean;

  constructor() {
    this._resizeRender = this._resizeRender.bind(this);
    this._setTooltip = this._setTooltip.bind(this);
  }

  @Watch('backgroundData')
  public _onBackgroundDataChanged(newBackgroundData) {
    if (newBackgroundData === null || newBackgroundData.length === 0) {
      this._prepareData(this.data, null);
      return;
    }

    if (isBackgroundCompatible(this.data, newBackgroundData)) {
      this._prepareData(this.data, newBackgroundData);
    }
  }

  @Watch('data')
  public _onDataChanged(newData, oldData) {
    this.onNewData(newData, oldData);

    if (!this._firstDataSupplied) {
      this._firstDataSupplied = Boolean(newData && newData.length);
    }
  }


  public onNewData(newData, oldData) {
    // Invalidated, indexes might be different data now
    this._lastEmittedSelection = null;

    if (isBackgroundCompatible(newData, this.backgroundData)) {
      this._prepareData(this.data, this.backgroundData, oldData);
    } else {
      this._prepareData(this.data, null, oldData);
    }
  }

  public _prepareData(data, backgroundData, oldData?: HistogramData[]) {
    this._data = prepareData(data);
    this._backgroundData = backgroundData === null ? this._mockBackgroundData(data) : prepareData(backgroundData);

    const newScale = binsScale(this._data);
    const wasCategoricalData = !!this.isCategoricalData;
    this.isCategoricalData = isCategoricalData(this._data);

    if (wasCategoricalData !== this.isCategoricalData) {
      this.selection = null;
    } else {
      this.selection = this._preadjustSelection(oldData, newScale, data.length);
    }

    this.binsScale = newScale;

    this._muteSelectionChanged = true;
    this._dataJustChanged = true;
  }

  @Watch('color')
  public _onColorChanged(newColor) {
    const incomingColor = newColor || DEFAULT_BAR_COLOR;
    this._color = this._toColor(incomingColor, DEFAULT_BAR_COLOR_HEX);
  }

  @Watch('unselectedColor')
  public _onSelectedColorChanged(newColor) {
    const incomingColor = newColor || DEFAULT_BACKGROUND_BAR_COLOR;
    this._barBackgroundColor = this._toColor(incomingColor, DEFAULT_BACKGROUND_BAR_COLOR_HEX);
  }

  /**
   * Default formatting function. Makes the value a readable number and
   * converts it into a string. Useful to compose with your own formatting
   * function.
   *
   * @memberof HistogramWidget
   */
  @Method()
  public async defaultFormatter(data: HistogramData) {
    return this.formatter(data);
  }

  /**
   * Returns the current selection
   *
   * @returns {number[] | string[]}
   * @memberof HistogramWidget
   */
  @Method()
  public async getSelection(): Promise<Array<number | Date | string>> {
    const data = this._dataForSelection(this.selection);
    return this._simplifySelection(data);
  }

  /**
   * Programmatically set the selection. It will be adjusted to the buckets
   * present in {@link data}. To clear see {@link clearSelection} or call with null
   *
   * @param {number[] | null} values
   * @param {boolean} emit Set to true to force emitting the selectionChanged event.
   * @memberof HistogramWidget
   */
  @Method()
  public async setSelection(values: number[] | null, emit = false) {
    if (values === null) {
      this._setSelection(null);
      this.emitSelection(this.selectionChanged, this.selection);
      return;
    }

    // This is too tricky, we'd have to make sure that categories are contiguous
    if (values.some((value) => typeof value === 'string')) {
      return;
    }

    const bins = values.map(this.binsScale);

    this._setSelection(bins);

    if (emit || !this._muteSelectionChanged) {
      this.emitSelection(this.selectionChanged, this.selection);
    }
  }

  /**
   * Clears the Histogram selection
   *
   * @memberof HistogramWidget
   */
  @Method()
  public async clearSelection() {
    this.setSelection(null);
  }

  /**
   * Formats a number using the component's x-axis formatter if present
   *
   * @memberof HistogramWidget
   */
  @Method()
  public async xFormatter(value) {
    return this._xFormatter(value);
  }

  public componentDidLoad() {
    this._color = this._toColor(this.color, DEFAULT_BAR_COLOR_HEX);
    this._barBackgroundColor = this._toColor(this.unselectedColor, DEFAULT_BACKGROUND_BAR_COLOR_HEX);

    if (!this._hasDataToDisplay()) {
      return;
    }

    this.isCategoricalData = isCategoricalData(this._data);

    requestAnimationFrame(() => {
      this._renderGraph();
    });
  }

  public componentDidUpdate() {
    if (!this._dataJustChanged) {
      return;
    }

    this._renderGraph();
    this._dataJustChanged = false;
  }

  public componentWillLoad() {
    addEventListener('resize', this._resizeRender);
    this._firstDataSupplied = Boolean(this.data && this.data.length);
    this.selectionFooter = this.selectedFormatter(this.selection);
    this._onBackgroundDataChanged(this.backgroundData);
    this.onNewData(this.data, null);
  }

  public componentDidUnload() {
    removeEventListener('resize', this._resizeRender);
  }

  public render() {
    if (this._isLoading()) {
      return (
        <as-histogram-widget-placeholder>
          {this._renderHeader()}
        </as-histogram-widget-placeholder>
      );
    }

    return [
      this._renderHeader(),
      this._renderSelection(),
      this._renderContent(),
    ];
  }

  private _resizeRender() {
    requestAnimationFrame(() => {
      this._renderGraph();
    });
  }

  private _renderContent() {
    const histogramClasses = {
      'as-histogram-widget--categorical': this.isCategoricalData,
      'as-histogram-widget__wrapper': true,
      'as-histogram-widget__wrapper--disabled': this.disableInteractivity
    };
    const svgClasses = {
      'figure': true,
      'figure--has-x-label': !!this.xLabel,
      'figure--has-y-label': !!this.yLabel
    };
    return contentFragment(
      this._isLoading(),
      this.error,
      this._isEmpty(),
      this.heading,
      this.errorDescription,
      this.noDataBodyMessage,
      <div class={histogramClasses}>
        <svg class={svgClasses} ref={(ref: SVGElement) => this.container = select(ref)}></svg>
        {this._renderLabels()}
        {this._renderTooltip()}
      </div>
      );
  }

  private _mockBackgroundData(data: HistogramData[]) {
    const min = dataService.getLowerBounds(data);
    return data.map((value) => ({
      ...value,
      value: Math.max(0, min)
    }));
  }

  private _selectionFormatter(selection: number[]) {
    if (selection === null) {
      return 'All selected';
    }

    if (this.isCategoricalData) {
      return `${selection[1] - selection[0]} selected`;
    }

    let formattedSelection;

    const domainSelection = selection.map(this.binsScale.invert);

    if (this.axisFormatter) {
      formattedSelection = domainSelection.map(this.axisFormatter);
    } else {
      formattedSelection = domainSelection.map((e) => `${conditionalFormatter(e)}`);
    }

    return `Selected from ${formattedSelection[0]} to ${formattedSelection[1]}`;
  }

  private _renderSelection() {
    if (this._isLoading() || this._isEmpty() || this.error || !this.showClear) {
      return '';
    }

    return <as-widget-selection
      selection={this.selectionFooter}
      clearText={this.clearText}
      showClear={!this.selectionEmpty}
      onClear={() => this.clearSelection()}
      >
    </as-widget-selection>;
  }

  private _renderGraph() {
    if (!this.container || !this.container.node()) {
      return;
    }

    const bbox = this.container.node().getBoundingClientRect();
    const firstRender = this.prevWidth === undefined || this.prevHeight === undefined;
    this.prevWidth = this.width;
    this.prevHeight = this.height;
    this.width = bbox.width;
    this.height = bbox.height;
    const resizing = !firstRender && (this.prevWidth !== this.width || this.height !== this.prevHeight);

    if (this.height === 0 || this.width === 0) { return; }

    this._generateYAxis();
    this._renderXAxis();

    this.barsContainer = drawService.renderPlot(this.container);

    interactionService.addTooltip(
      this.container,
      this.barsContainer,
      this,
      this._color,
      this._barBackgroundColor,
      (value) => this.tooltipFormatter(value),
      this._setTooltip,
      FG_CLASSNAME
    );

    drawService.renderBars(
      this._backgroundData,
      this.yScale,
      this.container,
      this.barsContainer,
      this._barBackgroundColor,
      X_PADDING + (this.yLabel ? LABEL_PADDING : 0),
      Y_PADDING,
      this.disableAnimation || resizing,
      BG_CLASSNAME
    );

    drawService.renderBars(
      this._data,
      this.yScale,
      this.container,
      this.barsContainer,
      this._color,
      X_PADDING + (this.yLabel ? LABEL_PADDING : 0),
      Y_PADDING,
      this.disableAnimation || resizing,
      FG_CLASSNAME
    );

    drawService.renderYAxis(this.container, this.yAxis, X_PADDING);

    if (!this.disableInteractivity) {
      this.brush = brushService.addBrush(
        this.width,
        this.height,
        this._onBrush.bind(this),
        this._onBrushEnd.bind(this),
        CUSTOM_HANDLE_WIDTH,
        CUSTOM_HANDLE_HEIGHT,
        X_PADDING + (this.yLabel ? LABEL_PADDING : 0),
        Y_PADDING
      );

      this.brushArea = brushService.addBrushArea(
        this.brush,
        this.container,
      );

      this.customHandles = brushService.addCustomHandles(
        this.brushArea,
        CUSTOM_HANDLE_WIDTH,
        CUSTOM_HANDLE_HEIGHT,
        this.yScale
      );
    }

    this._updateSelection();

    this.drawParametersChanged.emit({
      binsScale: this.binsScale,
      container: this.container,
      handleWidth: CUSTOM_HANDLE_WIDTH,
      height: this.height,
      padding: [X_PADDING + (this.yLabel ? LABEL_PADDING : 0), Y_PADDING],
      width: this.width,
      xScale: this.xScale
    });

    this._muteSelectionChanged = false;
  }

  private _setTooltip(value: string | string[] | null, barBBox: ClientRect) {
    if (value === null) {
      this._hideTooltip();
      return;
    }

    this.tooltip = value;
    this._showTooltip(barBBox);
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

    return values.map((value) => this._adjustSelectionValue(value));
  }

  private _adjustSelectionValue(value: number) {
    if (value < 0) {
      return 0;
    }

    if (value >= this._data.length) {
      return this._data.length;
    }

    return Math.round(value);
  }

  private _hideCustomHandles() {
    this.customHandles.style('opacity', 0);
    this.brushArea.selectAll('.bottomline').style('opacity', 0);
  }

  private _onBrush() {
    if (this.disableInteractivity) {
      return;
    }

    const evt = d3event as any; // I can't cast this properly :(

    if (evt.selection === null) {
      this._hideCustomHandles();
      return;
    }

    // I don't know why this happens
    if (!evt.sourceEvent || evt.sourceEvent.type === 'brush') {
      return;
    }

    // Convert to our data's domain
    const d0 = evt.selection
      .map((selection) => this.xScale.invert(selection));

    this._setSelection(d0);
  }

  private _onBrushEnd() {
    if (this.disableInteractivity) {
      return;
    }

    if (!this._muteSelectionChanged) {
      this.emitSelection(this.selectionChanged, this.selection);
    }
  }

  private _setSelection(selection: number[]) {
    if (this.disableInteractivity) {
      return;
    }

    const adjustedSelection = this._adjustSelection(selection);

    if (adjustedSelection !== null && (adjustedSelection[0] === adjustedSelection[1])) {
      return;
    }

    const sameSelection = this.selection !== null &&
      adjustedSelection !== null &&
      this.selection.every((d, i) => adjustedSelection[i] === d);

    this.selection = adjustedSelection;
    this._updateHandles(adjustedSelection);

    if (!sameSelection) {
      this._hideTooltip();
      this.emitSelection(this.selectionInput, this.selection);
    }

    this.selectionEmpty = this.selection === null;
    this.selectionFooter = this.selectedFormatter(this.selection);
  }

  // Adjust the selection to the new data
  private _preadjustSelection(oldData: HistogramData[], newScale: ScaleLinear<number, number>, nBuckets: number) {
    if (!(oldData && this.selection)) {
      return this.selection;
    }

    // For categorical data, we map back the previously selected values into indexes, and return [first, last]
    if (this.isCategoricalData) {
      const selectedCats = (this._simplifySelection(this._dataForSelection(this.selection, oldData)) as string[]);
      const selection = selectedCats.map((value) => {
        return this._data.findIndex((d) => d.category === value);
      });

      // At least one of the previous values are missing, we clear the selection
      if (selection.some((e) => e === -1)) {
        return null;
      }

      return [selection[0], selection[selection.length - 1] + 1];
    }

    const oldSelection = (this._simplifySelection(this._dataForSelection(this.selection, oldData)) as number[]);
    const newSelection = oldSelection.map(newScale).map(Math.round);

    return [Math.max(0, newSelection[0]), Math.min(nBuckets, newSelection[1])];
  }

  private _dataForSelection(selection: number[], from?: HistogramData[]) {
    if (selection === null) {
      return null;
    }

    const data = from !== undefined ? from : this.data;

    if (this.isCategoricalData) {
      return data
        .slice(selection[0], selection[1])
        .map((d) => d);
    }

    return [data[selection[0]], data[selection[1] - 1]];
  }

  private _simplifySelection(selection: HistogramData[]): string[] | Array<Date | number> {
    if (selection === null) {
      return null;
    }

    if (this.isCategoricalData) {
      return selection.map((value) => value.category);
    }

    return [selection[0].start, selection[selection.length - 1].end];
  }

  private _sameSelection(first: number[], second: number[]) {
    if (first === null || second === null) {
      return false;
    }

    return (first[0] === second[0] && first[1] === second[1]);
  }

  private emitSelection(emitter: EventEmitter<HistogramSelection>, selection: number[]) {
    if (this._sameSelection(selection, this._lastEmittedSelection)) {
      return;
    }

    if (selection === null) {
      emitter.emit(null);
      return;
    }

    const payload = this._dataForSelection(selection);

    const evt = {
      payload,
      selection: this._simplifySelection(payload),
      type: this._eventType()
    };

    emitter.emit(evt);

    if (emitter === this.selectionChanged) {
      this._lastEmittedSelection = [selection[0], selection[1]];
    }
  }

  private _eventType(): HistogramType {
    return this.isCategoricalData ? 'categorical' : 'continuous';
  }

  private _selectionInData(selection: number[]) {
    const domainSelection = selection.map(this.binsScale.invert);
    const inData = domainSelection.map((selectionValue) => {
      return this._data.some((value) => selectionValue >= value.start && selectionValue <= value.end);
    });

    // True if any of the selection values is inside the data
    // Using inData.every(e => e) would be more restrictive
    return inData.some((e) => e);
  }

  private _updateHandles(values: number[] | null) {
    if (!this.xScale) {
      return;
    }

    if (values === null) {
      this.barsContainer.selectAll(`rect.${FG_CLASSNAME}`)
        .style('fill', (_d, i) => {
          const d = this._data[i];
          return d.color || this._color;
        });
      this.brushArea.call(this.brush.move, null);

      return;
    }

    const yCoord = this.yScale(this.yScale.domain()[0]);

    // Convert back to space coordinates
    const spaceValues = values
      .map(this.xScale);

    this.brushArea.call(this.brush.move, spaceValues);

    this.customHandles
      .style('opacity', 1)
      .attr('transform', (_d, i) => {
        return `translate(${(spaceValues[i] - (CUSTOM_HANDLE_WIDTH / 2) - 1)},${yCoord - CUSTOM_HANDLE_HEIGHT / 2})`;
      });

    this.brushArea.selectAll('.bottomline')
      .style('opacity', 1)
      .attr('stroke-width', 2)
      .attr('x1', spaceValues[0])
      .attr('x2', spaceValues[1]);

    this.barsContainer.selectAll(`rect.${FG_CLASSNAME}`)
      .style('fill', (_d, i) => {
        const d = this._data[i];

        // This should not be possible, but in some weird cases this happens on an intermediate step
        if (!d) {
          return;
        }

        if (i < values[0] || i >= values[1]) {
          return this._barBackgroundColor;
        }

        return d.color || this._color;
      });
  }

  private _dataForDomain() {
    const maxData = Math.max.apply(window, this._data.map((data) => data.value));
    const maxBackground = Math.max.apply(window, this._backgroundData.map((data) => data.value));

    if (maxData > maxBackground) {
      return this._data;
    }

    return this._backgroundData;
  }

  private _generateYAxis() {
    const yDomain: [number | Date, number | Date] = this.range !== null
      ? this.range
      : dataService.getYDomain(this._dataForDomain());
    this.yAxis = drawService.generateYScale(
      this.container,
      yDomain,
      X_PADDING + (this.yLabel ? LABEL_PADDING : 0),
      Y_PADDING,
      this.yAxisOptions);

    this.yScale = this.yAxis.scale();
  }

  private _renderXAxis() {
    const xDomain = dataService.getXDomain(this._data);
    const xAxis = drawService.renderXAxis(
      this.container,
      xDomain,
      this._data.length,
      X_PADDING + (this.yLabel ? LABEL_PADDING : 0),
      Y_PADDING,
      this.axisFormatter,
      this.xAxisOptions);

    this.xScale = xAxis.scale();
  }

  private _showTooltip(barBoundingBox: ClientRect) {
    if (!this.tooltipElement) {
      return;
    }

    select(this.tooltipElement)
      .style('display', 'inline')
      .style('left', `${barBoundingBox.left + (barBoundingBox.width / 2)}px`)
      .style('top', `${barBoundingBox.top}px`);
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
      is-loading={this._isLoading()}
      is-empty={this._isEmpty()}
      error={this.error}
      no-data-message={this.noDataHeaderMessage}>
    </as-widget-header>;
  }

  private _renderTooltip() {
    return (<span
      ref={(ref: HTMLElement) => this.tooltipElement = ref}
      role='tooltip'
      class='as-tooltip as-tooltip--top'>
      {this._parseTooltip(this.tooltip)}
    </span>);
  }

  private _parseTooltip(tooltip: string | string[] | null) {
    if (tooltip === null) {
      return null;
    }

    if (Array.isArray(tooltip)) {
      return tooltip.map((text) => this._renderTooltipLine(text));
    }

    return this._renderTooltipLine(tooltip);
  }

  private _renderTooltipLine(value) {
    return <div>{value}</div>;
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

  private _isLoading(): boolean {
    return (!this._firstDataSupplied || this.isLoading) && !this.error;
  }

  private _isEmpty(): boolean {
    return this._data && !this._data.length;
  }

  private _hasDataToDisplay() {
    return !(this._isLoading() || this._isEmpty() || this.error);
  }

  private formatter(data: HistogramData) {
    const tooltip = [];

    if (this.isCategoricalData) {
      tooltip.push(`${data.category}`);
    } else {
      tooltip.push(`${this._xFormatter(data.start)} - ${this._xFormatter(data.end)}`);
    }

    tooltip.push(`${readableNumber(data.value).trim()}`);

    return tooltip;
  }

  private _xFormatter(value: Date | number): string {
    if (this.axisFormatter) {
      return this.axisFormatter(value);
    } else {
      return conditionalFormatter(value);
    }
  }
}
