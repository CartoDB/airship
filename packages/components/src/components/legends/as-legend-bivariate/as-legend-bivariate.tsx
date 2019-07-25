import { Component, Element, h, Prop } from '@stencil/core';
import { renderBivariateGraph } from './utils/draw.service';


@Component({
  shadow: false,
  styleUrl: './as-legend-bivariate.scss',
  tag: 'as-legend-bivariate',
})
export class LegendBivariate {
  @Prop() public data: LegendData[];
  @Element() private el: HTMLAsLegendBivariateElement;

  public render() {
    if (!this.data || this.data.length === 0) {
      return null;
    }

    return <div class='as-legend-bivariate--wrapper'></div>;
  }

  public componentDidLoad() {
    console.log('!!! data', this.data);
    const colors = [];
    const data = {
      x: [],
      y: []
    };
    const width = 100;
    const height = 100;
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };

    renderBivariateGraph(this.el, width, height, margin, data, colors);
  }
}
