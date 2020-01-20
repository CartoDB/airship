import { Component, h } from '@stencil/core';

@Component({
  shadow: false,
  styles: `
    .selection-bar {
      margin-bottom: 25px;
    }
  `,
  tag: 'as-histogram-widget-placeholder',
})
export class CategoryWidgetPlaceholder {
  public render() {
    return (
      <as-placeholder>
        <div slot='header'>
          <slot />
        </div>
        <as-placeholder-bar class='selection-bar' width='30%' height='12px'></as-placeholder-bar>
        <as-placeholder-chart></as-placeholder-chart>
      </as-placeholder>
    );
  }
}
