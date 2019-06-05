import { Component, Prop } from '@stencil/core';
import { borderStyleCounts } from '../../../utils/border-style-counts';

// This component ignores the strokeWidth property, and always paints
// a 1px border.
const FAKE_BORDER_SIZE = 1;

const DEFAULT_WIDTH = 16;
// Required for background masks to work properly
const SYMBOL_OFFSET = 2;

@Component({
  shadow: false,
  styleUrl: './as-legend-category-point-entry.scss',
  tag: 'as-legend-category-point-entry',
})
export class LegendCategoryPointEntry {
  @Prop() public label: string;
  @Prop() public color: string;
  @Prop() public strokeColor: string;
  @Prop() public strokeStyle: string;
  @Prop() public marker: string;
  @Prop() public width: number = DEFAULT_WIDTH;

  public render() {
    const classes = {
      'as-legend-category-point-entry--point': !this.marker,
      'as-legend-category-point-entry--symbol': true
    };

    return (
      <div class='as-legend-category-point-entry--wrapper'>
        <div class='as-legend-category--figure--wrapper'>
          <div class={classes} style={this.getStyle()}></div>
        </div>
        <span class='as-legend-category--label'>{this.label}</span>
      </div>
    );
  }

  private getStyle() {
    return {
      backgroundColor: this.color,
      border: `${FAKE_BORDER_SIZE}px ${this.strokeStyle || 'solid'} ${this.strokeColor}`,
      ...this.getWidth(),
      ...this.getMask()
    };
  }

  private getWidth() {
    if (!this.width) {
      return {};
    }

    let sizeOffset = borderStyleCounts(this.strokeStyle)
      ? FAKE_BORDER_SIZE * 2
      : 0;

    if (this.marker) {
      sizeOffset += SYMBOL_OFFSET;
    }

    return {
      height: `${this.width + sizeOffset}px`,
      width: `${this.width + sizeOffset}px`
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
      '-webkit-mask-size': `${this.width}px`,
      'maskImage': `url(${this.marker})`,
      'maskPosition': 'center',
      'maskRepeat': 'no-repeat',
      'maskSize': `${this.width}px`
    };
  }
}
