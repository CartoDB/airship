import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { select, selectAll } from 'd3-selection'; // eslint-disable-line
import { scaleBand, scaleLinear } from 'd3-scale';
import { min, max } from 'd3-array'; // eslint-disable-line
import { transition } from 'd3-transition'; // eslint-disable-line
import { axisBottom, axisLeft } from 'd3-axis'; // eslint-disable-line

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

  .bar {
    fill: ${props => props.color};
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s linear;

    :hover {
      fill: ${props => darken(0.16, props.color)};
    }
  }
`;

class Histogram extends Component {
  static defaultProps = {
    color: '#3AB5F0',
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
    color: PropTypes.string,
    data: PropTypes.array,
    height: PropTypes.number,
    margin: PropTypes.object,
    textColor: PropTypes.string,
    width: PropTypes.number,
  };

  componentDidMount() {
    const { margin } = this.props;

    this.barsContainer = this.container
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
    const { data } = this.props;

    this.yScale
      .domain([0, max(data, d => d.value)]);

    this.xScale
      .domain(data.map(d => d.name));

    this.yAxisSelection
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border
  }

  renderAxis() {
    const { data, height, margin, width } = this.props;

    // -- X Axis
    this.xScale = scaleBand()
      .paddingInner(0.05)
      .paddingOuter(0.1)
      .domain(data.map(d => d.name))
      .range([0, width]);

    // -- Y Axis
    this.yScale = scaleLinear()
      .domain([0, max(data, d => d.value)])
      .range([height, 0]);

    this.yAxis = axisLeft(this.yScale)
      .tickSize(-width, 0, 0)
      .ticks(5);

    this.yAxisSelection = this.container
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border
  }

  renderBars() {
    const { data, height } = this.props;

    // Draw bars
    this.bars = this.barsContainer
      .selectAll('rect')
      .data(data);

    // Exit
    this.bars.exit().remove();

    // Enter
    this.bars
      .enter()
      .append('rect')
      .merge(this.bars)
      .attr('class', 'bar')
      .attr('y', height)
      .attr('x', d => this.xScale(d.name))
      .attr('width', () => this.xScale.bandwidth())
      .transition()
      .delay(200)
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => height - this.yScale(d.value));

    // Update
    this.bars
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => height - this.yScale(d.value));
  }

  render() {
    const { width, height, margin, ...others } = this.props;
    const fullHeight = height + margin.top + margin.bottom;
    const fullWidth = width + margin.left + margin.right;

    return (
      <Svg
        width={fullWidth}
        height={fullHeight}
        innerRef={node => { this.container = select(node); }}
        {...others}
      />
    );
  }
}

export default Histogram;
