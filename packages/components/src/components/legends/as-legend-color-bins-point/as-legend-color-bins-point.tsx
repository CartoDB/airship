import { Component, h, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styles: 'as-legend-color-bins-point { display: block; }',
  tag: 'as-legend-color-bins-point'
})
export class LegendColorBinsPoint {
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
