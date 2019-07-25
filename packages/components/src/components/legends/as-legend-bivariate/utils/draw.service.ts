import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand } from 'd3-scale';

export function xScaleBand(width, data) {
  return scaleBand()
    .range([ 0, width ])
    .domain(data)
    .padding(0.01);
}

export function yScaleBand(height, data) {
  return scaleBand()
    .range([ height, 0 ])
    .domain(data)
    .padding(0.01);

}

export function renderXBottom(svg, width, height, data) {
  const x = xScaleBand(width, data);

  return svg
    .append('g')
    .attr('transform', `translate(0, '${height}')`)
    .call(axisBottom(x));
}

export function renderYLeft(svg, height, data) {
  const y = yScaleBand(height, data);

  return svg
    .append('g')
    .call(axisLeft(y));
}

export function renderBivariateContainer(container, margin, width, height) {
  return container
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
}

export function renderBivariateGraph(container, width, height, margin, data, colors) {
  const svg = renderBivariateContainer(container, width, height, margin);
  const xData = data.x;
  const yData = data.y;
  const x = renderXBottom(svg, width, height, xData);
  const y = renderYLeft(svg, height, yData);

  return svg
    .selectAll()
    .data(data, (d) => +`${d.group}:${d.variable}`)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.group) )
    .attr('y', (d) => y(d.variable))
    .attr('width', x.bandwidth() )
    .attr('height', y.bandwidth() )
    .style('fill', (d) => colors(d.value));
}

export default {
  renderBivariateGraph
};
