import { extent } from 'd3-array';
import { axisTop, axisRight, axisBottom, axisLeft, AxisDomain } from 'd3-axis';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import readableNumber from '../../../utils/readable-number';


export function renderAxis(
  svgElement: SVGElement,
  domain: [],
  type: string,
  _scale: string,
  margin: any,
  timeFormatString: string,
  tickPadding: number,
  tickSize: number,
  tickSizeInner: number,
  tickSizeOuter: number
): SVGGElement {
  const element = select(svgElement);
  const outerWidth = element.node().getBoundingClientRect().width;
  const outerHeight = element.node().getBoundingClientRect().height;
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;
  const yTickSize = - width + 30;
  const formatTime = timeFormat(timeFormatString);

  element.attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);


  let scale;

  switch (_scale) {
    case 'scaleLinear':
      scale = scaleLinear().domain(domain);
      break;
    case 'scaleTime':
      const dd = domain.map(item => new Date(item))
      scale = scaleTime().domain(extent(dd, (d) => d));
      break;
  }

  let Axis;

  switch (type) {
    case 'axisTop':
      scale.range([0, width]);
      Axis = axisBottom(scale).tickPadding(-13);

      if (_scale === 'scaleTime') {
        Axis.tickFormat((d) => `${formatTime(d)}`)  // TODO: why red?!
          .tickSizeOuter(0)
          .ticks(null);
      } else {
        Axis.tickFormat((d) => `${readableNumber(d)}`)
          .tickSizeInner(yTickSize)
          .tickSizeOuter(0)
          .ticks(6);
      }
      break;
    case 'axisRight':
      scale.range([height, 0]);
      Axis = axisRight(scale)
        .tickFormat((d) => `${readableNumber(d)}`)
        .tickSizeInner(yTickSize)
        .tickSizeOuter(0)
        .ticks(6);  // TODO: as prop
      break;
    case 'axisBottom':
      scale.range([0, width]);
      Axis = axisBottom(scale);

      if (_scale === 'scaleTime') {
        Axis.tickFormat((d) => `${formatTime(d)}`)  // TODO: why red?!
          .tickSizeOuter(0)
          .ticks(null);
      } else {
        Axis.tickFormat((d) => `${readableNumber(d)}`)
          .tickSizeInner(yTickSize)
          .tickSizeOuter(0)
          .ticks(6);
      }
      break;
    case 'axisLeft':
      scale.range([height, 0]);
      Axis = axisLeft(scale)
        .tickFormat((d) => `${readableNumber(d)}`)
        .tickSizeInner(yTickSize)
        .tickSizeOuter(0)
        .ticks(6);  // TODO: as prop
      break;
  }

  element.selectAll('g.as-axis').remove()
  if (element.select('.as-axis').empty()) {
    _createAxisElement(element, type, width, height, margin).call(Axis);
  } else {
    element.select('.as-axis').call(Axis);
  }

  element.selectAll('.tick text')
    .attr('lengthAdjust', 'spacing');

  return svgElement.querySelector('g.as-axis');
}

function _createAxisElement(element: Selection<Element, {}, null, undefined>, type: string, width: number, height: number, margin: any) {
  const left = type === 'axisRight' ? width : margin.left;
  const top = type === 'axisBottom' ? height : margin.top;

  return element.append('g')
    .attr('transform', 'translate(' + left + ',' + top + ')')
    .attr('class', (type === 'axisLeft' || type === 'axisRight') ? 'as-axis y-axis' : 'as-axis x-axis');
}

export default { renderAxis };
