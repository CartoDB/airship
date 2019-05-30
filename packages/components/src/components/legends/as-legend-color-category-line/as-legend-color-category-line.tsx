import { Component, Prop, State, Watch } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-color-category-line.scss',
  tag: 'as-legend-color-category-line',
})
export class LegendColorCategoryLine {
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
      <div class='as-legend-color-category-line--wrapper'>
        <div class='as-basic-legend--figure--wrapper'>
          <div class='as-legend-color-category-line--line' style={this.getStyle()}></div>
        </div>
        <span class='as-basic-legend--label'>{this.label}</span>
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
