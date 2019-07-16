import { Component, Element, Prop, Watch, Method, State } from '@stencil/core';
import { format as d3Format } from 'd3-format';
import { select } from 'd3-selection';
import { interpolateNumber } from 'd3-interpolate';
import { SVGContainer } from './types/Container';
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
   * Gauge data to be displayed
   */
  @Prop() public value: number = 0;

  @Prop() public min: number;
  @Prop() public max: number;
  
  @Prop() public threshold: [];

  /**
   * Gauge arc size
   */
  @Prop() public arcSize: number = 16;

  /**
   * Gauge chart padding
   */
  @Prop() public padding: number = 20;

  /**
   * Gauge label title
   */
  @Prop() public labelTitle: string;

  /**
   * Gauge label units
   */
  @Prop() public labelUnits: string;

  @Element() private el: HTMLStencilElement;

  /**
   * Reference to the svg element where the plot will be rendered
   */
  private container: SVGContainer;

  private wrapper: any;
  private bbox: any;

  constructor() {
    this.resizeRender = this.resizeRender.bind(this);
  }

  public componentWillLoad() {
    addEventListener('resize', this.resizeRender);
  }

  public componentDidUnload() {
    removeEventListener('resize', this.resizeRender);
  }

  public componentDidLoad() {
    // this.prepareData();
    // this.clearGraph();
    this.renderGraph();
    // this.renderLabel();
  }

  public render() {
    return [
      // this.renderHeader(),
      // this.renderSelection(),
      this.renderContent()
    ];
  }

  private resizeRender() {
    requestAnimationFrame(() => {
      // this.clearGraph();
      this.renderGraph(false);
    });
  }

  private renderContent() {
    return (
      <div class='as-gauge-wrapper' ref={(ref) => this.wrapper = ref}>
        <svg class='as-gauge-svg' ref={(ref: SVGElement) => this.container = select(ref)}></svg>
        {/*this.renderLabel()*/}
        {/*this.renderTooltip()*/}
      </div>
    );
  }

  private renderGraph(transition: boolean = true) {
    if (!this.container || !this.container.node()) {
      return;
    }

    this.bbox = this.wrapper.getBoundingClientRect();
    const width = this.bbox.width;
    const height = this.bbox.height;

    this.container.attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', `${width}px`)
      .attr('height', `${height}px`);

    drawService.renderGauge(
      this.container,
      this.value,
      this.min,
      this.max,
      this.threshold,
      width,
      height,
      this.arcSize,
      this.padding,
      transition,
      this.onGraphMouseOver.bind(this),
      this.onGraphMouseOut.bind(this),
      this.onGraphMouseMove.bind(this)
    );
  }

  onGraphMouseOver() {
    
  }
  onGraphMouseOut() {

  }
  onGraphMouseMove() {

  }
}