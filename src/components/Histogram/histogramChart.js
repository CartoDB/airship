import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { rgb } from 'd3-color';
import { min, max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { readableNumber, truncate } from '../../utils';

const DEFAULT_OPTIONS = {
  width: 208,
  height: 140,
  margin: {
    top: 15,
    right: 0,
    bottom: 5,
    left: 40,
  },
};

export default class Gaugechart {
  constructor(element, options) {
    if (!element) throw new Error('A root container is required');

    this.element = element;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.createChart();
  }

  createChart() {
    const { data: { bins }, height, margin, width } = this.options;
    const fullHeight = height + margin.top + margin.bottom;
    const fullWidth = width + margin.left + margin.right;

    // -- Base SVG
    const svg = select(this.element)
      .append('svg')
        .attr('width', fullWidth)
        .attr('height', fullHeight)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // -- X Axis
    const xScale = scaleBand()
      .paddingInner(0.05)
      .paddingOuter(0.1)
      .domain(bins.map(d => d.max))
      .range([0, width]);

    // -- Y Axis
    const yScale = scaleLinear()
      .domain([0, max(bins, d => d.freq)])
      .range([height, 0]);

    const yAxis = axisLeft(yScale)
      .tickSize(-width, 0, 0)
      .ticks(5);

    svg.call(yAxis);

    select('.domain').remove();

    // -- Create bars
    svg.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.max))
        .attr('y', d => yScale(d.freq))
        .attr('width', d => xScale.bandwidth())
        .attr('height', d => yScale(0) - yScale(d.freq))


    // this._refresh();
  }

  update(options) {
    this.options = { ...this.options, ...options };

    this.createChart(); // TODO: Replace with refresh and animations
  }

  _refresh() {
    const { data, colors, showLegend } = this.options;
  }
}
