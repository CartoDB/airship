import { select } from 'd3-selection';
import 'd3-transition';
import { Container } from '../types/Container';
import { StackedBarData } from '../types/StackedBarData';

const DURATION = 500;


/**
 * Draw the stacked bar char in the given svg element.
 */
export function drawColumns(svgElement: SVGElement, data: StackedBarData) {
  const plot = createPlot(svgElement);
  const columns = plot.selectAll('.column');

  // Remove columns
  columns
    .data(data)
    .exit()
    .remove()
    .transition()
    .duration(DURATION);

  // Add new rectangles/columns
  _drawRectangles(columns
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'column')
    .selectAll('rect')
    .data((d) => d)
    .enter()
    .append('rect'));

  // Update rectangles
  _drawRectangles(columns
    .data(data)
    .selectAll('rect')
    .data((d) => d));
}

export function createPlot(svgElement: SVGElement): Container {
  const container = select(svgElement);
  if (container.select('.plot').empty()) {
    container
      .append('g')
      .attr('class', 'plot');
  }
  return container.select('.plot') as Container;
}

function _drawRectangles(selection) {
  selection
    .transition()
    .duration(DURATION)
    .attr('fill-opacity', '.5')
    .attr('x', (d) => d.x)
    .attr('y', (d) => `${d.y}%`)
    .attr('width', (d) => d.w)
    .attr('height', (d) => `${d.h}%`)
    .attr('fill', (d) => d.c);
}

export default { createPlot, drawColumns };
