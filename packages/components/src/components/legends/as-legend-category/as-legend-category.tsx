import { Component, h, Prop } from '@stencil/core';

const MIN_WIDTH = 16;

@Component({
  shadow: false,
  styleUrl: './as-legend-category.scss',
  tag: 'as-legend-category',
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
      'as-legend-category--wrapper': true,
      'as-legend-category--wrapper-horizontal': this.orientation === 'horizontal'
    };

    return <div style={this.getStyle()} class={wrapper}>
      {
        this.data
          .map((e) => this.renderLegend(e))
          .filter((e) => e !== null)
          .map((e) => <div class='as-legend-category--entry'>{e}</div>)
      }
    </div>;
  }

  private renderLegend(legend: LegendData) {
    switch (legend.type) {
      case 'point':
        return <as-legend-category-point-entry
          label={legend.label}
          width={this.width || legend.width}
          color={legend.color}
          strokeColor={legend.strokeColor}
          marker={legend.marker}
          strokeStyle={legend.strokeStyle}
          >
        </as-legend-category-point-entry>;
      case 'line':
        return <as-legend-category-line-entry
          label={legend.label}
          width={legend.width}
          color={legend.color}
          strokeStyle={legend.strokeStyle}
          >
        </as-legend-category-line-entry>;
      case 'polygon':
        return <as-legend-category-polygon-entry
          label={legend.label}
          color={legend.color}
          strokeColor={legend.strokeColor}
          strokeStyle={legend.strokeStyle}
          >
        </as-legend-category-polygon-entry>;
      default:
        return null;
    }
  }

  private getStyle() {
    const maxLegendWidth = this.data.slice().sort(
      (first, second) => second.width - first.width
    )[0].width;

    return {
      '--as--basic--legend--figure-width': `${this.width || Math.max(maxLegendWidth, MIN_WIDTH)}px`
    };
  }
}
