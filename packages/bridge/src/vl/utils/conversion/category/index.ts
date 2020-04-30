import { LegendEntry, VLCategoricalHistogram } from '../../../../types';
import { findColorForCategory } from '../histogram';

/**
 * Converts a VL 'categorical' histogram to the format Airship's category widget requires
 *
 * @export
 * @param {VLCategoricalHistogram} histogram
 * @param {*} [colors]
 * @returns {object[]}
 */
export function vlToCategory(histogram: VLCategoricalHistogram, legendData: LegendEntry[] = []): object[] {
  const fullCategories = histogram.getAllCategories();
  const values = histogram.value.reduce((acum, elem) => {
    acum[elem.x] = elem;
    return acum;
  }, {});

  return fullCategories.map((d) => {
    const value = values[d.name];
    return {
      color: findColorForCategory(d.name, legendData),
      name: d.name,
      value: value ? value.y : null
    };
  }).sort((a, b) => b.value - a.value);

  // TODO: Use getJoinedValues method properly here: histogram.getJoinedValues(legendData);
}

export default vlToCategory;
