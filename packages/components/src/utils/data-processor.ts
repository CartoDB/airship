import { scaleLinear } from 'd3-scale';
import { interpolateSpectral } from 'd3-scale-chromatic';
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

export function rawDataToStackBarData(data: any[], scale: number[], metadata): ColumnData[][] {
  const keys = _getKeys(data);
  const result = [];
  for (const rawColumn of data) {
    result.push(_generateColumn(rawColumn, scale, keys, metadata));
  }
  return result;
}


function _generateColumn(data, scale: number[], keys: string[], metadata) {
  const column = [];

  for (const key of Object.keys(data.values)) {
    const value = data.values[key];
    column.push({
      color: _getColor(key, keys, metadata),
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

function _getColor(key: string, keys: string[], metadata) {
  if (metadata && metadata[key] && metadata[key].color) {
    return metadata[key].color;
  }

  const scale = scaleLinear()
    .domain([0, keys.length])
    .range([0, 1]);

  return interpolateSpectral(scale(keys.indexOf(key)));
}

function _getKeys(data: any[]): string[] {
  const keys = new Set();
  for (const rawColumn of data) {
    Object.keys(rawColumn.values).forEach((key) => {
      keys.add(key);
    });
  }
  return Array.from(keys);
}


export default { getDomain, getZeroAxis, rawDataToStackBarData };

