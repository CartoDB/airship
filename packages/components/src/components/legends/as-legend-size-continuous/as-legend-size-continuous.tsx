import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-size-continuous.scss',
  tag: 'as-legend-size-continuous',
})

export class LegendSizeContinuous {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public scale: number = 1;

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    return <div class='as-legend-size-continuous--wrapper'>
      {
        this.data
          .map((e) => this.renderLegend(e))
          .filter((e) => e !== null)
          .map((e) => <div class='as-legend-size-continuous--entry'>{e}</div>)
      }
    </div>;
  }

  private renderLegend(legend: LegendData) {
    switch (legend.type) {
      case 'point':
        return <as-legend-size-continuous-point
          data={this.data}
          scale={this.scale}
          orientation={this.orientation}
        >
        </as-legend-size-continuous-point>;
      default:
        return null;
    }
  }
}
