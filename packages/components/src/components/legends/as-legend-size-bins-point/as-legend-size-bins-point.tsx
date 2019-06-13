import { Component, Prop } from '@stencil/core';
import { borderStyleCounts } from '../../../utils/border-style-counts';

// This component ignores the strokeWidth property, and always paints
// a 1px border.
const FAKE_BORDER_SIZE = 1;

@Component({
  shadow: false,
  styleUrl: './as-legend-size-bins-point.scss',
  tag: 'as-legend-size-bins-point',
})
export class LegendSizeBinsPoint {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public width: number = null;

  private maxSize: number;

  public render() {
    if (!this.data) {
      return null;
    }

    const classes = {
      'as-legend-size-bins-point--steps': true,
      [`as-legend-size-bins-point--${this.orientation}`]: true
    };

    this.maxSize = this.width || this.data.slice().sort(
      (first, second) => second.width - first.width
    )[0].width;

    return <div class={classes}>
      {this.data.map((data) => this.renderStep(data))}
    </div>;
  }

  private renderStep(data: LegendData) {
    const strokeStyle = `${FAKE_BORDER_SIZE}px ${data.strokeStyle || 'solid'} ${data.strokeColor}`;

    // Elements are box-sizing: border-box, so we have to compensate
    const sizeOffset = borderStyleCounts(data.strokeStyle)
      ? FAKE_BORDER_SIZE * 2
      : 0;

    const size = `${Math.round(data.width) + sizeOffset}px`;

    const mask = this.getMask(data);

    const style: any = {
      backgroundColor: data.color,
      border: strokeStyle,
      height: size,
      width: size,
      ...mask
    };

    const wrapperStyle: any = { };

    if (this.orientation === 'horizontal') {
      wrapperStyle.height = `${this.maxSize}px`;
    } else if (this.orientation === 'vertical') {
      wrapperStyle.width = `${this.maxSize}px`;
    }

    return (
      <div class='as-legend-size-bins-point--step'>
        <div style={wrapperStyle} class='as-legend-size-bins-point--circle-wrapper'>
          <div class='as-legend-size-bins-point--circle' style={style}></div>
        </div>
        <span class='as-legend-size-bins-point--label'>{data.label}</span>
      </div>
    );
  }

  private getMask(data) {
    if (!data.marker) {
      return {};
    }

    return {
      '-webkit-mask-image': `url(${data.marker})`,
      '-webkit-mask-position': 'center',
      '-webkit-mask-repeat': 'no-repeat',
      '-webkit-mask-size': `${data.width}px`,
      'maskImage': `url(${data.marker})`,
      'maskPosition': 'center',
      'maskRepeat': 'no-repeat',
      'maskSize': `${data.width}px`
    };
  }
}
