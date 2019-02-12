import { findColorForCategory } from '../histogram';

/**
 * Converts a VL 'categorical' histogram to the format Airship's category widget requires
 *
 * @export
 * @param {VLCategoricalHistogram} data
 * @param {*} [colors]
 * @returns {object[]}
 */
export function vlToCategory(data: VLCategoricalHistogram, colors?: any): object[] {
  return data.value.map((d) => ({
    color: findColorForCategory(d.x, colors),
    name: d.x,
    value: d.y
  }));
}

export default vlToCategory;
