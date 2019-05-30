import { Component, Prop } from '@stencil/core';

const DEFAULT_WIDTH = 16;

@Component({
  shadow: false,
  styleUrl: './as-legend-color-category.scss',
  tag: 'as-legend-color-category',
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
      'as-legend-color-category--wrapper': true,
      'as-legend-color-category--wrapper-horizontal': this.orientation === 'horizontal'
    };

    return <div style={this.getStyle()} class={wrapper}>
      {
        this.data
          .map((e) => this.renderLegend(e))
          .filter((e) => e !== null)
          .map((e) => <div class='as-legend-color-category--entry'>{e}</div>)
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
        return <as-legend-color-category-polygon
          label={legend.label}
          color={legend.color}
          strokeColor={legend.strokeColor}
          strokeStyle={legend.strokeStyle}
          >
        </as-legend-color-category-polygon>;
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
