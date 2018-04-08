import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GaugeChart from './gaugeChart';

class GaugeWidget extends Component {
  static defaultProps = {
    value: 50,
    maxValue: 100,
    minValue: 0,
    label: '',
    backgroundColor: '#F5F5F5',
    foregroundColor: '#47DB99',
    textColor: '#2C2C2C',
  };

  static propTypes = {
    value: PropTypes.number,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    label: PropTypes.string,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
    textColor: PropTypes.string,
  };

  componentDidMount() {
    this._chart = new GaugeChart(this.rootNode, this.props);
  }

  componentDidUpdate() {
    this._chart.update(this.props);
  }

  render() {
    return (
      <div ref={node => { this.rootNode = node; }} />
    );
  }
}

export default GaugeWidget;
