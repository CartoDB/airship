import { HistogramData } from '../../as-histogram-widget/interfaces';
import { TimeSeriesData } from '../interfaces';

export function sameData(first: TimeSeriesData[], second: TimeSeriesData[]) {
  if (first.length !== second.length) {
    return false;
  }

  for (let i = 0; i < first.length; i++) {
    if (
      first[i].start !== second[i].start ||
      first[i].end !== second[i].end ||
      first[i].value !== second[i].value ||
      first[i].color !== second[i].color
    ) {
      return false;
    }
  }

  return true;
}

export function prepareData(data: TimeSeriesData[]): HistogramData[] {
  const isDate = data.every((d) => _isDate(d.start) && _isDate(d.end));

  if (isDate) {
    return data.map((d) => ({
      color: d.color,
      end: (d.end as Date),
      start: (d.start as Date),
      value: d.value
    }));
  }

  return data.map((d) => ({
    color: d.color,
    end: (d.end as number),
    start: (d.start as number),
    value: d.value
  }));
}

function _isDate(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Date]';
}

export default { prepareData, sameData };
