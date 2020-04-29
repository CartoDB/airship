import { Axis, axisBottom } from 'd3-axis';
import { axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { AxisOptions, HistogramData } from '../interfaces';
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
  disableAnimation: boolean = false,
  className: string = '') {

  if (!container || !container.node()) {
    return;
  }

  let barsSeparation = 1;
  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;

  data = data === null ? [] : data;
  const barWidth = data.length === 0 ? WIDTH : WIDTH / data.length;

  if (barWidth - barsSeparation < BAR_WIDTH_THRESHOLD) {
    barsSeparation = 0;
  }

  // -- Draw bars
  this.bars = barsContainer
    .selectAll(`rect.${className}`)
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
      .attr('class', `bar ${className}`)
      .attr('x', (_d: HistogramData, index: number) => index * barWidth)
      .attr('width', () => Math.max(0, barWidth - barsSeparation))
      .style('fill', (d: HistogramData) => d.color || color);

  const minDomain = yScale.domain()[0];
  const yZero = yScale(Math.max(0, minDomain));

  (disableAnimation ? mergeSelection : mergeSelection.transition().delay(_delayFn))
    .attr('height', (d: HistogramData) => {
      return Math.abs(yScale(d.value) - yZero);
    })
    .attr('y', (d: HistogramData) => d.value > 0 ? yScale(d.value) : yZero);

  // -- Update
  (disableAnimation ? this.bars : this.bars.transition().delay(_delayFn))
    .attr('height', (d: HistogramData) => {
      return Math.abs(yScale(d.value) - yZero);
    })
    .attr('y', (d: HistogramData) => d.value > 0 ? yScale(d.value) : yZero);
}

export function renderXAxis(
  container: SVGContainer,
  domain: Domain,
  bins: number,
  X_PADDING: number,
  Y_PADDING: number,
  customFormatter: (value: Date | number, domainPrecision: number) => string = conditionalFormatter,
  axisOptions: AxisOptions): Axis<{ valueOf(): number }> {

  if (!container || !container.node()) {
    return;
  }

  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;
  // Display first, last and middle point bins
  const tickValues = [0, bins / 2, bins];
  const tickPadding = axisOptions.padding !== undefined ? axisOptions.padding : 13;
  const ticks = axisOptions.ticks !== undefined ? axisOptions.ticks : tickValues.length;

  const xScale = scaleLinear()
    .domain([0, bins])
    .range([0, WIDTH]);

  const realScale = scaleLinear()
    .domain(domain)
    .range([0, bins]);

  let xAxis;

  // Get domain precision for formatter in case of numbers
  const domainPrecision = getDomainPrecision(domain);

  if (axisOptions.values || axisOptions.format) {
    const altScale = scaleLinear()
      .domain(domain)
      .range([0, WIDTH]);

    xAxis = axisBottom(altScale)
      .tickValues(axisOptions.values || null)
      .tickFormat(axisOptions.format || customFormatter);
  } else {
    xAxis = axisBottom(xScale)
      // tickValues has precedence over ticks, must set null if user wants custom tick number
      .tickValues(ticks !== undefined ? null : tickValues)
      .tickFormat((value) => {
        const realValue = realScale.invert(value);
        return customFormatter(realValue, domainPrecision);
      });
  }

  xAxis
    .tickSize(-HEIGHT)
    .tickPadding(tickPadding)
    .ticks(ticks);

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
  yAxis: Axis<{ valueOf(): number }>,
  X_PADDING: number) {

  if (!container || !container.node()) {
    return;
  }

  if (container.select('.y-axis').empty()) {
    container
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
  } else {
    container.select('.y-axis')
      .call(yAxis);
  }

  // 0 line
  container
    .select('.y-axis')
    .append('g')
    .attr('class', 'tick')
    .attr('opacity', '1')
    .attr('transform', `translate(0,${yAxis.scale()(0)})`)
    .append('line')
    .attr('shape-rendering', 'crisp')
    .attr('stroke', '#000')
    .attr('class', 'zero')
    .attr('x2', container.node().getBoundingClientRect().width - X_PADDING);
}

export function generateYScale(
  container: SVGContainer,
  domain: Domain,
  X_PADDING: number,
  Y_PADDING: number,
  axisOptions: AxisOptions) {

  if (!container || !container.node()) {
    return;
  }

  const HEIGHT = container.node().getBoundingClientRect().height - Y_PADDING;
  const WIDTH = container.node().getBoundingClientRect().width - X_PADDING;
  const ticks = axisOptions.ticks !== undefined ? axisOptions.ticks : 5;
  const tickPadding = axisOptions.padding !== undefined ? axisOptions.padding : 10;

  // -- Y Axis
  const yScale = scaleLinear()
    .domain(domain)
    .range([HEIGHT, 0]);

  const yAxis = axisLeft(yScale)
    .tickSize(-WIDTH)
    .ticks(ticks)
    .tickPadding(tickPadding)
    .tickFormat(axisOptions.format || conditionalFormatter)
    .tickValues(axisOptions.values || null);

  return yAxis;
}

function _delayFn(_d, i) {
  return i;
}

function getFloatPrecision(value) {
  const expValue = value.toString();
  const expPos = expValue.indexOf('.');
  return expPos > -1 ? expValue.length - (expPos + 1) : 0;
}

function getDomainPrecision(domain) {
  let domainPrecision = 0;
  if (Number.isFinite(domain[0])) {
    const domainDiff = domain[domain.length - 1] as number - domain[0];
    const domainDiffPrecision = getFloatPrecision(domainDiff);
    if (domainDiff > 1 && domainDiffPrecision > 1) {
      domainPrecision = 1;
    } else if (domainDiff < 1) {
      domainPrecision = domainDiffPrecision;
    }
  }

  return domainPrecision;
}

export function conditionalFormatter(value, domainPrecision = 0) {
  // Until we really need to use kilo or milli, we will not use SI prefixes
  if (value > -100 && value < 100 && domainPrecision < 3) {
      return decimalFormatter(value);
  }

  return formatter(value);
}

export default {
  cleanAxes,
  conditionalFormatter,
  generateYScale,
  renderBars,
  renderPlot,
  renderXAxis,
  renderYAxis,
  updateAxes
};
