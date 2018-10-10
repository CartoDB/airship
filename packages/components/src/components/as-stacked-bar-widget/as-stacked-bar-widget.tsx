import { Component, Prop } from '@stencil/core';
import { select, Selection } from 'd3-selection';
import dataProcessor from '../../utils/data-processor';
import { StackedbarData } from '../../utils/StackedBarData';
import d3Helpers from './d3-helpers';

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

  /**
   * The data that will be drawn.
   *
   * @type {StackedbarData}
   * @memberof StackedBarWidget
   */
  @Prop() public data: StackedbarData[] = [];

  /**
   * Legend data
   */
  @Prop() public valuesInfo: any;

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
    this._drawColumns(dataProcessor.rawDataToStackBarData(this.data, this.scale), this.zeroAxis);
  }

  private _drawColumns(data: ColumnData[][], origin: number) {
    const Y_AXIS_LABEL_WIDTH = 25;
    const COLUMN_MARGIN = 5;
    const WIDTH = this.container.node().querySelector('.y-axis').getBoundingClientRect().width - Y_AXIS_LABEL_WIDTH;
    const COLUMN_WIDTH = (WIDTH / data.length) - COLUMN_MARGIN;

    let xOffset = COLUMN_MARGIN;

    // Create a "plot" group in the svg element where the columns will be drawn
    d3Helpers.createPlot(this.container);

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

    // Create the column group in the plot
    const columnElement = d3Helpers.createColumn(element);

    // Draw rectangles above zero axis
    const positives = column.filter((d) => !d.negative);
    d3Helpers.drawColumn(columnElement, positives, yOffset, xOffset, colWidth);

    // Draw rectangles below zero axis
    const negatives = column.filter((d) => d.negative);
    d3Helpers.drawColumn(columnElement, negatives, yOffset, xOffset, colWidth);
  }

  private _renderLegend() {
    if (this.showLegend && this.valuesInfo) {
      return <as-legend data={this.valuesInfo}></as-legend>;
    }
  }
}



export interface ColumnData {
  color: string;
  size: number;
  negative?: boolean;
}