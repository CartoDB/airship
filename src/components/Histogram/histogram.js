import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { select, event } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max, range } from 'd3-array';
import { axisLeft } from 'd3-axis';
import 'd3-transition';
import Base from '../Typography/base';
import { theme } from '../../constants';
import { readableNumber } from '../../utils';

const WIDTH = 205;
const HEIGHT = 125;
const DIVISION_WIDTH = 80;
const BARS_SEPARATION = 1;
const MARGIN = {
  TOP: 15,
  RIGHT: 3,
  BOTTOM: 20,
  LEFT: 40,
};

const Tooltip = styled.div`
  position: absolute;
  background: ${props => props.theme.black};
  border-radius: 4px;
  padding: 0.5rem;
  opacity: 0;
  z-index: 100;
`;
Tooltip.displayName = 'Tooltip';
Tooltip.defaultProps = {
  theme,
};

const TooltipValue = Base.extend`
  font-size: 14px;
  line-height: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  width: 100%;
  cursor: default;
  color: ${props => props.theme.white};
`;
TooltipValue.defaultProps = {
  theme,
};

const Svg = styled.svg.attrs({
  viewBox: '0 0 248 160',
})`
  .tick {
    line {
      opacity: 0.1;
      stroke: ${props => props.theme.type02};
    }

    :first-child {
      line {
        opacity: 0.5;
      }
    }
  }

  .bar {
    fill: ${props => props.color || props.theme.brand03};
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s linear;

    :hover {
      fill: ${props => darken(0.16, props.color || props.theme.brand03)};
    }
  }

  text {
    font-size: 10px;
    font-weight: 300;
    fill: ${props => props.theme.type01};
    font-family: Roboto, sans-serif};
    -webkit-font-smoothing: antialiased;
  }
`;
Svg.defaultProps = {
  theme,
};

class Histogram extends Component {
  static defaultProps = {
    data: [],
  };

  static propTypes = {
    color: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number,
      value: PropTypes.number,
    })),
  };

  state = {
    tooltip: null,
  }

  componentDidMount() {
    this.renderYAxis();
    this.renderXAxis();

    this.barsContainer = this.container
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this.renderBars();
  }

  componentDidUpdate() {
    this.updateAxis();
    this.renderBars();
  }

  renderXAxis() {
    const { data } = this.props;
    const { start } = data[0];
    const { end } = data[data.length - 1];
    const divisions = Math.round(WIDTH / DIVISION_WIDTH);
    const step = WIDTH / divisions;
    const stop = WIDTH + step;

    // -- X Axis
    this.xScale = scaleLinear()
      .domain([start, end])
      .range([0, WIDTH]);

    this.xAxis = range(0, stop, step).slice(0, divisions + 1);

    this.xAxisSelection = this.container
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
      .selectAll('text')
      .data(this.xAxis)
      .enter()
      .append('text')
      .attr('x', d => d)
      .attr('y', () => HEIGHT + 15)
      .attr('text-anchor', (d, index) => {
        if (index === 0) return 'start';
        if (index === (this.xAxis.length - 1)) return 'end';

        return 'middle';
      })
      .text(d => readableNumber(this.xScale.invert(d)));
  }

  renderYAxis() {
    const { data } = this.props;

    // -- Y Axis
    this.yScale = scaleLinear()
      .range([HEIGHT, 0])
      .domain([0, max(data, d => d.value)])
      .nice();

    this.yAxis = axisLeft(this.yScale)
      .tickSize(-WIDTH, 0, 0)
      .ticks(5);

    this.yAxisSelection = this.container
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border
  }

  renderBars() {
    const { data } = this.props;
    const barWidth = WIDTH / data.length;

    // -- Draw bars
    this.bars = this.barsContainer
      .selectAll('rect')
      .data(data);

    // -- Exit
    this.bars.exit().remove();

    // -- Enter
    this.bars
      .enter()
      .append('rect')
      .on('mouseout', () => this.setState({ tooltip: null }))
      .on('mouseenter', d => {
        this.setState(
          { tooltip: { d } },
          () => this.showTooltip(event.layerX, event.layerY)
        );
      })
      .on('mousemove', () => {
        select(this.tooltipNode).style('opacity', 0);
        this.showTooltip(event.layerX, event.layerY);
      })
      .merge(this.bars)
      .attr('class', 'bar')
      .attr('y', HEIGHT)
      .attr('x', (d, index) => index * barWidth)
      .attr('width', () => Math.max(0, barWidth - BARS_SEPARATION))
      .attr('height', 0)
      .transition()
      .delay(200)
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => HEIGHT - this.yScale(d.value));

    // -- Update
    this.bars
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => HEIGHT - this.yScale(d.value));
  }

  updateAxis() {
    const { data } = this.props;
    const { start } = data[0];
    const { end } = data[data.length - 1];

    // -- Update scales
    this.yScale
      .domain([0, max(data, d => d.value)])
      .nice();

    this.xScale
      .domain([start, end]);

    // -- Update axis
    this.xAxisSelection
      .text(d => readableNumber(this.xScale.invert(d)));

    this.yAxisSelection
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border
  }

  getTooltipPosition(mouseX, mouseY) {
    const OFFSET = 25;
    let x = mouseX;
    let y = mouseY;

    const viewportBoundaries = {
      right: window.innerWidth + window.pageXOffset,
      bottom: window.innerHeight + window.pageYOffset,
    };

    const tooltipContainerBoundingRect = this.tooltipNode.getBoundingClientRect();

    const tooltipBoundaries = {
      right: mouseX + tooltipContainerBoundingRect.width,
      bottom: mouseY + tooltipContainerBoundingRect.height,
    };

    if (viewportBoundaries.right < tooltipBoundaries.right) {
      x = mouseX - tooltipContainerBoundingRect.width;
    }

    if (viewportBoundaries.bottom < tooltipBoundaries.bottom) {
      y = mouseY - tooltipContainerBoundingRect.height - OFFSET;
    }

    return [x, y];
  }

  showTooltip(mouseX, mouseY) {
    const [x, y] = this.getTooltipPosition(mouseX, mouseY);

    select(this.tooltipNode)
      .style('opacity', 1)
      .style('left', `${x + 10}px`)
      .style('top', `${y + 20}px`);
  }

  renderTooltip() {
    const { d } = this.state.tooltip;

    return (
      <Tooltip innerRef={node => { this.tooltipNode = node; }}>
        <TooltipValue>{readableNumber(d.value)}</TooltipValue>
      </Tooltip>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Svg innerRef={node => { this.container = select(node); }} {...this.props} />
        {this.state.tooltip && this.renderTooltip()}
      </React.Fragment>
    );
  }
}

export default Histogram;
