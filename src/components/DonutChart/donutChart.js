import { arc, select, interpolate, pie, rgb } from 'd3';
import { readableNumber, truncate } from '../../utils';

const PI = Math.PI;

const DEFAULT_OPTIONS = {
  width: 248,
  height: 136,
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
    const { colors, data, width, height, textColor } = this.options;
    const radius = 136 / 2;

    this.arc = arc()
        .outerRadius(radius)
        .innerRadius(radius - 15);

    this.pie = pie()
        .sort(null)
        .value(d => d.value);

    const svg = select(this.element)
      .append('svg')
        .attr('width', width)
        .attr('height', height)


    this.pieChart = svg
      .append('g')
        .attr('width', 136)
        .attr('height', 136)
        .attr('transform', 'translate(' + 136 / 2 + ',' + height / 2 + ')');

    this.path = this.pieChart
        .selectAll('path')
        .data(this.pie(data))
        .enter()
        .append('path');

    this.path.each((d) => {
      this._current = d;
    });

    this.pieChart
      .append('text')
      .attr('class', 'tooltip-value')
      .attr('transform', 'translate(0, 0)')
      .attr('text-anchor', 'middle')
      .style('font-size', '24')
      .style('font-weight', '300')
      .style('color', textColor)
      .style('font-family', 'Roboto')
      .style('-webkit-font-smoothing', 'antialiased');

    this.pieChart
      .append('text')
      .attr('class', 'tooltip-category')
      .attr('transform', 'translate(0, 20)')
      .attr('text-anchor', 'middle')
      .style('font-size', '12')
      .style('font-weight', '300')
      .style('color', textColor)
      .style('font-family', 'Roboto')
      .style('-webkit-font-smoothing', 'antialiased');

    this.path.on('mouseover', function (obj) {
      select(this).style('fill', () => rgb(select(this).style('fill')).darker(0.16));

      svg.select('text.tooltip-value').text(readableNumber(obj.data.value));
      svg.select('text.tooltip-category').text(truncate(obj.data.name, 14));
    });

    this.path.on('mouseout', function (obj) {
      select(this).style('fill', () => rgb(select(this).style('fill')).brighter(0.16));

      svg.select('text.tooltip-value').text('');
      svg.select('text.tooltip-category').text('');
    });

    this.legends = svg
      .append('g')
        .attr('width', 114)
        .attr('height', 200);


    this.legend = this.legends
      .selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(160, ${i * 24})`);

    this.legend.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', (d, i) => colors[i]);

    this.legend.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .style('font-size', '12')
        .style('color', textColor)
        .style('font-family', 'Roboto')
        .style('-webkit-font-smoothing', 'antialiased')
        .text(d => truncate(d.name, 13));

    this._refresh();
  }

  update(options) {
    this.options = { ...this.options, ...options };

    this._refresh();
  }

  _refresh() {
    const { data, colors } = this.options;

    this.path.data(this.pie(data));
    this.path.transition()
      .duration(750)
      .attr('fill', (d, i) => colors[i])
      .attrTween('d', this._animateValue.bind(this))
  }

  _animateValue(newAngle) {
    const interpolateFn = interpolate(this._current, newAngle);

    this._current = interpolateFn(0);

    return t => this.arc(interpolateFn(t));
  }
}
