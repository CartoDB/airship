import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-color-bins-polygon.scss',
  tag: 'as-legend-color-bins-polygon',
})
export class LegendColorBinsPolygon {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';

  public render() {
    if (!this.data) {
      return null;
    }

    const outerClasses = {
      'as-legend-color-bins-polygon--outer-wrapper': true,
      [`as-legend-color-bins-polygon--${this.orientation}`]: true
    };

    return <div class={outerClasses}>
      <div class='as-legend-color-bins-polygon--wrapper as-legend-color-bins-polygon--color'>
        {this.data.map(this.renderStep)}
      </div>
      <div class='as-legend-color-bins-polygon--wrapper as-legend-color-bins-polygon--labels'>
        {this.data.map(this.renderLabels)}
      </div>
    </div>;
  }

  private renderStep(data: LegendData) {
    return (
      <div class='as-legend-color-bins-polygon--step' style={{ background: data.color }}>
      </div>
    );
  }

  private renderLabels(data: LegendData) {
    return (
      <div class='as-legend-color-bins-polygon--label'>
        <span>
          {data.label}
        </span>
      </div>
    );
  }
}
