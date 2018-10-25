import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import { DropdownOption } from './types/DropdownOption';

/**
 * Dropdown Widget
 *
 * @export
 * @class Dropdown
 */
@Component({
  shadow: false,
  styleUrl: './as-dropdown.scss',
  tag: 'as-dropdown',
})
export class Dropdown {
  /**
   * Array of options to display in the dropdown
   *
   * @type {string[]}
   * @memberof Dropdown
   */
  @Prop() public options: DropdownOption[] = [];

  /**
   * Selected option to show in the dropdown
   *
   * @type {string}
   * @memberof Dropdown
   */
  @Prop({ mutable: true }) public selectedOption: string = null;

  /**
   * Default text to show when no option is selected
   *
   * @type {string}
   * @memberof Dropdown
   */
  @Prop() public defaultText: string = '';

  /**
   * Allow the user to clear selected option
   *
   * @type {string}
   * @memberof Dropdown
   */
  @Prop() public showClearButton: boolean = false;

  /**
   * Fired when selected option changes or option is cleared
   *
   * @type {string}
   * @memberof Dropdown
   */
  @Event() public optionChanged: EventEmitter<string>;

  @State() private isOpen: boolean = false;
  @State() private selectedOptionObject: DropdownOption = {};

  @Watch('selectedOption')
  public onSelectionChanged(newValue: string) {
    this._selectFromValue(newValue);
  }

  @Watch('options')
  public onOptionsChanged() {
    this._selectFromValue(this.selectedOption);
  }

  public componentWillLoad() {
    this._selectFromValue(this.selectedOption);
  }

  public render() {
    const allowRemoveSelectedOption = this.showClearButton && Boolean(this.selectedOption);

    const controlClasses = {
      'as-dropdown': true,
      'as-dropdown--clear': allowRemoveSelectedOption,
      'as-dropdown--open': this.isOpen
    };

    return (
      <div class={controlClasses}>
        <button class='as-dropdown__control as-body'
          aria-haspopup='true'
          aria-expanded={this.isOpen}
          onClick={() => this._toggleList()}>
          {this.selectedOptionObject && this.selectedOptionObject.text
            || this.selectedOptionObject && this.selectedOptionObject.value
            || this.defaultText}

          <div class='as-dropdown__arrow'>
            {/* tslint:disable-next-line */}
            <svg viewBox='2 6 12 6' xmlns='http://www.w3.org/2000/svg'><path d='M8.30988427,11.1237193 L7.69011573,11.1237193 L15.2195214,4.12372525 C15.415115,3.94188438 15.7124148,3.96294311 15.8835591,4.17076125 C16.0547035,4.37857939 16.0348835,4.69446043 15.83929,4.8763013 L8.30988427,11.8762953 C8.13246042,12.041244 7.86753958,12.041244 7.69011573,11.8762953 L0.160710032,4.8763013 C-0.034883519,4.69446043 -0.0547035068,4.37857939 0.116440851,4.17076125 C0.287585208,3.96294311 0.584885024,3.94188438 0.780478575,4.12372525 L8.30988427,11.1237193 Z' /></svg>
          </div>
        </button>

        <ul tabindex='-1' class='as-dropdown__list'>
          {this._renderOptions(this.options as DropdownOption[])}
        </ul>

        {allowRemoveSelectedOption ?
          <button class='as-dropdown__clear' onClick={() => this.clearOption()}>
            {/* tslint:disable-next-line */}
            <svg viewBox='2 2 12 12' xmlns='http://www.w3.org/2000/svg'><path d='M8,8.58232323 L1.70292632,14.8793969 C1.5421222,15.040201 1.28140721,15.040201 1.12060309,14.8793969 C0.95979897,14.7185928 0.95979897,14.4578778 1.12060309,14.2970737 L7.41767677,8 L1.12060309,1.70292632 C0.95979897,1.5421222 0.95979897,1.28140721 1.12060309,1.12060309 C1.28140721,0.95979897 1.5421222,0.95979897 1.70292632,1.12060309 L8,7.41767677 L14.2970737,1.12060309 C14.4578778,0.95979897 14.7185928,0.95979897 14.8793969,1.12060309 C15.040201,1.28140721 15.040201,1.5421222 14.8793969,1.70292632 L8.58232323,8 L14.8793969,14.2970737 C15.040201,14.4578778 15.040201,14.7185928 14.8793969,14.8793969 C14.7185928,15.040201 14.4578778,15.040201 14.2970737,14.8793969 L8,8.58232323 Z' /></svg>
          </button> : ''}
      </div>
    );
  }

  private _renderOptions(options: DropdownOption[]) {
    return options.map((option) => {
      const buttonClasses = {
        'as-body': true,
        'is-selected': this._isSelected(option)
      };

      return (
        <li class='as-dropdown__list-item' data-value={option.value}>
          <button class={buttonClasses} onClick={() => this._select(option)}>
            {option.text || option.value}
          </button>
        </li>
      );
    });
  }

  private _isSelected(option) {
    return option === this.selectedOptionObject;
  }

  private _select(optionObject) {
    if (this.selectedOption === optionObject.value) {
      return;
    }

    this.selectedOption = optionObject.value;
    this.selectedOptionObject = optionObject;

    this._closeList();
    this._emitOption();
  }

  private _selectFromValue(value) {
    if (!value) {
      this.selectedOptionObject = null;
      return;
    }
    const selectedOptionObject = this.options.find((option) => option.value === value);

    if (selectedOptionObject) {
      this.selectedOptionObject = selectedOptionObject;
    }
  }

  private _toggleList() {
    this.isOpen = !this.isOpen;
  }

  private _closeList() {
    this.isOpen = false;
  }

  private clearOption() {
    this._closeList();
    this.selectedOption = null;

    this._emitOption();
  }

  private _emitOption() {
    if (this.optionChanged) {
      this.optionChanged.emit(this.selectedOption);
    }
  }
}
