import { VLCategoricalHistogram } from '../../../../types';
import { findColorForCategory } from '../histogram';

/**
 * Converts a VL 'categorical' histogram to the format Airship's category widget requires
 *
 * @export
 * @param {VLCategoricalHistogram} histogram
 * @param {*} [colors]
 * @returns {object[]}
 */
export function vlToCategory(histogram: VLCategoricalHistogram, legendData: any = []): object[] {
  return histogram.value.map((d) => ({
    color: findColorForCategory(d.x, legendData),
    name: d.x,
    value: d.y
  }));

  // TODO: Use getJoinedValues method properly here: histogram.getJoinedValues(legendData);
}

export default vlToCategory;
