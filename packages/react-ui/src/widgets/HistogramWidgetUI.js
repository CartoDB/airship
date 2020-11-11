import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Grid, Link, Typography, useTheme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  optionsSelectedBar: {
    marginBottom: theme.spacing(2),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary,
    },

    '& .MuiButton-label': {
      ...theme.typography.caption,
    },
  },

  selectAllButton: {
    ...theme.typography.caption,
    cursor: 'pointer'
  }
}));


function __dataEqual (optionPrev, optionNext) {
  const dataPrev = optionPrev.series[0].data
  const dataNext = optionNext.series[0].data
  
  if (dataPrev && dataNext && dataPrev.length === dataNext.length) {
    return !dataNext.some(({ value, tick }, index) => {
      return !(value === dataPrev[index].value && tick === dataPrev[index].tick)
    });
  }
  return false
}

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
}

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

function __clearFilter (serie) {
  serie.data.forEach(bar => {
    bar.disabled = false;
    delete bar.itemStyle;
  })
}

function __applyFilter (serie, clickedBarIndex, theme) {
  const anyDisabled = serie.data.find(d => d.disabled)

  if (!anyDisabled) {
    serie.data.forEach((bar, index) => {
      if (index !== clickedBarIndex) {
        bar.disabled = true;
        bar.itemStyle = { color: theme.palette.charts.disabled };
      }
    })
  } else {
    const clickedData = serie.data[clickedBarIndex]
    clickedData.disabled = !clickedData.disabled
    if (clickedData.disabled) {
      clickedData.itemStyle = { color: theme.palette.charts.disabled }

      const anyActive = serie.data.find(d => !d.disabled)

      if (!anyActive) {
        __clearFilter(serie)
      }
    } else {
      delete clickedData.itemStyle
    }
  }

  return serie
}

const EchartsWrapper = React.memo(ReactEcharts, ({ option: optionPrev }, { option: optionNext }) => __dataEqual(optionPrev, optionNext))


function HistogramWidgetUI(props) {
  const { name, data = [], dataAxis, onSelectedBarsChange, selectedBars, tooltipFormatter } = props;
  const theme = useTheme();
  const classes = useStyles();
  const chartInstance = useRef();
  const options = useMemo(() => {
    const config = __generateDefaultConfig({ dataAxis, tooltipFormatter }, data, theme)
    const series = __generateSerie (name, data, theme)
    return Object.assign({}, config, { series })
  }, [data]);

  const clearBars = () => {
    const echart = chartInstance.current.getEchartsInstance();

    const option = echart.getOption()
    const serie = option.series[0]
    __clearFilter(serie)
    echart.setOption(option)
    onSelectedBarsChange({ bars: [], chartInstance });
  }

  const clickEvent = (params) => {
    if (onSelectedBarsChange) {
      const echart = chartInstance.current.getEchartsInstance();

      const option = echart.getOption()
      const serie = option.series[params.seriesIndex]
      __applyFilter(serie, params.dataIndex, theme)
      echart.setOption(option)

      const activeBars = []
      serie.data.forEach((d, index) => {
        if (!d.disabled) {
          activeBars.push(index)
        }
      })

      onSelectedBarsChange({ bars: (activeBars.length === serie.data.length) ? [] : activeBars, chartInstance });
    }
  }

  const onEvents = {
    click: clickEvent
  };
  
  return (
    <div>
      {onSelectedBarsChange  && <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className={classes.optionsSelectedBar}
      >
        <Typography variant='caption'>
          {selectedBars.length ? selectedBars.length : 'All'} selected
        </Typography>
        {selectedBars.length > 0 && (
          <Link className={classes.selectAllButton} onClick={() => clearBars()}>
            All
          </Link>
        )}
      </Grid>}
      {!!options && <EchartsWrapper
        ref={chartInstance}
        option={options}
        lazyUpdate={true}
        onEvents={onEvents}
      />}
    </div>);
};

HistogramWidgetUI.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tick: PropTypes.string.isRequired,
      value: PropTypes.number
    })
  ).isRequired,
  tooltipFormatter: PropTypes.func,
  dataAxis: PropTypes.array,
  name: PropTypes.string,
  onSelectedBarsChange: PropTypes.func,
};


export default HistogramWidgetUI;
