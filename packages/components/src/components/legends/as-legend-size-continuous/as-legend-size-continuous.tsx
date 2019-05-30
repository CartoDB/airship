import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-size-bins.scss',
  tag: 'as-legend-size-bins',
})

export class LegendSizeContinuous {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    const wrapper = {
      'as-legend-size-bins--wrapper': true,
      'as-legend-size-bins--wrapper-horizontal': this.orientation === 'horizontal'
    };

    return <div class={wrapper}>
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
          orientation={this.orientation}
        >
        </as-legend-size-bins-point>;
      default:
        return null;
    }
  }
}
