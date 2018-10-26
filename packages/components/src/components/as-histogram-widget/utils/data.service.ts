import { ScaleLinear, scaleLinear } from 'd3-scale';
import { HistogramData } from '../interfaces';
import { Domain } from '../types/Domain';

export function getHorizontalDomain(data: HistogramData[]): Domain {
  const { start } = data.length > 0 ? data[0] : { start: 0 };
  const { end } = data.length > 0 ? data[data.length - 1] : { end: 0 };

  return [start, end];
}

export function getXScale(domain: Domain, width: number): ScaleLinear<number, number> {
  return scaleLinear()
    .domain(domain)
    .range([0, width]);
}


export default { getHorizontalDomain, getXScale };
