import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-bubble-legend.scss',
  tag: 'as-bubble-legend',
})
export class BubbleLegend {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public scale: number = 1;

  private maxSize: number;

  public render() {
    if (!this.data) {
      return null;
    }

    const classes = {
      'as-bubble-legend--wrapper': true,
      [`as-bubble-legend--${this.orientation}`]: true
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
      <span class='as-bubble-legend--label'>{sortedData[sortedData.length - 1].label}</span>
      <div style={size} class='as-bubble-legend--steps'>{sortedData.map((data) => this.renderStep(data))}</div>
      <span class='as-bubble-legend--label'>{sortedData[0].label}</span>
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

    return <div class='as-bubble-legend--circle' style={style}></div>;
  }
}
