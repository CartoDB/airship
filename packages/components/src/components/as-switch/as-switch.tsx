import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'as-switch',
  styleUrl:'./as-switch.scss',
  shadow: false
})
export class Switch {
  @Event() onToggle: EventEmitter;

  render() {
    return (
      <label class="switch">
        <input type="checkbox" onChange={(event: UIEvent) => this.onInputChanged(event)}/>
        <span class="slider"></span>
      </label>
    );
  }

  onInputChanged(event) {
    const currentState = event.target.checked;
    this.onToggle.emit(currentState);
  }
}
