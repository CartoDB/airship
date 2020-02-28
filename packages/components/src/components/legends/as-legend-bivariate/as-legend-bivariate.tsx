import { Component, Element, h, Prop } from '@stencil/core';
import { renderBivariateGraph } from './utils/draw.service';

const SIZE = 100;
const SHAPE_SIZE = 80;

@Component({
  shadow: false,
  styleUrl: './as-legend-bivariate.scss',
  tag: 'as-legend-bivariate',
})
export class LegendBivariate {
  @Prop() public colors: LegendData[];
  @Prop() public numQuantiles: number = 3;
  @Prop() public labelX: string = 'x';
  @Prop() public labelY: string = 'y';
  @Element() private element: HTMLElement;

  public get elementId() {
    return `#${this.element.id} > .as-legend-bivariate--wrapper`;
  }

  public render() {
    return <div class='as-legend-bivariate--wrapper'></div>;
  }

  public componentDidRender() {
    if (!this.colors || this.colors.length === 0) {
      return null;
    }

    renderBivariateGraph(
      this.elementId,
      SIZE,
      SHAPE_SIZE,
      this.numQuantiles,
      this.labelX,
      this.labelY,
      this.colors
    );
  }
}
