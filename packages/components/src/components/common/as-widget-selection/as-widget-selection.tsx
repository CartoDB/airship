import { Component, h, Event, Prop } from '@stencil/core';

/**
 * Helper class to draw widget selections
 *
 * @export
 * @class WidgetSelection
 */
@Component({
  shadow: false,
  styleUrl: './as-widget-selection.scss',
  tag: 'as-widget-selection',
})
export class WidgetSelection {

  /**
   * The text to be displayed
   *
   * @type {string}
   * @memberof WidgetSelection
   */
  @Prop() public selection: string;

  /**
   * Text for the clear text
   *
   * @type {string}
   * @memberof WidgetSelection
   */
  @Prop() public clearText: string = 'Clear selection';

  /**
   * Whether to display the clear button or not
   *
   * @type {boolean}
   * @memberof WidgetSelection
   */
  @Prop() public showClear: boolean;

  /**
   * Event fired when clicking on clear text
   *
   * @private
   * @memberof WidgetSelection
   */
  @Event() private clear;

  public render() {
    return <div class='as-color--type-01 as-widget-selection__wrapper'>
      <span class='as-widget-selection__selection as-body'>{this.selection}</span>
      {this.showClear ? this.renderClearBtn() : '' }
    </div>;
  }

  private renderClearBtn() {
    return (
      <span
        class='as-body as-color--primary as-widget-selection__clear'
        onClick={() => { this.clear.emit(); }}
        >{this.clearText}
      </span>
    );
  }
}
