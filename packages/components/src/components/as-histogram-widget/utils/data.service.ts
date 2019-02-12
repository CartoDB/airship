import { max, min } from 'd3-array';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { HistogramData } from '../interfaces';
import { Domain } from '../types/Domain';

export function binsScale(data: HistogramData[]) {
  return scaleLinear()
    .domain(getXDomain(data))
    .range([0, data.length]);
}

export function getXDomain(data: HistogramData[]): Domain {
  const { start } = data.length > 0 ? data[0] : { start: 0 };
  const { end } = data.length > 0 ? data[data.length - 1] : { end: 0 };

  return [start, end];
}

export function getYDomain(data: HistogramData[]): Domain {
  return [Math.min(0, getLowerBounds(data)), max(data, (d) => d.value)];
}

export function getLowerBounds(data: HistogramData[]): number {
  return min(data, (d) => d.value);
}

export function getXScale(domain: Domain, width: number): ScaleLinear<number, number> {
  return scaleLinear()
    .domain(domain)
    .range([0, width]);
}

export function isCategoricalData(data: HistogramData[]): boolean {
  // Histogram data is categorical if all elements contain the category property
  return data.every(_hasCategory);
}

export function prepareData(data: HistogramData[]) {
  const hasRange = data.every(_hasRange);

  return data.map((d, index) => {
    const parsed = {
      ...d
    };

    if (!hasRange) {
      parsed.start = index;
      parsed.end = index + 1;
    }

    return parsed;
  });
}

function _hasCategory(data: HistogramData) {
  return data.category !== undefined;
}

function _hasRange(data: HistogramData) {
  return data.start !== undefined && data.end !== undefined;
}

/**
 * Checks if an array of data and background data are compatible
 */
export function isBackgroundCompatible(
  data: HistogramData[],
  backgroundData: HistogramData[]): boolean {
  const isNull = [data, backgroundData].map((value) => value === null);

  // Both must be null or both must not be null
  if (isNull[0] !== isNull[1]) {
    return false;
  }

  // If both are null, they're automatically compatible
  if (isNull[0] && isNull[1]) {
    return true;
  }

  // They must have the same length
  if (data.length !== backgroundData.length) {
    return true;
  }

  const isCategorical = data.every(_hasCategory);
  const hasRange = data.every(_hasRange);

  for (let index = 0; index < data.length; index++) {

    // If every element has start / end, they must be equal on both arrays for every element
    if (hasRange) {
      if (backgroundData[index].start !== data[index].start ||
          backgroundData[index].end !== data[index].end) {
        return false;
      }
    }

    // If every element has category, they must be equal on both arrays for every element
    if (isCategorical) {
      if (backgroundData[index].category !== data[index].category) {
        return false;
      }
    }
  }

  return true;
}


export default {
  getLowerBounds,
  getXDomain,
  getXScale,
  getYDomain,
  isBackgroundCompatible,
  isCategoricalData,
  prepareData,
};
