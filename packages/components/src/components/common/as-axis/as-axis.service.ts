import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis';
import { select, Selection } from 'd3-selection';
import readableNumber from '../../../utils/readable-number';


export function renderAxis(
  svgElement: SVGElement, 
  domain: [number, number], 
  type: string, 
  scale: any,
  tickPadding: number,
  tickSize: number,
  tickSizeInner: number,
  tickSizeOuter: number
): SVGGElement {
  const padding = { top: 20, right: 20, bottom: 20, left: 20 };
  const element = select(svgElement);
  const height = element.node().getBoundingClientRect().height - padding.top - padding.bottom;
  const width = element.node().getBoundingClientRect().width - padding.left - padding.right;
  const range = (type === 'axisRight' || type === 'axisLeft') ? [height, 0] : [domain[0], width]
  

  const yScale = scale()
    .domain(domain)
    .range(range);

  let Axis;

  switch (type) {
    case 'axisTop':
      Axis = axisTop(yScale)
      break;
    case 'axisRight':
      Axis = axisRight(yScale)
      break;
    case 'axisBottom':
      Axis = axisBottom(yScale)
      break;
    case 'axisLeft':
      Axis = axisLeft(yScale)
      break;
  }

  // Axis.tickSizeInner(TICK_SIZE + TICK_RIGHT_MARGIN)
  
  Axis.tickPadding(tickPadding)
    .tickSize(tickSize)
    .tickSizeInner(tickSizeInner)
    .tickSizeOuter(tickSizeOuter)
    
  Axis.ticks(6)
    .tickFormat((d) => `${readableNumber(d)}`);

  if (element.select('.axis').empty()) {
    _createAxisElement(element, type).call(Axis);
  } else {
    element.select('.axis').call(Axis);
  }

  element.selectAll('.tick text')
    .attr('lengthAdjust', 'spacing');

  return svgElement.querySelector('g.axis');
}

function _createAxisElement(element: Selection<Element, {}, null, undefined>, type: string) {
  const margin = {top: 20, right: 20, bottom: 20, left: 20};

  return element.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('class', type === 'V' ? 'axis y-axis' : 'axis x-axis');
}

export default { renderAxis };
