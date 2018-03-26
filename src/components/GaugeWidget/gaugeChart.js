import * as d3 from 'd3';

const PI = Math.PI;

const DEFAULT_OPTIONS = {
  width: 228,
  height: 100,
  innerRadius: 88,
  outerRadius: 100,
  maxValue: 180,
  backgroundColor: '#F5F5F5',
  foregroundColor: '#47DB99',
  textColor: '#2C2C2C',
};

export default class Gaugechart {
  constructor(element, attrs, options) {
    console.log(element, attrs, options)
    this.element = element;
    this.percentage = attrs.percentage;
    this.label = attrs.label;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.createChart();
  }

  createChart() {
    this.arc = d3
      .arc()
      .innerRadius(this.options.innerRadius)
      .outerRadius(this.options.outerRadius)
      .startAngle(-90 * (PI / 180))
      .cornerRadius(30);

    const svg = d3
      .select(this.element)
      .append('svg')
      .attr('width', this.options.width)
      .attr('height', this.options.height)
      .append('g')
      .attr('transform', 'translate(' + this.options.width / 2 + ',' + this.options.height + ')')

    this.background = svg
      .append('path')
      .datum({ endAngle: 90 * (PI / 180) })
      .style('fill', this.options.backgroundColor)
      .attr('d', this.arc);

    this.foreground = svg
      .append('path')
      .datum({ endAngle: -90 * (PI / 180) })
      .style('fill', this.options.foregroundColor)
      .attr('d', this.arc);

    this.percentageLabel = svg
      .append('text')
      .attr('transform', 'translate(0, -30)')
      .attr('text-anchor', 'middle')
      .style('font-size', '40')
      .style('font-weight', '300')
      .style('color', this.options.textColor)
      .style('font-family', 'Roboto')
      .style('-webkit-font-smoothing', 'antialiased')
      .text(this.percentage)

    this.textLabel = svg
      .append('text')
      .attr('transform', 'translate(0, -5)')
      .attr('text-anchor', 'middle')
      .style('font-size', '12')
      .style('font-weight', '300')
      .style('color', this.options.textColor)
      .style('font-family', 'Roboto')
      .text(this.label)

    this._refresh();
  }

  update(attrs) {
    this.percentage = attrs.value;
    this.label = attrs.label;

    this._refresh();
  }

  _refresh() {
    const value = (this.percentage * 180) / 100;
    const numPi = Math.floor(value - 90) * (PI / 180);

    this.textLabel.text(this.label);

    this.percentageLabel
      .transition()
      .text(Math.floor(this.percentage));

    this.foreground.transition()
      .duration(750)
      .call(this._animateValue, numPi, this.arc);
  }

  _animateValue(transition, newAngle, arc) {
    transition.attrTween('d', (d) => {
      const interpolate = d3.interpolate(d.endAngle, newAngle);

      return (t) => {
        d.endAngle = interpolate(t);

        return arc(d);
      };
    });
  }
}
