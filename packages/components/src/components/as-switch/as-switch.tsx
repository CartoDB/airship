import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-switch.scss',
  tag: 'as-switch',
})

export class Switch {
  @Event() public onToggle: EventEmitter;

  public render() {
    return (
      <label class='switch'>
        <input type='checkbox' onChange={(event: UIEvent) => this.onInputChanged(event)} />
        <span class='slider'></span>
      </label>
    );
  }

  public onInputChanged(event) {
    const currentState = event.target.checked;
    this.onToggle.emit(currentState);
  }
}
