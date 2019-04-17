import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-basic-legend-point.scss',
  tag: 'as-basic-legend-point',
})
export class BasicLegendPoint {
  @Prop() public label: string;
  @Prop() public color: string;
  @Prop() public strokeColor: string;
  @Prop() public strokeStyle: string;
  @Prop() public marker: string;
  @Prop() public width: number = 16;

  public render() {
    const classes = {
      'as-basic-legend-point--point': !this.marker,
      'as-basic-legend-point--symbol': true
    };

    return (
      <div class='as-basic-legend-point--wrapper'>
        <div class='as-basic-legend--figure--wrapper'>
          <div class={classes} style={this.getStyle()}></div>
        </div>
        <span class='as-basic-legend-point--label'>{this.label}</span>
      </div>
    );
  }

  private getStyle() {
    return {
      backgroundColor: this.color,
      border: `1px ${this.strokeStyle || 'solid'} ${this.strokeColor}`,
      ...this.getWidth(),
      ...this.getMask()
    };
  }

  private getWidth() {
    if (!this.width) {
      return {};
    }

    return {
      height: `${this.width}px`,
      width: `${this.width}px`
    };
  }

  private getMask() {
    if (!this.marker) {
      return {};
    }

    return {
      '-webkit-mask-image': `url(${this.marker})`,
      '-webkit-mask-position': 'center',
      '-webkit-mask-repeat': 'no-repeat',
      'maskImage': `url(${this.marker})`,
      'maskPosition': 'center',
      'maskRepeat': 'no-repeat'
    };
  }
}
