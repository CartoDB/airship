import { values } from 'd3';

/**
 * Contains the data required to draw every rectangle in the stacked bar widget.
 * 
 *  x: Horizontal origin of the rectangle in pixels.
 *  y: Vertical origin of the rectangle in %.
 *  w: With of the rectangle in pixels.
 *  h: Height of the rectangle in %.
 *  c: Fill color of the rectangle.
 *  v: Value that represents the rectangle
 */
export interface RectangleData {
  x: number;
  y: number;
  w: number;
  h: number;
  c: string;
  v: number;
}
