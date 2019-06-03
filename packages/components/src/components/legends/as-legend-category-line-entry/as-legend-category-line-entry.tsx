import { Component, Prop, State, Watch } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-legend-category-line-entry.scss',
  tag: 'as-legend-category-line-entry',
})
export class LegendCategoryLineEntry {
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
      <div class='as-legend-category-line-entry--wrapper'>
        <div class='as-legend-category--figure--wrapper'>
          <div class='as-legend-category-line-entry--line' style={this.getStyle()}></div>
        </div>
        <span class='as-legend-category--label'>{this.label}</span>
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
