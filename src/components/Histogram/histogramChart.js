import { select, selectAll } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { rgb } from 'd3-color';
import { min, max } from 'd3-array';
import { transition } from 'd3-transition';
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

export default class HistogramChart {
  constructor(element, options) {
    if (!element) throw new Error('A root container is required');

    this.element = element;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.createChart();
  }

  createChart() {
    const { data, height, margin, width } = this.options;
    const fullHeight = height + margin.top + margin.bottom;
    const fullWidth = width + margin.left + margin.right;

    // -- Base SVG
    this.svg = select(this.element)
      .append('svg')
        .attr('width', fullWidth)
        .attr('height', fullHeight)
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // -- X Axis
    this.xScale = scaleBand()
      .paddingInner(0.05)
      .paddingOuter(0.1)
      .domain(data.map(d => d.max))
      .range([0, width]);

    // -- Y Axis
    this.yScale = scaleLinear()
      .domain([0, max(data, d => d.freq)])
      .range([height, 0]);

    this.yAxis = axisLeft(this.yScale)
      .tickSize(-width, 0, 0)
      .ticks(5);

    this.yAxisSelection = this.svg
      .append('g')
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border

    this.render();
  }

  update(options) {
    this.options = { ...this.options, ...options };

    this.render();
  }

  render() {
    const { data, height, margin, width } = this.options;

    // -- Create bars
    const update = this.svg
      .selectAll('rect')
      .data(data)

    update
      .exit()
      .attr('y', height)
      .attr('height', 0)
      .remove(); // Remove elements without data

    this.yScale
      .domain([0, max(data, d => d.freq)]);

    this.xScale
      .domain(data.map(d => d.max))

    this.yAxisSelection
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border

    update
      .attr('class', 'bar')
      .attr('y', height)
      .attr('height', 0)
      .attr('x', d => this.xScale(d.max))
      .attr('width', d => this.xScale.bandwidth())
      .attr('y', d => this.yScale(d.freq))
      .attr('height', d => height - this.yScale(d.freq))

    update
      .enter()
      .append('rect')
        .attr('class', 'bar')
        .attr('y', height)
        .attr('height', 0)
        .attr('x', d => this.xScale(d.max))
        .attr('width', d => this.xScale.bandwidth())
        .transition()
          .delay(200)
        .attr('y', d => this.yScale(d.freq))
        .attr('height', d => height - this.yScale(d.freq))
  }
}
