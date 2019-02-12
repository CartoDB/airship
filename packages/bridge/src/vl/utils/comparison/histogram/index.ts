type Comparer<T> = (first: VLHistogramData<T>, second: VLHistogramData<T>) => boolean;

/**
 * Compares two numerical histograms for equality
 *
 * @export
 * @param {VLNumericalHistogram} first
 * @param {VLNumericalHistogram} second
 * @returns
 */
export function isNumericalHistogramEqual(first: VLNumericalHistogram, second: VLNumericalHistogram) {
  return isHistogramEqual(first.value, second.value, numericalCompare);
}

/**
 * Compares two categorical histograms for equality
 *
 * @export
 * @param {VLCategoricalHistogram} first
 * @param {VLCategoricalHistogram} second
 * @returns
 */
export function isCategoricalHistogramEqual(first: VLCategoricalHistogram, second: VLCategoricalHistogram) {
  return isHistogramEqual(first.value, second.value, categoricalCompare);
}

function isHistogramEqual<T>(
  first: Array<VLHistogramData<T>>,
  second: Array<VLHistogramData<T>>,
  compareFn: Comparer<T>) {
  if (first.length !== second.length) {
    return false;
  }

  for (let i = 0; i < first.length; i++) {
    if (compareFn(first[i], second[i])) {
      return false;
    }
  }

  return true;
}

function numericalCompare(first: NumericalHistogramData, second: NumericalHistogramData) {
  return first.x[0] !== second.x[0] ||
    first.x[1] !== second.x[1] ||
    first.y !== second.y;
}

function categoricalCompare(first: CategoricalHistogramData, second: CategoricalHistogramData) {
  return first.x !== second.x || first.y !== second.y;
}

export default { isNumericalHistogramEqual, isCategoricalHistogramEqual };
