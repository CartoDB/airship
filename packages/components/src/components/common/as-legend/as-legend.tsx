import { Component, Prop } from '@stencil/core';


/**
 * Helper class to draw the vertical axis on some widgets.
 *
 * @export
 * @class Legend
 */
@Component({
  shadow: false,
  styleUrl: './as-legend.scss',
  tag: 'as-legend',
})
export class Legend {

  /**
   * Header of the widget to be displayed
   *
   * @type {number}
   * @memberof YAxis
   */
  @Prop() public data: any = {};

  /**
   * Reference to the web component element.
   */
  // @Element() private element: HTMLElement;


  public render() {
    const items = [];
    Object.keys(this.data).forEach((key) => {
      const element = this.data[key];
      if (!element.label) {
        element.label = key;
      }
      items.push(element);
    });

    return items.map(this._renderLegendItem);
  }

  public _renderLegendItem(item) {
    return <div class='legend-item'>
      <span class='legend-item__box' style={{ background: item.color }}></span>
      <span class='legend-item__label as-body'>{item.label}</span>
    </div>;
  }
}
