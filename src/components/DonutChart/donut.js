import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { chartColors } from '../../constants';
import DonutChart from './donutChart';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 248px;
`;

class DonutWidget extends Component {
  static defaultProps = {
    colors: chartColors,
    data: [],
    showLegend: true,
  };

  static propTypes = {
    data: PropTypes.array,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  componentDidMount() {
    this._chart = new DonutChart(this.rootNode, this.props);
  }

  componentDidUpdate() {
    this._chart.update(this.props);
  }

  render() {
    return (
      <Wrapper innerRef={node => { this.rootNode = node; }} />
    );
  }
}

export default DonutWidget;
