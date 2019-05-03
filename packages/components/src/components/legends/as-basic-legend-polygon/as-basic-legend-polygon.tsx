import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-basic-legend-polygon.scss',
  tag: 'as-basic-legend-polygon',
})
export class BasicLegendPolygon {
  @Prop() private label: string;
  @Prop() private color: string;
  @Prop() private strokeColor: string;
  @Prop() private strokeStyle: string;

  public render() {
    return (
      <div class='as-basic-legend-polygon--wrapper'>
        <div class='as-basic-legend--figure--wrapper'>
          <div class='as-basic-legend-polygon--box' style={this.getStyle()}></div>
        </div>
        <span class='as-basic-legend--label'>{this.label}</span>
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
