import { Component, h, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-size-bins.scss',
  tag: 'as-legend-size-bins',
})
export class LegendSizeBins {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public width: number = null;

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    return this.renderLegend(this.data);
  }

  private renderLegend(data: LegendData[]) {
    switch (data[0].type) {
      case 'point':
        return <as-legend-size-bins-point
          data={this.data}
          orientation={this.orientation}
          width={this.width}
        >
        </as-legend-size-bins-point>;
      case 'line':
        return <as-legend-size-bins-line
            data={this.data}
            orientation={this.orientation}
            width={this.width}
          >
        </as-legend-size-bins-line>;
      default:
        return null;
    }
  }
}
