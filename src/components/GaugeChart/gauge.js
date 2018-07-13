import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { arc } from 'd3-shape';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import 'd3-transition';
import Base from '../Typography/base';
import { theme } from '../../constants';

const WIDTH = 228;
const HEIGHT = 100;
const INNER_RADIUS = 88;
const OUTER_RADIUS = 100;
const ANIMATION_DURATION = 750;

const Chart = styled.svg.attrs({
  viewBox: '0 0 228 100',
  height: '125px'
})`
  color: ${props => props.theme.type01};
`;
Chart.defaultProps = {
  theme,
};

const Group = styled.g`
  transform: translate(${WIDTH / 2}px, ${HEIGHT}px);
`;

const Label = Base.withComponent('text').extend`
  transform: translate(0, -5px);
  font-size: 12px;
  font-weight: 300;
  text-anchor: middle;
  fill: ${props => props.theme.type01};
`;

const Value = Base.withComponent('text').extend`
  transform: translate(0, -25px);
  font-size: 40px;
  font-weight: 300;
  text-anchor: middle;
  fill: ${props => props.theme.type01};
`;

class GaugeWidget extends Component {
  static defaultProps = {
    color: theme.brand03,
    label: '',
    maxValue: 100,
    minValue: 0,
    theme,
    value: 50,
  };

  static propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    theme: PropTypes.object,
    value: PropTypes.number,
  };

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  renderChart() {
    const { theme } = this.props;

    this.arc = arc()
      .innerRadius(INNER_RADIUS)
      .outerRadius(OUTER_RADIUS)
      .startAngle(-90 * (Math.PI / 180))
      .cornerRadius(30);

    this.background = this.container
      .append('path')
      .datum({ endAngle: 90 * (Math.PI / 180) })
      .style('fill', theme.ui02)
      .attr('d', this.arc);

    this.foreground = this.container
      .append('path')
      .datum({ endAngle: -90 * (Math.PI / 180) });

    this.updateChart();
  }

  updateChart() {
    const { color, maxValue, value } = this.props;
    const chartValue = (value * 180) / maxValue;
    const numPi = Math.floor(chartValue - 90) * (Math.PI / 180);

    this.foreground
      .style('fill', color)
      .transition()
      .duration(ANIMATION_DURATION)
      .attrTween('d', this.arcTween(this.arc, numPi));
  }

  arcTween = (arc, newAngle) => (
    function(d) {
      const interpolator = interpolate(d.endAngle, newAngle);

      return t => {
        d.endAngle = interpolator(t); // eslint-disable-line no-param-reassign

        return arc(d);
      };
    }
  )

  render() {
    const { value, label } = this.props;

    return (
      <Chart>
        <Group innerRef={node => { this.container = select(node); }}>
          <Value>{value}</Value>
          {label && <Label>{label}</Label>}
        </Group>
      </Chart>
    );
  }
}

export default GaugeWidget;
