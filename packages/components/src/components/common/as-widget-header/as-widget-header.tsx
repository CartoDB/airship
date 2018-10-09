import { Component, Prop } from '@stencil/core';


/**
 * Helper class to draw the vertical axis on some widgets.
 *
 * @export
 * @class WidgetHeader
 */
@Component({
  shadow: false,
  styleUrl: './as-widget-header.scss',
  tag: 'as-widget-header',
})
export class WidgetHeader {

  /**
   * Header of the widget
   *
   * @type {string}
   * @memberof WidgetHeader
   */
  @Prop() public header: string = '';

  /**
   * Subheader of the widget
   *
   * @type {string}
   * @memberof WidgetHeader
   */
  @Prop() public subheader: string = '';

  public render() {
    return [
      <h2 class='as-widget-header__header'>{this.header}</h2>,
      <p class='as-widget-header__subheader as-body'>{this.subheader}</p>,
    ];
  }
}
