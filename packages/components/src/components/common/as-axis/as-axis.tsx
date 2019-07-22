import { Component, Element, Prop } from '@stencil/core';
import axisService from './as-axis.service';


/**
 * Helper class to draw the vertical axis on some widgets.
 * WARNING: This component should be placed next to the SVG element.
 *
 * @export
 * @class YAxis
 */
@Component({
  shadow: false,
  styleUrl: './as-axis.scss',
  tag: 'as-axis',
})
export class Axis {

  /**
   * Axes type
   *
   * @type {string}
   * @memberof Axis
   * 
   * [axisTop, axisRight, axisBottom, axisLeft]
   */
  @Prop() public type: string;
  // @Watch('type')
  // validateType(newValue: string) {
  //   console.log(newValue);
  // }

  /**
   * The scale method to aplly
   *
   * @type {number}
   * @memberof Axis
   * 
   * https://github.com/d3/d3-scale
   * 
   * [
   *  scaleLinear, 
   *  scalePow, 
   *  scaleSqrt, 
   *  scaleLog, 
   *  rangeRound, 
   *  scaleSymlog, 
   *  scaleIdentity, 
   *  scaleTime, 
   *  scaleSequential, 
   *  scaleSequentialLog,
   *  scaleSequentialPow,
   *  scaleSequentialSqrt,
   *  scaleSequentialSymlog,
   *  scaleSequentialQuantile,
   *  scaleDiverging,
   *  scaleDivergingLog,
   *  scaleDivergingPow,
   *  scaleDivergingSqrt,
   *  scaleDivergingSymlog,
   *  scaleQuantize,
   *  scaleQuantile,
   *  scaleThreshold,
   *  scaleOrdinal,
   *  scaleImplicit,
   *  scaleBand,
   *  scalePoint
   * ]
   */
  @Prop() public scale: string = 'scaleLinear';

  /**
   * Time format
   *
   * @type {string}
   * @memberof Axis
   */
  @Prop() public timeFormat: string;
  
  /**
   * Chart tick padding
   *
   * @type {number}
   * @memberof Axis
   */
  @Prop() public tickPadding: number = 4;

  /**
   * Chart tick size
   *
   * @type {number}
   * @memberof Axis
   */
  @Prop() public tickSize: number = 0;

  /**
   * Chart tick size inner
   *
   * @type {number}
   * @memberof Axis
   */
  @Prop() public tickSizeInner: number = 0;

  /**
   * Chart tick size outer
   *
   * @type {number}
   * @memberof Axis
   */
  @Prop() public tickSizeOuter: number = 0;

  /**
   * Axis domain
   *
   * @type {number}
   * @memberof Axis
   */
  @Prop() public domain: [];
  
  /**
   * Margin
   *
   * @type {any}
   * @memberof Axis
   */
  @Prop() public margin: any = { top: 20, right: 20, bottom: 20, left: 20 };

  /**
   * Use this attribute to decide if the widget should be rerendered on window resize
   * Defaults to true
   */
  @Prop() public responsive: boolean = true;

  /**
   * Reference to the HTMLStencilElement
   */
  @Element() private element: HTMLStencilElement;

  constructor() {
    this._resizeListener = this._resizeListener.bind(this);
  }

  public componentWillLoad() {
    addEventListener('resize', this._resizeListener);
  }

  public componentDidUnload() {
    removeEventListener('resize', this._resizeListener);
  }

  public render() {
    const element = this.element.previousElementSibling as SVGElement;

    axisService.renderAxis(
      element, 
      this.domain, 
      this.type,
      this.scale,
      this.margin,
      this.timeFormat,
      this.tickPadding,
      this.tickSize,
      this.tickSizeInner,
      this.tickSizeOuter
    );
  }

  private _resizeListener() {
    if (this.responsive) {
      this.element.forceUpdate();
    }
  }
}
