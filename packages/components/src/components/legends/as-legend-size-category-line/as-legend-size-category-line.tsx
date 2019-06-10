import { Component, Prop } from '@stencil/core';

const MIN_WIDTH = 36;
const FACTOR = 3;

@Component({
  shadow: false,
  styleUrl: './as-legend-size-category-line.scss',
  tag: 'as-legend-size-category-line',
})
export class LegendSizeBinsPoint {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public aligned: boolean = false;

  private maxSize: number;

  public render() {
    if (!this.data) {
      return null;
    }

    const classes = {
      'as-legend-size-category-line--steps': true,
      [`as-legend-size-category-line--${this.orientation}`]: true
    };

    this.maxSize = this.data.slice().sort(
      (first, second) => second.width - first.width
    )[0].width;

    return <div class={classes}>
      {this.data.map((data) => this.renderStep(data))}
    </div>;
  }

  private renderStep(data: LegendData) {
    const strokeStyle = {
      borderTopColor: `${data.strokeColor}`,
      borderTopStyle: `${data.strokeStyle || 'solid'}`,
      borderTopWidth: `${data.width}px`
    };

    const lineWidth = Math.max(MIN_WIDTH, this.maxSize * FACTOR);

    const style: any = {
      height: `${data.width}px`,
      width: `${lineWidth}px`,
      ...strokeStyle
    };

    const wrapperStyle: any = { };

    if (this.orientation === 'horizontal') {
      wrapperStyle.height = `${lineWidth}px`;

      if (this.aligned) {
        style.marginBottom = `${(this.maxSize - data.width) / 2}px`;
      }
    } else if (this.orientation === 'vertical') {
      wrapperStyle.width = `${lineWidth}px`;
    }

    return (
      <div class='as-legend-size-category-line--step'>
        <div style={wrapperStyle} class='as-legend-size-category-line--line-wrapper'>
          <div class='as-legend-size-category-line--line' style={style}></div>
        </div>
        <span class='as-legend-size-category-line--label'>{data.label}</span>
      </div>
    );
  }
}
