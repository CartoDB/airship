import { Axis, axisBottom } from 'd3-axis';
import { axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { HistogramData } from '../interfaces';
import { SVGContainer, SVGGContainer } from '../types/Container';
import { Domain } from '../types/Domain';

const BAR_WIDTH_THRESHOLD = 3;
const formatter = format('.2~s');
const decimalFormatter = format('.2');

export function cleanAxes(yAxisSelection: SVGGContainer) {
  yAxisSelection.select('.domain').remove();
}

export function updateAxes(
  container: SVGContainer,
  xScale: ScaleLinear<number, number>,
  yScale: ScaleLinear<number, number>,
  xAxis: Axis<{ valueOf(): number }>,
  yAxis: Axis<{ valueOf(): number }>,
  xDomain: Domain,
  yDomain: Domain) {

  const xAxisSelection: SVGContainer = container.select('.xAxis');
  const yAxisSelection: SVGContainer = container.select('.yAxis');

  // -- Update scales
  yScale
    .domain(yDomain)
    .nice();

  xScale
    .domain(xDomain);

  // -- Update axes
  xAxisSelection
    .call(xAxis);

  yAxisSelection
    .call(yAxis);
}

export function renderPlot(container: SVGContainer): SVGGContainer {
  if (container.select('.plot').empty()) {
    const barsContainer = container
      .append<SVGGElement>('g');
    barsContainer
      .attr('class', 'plot');

    return barsContainer;
  }

  return container.select('.plot');
}

export function renderBars(
  data: HistogramData[],
  yScale: ScaleLinear<number, number>,
  container: SVGContainer,
  barsContainer: SVGGContainer,
  color: string,
  X_PADDING: number,
  Y_PADDING: number,
  disableAnimation: boolean = false) {

  if (!container || !container.node()) {
    return;
  }

  let barsSeparation = 1;
  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;

  const barWidth = data.length === 0 ? WIDTH : WIDTH / data.length;

  if (barWidth - barsSeparation < BAR_WIDTH_THRESHOLD) {
    barsSeparation = 0;
  }

  // -- Draw bars
  this.bars = barsContainer
    .selectAll('rect')
    .data(data);

  // -- Exit
  this.bars.exit().remove()
  .transition()
  .duration(200);

  // -- Enter
  const mergeSelection = this.bars
      .enter()
      .append('rect')
      .attr('y', HEIGHT)
      .attr('height', 0)
      .merge(this.bars)
      .attr('class', 'bar')
      .attr('x', (_d: HistogramData, index: number) => index * barWidth)
      .attr('width', () => Math.max(0, barWidth - barsSeparation))
      .style('fill', (d: HistogramData) => d.color || color);

  (disableAnimation ? mergeSelection : mergeSelection.transition().delay(_delayFn))
    .attr('height', (d: HistogramData) => HEIGHT - yScale(d.value))
    .attr('y', (d: HistogramData) => yScale(d.value));

  // -- Update
  (disableAnimation ? this.bars : this.bars.transition().delay(_delayFn))
    .attr('height', (d) => HEIGHT - yScale(d.value))
    .attr('y', (d) => yScale(d.value));
}

export function renderXAxis(
  container: SVGContainer,
  domain: Domain,
  bins: number,
  X_PADDING: number,
  Y_PADDING: number,
  customFormatter: (value: Date | number) => string = _conditionalFormatter): Axis<{ valueOf(): number }> {

  if (!container || !container.node()) {
    return;
  }

  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;

  // Display first, last and middle point bins
  const ticks = [0, bins / 2, bins];

  const xScale = scaleLinear()
    .domain([0, bins])
    .range([0, WIDTH]);

  const realScale = scaleLinear()
    .domain(domain)
    .range([0, bins]);

  const xAxis = axisBottom(xScale)
    .tickSize(-HEIGHT)
    .tickValues(ticks)
    .tickPadding(10)
    .tickFormat((value) => {
      const realValue = realScale.invert(value);

      return customFormatter(realValue);
    });

  if (container.select('.x-axis').empty()) {
    container
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${HEIGHT})`)
      .call(xAxis);
  } else {
    container
      .select('.x-axis')
      .attr('transform', `translate(0, ${HEIGHT})`)
      .call(xAxis);
  }

  container.selectAll('.x-axis text')
    .attr('transform', (_d, i, collection) => {
      const node = collection[i];
      const { width } = (node as SVGTextElement).getBoundingClientRect();
      let xOffset = 0;

      if (i === 0) {
        xOffset = width / 2;
      } else if (i === collection.length - 1) {
        xOffset = -width / 2;
      }

      return `translate(${xOffset})`;
    })
    .attr('opacity', (_d, i, collection) => {
      // We never hide the first or the last text node
      if (i === 0 || i === collection.length - 1) {
        return 1;
      }

      let textWidth = 0;
      const textElements = (collection as SVGTextElement[]);


      for (const textEl of textElements) {
        textWidth += textEl.getBoundingClientRect().width;
      }

      // Hide all other text nodes when there's not enough space
      if (WIDTH - textWidth < 0) {
        return 0;
      }

      return 1;
    });

  return xAxis;
}

export function renderYAxis(
  container: SVGContainer,
  domain: Domain,
  X_PADDING: number,
  Y_PADDING: number): Axis<{ valueOf(): number }> {

  if (!container || !container.node()) {
    return;
  }


  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;

  // -- Y Axis
  const yScale = scaleLinear()
    .domain(domain)
    .range([HEIGHT, 0])
    .nice();

  const yAxis = axisLeft(yScale)
    .tickSize(-WIDTH)
    .ticks(5)
    .tickPadding(10)
    .tickFormat(_conditionalFormatter);

  if (container.select('.y-axis').empty()) {
    container
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
  } else {
    container.select('.y-axis')
      .call(yAxis);
  }

  return yAxis;
}

function _delayFn(_d, i) {
  return i;
}

function _conditionalFormatter(value) {
  if (value > 0 && value < 1) {
    return decimalFormatter(value);
  }

  return formatter(value);
}

export default { cleanAxes, updateAxes, renderBars, renderXAxis, renderYAxis, renderPlot };
