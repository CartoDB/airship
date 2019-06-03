import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-size-continuous-point.scss',
  tag: 'as-legend-size-continuous-point',
})
export class LegendSizeContinuousPoint {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public scale: number = 1;

  private maxSize: number;

  public render() {
    if (!this.data) {
      return null;
    }

    const classes = {
      'as-legend-size-continuous-point--wrapper': true,
      [`as-legend-size-continuous-point--${this.orientation}`]: true
    };

    const sortedData = this.data.slice().sort(
      (first, second) => second.width - first.width
    );

    this.maxSize = sortedData[0].width * this.scale;

    const size = {
      height: `${this.maxSize}px`,
      width: `${this.maxSize}px`
    };

    return <div class={classes}>
      <span class='as-legend-size-continuous-point--label'>{sortedData[sortedData.length - 1].label}</span>
      <div style={size} class='as-legend-size-continuous-point--steps'>
        {sortedData.map((data) => this.renderStep(data))}
      </div>
      <span class='as-legend-size-continuous-point--label'>{sortedData[0].label}</span>
    </div>;
  }

  private renderStep(data: LegendData) {
    const size = `${Math.round(data.width * this.scale)}px`;
    const strokeStyle = `1px ${data.strokeStyle || 'solid'} ${data.strokeColor}`;

    const style: any = {
      backgroundColor: data.color,
      border: strokeStyle,
      height: size,
      width: size,
    };

    return <div class='as-legend-size-continuous-point--circle' style={style}></div>;
  }
}
