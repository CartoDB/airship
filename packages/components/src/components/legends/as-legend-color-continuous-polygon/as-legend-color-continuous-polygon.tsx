import { Component, h, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-color-continuous-polygon.scss',
  tag: 'as-legend-color-continuous-polygon',
})
export class LegendColorContinuousPolygon {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';

  public render() {
    if (!this.data) {
      return null;
    }

    const outerClasses = {
      'as-legend-color-continuous-polygon--outer-wrapper': true,
      [`as-legend-color-continuous-polygon--${this.orientation}`]: true
    };

    return <div class={outerClasses}>
      <div class='as-legend-color-continuous-polygon--wrapper as-legend-color-continuous-polygon--color'>
        {this.data.map((data, index, arr) => this.renderGradientStep(data, index, arr))}
      </div>
      <div class='as-legend-color-continuous-polygon--wrapper as-legend-color-continuous-polygon--labels'>
        {this.data.map((data, index, arr) => this.renderLabel(data, index, arr))}
      </div>
    </div>;
  }

  private renderGradientStep(data: LegendData, index: number, arr: LegendData[]) {
    if (index === arr.length - 1) {
      return null;
    }

    const start = data.color;
    const end = arr[index + 1].color;
    const direction = this.orientation === 'vertical' ? '.5turn' : '.25turn';

    const style = {
      backgroundImage: `linear-gradient(${direction}, ${start}, ${end})`
    };

    return (
      <div class='as-legend-color-continuous-polygon--step' style={style}>
      </div>
    );
  }

  private renderLabel(data: LegendData, index: number, arr: LegendData[]) {
    if (this.orientation === 'vertical' && index === 0) {
      return null;
    }

    if (this.orientation === 'horizontal' && index === arr.length - 1) {
      return null;
    }

    return (
      <div class='as-legend-color-continuous-polygon--label'>
        <span>
          {data.label}
        </span>
      </div>
    );
  }
}
