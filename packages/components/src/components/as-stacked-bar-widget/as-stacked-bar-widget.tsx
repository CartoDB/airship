import { Component, Prop } from '@stencil/core';
import { select, Selection } from 'd3-selection';
import dataProcessor from './data-processor';


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
    return (
      <div class="as-widget">
        {this._renderHeader()}
        <svg ref={(ref: HTMLElement) => this.container = select(ref)}></svg>
        <as-y-axis from={from} to={to}></as-y-axis>
        {this._renderLegend()}
      </div>
    );
  }

  public componentDidLoad() {
    // this._renderGraph();
  }

  private _renderHeader() {
    return [
      <h2 class='as-stacked-bar-widget__header'>{this.heading}</h2>,
      <p class='as-stacked-bar-widget__description as-body'>{this.description}</p>,
    ];
  }

  // private _renderGraph() {}

  private _renderLegend() {
    if (this.showLegend) {
      return <p>legend</p>
    }
  }
}

export interface StackedbarData {
  category: string;
  values: {
    [propName: string]: number;
  };
}
