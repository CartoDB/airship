import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  tag: 'as-legend-color-category-point'
})
export class LegendColorCategoryPoint {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical';
  @Prop() public width: number;

  public render() {
    // TODO: check if all values are type: point?

    return (<as-legend-category
      data={this.data}
      orientation={this.orientation}
      width={this.width}></as-legend-category>);
  }
}