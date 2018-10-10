import { scaleLinear } from 'd3-scale';
import { ColumnData } from '../components/as-stacked-bar-widget/as-stacked-bar-widget';
import { StackedbarData } from './StackedBarData';

export function getDomain(data: StackedbarData[]): number[] {

  return data.reduce((domain: number[], currentValue: StackedbarData) => {
    let positiveAcum = 0;
    let negativeAcum = 0;

    for (const key of Object.keys(currentValue.values)) {
      const value = currentValue.values[key];

      if (value >= 0) {
        positiveAcum += value;
      }

      if (value < 0) {
        negativeAcum += value;
      }
    }

    if (negativeAcum <= domain[0]) {
      domain[0] = negativeAcum;
    }
    if (positiveAcum >= domain[1]) {
      domain[1] = positiveAcum;
    }

    return domain;
  }, [0, 0]);
}

export function getZeroAxis(data: number[]): number {
  const [from, to] = data;
  const yScale = scaleLinear()
    .domain([from, to])
    .range([0, 100]);

  return (100 - yScale(0));
}

export function rawDataToStackBarData(data: any[], scale: number[]): ColumnData[][] {
  const result = [];
  for (const rawColumn of data) {
    result.push(_generateColumn(rawColumn, scale));
  }
  return result;
}


function _generateColumn(data, scale: number[]) {
  // TODO: generate real colors
  const colors = ['rgba(200, 20, 20, 0.8)', 'rgba(20, 200, 20, 0.8)', 'rgba(20, 20, 200, 0.8)'];
  const column = [];
  let i = 0;

  for (const value of Object.values(data.values)) {
    column.push({
      color: colors[i++ % colors.length],
      negative: value < 0,
      size: _normalize(value as number, scale),
    });
  }
  return column;
}

function _normalize(data: number, scale): number {
  const [from, to] = scale;
  data = Math.abs(data);

  return (100 / ((to - from) / data));
}


export default { getDomain, getZeroAxis, rawDataToStackBarData };

