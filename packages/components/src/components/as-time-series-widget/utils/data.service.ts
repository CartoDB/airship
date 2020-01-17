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

export default { sameData };
