import { Component, Element, Event, EventEmitter, Method, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-switch.scss',
  tag: 'as-switch',
})

export class Switch {
  @Event() public change: EventEmitter;
  @Prop() public checked: boolean;
  @Prop() public disabled: boolean;
  @Prop() public name: string;
  @Element() private element: HTMLElement;


  public componentDidLoad() {
    this.element.addEventListener('click', this._onClick.bind(this));
  }


  @Method()
  public _onClick() {
    if (!this.disabled) {
      this.element.querySelector('input').checked = !this.element.querySelector('input').checked;
      this.change.emit(this.element.querySelector('input').checked);
    }
  }

  public render() {
    return [
      (<input
        class='as-switch__input'
        checked={this.checked}
        disabled={this.disabled}
        role='switch'
        id={this.element.id}
        name={this.name}
        type='checkbox'
        title={this.element.title}
      />),
      <label class='as-switch__toggle' htmlFor='switch_0'></label>,
      (<svg class='as-switch__thumb' width='10' height='8' xmlns='http://www.w3.org/2000/svg'>
        <path
          fill='currentColor'
          d='M3.315 7.858L.133 4.441a.506.506 0 0 1 0-.683l.643-.684a.437.437 0 0 1 .642 0l2.219 2.393L8.58.141a.437.437 0 0 1 .643 0l.643.683a.504.504 0 0 1 0 .683l-5.91 6.35a.437.437 0 0 1-.642 0' />
      </svg>)
    ];
  }
}
