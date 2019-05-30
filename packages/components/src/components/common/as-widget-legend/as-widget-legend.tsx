import { Component, Prop } from '@stencil/core';
import { WidgetLegendData } from './types/WidgetLegendData';


/**
 * Helper class to draw the vertical axis on some widgets.
 *
 * @export
 * @class Legend
 */
@Component({
  shadow: false,
  styleUrl: './as-widget-legend.scss',
  tag: 'as-widget-legend',
})
export class WidgetLegend {

  /**
   * Data to be displayed by the legend
   *
   * @type {LegendData}
   * @memberof Legend
   */
  @Prop() public data: LegendData;

  public render() {
    return Object.keys(this.data).map((key) => {
      return <div class='legend-item'>
        <span class='legend-item__box' style={{ background: this.data[key] }}></span>
        <span class='legend-item__label as-body'>{key}</span>
      </div>;
    });
  }
}
