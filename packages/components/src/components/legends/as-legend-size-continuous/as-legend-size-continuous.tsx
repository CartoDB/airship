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
      <div class='as-legend-size-continuous--entry'>
        {
          this.renderLegend(this.data)
        }
      </div>
    </div>;
  }

  private renderLegend(data: LegendData[]) {
    switch (data[0].type) {
      case 'point':
        return <as-legend-size-continuous-point
          data={this.data}
          orientation={this.orientation}
        >
        </as-legend-size-continuous-point>;
      case 'line':
        return <as-legend-size-line
            data={this.data}
            orientation={this.orientation}
          >
        </as-legend-size-line>;
      default:
        return null;
    }
  }
}
