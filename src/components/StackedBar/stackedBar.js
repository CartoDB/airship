import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { select, selectAll, mouse, event } from 'd3-selection'; // eslint-disable-line
import { stack, stackOrderNone } from 'd3-shape';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max } from 'd3-array'; // eslint-disable-line
import { transition } from 'd3-transition'; // eslint-disable-line
import { axisBottom, axisLeft } from 'd3-axis'; // eslint-disable-line
import { chartColors } from '../../constants';
import Base from '../Typography/base';

const Tooltip = styled.ul`
  position: absolute;
  background: rgba(17, 17, 17, 0.9);
  border-radius: 4px;
  padding: 0.5rem;
  opacity: 0;
`;

Tooltip.displayName = 'Tooltip';

const Color = styled.div`
  display: inline-block;
  width: 12px;
  min-width: 12px;
  max-width: 12px;
  height: 12px;
  min-height: 12px;
  max-height: 12px;
  margin-right: 8px;
  background: ${props => props.background};
`;

const Title = Base.withComponent('p').extend`
  font-size: 12px;
  line-height: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  width: 100%;
  cursor: default;
  color: white;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Svg = styled.svg`
  max-width: 248px;

  .tick {
    line {
      opacity: 0.1;
    }

    text {
      color: ${props => props.textColor};
    }

    :first-child {
      line {
        opacity: 0.5;
      }
    }
  }
`;

class Histogram extends Component {
  static defaultProps = {
    colors: chartColors,
    data: [],
    textColor: '#747474',
    width: 208,
    height: 140,
    margin: {
      top: 15,
      right: 0,
      bottom: 5,
      left: 40,
    },
  };

  static propTypes = {
    colors: PropTypes.array,
    data: PropTypes.array,
    height: PropTypes.number,
    keys: PropTypes.array,
    margin: PropTypes.object,
    textColor: PropTypes.string,
    width: PropTypes.number,
  };

  state = {
    tooltip: null,
  }

  componentDidMount() {
    const { margin } = this.props;

    this.barsContainer = this.svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    this.renderAxis();
    this.renderBars();
  }

  componentDidUpdate() {
    this.updateAxis();
    this.renderBars();
  }

  updateAxis() {
    const { colors, data, keys } = this.props;
    this.stack
      .keys(keys);

    const layers = this.stack(data);

    this.yScale
      .domain([0, max(layers[layers.length - 1], d => d[1])])
      .nice();

    this.xScale
      .domain(data.map(d => d.name));

    this.yAxisSelection
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border

    this.colorScale
      .range(colors)
      .domain(keys);
  }

  renderAxis() {
    const { data, height, margin, width, colors, keys } = this.props;

    // -- Stack
    this.stack = stack()
      .keys(keys)
      .order(stackOrderNone);

    // -- X Axis
    this.xScale = scaleBand()
      .paddingInner(0.05)
      .paddingOuter(0.1)
      .domain(data.map(d => d.name))
      .range([0, width]);

    // -- Y Axis
    const layers = this.stack(data);

    this.yScale = scaleLinear()
      .range([height, 0])
      .domain([0, max(layers[layers.length - 1], d => d[1])])
      .nice();

    this.yAxis = axisLeft(this.yScale)
      .tickSize(-width, 0, 0)
      .ticks(5);

    this.yAxisSelection = this.svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border

    // -- Color scale
    this.colorScale = scaleOrdinal()
      .range(colors)
      .domain(keys);
  }

  renderBars() {
    const { data, height, keys } = this.props;
    const layers = this.stack(data);

    keys.forEach((key, index) => {
      const bar = this.barsContainer
        .selectAll(`.bar-${key}`)
        .data(layers[index], d => `${d.data.name}-${key}`);

      // -- Remove
      bar.exit().remove();

      // -- Enter
      bar
        .enter()
        .append('rect')
        .on('mouseout', () => this.setState({ tooltip: null }))
        .on('mouseenter', d => {
          this.setState(
            { tooltip: { d } },
            () => this.showTooltip(event.pageX, event.pageY)
          );
        })
        .on('mousemove', () => {
          select(this.tooltipNode).style('opacity', 0);
          this.showTooltip(event.pageX, event.pageY);
        })
        .attr('class', () => `bar bar-${key}`)
        .attr('y', height)
        .attr('x', d => this.xScale(d.data.name))
        .attr('fill', () => this.colorScale(key))
        .attr('width', this.xScale.bandwidth())
        .transition()
        .delay(200)
        .attr('y', d => this.yScale(d[1]))
        .attr('height', d => this.yScale(d[0]) - this.yScale(d[1]));

      // -- Update
      bar
        .transition()
        .attr('x', d => this.xScale(d.data.name))
        .attr('y', d => this.yScale(d[1]))
        .attr('width', this.xScale.bandwidth())
        .attr('height', d => this.yScale(d[0]) - this.yScale(d[1]));
    });
  }

  getTooltipPosition(mouseX, mouseY) {
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
      y = mouseY - tooltipContainerBoundingRect.height - 25;
    }

    return [x, y];
  }

  showTooltip(mouseX, mouseY) {
    const [x, y] = this.getTooltipPosition(mouseX, mouseY);

    select(this.tooltipNode)
      .style('opacity', 1)
      .style('left', `${x}px`)
      .style('top', `${y + 5}px`);
  }

  renderTooltip() {
    const { keys } = this.props;
    const { d } = this.state.tooltip;

    return (
      <Tooltip innerRef={node => { this.tooltipNode = node; }}>
        {keys.map(key => (
          <Item key={key}>
            <Color background={this.colorScale(key)} />
            <Title>{d.data[key]}</Title>
          </Item>
        ))}
      </Tooltip>
    );
  }

  render() {
    const { width, height, margin, ...others } = this.props;
    const fullHeight = height + margin.top + margin.bottom;
    const fullWidth = width + margin.left + margin.right;

    return (
      <React.Fragment>
        <Svg
          width={fullWidth}
          height={fullHeight}
          innerRef={node => { this.svg = select(node); }}
          {...others}
        />
        {this.state.tooltip && this.renderTooltip()}
      </React.Fragment>
    );
  }
}

export default Histogram;
