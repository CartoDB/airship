import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styles: 'as-legend-size-category-point { display: block; }',
  tag: 'as-legend-size-category-point',
})
export class LegendSizeCategory {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public width: number = null;

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    return <as-legend-size-bins-point
      data={this.data}
      orientation={this.orientation}
      width={this.width}
    >
    </as-legend-size-bins-point>;
  }
}
