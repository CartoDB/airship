import { Component, Element, Prop, Watch } from '@stencil/core';
import { select } from 'd3-selection';
import { interpolateNumber } from 'd3-interpolate';
import { SVGContainer } from './types/Container';
import { DonutData } from './interfaces';
import drawService from './utils/draw.service';

const TRANSITION_DURATION = 500;

/**
 * Donut Widget
 *
 * @export
 * @class DonutWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-donut-widget.scss',
  tag: 'as-donut-widget',
})
export class DonutWidget {

  /**
   * Donut data to be displayed
   *
   * @type {DonutData[]}
   * @memberof DonutWidget
   */
  @Prop() public data: DonutData[] = [];

  /**
   * Donut arc size
   */
  @Prop() public arcSize: number = 16;

  /**
   * Donut chart padding
   */
  @Prop() public padding: number = 20;

  /**
   * Donut label title
   */
  @Prop() public labelTitle: string;

  /**
   * Margin between mouse and tooltip
   */
  @Prop() public tooltipMargin: number = 40;

  @Element() private el: HTMLStencilElement;

  /**
   * Reference to the svg element where the plot will be rendered
   */
  private container: SVGContainer;

  /**
   * Hold a reference to the label
   */
  private labelElement: HTMLElement;

  /**
   * Label d3selection
   */
  private label: any;

  /**
   * Hold a reference to the tooltip to show on mouseover
   */
  private tooltipElement: HTMLElement;

  /**
   * Tooltip d3selection
   */
  private tooltip: any;

  /**
   * Represents the sum of all item values
   */
  private totalValue: number;

  /**
   * Holds a selected item
   */
  private selected: any;

  @Watch('data')
  public _onDataChanged() {
    this.prepareData();
  }

  public componentDidLoad() {
    this.prepareData();
    this.renderGraph();
    this.renderLabel();
    this.setLabel(this.labelTitle, this.totalValue);
  }

  public render() {
    return [
      this.renderContent()
    ];
  }

  private prepareData() {
    // TODO: color map
    let title;
    let value;
    const sel = this.data.filter((item: any) => this.selected && item.id === this.selected.data.id)[0];

    if (sel) {
      title = sel.key;
      value = sel.value;
    } else {
      this.selected = null;
      this.totalValue = this.data.reduce((prev, curr) => prev + curr.value, 0);
      title = this.labelTitle;
      value = this.totalValue;
    }

    this.setLabel(title, value);
    this.clearGraph();
    this.renderGraph();
  }

  private renderContent() {
    return (
      <div class='as-donut-wrapper'>
        <svg class='as-donut-svg' ref={(ref: SVGElement) => this.container = select(ref)}></svg>
        {this.renderLabel()}
        {this.renderTooltip()}
      </div>
    );
  }

  private renderGraph() {
    if (!this.container || !this.container.node()) {
      return;
    }

    const bbox = this.el.getBoundingClientRect();
    const width = bbox.width;
    const height = bbox.height;

    this.container.attr('viewBox', `0 0 ${width} ${height}`);

    drawService.renderDonut(
      this.container,
      this.data,
      width,
      height,
      this.arcSize,
      this.padding,
      this.selected,
      this.onGraphMouseOver.bind(this),
      this.onGraphMouseOut.bind(this),
      this.onGraphMouseMove.bind(this),
      this.onGraphClick.bind(this)
    );
  }

  private clearGraph() {
    this.container.selectAll('.donut').remove();
  }

  private renderLabel() {
    return (
      <div ref={(ref) => this.labelElement = ref} class='as-donut-label'>
        <p class='as-label-title'></p>
        <p class='as-label-value'></p>
      </div>
    );
  }

  private setLabel(key?: string, value?: number) {
    this.label = select(this.labelElement);
    this.label.select('.as-label-title').text(key ? key : this.labelTitle);
    this.label.select('.as-label-value')
      .transition()
      .tween('text', function () {
        const selection = select(this);
        const start = parseInt(select(this).text(), 0) || 0;
        const end = value ? value : 0;
        const interpolator = interpolateNumber(start, end);

        return (t) => {
          selection.text(Math.round(interpolator(t)));
        };
      })
      .duration(500);
  }

  private onGraphMouseOver(data: any, pageX: number, pageY: number) {
    this.showTooltip(data, pageX, pageY);
  }

  private onGraphMouseMove(pageX: number, pageY: number) {
    this.moveTooltip(pageX, pageY);
  }

  private onGraphMouseOut() {
    this.hideTooltip();
  }

  private onGraphClick(item?: any) {
    this.hideTooltip();

    if (item) {
      this.selected = item;
      this.setLabel(item.data.key, item.data.value);
    } else {
      this.setLabel(this.labelTitle, this.totalValue);
    }
  }

  private renderTooltip() {
    return (
      <div ref={(ref) => this.tooltipElement = ref} class='as-donut-tooltip' role='tooltip'></div>
    );
  }

  private showTooltip(data: any, pageX: number, pageY: number) {
    this.tooltip = select(this.tooltipElement).html(`
      <div class="name">
        <span style="background-color: ${data.color};"></span>
        <p>${data.key}</p>
      </div>
      <p class="value">${data.value}%</p>
    `);

    this.tooltip
      .style('left', pageX + 'px')
      .style('top', pageY - this.tooltipMargin + 'px');

    this.tooltip
      .transition('show-tooltip')
      .duration(TRANSITION_DURATION)
      .style('opacity', 1);
  }

  private hideTooltip() {
    this.tooltip
      .transition('show-tooltip')
      .duration(TRANSITION_DURATION / 2)
      .style('opacity', 0);
  }

  private moveTooltip(pageX: number, pageY: number) {
    this.tooltip
      .style('left', pageX + 'px')
      .style('top', (pageY - this.tooltipMargin) + 'px');
  }
}