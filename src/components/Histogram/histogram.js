import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { chartColors } from '../../constants';
import HistogramChart from './histogramChart';

const Wrapper = styled.div`
  max-width: 248px;

  .tick {
    line {
      opacity: 0.3;
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
    fill: ${props => props.barColor};
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s linear;

    :hover {
      fill: ${props => darken(0.16, props.barColor)};
    }
  }
`;

class Histogram extends Component {
  static defaultProps = {
    barColor: '#3AB5F0',
    data: [],
    textColor: '#747474',
  };

  static propTypes = {
    barColor: PropTypes.string,
    data: PropTypes.array,
    textColor: PropTypes.string,
  };

  componentDidMount() {
    this._chart = new HistogramChart(this._rootNode, this.props)
  }

  componentDidUpdate() {
    this._chart.update(this.props);
  }

  render() {
    return (
      <Wrapper
        innerRef={(node) => { this._rootNode = node; }}
        {...this.props}
      />
    )
  }
}

export default Histogram;
