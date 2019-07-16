import { Component, Element, Prop, Watch, Method, State } from '@stencil/core';
import { format as d3Format } from 'd3-format';
import { select } from 'd3-selection';
import { interpolateNumber } from 'd3-interpolate';
import { SVGContainer } from './types/Container';
import { DonutData } from './interfaces';
import drawService from './utils/draw.service';

const TRANSITION_DURATION = 500;
const STATUS_COLORS = [
  '#80b622',
  '#fdb32b',
  '#f3522b'
];

/**
 * Gauge Widget
 *
 * @export
 * @class GaugeWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-gauge-widget.scss',
  tag: 'as-gauge-widget',
})
export class GaugeWidget {

  /**
   * Donut arc size
   */
  @Prop() public arcSize: number = 16;

  /**
   * Donut chart padding
   */
  @Prop() public padding: number = 20;

  /**
   * Donut label title
   */
  @Prop() public labelTitle: string;

  /**
   * Donut label units
   */
  @Prop() public labelUnits: string;

  @Element() private el: HTMLStencilElement;

  /**
   * Reference to the svg element where the plot will be rendered
   */
  private container: SVGContainer;
}