import { Component, h } from '@stencil/core';

@Component({
  shadow: false,
  styles: `
    as-histogram-widget-placeholder {
      background-color: var(--as--color--ui-01, $color-ui-01);
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
        <as-placeholder-chart></as-placeholder-chart>
      </as-placeholder>
    );
  }
}
