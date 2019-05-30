import { Component, Prop } from '@stencil/core';

const MARGIN_OFFSET = 2;

@Component({
  shadow: false,
  styleUrl: './as-legend-size-continuous-point.scss',
  tag: 'as-legend-size-continuous-point',
})
export class LegendSizeContinuousPoint {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';

  private maxSize: number;

  public render() {
    if (!this.data) {
      return null;
    }

    const classes = {
      'as-legend-size-continuous-point--steps': true,
      [`as-legend-size-continuous-point--${this.orientation}`]: true
    };

    this.maxSize = this.data.slice().sort(
      (first, second) => second.width - first.width
    )[0].width;

    return <div class={classes}>
      {this.data.map((data) => this.renderStep(data))}
    </div>;
  }

  private renderStep(data: LegendData) {
    const size = `${Math.round(data.width)}px`;
    const strokeStyle = `1px ${data.strokeStyle || 'solid'} ${data.strokeColor}`;

    const style: any = {
      backgroundColor: data.color,
      border: strokeStyle,
      height: size,
      width: size,
    };

    const wrapperStyle: any = { };

    if (this.orientation === 'horizontal') {
      wrapperStyle.height = `${this.maxSize + MARGIN_OFFSET}px`;
    } else if (this.orientation === 'vertical') {
      wrapperStyle.width = `${this.maxSize + MARGIN_OFFSET}px`;
    }

    return (
      <div class='as-legend-size-continuous-point--step'>
        <div style={wrapperStyle} class='as-legend-size-continuous-point--circle-wrapper'>
          <div class='as-legend-size-continuous-point--circle' style={style}></div>
        </div>
        <span class='as-legend-size-continuous-point--label'>{data.label}</span>
      </div>
    );
  }
}
