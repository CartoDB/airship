import { Axis, axisBottom } from 'd3-axis';
import { axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { HistogramData } from '../interfaces';
import { Container } from '../types/Container';
import { Domain } from '../types/Domain';

// Duplicated in histogram-widget
const X_PADDING = 38;
const Y_PADDING = 36;

export function cleanAxes(yAxisSelection: Container) {
  yAxisSelection.select('.domain').remove();
}

export function updateAxes(
  container: Container,
  xScale: ScaleLinear<number, number>,
  yScale: ScaleLinear<number, number>,
  xAxis: Axis<{ valueOf(): number }>,
  yAxis: Axis<{ valueOf(): number }>,
  xDomain: Domain,
  yDomain: Domain) {

  const xAxisSelection: Container = container.select('.xAxis');
  const yAxisSelection: Container = container.select('.yAxis');

  // -- Update scales
  yScale
    .domain(yDomain)
    .nice();

  xScale
    .domain(xDomain);

  // -- Update axes
  xAxisSelection
    .call(xAxis);

  yAxisSelection
    .call(yAxis);
}

export function renderBars(
  data: HistogramData[],
  yScale: ScaleLinear<number, number>,
  container: Container,
  barsContainer: Container,
  BARS_SEPARATION: number,
  color: string) {

  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;

  const barWidth = data.length === 0 ? WIDTH : WIDTH / data.length;

  // -- Draw bars
  this.bars = barsContainer
    .selectAll('rect')
    .data(data);

  // -- Exit
  this.bars.exit().remove()
  .transition()
  .duration(200);

  // -- Enter
  this.bars
    .enter()
    .append('rect')
    .attr('y', HEIGHT)
    .attr('height', 0)
    .merge(this.bars)
    .attr('class', 'bar')
    .attr('x', (_d: HistogramData, index: number) => index * barWidth)
    .attr('width', () => Math.max(0, barWidth - BARS_SEPARATION))
    .style('fill', (d: HistogramData) => d.color || color)
    .transition()
    .delay((_d, i) => i * 50)
    .attr('height', (d: HistogramData) => HEIGHT - yScale(d.value))
    .attr('y', (d: HistogramData) => yScale(d.value));

  // -- Update
  this.bars
    .transition()
    .delay((_d, i) => i * 50)
    .attr('height', (d) => HEIGHT - yScale(d.value))
    .attr('y', (d) => yScale(d.value));
}

export function renderXAxis(
  container: Container,
  domain: Domain): Axis<{ valueOf(): number }> {

  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;

  const xScale = scaleLinear()
    .domain(domain)
    .range([0, WIDTH]);

  const xAxis = axisBottom(xScale)
    .tickSize(-WIDTH)
    .ticks(3)
    .tickPadding(10);

  if (container.select('.x-axis').empty()) {
    container
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${HEIGHT})`)
      .call(xAxis);
  } else {
    container
      .select('.x-axis')
      .attr('transform', `translate(0, ${HEIGHT})`)
      .call(xAxis);
  }

  return xAxis;
}

export function renderYAxis(
  container: Container,
  domain: Domain): Axis<{ valueOf(): number }> {

  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;

  // -- Y Axis
  const yScale = scaleLinear()
    .domain(domain)
    .range([HEIGHT, 0])
    .nice();

  const yAxis = axisLeft(yScale)
    .tickSize(-WIDTH)
    .ticks(5)
    .tickPadding(10)
    .tickFormat(format('.2~s'));

  if (container.select('.y-axis').empty()) {
    container
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
  } else {
    container.select('.y-axis')
      .call(yAxis);
  }

  return yAxis;
}



export default { cleanAxes, updateAxes, renderBars, renderXAxis, renderYAxis };
