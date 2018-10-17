import { Component, Prop, Watch } from '@stencil/core';
import { ColorMap } from './types/ColorMap';
import { RawStackedbarData } from './types/RawStackedbarData';
import { RectangleData } from './types/RectangleData';
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
  private container: SVGElement;
  private scale: [number, number] = [0, 0];
  private colorMap: ColorMap;

  /**
   * Callback executed when the mouse is placed over a rectangle.
   */
  @Prop() public mouseOver = (data: RectangleData) => {
    const event = window.event as MouseEvent;
    this.tooltip.style.display = 'inline';
    this.tooltip.style.left = `${event.clientX}px`;
    this.tooltip.style.top = `${event.clientY}px`;
    this.tooltip.innerText = `${data.v}`;
  }

  /**
   * Callback executed when the mouse is placed outside a rectangle.
   */
  @Prop() public mouseLeave = () => {
    this.tooltip.style.display = 'none';
  }

  public render() {
    return [
      <as-widget-header header={this.heading} subheader={this.description}></as-widget-header>,
      <svg ref={(ref: SVGElement) => this.container = ref}></svg>,
      <as-y-axis from={this.scale[0]} to={this.scale[1]}></as-y-axis>,
      this._renderLegend(),
      <span ref={(ref) => this.tooltip = ref} role='tooltip' class='as-tooltip as-tooltip--top' > TOOLTIP</span>
    ];
  }

  public componentDidLoad() {
    this._drawColumns();
  }

  public componentDidUpdate() {
    this._drawColumns();
  }

  public componentWillLoad() {
    this._setupState();
  }

  public componentWillUpdate() {
    this._setupState();
  }

  @Watch('data')
  public _onDataChanged() {
    this._setupState();
    this._drawColumns();
  }

  private _setupState() {
    this.scale = dataProcessor.getDomain(this.data);
    this.colorMap = this._createColorMap();
  }

  private _drawColumns() {
    const Y_AXIS_LABEL_WIDTH = 25;
    const COLUMN_MARGIN = 5;
    const WIDTH = this.container.querySelector('.y-axis').getBoundingClientRect().width - Y_AXIS_LABEL_WIDTH;
    const COLUMN_WIDTH = (WIDTH / this.data.length) - COLUMN_MARGIN;
    const data = dataProcessor.rawDataToStackBarData(this.data, this.scale, this.colorMap, COLUMN_WIDTH, COLUMN_MARGIN);

    d3Helpers.drawColumns(this.container, data, this.mouseOver, this.mouseLeave);
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
