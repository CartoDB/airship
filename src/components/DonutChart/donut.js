import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { arc, pie } from 'd3-shape';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';
import { rgb } from 'd3-color';
import 'd3-transition';
import Base from '../Typography/base';
import { theme, chartColors } from '../../constants';
import { readableNumber, truncate } from '../../utils';

const SIZE = 136;
const ANIMATION_DURATION = 750;

const START_ANGLE = {
  startAngle: Math.PI * 2,
  endAngle: Math.PI * 2,
  value: 0,
};

const TRANSITION = {
  IN: 'in',
  OUT: 'out',
};

const Wrapper = styled.div`
  display: flex;
`;

const Color = styled.div`
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
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  width: 100%;
  cursor: default;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Chart = styled.svg.attrs({
  viewBox: '0 0 136 136',
})`
  width: 100%;
  height: 100%;
  color: ${props => props.theme.type01};
`;
Chart.defaultProps = {
  theme,
};

const Legend = styled.ul`
  padding: 0;
  margin: 0 0 0 16px;
  overflow-y: auto;
  height: 150px;
`;

class DonutWidget extends Component {
  static defaultProps = {
    colors: chartColors,
    data: [],
    showLegend: true,
  };

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.array,
    showLegend: PropTypes.bool,
  };

  componentDidMount() {
    const radius = SIZE / 2;

    this.donutContainer = this.container
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    this.renderDonut();
  }

  componentDidUpdate() {
    this.renderDonut();
  }

  renderDonut() {
    const { colors, data } = this.props;
    const radius = SIZE / 2;

    // -- Setup arc and angles
    this.arc = arc()
      .innerRadius(radius - 15)
      .outerRadius(radius);

    this.pie = pie()
      .sort(null)
      .value(d => d.value);

    // -- Draw texts
    const value = this.donutContainer
      .append('text')
      .attr('transform', 'translate(0, 0)')
      .attr('text-anchor', 'middle')
      .style('font-size', '24')
      .style('font-weight', '300')
      .style('fill', 'currentColor')
      .style('font-family', 'Roboto')
      .style('-webkit-font-smoothing', 'antialiased');

    const description = this.donutContainer
      .append('text')
      .attr('transform', 'translate(0, 20)')
      .attr('text-anchor', 'middle')
      .style('font-size', '12')
      .style('font-weight', '300')
      .style('fill', 'currentColor')
      .style('font-family', 'Roboto')
      .style('-webkit-font-smoothing', 'antialiased');

    // -- Draw paths
    this.path = this.donutContainer
      .selectAll('path')
      .data(this.pie(data));

    // -- Remove
    this.path.exit()
      .transition()
      .duration(ANIMATION_DURATION)
      .attrTween('d', this.arcTween(this.arc, TRANSITION.OUT))
      .remove();

    // -- Enter
    this.path
      .enter()
      .append('path')
      .on('mouseover', function(obj) {
        select(this).style('fill', () => rgb(select(this).style('fill')).darker(0.16));

        value.text(readableNumber(obj.data.value));
        description.text(truncate(obj.data.name, 14));
      })
      .on('mouseout', function() {
        select(this).style('fill', () => rgb(select(this).style('fill')).brighter(0.16));

        value.text('');
        description.text('');
      })
      .attr('fill', (d, i) => colors[i])
      .style('cursor', 'pointer')
      .each(function() { this._current = START_ANGLE; })
      .transition()
      .duration(ANIMATION_DURATION)
      .attrTween('d', this.arcTween(this.arc, TRANSITION.IN));

    // -- Update
    this.path
      .attr('fill', (d, i) => colors[i])
      .transition()
      .duration(ANIMATION_DURATION)
      .attrTween('d', this.arcTween(this.arc, TRANSITION.IN));
  }

  arcTween = (arc, type) => (
    function(d) {
      const newAngle = type === TRANSITION.OUT ? START_ANGLE : d;
      const interpolator = interpolate(this._current, newAngle);

      this._current = interpolator(0);

      return t => arc(interpolator(t));
    }
  )

  renderLegend() {
    const { data, colors } = this.props;

    return (
      <Legend>
        {data.map((category, index) => (
          <Item key={category.name}>
            <Color background={colors[index] || '#000'} />
            <Title>{category.name}</Title>
          </Item>
        ))}
      </Legend>
    );
  }

  render() {
    const { showLegend, ...others } = this.props;

    return (
      <Wrapper>
        <Chart innerRef={node => { this.container = select(node); }} {...others} />
        { showLegend && this.renderLegend()}
      </Wrapper>
    );
  }
}

export default DonutWidget;
