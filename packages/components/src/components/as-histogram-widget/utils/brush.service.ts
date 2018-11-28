import { BrushBehavior, brushX } from 'd3-brush';
import { SVGContainer, SVGGContainer } from '../types/Container';

export function addBrush(
  width: number,
  height: number,
  onBrush: () => void,
  onBrushEnd: () => void,
  CUSTOM_HANDLE_WIDTH: number,
  CUSTOM_HANDLE_HEIGHT,
  X_PADDING: number,
  Y_PADDING: number): BrushBehavior<{}> {

  return brushX()
    .handleSize(CUSTOM_HANDLE_WIDTH)
    .extent([[0, 0], [width - X_PADDING, height - Y_PADDING + (CUSTOM_HANDLE_HEIGHT / 2)]])
    .on('brush', onBrush)
    .on('end', onBrushEnd);
}

export function addBrushArea(
  brush: BrushBehavior<{}>,
  container: SVGContainer,
): SVGGContainer {

  let brushArea = container.select<SVGGElement>('g.brush');

  if (brushArea.empty()) {
    brushArea = container.append('g');
    brushArea.attr('class', 'brush');
  }

  brushArea.call(brush);

  return brushArea;
}

export function addCustomHandles(
  brushArea: SVGGContainer,
  height: number,
  CUSTOM_HANDLE_WIDTH: number,
  CUSTOM_HANDLE_HEIGHT: number,
  Y_PADDING: number
): SVGGContainer<{ type: string }, SVGGElement, {}> {

  let bottomLine = brushArea.select('line.bottomline');

  if (bottomLine.empty()) {
    bottomLine = brushArea.append('line')
      .attr('class', 'bottomline')
      .attr('stroke-width', 4)
      .style('opacity', 0)
      .attr('pointer-events', 'none');
  }

  bottomLine
    .attr('y1', height - Y_PADDING)
    .attr('y2', height - Y_PADDING);

  let customHandlers = brushArea.selectAll<SVGGElement, { type: string }>('.handle--wrapper');

  if (customHandlers.empty()) {
    customHandlers = customHandlers
      .data([{ type: 'w' }, { type: 'e' }])
      .enter()
      .append('g')
      .attr('class', 'handle--wrapper');

    customHandlers
      .append('rect')
      .attr('class', 'handle--custom')
      .attr('width', CUSTOM_HANDLE_WIDTH)
      .attr('height', CUSTOM_HANDLE_HEIGHT)
      .attr('rx', 2)
      .attr('ry', 2);

    const handleGrab = customHandlers
      .append('g')
      .attr('class', 'handle--grab');

    for (let i = 0; i < 3; i++) {
      handleGrab
        .append('line')
        .attr('x1', 2)
        .attr('y1', i * 2)
        .attr('x2', 4)
        .attr('y2', i * 2)
        .attr('class', 'grab-line');
    }
  }

  return customHandlers;
}

export default { addBrush, addBrushArea, addCustomHandles };
