import { arc, pie } from 'd3-shape';
import { select, selectAll } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import { transition } from 'd3-transition';
import { rgb } from 'd3-color';
import { readableNumber, truncate, virtualScroller } from '../../utils';

const PI = Math.PI;

const DEFAULT_OPTIONS = {
  textColor: '#2C2C2C',
  donutSize: 136,
};

export default class Gaugechart {
  constructor(element, options) {
    if (!element) throw new Error('A root container is required');

    this.element = element;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.createChart();
  }

  createChart() {
    const { colors, data, donutSize, textColor, showLegend } = this.options;
    const radius = donutSize / 2;

    this.arc = arc()
        .outerRadius(radius)
        .innerRadius(radius - 15);

    this.pie = pie()
        .sort(null)
        .value(d => d.value);

    const svg = select(this.element)
      .append('svg')
        .attr('width', donutSize)
        .attr('height', donutSize)


    this.pieChart = svg
      .append('g')
        .attr('width', donutSize)
        .attr('height', donutSize)
        .attr('transform', 'translate(' + radius + ',' + radius + ')');

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

    if (showLegend) this._renderLegend();

    this._refresh();
  }

  _renderLegend() {
    const { data, textColor, colors } = this.options;

    this.legendContainer = select(this.element)
      .append('div')
        .attr('class', 'legend')
        .style('width', '95px')
        .style('height', '136px')
        .style('overflow-y', 'auto');

    const legendsSVG = this.legendContainer
      .append('svg')
        .attr('width', 90);

    this.legends = legendsSVG
      .append('g');

    const legendEnter = (legendsContainer) => {
      legendsContainer.append('rect')
          .attr('width', 12)
          .attr('height', 12)

      legendsContainer.append('text')
          .attr('x', 20)
          .attr('y', 10)
          .style('font-size', '12')
          .style('color', textColor)
          .style('font-family', 'Roboto')
          .style('-webkit-font-smoothing', 'antialiased')
    }

    const legendUpdate = function(legendsContainer) {
      legendsContainer.select("rect")
        .attr('fill', (d, i) => colors[data.indexOf(d)]);

      legendsContainer.select("text")
        .text(d => truncate(d.name, 10));
    };

    this.scroller = virtualScroller()
      .rowHeight(24)
      .enter(legendEnter)
      .update(legendUpdate)
      .exit(() => {})
      .svg(legendsSVG)
      .totalRows(data.length)
      .viewport(this.legendContainer);

    this.scroller.data(data);

    this.legends.call(this.scroller);
  }

  update(options) {
    this.options = { ...this.options, ...options };

    this._refresh();
  }

  _refresh() {
    const { data, colors, showLegend } = this.options;

    this.path.data(this.pie(data));

    if (this.legendContainer) this.legendContainer.remove();
    if (showLegend) this._renderLegend();

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
