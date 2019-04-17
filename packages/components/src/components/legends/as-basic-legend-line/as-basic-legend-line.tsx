import { Component, Prop, State, Watch } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-basic-legend-line.scss',
  tag: 'as-basic-legend-line',
})
export class BasicLegendLine {
  @Prop() public label: string;
  @Prop() public color: string;
  @Prop() public strokeStyle: string = 'solid';
  @Prop() public width: number = 1.5;

  @State() private _width: number;

  public componentWillLoad() {
    this._widthChanged(this.width);
  }

  public render() {
    return (
      <div class='as-basic-legend-line--wrapper'>
        <div class='as-basic-legend--figure--wrapper'>
          <div class='as-basic-legend-line--line' style={this.getStyle()}></div>
        </div>
        <span class='as-basic-legend-line--label'>{this.label}</span>
      </div>
    );
  }

  @Watch('width')
  public _widthChanged(newValue: number) {
    this._width = Math.min(16, newValue);
  }

  private getStyle() {
    return {
      borderTopColor: this.color,
      borderTopStyle: this.strokeStyle,
      borderTopWidth: `${this._width}`
    };
  }
}
