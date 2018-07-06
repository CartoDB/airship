import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { select, event } from 'd3-selection';
import { stack, stackOrderNone } from 'd3-shape';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { max } from 'd3-array';
import { axisLeft } from 'd3-axis';
import 'd3-transition';
import { chartColors, theme } from '../../constants';
import Base from '../Typography/base';

const WIDTH = 208;
const HEIGHT = 140;
const MARGIN = {
  TOP: 15,
  RIGHT: 0,
  BOTTOM: 5,
  LEFT: 40,
};

const Tooltip = styled.ul`
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

const Title = Base.withComponent('h4').extend`
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  width: 100%;
  cursor: default;
  color: ${props => props.theme.white};
`;
Title.defaultProps = {
  theme,
};

const TooltipLabel = Base.withComponent('p').extend`
  font-size: 12px;
  line-height: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  width: 100%;
  cursor: default;
  color: ${props => props.theme.white};
`;
TooltipLabel.defaultProps = {
  theme,
};

const TooltipItem = styled.li`
  display: flex;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Legend = styled.ul`
  padding: 0;
  margin: 8px 0 0 16px;
`;

const LegendItem = styled.li`
  display: inline-flex;
  align-items: center;

  :not(:last-child) {
    margin-right: 1rem;
  }
`;

const LegendTitle = Base.withComponent('p').extend`
  font-size: 12px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  width: 100%;
  cursor: default;
`;

const Svg = styled.svg.attrs({
  viewBox: '0 0 248 160',
})`
  .tick {
    line {
      stroke: ${props => props.theme.type02};
      opacity: 0.1;
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
`;
Svg.defaultProps = {
  theme,
};

class Histogram extends Component {
  static defaultProps = {
    colors: chartColors,
    data: [],
    labels: [],
    showLegend: true,
    highlightMarker: () => {return},
    selectedData: () => {return}
  };

  static propTypes = {
    colors: PropTypes.array,
    data: PropTypes.array,
    keys: PropTypes.array,
    labels: PropTypes.array,
    showLegend: PropTypes.bool,
  };

  state = {
    tooltip: null,
  }

  colorScale = scaleOrdinal()
    .range(this.props.colors)
    .domain(this.props.keys);

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('touchstart', this.onWindowClick);

    this.barsContainer = this.svg
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    this.renderAxis();
    this.renderBars();
  }

  componentDidUpdate() {
    this.updateAxis();
    this.renderBars();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  }

  onWindowClick = event => {
    console.log('click');
    if (event.target == this.svg.node()) {
      this.setState({ tooltip: null });
    }
  }

  updateAxis() {
    const { colors, data, keys } = this.props;

    this.stack.keys(keys);

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
    const { data, keys } = this.props;

    // -- Stack
    this.stack = stack()
      .keys(keys)
      .order(stackOrderNone);

    // -- X Axis
    this.xScale = scaleBand()
      .paddingInner(0.05)
      .paddingOuter(0.1)
      .domain(data.map(d => d.name))
      .range([0, WIDTH]);

    // -- Y Axis
    const layers = this.stack(data);

    this.yScale = scaleLinear()
      .range([HEIGHT, 0])
      .domain([0, max(layers[layers.length - 1], d => d[1])])
      .nice();

    this.yAxis = axisLeft(this.yScale)
      .tickSize(-WIDTH, 0, 0)
      .ticks(5);

    this.yAxisSelection = this.svg
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
      .call(this.yAxis);

    select('.domain').remove(); // Remove axis border
  }

  renderBars() {
    const { data, keys } = this.props;
    const layers = this.stack(data);
    // console.log(data)
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
        .on('mouseout', () => {
          this.setState({ tooltip: null })
          this.props.highlightMarker(false)
        })
        .on('mouseenter', d => {
          this.setState(
            { tooltip: { d } },
            () => this.showTooltip(event.layerX, event.layerY)
          );
          this.props.highlightMarker(this.state.tooltip.d.data.name)
        })
        .on('mousemove', () => {
          select(this.tooltipNode).style('opacity', 0);
          this.showTooltip(event.layerX, event.layerY);
        })
        .on('click', () => {
          this.props.selectedData(this.state.tooltip.d.data.name)
        })
        .attr('class', () => `bar bar-${key}`)
        .attr('y', HEIGHT)
        .attr('x', d => this.xScale(d.data.name))
        .attr('fill', () => this.colorScale(key))
        .attr('width', this.xScale.bandwidth())
        .transition()
        .delay(200)
        .attr('y', d => this.yScale(d[1]))
        .attr('height', d => this.yScale(d[0]) - this.yScale(d[1]));

      // -- Update
      bar
        .attr('fill', () => this.colorScale(key))
        .transition()
        .attr('x', d => this.xScale(d.data.name))
        .attr('y', d => this.yScale(d[1]))
        .attr('width', this.xScale.bandwidth())
        .attr('height', d => this.yScale(d[0]) - this.yScale(d[1]));
    });
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
      .style('top', `${y + 5}px`);
  }

  renderTooltip() {
    const { keys } = this.props;
    const { d } = this.state.tooltip;

    return (
      <Tooltip innerRef={node => { this.tooltipNode = node; }}>
        <Title>{d.data.name}</Title>
        {keys.map(key => (
          <TooltipItem key={key}>
            <Color background={this.colorScale(key)} />
            <TooltipLabel>{d.data[key]}</TooltipLabel>
          </TooltipItem>
        ))}
      </Tooltip>
    );
  }

  renderLegend = () => {
    if (!this.colorScale) return;

    const { keys, labels } = this.props;

    return (
      <Legend>
        {labels.map((name, index) => (
          <LegendItem key={name}>
            <Color background={this.colorScale(keys[index])} />
            <LegendTitle>{name}</LegendTitle>
          </LegendItem>
        ))}
      </Legend>
    );
  }

  render() {
    const { showLegend, labels } = this.props;
    const renderLegend = showLegend && labels.length > 0;

    return (
      <React.Fragment >
        <Svg innerRef={node => { this.svg = select(node); }} />
        {renderLegend && this.renderLegend()}
        {this.state.tooltip && this.renderTooltip()}
        
      </React.Fragment>
    );
  }
}

export default Histogram;
