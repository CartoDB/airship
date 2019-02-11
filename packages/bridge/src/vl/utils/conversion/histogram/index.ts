import { HistogramData } from '../../../../../../components/src/components/as-histogram-widget/interfaces';
import { toHex } from '../../color';

/**
 * Converts a numerical VL Histogram data to Airship's Histogram format.
 *
 * Has no support for `color` for now.
 *
 * @export
 * @param {VLNumericalHistogram} data Histogram data in VL format
 * @returns {HistogramData[]}
 */
export function numerical(data: VLNumericalHistogram): HistogramData[] {
  return data.value.map((d) => ({
    end: d.x[1],
    start: d.x[0],
    value: d.y,
  }));
}

/**
 * Converts a categorical VL Histogram to Airship's Histogram widget format.
 *
 * The second argument is used to provide custom colors for the widget.
 *
 * @export
 * @param {VLCategoricalHistogram} data Histogram data in VL format
 * @param {LegendEntry[]} [colors] VL Legend data, which maps values to colors.
 * @returns {HistogramData[]}
 */
export function categorical(data: VLCategoricalHistogram, colors?: LegendEntry[]): HistogramData[] {
  return data.value.map((d) => ({
    category: d.x,
    color: findColorForCategory(d.x, colors),
    end: undefined,
    start: undefined,
    value: d.y
  }));
}

/**
 * Looks for a color in an array of VL Legend Data and converts it into a hex string.
 *
 * @export
 * @param {string} category
 * @param {LegendEntry[]} colors
 * @returns {(string | undefined)}
 */
export function findColorForCategory(category: string, colors: LegendEntry[]): string | undefined {
  if (!colors) {
    return undefined;
  }

  const color = colors.find((element) => element.key === category);

  if (color) {
    return toHex(color.value);
  }

  return undefined;
}

export default { numerical, categorical };
