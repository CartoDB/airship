import { SVGContainer } from './Container';
import { ScaleLinear } from 'd3';

interface DrawOptions {
  container: SVGContainer;
  width: number;
  height: number;
  padding: [number, number];
  xScale: ScaleLinear<number, number>,
  binsScale: ScaleLinear<number, number>
}
