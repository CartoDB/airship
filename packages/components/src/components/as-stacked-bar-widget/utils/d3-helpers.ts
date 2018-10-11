type ColumnElement = Selection<BaseType, {}, BaseType, {}>;

import { BaseType, Selection } from 'd3-selection';
import { ColumnData } from './types/ColumnData';
import { Container } from './types/Container';
import { RectangleData } from './types/RectangleData';

/**
 *
 * Create a `g` with the plot class where the columns will be drawn.
 */
export function createPlot(container: Container): Container {
  container
    .append('g')
    .attr('class', 'plot')
    .selectAll('rect');

  return container.select('.plot') as Container;
}

/**
 *
 * Create a `g` with the column class, this column has several rectangles inside.
 */
export function createColumn(element: Container): ColumnElement {
  return element
    .append('g')
    .attr('class', 'column')
    .selectAll('rect');
}

/**
 * Draw every rectangle inside a column.
 * This function only works when all the rectangles are the same type (positive/negative).
 */
export function drawColumn(
  element: ColumnElement, columnData: ColumnData, yOffset: number, xOffset: number, colWidth: number) {

  element
    .data(columnData)
    .enter()
    .append('rect')
    .attr('x', xOffset)
    .attr('y', (d) => {
      const y = _computeY(d, yOffset);
      yOffset = d.negative ? yOffset + d.size : yOffset - d.size;
      return y;
    })
    .attr('width', colWidth)
    .attr('height', (d) => `${d.size}%`)
    .attr('fill', (d) => d.color)
    .attr('fill-opacity', '.8');
}


function _computeY(data: RectangleData, origin: number): string {
  if (data.negative) {
    return `${origin}%`;
  }
  return `${(origin - data.size)}%`;
}


export default { createPlot, createColumn, drawColumn };
