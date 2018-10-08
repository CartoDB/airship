import { Component, Prop } from '@stencil/core';
// import { max } from 'd3-array';
import { Axis, axisLeft } from 'd3-axis';
// import { BrushBehavior, brushX } from 'd3-brush';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { select, Selection } from 'd3-selection';
import dataprocessor from './data-processor';

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
  // private xScale: ScaleLinear<number, number>;
  private yScale: ScaleLinear<number, number>;
  private yAxis: Axis<{ valueOf(): number }>;
  // private xAxis: Axis<{ valueOf(): number }>;

  public render() {
    return [
      this._renderHeader(),
      <svg ref={(ref: HTMLElement) => this.container = select(ref)}></svg>,
    ];
  }

  public componentDidLoad() {
    console.log('didload');
    this._renderGraph();
  }

  private _renderHeader() {
    return [
      <h2 class='as-stacked-bar-widget__header'>{this.heading}</h2>,
      <p class='as-stacked-bar-widget__description as-body'>{this.description}</p>,
    ];
  }

  private _renderGraph() {

    if (!this.data.length) {
      return <p class='as-body'>No data availiable</p>
    }

    console.log('renderGraph');
    return [
      this.showLegend ? this._renderLegend() : null,
      this._renderAxis(),
    ];
  }

  private _renderAxis() {
    return [
      this._renderYAxis(),
      // this.renderYAxis(),
    ];
  }

  private _renderYAxis() {
    // const barsWidth = '50px';
    const domain = dataProcessor.getDomain(this.data);
    // -- Y Axis
    this.yScale = scaleLinear()
      .domain(domain)
      .range([1000, 0])
      .nice();

    this.yAxis = axisLeft(this.yScale);

    this.container
      .append('g')
      .call(this.yAxis);
  }

  // private _renderXAxis() {}

  private _renderLegend() {
    return <p>legend</p>
  }
}

export interface StackedbarData {
  category: string;
  values: {
    [propName: string]: number;
  };
}
