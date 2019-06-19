import { Component, Element, Prop, Watch } from '@stencil/core';
import { select } from 'd3-selection';
import { SVGContainer, SVGGContainer } from './types/Container';
import { DonutData } from './interfaces';
import drawService from './utils/draw.service';

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

  private container: SVGContainer;
  private tooltipElement: HTMLElement;
  private tooltip: any;

  @Watch('data')
  public _onDataChanged() {
    this.clearGraph();
    this.renderGraph();
  }

  public componentDidLoad() {
    this.clearGraph();
    this.renderGraph();
  }

  public render() {
    return [
      this.renderContent()
    ];
  }

  private renderContent() {
    return (
      <div class='as-donut-wrapper'>
        <svg class='as-donut-svg' ref={(ref: SVGElement) => this.container = select(ref)}></svg>
        <div class='as-donut-tooltip'></div>
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

    this.tooltipElement = this.el.querySelector('.as-donut-tooltip');

    drawService.renderDonut(
      this.container,
      this.data,
      width,
      height,
      this.arcSize,
      this.padding,
      this.showTooltip.bind(this),
      this.hideTooltip.bind(this),
      this.moveTooltip.bind(this),
    );
  }

  private clearGraph() {
    this.container.selectAll('.donut').remove();
  }

  private showTooltip(data: any, pageX: number, pageY: number) {
    this.tooltip = select(this.tooltipElement).html(`
        <div class="name">
          <span style="background-color: ${data.color};"></span>
          <p>${data.key}</p>
        </div>
        <p class="value">${data.value}%</p>
      `);

    this.tooltip.style('left', pageX + 'px')
      .style('top', pageY - this.tooltipMargin + 'px');

    this.tooltip.transition('show-tooltip')
      .duration(250)
      .style('opacity', 1);
  }

  private hideTooltip() {
    this.tooltip.style('opacity', 0);
  }

  private moveTooltip(pageX: number, pageY: number) {
    this.tooltip.style('left', pageX + 'px')
      .style('top', (pageY - this.tooltipMargin) + 'px');
  }
}