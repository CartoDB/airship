import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-switch.scss',
  tag: 'as-switch',
})

export class Switch {
  /**
   * HTMLElement wraper for the switch component
   *
   * @type {HTMLElement}
   * @memberof Switch
   */
  @Element() public el: HTMLElement;

  /**
   * Boolean flag to control if the input is checked or not
   *
   * @type{boolean}
   * @memberof Switch
   */
  @Prop({ mutable: true, reflectToAttr: true }) public checked: boolean;

  /**
   * Boolean flag to control when the switch is disabled or not
   *
   * @type{boolean}
   * @memberof Switch
   */
  @Prop({ reflectToAttr: true }) public disabled: boolean;

  /**
   * The input name
   *
   * @type{string}
   * @memberof Switch
   */
  @Prop({ reflectToAttr: true }) public name: string;

  /**
   * Event triggered by a enabled Switch component when the user clicks on it.
   *
   * @type{boolean}
   * @memberof Switch
   */
  @Event() public change: EventEmitter;

  /**
   * When the component is attached to the DOM bind the onClick function
   */
  public componentDidLoad() {
    this.el.addEventListener('click', this._onClick.bind(this));
  }

  /**
   * Fire a 'change' event with a boolean parameter if the user clicks on an enabled component
   */
  public _onClick() {
    const input = this.el.querySelector('input');
    if (!this.disabled) {
      input.checked = !input.checked;
      this.checked = input.checked;
      this.change.emit(input.checked);
    }
  }

  public render() {
    return [
      <input
        class='as-switch__input'
        checked={this.checked}
        disabled={this.disabled}
        role='switch'
        id={this.el.id}
        name={this.name}
        type='checkbox'
        title={this.el.title}
      />,
      <label class='as-switch__toggle' htmlFor='switch_0'></label>,
      <svg class='as-switch__thumb' width='10' height='8' xmlns='http://www.w3.org/2000/svg'>
        <path
          fill='currentColor'
          // tslint:disable-next-line
          d='M3.315 7.858L.133 4.441a.506.506 0 0 1 0-.683l.643-.684a.437.437 0 0 1 .642 0l2.219 2.393L8.58.141a.437.437 0 0 1 .643 0l.643.683a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0' />
      </svg>
    ];
  }
}
