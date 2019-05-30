import { Component, Prop } from '@stencil/core';

const DEFAULT_WIDTH = 16;

@Component({
  shadow: false,
  styleUrl: './as-basic-legend.scss',
  tag: 'as-basic-legend',
})
export class BasicLegend {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical';
  @Prop() public width: number;

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    const wrapper = {
      'as-basic-legend--wrapper': true,
      'as-basic-legend--wrapper-horizontal': this.orientation === 'horizontal'
    };

    return <div style={this.getStyle()} class={wrapper}>
      {
        this.data
          .map((e) => this.renderLegend(e))
          .filter((e) => e !== null)
          .map((e) => <div class='as-basic-legend--entry'>{e}</div>)
      }
    </div>;
  }

  private renderLegend(legend: LegendData) {
    switch (legend.type) {
      case 'point':
        return <as-legend-color-category-point
          label={legend.label}
          width={this.width || legend.width}
          color={legend.color}
          strokeColor={legend.strokeColor}
          marker={legend.marker}
          strokeStyle={legend.strokeStyle}
          >
        </as-legend-color-category-point>;
      case 'line':
        return <as-legend-color-category-line
          label={legend.label}
          width={legend.width}
          color={legend.color}
          strokeStyle={legend.strokeStyle}
          >
        </as-legend-color-category-line>;
      case 'polygon':
        return <as-basic-legend-polygon
          label={legend.label}
          color={legend.color}
          strokeColor={legend.strokeColor}
          strokeStyle={legend.strokeStyle}
          >
        </as-basic-legend-polygon>;
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
