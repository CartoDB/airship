import { scaleLinear } from 'd3-scale';
import { StackedBarColumnData } from '../components/as-stacked-bar-widget/types/StackedBarColumnData';
import { ColorMap } from './ColorMap';
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

export function rawDataToStackBarData(data: any[], scale: number[], colorMap: ColorMap): StackedBarColumnData[][] {
  const result = [];
  for (const rawColumn of data) {
    result.push(_generateColumn(rawColumn, scale, colorMap));
  }
  return result;
}


function _generateColumn(data, scale: number[], colorMap: ColorMap) {
  const column = [];

  for (const key of Object.keys(data.values)) {
    const value = data.values[key];
    column.push({
      color: colorMap[key],
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
