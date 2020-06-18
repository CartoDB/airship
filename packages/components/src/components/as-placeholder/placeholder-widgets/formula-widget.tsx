import { Component, h } from '@stencil/core';

@Component({
  shadow: false,
  styles: `
    as-formula-widget-placeholder {
      background-color: var(--as--color--ui-01, $color-ui-01);
    }

    as-placeholder-bar {
      margin-bottom: 12px;
    }
  `,
  tag: 'as-formula-widget-placeholder',
})
export class CategoryWidgetPlaceholder {
  public render() {
    return [
      <as-placeholder>
        <div slot='header'>
          <slot />
        </div>
        <as-placeholder-bar width='6%' height='32px'></as-placeholder-bar>
      </as-placeholder>
    ];
  }
}
