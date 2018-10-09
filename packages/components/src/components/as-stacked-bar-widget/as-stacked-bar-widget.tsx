import { Component, Prop } from '@stencil/core';
import { select, Selection } from 'd3-selection';
// import dataProcessor from '../../utils/data-processor';
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
    // const [from, to] = dataProcessor.getDomain(this.data);
    return [
      <as-widget-header header={this.heading} subheader={this.description}></as-widget-header>,
      <svg ref={(ref: HTMLElement) => this.container = select(ref)}></svg>,
      <as-y-axis from={0} to={100}></as-y-axis>,
      this._renderLegend()
    ];
  }

  public componentDidLoad() {
    this._renderGraph();
  }

  private _renderGraph() {
    // (Y) where the zero axis is located
    const ZERO_AXIS = 100;
    const origin = ZERO_AXIS;

    const column = [{
      color: 'rgba(200, 20, 20, 0.8)',
      size: 40
    },
    {
      color: 'rgba(20, 200, 20, 0.8)',
      size: 5
    },
    {
      color: 'rgba(20, 20, 200, 0.8)',
      size: 20
    }];

    const column2 = [{
      color: 'rgba(200, 20, 20, 0.8)',
      size: 20
    },
    {
      color: 'rgba(20, 200, 20, 0.8)',
      size: 50
    },
    {
      color: 'rgba(20, 20, 200, 0.8)',
      size: 10
    }];

    this._drawColumns([column, column2], origin);
  }

  private _drawColumns(data: ColumnData[][], origin: number) {
    let xOffset = 0;
    const COLUMN_MARGIN = 5;
    const COLUMN_WIDTH = 30;

    this.container
      .append('g')
      .attr('class', 'plot')
      .selectAll('rect');

    data.forEach((columnData) => {
      this._drawColumn(this.container.select('.plot'), columnData, origin, xOffset, COLUMN_WIDTH);
      xOffset += COLUMN_WIDTH + COLUMN_MARGIN;
    });
  }

  private _drawColumn(
    element: Selection<HTMLElement, {}, null, undefined>,
    column: ColumnData[],
    yOffset: number,
    xOffset: number,
    colWidth: number) {

    element
      .append('g')
      .attr('class', 'column')
      .selectAll('rect')
      .data(column)
      .enter()
      .append('rect')
      .attr('x', xOffset)
      .attr('y', (d) => {
        const y = this.computeY(d, yOffset);
        yOffset -= d.size;
        return y;
      })
      .attr('width', colWidth)
      .attr('height', (d) => `${d.size}%`)
      .attr('fill', (d) => d.color);
  }

  private computeY(data, origin) {
    // if (data.negative) {
    //   return `${origin}%`;
    // }
    return `${(origin - data.size)}%`;
  }

  private _renderLegend() {
    if (this.showLegend) {
      return <p>legend</p>;
    }
  }
}



export interface ColumnData {
  color: string;
  size: number;
}
