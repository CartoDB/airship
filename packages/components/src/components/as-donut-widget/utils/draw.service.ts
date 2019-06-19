import { SVGContainer } from '../types/Container';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import { color as d3Color } from 'd3-color';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';

export function renderDonut(
  container: SVGContainer,
  data: any,
  width: number,
  height: number,
  arcSize: number,
  padding: number) {

  const radius = Math.min(width, height);
  const center = radius / 2;

  const pie = d3Pie().value((d: any) => d.value).padAngle(0.01);  // TODO: check this any

  const arc = d3Arc()
    .innerRadius((center - arcSize) - padding)
    .outerRadius(center - padding);

  const donut = container.append('g')
    .attr('class', 'donut')
    .style('transform', 'translate(50%, 50%)')
    .selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('class', 'path')
    .attr('d', arc)  // TODO: check this wraning
    .attr('fill', (d) => d.data.color)
    .style('cursor', 'pointer');

  donut.on('mouseover', function (d) {
    select(this)
      .transition('arc-fill-in')
      .duration(250)
      .attr('fill', d3Color(d.data.color).darker(0.6));  // TODO: check this wraning
  });

  donut.on('mouseout', function (d, i) {
    select(this)
      .transition('arc-fill-out')
      .duration(250)
      .attr('fill', d.data.color);
  });

  // TODO: think different transitions for new data and updates
  donut.transition('enter-donut')
    .duration(500)
    .attrTween('d', (d) => {
      const int = interpolate({ startAngle: 0, endAngle: 0 }, d);
      return (t) => arc(int(t));
    });
}

export default {
  renderDonut
};