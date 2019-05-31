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
      {
        this.data
          .map((e) => this.renderLegend(e))
          .filter((e) => e !== null)
          .map((e) => <div class='as-legend-size-bins--entry'>{e}</div>)
      }
    </div>;
  }

  private renderLegend(legend: LegendData) {
    switch (legend.type) {
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
