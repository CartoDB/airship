import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-color-category-polygon.scss',
  tag: 'as-legend-color-category-polygon',
})
export class LegendColorCategoryPolygon {
  @Prop() private label: string;
  @Prop() private color: string;
  @Prop() private strokeColor: string;
  @Prop() private strokeStyle: string;

  public render() {
    return (
      <div class='as-legend-color-category-polygon--wrapper'>
        <div class='as-legend-color-category--figure--wrapper'>
          <div class='as-legend-color-category-polygon--box' style={this.getStyle()}></div>
        </div>
        <span class='as-legend-color-category--label'>{this.label}</span>
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
