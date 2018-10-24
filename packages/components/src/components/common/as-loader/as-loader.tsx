import { Component } from '@stencil/core';


/**
 * Helper class to draw the vertical axis on some widgets.
 *
 * @export
 * @class Legend
 */
@Component({
  shadow: false,
  styleUrl: './as-loader.scss',
  tag: 'as-loader',
})
export class Loader {
  public render() {
    return <span class='as-loading'>
      <svg viewBox='0 0 50 50'>
        <circle cx='25' cy='25' r='20' fill='none' />
      </svg>
    </span>;
  }
}
