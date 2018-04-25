import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { select, event } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { axisLeft } from 'd3-axis';
import 'd3-transition';
import Base from '../Typography/base';
import { theme } from '../../constants';
import { readableNumber } from '../../utils';

const WIDTH = 208;
const HEIGHT = 140;
const MARGIN = {
  TOP: 15,
  RIGHT: 0,
  BOTTOM: 5,
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

    text {
      fill: ${props => props.theme.type02};
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
    data: PropTypes.array,
  };

  state = {
    tooltip: null,
  }

  componentDidMount() {
    this.renderAxis();

    this.barsContainer = this.container
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this.renderBars();
  }

  componentDidUpdate() {
    this.updateAxis();
    this.renderBars();
  }

  updateAxis() {
    const { data } = this.props;

    this.yScale
      .domain([0, max(data, d => d.value)])
      .nice();

    this.xScale
      .domain(data.map(d => d.name));

    this.yAxisSelection
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border
  }

  renderAxis() {
    const { data } = this.props;

    // -- X Axis
    this.xScale = scaleBand()
      .paddingInner(0.05)
      .paddingOuter(0.1)
      .domain(data.map(d => d.name))
      .range([0, WIDTH]);

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
    // -- Draw bars
    this.bars = this.barsContainer
      .selectAll('rect')
      .data(this.props.data);

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
      .attr('x', d => this.xScale(d.name))
      .attr('width', () => this.xScale.bandwidth())
      .transition()
      .delay(200)
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => HEIGHT - this.yScale(d.value));

    // -- Update
    this.bars
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => HEIGHT - this.yScale(d.value));
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
