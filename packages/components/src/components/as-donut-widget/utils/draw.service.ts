import { SVGContainer } from '../types/Container';
import { ascending, descending } from 'd3-array';
import { arc as d3Arc, pie as d3Pie } from 'd3-shape';
import { color as d3Color } from 'd3-color';
import { event as d3event, select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import 'd3-transition';

const GREY_COLOR = '#e2e6e3';
const TRANSITION_DURATION = 500;
let pie;
let arc;
let donut;
let selectedItem;

export function renderDonut(
  container: SVGContainer,
  data: any,
  order: string,
  width: number,
  height: number,
  arcSize: number,
  padding: number,
  selected?: any,
  transition?: boolean,
  onMouseOver?,
  onMouseOut?,
  onMouseMove?,
  onClick?) {
  
  selectedItem = selected;

  const radius = Math.min(width, height);
  const center = radius / 2;

  if (order && order !== 'ascending' && order !== 'descending') { 
    throw new Error(`Airship: DonutChart: the order property can be 'ascending' or 'descending'`) 
  }

  pie = d3Pie()
    .sort((a: any, b: any) => 
      (!order) ? null : 
      (order === 'ascending') ?
      ascending(a.value, b.value) : descending(a.value, b.value))
    .value((d: any) => d.value).padAngle(0.01);  // TODO: check this  
  
  arc = d3Arc()
    .innerRadius((center - arcSize) - padding)
    .outerRadius(center - padding);

  donut = container.append('g')
    .attr('class', 'donut')
    .style('transform', 'translate(50%, 50%)')
    .selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('class', 'path')
    .attr('d', <any>arc)  // TODO: check this
    .attr('fill', (d: any) => (selectedItem && selectedItem.data.id !== d.data.id) ? GREY_COLOR : d.data.color)
    .style('cursor', 'pointer');

  // TODO: think different transitions for new data and updates
  if (transition) {
    donut.transition('enter-donut')
      .duration(TRANSITION_DURATION)
      .attrTween('d', (d: any) => {
        const interp = interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => arc(interp(t));
      });
  }

  donut.on('mouseover', function (d: any) {
    if (selectedItem) return;
    if (onMouseOver) onMouseOver(d.data, d3event.pageX, d3event.pageY);

    select(this)
      .transition('arc-fill-in')
      .duration(TRANSITION_DURATION)
      .attr('fill', <any>d3Color(d.data.color).darker(0.6));  // TODO: check this
  });

  donut.on('mousemove', function () {
    if (selectedItem) return;
    if (onMouseMove) onMouseMove(d3event.pageX, d3event.pageY);
  })

  donut.on('mouseout', function (d: any) {
    if (selectedItem) return;
    if (onMouseOut) onMouseOut();

    select(this)
      .transition('arc-fill-out')
      .duration(TRANSITION_DURATION)
      .attr('fill', d.data.color);
  });

  donut.on('click', function (d: any) {
    if (onMouseOut) onMouseOut();
    
    if (selectedItem && selectedItem.data.id === d.data.id) {
      selectedItem = null;
      if (onClick) onClick();
      unselectItem(container)
    } else {
      selectedItem = d;
      
      if (onClick) onClick(d);
      selectItem(container, selectedItem)
    }
  })
}

function selectItem(svg: SVGContainer, selected: any) {
  selectedItem = selected;

  svg.selectAll('.donut path')
    .transition('arc-fill-in-out')
    .duration(TRANSITION_DURATION)
    .attr('fill', (d: any) => {
      if (selectedItem.data.id === d.data.id) {
        return selectedItem.data.color;
      } else {
        return GREY_COLOR;
      }
    })
}

function unselectItem(svg: SVGContainer) {
  selectedItem = null;

  svg.selectAll('.donut path')
    .transition('arc-fill-in-out')
    .duration(TRANSITION_DURATION)
    .attr('fill', (d: any) => d.data.color);
}

export default {
  renderDonut,
  selectItem,
  unselectItem
};