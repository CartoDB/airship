import { max } from 'd3-array';
import { Axis, axisBottom } from 'd3-axis';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { HistogramData } from '../interfaces';
import { Container } from '../types/Container';
import { Domain } from '../types/Domain';

export function cleanAxes(yAxisSelection: Container) {
  yAxisSelection.select('.domain').remove();
}

export function updateAxes(
  data: HistogramData[],
  container: Container,
  yScale: ScaleLinear<number, number>,
  xScale: ScaleLinear<number, number>,
  xAxis: Axis<{ valueOf(): number }>,
  yAxis: Axis<{ valueOf(): number }>,
  xDomain: Domain) {

  const xAxisSelection: Container = container.select('.xAxis');
  const yAxisSelection: Container = container.select('.yAxis');

  // -- Update scales
  yScale
    .domain([0, max(data, (d) => d.value)])
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
  chartWidth: number,
  MARGIN: any,
  barsContainer: Container,
  HEIGHT: number,
  BARS_SEPARATION: number,
  color: string) {

  const barsWidth = chartWidth - MARGIN.YAxis;
  const barWidth = data.length === 0 ? barsWidth : barsWidth / data.length;
  // -- Draw bars
  this.bars = barsContainer
    .selectAll('rect')
    .data(data);

  // -- Exit
  this.bars.exit().remove();

  // -- Enter
  this.bars
    .enter()
    .append('rect')
    .merge(this.bars)
    .attr('class', 'bar')
    .attr('y', HEIGHT)
    .attr('x', (_d: HistogramData, index: number) => index * barWidth)
    .attr('width', () => Math.max(0, barWidth - BARS_SEPARATION))
    .attr('height', 0)
    .style('fill', (d: HistogramData) => d.color || color)
    .transition()
    .delay(200)
    .attr('y', (d: HistogramData) => yScale(d.value))
    .attr('height', (d: HistogramData) => HEIGHT - yScale(d.value));

  // -- Update
  this.bars
    .attr('y', (d) => yScale(d.value))
    .attr('height', (d) => HEIGHT - yScale(d.value));

}

export function renderXAxis(
  container: Container,
  domain: Domain,
  barsWidth: number,
  MARGIN,
  HEIGHT: number): [ScaleLinear<number, number>, Axis<{ valueOf(): number }>] {



  const xScale = scaleLinear()
    .domain(domain)
    .range([0, barsWidth]);

  const xAxis = axisBottom(xScale)
    .tickSize(-barsWidth)
    .ticks(3)
    .tickPadding(10);

  container
    .append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(${MARGIN.LEFT}, ${HEIGHT + MARGIN.TOP})`)
    .call(xAxis);

  return [xScale, xAxis];
}



export default { cleanAxes, updateAxes, renderBars, renderXAxis };
