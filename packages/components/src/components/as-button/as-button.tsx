import { Component } from '@stencil/core';

@Component({
  tag: 'as-button',
  styleUrls:
  ['../../../../styles/src/core/core.scss',
    '../../../../styles/src/button/button.scss'
  ],
  shadow: false
})
export class MyComponent {

  onClick() {
    console.log('CLICKED');
    console.log('CLICKED2');
  }

  render() {
    return (
      <button class="as-button as-button--primary" onClick={this.onClick.bind(this)}>Click Me!</button>
    );
  }
}

