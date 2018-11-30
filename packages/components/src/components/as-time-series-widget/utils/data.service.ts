import { HistogramData } from '../../as-histogram-widget/interfaces';
import { TimeSeriesData } from '../interfaces';

export function prepareData(data: TimeSeriesData[]): HistogramData[] {
  const isDate = data.every((d) => _isDate(d.start) && _isDate(d.end));

  if (isDate) {
    return data.map((d) => ({
      color: d.color,
      end: (d.end as Date).getTime(),
      start: (d.start as Date).getTime(),
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

export default { prepareData };
