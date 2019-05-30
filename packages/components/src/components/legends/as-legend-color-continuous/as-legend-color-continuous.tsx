import { Component, Prop } from '@stencil/core';

const DEFAULT_WIDTH = 16;

@Component({
  shadow: false,
  styleUrl: './as-legend-color-continuous.scss',
  tag: 'as-legend-color-continuous',
})
export class LegendColorCategory {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical';
  @Prop() public width: number;

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    const wrapper = {
      'as-legend-color-continuous--wrapper': true,
      'as-legend-color-continuous--wrapper-horizontal': this.orientation === 'horizontal'
    };

    return <div style={this.getStyle()} class={wrapper}>
      {
        this.data
          .map((e) => this.renderLegend(e))
          .filter((e) => e !== null)
          .map((e) => <div class='as-legend-color-continuous--entry'>{e}</div>)
      }
    </div>;
  }

  private renderLegend(legend: LegendData) {
    switch (legend.type) {
      case 'point':
        return <as-legend-color-continuous-point
          label={legend.label}
          width={this.width || legend.width}
          color={legend.color}
          strokeColor={legend.strokeColor}
          marker={legend.marker}
          strokeStyle={legend.strokeStyle}
        >
        </as-legend-color-continuous-point>;
      case 'line':
        return <as-legend-color-continuous-line
          label={legend.label}
          width={legend.width}
          color={legend.color}
          strokeStyle={legend.strokeStyle}
          >
        </as-legend-color-continuous-line>;
      case 'polygon':
        return <as-legend-color-continuous-polygon
          data={this.data}
          orientation={this.orientation}
        >
        </as-legend-color-continuous-polygon>;
      default:
        return null;
    }
  }

  private getStyle() {
    let maxLegendWidth = this.data.slice().sort(
      (first, second) => second.width - first.width
    )[0].width;

    if (maxLegendWidth < DEFAULT_WIDTH) {
      maxLegendWidth = DEFAULT_WIDTH;
    }

    return {
      '--as--basic--legend--figure-width': `${this.width || maxLegendWidth}px`
    };
  }
}
