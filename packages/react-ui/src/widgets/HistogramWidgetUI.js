import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@material-ui/core';

function __generateDefaultConfig (theme, { xAxisData = [], tooltipFormatter}) {
  return {
    grid: {
      left: 8,
      top: 20,
      right: 8,
      bottom: 60,
    },
    tooltip: {
      trigger: 'axis',
      position: function (point, params, dom, rect, size) {
        const position = {top: 0};

        if (size.contentSize[0] < size.viewSize[0] - point[0]) {
          position.left = point[0]
        } else {
          position.right = size.viewSize[0] - point[0]
        }
        return position
      },
      ...(tooltipFormatter ? { formatter: tooltipFormatter } : {})
    },
    color: [theme.palette.secondary.main],
    axisPointer: false,
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: theme.typography.charts,
      data: xAxisData
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        onZero: false,
        lineStyle: {
          color: theme.palette.charts.axisLine
        }
      },
    }
  }
};

function __generateSerie (name, data, theme) {
  return [{
    type: 'bar',
    name,
    data,
    barMinWidth: '95%',
    ...(theme ? {emphasis: {
      itemStyle: {
        color: '#31996b' // FIXME: This color don't appears in carto-theme. Secondary dark is red instead of green. It is correct?
      }
    }} : {})
  }]
}


function HistogramWidgetUI(props) {
  const {name, data = [], config = {}, notMerge = true} = props;

  const theme = useTheme()

  const series = __generateSerie (name, data, theme)
  const DEFAULT_CONFIG = __generateDefaultConfig(theme, config)

  const options = Object.assign({ series }, DEFAULT_CONFIG);
  

  return (<ReactEcharts
            option={options}
            notMerge={notMerge}
            lazyUpdate={true}
          />);
};

export default HistogramWidgetUI;
