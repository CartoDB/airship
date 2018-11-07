import { Component, Element, Prop } from '@stencil/core';
import yAxisService from './y-axis.service';


/**
 * Helper class to draw the vertical axis on some widgets.
 * WARNING: This component should be placed next to the SVG element.
 *
 * @export
 * @class YAxis
 */
@Component({
  shadow: false,
  styleUrl: './as-y-axis.scss',
  tag: 'as-y-axis',
})
export class YAxis {

  /**
   * Lower limit of the axis
   *
   * @type {number}
   * @memberof YAxis
   */
  @Prop() public from: number = 0;

  /**
   * Upper limit of the axis
   *
   * @type {Number[]}
   * @memberof YAxis
   */
  @Prop() public to: number = 0;

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
    const scale = [this.from, this.to] as [number, number];

    yAxisService.renderYAxis(element, scale);
  }

  private _resizeListener() {
    if (this.responsive) {
      this.element.forceUpdate();
    }
  }
}
