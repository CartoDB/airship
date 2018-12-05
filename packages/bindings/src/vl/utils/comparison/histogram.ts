export function isHistogramEqual(first: VL.HistogramData[], second: VL.HistogramData[]) {
  if (first.length !== second.length) {
    return false;
  }

  for (let i = 0; i < first.length; i++) {
    if (
      first[i].x[0] !== second[i].x[0] ||
      first[i].x[1] !== second[i].x[1] ||
      first[i].y !== second[i].y
    ) {
      return false;
    }
  }

  return true;
}
