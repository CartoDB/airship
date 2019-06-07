import { Component, Prop } from '@stencil/core';

const X_POS = 40;
const TEXT_MARGIN = 4;

@Component({
  shadow: false,
  styleUrl: 'as-legend-size-continuous-line.scss',
  tag: 'as-legend-size-continuous-line'
})
export class LegendSizeContinuousLine {
  @Prop() public data: LegendData[];
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public size: number = 100;
  @Prop() public leadingLineStrokeWidth: number = 0.5;
  // 1/4 of the line height of the font, which is 12 with the original as-caption
  @Prop() public textVerticalOffset: number = 3;

  @Prop() public xMarginFactor: number = 0.1;
  @Prop() public yMarginFactor: number = 0.1;

  public render() {
    const sortedData = this.data.slice().sort(
      (first, second) => second.width - first.width
    );

    const max = sortedData[0].width;
    const half = max / 2;

    // Path is painted counterclockwise starting from bottom left point
    const realPath = [];
    const lines = [];

    sortedData.forEach((d, i) => {
      const factor = half * (d.width / max);
      const yRatio = i / (sortedData.length - 1);

      const top = [half + factor, this.size - (this.size * yRatio)];
      const bottom = [half - factor, this.size - (this.size * yRatio)];

      if (this.orientation === 'horizontal') {
        top.reverse();
        bottom.reverse();
      }

      // Insert always at current index + 1 (to account for `M0 ${this.size}`)
      realPath.splice(i, 0, `L${top.join(' ')}`);

      if (d.label) {
        const yOffset = this.getOffset(i, sortedData.length - 1);

        const x = half + factor;
        const y = this.size - (this.size * yRatio) + yOffset;

        const first = [x, y];
        const second = [X_POS, y];

        if (this.orientation === 'horizontal') {
          first.reverse();
          second.reverse();
        }

        lines.push({
          label: d.label,
          x1: first[0],
          x2: second[0],
          y1: first[1],
          y2: second[1]
        });
      }

      // Insert just before the last element
      realPath.splice(realPath.length - i, 0, `L${bottom.join(' ')}`);
    });

    if (this.orientation === 'horizontal') {
      realPath.splice(0, 0, `M${this.size} 0`);
    } else {
      realPath.splice(0, 0, `M0 ${this.size}`);
    }

    const classes = {
      [`as-legend-size-continuous-line--${this.orientation}`]: true
    };

    return <svg class={classes} style={this.getSVGStyle()} viewBox={this.getSVGViewBox()}>
      <g>
        <path style={this.getPathStyle()} d={realPath.join(' ') + ' Z'} ></path>
        <g>
          {
            lines.map(({ x1, x2, y1, y2 }) => {
              return [
                <line
                  stroke-width={this.leadingLineStrokeWidth}
                  x1={x1} y1={y1}
                  x2={x2} y2={y2}>
                </line>
              ];
            }
            )
          }
        </g>
        <g>
          {
            lines.map(({ label, x2, y2 }) => {
              const offset = {
                x: TEXT_MARGIN,
                y: this.textVerticalOffset
              };

              if (this.orientation === 'horizontal') {
                offset.x = 0;
                offset.y = this.textVerticalOffset * 4;
              }

              return [
                <text x={x2 + offset.x} y={y2 + offset.y}>{label}</text>
              ];
            })
          }
        </g>
      </g>
    </svg>;
  }

  private getPathStyle() {
    return {
      fill: `${this.data[0].color}`
    };
  }

  private getSVGStyle() {
    return {
      height: `${this.size * (1 + this.yMarginFactor)}px`,
      width: `${this.size * (1 + this.xMarginFactor)}px`
    };
  }

  private getSVGViewBox() {
    const marginX = this.size * (-this.xMarginFactor / 2);
    const marginY = this.size * (-this.yMarginFactor / 2);

    return `${marginX} ${marginY} ${this.size * (1 + this.xMarginFactor)} ${this.size * (1 + this.yMarginFactor)}`;
  }

  private getOffset(index, length) {
    let offset = 0;

    if (index === length) {
      offset += this.leadingLineStrokeWidth;
    }

    if (index === 0) {
      offset -= this.leadingLineStrokeWidth;
    }

    return offset;
  }
}
