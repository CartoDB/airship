import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GaugeChart from './gaugeChart';

class GaugeWidget extends Component {
  static defaultProps = {
    percentage: 100,
    label: ''
  };

  static propTypes = {
    percentage: PropTypes.number,
    label: PropTypes.string,
  };

  componentDidMount() {
    this._createChart();
  }

  componentDidUpdate() {
    this._updateChart();
  }

  _createChart() {
    const { label, percentage, ...other } = this.props;
    console.log(label, percentage);
    this._chart = new GaugeChart(this._rootNode, { percentage, label }, other)
  }

  _updateChart() {
    this._chart.update(this._rootNode, this.props.percentage);
  }

  render() {
    return (
      <div ref={(node) => { this._rootNode = node; }}></div>
    )
  }
}

export default GaugeWidget;
