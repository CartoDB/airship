import { findColorForCategory } from '../histogram';

export function vlToCategory(data: VLCategoricalHistogram, colors?: any): object[] {
  return data.value.map((d) => ({
    color: findColorForCategory(d.x, colors),
    name: d.x,
    value: d.y
  }));
}

export default vlToCategory;
