import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styles: 'as-legend-size-category { display: block; }',
  tag: 'as-legend-size-category',
})
export class LegendSizeCategory {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public width: number = null;

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    switch (this.data[0].type) {
      case 'point':
        return <as-legend-size-bins-point
          data={this.data}
          orientation={this.orientation}
          width={this.width}
        >
        </as-legend-size-bins-point>;
      case 'line':
        return <as-legend-size-category-line
            data={this.data}
            orientation={this.orientation}
          >
        </as-legend-size-category-line>;
      default:
        return null;
    }
  }
}
