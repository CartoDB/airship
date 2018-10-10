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
  private zeroAxis: number = 100;
  private scale: number[];

  public render() {
    const [from, to] = dataProcessor.getDomain(this.data);
    this.zeroAxis = dataProcessor.getZeroAxis([from, to]);
    this.scale = [from, to];

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
    const origin = this.zeroAxis;
    this._drawColumns(dataProcessor.rawDataToStackBarData(this.data, this.scale), origin);
  }

  private _drawColumns(data: ColumnData[][], origin: number) {
    const COLUMN_MARGIN = 5;
    const COLUMN_WIDTH = 30;
    let xOffset = 0;

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

    const initialY = yOffset;


    const columnElement = element
      .append('g')
      .attr('class', 'column')
      .selectAll('rect');

    const positives = column.filter((d) => !d.negative);
    columnElement
      .data(positives)
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

    const negatives = column.filter((d) => d.negative);

    yOffset = initialY;

    columnElement
      .data(negatives)
      .enter()
      .append('rect')
      .attr('x', xOffset)
      .attr('y', (d) => {
        const y = this.computeY(d, yOffset);
        yOffset += d.size;
        return y;
      })
      .attr('width', colWidth)
      .attr('height', (d) => `${d.size}%`)
      .attr('fill', (d) => d.color);
  }

  private computeY(data, origin) {
    if (data.negative) {
      return `${origin}%`;
    }
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
  negative?: boolean;
}
