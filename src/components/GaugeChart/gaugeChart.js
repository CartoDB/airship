import { arc } from 'd3-shape';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import { transition } from 'd3-transition'; // eslint-disable-line

const { PI } = Math;

const DEFAULT_OPTIONS = {
  width: 228,
  height: 100,
  innerRadius: 88,
  outerRadius: 100,
  maxValue: 180,
  minValue: 0,
  value: 0,
  backgroundColor: '#F5F5F5',
  foregroundColor: '#47DB99',
  textColor: '#2C2C2C',
};

export default class Gaugechart {
  constructor(element, options) {
    if (!element) throw new Error('A root container is required');

    this.element = element;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.createChart();
  }

  createChart() {
    this.arc = arc()
      .innerRadius(this.options.innerRadius)
      .outerRadius(this.options.outerRadius)
      .startAngle(-90 * (PI / 180))
      .cornerRadius(30);

    const svg = select(this.element)
      .append('svg')
      .attr('width', this.options.width)
      .attr('height', this.options.height)
      .append('g')
      .attr('transform', `translate(${this.options.width / 2},${this.options.height})`);

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

    this.valueLabel = svg
      .append('text')
      .attr('transform', 'translate(0, -30)')
      .attr('text-anchor', 'middle')
      .style('font-size', '40')
      .style('font-weight', '300')
      .style('color', this.options.textColor)
      .style('font-family', 'Roboto')
      .style('-webkit-font-smoothing', 'antialiased')
      .text(this.options.value);

    this.textLabel = svg
      .append('text')
      .attr('transform', 'translate(0, -5)')
      .attr('text-anchor', 'middle')
      .style('font-size', '12')
      .style('font-weight', '300')
      .style('color', this.options.textColor)
      .style('font-family', 'Roboto')
      .text(this.options.label);

    this._refresh();
  }

  update(options) {
    this.options = { ...this.options, ...options };

    this._refresh();
  }

  _refresh() {
    const value = (this.options.value * 180) / this.options.maxValue;
    const numPi = Math.floor(value - 90) * (PI / 180);

    this.textLabel.text(this.options.label);

    this.valueLabel
      .transition()
      .text(Math.floor(this.options.value));

    this.foreground.transition()
      .duration(750)
      .call(this._animateValue, numPi, this.arc);
  }

  _animateValue = (transition, newAngle, arcFn) => {
    transition.attrTween('d', d => {
      const interpolateFn = interpolate(d.endAngle, newAngle);

      return t => {
        d.endAngle = interpolateFn(t); // eslint-disable-line no-param-reassign

        return arcFn(d);
      };
    });
  }
}
