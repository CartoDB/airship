import { Component, h, Event, EventEmitter, Method, Prop, Watch } from '@stencil/core';
import { scaleLinear } from 'd3-scale';
import { event as d3event } from 'd3-selection';
import { timeFormat, timeFormatDefaultLocale, TimeLocaleDefinition } from 'd3-time-format';
import { icon } from '../../utils/icons';
import { AxisOptions, HistogramColorRange, HistogramData, HistogramSelection } from '../as-histogram-widget/interfaces';
import { RenderOptions } from '../as-histogram-widget/types/RenderOptions';
import {
  DEFAULT_BACKGROUND_BAR_COLOR,
  DEFAULT_BAR_COLOR
} from '../common/constants';
import { TimeSeriesData } from './interfaces';
import { prepareData, sameData } from './utils/data.service';

const SCRUBBER_SIZE = 6;

/**
 * Time series
 *
 * @export
 * @class HistogramWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-time-series-widget.scss',
  tag: 'as-time-series-widget'
})
export class TimeSeriesWidget {
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
  @Prop() public data: TimeSeriesData[] = [];

  /**
   * Histogram data to be displayed
   *
   * @type {HistogramData[]}
   * @memberof HistogramWidget
   */
  @Prop() public backgroundData: TimeSeriesData[] = [];

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
  @Prop() public unselectedColor: string = DEFAULT_BACKGROUND_BAR_COLOR;

  /**
   * Color range for histogram data
   *
   * @type {HistogramColorRange[]}
   * @memberof HistogramWidget
   */
  @Prop() public colorRange: HistogramColorRange[];

  /**
   * Function that formats the tooltip. Receives TimeSeriesData and outputs a string
   *
   * @type {(TimeSeriesData) => string}
   * @memberof HistogramWidget
   */
  @Prop() public tooltipFormatter: (value: TimeSeriesData) => string;

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
   * This attribute is the percentage of progress elapsed on an animation.
   */
  @Prop() public progress: number = 0;

  /**
   * Whether the animation is playing or not.
   */
  @Prop() public playing: boolean = false;

  /**
   * Whether it should have animated properties or not. Disabling this makes this look
   * like a histogra widget with time capabilities
   */
  @Prop({ reflectToAttr: true, attr: 'animated' }) public animated: boolean = false;

  /**
   * This string will be parsed by d3-time-format (https://github.com/d3/d3-time-format)
   * and will be used to format the graph's x-axis
   */
  @Prop() public timeFormat: string = '%x - %X';

  /**
   * Setting this property will make the date formatter be sensitive to locales. The format
   * is described on https://github.com/d3/d3-time-format
   */
  @Prop() public timeFormatLocale: TimeLocaleDefinition;

  /**
   * Text rendered inside the clear selection button
   */
  @Prop() public clearText: string = 'Clear selection';

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

  /**
   * User clicks the play button
   */
  @Event()
  private play: EventEmitter;

  /**
   * User clicks the pause button
   */
  @Event()
  private pause: EventEmitter;

  /**
   * This method proxies the selectionChanged event on the underlying graph, but parses it into
   * a Date
   */
  @Event()
  private selectionChanged: EventEmitter<Date[]>;

  /**
   * The user has seeked the animation to this percentage.
   */
  @Event()
  private seek: EventEmitter<number>;

  private histogram: HTMLAsHistogramWidgetElement;
  private _selection: number[];
  private _formatter: (date: Date) => string;
  private _renderOptions: RenderOptions;

  // Last position when putting the mouse over the scrubber track
  private _lastMousePosition: number;
  private _data: any;
  private _backgroundData: HistogramData[];

  constructor() {
    this.axisFormatter = this.axisFormatter.bind(this);
  }

  @Watch('data')
  public onDataChanged(newData, oldData) {
    if (sameData(newData, oldData)) {
      return;
    } else {
      this._data = prepareData(newData);
    }
  }

  @Watch('backgroundData')
  public onBackgroundDataChanged(newData) {
    this._backgroundData = prepareData(newData);
  }

  @Watch('progress')
  public onProgressChanged() {
    this._render();
  }

  @Watch('timeFormat')
  public onTimeFormatChanged(newFormat) {
    this._formatter = timeFormat(newFormat);

    this.histogram.forceUpdate();
  }

  @Watch('timeFormatLocale')
  public onTimeFormatLocaleChanged(newLocale) {
    try {
      timeFormatDefaultLocale(newLocale);

      if (this.timeFormat) {
        this.onTimeFormatChanged(this.timeFormat);
      }
    } catch (e) {
      throw new Error('Invalid time format.');
    }

  }

  /**
   * Proxy to as-histogram-widget defaultFormatter()
   *
   * @memberof TimeSeriesWidget
   */
  @Method()
  public async defaultFormatter(data: HistogramData) {
    return this.histogram.defaultFormatter(data);
  }

  /**
   * Proxy to as-histogram-widget getSelection()
   *
   * @returns {number[]|string[]}
   * @memberof TimeSeriesWidget
   */
  @Method()
  public async getSelection() {
    return this.histogram.getSelection();
  }

  /**
   * Proxy to as-histogram-widget setSelection()
   *
   * @param {number[] | null} values
   * @memberof TimeSeriesWidget
   */
  @Method()
  public async setSelection(values: number[] | null) {
    this.histogram.setSelection(values);
  }

  /**
   * Proxy to as-histogram-widget clearSelection()
   *
   * @memberof TimeSeriesWidget
   */
  @Method()
  public async clearSelection() {
    this.histogram.clearSelection();
  }

  /**
   * Proxy to as-histogram-widget xFormatter method
   * @param value
   */
  @Method()
  public async xFormatter(value) {
    return this.histogram.xFormatter(value);
  }

  public async componentWillLoad() {
    this.onDataChanged(this.data, []);
    this.onBackgroundDataChanged(this.backgroundData);
  }

  public async componentDidLoad() {
    if (this.timeFormatLocale) {
      timeFormatDefaultLocale(this.timeFormatLocale);
    }

    this._formatter = timeFormat(this.timeFormat);

    this.histogram.addEventListener('selectionInput', (evt: CustomEvent) => {
      if (evt.detail === null) {
        this._selection = null;
      } else {
        this._selection = evt.detail.selection;
      }

      this._render();
    });

    this.histogram.addEventListener('selectionChanged', (evt: CustomEvent<HistogramSelection>) => {
      evt.stopPropagation();

      if (evt.detail === null) {
        this.selectionChanged.emit(null);
        return;
      }

      // We have to coerce to number[] because it can also be string[] for categorical histograms
      const selectedDates = (evt.detail.selection as number[]).map((epoch) => new Date(epoch));
      this.selectionChanged.emit(selectedDates);

      this._render();
    });

    this.histogram.addEventListener('drawParametersChanged', (evt: CustomEvent<RenderOptions>) => {
      this._renderOptions = evt.detail;

      this._render();
    });

    this._selection = (await this.histogram.getSelection() as number[]);
  }

  public render() {
    return [
        this._renderButton(),
        <as-histogram-widget
          ref={(ref) => { this.histogram = ref as HTMLAsHistogramWidgetElement; }}
          heading={this.heading}
          description={this.description}
          showHeader={this.showHeader}
          showClear={this.showClear}
          disableInteractivity={this.disableInteractivity}
          data={this._data}
          backgroundData={this._backgroundData}
          color={this.color}
          unselectedColor={this.unselectedColor}
          colorRange={this.colorRange}
          axisFormatter={this.axisFormatter}
          tooltipFormatter={this.tooltipFormatter}
          xLabel={this.xLabel}
          yLabel={this.yLabel}
          isLoading={this.isLoading}
          error={this.error}
          errorDescription={this.errorDescription}
          noDataHeaderMessage={this.noDataHeaderMessage}
          noDataBodyMessage={this.noDataBodyMessage}
          responsive={this.responsive}
          clearText={this.clearText}
          range={this.range}
          disableAnimation={this.disableAnimation}
          xAxisOptions={this.xAxisOptions}
          yAxisOptions={this.yAxisOptions}
        >
      </as-histogram-widget>];
  }

  private axisFormatter(value: number): string {
    return this._formatter(new Date(value));
  }

  private _renderButton() {
    if (!this.animated) {
      return null;
    }

    const classes = {
      'as-time-series--play-button': true,
      'as-time-series--play-button-hidden': !this.data.length || this.isLoading || !!this.error,
      'as-time-series--play-button-x-label': !!this.xLabel
    };

    return <div class={classes} onClick={this._playPauseClick.bind(this)}>
      {icon(this.playing ? 'PAUSE' : 'PLAY', 'var(--as--color--primary)', { width: '32px', height: '32px'})}
    </div>;
  }

  private _playPauseClick() {
    this.playing ? this.pause.emit() : this.play.emit();
  }

  private _render() {
    if (!this._renderOptions) {
      return;
    }

    const {
      container,
      height,
      width,
      padding,
      xScale,
      binsScale,
      handleWidth
    } = this._renderOptions;

    let timeSeries = container.select('.as-time-series--g');

    if (!this.animated) {
      if (!timeSeries.empty()) {
        timeSeries.remove();
      }

      return;
    }

    const { left } = container.node().getBoundingClientRect();
    const [X_PADDING, Y_PADDING] = padding;
    const progressScale = scaleLinear().domain([0, 100]);
    let trackOffset = 0;

    if (this._selection) {
      const selection = this._selection.map(
        (e) => xScale(binsScale(e))
      );

      trackOffset = handleWidth / 2;
      progressScale.range([
        selection[0] + trackOffset + (SCRUBBER_SIZE / 2),
        selection[1] - trackOffset - (SCRUBBER_SIZE / 2)
      ]);
    } else {
      progressScale.range([0, width - X_PADDING]);
    }

    const xPos = progressScale(this.progress);

    container.on('click', () => {
      const evt = d3event as MouseEvent;
      const pctX = Math.round(progressScale.invert(evt.clientX - left - X_PADDING + 8));

      // This probably means that there's a selection and you're clicking outside of it
      if (pctX > 100 || pctX < 0) {
        return;
      }

      this.seek.emit(pctX);
    });


    if (timeSeries.empty()) {
      timeSeries = container
        .append('g')
        .attr('class', 'as-time-series--g');

      timeSeries.append('line')
        .attr('class', 'as-time-series--preview')
        .attr('stroke-width', 4)
        .attr('stroke', 'gray')
        .attr('opacity', '0');

      timeSeries.append('line')
        .attr('class', 'as-time-series--line')
        .attr('stroke-width', 4);

      timeSeries.append('circle')
        .attr('class', 'as-time-series--scrubber')
        .attr('r', SCRUBBER_SIZE)
        .attr('stroke-width', 0);

      timeSeries.append('line')
        .attr('class', 'as-time-series--track')
        .attr('stroke-width', 16)
        .attr('stroke', 'black')
        .attr('opacity', '0')
        .on('mouseleave', () => {
          this._lastMousePosition = -1;
          timeSeries.select('.as-time-series--preview')
            .attr('opacity', '0');
        });
    }

    timeSeries.select('.as-time-series--line')
      .attr('x1', progressScale(0) - (SCRUBBER_SIZE / 2))
      .attr('x2', xPos)
      .attr('y1', height - Y_PADDING)
      .attr('y2', height - Y_PADDING);

    timeSeries.select('.as-time-series--track')
      .attr('y1', height - Y_PADDING)
      .attr('y2', height - Y_PADDING)
      .attr('x1', progressScale(0) + trackOffset)
      .attr('x2', progressScale(100) - trackOffset)
      .on('mousemove', () => {
        const evt = d3event as MouseEvent;
        this._lastMousePosition = evt.clientX - left - X_PADDING + 8;

        if (this._lastMousePosition > progressScale(this.progress)) {
          timeSeries.select('.as-time-series--preview')
            .attr('x2', this._lastMousePosition)
            .attr('opacity', '1');
        }
      });

    timeSeries.select('.as-time-series--preview')
      .attr('x1', xPos - (SCRUBBER_SIZE / 2))
      .attr('y1', height - Y_PADDING)
      .attr('y2', height - Y_PADDING)
      .attr('opacity', () => {
        if (this._lastMousePosition > xPos) {
          return '1';
        }

        return '0';
      });

    timeSeries.select('.as-time-series--scrubber')
      .attr('transform', `translate(${xPos - (SCRUBBER_SIZE / 2)},${height - Y_PADDING})`);
  }
}
