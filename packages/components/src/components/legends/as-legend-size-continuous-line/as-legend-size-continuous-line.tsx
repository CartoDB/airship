import { Component, h, Prop, State } from '@stencil/core';

const TEXT_MARGIN = 4;
const MIN_LINE_SIZE = 4;

@Component({
  shadow: false,
  styleUrl: 'as-legend-size-continuous-line.scss',
  tag: 'as-legend-size-continuous-line'
})
export class LegendSizeContinuousLine {
  @Prop() public data: LegendData[] = null;
  @Prop() public orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop() public size: number = 300;
  @Prop() public leadingLineStrokeWidth: number = 0.5;
  // Line height of the font, which is 12 with the original as-caption
  @Prop() public textLineHeight: number = 12;

  @Prop() public xMarginFactor: number = 0.1;
  @Prop() public yMarginFactor: number = 0.1;

  @Prop() public width: number = null;

  @State() private rSize = 0;


  public componentWillUpdate() {
    this.parseSize();
  }

  public componentWillLoad() {
    this.parseSize();
  }

  public render() {
    if (!this.data || this.data.length === 0) {
      return;
    }

    const sortedData = this.getSortedData();

    const MAX = sortedData[0].width;
    const HALF = MAX / 2;

    const X_POS = Math.max(MAX + MIN_LINE_SIZE, this.width);

    const X_OFFSET = this.orientation === 'horizontal' || this.width === null
      ? 0
      : (this.width - MAX) / 2;

    // Path is painted counterclockwise starting from bottom left point
    const realPath = [];
    const lines = [];

    sortedData.forEach((d, i) => {
      const FACTOR = HALF * (d.width / MAX);
      const Y_RATIO = i / (sortedData.length - 1);

      const TOP_X = HALF + FACTOR;
      const BOTTOM_X = HALF - FACTOR;
      const BOTTOM_Y = this.size - (this.size * Y_RATIO);
      const TOP_Y = BOTTOM_Y;

      const TOP = this.orientation === 'vertical'
        ? [TOP_X + X_OFFSET, TOP_Y]
        : [TOP_Y + X_OFFSET, TOP_X];

      const BOTTOM = this.orientation === 'vertical'
        ? [BOTTOM_X + X_OFFSET, BOTTOM_Y]
        : [TOP_Y + X_OFFSET, BOTTOM_X];

      // Insert always at current index
      realPath.splice(i, 0, `L${TOP.join(' ')}`);
      // Insert just before the last element
      realPath.splice(realPath.length - i, 0, `L${BOTTOM.join(' ')}`);

      if (d.label) {
        const Y_OFFSET = this.getOffset(i, sortedData.length - 1);

        const X = HALF + FACTOR;
        const Y = this.size - (this.size * Y_RATIO) + Y_OFFSET;

        const first = [X, Y];
        const second = [X_POS, Y];

        if (this.orientation === 'horizontal') {
          first.reverse();
          second.reverse();
        }

        first[0] += X_OFFSET;
        second[0] += X_OFFSET;

        lines.push({
          label: d.label,
          x1: first[0],
          x2: second[0],
          y1: first[1],
          y2: second[1]
        });
      }
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
              let xOff = -X_OFFSET;

              if (this.orientation === 'horizontal') {
                xOff = 0;
              }

              return (
                <line
                  stroke-width={this.leadingLineStrokeWidth}
                  x1={x1} y1={y1}
                  x2={x2 + xOff} y2={y2}>
                </line>
              );
            }
            )
          }
        </g>
        <g>
          {
            lines.map(({ label, x2, y2 }) => {
              const offset = {
                x: TEXT_MARGIN - X_OFFSET,
                y: this.textLineHeight / 4
              };

              if (this.orientation === 'horizontal') {
                offset.x = 0;
                offset.y = this.textLineHeight;
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

  private parseSize() {
    if (!this.data || this.data.length === 0) {
      return;
    }

    const sortedData = this.getSortedData();

    const max = sortedData[0].width;

    this.rSize = Math.max(max + MIN_LINE_SIZE + (this.textLineHeight), 0);
  }

  private getSortedData() {
    if (this.data === null) {
      return this.data;
    }

    return this.data.slice().sort(
      (first, second) => second.width - first.width
    );
  }

  private getPathStyle() {
    return {
      fill: `${this.data[0].color}`
    };
  }

  private getSVGStyle() {
    const height = (this.orientation === 'horizontal' ? this.rSize : this.size);

    return {
      height: `${height * (1 + this.yMarginFactor)}px`,
      width: `${this.size * (1 + this.xMarginFactor)}px`
    };
  }

  private getSVGViewBox() {
    const height = (this.orientation === 'horizontal' ? this.rSize : this.size);

    let marginX = this.size * (-this.xMarginFactor / 2);
    const marginY = height * (-this.yMarginFactor / 2);

    if (this.orientation === 'vertical') {
      marginX = 0;
    }

    return `${marginX} ${marginY} ${this.size * (1 + this.xMarginFactor)} ${height * (1 + this.yMarginFactor)}`;
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
