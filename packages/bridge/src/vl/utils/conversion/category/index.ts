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
  const fullCategories = (histogram as any)._categories;
  const values = histogram.value;
  return fullCategories.map((d) => {
    const value = values.find((elem) => elem.x === d.name);
    return {
      color: findColorForCategory(d.name, legendData),
      name: d.name,
      value: value ? value.y : 0
    };
  }).sort((a, b) => b.value - a.value);

  // TODO: Use getJoinedValues method properly here: histogram.getJoinedValues(legendData);
}

export default vlToCategory;
