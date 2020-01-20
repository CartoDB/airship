import { Component, h } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-placeholder.scss',
  tag: 'as-placeholder',
})
export class Placeholder {
  public render() {
    return (
      <section class='placeholder'>
        <div class='progress'>
          <div class='progress__animation'></div>
        </div>

        <div class='placeholder__title'>
          <slot name='header'>Loading data...</slot>
        </div>

        <div class='placeholder__content'>
          <slot />
        </div>
      </section>
    );
  }
}
