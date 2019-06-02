import { Component, Prop } from '@stencil/core';

const DEFAULT_WIDTH = 16;

@Component({
  shadow: false,
  styleUrl: './as-legend-color-bins.scss',
  tag: 'as-legend-color-bins',
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
      'as-legend-color-bins--wrapper': true,
      'as-legend-color-bins--wrapper-horizontal': this.orientation === 'horizontal'
    };

    if (this.data[0].type === 'polygon') {
      return <div style={this.getStyle()} class={wrapper}>
        <div class='as-legend-color-bins--entry'>
          <as-legend-color-bins-polygon
            data={this.data}
            orientation={this.orientation}
          >
        </as-legend-color-bins-polygon>
        </div>
      </div>;
    }

    return <div style={this.getStyle()} class={wrapper}>
      {
        this.data
          .map((e) => this.renderLegend(e))
          .filter((e) => e !== null)
          .map((e) => <div class='as-legend-color-bins--entry'>{e}</div>)
      }
    </div>;
  }

  private renderLegend(legend: LegendData) {
    switch (legend.type) {
      case 'point':
        return <as-legend-color-bins-point
          label={legend.label}
          width={this.width || legend.width}
          color={legend.color}
          strokeColor={legend.strokeColor}
          marker={legend.marker}
          strokeStyle={legend.strokeStyle}
        >
        </as-legend-color-bins-point>;
      case 'line':
        return <as-legend-color-bins-line
          label={legend.label}
          width={legend.width}
          color={legend.color}
          strokeStyle={legend.strokeStyle}
          >
        </as-legend-color-bins-line>;
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
