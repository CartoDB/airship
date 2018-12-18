import { ScaleLinear } from 'd3';
import { SVGContainer } from './Container';

export interface RenderOptions {
  container: SVGContainer;
  width: number;
  handleWidth: number;
  height: number;
  padding: [number, number];
  xScale: ScaleLinear<number, number>;
  binsScale: ScaleLinear<number, number>;
}
