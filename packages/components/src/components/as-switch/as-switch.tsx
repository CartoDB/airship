import { Component } from '@stencil/core';

@Component({
  tag: 'as-switch',
  styleUrl:'./as-switch.scss',
  shadow: false
})
export class MyComponent {
  render() {
    return (
      <label class="switch">
        <input type="checkbox" />
        <span class="slider"></span>
      </label>
    );
  }
}

