import { ScaleLinear } from 'd3';
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
  CUSTOM_HANDLE_WIDTH: number,
  CUSTOM_HANDLE_HEIGHT: number,
  scale: ScaleLinear<number, number>,
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
    .attr('y1', scale(0))
    .attr('y2', scale(0));

  let customHandles = brushArea.selectAll<SVGGElement, { type: string }>('.handle--wrapper');

  const linesMargin = Math.floor((CUSTOM_HANDLE_WIDTH - 2) / 2);

  if (customHandles.empty()) {
    customHandles = customHandles
      .data([{ type: 'w' }, { type: 'e' }])
      .enter()
      .append<SVGGElement>('g')
      .attr('class', 'handle--wrapper');

    customHandles
      .append('rect')
      .attr('class', 'handle--custom')
      .attr('width', CUSTOM_HANDLE_WIDTH)
      .attr('height', CUSTOM_HANDLE_HEIGHT)
      .attr('rx', 1)
      .attr('ry', 1);

    const handleGrab = customHandles
      .append('g')
      .attr('class', 'handle--grab');

    for (let i = 0; i < 3; i++) {
      handleGrab
        .append('line')
        .attr('transform', `translate(0 ${(CUSTOM_HANDLE_HEIGHT / 2) - 2})`)
        .attr('x1', linesMargin)
        .attr('y1', i * 2)
        .attr('x2', CUSTOM_HANDLE_WIDTH - linesMargin)
        .attr('y2', i * 2)
        .attr('class', 'grab-line');
    }
  }

  return customHandles;
}

export default { addBrush, addBrushArea, addCustomHandles };
