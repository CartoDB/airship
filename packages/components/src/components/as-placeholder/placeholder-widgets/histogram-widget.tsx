import { Component, h } from '@stencil/core';

@Component({
  shadow: false,
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
