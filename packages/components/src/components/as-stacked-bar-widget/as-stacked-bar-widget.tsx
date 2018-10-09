import { Component, Prop } from '@stencil/core';
import { select, Selection } from 'd3-selection';
import dataProcessor from '../../utils/data-processor';
import { StackedbarData } from '../../utils/StackedBarData';

/**
 * Stacked bar Widget
 *
 * @export
 * @class StackedBarWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-stacked-bar-widget.scss',
  tag: 'as-stacked-bar-widget',
})
export class StackedBarWidget {

  /**
   * Header of the widget to be displayed
   *
   * @type {string}
   * @memberof StackedBarWidget
   */
  @Prop() public heading: string;

  /**
   * Description of the widget to be displayed
   *
   * @type {string}
   * @memberof StackedBarWidget
   */
  @Prop() public description: string;

  /**
   * Boolean flag to control legend visibility.
   * Defaults: true
   *
   * @type {boolean}
   * @memberof StackedBarWidget
   */
  @Prop() public showLegend: boolean = true;

  @Prop() public data: StackedbarData[] = [];

  private container: Selection<HTMLElement, {}, null, undefined>;

  public render() {
    const [from, to] = dataProcessor.getDomain(this.data);
    return [
      <as-widget-header header={this.heading} subheader={this.description}></as-widget-header>,
      <svg ref={(ref: HTMLElement) => this.container = select(ref)}></svg>,
      <as-y-axis from={from} to={to}></as-y-axis>,
      this._renderLegend()
    ];
  }

  public componentDidLoad() {
    this._renderGraph();
  }

  private _renderGraph() {
    console.warn(this.container);
    this.container
      .append('g')
      .attr('class', 'plot')
      .append('rect')
      .attr('x', 0)
      .attr('y', 'calc(60% + 1)')
      .attr('width', 30)
      .attr('height', '40%')
      .attr('fill', 'rgba(200, 20, 20, 0.8)');
  }

  private _renderLegend() {
    if (this.showLegend) {
      return <p>legend</p>;
    }
  }
}
