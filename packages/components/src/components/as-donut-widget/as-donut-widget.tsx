import { Component, Prop, Watch } from '@stencil/core';
import { select } from 'd3-selection';
import { SVGContainer } from './types/Container';
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

  private container: SVGContainer;

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
        <svg class='svg' ref={(ref: SVGElement) => this.container = select(ref)}></svg>
      </div>
    );
  }

  private renderGraph() {
    if (!this.container || !this.container.node()) {
      return;
    }

    // TODO: check this wraning
    const bbox = this.container.node().parentNode.getBoundingClientRect();
    const width = bbox.width;
    const height = bbox.height;

    this.container.attr('viewBox', `0 0 ${width} ${height}`);

    drawService.renderDonut(
      this.container,
      this.data,
      width,
      height,
      this.arcSize,
      this.padding
    );
  }

  private clearGraph() {
    this.container.selectAll('.donut').remove();
  }
}