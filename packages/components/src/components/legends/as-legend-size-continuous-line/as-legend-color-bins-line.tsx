import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  tag: 'as-legend-size-continuous-line'
})
export class LegendSizeContinuousLine {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical';
  @Prop() public width: number;

  public render() {
    // TODO: check if all values are type: line?

    return <as-legend-size-line
      data={this.data}
      orientation={this.orientation}
      >
    </as-legend-size-line>;
  }
}
