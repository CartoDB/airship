import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { useTheme } from '@material-ui/core';

function __generateDefaultConfig ({ dataAxis, tooltipFormatter}, data, theme) {
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
      data: dataAxis || data.map(d => d.tick)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 0,
        padding: [0, 0, theme.typography.charts.lineHeight, 0],
        show: true,
        showMaxLabel: true,
        showMinLabel: false,
        inside: true,
        color: (value) => {
          // FIXME: Workaround to show only maxlabel
          let col = 'transparent'
          const maxValue = Math.max(...data.map(d => d.value))
          if (value > maxValue) {
            col = theme.palette.charts.maxLabel
          }

          return col
        },
        ...theme.typography.charts
      },
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
  const {name, data = [], dataAxis, tooltipFormatter, notMerge = true} = props;
  const theme = useTheme()

  const series = __generateSerie (name, data, theme)
  const DEFAULT_CONFIG = __generateDefaultConfig({ dataAxis, tooltipFormatter }, data, theme)

  const options = Object.assign({ series }, DEFAULT_CONFIG);
  

  return (<ReactEcharts
            option={options}
            notMerge={notMerge}
            lazyUpdate={true}
          />);
};

export default HistogramWidgetUI;
