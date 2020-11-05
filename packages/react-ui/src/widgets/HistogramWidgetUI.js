import React from 'react';
import ReactEcharts from 'echarts-for-react';

const DEFAULT_CONFIG = {
  tooltip: {
    trigger: 'axis',
    position: function (point, params, dom, rect, size) {
      // fixed at top
      return [point[0], '5%'];
    }
  },
  grid: {
    left: 12,
    top: 20,
    right: 12,
    bottom: 60,
  },
  legend: {
    bottom: 0,
    left: 0,
    data: [], // To fill
    backgroundColor: '#f4f4f5',
    itemGap: 15,
    padding: 10,
    borderRadius: 5,
    textStyle: {
      fontSize: 10,
      fontFamily: 'OpenSans, sans-serif'
    }
  },
  xAxis: {
    axisLine: {
      show: true,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      fontSize: 10,
      fontFamily: 'OpenSans, sans-serif',
    },
  },
  yAxis: {
    type: 'value',
    show: false,
  },
  series: [],
};

function HistogramWidgetUI(props) {
  const {data = {}, notMerge = true} = props;
  
  const options = Object.assign({}, DEFAULT_CONFIG, data);
  options.

  return (<ReactEcharts
            option={options}
            notMerge={notMerge}
            lazyUpdate={true}
          />);
};

export default HistogramWidgetUI;