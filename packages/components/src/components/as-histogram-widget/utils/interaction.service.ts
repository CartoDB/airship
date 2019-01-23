import {
  BaseType,
  event as d3event,
  select,
  Selection
} from 'd3-selection';
import { shadeOrBlend } from '../../../utils/styles';
import { HistogramData } from '../interfaces';
import { SVGContainer, SVGGContainer } from '../types/Container';

export function addTooltip(
  container: SVGContainer,
  barsContainer: SVGGContainer,
  hasSelection: { selection: number[] | null, setSelection: any },
  color: string,
  unselectedColor: string,
  formatter: (d: HistogramData) => string | string[],
  setTooltip: (tooltip: string | string[] | null, evt?: MouseEvent) => void
) {
  container.on('mousemove', () => {
    const evt = d3event as MouseEvent;
    const { clientX, clientY } = evt;
    let anyHovered = false;

    _forEachRect(barsContainer, clientX, clientY,
      (data, node) => {
        const selected = _isSelected(data, hasSelection.selection);

        let _color = selected ? data.color || color : unselectedColor;
        _color = shadeOrBlend(-0.16, _color);
        node.style('fill', _color);
        setTooltip(formatter(data), evt);
        anyHovered = true;
      },
      (data, node) => {
        const selected = _isSelected(data, hasSelection.selection);
        node.style('fill', selected ? data.color || color : unselectedColor);
      });

    if (!anyHovered) {
      setTooltip(null);
    }
  })
  .on('click', () => {
    const evt = d3event as MouseEvent;
    const { clientX, clientY } = evt;

    _forEachRect(barsContainer, clientX, clientY, (data) => {
      hasSelection.setSelection([data.start, data.end]);
    });
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

type RectCallback = (data: HistogramData, node: Selection<BaseType, {}, null, undefined>) => void;

/**
 * Cycles through all rects in container, fires a callback for the rect that contains the x / y points,
 * and fires another (optional) callback for the rest of the containers
 *
 * @param {SVGGContainer} container Container that contains rect elements
 * @param {number} x X coordinate to check whether is contained or not
 * @param {number} y Y coordinate to check whether is contained or not
 * @param {RectCallback} insideCallback Callback fired with data of bucket that contains the point
 * @param {RectCallback} [outsideCallback] Callback fired with data of buckets that don't contain the point
 */
function _forEachRect(
  container: SVGGContainer,
  x: number,
  y: number,
  insideCallback: RectCallback,
  outsideCallback?: RectCallback) {
  container.selectAll('rect')
    .each((data: HistogramData, i, nodes) => {
      const nodeSelection = select(nodes[i]);
      const node = nodes[i] as Element;
      const bb = node.getBoundingClientRect();
      const isInsideBB = bb.left <= x &&
        x <= bb.right &&
        bb.top <= y &&
        y <= bb.bottom;

      if (isInsideBB) {
        insideCallback(data, nodeSelection);
        return;
      }

      if (outsideCallback) {
        outsideCallback(data, nodeSelection);
      }
    });
}

export default { addTooltip };
