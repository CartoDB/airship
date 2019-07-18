import { Component, Element, Prop, Watch } from '@stencil/core';
import { format as d3Format } from 'd3-format';
import { select } from 'd3-selection';
import { arc as d3Arc } from 'd3-shape';
import { SVGContainer } from './types/Container';
import drawService from './utils/draw.service';

const TRANSITION_DURATION = 500;

/**
 * Gauge Widget
 *
 * @export
 * @class GaugeWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-gauge-widget.scss',
  tag: 'as-gauge-widget',
})
export class GaugeWidget {

  /**
   * Gauge data to be displayed
   */
  @Prop() public value: number = 0;

  /**
   * Gauge nim value
   */
  @Prop() public min: number;

  /**
   * Gauge max value
   */
  @Prop() public max: number;

  /**
   * Gauge thresholds
   */
  @Prop() public threshold: [];

  /**
   * Gauge arc size
   */
  @Prop() public arcSize: number = 16;

  /**
   * Gauge chart padding
   */
  @Prop() public padding: number = 20;

  /**
   * Gauge label title
   */
  @Prop() public labelTitle: string;

  /**
   * Gauge label title
   */
  @Prop() public labelSymbol: string;

  /**
   * Gauge label units
   */
  @Prop() public labelUnits: string;

  /**
   * Margin between mouse and tooltip
   */
  @Prop() public tooltipMargin: number = 40;

  /**
   * Defines the type of data representation
   */
  @Prop() public absolute: boolean = true;

  /**
   * Values format
   */
  @Prop() public format: string;

  /**
   * Description text of the widget
   *
   * @type {string}
   */
  @Prop() public description: string;

  /**
   * Heading text of the widget
   *
   * @type {string}
   */
  @Prop() public heading: string;

  /**
   * If truthy, it'll render the heading and component's description. Default value is `true`.
   */
  @Prop() public showHeader: boolean = true;

  /**
   * Boolean property to control the widget loading state. If true, a spinner is shown.
   */
  @Prop() public isLoading: boolean = false;

  /**
   * Text shown in the header subtitle when there's an error
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


  @Element() private el: HTMLStencilElement;

  /**
   * Reference to the svg element where the plot will be rendered
   */
  private container: SVGContainer;

  private wrapper: HTMLElement;
  private bbox: any;

  private arc: any;
  private foreground: any;

  private tooltipElement: HTMLElement;

  @Watch('value')
  public _onValueChanged() {
    this.updateGraph();
    this.updateLabel();
  }

  constructor() {
    this.resizeRender = this.resizeRender.bind(this);
  }

  public componentWillLoad() {
    addEventListener('resize', this.resizeRender);
  }

  public componentDidUnload() {
    removeEventListener('resize', this.resizeRender);
  }

  public componentDidLoad() {
    this.renderGraph();
  }

  public render() {
    return [
      this.renderHeader(),
      this.renderContent()
    ];
  }

  private resizeRender() {
    requestAnimationFrame(() => {
      this.renderGraph();
    });
  }

  private renderHeader() {
    if (!this.showHeader) {
      return;
    }

    return <as-widget-header
      header={this.heading}
      subheader={this.description}
      is-empty={!this.value}
      is-loading={this.isLoading}
      error={this.error}
      no-data-message={this.noDataHeaderMessage}>
    </as-widget-header>;
  }

  private renderContent() {
    return (
      <div class='as-gauge-wrapper' ref={(ref) => this.wrapper = ref}>
        <svg class='as-gauge-svg' ref={(ref: SVGElement) => this.container = select(ref)}></svg>
        {this.renderLabel()}
        {this.renderTooltip()}
      </div>
    );
  }

  private renderGraph() {
    if (!this.container || !this.container.node()) {
      return;
    }

    this.bbox = this.wrapper.getBoundingClientRect();
    const width = this.bbox.width;
    const height = this.bbox.height;
    const outerRadius = (width / 2) - this.padding;
    const innerRadius = ((width / 2) - this.arcSize) - this.padding;

    this.arc = d3Arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(-90 * (Math.PI / 180));

    this.container.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', `${width}px`)
      .attr('height', `${height}px`)
      .append('g')
      .style('transform', `translate(50%, calc(50% + ${outerRadius / 2}px))`);

    drawService.renderBackground(this.container, this.arc);
    this.foreground = drawService.renderForeground(
      this.container,
      this.arc,
      this.onGraphMouseOver.bind(this),
      this.onGraphMouseMove.bind(this),
      this.onGraphMouseOut.bind(this)
    );

    if (this.threshold) {
      drawService.renderThresholds(this.container, this.threshold, this.min, this.max, innerRadius, outerRadius);
    }

    drawService.renderTicks(this.container, this.min, this.max, innerRadius, outerRadius, this.absolute, this.format);
    drawService.update(this.el, this.value, this.min, this.max, this.arc, this.foreground, this.threshold);
  }

  private updateGraph() {
    drawService.update(this.el, this.value, this.min, this.max, this.arc, this.foreground, this.threshold);
  }

  private onGraphMouseOver(pageX: number, pageY: number) {
    this.showTooltip(pageX, pageY);
  }

  private onGraphMouseMove(pageX: number, pageY: number) {
    this.moveTooltip(pageX, pageY);
  }

  private onGraphMouseOut() {
    this.hideTooltip();
  }

  private renderLabel() {
    const transform = `translate3d(-50%, calc(50% - ${30 / 2}px), 0)`;
    const symbol = !this.absolute ? '%' : this.labelSymbol; 

    return (
      <div class="as-gauge-label" style={{ transform }}>
        <p class="as-gauge-label-title">{this.labelTitle}</p>
        <span class="as-gauge-label-value-wrapper">
          <p class="as-gauge-label-value">{this.absolute ? this.getFormattedValue() : this.getPercentageValue()}</p>
          <p class="as-gauge-symbol">{symbol}</p>
        </span>
      </div>
    );
  }

  private updateLabel() {
    drawService.updateLabel(this.el, this.value, this.min, this.max);
  }

  private renderTooltip() {
    return (
      <div ref={(ref) => this.tooltipElement = ref} class='as-gauge-tooltip' role='tooltip'></div>
    );
  }

  private showTooltip(pageX: number, pageY: number) {
    const tooltip = select(this.tooltipElement).html(
      `<p class="as-gauge-tooltip-value">${this.absolute ? this.getPercentageValue() : this.getFormattedValue()}${this.absolute ? '%' : ''}</p>`
    );

    tooltip.style('left', pageX + 'px')
      .style('top', pageY - this.tooltipMargin + 'px')

    tooltip.transition('show-tooltip')
      .duration(250)
      .style('opacity', 1)
  }

  private hideTooltip() {
    select(this.tooltipElement)
      .transition('hide-tooltip')
      .duration(TRANSITION_DURATION / 2)
      .style('opacity', 0);
  }

  private moveTooltip(pageX: number, pageY: number) {
    select(this.tooltipElement)
      .style('left', pageX + 'px')
      .style('top', pageY - this.wrapper.offsetTop - this.tooltipMargin + 'px');
  }

  private getFormattedValue() {
    return (this.format && this.value !== 0) ? d3Format(this.format)(this.value) : this.value;
  }

  private getPercentageValue() {
    return Math.floor((this.value - this.min) / (this.max - this.min) * 100);
  }
}