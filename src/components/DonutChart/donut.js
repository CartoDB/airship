import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { chartClors } from '../../constants';
import DonutChart from './donutChart';

class DonutWidget extends Component {
  static defaultProps = {
    colors: chartClors,
    data: [],
  };

  static propTypes = {
    data: PropTypes.array,
    colors: PropTypes.arrayOf(PropTypes.string),
  };

  componentDidMount() {
    this._chart = new DonutChart(this._rootNode, this.props)
  }

  componentDidUpdate() {
    this._chart.update(this.props);
  }

  render() {
    return (
      <div ref={(node) => { this._rootNode = node; }}></div>
    )
  }
}

export default DonutWidget;
