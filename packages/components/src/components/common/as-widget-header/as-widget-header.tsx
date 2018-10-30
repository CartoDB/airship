import { Component, Prop } from '@stencil/core';


/**
 * Helper class to draw widget headers
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
   * Main title
   *
   * @type {string}
   * @memberof WidgetHeader
   */
  @Prop() public header: string = '';

  /**
   * Secondary title
   *
   * @type {string}
   * @memberof WidgetHeader
   */
  @Prop() public subheader: string = '';

  /**
   * Indicates if the widget has some errors and display the text in the subheader
   */
  @Prop() public error: string = '';

  /**
   * Indicates if the widget has no data
   */
  @Prop() public isEmpty: boolean = false;

  /**
   * Indicates if the widget is loading
   */
  @Prop() public isLoading: boolean = false;

  /**
   * Message shown when no data is available
   */
  @Prop() public noDataMessage: string = 'NO DATA AVAILABLE';

  public render() {
    return [
      <h2 class='as-widget-header__header'>{this.header}</h2>,
      this._getSubHeader(),
    ];
  }

  private _getSubHeader() {
    if (this.isLoading) {
      return <p class='as-widget-header__subheader as-body '>{this.subheader}</p>;
    }
    if (this.error) {
      return <p class='as-widget-header__subheader as-widget-header__subheader--error as-body '>{this.error}</p>;
    }
    if (this.isEmpty) {
      return <p class='as-widget-header__subheader as-widget-header__subheader--empty as-body '>
        {this.noDataMessage}
      </p>;
    }
    return <p class='as-widget-header__subheader as-body'>{this.subheader}</p>;
  }
}
