import { Component, Prop } from '@stencil/core';


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


  public render() {
    return [
      this._renderHeader(),
      <svg></svg>
    ];
  }

  private _renderHeader() {
    return [
      <h2 class='as-stacked-bar-widget__header'>{this.heading}</h2>,
      <p class='as-stacked-bar-widget__description as-body'>{this.description}</p>,
    ];
  }
}
