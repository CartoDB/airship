import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-category-polygon-entry.scss',
  tag: 'as-legend-category-polygon-entry',
})
export class LegendColorCategoryPolygonEntry {
  @Prop() public label: string;
  @Prop() public color: string;
  @Prop() public strokeColor: string;
  @Prop() public strokeStyle: string;

  public render() {
    return (
      <div class='as-legend-category-polygon-entry--wrapper'>
        <div class='as-legend-category--figure--wrapper'>
          <div class='as-legend-category-polygon-entry--box' style={this.getStyle()}></div>
        </div>
        <span class='as-legend-category--label'>{this.label}</span>
      </div>
    );
  }

  private getStyle() {
    return {
      backgroundColor: this.color,
      border: `1px ${this.strokeStyle || 'solid'} ${this.strokeColor}`
    };
  }
}
