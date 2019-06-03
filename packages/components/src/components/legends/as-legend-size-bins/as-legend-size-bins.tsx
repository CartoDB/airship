import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-size-bins.scss',
  tag: 'as-legend-size-bins',
})

export class LegendSizeBins {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    return <div class='as-legend-size-bins--wrapper'>
      <div class='as-legend-size-bins--entry'>
        {
          this.renderLegend(this.data)
        }
      </div>
    </div>;
  }

  private renderLegend(data: LegendData[]) {
    switch (data[0].type) {
      case 'point':
        return <as-legend-size-bins-point
          data={this.data}
          orientation={this.orientation}
        >
        </as-legend-size-bins-point>;
      default:
        return null;
    }
  }
}
