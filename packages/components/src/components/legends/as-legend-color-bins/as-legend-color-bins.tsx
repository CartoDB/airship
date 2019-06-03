import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-color-bins.scss',
  tag: 'as-legend-color-bins',
})
export class LegendColorBins {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical';
  @Prop() public width: number;

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    if (this.data[0].type === 'polygon') {
      return (<as-legend-color-bins-polygon
          data={this.data}
          orientation={this.orientation}
        >
      </as-legend-color-bins-polygon>);
    } else {
      return (<as-legend-category
          data={this.data}
          orientation={this.orientation}
          width={this.width}>
        </as-legend-category>);
    }
  }
}
