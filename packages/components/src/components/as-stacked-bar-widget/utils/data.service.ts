import { scaleLinear } from 'd3-scale';
import { ColorMap } from '../types/ColorMap';
import { ColumnData } from '../types/ColumnData';
import { Metadata } from '../types/Metadata';
import { RawStackedbarData } from '../types/RawStackedbarData';
import { StackedBarData } from '../types/StackedBarData';

/**
 * Compute the lowest and highest values in the RawStackedBarData array.
 * If the lowest value is bigger than zero, zero is returned instead.
 * @param data
 */
export function getDomain(data: RawStackedbarData[]): [number, number] {

  return data.reduce((domain: [number, number], currentValue: RawStackedbarData) => {
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
  }, [0, 0]) as [number, number];
}

/**
 * Transform the data given from the user as widget attr into a internal format.
 */
export function rawDataToStackBarData(
  data: RawStackedbarData[],
  scale: [number, number],
  colorMap: ColorMap,
  width: number,
  margin: number): StackedBarData {

  const origin = _getZeroAxis(scale);
  let xOffset = margin / 2;

  const result = [];
  for (const rawColumn of data) {
    result.push(_generateColumn(rawColumn, scale, colorMap, width, origin, xOffset));
    xOffset += width + margin;
  }
  return result;
}

export function getKeys(data: RawStackedbarData[]): string[] {
  const keys = new Set();
  for (const rawColumn of data) {
    Object.keys(rawColumn.values).forEach((key) => {
      keys.add(key);
    });
  }
  return Array.from(keys);
}

export function createLegendData(metadata: Metadata, colorMap: ColorMap) {
  if (!metadata) {
    return colorMap;
  }
  const legendData = {};
  for (const key in colorMap) {
    if (metadata[key].label) {
      legendData[metadata[key].label] = colorMap[key];
    } else {
      legendData[key] = colorMap[key];
    }
  }
  return legendData;
}

/**
 * Creates the data required to draw a column.
 */
function _generateColumn(
  data: RawStackedbarData,
  scale: [number, number],
  colorMap: ColorMap,
  width: number,
  origin: number,
  x: number): ColumnData {

  const column: ColumnData = [];
  let yOffset = origin;

  const [positives, negatives] = _split(data);

  negatives.forEach((key) => {
    yOffset += _addRectangleAndGetHeight(column, data, key, scale, colorMap, x, width, yOffset, false);
  });

  yOffset = origin;
  positives.forEach((key) => {
    yOffset -= _addRectangleAndGetHeight(column, data, key, scale, colorMap, x, width, yOffset, true);
  });

  return column;
}

/**
 * Get the vertical position (%) of the zero axis in the svg based on the domain.
 */
function _getZeroAxis(scale: [number, number]): number {
  const [from, to] = scale;
  const yScale = scaleLinear()
    .domain([from, to])
    .range([0, 100]);

  return (100 - yScale(0));
}

function _addRectangleAndGetHeight(column, data, key, scale, colorMap, x, w, yOffset, positive) {
  const v = data.values[key];
  const h = _getRectSize(v as number, scale);
  const y = positive ? yOffset - h : yOffset;
  const c = colorMap[key];
  column.push({ c, h, v, w, x, y, });
  return h;
}

/**
 * Clasify the keys in two arrays sorted by key
 */
function _split(data: RawStackedbarData): [string[], string[]] {
  const negatives = [];
  const positives = [];

  for (const key of Object.keys(data.values)) {
    const value = data.values[key];
    if (value < 0) {
      negatives.push(key);
    }
    if (value >= 0) {
      positives.push(key);
    }
  }

  return [positives.sort(), negatives.sort()];
}

/**
 * Compute the size (%) of a rectangle .
 */
function _getRectSize(data: number, scale: [number, number]): number {
  const [from, to] = scale;
  data = Math.abs(data);

  return (100 / ((to - from) / data));
}



export default { getDomain, rawDataToStackBarData, getKeys, createLegendData };
