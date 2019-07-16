import { SVGContainer } from '../types/Container';
import { arc as d3Arc } from 'd3-shape';
import { color as d3Color } from 'd3-color';
import { event as d3event, select, selectAll } from 'd3-selection';
import { interpolate as d3Interpolate, interpolateNumber } from 'd3-interpolate';
import 'd3-transition';

const GREY_COLOR = '#e2e6e3';
const TRANSITION_DURATION = 500;
let pie;
let arc;
let gauge;

export function renderGauge(
  container: SVGContainer,
  data: any,
  min: number,
  max: number,
  threshold: [],
  w: number,
  h: number,
  arcSize: number,
  padding: number,
  transition?: boolean,
  onMouseOver?,
  onMouseOut?,
  onMouseMove?
) {

  const margin = { top: 12, right: 16, bottom: 30, left: 16 };
  const width = w - margin.left - margin.right;
  const height = h - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2;
  const outerRadius = (width / 2) - padding;
  const innerRadius = ((width / 2) - arcSize) - padding;

  const initialValue = 0;
  const labelTitleText = 'Level'
  const measure = 'liters'
  const symbol = '%'
  let currentValue = data;
  let curColor;
  let nextColor;
  let holdColor;
  let inTransition = false;
  let baseColor = '#80b622'

  arc = d3Arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(-90 * (Math.PI / 180));

  container.append('g')
    .style('transform', `translate(50%, calc(50% + ${outerRadius / 2}px))`);

  // Append background arc to svg
  const background = container.select('g')
    .append('path')
    .datum({ endAngle: 90 * (Math.PI / 180) })
    .attr('class', 'background')
    .style('fill', '#ddd')
    .attr('d', arc)
    .on('mouseover', function () {
      // hideTooltip()
    });

  // Append foreground arc to svg
  const foreground = container.select('g')
    .append('path')
    .datum({ endAngle: -90 * (Math.PI / 180) })
    .attr('class', 'foreground')
    .style('cursor', 'pointer')
    .style('fill', curColor)
    .attr('d', arc);

  foreground.on('mouseover', function () {
    if (inTransition) return

    // showTooltip()

    select(this)
      .transition()
      .duration(500)
      .attr('fill', () => d3Color(curColor).darker(0.6))
  })

  foreground.on('mousemove', function () {
    if (inTransition) return

    // moveTooltip()
  })

  foreground.on('mouseout', function () {
    if (inTransition) return

    // hideTooltip()

    select(this)
      .transition('arc-fill-out')
      .duration(250)
      .attr('fill', curColor)
  })

  const label = select('.wrapper')
    .append('div')
    .attr('class', 'label')
    .style('transform', `translate3d(-50%, calc(100% - ${margin.bottom / 2}px), 0)`)

  label.append('p')
    .attr('class', 'label-title')
    .style('max-width', (radius - arcSize) + 'px')
    .text(labelTitleText)

  const labelWrapper = label.append('span')
    .attr('class', 'label-value-wrapper')

  labelWrapper.append('p')
    .attr('class', 'label-value')
    .text(initialValue)

  labelWrapper.append('p')
    .attr('class', 'symbol')
    .text(symbol)

  const tooltip = select('.wrapper')
    .append('div')
    .attr('class', 'tooltip')

  render(currentValue);
  renderThresholds();
  renderTicks();

  function render(value) {
    currentValue = value
    const percentage = Math.floor((currentValue - min) / (max - min) * 100)
    const num = ((currentValue - min) * 180) / (max - min)
    const rad = Math.floor(num - 89) * (Math.PI / 180)

    // Get new color
    for (let i = 0; i < threshold.length; i++) {
      console.log(threshold[i].color);
      
      if (currentValue >= threshold[i].value) {
        nextColor = threshold[i].color
        break
      } else {
        nextColor = baseColor
      }
    }

    // Text transition
    label.select('.label-value')
      .transition()
      .tween('text', function () {
        const selection = select(this)
        const start = Number(select(this).text())
        const end = Math.floor(percentage)
        const interpolator = interpolateNumber(start, end)

        return (t) => {
          selection.text(Math.round(interpolator(t)))
        }
      })
      .duration(500)

    // Arc Transition
    foreground.transition()
      .duration(500)
      .attrTween('d', (d) => {
        const interpolate = d3Interpolate(d.endAngle, rad)
        return (t) => {
          d.endAngle = interpolate(t)
          return arc(d)
        }
      })
      .on('start', () => {
        select('.foreground')
          .transition('arc-fill-out')
          .duration(500)
          .attr('fill', curColor)
      })
      .on('end', () => { inTransition = false })

    // Set colors for next transition
    holdColor = curColor
    curColor = nextColor
    nextColor = holdColor
  }

  function renderThresholds() {
    selectAll('line.threshold').remove()

    threshold.forEach((t) => {
      const angle = Math.PI * (t.value - min) / (max - min)
      const x0 = (innerRadius * Math.cos(angle))
      const y0 = (innerRadius * Math.sin(angle))
      const x1 = (outerRadius * Math.cos(angle))
      const y1 = (outerRadius * Math.sin(angle))

      container.select('g')
        .append('line')
        .attr('x1', -x0)
        .attr('y1', -y0)
        .attr('x2', -x1)
        .attr('y2', -y1)
        .attr('class', 'threshold-base')
        .style('stroke-width', 4)
        .style('stroke', '#ffffff')

      container.select('g')
        .append('line')
        .attr('x1', -x0)
        .attr('y1', -y0)
        .attr('x2', -x1)
        .attr('y2', -y1)
        .attr('class', 'threshold-color')
        .style('stroke-width', 1)
        .style('stroke', t.color)
    })
  }

  function renderTicks() {
    // @note:  que mostramos en los ticks?
    // el valor máximo formateado o de 0 a 100%
    // Esto también puede ser configurable?¿
    const maxTick = container.select('g')
      .append('text')
      .attr('class', 'tick')
      .attr('transform', `translate(${(innerRadius + ((outerRadius - innerRadius) / 2))}, 16)`)
      .attr('text-anchor', 'middle')
      .text(() => {
        return '100%'
      })

    const minTick = container.select('g')
      .append('text')
      .attr('class', 'tick')
      .attr('transform', `translate(${-(innerRadius + ((outerRadius - innerRadius) / 2))}, 16)`)
      .attr('text-anchor', 'middle')
      .text(() => {
        return '0'
      })
  }
}

export default {
  renderGauge
};