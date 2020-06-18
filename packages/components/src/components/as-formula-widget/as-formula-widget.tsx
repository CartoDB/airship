import { Component, h, Prop, State, Watch } from '@stencil/core';
import readableNumber from '../../utils/readable-number';
import contentFragment from '../common/content.fragment';

/**
 * Formula Widget
 *
 * @export
 * @class FormulaWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-formula-widget.scss',
  tag: 'as-formula-widget',
})
export class FormulaWidget {
  /**
   * Numeric value to display in the widget.
   *
   * @type {number}
   * @memberof FormulaWidget
   */
  @Prop() public value: number;

  /**
   * Description text of the widget
   *
   * @type {string}
   * @memberof FormulaWidget
   */
  @Prop() public description: string;

  /**
   * If this property receives a function, it will be used to format the numbers (eg. for adding $ or €).
   *
   * @type {function (value: number)}
   * @memberof RangeSlider
   */
  @Prop() public valueFormatter: (value: number) => string = this.defaultFormatter;

  /**
   * Heading text of the widget
   *
   * @type {string}
   * @memberof FormulaWidget
   */
  @Prop() public heading: string;

  /**
   * If truthy, it'll render the heading and component's description. Default value is `true`.
   *
   * @type {boolean}
   * @memberof FormulaWidget
   */
  @Prop() public showHeader: boolean = true;

  /**
   * Boolean property to control the widget loading state. If true, a spinner is shown.
   */
  @Prop() public isLoading: boolean = false;

  /**
   * Text shown in the header subtitle when there's an error
   */
  @Prop() public error: string = '';

  /**
   * Extended error description, only shown when error is present
   */
  @Prop() public errorDescription: string = '';

  /**
   * Message shown in header when no data is available
   */
  @Prop() public noDataHeaderMessage: string = 'NO DATA AVAILABLE';

  /**
   * Message shown in body when no data is available
   */
  @Prop() public noDataBodyMessage: string = 'There is no data to display.';

  @State() private _firstDataSupplied: boolean = false;

  @Watch('value')
  public onDataChange() {
    if (!this._firstDataSupplied) {
      this._firstDataSupplied = Number.isFinite(this.value);
    }
  }

  public componentWillLoad() {
    this._firstDataSupplied = Number.isFinite(this.value);
  }

  /**
   * Default formatting function. Makes the value a readable number and
   * converts it into a string. Useful to compose with your own formatting
   * function.
   *
   * @memberof FormulaWidget
   */
  public defaultFormatter(value: number) {
    return `${readableNumber(value)}`;
  }

  public render() {
    if (this._isLoading()) {
      return (
        <as-formula-widget-placeholder>
          {this._renderHeader()}
        </as-formula-widget-placeholder>
      );
    }

    return [
      this._renderHeader(),
      this._renderContent(),
    ];
  }

  private _renderHeader() {
    if (!this.showHeader) {
      return;
    }

    return <as-widget-header
      header={this.heading}
      subheader={this.description}
      is-empty={this._isEmpty()}
      is-loading={this._isLoading()}
      error={this.error}
      no-data-message={this.noDataHeaderMessage}>
    </as-widget-header>;
  }

  private _renderContent() {
    return contentFragment(
      false,
      this.error,
      this._isEmpty(),
      this.heading,
      this.errorDescription,
      this.noDataBodyMessage,
      this._renderValue()
    );
  }

  private _renderValue() {
    return (
      <div class='as-title as-font--medium'>{this.valueFormatter(this.value)}</div>
    );
  }

  private _isLoading(): boolean {
    return (!this._firstDataSupplied || this.isLoading) && !this.error;
  }

  private _isEmpty(): boolean {
    return !Number.isFinite(this.value);
  }
}
