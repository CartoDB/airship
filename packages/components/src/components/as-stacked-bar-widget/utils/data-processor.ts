import { scaleLinear } from 'd3-scale';
import { ColorMap } from '../types/ColorMap';
import { ColumnData } from '../types/ColumnData';
import { IRawStackedbarData } from '../types/RawStackedbarData';
import { StackedBarData } from '../types/StackedBarData';

/**
 * Compute the lowest and highest values in the RawStackedBarData array.
 * If the lowest value is bigger than zero, zero is returned instead.
 * @param data
 */
export function getDomain(data: IRawStackedbarData[]): number[] {

  return data.reduce((domain: number[], currentValue: IRawStackedbarData) => {
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

/**
 * Get the vertical position (%) of the zero axis in the svg based on the domain.
 */
export function getZeroAxis(scale: [number, number]): number {
  const [from, to] = scale;
  const yScale = scaleLinear()
    .domain([from, to])
    .range([0, 100]);

  return (100 - yScale(0));
}

/**
 * Transform the data given from the user as widget attr into a internal format.
 */
export function rawDataToStackBarData(
  data: IRawStackedbarData[],
  scale: [number, number],
  colorMap: ColorMap): StackedBarData {

  const result = [];
  for (const rawColumn of data) {
    result.push(_generateColumn(rawColumn, scale, colorMap));
  }
  return result;
}

/**
 * Creates the data required to draw a column.
 */
function _generateColumn(data: IRawStackedbarData, scale: [number, number], colorMap: ColorMap): ColumnData {
  const column = [];

  for (const key of Object.keys(data.values)) {
    const value = data.values[key];
    column.push({
      color: colorMap[key],
      negative: value < 0,
      size: _getRectSize(value as number, scale),
      value,
    });
  }
  return column;
}

/**
 * Compute the size (%) of a rectangle .
 */
function _getRectSize(data: number, scale: [number, number]): number {
  const [from, to] = scale;
  data = Math.abs(data);

  return (100 / ((to - from) / data));
}

export default { getDomain, getZeroAxis, rawDataToStackBarData };
