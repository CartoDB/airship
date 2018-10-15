import { Component, Prop, Watch } from '@stencil/core';
import { select } from 'd3-selection';
import { ColorMap } from './types/ColorMap';
import { ColumnData } from './types/ColumnData';
import { Container } from './types/Container';
import { RawStackedbarData } from './types/RawStackedbarData';
import { RectangleData } from './types/RectangleData';
import { StackedBarData } from './types/StackedBarData';
import { createColorMap } from './utils/color-manager';
import d3Helpers from './utils/d3-helpers';
import dataProcessor from './utils/data-processor';

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
  @Prop() public data: RawStackedbarData[] = [];

  /**
   * Legend data
   */
  @Prop() public valuesInfo: any;

  private tooltip: HTMLElement;
  private container: Container;
  private zeroAxis: number = 100;
  private scale: [number, number];
  private colorMap: ColorMap;

  /**
   * Callback executed when the mouse is placed over a rectangle.
   */
  @Prop() public mouseOver = (data: RectangleData) => {
    const event = window.event as MouseEvent;
    this.tooltip.style.display = 'inline';
    this.tooltip.style.left = `${event.clientX}px`;
    this.tooltip.style.top = `${event.clientY}px`;
    this.tooltip.innerText = `${data.value}`;
  }

  /**
   * Callback executed when the mouse is placed outside a rectangle.
   */
  @Prop() public mouseLeave = () => {
    this.tooltip.style.display = 'none';
  }

  public render() {
    console.log('render');
    const [from, to] = dataProcessor.getDomain(this.data);
    this.scale = [from, to];
    this.colorMap = this._createColorMap();

    return [
      <as-widget-header header={this.heading} subheader={this.description}></as-widget-header>,
      <svg ref={(ref: HTMLElement) => this.container = select(ref)}></svg>,
      <as-y-axis from={from} to={to}></as-y-axis>,
      this._renderLegend(),
      <span ref={(ref) => this.tooltip = ref} role='tooltip' class='as-tooltip as-tooltip--top' > TOOLTIP</span>
    ];
  }

  public componentDidLoad() {
    this.onDataChanged();
  }

  @Watch('data')
  public onDataChanged() {
    console.log('dataChanged');
    const data = dataProcessor.rawDataToStackBarData(this.data, this.scale, this.colorMap);
    const zeroAxis = dataProcessor.getZeroAxis(this.scale);
    this._drawColumns(data, zeroAxis);
    this.render();
  }

  private _drawColumns(data: StackedBarData, origin: number) {
    const Y_AXIS_LABEL_WIDTH = 25;
    const COLUMN_MARGIN = 5;
    const WIDTH = this.container.node().querySelector('.y-axis').getBoundingClientRect().width - Y_AXIS_LABEL_WIDTH;
    const COLUMN_WIDTH = (WIDTH / data.length) - COLUMN_MARGIN;

    let xOffset = COLUMN_MARGIN;

    // Create a "plot" group in the svg element where the columns will be drawn
    const plot = d3Helpers.createPlot(this.container);

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
    d3Helpers.drawColumn(columnElement, positives, yOffset, xOffset, colWidth, this.mouseOver, this.mouseLeave);

    // Draw rectangles below zero axis
    const negatives = column.filter((d) => d.negative);
    d3Helpers.drawColumn(columnElement, negatives, yOffset, xOffset, colWidth, this.mouseOver, this.mouseLeave);
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

  /**
   * Transform a color map into a object that legends can understand.
   */
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

  private _getKeys(data: RawStackedbarData[]): string[] {
    const keys = new Set();
    for (const rawColumn of data) {
      Object.keys(rawColumn.values).forEach((key) => {
        keys.add(key);
      });
    }
    return Array.from(keys);
  }
}
