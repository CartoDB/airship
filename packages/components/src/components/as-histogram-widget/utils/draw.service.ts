import { max } from 'd3-array';
import { Axis } from 'd3-axis';
import { ScaleLinear } from 'd3-scale';
import { HistogramData } from '../interfaces';
import { Container } from '../types/Container';

export function cleanAxes(yAxisSelection: Container, xAxisSelection: Container) {
  yAxisSelection.select('.domain').remove();
  xAxisSelection.select('.domain').remove();
  xAxisSelection.selectAll('line').remove();
}

export function updateAxes(
  data: HistogramData[],
  yScale: ScaleLinear<number, number>,
  xScale: ScaleLinear<number, number>,
  xAxis: Axis<{ valueOf(): number }>,
  yAxis: Axis<{ valueOf(): number }>,
  yAxisSelection: Container,
  xAxisSelection: Container) {

  const { start } = data[0];
  const { end } = data[data.length - 1];

  // -- Update scales
  yScale
    .domain([0, max(data, (d) => d.value)])
    .nice();

  xScale
    .domain([start, end]);

  // -- Update axes
  xAxisSelection
    .call(xAxis);

  yAxisSelection
    .call(yAxis);

  cleanAxes(yAxisSelection, xAxisSelection);
}

function renderBars(
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


export default { cleanAxes, updateAxes, renderBars };
