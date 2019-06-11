import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styles: 'as-legend-color-continuous { display: block; }',
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

    if (this.data[0].type === 'polygon') {
      return (<as-legend-color-continuous-polygon
          data={this.data}
          orientation={this.orientation}
        >
      </as-legend-color-continuous-polygon>);
    } else {
      return (<as-legend-category
          data={this.data}
          orientation={this.orientation}
          width={this.width}>
        </as-legend-category>);
    }
  }
}
