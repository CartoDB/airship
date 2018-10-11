import { values } from "d3";

/**
 * Contains the data required to draw every rectangle in the stacked bar widget.
 *  - Color: String with the rectangle color.
 *  - Size: Number containing the % of the height the rectangle will fill.
 *  - Negative: Boolean flag pointing if the rectangle should be drawn under the zero-axis.
 */
export interface RectangleData {
  color: string;
  size: number;
  negative?: boolean,
  value: number,
}
