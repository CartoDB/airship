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
   * Use this attribute to put the widget-header in "error mode".
   * When this attribute is not empty the subheader will display the given value.
   */
  @Prop() public error: string = '';

  /**
   * Use this attribute to put the widget-header in "empty mode".
   * When this attribute is true the subheader will show the text defined by noDataMessage.
   */
  @Prop() public isEmpty: boolean = false;

  /**
   * Use this attribute to put the widget-header in "loading mode".
   * When this attribute is true the subheader text will be displayed as usual.
   */
  @Prop() public isLoading: boolean = false;

  /**
   * Use this attribute to select the text displayed in the subheader when the header is in "empty mode".
   * Defaults to "NO DATA AVAILABLE"
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
