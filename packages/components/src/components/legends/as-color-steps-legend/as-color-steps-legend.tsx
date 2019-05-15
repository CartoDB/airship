import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-color-steps-legend.scss',
  tag: 'as-color-steps-legend',
})
export class ColorStepsLegend {
  @Prop() public data: GradientData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';

  public render() {
    if (!this.data) {
      return null;
    }

    const outerClasses = {
      'as-color-steps-legend--outer-wrapper': true,
      [`as-color-steps-legend--${this.orientation}`]: true
    };

    return <div class={outerClasses}>
      <div class='as-color-steps-legend--wrapper as-color-steps-legend--color'>
        {this.data.map(this.renderStep)}
      </div>
      <div class='as-color-steps-legend--wrapper as-color-steps-legend--labels'>
        {this.data.map(this.renderLabels)}
      </div>
    </div>;
  }

  private renderStep(data: GradientData) {
    return (
      <div class='as-color-steps-legend--step' style={{ background: data.color }}>
      </div>
    );
  }

  private renderLabels(data: GradientData) {
    return (
      <div class='as-color-steps-legend--label'>
        <span>
          {data.label}
        </span>
      </div>
    );
  }
}
