import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-size-line.scss',
  tag: 'as-legend-size-line',
})
export class LegendSizeLine {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';

  public render() {
    if (!this.data) {
      return null;
    }

    const outerClasses = {
      'as-legend-size-line--outer-wrapper': true,
      [`as-legend-size-line--${this.orientation}`]: true
    };

    return <div class={outerClasses}>
      <div class='as-legend-size-line--wrapper as-legend-size-line--color'>
        {this.data.map((d) => this.renderStep(d))}
      </div>
      <div class='as-legend-size-line--wrapper as-legend-size-line--labels'>
        {this.data.map(this.renderLabels)}
      </div>
    </div>;
  }

  private renderStep(data: LegendData) {
    const prop = this.orientation === 'vertical' ? 'width' : 'height';

    const style = {
      background: data.color,
      [prop]: `${data.width}px`
    };

    return (
      <div class='as-legend-size-line--step' style={style}>
      </div>
    );
  }

  private renderLabels(data: LegendData) {
    return (
      <div class='as-legend-size-line--label'>
        <span>
          {data.label}
        </span>
      </div>
    );
  }
}
