import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';

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
  @Prop() public options: string[] = [];

  /**
   * Selected option to show in the dropdown
   *
   * @type {string}
   * @memberof Dropdown
   */
  @Prop({ mutable: true }) public selectedOption: string;

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
  @Prop() public canClear: boolean = false;

  /**
   * Fired when selected option changes or option is cleared
   *
   * @type {string}
   * @memberof Dropdown
   */
  @Event() public optionChanged: EventEmitter<string>;

  @State() private isOpen: boolean = false;

  public render() {
    const allowRemoveSelectedOption = this.canClear && Boolean(this.selectedOption);

    const controlClasses = {
      'as-menu-dropdown': true,
      'can-clear': allowRemoveSelectedOption,
      'is-open': this.isOpen
    };

    return (
      <div class={controlClasses}>
        <button class='dropdown--control as-body'
             aria-haspopup='true'
             aria-expanded={this.isOpen}
             onClick={() => this.toggleList()}>
          { this.isIncludedInOptions(this.selectedOption)
            ? this.selectedOption
            : this.defaultText }

          <div class='dropdown--icon'>
            {/* tslint:disable-next-line */}
            <svg viewBox='2 6 12 6' xmlns='http://www.w3.org/2000/svg'><path d='M8.30988427,11.1237193 L7.69011573,11.1237193 L15.2195214,4.12372525 C15.415115,3.94188438 15.7124148,3.96294311 15.8835591,4.17076125 C16.0547035,4.37857939 16.0348835,4.69446043 15.83929,4.8763013 L8.30988427,11.8762953 C8.13246042,12.041244 7.86753958,12.041244 7.69011573,11.8762953 L0.160710032,4.8763013 C-0.034883519,4.69446043 -0.0547035068,4.37857939 0.116440851,4.17076125 C0.287585208,3.96294311 0.584885024,3.94188438 0.780478575,4.12372525 L8.30988427,11.1237193 Z'/></svg>
          </div>
        </button>

        <ul tabindex='-1' class='dropdown--list'>
          { this.renderOptions(this.options) }
        </ul>

        { allowRemoveSelectedOption ?
          <button class='dropdown--clear' onClick={() => this.clearOption()}>
            {/* tslint:disable-next-line */}
            <svg viewBox='2 2 12 12' xmlns='http://www.w3.org/2000/svg'><path d='M8,8.58232323 L1.70292632,14.8793969 C1.5421222,15.040201 1.28140721,15.040201 1.12060309,14.8793969 C0.95979897,14.7185928 0.95979897,14.4578778 1.12060309,14.2970737 L7.41767677,8 L1.12060309,1.70292632 C0.95979897,1.5421222 0.95979897,1.28140721 1.12060309,1.12060309 C1.28140721,0.95979897 1.5421222,0.95979897 1.70292632,1.12060309 L8,7.41767677 L14.2970737,1.12060309 C14.4578778,0.95979897 14.7185928,0.95979897 14.8793969,1.12060309 C15.040201,1.28140721 15.040201,1.5421222 14.8793969,1.70292632 L8.58232323,8 L14.8793969,14.2970737 C15.040201,14.4578778 15.040201,14.7185928 14.8793969,14.8793969 C14.7185928,15.040201 14.4578778,15.040201 14.2970737,14.8793969 L8,8.58232323 Z'/></svg>
          </button> : '' }
      </div>
    );
  }

  private renderOptions(options: string[]) {
    return options.map((option) => {
      const buttonClasses = {
        'as-body': true,
        'is-selected': this.isSelected(option)
      };

      return (
        <li class='dropdown--list-item' data-value={option}>
          <button class={buttonClasses} onClick={() => this.select(option)}>{option}</button>
        </li>
      );
    });
  }

  private isIncludedInOptions(option) {
    return this.options.includes(option);
  }

  private isSelected(option) {
    return option === this.selectedOption;
  }

  private select(option) {
    this.selectedOption = option;

    this.closeList();
    this.emitOption();
  }

  private toggleList() {
    this.isOpen = !this.isOpen;
  }

  private closeList() {
    this.isOpen = false;
  }

  private clearOption() {
    this.selectedOption = '';

    this.emitOption();
  }

  private emitOption() {
    this.optionChanged.emit(this.selectedOption);
  }
}

