import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styles: 'as-legend-color-category-polygon { display: block; }',
  tag: 'as-legend-color-category-polygon'
})
export class LegendColorCategoryPolygon {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical';
  @Prop() public width: number;

  public render() {
    // TODO: check if all values are type: polygon?

    return (<as-legend-category
      data={this.data}
      orientation={this.orientation}
      width={this.width}></as-legend-category>);
  }
}
