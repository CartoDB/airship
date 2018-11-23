import { Component, Event, EventEmitter, Prop, Watch } from '@stencil/core';
import { HistogramColorRange, HistogramData } from '../as-histogram-widget/interfaces';
import { DrawOptions } from '../as-histogram-widget/types/DrawOptions';
import {
  DEFAULT_BAR_COLOR,
  DEFAULT_SELECTED_BAR_COLOR,
} from '../common/constants';

/**
 * Time series
 *
 * @export
 * @class HistogramWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-time-series-widget.scss',
  tag: 'as-time-series-widget',
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

  @Prop() public progress: number = 0;

  @Prop() public playing: boolean = false;

  @Event()
  private play: EventEmitter;

  @Event()
  private pause: EventEmitter;
  private histogram: HTMLAsHistogramWidgetElement;

  @Watch('progress')
  public onProgressChanged() {
    this.histogram.forceUpdate();
  }

  /**
   * Default formatting function. Turns value into a simple Date
   *
   * @memberof HistogramWidget
   */
  public defaultFormatter(data: HistogramData) {
    return `${data.value}`;
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
          data={this.data}
          color={this.color}
          selectedColor={this.selectedColor}
          colorRange={this.colorRange}
          tooltipFormatter={this.tooltipFormatter}
          xLabel={this.xLabel}
          yLabel={this.yLabel}
          isLoading={this.isLoading}
          error={this.error}
          errorDescription={this.errorDescription}
          noDataHeaderMessage={this.noDataHeaderMessage}
          noDataBodyMessage={this.noDataBodyMessage}
          responsive={this.responsive}
          draw={this._draw.bind(this)}
        >
      </as-histogram-widget>];
  }

  private _renderButton() {
    return <button class='as-btn as-btn--primary play-button' onClick={this._playPauseClick.bind(this)}>
      {
        this.playing
        ?
        (
        <svg width='6px' height='10px' viewBox='0 0 6 10' version='1.1'>
          <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
              <g transform='translate(-201.000000, -543.000000)' fill='#FFFFFF'>
                  <g transform='translate(168.000000, 432.000000)'>
                      <g transform='translate(24.000000, 100.000000)'>
                          <g transform='translate(0.000000, 4.000000)'>
                              <path d='M9,7 L10,7 L10,17 L9,17 L9,7 Z M14,7 L15,7 L15,17 L14,17 L14,7 Z'></path>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
        </svg>
        )
        :
        (
        <svg width='9px' height='11px' viewBox='0 0 9 11' version='1.1'>
          <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
              <g transform='translate(-200.000000, -279.000000)' fill-rule='nonzero' fill='#FFFFFF'>
                  <g transform='translate(168.000000, 168.000000)'>
                      <g transform='translate(24.000000, 72.000000)'>
                          <g transform='translate(0.000000, 32.000000)'>
                            <path d='
                              M15.766443,12.044867
                              L9.20456553,8.10774058
                              C8.92171794,7.93803203
                              9,7.89347968
                              9,8.22734108
                              L9,16.2102807
                              C9,16.5418859
                              8.92367044,16.4984182
                              9.20456553,16.3298812
                              L15.766443,12.3927547
                              C16.0692969,12.2110424
                              16.0693051,12.2265843
                              15.766443,12.044867
                              Z
                              M16.2809387,11.1873741
                              C17.23035,11.7570209
                              17.2319213,12.6796581
                              16.2809387,13.2502477
                              L9.71906129,17.1873741
                              C8.76964995,17.7570209
                              8,17.3168605
                              8,16.2102807
                              L8,8.22734108
                              C8,7.11806049
                              8.76807871,6.67965811
                              9.71906129,7.25024766
                              L16.2809387,11.1873741 Z'
                            ></path>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
        </svg>
        )
      }
    </button>;
  }

  private _playPauseClick() {
    this.playing ? this.pause.emit() : this.play.emit();
  }

  private _draw(renderOptions: DrawOptions) {
    const { container, height, width, padding } = renderOptions;
    const [ X_PADDING, Y_PADDING ] = padding;
    let timeSeries = container.select('.as-time-series--g');

    if (timeSeries.empty()) {
      timeSeries = container
        .append('g')
        .attr('class', 'as-time-series--g');

      timeSeries.append('line')
        .attr('class', 'as-time-series--line')
        .attr('stroke-width', 4)
        .attr('stroke', '#fabada')
        .attr('y1', height - Y_PADDING)
        .attr('y2', height - Y_PADDING);

      timeSeries.append('rect')
        .attr('class', 'as-time-series--scrubber')
        .attr('fill', '#fabada')
        .attr('width', 16)
        .attr('height', 16)
        .attr('y', height - Y_PADDING - 8)
        .attr('rx', 16)
        .attr('ry', 16);
    }

    const xPos = ((this.progress / 100) * width) - X_PADDING;

    timeSeries.select('.as-time-series--line')
      .attr('x1', 0)
      .attr('x2', xPos);

    timeSeries.select('.as-time-series--scrubber')
      .attr('x', xPos);
  }
}
