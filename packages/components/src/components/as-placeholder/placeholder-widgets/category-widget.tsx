import { Component, h } from '@stencil/core';

@Component({
  shadow: false,
  styles: `
    as-placeholder-bar {
      margin-bottom: 12px;
    }
  `,
  tag: 'as-category-widget-placeholder',
})
export class CategoryWidgetPlaceholder {
  public render() {
    return [
      <as-placeholder>
        <div slot='header'>
          <slot />
        </div>
        <as-placeholder-bar width='30%' height='12px'></as-placeholder-bar>
        <as-placeholder-list></as-placeholder-list>
      </as-placeholder>
    ];
  }
}
