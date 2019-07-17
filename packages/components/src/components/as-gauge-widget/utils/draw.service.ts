import { SVGContainer } from '../types/Container';
import { color as d3Color } from 'd3-color';
import { format as d3Format } from 'd3-format';
import { event as d3Event, select, selectAll } from 'd3-selection';
import { interpolate as d3Interpolate, interpolateNumber } from 'd3-interpolate';
import 'd3-transition';

const GREY_COLOR = '#e2e6e3';
const TRANSITION_DURATION = 500;
const BASE_COLOR = '#80b622';
let curColor;
let nextColor;
let holdColor;

/**
 * Renders the background arc
 */
export function renderBackground(container: SVGContainer, arc: any) {
  container.select('g')
    .append('path')
    .datum({ endAngle: 90 * (Math.PI / 180) })
    .attr('class', 'background')
    .style('fill', GREY_COLOR)
    .attr('d', arc);
}

/**
 * Renders the data arc
 */
export function renderForeground(
  container: SVGContainer,
  arc: any,
  onMouseOver?,
  onMouseMove?,
  onMouseOut?
) {
  const foreground = container.select('g')
    .append('path')
    .datum({ endAngle: -90 * (Math.PI / 180) })
    .attr('class', 'foreground')
    .style('cursor', 'pointer')
    .style('fill', BASE_COLOR)
    .attr('d', arc);

  foreground.on('mouseover', function (d: any) {
    if (onMouseOver) onMouseOver(d.data, d3Event.pageX, d3Event.pageY);

    select(this)
      .transition()
      .duration(500)
      .attr('fill', () => d3Color(BASE_COLOR).darker(0.6))
  });

  foreground.on('mousemove', function () {
    if (onMouseMove) onMouseMove(d3Event.pageX, d3Event.pageY);
  });

  foreground.on('mouseout', function () {
    if (onMouseOut) onMouseOut();

    select(this)
      .transition('arc-fill-out')
      .duration(250)
      .attr('fill', BASE_COLOR);
  });

  return foreground;
}

export function renderThresholds(
  container: SVGContainer,
  threshold: Array<any>,
  min: number,
  max: number,
  innerRadius: number,
  outerRadius: number
) {
  selectAll('line.threshold').remove();

  threshold.forEach((t) => {
    const angle = Math.PI * (t.value - min) / (max - min);
    const x0 = (innerRadius * Math.cos(angle));
    const y0 = (innerRadius * Math.sin(angle));
    const x1 = (outerRadius * Math.cos(angle));
    const y1 = (outerRadius * Math.sin(angle));

    container.select('g')
      .append('line')
      .attr('x1', -x0)
      .attr('y1', -y0)
      .attr('x2', -x1)
      .attr('y2', -y1)
      .attr('class', 'threshold-base')
      .style('stroke-width', 4)
      .style('stroke', '#ffffff');

    container.select('g')
      .append('line')
      .attr('x1', -x0)
      .attr('y1', -y0)
      .attr('x2', -x1)
      .attr('y2', -y1)
      .attr('class', 'threshold-color')
      .style('stroke-width', 1)
      .style('stroke', t.color);
  });
}

export function renderTicks(
  container: SVGContainer,
  min: number,
  max: number,
  innerRadius: number,
  outerRadius: number,
  absolute: boolean,
  format?: string
) {
  const mn = (format && min !== 0) ? d3Format(format)(min) : min;
  const mx = format ? d3Format(format)(max) : max;

  container.select('g')
    .append('text')
    .attr('class', 'tick')
    .attr('transform', `translate(${-(innerRadius + ((outerRadius - innerRadius) / 2))}, 16)`)
    .attr('text-anchor', 'middle')
    .text(() => absolute ? mn : '0');

  container.select('g')
    .append('text')
    .attr('class', 'tick')
    .attr('transform', `translate(${(innerRadius + ((outerRadius - innerRadius) / 2))}, 16)`)
    .attr('text-anchor', 'middle')
    .text(() => absolute ? mx : '100%');
}

export function update(
  el: HTMLStencilElement,
  value: number,
  min: number,
  max: number,
  arc: any,
  foreground: any,
  threshold: Array<any>
) {
  const num = ((value - min) * 180) / (max - min);
  const rad = Math.floor(num - 89) * (Math.PI / 180);

  if (threshold) {
    for (let i = 0; i < threshold.length; i++) {
      if (value >= threshold[i].value) {
        curColor = threshold[i].color;
        break;
      } else {
        curColor = BASE_COLOR;
      }
    }
  }

  foreground.transition()
    .duration(TRANSITION_DURATION)
    .attrTween('d', (d) => {
      const interpolate = d3Interpolate(d.endAngle, rad)
      return (t) => {
        d.endAngle = interpolate(t)
        return arc(d)
      }
    })
    .on('start', () => {
      select(el).select('.foreground')
        .transition('arc-fill-out')
        .duration(TRANSITION_DURATION)
        .style('fill', threshold ? curColor : BASE_COLOR);
    })
    .on('end', () => {
      // Set colors for next transition
      holdColor = curColor;
      curColor = nextColor;
      nextColor = holdColor;
    })

}

export function updateLabel(
  el: HTMLStencilElement,
  value: number,
  min: number,
  max: number
) {
  const percentage = Math.floor((value - min) / (max - min) * 100);

  select(el).select('.as-gauge-label-value')
    .transition()
    .tween('text', function () {
      const selection = select(this)
      const start = select(this).text()
      const end = Math.floor(percentage)
      const interpolator = interpolateNumber(Number(start), end)

      return (t) => {
        selection.text(Math.round(interpolator(t)))
      }
    })
    .duration(TRANSITION_DURATION);
}

export default {
  renderBackground,
  renderForeground,
  renderThresholds,
  renderTicks,
  update,
  updateLabel
};