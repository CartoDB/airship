import { Component, Prop } from '@stencil/core';
import { select } from 'd3-selection';
import { createColorMap } from '../../utils/color-manager';
import { ColorMap } from '../../utils/ColorMap';
import dataProcessor from '../../utils/data-processor';
import d3Helpers from './d3-helpers';
import { ColumnData } from './types/ColumnData';
import { Container } from './types/Container';
import { IRawStackedbarData } from './types/RawStackedbarData';
import { StackedBarData } from './types/StackedBarData';

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
   * @type {RawStackedbarData}
   * @memberof StackedBarWidget
   */
  @Prop() public data: IRawStackedbarData[] = [];

  /**
   * Legend data
   */
  @Prop() public valuesInfo: any;

  private container: Container;
  private zeroAxis: number = 100;
  private scale: [number, number];
  private colorMap: ColorMap;

  public render() {
    const [from, to] = dataProcessor.getDomain(this.data);
    this.zeroAxis = dataProcessor.getZeroAxis([from, to]);
    this.scale = [from, to];
    this.colorMap = this._createColorMap();

    return [
      <as-widget-header header={this.heading} subheader={this.description}></as-widget-header>,
      <svg ref={(ref: HTMLElement) => this.container = select(ref)}></svg>,
      <as-y-axis from={from} to={to}></as-y-axis>,
      this._renderLegend()
    ];
  }

  public componentDidLoad() {
    const data = dataProcessor.rawDataToStackBarData(this.data, this.scale, this.colorMap);
    this._drawColumns(data, this.zeroAxis);
  }

  private _drawColumns(data: StackedBarData, origin: number) {
    const Y_AXIS_LABEL_WIDTH = 25;
    const COLUMN_MARGIN = 5;
    const WIDTH = this.container.node().querySelector('.y-axis').getBoundingClientRect().width - Y_AXIS_LABEL_WIDTH;
    const COLUMN_WIDTH = (WIDTH / data.length) - COLUMN_MARGIN;

    let xOffset = COLUMN_MARGIN;

    // Create a "plot" group in the svg element where the columns will be drawn
    d3Helpers.createPlot(this.container);
    const plot = this.container.select('.plot') as Container;

    for (const columnData of data) {
      this._drawColumn(plot, columnData, origin, xOffset, COLUMN_WIDTH);
      xOffset += COLUMN_WIDTH + COLUMN_MARGIN;
    }
  }

  private _drawColumn(element: Container, column: ColumnData, yOffset: number, xOffset: number, colWidth: number) {
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
    if (this.showLegend && this.colorMap) {
      const data = this._colorMaptoLegendData(this.colorMap);
      return <as-legend data={data}></as-legend>;
    }
  }

  private _createColorMap() {
    const keys = this._getKeys(this.data);
    return createColorMap(keys, this.valuesInfo);
  }

  private _colorMaptoLegendData(colorMap: ColorMap) {
    const legendData = {};
    Object.keys(colorMap).forEach((key) => {
      legendData[key] = {
        color: colorMap[key],
        label: key,
      };
    });
    return legendData;
  }

  private _getKeys(data: any[]): string[] {
    const keys = new Set();
    for (const rawColumn of data) {
      Object.keys(rawColumn.values).forEach((key) => {
        keys.add(key);
      });
    }
    return Array.from(keys);
  }
}
