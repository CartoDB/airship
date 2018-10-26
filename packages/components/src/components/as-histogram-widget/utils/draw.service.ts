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


export default { cleanAxes, updateAxes };
