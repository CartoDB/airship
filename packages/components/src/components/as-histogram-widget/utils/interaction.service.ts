import {
  event as d3event,
  select
} from 'd3-selection';
import { shadeOrBlend } from '../../../utils/styles';
import { HistogramData } from '../interfaces';
import { SVGContainer, SVGGContainer } from '../types/Container';

export function addTooltip(
  container: SVGContainer,
  barsContainer: SVGGContainer,
  hasSelection: { selection: number[] | null },
  color: string,
  unselectedColor: string,
  formatter: (d: HistogramData) => string | string[],
  setTooltip: (tooltip: string | string[] | null, evt?: MouseEvent) => void
) {
  container.on('mousemove', () => {
    const evt = d3event as MouseEvent;
    const { clientX, clientY } = evt;
    let anyHovered = false;

    barsContainer.selectAll('rect')
      .each((data: HistogramData, i, nodes) => {
        const selected = _isSelected(data, hasSelection.selection);
        const nodeSelection = select(nodes[i]);
        const node = nodes[i] as Element;
        const bb = node.getBoundingClientRect();
        const isInsideBB = bb.left <= clientX &&
          clientX <= bb.right &&
          bb.top <= clientY &&
          clientY <= bb.bottom;

        if (isInsideBB) {
          let _color = selected ? data.color || color : unselectedColor;
          _color = shadeOrBlend(-0.16, _color);
          nodeSelection.style('fill', _color);
          setTooltip(formatter(data), evt);
          anyHovered = true;
        } else {
          nodeSelection.style('fill', selected ? data.color || color : unselectedColor);
        }
      });

    if (!anyHovered) {
      setTooltip(null);
    }
  })
  .on('mouseleave', () => {
    setTooltip(null);
    barsContainer.selectAll('rect')
      .style('fill', (data: HistogramData) => {
        if (_isSelected(data, hasSelection.selection)) {
          return data.color || color;
        }
        return unselectedColor;
      });
  });
}

function _isSelected(data: HistogramData, range: number[] | null) {
  if (range === null) {
    return true;
  }

  return data.start >= range[0] && data.end <= range[1];
}

export default { addTooltip };
