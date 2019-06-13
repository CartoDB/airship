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

    const classes = {
      'as-legend-size-continuous--overflow': this.data[0].type === 'line'
    };

    return <div class={classes}>{this.renderLegend(this.data)}</div>;
  }

  private renderLegend(data: LegendData[]) {
    switch (data[0].type) {
      case 'point':
        return <as-legend-size-continuous-point
          data={this.data}
          orientation={this.orientation}
          scale={this.scale}
        >
        </as-legend-size-continuous-point>;
      case 'line':
        return <as-legend-size-continuous-line
            data={this.data}
            orientation={this.orientation}
          >
        </as-legend-size-continuous-line>;
      default:
        return null;
    }
  }
}
