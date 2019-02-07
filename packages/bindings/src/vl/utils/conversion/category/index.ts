export function vlToCategory(data: VLCategoricalHistogram): object[] {
  return data.value.map((d) => ({
    name: d.x,
    value: d.y
  }));
}

export default vlToCategory;
