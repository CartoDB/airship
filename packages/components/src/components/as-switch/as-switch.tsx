import { Component } from '@stencil/core';

@Component({
  tag: 'as-switch',
  styleUrl:'./as-switch.scss',
  shadow: false
})
export class Switch {
  render() {
    return (
      <label class="switch">
        <input type="checkbox" />
        <span class="slider"></span>
      </label>
    );
  }
}

